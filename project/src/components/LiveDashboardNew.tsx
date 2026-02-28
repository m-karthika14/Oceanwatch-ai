import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Square, Upload, Camera, Fish, Trash2, Anchor, User, ShieldAlert } from 'lucide-react';
import { LiveNotifications } from './LiveNotifications';
import { StopMonitoringPopup } from './StopMonitoringPopup';
import { useVisionAgentsCamera } from '../hooks/useVisionAgentsCamera';
import { useAudioDetection } from '../hooks/useAudioDetection';

interface AIResult {
  fish_count: number;
  pollution_count: number;
  vessel_count: number;
  human_count: number;
  water_turbidity: string;
  habitat_risk: string;
  habitat_condition: string;
  risk_score: number;
  action_insight: string;
  boat_sound_detected: boolean;
}

interface LiveDashboardNewProps {
  mode: 'upload' | 'live';
}

// ─── Utility: extract one JPEG frame from a video element and POST to Node ───
async function sendFrame(
  videoEl: HTMLVideoElement,
  boatSound: boolean,
  onResult: (result: AIResult) => void
) {
  if (videoEl.readyState < 2) return; // not enough data yet

  const canvas = document.createElement('canvas');
  canvas.width = videoEl.videoWidth || 640;
  canvas.height = videoEl.videoHeight || 480;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.drawImage(videoEl, 0, 0);

  canvas.toBlob(async (blob) => {
    if (!blob) return;
    const formData = new FormData();
    formData.append('frame', blob, 'frame.jpg');
    formData.append('boat_sound', String(boatSound));
    try {
      const res = await fetch('http://localhost:5000/process-frame', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) return;
      const data: AIResult = await res.json();
      onResult(data);
    } catch {
      // backend not yet running — silently skip
    }
  }, 'image/jpeg', 0.85);
}

