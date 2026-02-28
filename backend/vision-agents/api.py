"""
OceanWatch AI — Vision Agent API
Run with: uvicorn api:app --reload --port 8000
"""

from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
from ultralytics import YOLO
import io
import logging
import numpy as np
import cv2
import random
import scipy.io.wavfile as wavfile
import time

# ── Logging setup ──────────────────────────────────────────────────────────────
logging.basicConfig(
    level=logging.DEBUG,
    format="%(asctime)s  [%(levelname)-8s]  %(message)s",
    datefmt="%H:%M:%S",
)
log = logging.getLogger("oceanwatch")

app = FastAPI(
    title="OceanWatch Vision Agent API",
    description="Vision agent backend for OceanWatch AI",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Load YOLOv8 nano model once at startup (downloads ~6 MB on first run) ──
log.info("Loading YOLOv8n model...")
model = YOLO("yolov8n.pt")
log.info(f"YOLOv8n loaded — {len(model.names)} classes available")

# Classes treated as marine / animal presence
ANIMAL_CLASSES = ["bird", "cat", "dog", "horse", "sheep", "cow",
                  "elephant", "bear", "zebra", "giraffe", "fish",
                  "seal", "whale", "dolphin", "turtle", "crab"]

# Classes treated as pollution / debris
# NOTE: YOLOv8n is COCO-trained — in underwater footage it often misidentifies
# plastic bottles/containers as "broccoli", "vase", "bowl" etc. due to colour/shape
# similarity. We cast a wide net so any foreign manufactured object = pollution.
POLLUTION_CLASSES = [
    "bottle", "cup", "bowl", "vase", "wine glass",
    "can", "fork", "knife", "spoon", "scissors",
    "toothbrush", "hair drier", "cell phone", "remote",
    "backpack", "handbag", "suitcase", "umbrella",
    # Underwater misidentification catches:
    "broccoli", "banana", "apple", "orange", "carrot",
    "hot dog", "pizza", "donut", "cake", "sandwich",
    "frisbee", "sports ball", "kite", "baseball bat",
    "baseball glove", "skateboard", "surfboard", "tennis racket",
    "clock", "vase", "laptop", "mouse", "keyboard", "tv",
]

# Classes treated as vessels
VESSEL_CLASSES = ["boat", "ship"]


def get_action_insight(risk_score: int) -> str:
    stable = [
        "Marine conditions appear stable.",
        "Habitat remains balanced — reduce monitoring pressure.",
        "Environmental stability detected.",
        "No immediate ecosystem stress observed.",
        "Marine environment appears safe.",
        "Natural balance maintained.",
        "Minimal external disturbance present.",
        "Ecosystem remains within safe limits.",
        "Habitat conditions are steady.",
        "Monitoring indicates stability.",
    ]
    mild = [
        "Early environmental disturbance detected.",
        "Minor ecosystem imbalance emerging.",
        "Slight environmental stress present.",
        "Initial disruption observed.",
        "Habitat stability may be shifting.",
        "Preventive observation recommended.",
        "Low-level stress indicators present.",
        "Subtle changes in habitat detected.",
        "Environmental pressure beginning.",
        "Mild disturbance observed.",
    ]
    moderate = [
        "Moderate ecosystem stress observed.",
        "Marine conditions may require mitigation.",
        "Habitat balance appears affected.",
        "Environmental pressure increasing.",
        "Marine presence interacting with external factors.",
        "Stability may be declining.",
        "Activity limitation advised.",
        "Potential disruption detected.",
        "Adaptive monitoring recommended.",
        "Environmental strain observed.",
    ]
    high = [
        "High environmental pressure detected.",
        "Marine life may be affected.",
        "Disturbance impact is significant.",
        "Habitat stability compromised.",
        "External stressors present.",
        "Marine disturbance escalating.",
        "Environmental instability rising.",
        "Active mitigation may be required.",
        "Habitat integrity at risk.",
        "Marine ecosystem affected.",
    ]
    critical = [
        "Critical habitat stress detected.",
        "Immediate intervention may be necessary.",
        "Marine ecosystem integrity compromised.",
        "Urgent action required.",
        "Severe environmental pressure present.",
        "Habitat collapse possible.",
        "Rapid response advised.",
        "Marine risk at peak level.",
        "Critical environmental instability.",
        "Immediate mitigation required.",
    ]
    if risk_score <= 10:
        return random.choice(stable)
    elif risk_score <= 30:
        return random.choice(mild)
    elif risk_score <= 60:
        return random.choice(moderate)
    elif risk_score <= 90:
        return random.choice(high)
    else:
        return random.choice(critical)


@app.get("/")
def root():
    return {"status": "OceanWatch Agent Running"}


@app.get("/health")
def health():
    return {"status": "healthy"}


@app.post("/analyze-audio")
async def analyze_audio(file: UploadFile = File(...)):
    """
    Detect boat engine noise from a short WAV audio chunk.

    Boat engines produce dominant low-frequency mechanical energy in the
    20–200 Hz band.  We compute the energy ratio of that band vs the
    total spectrum; if it exceeds the threshold we flag boat sound.
    """
    contents = await file.read()
    log.info(f"[AUDIO] Received chunk: {len(contents):,} bytes")

    try:
        sample_rate, data = wavfile.read(io.BytesIO(contents))
        log.debug(f"[AUDIO] Decoded WAV — sample_rate={sample_rate} Hz, samples={len(data)}, dtype={data.dtype}")

        # Flatten stereo → mono
        if data.ndim > 1:
            log.debug(f"[AUDIO] Stereo detected ({data.shape[1]} ch) → converting to mono")
            data = data.mean(axis=1)

        data = data.astype(np.float32)

        # FFT magnitude spectrum
        spectrum = np.abs(np.fft.rfft(data))
        freqs    = np.fft.rfftfreq(len(data), d=1.0 / sample_rate)

        # Energy in boat-engine band (20–200 Hz)
        boat_mask  = (freqs >= 20) & (freqs <= 200)
        total_energy = float(np.sum(spectrum ** 2)) + 1e-9
        boat_energy  = float(np.sum(spectrum[boat_mask] ** 2))
        ratio        = boat_energy / total_energy

        log.debug(f"[AUDIO] Low-freq energy ratio = {ratio:.4f} (threshold = 0.15)")

        # Threshold: >15 % low-freq energy → boat sound present
        boat_sound_detected = bool(ratio > 0.15)

    except Exception as e:
        # If the audio cannot be decoded, default to no detection
        log.error(f"[AUDIO] Failed to decode WAV: {e}")
        boat_sound_detected = False

    log.info(f"[AUDIO] Result → boat_sound_detected={boat_sound_detected}")
    return {"boat_sound_detected": boat_sound_detected}


@app.post("/analyze-frame")
async def analyze_frame(
    file: UploadFile = File(...),
    boat_sound: str = Form("false"),
):
    t_start = time.perf_counter()

    # Convert form string → bool
    boat_sound_bool = boat_sound.lower() == "true"

    # ── STEP 3: Read image safely ──────────────────────────────────────────
    contents = await file.read()
    log.info(f"[FRAME] Received: {len(contents):,} bytes  |  boat_sound={boat_sound_bool}")

    image = Image.open(io.BytesIO(contents)).convert("RGB")
    img_np = np.array(image)
    log.debug(f"[FRAME] Image decoded — size={image.size}  shape={img_np.shape}")

    # ── Water Turbidity: Laplacian sharpness ───────────────────────────────
    gray = cv2.cvtColor(img_np, cv2.COLOR_RGB2GRAY)
    laplacian_var = cv2.Laplacian(gray, cv2.CV_64F).var()
    if laplacian_var > 100:
        turbidity = "Clear"
    elif laplacian_var > 50:
        turbidity = "Moderate"
    else:
        turbidity = "Murky"
    log.debug(f"[FRAME] Turbidity — laplacian_var={laplacian_var:.2f}  →  '{turbidity}'")

    # ── STEP 4: Run YOLO ───────────────────────────────────────────────────
    results = model(img_np, verbose=False)

    # ── STEP 5: Initialise counts ──────────────────────────────────────────
    fish_count = 0
    pollution_count = 0
    vessel_count = 0
    human_count = 0

    # ── STEP 6: Detection logic ────────────────────────────────────────────
    # Collect all boxes above threshold, then apply NMS-style deduplication:
    # only count the single highest-confidence box per category label so one
    # bottle underwater doesn't register as 2-3 pollution hits.
    raw_labels = []
    best_per_label: dict[str, float] = {}  # label → highest conf seen

    for r in results:
        if not r.boxes:
            continue
        for box in r.boxes:
            conf = float(box.conf[0])
            if conf < 0.15:
                continue
            cls_id = int(box.cls[0])
            label = model.names[cls_id].lower()
            if conf > best_per_label.get(label, 0.0):
                best_per_label[label] = conf

    for label, conf in best_per_label.items():
        raw_labels.append(f"{label}({conf:.2f})")

        if label in ANIMAL_CLASSES:
            fish_count += 1

        if label in POLLUTION_CLASSES:
            pollution_count += 1

        if label in VESSEL_CLASSES:
            vessel_count += 1

        if label == "person":
            human_count += 1
    log.debug(f"[FRAME] YOLO detections (conf≥0.15): {raw_labels if raw_labels else 'none'}")
    log.info(f"[FRAME] Counts — fish={fish_count}  pollution={pollution_count}  vessel={vessel_count}  human={human_count}")

    # ── STEP 7: Deterministic Risk Score ──────────────────────────────────
    risk_score = (
        fish_count      * 10 +
        pollution_count * 15 +
        vessel_count    * 20 +
        human_count     * 10
    )
    turbidity_bonus = 0
    if turbidity == "Moderate":
        turbidity_bonus = 10
    elif turbidity == "Murky":
        turbidity_bonus = 20
    risk_score += turbidity_bonus

    # Acoustic disturbance: boat engine noise detected via /analyze-audio
    audio_bonus = 15 if boat_sound_bool else 0
    risk_score += audio_bonus

    risk_score = min(risk_score, 100)
    log.debug(
        f"[FRAME] Risk calc — fish×10={fish_count*10}  pollution×15={pollution_count*15}  "
        f"vessel×20={vessel_count*20}  human×10={human_count*10}  "
        f"turbidity={turbidity_bonus}  audio={audio_bonus}  → total={risk_score}"
    )

    # ── Derive habitat condition & risk label from score ───────────────────
    if risk_score <= 10:
        habitat_condition = "Stable"
        habitat_risk = "Safe"
    elif risk_score <= 30:
        habitat_condition = "Low Pressure"
        habitat_risk = "Safe"
    elif risk_score <= 60:
        habitat_condition = "Moderate Pressure"
        habitat_risk = "Moderate"
    elif risk_score <= 90:
        habitat_condition = "High Pressure"
        habitat_risk = "High"
    else:
        habitat_condition = "Critical Pressure"
        habitat_risk = "High"

    action_insight = get_action_insight(risk_score)

    elapsed = time.perf_counter() - t_start
    log.info(
        f"[FRAME] Done in {elapsed*1000:.1f}ms — "
        f"risk={risk_score}  habitat='{habitat_condition}'  insight='{action_insight}'"
    )

    # ── STEP 8: Final response ─────────────────────────────────────────────
    return {
        "fish_count": fish_count,
        "pollution_count": pollution_count,
        "vessel_count": vessel_count,
        "human_count": human_count,
        "water_turbidity": turbidity,
        "boat_sound_detected": boat_sound_bool,
        "risk_score": risk_score,
        "habitat_condition": habitat_condition,
        "habitat_risk": habitat_risk,
        "action_insight": action_insight,
    }
