const express = require('express');
const cors = require('cors');
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');

const app = express();
const PORT = process.env.PORT || 5000;
const PYTHON_AGENT_URL  = 'http://localhost:8000/analyze-frame';
const PYTHON_AUDIO_URL  = 'http://localhost:8000/analyze-audio';

// ── Minimal timestamped logger ─────────────────────────────────────────────────
const ts   = () => new Date().toISOString();
const log  = (tag, msg) => console.log(`[${ts()}] [${tag}] ${msg}`);
const logE = (tag, msg) => console.error(`[${ts()}] [${tag}] ${msg}`);

// Middleware
app.use(cors());
app.use(express.json());

// Multer — keep frames in memory (no disk writes)
const upload = multer({ storage: multer.memoryStorage() });

// Health check route
app.get('/', (req, res) => {
  log('HEALTH', 'ping');
  res.json({ status: 'OceanWatch AI Backend is running' });
});

// ─── Frame Bridge ──────────────────────────────────────────────────────────────
// Receives a JPEG frame from the React frontend and forwards it to the
// Python Vision Agent at /analyze-frame, then returns the AI result.
app.post('/process-frame', upload.single('frame'), async (req, res) => {
  if (!req.file) {
    logE('FRAME-IN', 'No frame received in request');
    return res.status(400).json({ error: 'No frame received' });
  }

  const boatSound = req.body?.boat_sound === 'true';
  log('FRAME-IN', `size=${req.file.size}B  boat_sound=${boatSound}`);

  try {
    const formData = new FormData();
    formData.append('file', req.file.buffer, {
      filename: 'frame.jpg',
      contentType: 'image/jpeg',
    });

    // Forward boat_sound flag sent by the React frontend (defaults to false)
    formData.append('boat_sound', String(boatSound));

    const t0 = Date.now();
    const response = await axios.post(PYTHON_AGENT_URL, formData, {
      headers: formData.getHeaders(),
      timeout: 10000,
    });
    const elapsed = Date.now() - t0;

    const { risk_score, habitat_condition, fish_count, pollution_count, vessel_count, human_count } = response.data;
    log(
      'FRAME-OUT',
      `${elapsed}ms  risk=${risk_score}  habitat='${habitat_condition}'  ` +
      `fish=${fish_count} pollution=${pollution_count} vessel=${vessel_count} human=${human_count}`
    );

    res.json(response.data);
  } catch (error) {
    logE('FRAME-ERR', `Python call failed — ${error.message}`);
    res.status(500).json({ error: 'Error contacting AI agent' });
  }
});

// ─── Audio Bridge ──────────────────────────────────────────────────────────────
// Receives a WAV audio chunk from the React frontend and forwards it to the
// Python Vision Agent at /analyze-audio, then returns { boat_sound_detected }.
app.post('/process-audio', upload.single('audio'), async (req, res) => {
  if (!req.file) {
    logE('AUDIO-IN', 'No audio received in request');
    return res.status(400).json({ error: 'No audio received' });
  }

  log('AUDIO-IN', `size=${req.file.size}B`);

  try {
    const formData = new FormData();
    formData.append('file', req.file.buffer, {
      filename: 'chunk.wav',
      contentType: 'audio/wav',
    });

    const t0 = Date.now();
    const response = await axios.post(PYTHON_AUDIO_URL, formData, {
      headers: formData.getHeaders(),
      timeout: 10000,
    });
    const elapsed = Date.now() - t0;

    log('AUDIO-OUT', `${elapsed}ms  boat_sound_detected=${response.data.boat_sound_detected}`);

    res.json(response.data);
  } catch (error) {
    logE('AUDIO-ERR', `Python call failed — ${error.message}`);
    res.status(500).json({ error: 'Error contacting audio agent' });
  }
});

// Start server
app.listen(PORT, () => {
  log('STARTUP', `Node bridge running on http://localhost:${PORT}`);
});