export const LiveDashboardNew: React.FC<LiveDashboardNewProps> = ({ mode }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [aiResult, setAiResult] = useState<AIResult | null>(null);
  const [uploadedVideoUrl, setUploadedVideoUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadMicStream, setUploadMicStream] = useState<MediaStream | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── Vision Agents camera hook (live mode only) ──
  const { stream: liveStream, status: cameraStatus, statusLabel: cameraStatusLabel } =
    useVisionAgentsCamera(mode === 'live');

  // ── Audio stream: live mode uses the Vision Agents stream (has mic track),
  //    upload mode opens a separate mic-only stream so audio is still analysed. ──
  const audioStream = mode === 'live' ? liveStream : uploadMicStream;
  const boatSoundDetected = useAudioDetection(audioStream, true);
  // Keep a ref so the frame loop callback always reads the latest value
  const boatSoundRef = useRef(false);
  boatSoundRef.current = boatSoundDetected;

  // ── UPLOAD MODE: request mic as soon as a file is chosen ──
  useEffect(() => {
    if (mode !== 'upload') return;
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then((stream) => setUploadMicStream(stream))
      .catch(() => { /* mic denied — audio detection simply won't fire */ });
    return () => {
      uploadMicStream?.getTracks().forEach((t) => t.stop());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  const cameraError =
    cameraStatus === 'error'
      ? 'Camera access denied. Please allow camera permissions.'
      : null;

  const handleResult = useCallback((result: AIResult) => {
    setAiResult(result);
    setIsAnalyzing(false);
  }, []);

  // ── Start 2-second frame loop once the video is ready ──
  const startFrameLoop = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (videoRef.current) {
        setIsAnalyzing(true);
        sendFrame(videoRef.current, boatSoundRef.current, handleResult);
      }
    }, 2000);
  }, [handleResult]);

  // ── UPLOAD MODE ──
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setUploadedVideoUrl(url);
  };

  // When upload video is ready, start loop
  const handleVideoReady = () => {
    startFrameLoop();
  };

  // ── LIVE MODE — attach Vision Agents / fallback stream to video element ──
  useEffect(() => {
    if (mode !== 'live' || !liveStream || !videoRef.current) return;
    const video = videoRef.current;
    video.srcObject = liveStream;
    video.play()
      .then(() => startFrameLoop())
      .catch(() => {});
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [mode, liveStream, startFrameLoop]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (uploadedVideoUrl) URL.revokeObjectURL(uploadedVideoUrl);
      uploadMicStream?.getTracks().forEach((t) => t.stop());
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadedVideoUrl]);

  return (
    <>
      <div className="min-h-screen bg-ocean-command scanning-grid relative overflow-hidden">
        <div className="p-8">

          {/* Header */}
          <div className="mb-8">
            <h2 className="font-orbitron text-3xl font-bold text-ocean-teal uppercase tracking-wider mb-2">
              {mode === 'live' ? 'Live Camera — AI Analysis' : 'Upload Mode — AI Analysis'}
            </h2>
            <div className="h-1 w-32 bg-gradient-to-r from-ocean-teal to-transparent"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">

            {/* ── Video Panel ── */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-ocean-teal via-ocean-warning to-ocean-teal rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative aspect-video bg-ocean-panel border-2 border-ocean-teal/50 rounded-lg overflow-hidden flex items-center justify-center shadow-glow">

                {/* UPLOAD MODE — show upload prompt or video */}
                {mode === 'upload' && !uploadedVideoUrl && (
                  <div className="flex flex-col items-center gap-4 text-ocean-teal/60">
                    <Upload className="w-16 h-16" />
                    <p className="font-orbitron text-sm uppercase tracking-widest">Upload a video to begin</p>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-6 py-2 border-2 border-ocean-teal/50 rounded-lg font-orbitron text-xs uppercase tracking-wider text-ocean-teal hover:bg-ocean-teal/10 transition"
                    >
                      Choose File
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="video/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </div>
                )}

                {mode === 'upload' && uploadedVideoUrl && (
                  <video
                    ref={videoRef}
                    src={uploadedVideoUrl}
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    onLoadedData={handleVideoReady}
                  />
                )}

                {/* LIVE MODE — connecting overlay */}
                {mode === 'live' && !liveStream && !cameraError && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-ocean-teal/70 z-10">
                    <Camera className="w-14 h-14 animate-pulse" />
                    <p className="font-orbitron text-sm uppercase tracking-widest animate-pulse">
                      {cameraStatusLabel}
                    </p>
                  </div>
                )}

                {/* LIVE MODE — video (always mounted so ref is attached) */}
                {mode === 'live' && !cameraError && (
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    playsInline
                  />
                )}
                {mode === 'live' && cameraError && (
                  <div className="flex flex-col items-center gap-3 text-ocean-danger/80 px-8 text-center">
                    <Camera className="w-12 h-12" />
                    <p className="font-orbitron text-sm uppercase tracking-widest">{cameraError}</p>
                  </div>
                )}

                {/* REC badge */}
                <div className="absolute top-4 left-4 flex items-center space-x-2 px-3 py-2 rounded-lg bg-red-500/20 backdrop-blur-md border border-red-500/30">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-red-200 text-sm font-medium font-orbitron">
                    {mode === 'live' ? cameraStatusLabel.toUpperCase() : 'ANALYZING'}
                  </span>
                </div>

                {/* Analyzing spinner */}
                {isAnalyzing && (
                  <div className="absolute bottom-4 right-4 px-3 py-1 rounded-lg bg-ocean-teal/20 border border-ocean-teal/40 backdrop-blur-md">
                    <span className="font-orbitron text-xs text-ocean-teal uppercase tracking-wider animate-pulse">
                      Sending frame…
                    </span>
                  </div>
                )}
              </div>

              {/* Upload button when video already loaded */}
              {mode === 'upload' && uploadedVideoUrl && (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-3 flex items-center gap-2 px-4 py-2 border border-ocean-teal/40 rounded-lg font-orbitron text-xs text-ocean-teal hover:bg-ocean-teal/10 transition"
                >
                  <Upload className="w-4 h-4" /> Change Video
                </button>
              )}
              <input
                ref={mode === 'upload' && uploadedVideoUrl ? fileInputRef : undefined}
                type="file"
                accept="video/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>

            {/* ── Live Notifications ── */}
            <LiveNotifications aiResult={aiResult} />
          </div>

          {/* ── AI Result Panel ── */}
          {aiResult && (
            <div className="mb-8 p-8 bg-ocean-panel border-2 border-ocean-teal/40 rounded-lg">
              <h3 className="font-orbitron text-base font-bold text-ocean-teal uppercase tracking-widest mb-6">
                Vision Agent AI Analysis
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-5">
                {/* Marine / Fish */}
                <div className="p-6 border border-ocean-teal/30 rounded-lg bg-ocean-teal/5 flex flex-col items-center gap-3">
                  <Fish className="w-8 h-8 text-ocean-teal" />
                  <p className="font-orbitron text-4xl font-bold text-ocean-teal">{aiResult.fish_count}</p>
                  <p className="font-orbitron text-xs text-ocean-teal/60 uppercase tracking-wider text-center">Marine</p>
                </div>
                {/* Pollution */}
                <div className="p-6 border border-ocean-warning/30 rounded-lg bg-ocean-warning/5 flex flex-col items-center gap-3">
                  <Trash2 className="w-8 h-8 text-ocean-warning" />
                  <p className="font-orbitron text-4xl font-bold text-ocean-warning">{aiResult.pollution_count}</p>
                  <p className="font-orbitron text-xs text-ocean-warning/60 uppercase tracking-wider text-center">Pollution</p>
                </div>
                {/* Vessels */}
                <div className="p-6 border border-blue-400/30 rounded-lg bg-blue-400/5 flex flex-col items-center gap-3">
                  <Anchor className="w-8 h-8 text-blue-400" />
                  <p className="font-orbitron text-4xl font-bold text-blue-400">{aiResult.vessel_count}</p>
                  <p className="font-orbitron text-xs text-blue-400/60 uppercase tracking-wider text-center">Vessels</p>
                </div>
                {/* Humans */}
                <div className="p-6 border border-purple-400/30 rounded-lg bg-purple-400/5 flex flex-col items-center gap-3">
                  <User className="w-8 h-8 text-purple-400" />
                  <p className="font-orbitron text-4xl font-bold text-purple-400">{aiResult.human_count}</p>
                  <p className="font-orbitron text-xs text-purple-400/60 uppercase tracking-wider text-center">Humans</p>
                </div>
                {/* Habitat Risk */}
                <div className={`p-6 border-2 rounded-lg flex flex-col items-center gap-2 ${
                  aiResult.habitat_risk === 'High'
                    ? 'text-ocean-danger border-ocean-danger/50 bg-ocean-danger/10'
                    : aiResult.habitat_risk === 'Moderate'
                    ? 'text-ocean-warning border-ocean-warning/50 bg-ocean-warning/10'
                    : 'text-ocean-teal border-ocean-teal/50 bg-ocean-teal/10'
                }`}>
                  <ShieldAlert className="w-8 h-8" />
                  <p className="font-orbitron text-4xl font-bold">{aiResult.risk_score}</p>
                  <p className="font-orbitron text-sm font-bold">{aiResult.habitat_condition}</p>
                  <p className="font-orbitron text-xs opacity-60 uppercase tracking-wider text-center">Risk Score</p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-12 flex justify-center">
            <button
              onClick={() => setShowPopup(true)}
              className="flex items-center gap-3 px-8 py-4 bg-ocean-danger hover:bg-ocean-danger/80 text-ocean-command font-orbitron font-bold uppercase tracking-wider rounded-lg transition-all duration-300 hover:shadow-glow-red transform hover:scale-105"
            >
              <Square className="w-5 h-5" fill="currentColor" />
              Stop Monitoring
            </button>
          </div>

        </div>
      </div>

      {showPopup && (
        <StopMonitoringPopup
          onClose={() => setShowPopup(false)}
          pollutionCount={aiResult?.pollution_count}
          fishCount={aiResult?.fish_count}
          vesselCount={aiResult?.vessel_count}
          waterTurbidity={aiResult?.water_turbidity}
          habitatRisk={aiResult?.habitat_risk}
          habitatCondition={aiResult?.habitat_condition}
          riskScore={aiResult?.risk_score}
          actionInsight={aiResult?.action_insight}
        />
      )}
    </>
  );
};
