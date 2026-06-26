import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  Play, 
  Pause, 
  Volume2, 
  RotateCcw, 
  Sliders, 
  Zap, 
  Cpu, 
  Terminal,
  Activity
} from 'lucide-react';

interface Particle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  speed: number;
  noise: number;
}

export default function AcousticResonatorStation() {
  const [selectedPreset, setSelectedPreset] = useState<'RING' | 'CROSS' | 'SPIRAL' | 'STORM'>('RING');
  const [frequency, setFrequency] = useState(432); // Hz (Solfeggio tuning base)
  const [resonanceIndex, setResonanceIndex] = useState(65); // % multiplier
  const [isPlayingSound, setIsPlayingSound] = useState(false);
  const [synthVolume, setSynthVolume] = useState(0.2); // 0 to 1
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "[OK] STATION CORE-09 ONLINE: READY FOR COHESION LINK...",
    "[SYSTEM] SANDPLATE SEISMIC INTEGRITY AT 100% QUALITY",
    "[STATUS] SELECT PROJECTION HARMONIC ON PANEL"
  ]);

  // Canvas Refs
  const sandplateRef = useRef<HTMLCanvasElement | null>(null);
  const oscilloscopeRef = useRef<HTMLCanvasElement | null>(null);

  // Sound Refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscNodeRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Particle list
  const particlesRef = useRef<Particle[]>([]);

  // Log updater helper
  const addLog = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setTerminalLogs(prev => [`[${timestamp}] ${msg}`, ...prev.slice(0, 7)]);
  };

  // Lazy initialize Audio Web Synth
  const initAudio = () => {
    if (audioCtxRef.current) return;
    try {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (e) {
      console.error("Failed to initialize Web Audio Context", e);
    }
  };

  const handlePresetChange = (preset: 'RING' | 'CROSS' | 'SPIRAL' | 'STORM') => {
    setSelectedPreset(preset);
    addLog(`TRANSITIONING PATTERN MATRIX TO [${preset}] HARMONIC`);
    
    // Play structural sound tap
    playBeep(preset === 'RING' ? 528 : preset === 'CROSS' ? 396 : preset === 'SPIRAL' ? 639 : 741);
  };

  // Simple synthesised notification beep
  const playBeep = (freq: number) => {
    initAudio();
    const ctx = audioCtxRef.current;
    if (!ctx) return;
    
    // Quick micro-synth trigger
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    
    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.35);
  };

  // Toggle Continuous Cohesion Synth Sound
  useEffect(() => {
    if (isPlayingSound) {
      initAudio();
      const ctx = audioCtxRef.current;
      if (!ctx) return;

      // Resume context if suspended
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Create Oscillator
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);
      gain.gain.setValueAtTime(synthVolume * 0.15, ctx.currentTime);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();

      oscNodeRef.current = osc;
      gainNodeRef.current = gain;

      addLog(`COHESION SYNTH ACTIVATED AT ${frequency} HZ`);
    } else {
      if (oscNodeRef.current) {
        try {
          oscNodeRef.current.stop();
        } catch (e) {}
        oscNodeRef.current = null;
      }
      addLog("COHESION SYNTH DEACTIVATED / MUTE MODE");
    }

    return () => {
      if (oscNodeRef.current) {
        try {
          oscNodeRef.current.stop();
        } catch (e) {}
      }
    };
  }, [isPlayingSound]);

  // Adjust live synthesizer parameters
  useEffect(() => {
    if (oscNodeRef.current) {
      oscNodeRef.current.frequency.setValueAtTime(frequency, audioCtxRef.current?.currentTime || 0);
    }
  }, [frequency]);

  useEffect(() => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.setValueAtTime(synthVolume * 0.15, audioCtxRef.current?.currentTime || 0);
    }
  }, [synthVolume]);

  // 1. Chladni Sand plate particle calculation / animation
  useEffect(() => {
    const canvas = sandplateRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set high-density pixel mapping
    const handleResize = () => {
      const containerRect = canvas.parentElement?.getBoundingClientRect();
      canvas.width = containerRect?.width || 500;
      canvas.height = containerRect?.height || 500;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Initialize 800 sand plate specks
    const initParticles = () => {
      const arr: Particle[] = [];
      const count = 750;
      const w = canvas.width;
      const h = canvas.height;
      
      for (let i = 0; i < count; i++) {
        arr.push({
          x: Math.random() * w,
          y: Math.random() * h,
          targetX: Math.random() * w,
          targetY: Math.random() * h,
          speed: Math.random() * 0.05 + 0.02,
          noise: Math.random() * 2 * Math.PI
        });
      }
      particlesRef.current = arr;
    };
    initParticles();

    let animationId: number;

    const animateSand = () => {
      ctx.fillStyle = 'rgba(14, 14, 15, 0.25)'; // High-decay trail effect
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw cybernetic crosshair grids in background
      ctx.strokeStyle = 'rgba(93, 230, 255, 0.04)';
      ctx.lineWidth = 1;

      // Draw grid coordinates
      const step = 40;
      for (let x = 0; x < canvas.width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw circular radar rangefinder outlines
      ctx.strokeStyle = 'rgba(93, 230, 255, 0.07)';
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, Math.min(canvas.width, canvas.height) * 0.35, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, Math.min(canvas.width, canvas.height) * 0.18, 0, Math.PI * 2);
      ctx.stroke();

      // Render Chladni physical nodes
      const center_x = canvas.width / 2;
      const center_y = canvas.height / 2;
      const max_dim = Math.min(canvas.width, canvas.height) / 2;

      particlesRef.current.forEach(p => {
        // Map current coordinates to central normalized coordinate (-1 to +1)
        const nx = (p.x - center_x) / max_dim;
        const ny = (p.y - center_y) / max_dim;
        
        // Complex structural sand accumulation nodes according to mathematical harmonics
        let V = 0;
        const f_factor = frequency / 80;
        const r = Math.sqrt(nx * nx + ny * ny);
        const theta = Math.atan2(ny, nx);

        switch (selectedPreset) {
          case 'RING':
            // Concentric circle rings
            V = Math.sin(r * f_factor * Math.PI);
            break;
          case 'CROSS':
            // Quad-radial grid intersections
            V = Math.sin(nx * f_factor * 2) * Math.sin(ny * f_factor * 2);
            break;
          case 'SPIRAL':
            // Dynamic golden ratio spiral branches
            V = Math.sin((r * f_factor * 4.5) - (theta * 3));
            break;
          case 'STORM':
            // High chaotic noise displacement loops with magnetic shear
            V = Math.cos(r * f_factor * 2) * Math.sin(nx * 4) + Math.cos(ny * p.noise) * 0.5;
            break;
        }

        // Drifting physics: Sand grains undergo small displacement force proportional to absolute vibration value V.
        // Grains shift rapidly away from vibrating areas (|V| > 0.03) into stationary/nodal quiet zones (|V| close to 0).
        const vibration = Math.abs(V);

        if (vibration > 0.08) {
          // Add jitter/excitation movement proportional to vibration
          const angle = Math.random() * 2 * Math.PI;
          const force = vibration * 3.5;
          p.x += Math.cos(angle) * force;
          p.y += Math.sin(angle) * force;
        } else {
          // Slight settlement friction towards stable configurations
          p.x += (Math.random() - 0.5) * 0.45;
          p.y += (Math.random() - 0.5) * 0.45;
        }

        // Keep inside bounds
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Draw individual sand grains with beautiful metallic and cyan hue mix
        ctx.fillStyle = selectedPreset === 'STORM'
          ? `rgba(232, 123, 53, ${0.45 + (1 - vibration) * 0.45})`
          : `rgba(93, 230, 255, ${0.4 + (1 - vibration) * 0.55})`;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.25, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(animateSand);
    };

    animateSand();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [selectedPreset, frequency]);

  // 2. Interactive Oscilloscope Render (reactive to wave patterns)
  useEffect(() => {
    const canvas = oscilloscopeRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let tick = 0;

    const drawOscilloscope = () => {
      ctx.fillStyle = '#0e0e0f';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Grid line benchmarks
      ctx.strokeStyle = 'rgba(255, 182, 142, 0.05)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);
      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();

      // Plot actual wave based on selected parameters
      ctx.strokeStyle = isPlayingSound ? '#5de6ff' : 'rgba(164, 140, 127, 0.35)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      
      const width = canvas.width;
      const height = canvas.height;
      const midY = height / 2;

      for (let i = 0; i < width; i++) {
        const xFactor = i / width;
        const cycles = (frequency / 100) * 1.5;
        // Real-time animated oscillation
        const rad = xFactor * cycles * 2 * Math.PI - tick;
        
        let signalVal = 0;
        switch (selectedPreset) {
          case 'RING':
            signalVal = Math.sin(rad);
            break;
          case 'CROSS':
            // High-frequency interference pattern
            signalVal = (Math.sin(rad) + Math.cos(rad * 1.5)) * 0.5;
            break;
          case 'SPIRAL':
            // Wave folding envelope
            signalVal = Math.sin(rad) * Math.sin(rad * 0.08);
            break;
          case 'STORM':
            // Rough square/noise combination
            signalVal = Math.sign(Math.sin(rad)) * 0.4 + (Math.random() - 0.5) * 0.3;
            break;
        }

        // Apply volume attenuation
        const amp = isPlayingSound ? (synthVolume * (height * 0.35) + 5) : 8;
        const y = midY + signalVal * amp;

        if (i === 0) {
          ctx.moveTo(i, y);
        } else {
          ctx.lineTo(i, y);
        }
      }
      ctx.stroke();

      tick += isPlayingSound ? (frequency / 2500) + 0.03 : 0.01;
      animId = requestAnimationFrame(drawOscilloscope);
    };

    drawOscilloscope();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [selectedPreset, frequency, isPlayingSound, synthVolume]);

  // Click / Drag gesture on the Chladni sand plate to modulate frequencies dynamically
  const handlePlateInteract = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = sandplateRef.current;
    if (!canvas) return;

    const bounds = canvas.getBoundingClientRect();
    let clientX = 0;
    let clientY = 0;

    if ('touches' in e) {
      if (e.touches.length === 0) return;
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const mouse_x = clientX - bounds.left;
    const mouse_y = clientY - bounds.top;

    // Modulate Frequency on X (range 150 - 950 Hz) and volume / resonance on Y
    const xRatio = Math.max(0, Math.min(1, mouse_x / bounds.width));
    const yRatio = Math.max(0, Math.min(1, mouse_y / bounds.height));

    const newFreq = Math.round(150 + xRatio * 650);
    const newVol = Math.max(0.05, Math.min(0.5, 1 - yRatio));

    setFrequency(newFreq);
    setSynthVolume(newVol);

    if (!isPlayingSound) {
      setIsPlayingSound(true);
    }

    if (Math.random() < 0.12) {
      addLog(`MANUAL MATRIX MODULATION: ${newFreq} HZ / RES_AMP ${(newVol * 100).toFixed(0)}%`);
    }
  };

  return (
    <section 
      id="harmonic-monitor" 
      className="relative min-h-screen w-full flex flex-col justify-between py-16 px-6 lg:px-12 bg-[#0a0a0b] border-t border-b border-outline-variant/20 z-10 overflow-hidden select-none"
    >
      {/* Absolute Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-radial-gradient from-secondary/5 to-transparent pointer-events-none opacity-40" />
      <div className="absolute bottom-0 left-0 w-[550px] h-[550px] bg-radial-gradient from-primary/5 to-transparent pointer-events-none opacity-40" />
      <div className="absolute inset-0 grid-overlay z-0 opacity-40" />

      {/* STAMP HEADER TELEMETRY / STATION OVERVIEW */}
      <div className="max-w-7xl mx-auto w-full z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center border-b border-outline-variant/15 pb-6 mb-10 gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="h-1.5 w-1.5 bg-secondary animate-ping rounded-full" />
            <span className="font-mono text-[10px] text-secondary tracking-[0.4em] uppercase font-bold">FULLSCREEN INTERACTIVE INSTALLATION</span>
          </div>
          <h2 className="font-syne text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-wider text-on-background uppercase">
            CHLADNI COHESION SOUNDPLATE
          </h2>
          <p className="text-outline font-mono text-[11px] uppercase tracking-normal mt-2 leading-relaxed">
            Drag across the sounding steel plate to model real-time seismic waves and kinetic sand particles.
          </p>
        </div>

        {/* Live System Status Widget */}
        <div className="flex items-center gap-6 font-mono border border-outline-variant/30 bg-[#131314]/90 backdrop-blur-md p-4 rounded-sm shadow-md">
          <div className="text-left">
            <span className="text-[9px] text-outline tracking-wider block uppercase">STATION COORDINATE</span>
            <span className="text-xs font-bold text-secondary">ST-09 // SECTOR_WALL</span>
          </div>
          <div className="h-8 w-[1.5px] bg-outline-variant/25" />
          <div className="text-left">
            <span className="text-[9px] text-outline tracking-wider block uppercase">FREQUENCY LOCK</span>
            <span className="text-xs font-bold text-primary">{frequency} HZ</span>
          </div>
        </div>
      </div>

      {/* CORE WORKSPACE GRID */}
      <div className="max-w-7xl mx-auto w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch flex-grow">
        
        {/* LEFT COLUMN: INTERACTIVE CYBERNETIC SANDPLATE */}
        <div className="col-span-12 lg:col-span-7 flex flex-col justify-between items-stretch">
          <div className="relative flex-grow min-h-[350px] lg:min-h-[500px] bg-[#0e0e0f] border border-outline-variant/25 rounded-md shadow-[0_0_30px_rgba(0,0,0,0.6)] group overflow-hidden">
            {/* Stamp Screws */}
            <div className="screw top-3 left-3" />
            <div className="screw top-3 right-3" />
            <div className="screw bottom-3 left-3" />
            <div className="screw bottom-3 right-3" />

            {/* Laser scanning visualization lines */}
            <div className="absolute inset-x-0 h-[1.5px] bg-secondary/15 animate-[scanline_6s_linear_infinite] pointer-events-none z-10" />
            <div className="absolute inset-y-0 w-[1.5px] bg-primary/8 animate-[scanline_8s_linear_infinite] pointer-events-none z-10" />

            {/* Live Telemetry coordinates hud over canvas */}
            <div className="absolute top-4 left-6 z-10 font-mono text-[8px] sm:text-[9px] text-outline-variant/80 space-y-1 bg-[#131314]/60 p-2 border border-outline-variant/10 rounded-xs">
              <div className="text-secondary font-bold flex items-center gap-1.5">
                <span className="w-1 h-1 bg-secondary rounded-full" />
                PLATE FEED: 2D_SIMULATOR
              </div>
              <div>GRAINS STATE: STEADY</div>
              <div>COEFFICIENT: {(resonanceIndex * 1.5).toFixed(0)}</div>
            </div>

            {/* Soundplate drawing Canvas */}
            <canvas 
              id="cohesion-sandplate" 
              ref={sandplateRef}
              onMouseMove={handlePlateInteract}
              onMouseDown={handlePlateInteract}
              onTouchMove={handlePlateInteract}
              onTouchStart={handlePlateInteract}
              className="absolute inset-0 w-full h-full cursor-crosshair"
            />

            {/* Calibration Reticles Overlay */}
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center">
              <div className="border border-secondary/15 rounded-full w-[25%] aspect-square flex items-center justify-center animate-[spin_40s_linear_infinite]" />
              <div className="absolute border border-dashed border-primary/10 rounded-full w-[50%] aspect-square animate-[spin_90s_linear_infinite_reverse]" />
            </div>

            {/* Bottom stamp coordinate locator */}
            <div className="absolute bottom-4 inset-x-6 z-10 flex justify-between items-center font-mono text-[8px] sm:text-[9px] text-outline/45">
              <span>SANDPLATE MODULATOR (TOUCH/DRAG ALLOWED)</span>
              <span>GRID LIMIT: [0.0 - 1.0]</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: CYBER CONTROL PANELS AND TELEMETRY OSCILLOSCOPE */}
        <div className="col-span-12 lg:col-span-5 flex flex-col justify-between gap-8">
          
          {/* HARMONICS SELECTOR PANEL */}
          <div className="brushed-metal p-6 border border-outline-variant/20 rounded-md shadow-md space-y-6">
            <div className="flex justify-between items-center border-b border-outline-variant/20 pb-3">
              <h3 className="font-mono text-xs font-bold text-primary tracking-widest uppercase flex items-center gap-2">
                <Cpu size={14} /> SYSTEM HARMONIC HARNESS
              </h3>
              <span className="font-mono text-[8px] border border-secondary/30 text-secondary bg-secondary/5 px-2 py-0.5 rounded-sm font-bold uppercase">SECURE LINK</span>
            </div>

            {/* Harmonic mode buttons selector */}
            <div className="grid grid-cols-2 gap-3">
              {(['RING', 'CROSS', 'SPIRAL', 'STORM'] as const).map((preset) => (
                <button
                  key={preset}
                  onClick={() => handlePresetChange(preset)}
                  className={`py-3 px-4 flex flex-col justify-between font-mono rounded-sm border uppercase transition-all select-none hover:scale-102 ${
                    selectedPreset === preset 
                      ? 'bg-secondary/15 border-secondary text-secondary shadow-[0_0_15px_rgba(93,230,255,0.15)]'
                      : 'border-outline-variant/20 bg-background-custom text-outline hover:border-outline/50 hover:text-white'
                  }`}
                >
                  <span className="text-[10px] font-bold block text-left">
                    {preset === 'RING' ? '01 / RINGS' : preset === 'CROSS' ? '02 / CROSS' : preset === 'SPIRAL' ? '03 / SPIRAL' : '04 / CHAOS'}
                  </span>
                  <span className="text-[8px] opacity-60 text-right mt-1.5">
                    {preset === 'RING' ? 'SEISMIC' : preset === 'CROSS' ? 'CHLADNI' : preset === 'SPIRAL' ? 'OASIS' : 'DUNE DESERT'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* SCI-FI INTERACTIVE WAVE OSCILLOSCOPE */}
          <div className="bg-[#0e0e0f] p-6 border border-outline-variant/20 rounded-md shadow-inner flex flex-col justify-between gap-4">
            <div className="flex justify-between items-center border-b border-outline-variant/20 pb-2">
              <h4 className="font-mono text-xs font-bold text-outline/80 tracking-widest uppercase flex items-center gap-2">
                <Activity size={14} className="text-secondary animate-pulse" /> Live Telemetry Audio Web Oscilloscope
              </h4>
              <span className="font-mono text-[9px] text-secondary tracking-widest">ACTIVE_WAV</span>
            </div>

            {/* Oscilloscope Canvas */}
            <div className="h-28 bg-black rounded border border-outline-variant/10 overflow-hidden relative">
              <canvas ref={oscilloscopeRef} className="w-full h-full" />
              <div className="absolute top-2 right-3 font-mono text-[83%] scale-[0.7] transform origin-right text-primary/30 uppercase select-none">35.0 dBFS // FLOCKED</div>
            </div>

            {/* Control faders knobs dashboard */}
            <div className="space-y-4">
              {/* Frequency slider */}
              <div>
                <div className="flex justify-between text-[10px] font-mono text-outline mb-1.5 uppercase">
                  <span>Modulator Frequency:</span>
                  <span className="text-primary font-bold">{frequency} Hz</span>
                </div>
                <input 
                  type="range" 
                  min="120" 
                  max="950" 
                  value={frequency}
                  onChange={(e) => {
                    setFrequency(Number(e.target.value));
                    if (Math.random() < 0.08) addLog(`TUNED RESONANCE FREQUENCY TO ${e.target.value} HZ`);
                  }}
                  className="w-full accent-primary bg-surface-container-low border border-outline-variant/30 h-1 rounded-sm cursor-pointer"
                />
              </div>

              {/* Volume scale */}
              <div>
                <div className="flex justify-between text-[10px] font-mono text-outline mb-1.5 uppercase">
                  <span>Resonator Cohesion Gain:</span>
                  <span className="text-secondary font-bold">{(synthVolume * 100).toFixed(0)} %</span>
                </div>
                <input 
                  type="range" 
                  min="0.0" 
                  max="0.8" 
                  step="0.01"
                  value={synthVolume}
                  onChange={(e) => setSynthVolume(Number(e.target.value))}
                  className="w-full accent-secondary bg-surface-container-low border border-outline-variant/30 h-1 rounded-sm cursor-pointer"
                />
              </div>
            </div>

            {/* Sound Mute/Activate Button */}
            <button
              onClick={() => {
                setIsPlayingSound(!isPlayingSound);
                playBeep(440);
              }}
              className={`w-full py-2.5 rounded-sm font-mono text-xs font-bold tracking-widest transition-all uppercase flex justify-center items-center gap-2 border ${
                isPlayingSound 
                  ? 'bg-primary border-primary text-surface-dim hover:bg-primary/90 shadow-[0_0_15px_rgba(255,182,142,0.3)]' 
                  : 'border-primary/40 text-primary hover:bg-primary/5'
              }`}
            >
              {isPlayingSound ? (
                <>
                  <Pause size={14} /> MUTE FIELD
                </>
              ) : (
                <>
                  <Play size={14} /> ENGAGE SYNTH AUDIO
                </>
              )}
            </button>
          </div>

          {/* REAL TIME TERMINAL LOG FEED */}
          <div className="bg-[#09090a] border border-outline-variant/25 p-5 rounded-md flex-grow flex flex-col justify-between font-mono text-[9px] sm:text-[10px] space-y-3 shadow-md h-44 overflow-hidden relative">
            <div className="flex items-center gap-2 text-outline/70 border-b border-outline-variant/15 pb-2 text-[10px]">
              <Terminal size={12} className="text-second" />
              <span>DIAGNOSTIC TELEMETRY LOGGER</span>
            </div>

            <div className="flex-grow overflow-y-auto space-y-1 text-left text-outline/80">
              {terminalLogs.map((log, lIdx) => (
                <div key={lIdx} className="leading-relaxed truncate">
                  <span className="text-secondary select-none font-bold mr-1">&gt;</span> {log}
                </div>
              ))}
            </div>

            <div className="absolute bottom-2 right-4 text-[8px] text-outline/30 select-none uppercase">ST-9 ENGINE</div>
          </div>

        </div>

      </div>

    </section>
  );
}
