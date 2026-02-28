# OceanWatch AI 🌊

An AI-powered ocean monitoring dashboard that combines real-time computer vision, audio analysis, and a live streaming interface to detect marine pollution, vessels, wildlife, and habitat risk.

## Architecture

```
project/          ← React + Vite + TypeScript frontend (port 5173)
backend/
  server.js       ← Node.js Express bridge (port 5000)
  vision-agents/
    api.py        ← Python FastAPI + YOLOv8 + audio FFT (port 8000)
```

## Features

- 🎥 **Live mode** — connects to a Stream Video room via `@stream-io/video-react-sdk`
- 📁 **Upload mode** — analyse a local video file frame-by-frame
- 🐟 **YOLO object detection** — marine animals, plastic pollution, vessels, humans
- 🔊 **Audio FFT** — boat engine detection (20–200 Hz band)
- 💧 **Turbidity analysis** — OpenCV Laplacian variance
- 📊 **Risk score** — deterministic formula, habitat condition tiers
- 🔔 **Live Feed** — scrolling notifications per scan

## Quick Start

### 1. Python API
```bash
cd backend/vision-agents
uv venv          # or python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
uv pip install -r requirements.txt   # or: pip install fastapi uvicorn ultralytics opencv-python scipy
uvicorn api:app --reload --port 8000
```

### 2. Node Bridge
```bash
cd backend
npm install
node server.js
```

### 3. React Frontend
```bash
cd project
npm install
npm run dev
```

Open http://localhost:5173
