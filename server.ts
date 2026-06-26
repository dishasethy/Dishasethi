import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Create application-wide GoogleGenAI helper lazily or checked
let ai: any = null;
const key = process.env.GEMINI_API_KEY;
if (key) {
  ai = new GoogleGenAI({
    apiKey: key,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Standard middleware
  app.use(express.json());

  // API Route: Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  // API Route: Decrypt & Analyze Arrakis Signal via Gemini
  app.post("/api/transmission", async (req, res) => {
    const {
      identifier = "ANONYMOUS_ACQUIRE",
      frequency = "432.12 Hz",
      uiArchitecture = 90,
      soundSynthesis = 50,
      spatialPerformance = 50,
      priorityOverride = false,
      secureChannel = false,
      intensityThreshold = "MID",
      transmissionMessage = ""
    } = req.body;

    console.log(`Processing telemetry from user [${identifier}] on channel [${frequency}]`);

    // Guard against missing key or uninitialized AI client
    if (!ai) {
      // Return highly atmospheric simulated response if Gemini key is missing
      const mockResult = {
        success: true,
        isSimulated: true,
        signalStatus: "SIMULATED / OFFLINE PORTAL",
        frequencyAnalysis: `Active carrier wave captured at exactly ${frequency}. Waveform profile exhibits classic high-friction sand attenuation. Dynamic filters indicate a tactile balance of: UI Architecture (${uiArchitecture}%), Sound Synthesis (${soundSynthesis}%), and Spatial Design (${spatialPerformance}%).`,
        mentatTechnicalLog: `[TELEMETRY LOGGER WARNING] Deep-space API link unconfigured. To unlock genuine Mentat analyses, please enter your GEMINI_API_KEY in the AI Studio Secrets configurations.

PROPOSED SYNTH BLUEPRINT:
1. Low-frequency Sand Oscillator: Set pitch to 45Hz with secondary modulation on a ${frequency} sub-carrier.
2. Spatial Phase Shifter: Set decay factor to ${spatialPerformance / 100} to account for rocky outcrop reflections.
3. Message Intercepted: "${transmissionMessage || "No message signal injected"}"`,
        beneGesseritPoetry: `A quiet voice has whispered through the shields: "${transmissionMessage || "The sand stirs..."}"
No spice flows where the mind blocks the path.
Initialize your secrets to hear the desert sing.`,
        audioBlueprint: {
          carrier: parseFloat(frequency) || 432,
          modulator: soundSynthesis * 1.5,
          feedback: uiArchitecture / 100,
          depth: spatialPerformance / 100
        }
      };
      return res.json(mockResult);
    }

    try {
      const prompt = `
You are the Imperial Arrakeen Signal Analyzer, an advanced Mentat computer system operating on Dune.
We have received a manual signal with the following hardware telemetry:
- Identifier: "${identifier}"
- Carrier Frequency: "${frequency}"
- UI Architecture Slider: ${uiArchitecture}%
- Sound Synthesis Friction: ${soundSynthesis}%
- Spatial Design Resonance: ${spatialPerformance}%
- Priority Override Key: ${priorityOverride ? "ACTIVATED" : "DEACTIVATED"}
- Secure Quantum Tunnel: ${secureChannel ? "ESTABLISHED" : "BYPASSED"}
- Decibel Intensity Threshold: "${intensityThreshold}"
- Manual Encrypted Audio Text: "${transmissionMessage}"

Generate a highly immersive response in the exact aesthetic of Dune / Arrakis lore and analog synthesizers. Use Markdown format.
Return a JSON structure containing:
1. "signalStatus": A technical classification of the transmission quality (e.g., "SPICE INTERFERENCE DETECTED", "LACONIC BENE GESSERIT CARRIER", "ORNITHOPTER GLIDE PATH SYNCED"). Include short technical codes.
2. "frequencyAnalysis": A technical description of what these frequencies represent mathematically or sound-wise (e.g., "Low-frequency sub-bass hum matching sandworm rhythmic feeding patterns", "The sound of sand brushing against an Ornithopter's wings at high altitudes").
3. "mentatTechnicalLog": A deep, highly detailed, fictional tech log that a tech officer or Mentat would write summarizing these visual and audio sliders (using UI Architecture, Sound Synthesis, Spatial Design parameters). Suggest a synthesizer recipe or signal routing (e.g., "Modulate carrier pitch with LFO 1 at UI rate...").
4. "beneGesseritPoetry": A deep, atmospheric, poetic warning or prophecy inspired by Bene Gesserit wisdom or Fremen survival based on their message.
5. "audioBlueprint": an object with numeric parameters computed from input to feed into our live oscillators (carrier: number, modulator: number, feedback: number, depth: number).

Be creative, technical, and atmospheric. Respond ONLY with valid JSON structure so we can parse it directly. No preamble, no markdown code blocks inside the JSON fields. Ensure it is strict JSON.
`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          systemInstruction: "You are a master signal engineer and sci-fi worldbuilder. You output exclusively strict JSON that confirms exactly to the required keys.",
        }
      });

      const responseText = response.text || "{}";
      const parsed = JSON.parse(responseText.trim());
      res.json({
        success: true,
        isSimulated: false,
        ...parsed
      });

    } catch (error: any) {
      console.error("Gemini invocation error:", error);
      res.status(500).json({
        success: false,
        error: error.message || "Imperial signal link degradation.",
        isSimulated: true,
        signalStatus: "LINK FAIL",
        frequencyAnalysis: `Failsafe triggered. Defaulting to local sand oscillation at ${frequency}.`,
        mentatTechnicalLog: `The signal link degraded due to: ${error.message || "Unknown error"}. Check console and credentials.`,
        beneGesseritPoetry: "Even in the shadow of complete collapse, the Fremen walks without fear.",
        audioBlueprint: {
          carrier: parseFloat(frequency) || 432,
          modulator: 13,
          feedback: 0.5,
          depth: 0.5
        }
      });
    }
  });

  // Serve static files in production or hook Vite in development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Arrakis Harmonic server online on port ${PORT}`);
  });
}

startServer();
