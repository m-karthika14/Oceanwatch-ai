/**
 * useAudioDetection
 *
 * Captures microphone audio from a MediaStream, records 2-second WAV
 * chunks, and POSTs each chunk to Node /process-audio every 2 seconds.
 *
 * Returns the latest boat_sound_detected boolean.
 *
 * Works with any MediaStream that contains an audio track — whether it
 * comes from the Vision Agents SDK or raw getUserMedia fallback.
 */

import { useEffect, useRef, useState } from 'react';

const CHUNK_DURATION_MS = 2000; // match the video frame interval

function encodeWAV(samples: Float32Array, sampleRate: number): Blob {
  const buffer = new ArrayBuffer(44 + samples.length * 2);
  const view   = new DataView(buffer);

  const writeString = (offset: number, str: string) => {
    for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i));
  };

  writeString(0, 'RIFF');
  view.setUint32(4, 36 + samples.length * 2, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true);          // PCM chunk size
  view.setUint16(20, 1, true);           // PCM format
  view.setUint16(22, 1, true);           // mono
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true); // byte rate
  view.setUint16(32, 2, true);           // block align
  view.setUint16(34, 16, true);          // bits per sample
  writeString(36, 'data');
  view.setUint32(40, samples.length * 2, true);

  // Convert Float32 → Int16
  let offset = 44;
  for (let i = 0; i < samples.length; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
    offset += 2;
  }

  return new Blob([buffer], { type: 'audio/wav' });
}

async function sendAudioChunk(blob: Blob): Promise<boolean> {
  try {
    const formData = new FormData();
    formData.append('audio', blob, 'chunk.wav');
    console.log(`[AudioDetection] POST /process-audio — ${blob.size}B WAV`);
    const res = await fetch('http://localhost:5000/process-audio', {
      method: 'POST',
      body: formData,
    });
    if (!res.ok) {
      console.warn(`[AudioDetection] POST failed — HTTP ${res.status}`);
      return false;
    }
    const data = await res.json();
    const detected = Boolean(data.boat_sound_detected);
    console.log(`[AudioDetection] Result → boat_sound_detected=${detected}`);
    return detected;
  } catch (err) {
    console.error('[AudioDetection] POST error:', err);
    return false;
  }
}

export function useAudioDetection(
  stream: MediaStream | null,
  enabled: boolean
): boolean {
  const [boatSoundDetected, setBoatSoundDetected] = useState(false);
  const contextRef    = useRef<AudioContext | null>(null);
  const processorRef  = useRef<ScriptProcessorNode | null>(null);
  const bufferRef     = useRef<Float32Array[]>([]);
  const intervalRef   = useRef<ReturnType<typeof setInterval> | null>(null);
  const sampleRateRef = useRef<number>(44100);

  useEffect(() => {
    if (!enabled || !stream) return;

    const audioTracks = stream.getAudioTracks();
    if (audioTracks.length === 0) {
      console.warn('[AudioDetection] No audio tracks in stream — skipping');
      return; // no mic track — skip silently
    }
    console.log(`[AudioDetection] Audio tracks found: ${audioTracks.length} (${audioTracks[0].label})`);

    // Build AudioContext pipeline: source → scriptProcessor → collect samples
    const ctx       = new AudioContext();
    console.log(`[AudioDetection] AudioContext created — sampleRate=${ctx.sampleRate} Hz`);
    const source    = ctx.createMediaStreamSource(stream);
    // ScriptProcessor is deprecated but has the widest browser support.
    // bufferSize 4096, 1 input, 1 output channel.
    const processor = ctx.createScriptProcessor(4096, 1, 1);
    contextRef.current   = ctx;
    processorRef.current = processor;
    sampleRateRef.current = ctx.sampleRate;
    bufferRef.current = [];

    processor.onaudioprocess = (e) => {
      // Copy the mono input channel data into our rolling buffer
      const data = e.inputBuffer.getChannelData(0);
      bufferRef.current.push(new Float32Array(data));
    };

    source.connect(processor);
    processor.connect(ctx.destination);

    // Every CHUNK_DURATION_MS: encode collected samples → WAV → send
    intervalRef.current = setInterval(async () => {
      if (bufferRef.current.length === 0) return;

      // Flatten all collected chunks into one Float32Array
      const totalLength = bufferRef.current.reduce((sum, b) => sum + b.length, 0);
      const merged = new Float32Array(totalLength);
      let offset = 0;
      for (const chunk of bufferRef.current) {
        merged.set(chunk, offset);
        offset += chunk.length;
      }
      bufferRef.current = []; // reset for next window

      const wav = encodeWAV(merged, sampleRateRef.current);
      console.log(`[AudioDetection] Chunk ready — ${merged.length} samples → ${wav.size}B WAV`);
      const detected = await sendAudioChunk(wav);
      setBoatSoundDetected(detected);
    }, CHUNK_DURATION_MS);

    return () => {
      console.log('[AudioDetection] Cleanup — stopping AudioContext and processor');
      if (intervalRef.current) clearInterval(intervalRef.current);
      processor.disconnect();
      source.disconnect();
      ctx.close();
      bufferRef.current = [];
    };
  }, [enabled, stream]);

  return boatSoundDetected;
}
