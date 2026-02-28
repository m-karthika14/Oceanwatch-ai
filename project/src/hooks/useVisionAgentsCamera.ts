/**
 * useVisionAgentsCamera
 *
 * Connects to a Stream Video room via @stream-io/video-react-sdk,
 * joins the call, enables the camera, and returns a MediaStream
 * from the local participant's video track — ready for canvas frame extraction.
 *
 * Falls back to raw getUserMedia if the SDK call fails for any reason.
 */

import { useEffect, useRef, useState } from 'react';
import { StreamVideoClient } from '@stream-io/video-react-sdk';

// ── Stream credentials ──────────────────────────────────────────────────────
// Replace these with real values from https://dashboard.getstream.io/
// For development, the guest token flow is used so no server is needed.
const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY ?? 'mmhfdzb5evj2';
const STREAM_CALL_ID = import.meta.env.VITE_STREAM_CALL_ID ?? 'oceanwatch-live-001';

export type CameraStatus =
  | 'idle'
  | 'connecting'      // joining Stream room
  | 'stream-active'   // Vision Agents room stream active
  | 'fallback-active' // raw getUserMedia fallback
  | 'error';

interface UseVisionAgentsCameraResult {
  stream: MediaStream | null;
  status: CameraStatus;
  statusLabel: string;
}

export function useVisionAgentsCamera(enabled: boolean): UseVisionAgentsCameraResult {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [status, setStatus] = useState<CameraStatus>('idle');

  const clientRef = useRef<StreamVideoClient | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const callRef = useRef<any>(null);

  useEffect(() => {
    if (!enabled) return;

    let cancelled = false;

    async function connect() {
      setStatus('connecting');

      try {
        // ── 1. Create a guest user (no token needed for guest type) ────────
        const userId = `oceanwatch-${Math.random().toString(36).slice(2, 8)}`;
        console.log(`[VisionAgents] Connecting as guest user: ${userId}`);
        const client = new StreamVideoClient({
          apiKey: STREAM_API_KEY,
          user: { id: userId, type: 'guest' },
          // guest users do NOT pass token or tokenProvider
        });
        clientRef.current = client;

        // ── 2. Join (or create) the call ──────────────────────────────────────
        const call = client.call('default', STREAM_CALL_ID);
        callRef.current = call;
        await call.join({ create: true });
        console.log(`[VisionAgents] Joined call: ${STREAM_CALL_ID}`);

        if (cancelled) return;

        // ── 3. Enable camera + microphone ────────────────────────────────
        await call.camera.enable();
        await call.microphone.enable();
        console.log('[VisionAgents] Camera and microphone enabled');

        // Give devices a moment to initialise
        await new Promise((r) => setTimeout(r, 800));
        if (cancelled) return;

        const videoStream = call.camera.state.mediaStream;
        const audioStream = call.microphone.state.mediaStream;
        console.log(
          `[VisionAgents] Video tracks: ${videoStream?.getVideoTracks().length ?? 0}  ` +
          `Audio tracks: ${audioStream?.getAudioTracks().length ?? 0}`
        );

        if (videoStream && videoStream.getVideoTracks().length > 0) {
          // Merge video + audio into one combined MediaStream so the caller
          // can drive both canvas frame extraction and audio detection.
          const combined = new MediaStream([
            ...videoStream.getVideoTracks(),
            ...(audioStream ? audioStream.getAudioTracks() : []),
          ]);
          console.log('[VisionAgents] Combined stream ready — status: stream-active');
          setStream(combined);
          setStatus('stream-active');
          return;
        }

        // If we didn't get a track, fall through to fallback
        throw new Error('No video track from Stream SDK');
      } catch (err) {
        console.warn('[VisionAgents] SDK failed, falling back to getUserMedia:', err);

        if (cancelled) return;

        // ── Fallback: raw webcam + mic ────────────────────────────────────
        try {
          const raw = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
          if (!cancelled) {
            console.log(
              `[VisionAgents] Fallback stream active — ` +
              `video=${raw.getVideoTracks().length} audio=${raw.getAudioTracks().length}`
            );
            setStream(raw);
            setStatus('fallback-active');
          } else {
            raw.getTracks().forEach((t) => t.stop());
          }
        } catch (fallbackErr) {
          console.error('[VisionAgents] Fallback getUserMedia also failed:', fallbackErr);
          if (!cancelled) setStatus('error');
        }
      }
    }

    connect();

    return () => {
      cancelled = true;
      // Leave the call and disconnect the client on unmount / disable
      console.log('[VisionAgents] Cleanup — leaving call and disconnecting client');
      callRef.current?.leave().catch(() => {});
      clientRef.current?.disconnectUser().catch(() => {});
      // Stop all media tracks
      stream?.getTracks().forEach((t) => t.stop());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  const statusLabel: Record<CameraStatus, string> = {
    idle: 'Idle',
    connecting: 'Joining Vision Agents Room…',
    'stream-active': 'Vision Agents · Live',
    'fallback-active': 'Camera · Live',
    error: 'Camera Error',
  };

  return { stream, status, statusLabel: statusLabel[status] };
}
