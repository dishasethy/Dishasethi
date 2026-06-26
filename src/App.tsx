import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import AcousticResonatorStation from './components/AcousticResonatorStation';
import { 
  Play, 
  Pause, 
  ChevronLeft, 
  ChevronRight, 
  Fingerprint, 
  Lock, 
  ShieldAlert, 
  Wifi, 
  RotateCcw, 
  Send, 
  Dribbble, 
  Github, 
  Linkedin, 
  Instagram,
  Terminal,
  Activity,
  Sliders,
  Volume2,
  Sparkles,
  Zap,
  Cpu,
  Database,
  Code,
  Binary,
  Layers,
  Globe
} from 'lucide-react';

// Scramble text with heavy random numbers cypher effect
function ScrambleText({ text, active = true, speed = 25 }: { text: string; active?: boolean; speed?: number }) {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startScramble = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    let iteration = 0;
    const numberPool = '0123456789';
    const symbolPool = '0123456789%@$#+*&';
    
    intervalRef.current = setInterval(() => {
      setDisplayText(
        text.split('').map((char, index) => {
          if (index < iteration) return text[index];
          if (char === ' ' || char === '\n' || char === '/' || char === '-') return char;
          // Prefer random numbers
          return numberPool[Math.floor(Math.random() * numberPool.length)];
        }).join('')
      );
      
      if (iteration >= text.length) {
        clearInterval(intervalRef.current!);
      }
      iteration += 1 / 3;
    }, speed);
  };

  useEffect(() => {
    if (active) {
      startScramble();
    } else {
      setDisplayText(text);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, active]);

  return (
    <span 
      onMouseEnter={startScramble}
      className="cursor-pointer hover:text-secondary duration-150 transition-colors inline-block"
    >
      {displayText}
    </span>
  );
}

export default function App() {
  // Pre-loading system state for Arrakis Harmonic - Spaceship Flight Deck Cockpit Edition
  const [appLoaded, setAppLoaded] = useState(false);
  const [loadPercentage, setLoadPercentage] = useState(0);
  const [loadStatus, setLoadStatus] = useState('BOOTING SPACECRAFT SYSTEMS CORE...');
  const [binaryStream, setBinaryStream] = useState<string>('');

  useEffect(() => {
    const statuses = [
      { thresh: 0, text: 'BOOTING SPACECRAFT POWERGRID CORE...' },
      { thresh: 15, text: 'SYNCHRONIZING GRAVITATIONAL ANCHORS...' },
      { thresh: 35, text: 'IGNITING DEEP-SPACE FUSION IMPULSE DRIVE...' },
      { thresh: 55, text: 'COMPUTING DEPARTURE VECTOR TRAJECTORIES...' },
      { thresh: 75, text: 'STABILIZING COCKPIT LIFE-SUPPORT CANOPY...' },
      { thresh: 90, text: 'WARPING THE SPACE-TIME CONTINUUM...' },
      { thresh: 100, text: 'SYSTEM SECURE. ENTRANCE PROTOCOL DEPLOYED.' }
    ];

    // GSAP countdown tween from 0 to 100 over exactly 2.5 seconds
    const counter = { val: 0 };
    const tween = gsap.to(counter, {
      val: 100,
      duration: 2.5,
      ease: 'none',
      onUpdate: () => {
        const currentPercentage = Math.floor(counter.val);
        setLoadPercentage(currentPercentage);

        // Find correct status text based on current percentage
        const activeStatus = [...statuses].reverse().find(s => currentPercentage >= s.thresh);
        if (activeStatus) {
          setLoadStatus(activeStatus.text);
        }

        // Generate rapid dynamic high-speed auto-generating numeric patterns
        let bin = '';
        const chars = '0123456789ABCDEF ';
        for (let i = 0; i < 90; i++) {
          bin += chars[Math.floor(Math.random() * chars.length)];
        }
        setBinaryStream(bin);
      },
      onComplete: () => {
        // Futuristic space audio chime on completed load
        try {
          triggerTickTone(440, 0.12, 'sine');
          setTimeout(() => triggerTickTone(554.37, 0.12, 'sine'), 80);
          setTimeout(() => triggerTickTone(659.25, 0.12, 'sine'), 160);
          setTimeout(() => triggerTickTone(880, 0.35, 'sine'), 240);
        } catch (e) {
          console.error(e);
        }

        // Direct load - bypass the engage button completely and directly transition to the main app
        setTimeout(() => {
          setAppLoaded(true);
        }, 300);
      }
    });

    // GSAP continuous rotations for radar elements
    gsap.to('.gsap-orbit-outer', {
      rotation: 360,
      duration: 12,
      repeat: -1,
      ease: 'none'
    });

    gsap.to('.gsap-orbit-inner', {
      rotation: -360,
      duration: 8,
      repeat: -1,
      ease: 'none'
    });

    // Space-drift zoom effect on background spaceship/universe wallpaper
    gsap.to('.gsap-spaceship-bg', {
      scale: 1.1,
      x: -25,
      y: -25,
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    return () => {
      tween.kill();
      gsap.killTweensOf('.gsap-orbit-outer');
      gsap.killTweensOf('.gsap-orbit-inner');
      gsap.killTweensOf('.gsap-spaceship-bg');
    };
  }, []);

  // Navigation active tab
  const [activeTab, setActiveTab] = useState('projects');

  // Technology logo mapper for futuristic marquee stream with official brand colored SVGs
  const getTechIcon = (name: string) => {
    let url = "";
    switch (name) {
      case "NEXT.JS": url = "https://cdn.simpleicons.org/nextdotjs/white"; break;
      case "PYTHON": url = "https://cdn.simpleicons.org/python/3776AB"; break;
      case "C++": url = "https://cdn.simpleicons.org/cplusplus/00599C"; break;
      case "REACT": url = "https://cdn.simpleicons.org/react/61DAFB"; break;
      case "TYPESCRIPT": url = "https://cdn.simpleicons.org/typescript/3178C6"; break;
      case "NODE.JS": url = "https://cdn.simpleicons.org/nodedotjs/339933"; break;
      case "EXPRESS": url = "https://cdn.simpleicons.org/express/white"; break;
      case "TAILWIND": url = "https://cdn.simpleicons.org/tailwindcss/06B6D4"; break;
      case "FASTAPI": url = "https://cdn.simpleicons.org/fastapi/009688"; break;
      case "MONGODB": url = "https://cdn.simpleicons.org/mongodb/47A248"; break;
      case "SQLITE": url = "https://cdn.simpleicons.org/sqlite/003B57"; break;
      case "GITHUB": url = "https://cdn.simpleicons.org/github/white"; break;
      case "DOCKER": url = "https://cdn.simpleicons.org/docker/2496ED"; break;
      case "PYTORCH": url = "https://cdn.simpleicons.org/pytorch/EE4C2C"; break;
      case "LINUX": url = "https://cdn.simpleicons.org/linux/FCC624"; break;
      default: url = "https://cdn.simpleicons.org/cpu/white";
    }

    return (
      <img 
        src={url} 
        alt={`${name} icon`} 
        referrerPolicy="no-referrer"
        className="w-4 h-4 md:w-5 md:h-5 object-contain filter drop-shadow-[0_0_2px_rgba(255,255,255,0.15)] group-hover/badge:scale-110 transition-transform duration-300"
      />
    );
  };

  // Live clock displaying date and time with scroll-seconds
  const [currentChrono, setCurrentChrono] = useState('');
  useEffect(() => {
    const updateChrono = () => {
      const now = new Date();
      const days = now.getDate().toString().padStart(2, '0');
      const months = now.toLocaleString('en-US', { month: 'short' }).toUpperCase();
      const year = now.getFullYear();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      setCurrentChrono(`${days} ${months} ${year} — ${hours}:${minutes}:${seconds}`);
    };
    updateChrono();
    const interval = setInterval(updateChrono, 1000);
    return () => clearInterval(interval);
  }, []);

  // Latency ticker
  const [latency, setLatency] = useState(12);
  useEffect(() => {
    const timer = setInterval(() => {
      setLatency(10 + Math.floor(Math.random() * 5));
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  // Audio system state
  const [synthOn, setSynthOn] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  // Mixer board faders values (0 to 100)
  const [uiArch, setUiArch] = useState(92);
  const [soundSynth, setSoundSynth] = useState(78);
  const [spatialDesign, setSpatialDesign] = useState(85);

  // Project Carousel Index
  const [projectIndex, setProjectIndex] = useState(0);

  // Form parameters
  const [userName, setUserName] = useState('DISHA_SETHI');
  const [userEmail, setUserEmail] = useState('disha1sethi@gmail.com');
  const [knob1, setKnob1] = useState(45); // Value in degrees or percent
  const [knob2, setKnob2] = useState(75); // Value in degrees or percent
  const [priorityOverride, setPriorityOverride] = useState(false);
  const [secureChannel, setSecureChannel] = useState(true);
  const [intensity, setIntensity] = useState('MID'); // LOW, MID, HI
  const [message, setMessage] = useState('Initiating encrypted channel connection to Disha Sethi\'s professional portfolio nexus...');

  // GSAP active simulation elements references
  const heroImageContainerRef = useRef<HTMLDivElement | null>(null);
  const gridLinesContainerRef = useRef<HTMLDivElement | null>(null);
  const matrixPulseRef = useRef<HTMLDivElement | null>(null);

  // Biometric Scan state
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanMessage, setScanMessage] = useState('SCAN THUMBPRINT TO INITIALIZE ENCRYPTED TRANSMISSION');

  // GSAP Cinematic Overdrive sequence controller
  const [overdriveActive, setOverdriveActive] = useState(false);
  
  // Decrypted Imperial Transmission Data
  const [signalResult, setSignalResult] = useState<{
    signalStatus: string;
    frequencyAnalysis: string;
    mentatTechnicalLog: string;
    beneGesseritPoetry: string;
    isSimulated: boolean;
  } | null>(null);

  // Custom Cursor variables and responsive fine-pointer detection via high-performance refs
  const mouseRef = useRef({ x: -100, y: -100 });
  const laggedMouseRef = useRef({ x: -100, y: -100 });
  const [isMouseInitialActive, setIsMouseInitialActive] = useState(false);
  const [isCursorHoveringInteractive, setIsCursorHoveringInteractive] = useState(false);
  const [cursorLabel, setCursorLabel] = useState('HIT A CLICK!!');
  const [isCursorClicking, setIsCursorClicking] = useState(false);
  const [isCoarsePointer, setIsCoarsePointer] = useState(true);

  // High performance DOM references for direct styling manipulation (0% React rerender cost)
  const cursorPointRef = useRef<HTMLDivElement | null>(null);
  const cursorReticleRef = useRef<HTMLDivElement | null>(null);
  const cursorCoordsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const pointerQuery = window.matchMedia('(pointer: coarse)');
    setIsCoarsePointer(pointerQuery.matches);
    
    const handlePointerChange = (e: MediaQueryListEvent) => {
      setIsCoarsePointer(e.matches);
    };
    pointerQuery.addEventListener('change', handlePointerChange);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      if (!isMouseInitialActive) {
        setIsMouseInitialActive(true);
      }
      
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInProjectCard = !!target.closest('[id^="project-card-"]');
        const isInProjectsSection = !!target.closest('#projects');
        const isInteractive = !!target.closest('button, a, input, select, [role="button"], canvas, input[type="range"]') || isInProjectCard || isInProjectsSection;
        
        setIsCursorHoveringInteractive(prev => prev !== isInteractive ? isInteractive : prev);
        
        const targetLabel = (isInProjectCard || isInProjectsSection) ? 'ENTER' : 'HIT A CLICK!!';
        setCursorLabel(prev => prev !== targetLabel ? targetLabel : prev);
      }
    };

    const handleMouseDown = () => setIsCursorClicking(true);
    const handleMouseUp = () => setIsCursorClicking(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      pointerQuery.removeEventListener('change', handlePointerChange);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isMouseInitialActive]);

  // Smooth lag filter loop for physics-based spring custom cursor animation
  useEffect(() => {
    if (isCoarsePointer) return;

    let animId: number;
    let isActive = true;

    // Initialize lagged position once mouse moves
    if (laggedMouseRef.current.x === -100) {
      laggedMouseRef.current = { ...mouseRef.current };
    }

    const tick = () => {
      if (!isActive) return;

      const dx = mouseRef.current.x - laggedMouseRef.current.x;
      const dy = mouseRef.current.y - laggedMouseRef.current.y;

      // Spring displacement with 0.16 friction interpolation
      laggedMouseRef.current.x += dx * 0.16;
      laggedMouseRef.current.y += dy * 0.16;

      // Position point cursor via CSS translate directly (no render recursion)
      if (cursorPointRef.current) {
        cursorPointRef.current.style.transform = `translate3d(${mouseRef.current.x}px, ${mouseRef.current.y}px, 0) translate3d(-50%, -50%, 0)`;
      }

      // Position target reticle cursor with spring-lag displacement
      if (cursorReticleRef.current) {
        cursorReticleRef.current.style.transform = `translate3d(${laggedMouseRef.current.x}px, ${laggedMouseRef.current.y}px, 0) translate3d(-50%, -50%, 0)`;
      }

      // Live write coordinates to the HUD tag
      if (cursorCoordsRef.current) {
        cursorCoordsRef.current.textContent = `SYS:${Math.floor(mouseRef.current.x)}x${Math.floor(mouseRef.current.y)}`;
      }

      animId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      isActive = false;
      cancelAnimationFrame(animId);
    };
  }, [isCoarsePointer]);

  // Audio Engine logic
  const initAudio = () => {
    if (!audioCtxRef.current) {
      // Create safe Context
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      audioCtxRef.current = new AudioCtxClass();
    }
  };

  const startSynth = () => {
    try {
      initAudio();
      if (!audioCtxRef.current) return;

      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      // Create units
      const osc = audioCtxRef.current.createOscillator();
      const filter = audioCtxRef.current.createBiquadFilter();
      const gain = audioCtxRef.current.createGain();

      osc.type = 'sawtooth';
      
      // Calculate dynamic frequency from Dial 2 (Knob 2)
      // Knob value (0 to 100) resolves to 100Hz to 600Hz frequency range
      const targetFreq = 110 + (knob2 * 4.5);
      osc.frequency.setValueAtTime(targetFreq, audioCtxRef.current.currentTime);

      filter.type = 'lowpass';
      // Calculate filter Cutoff frequency from Sound Synthesis fader
      const filterCutoff = 100 + (soundSynth * 35);
      filter.frequency.setValueAtTime(filterCutoff, audioCtxRef.current.currentTime);
      filter.Q.setValueAtTime(4, audioCtxRef.current.currentTime);

      gain.gain.setValueAtTime(0.001, audioCtxRef.current.currentTime);
      // Soft envelope start
      gain.gain.exponentialRampToValueAtTime(0.12, audioCtxRef.current.currentTime + 0.15);

      // Connect
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtxRef.current.destination);

      osc.start();

      oscRef.current = osc;
      filterRef.current = filter;
      gainRef.current = gain;
      setSynthOn(true);

      // Trigger GSAP Flash Wave on start!
      gsap.fromTo(matrixPulseRef.current, 
        { scaleY: 0, opacity: 0.8, backgroundColor: 'rgba(93, 230, 255, 0.4)' },
        { scaleY: 2.5, opacity: 0, duration: 1, ease: 'power3.out' }
      );
    } catch (e) {
      console.warn("Audio error:", e);
    }
  };

  const stopSynth = () => {
    try {
      if (gainRef.current && audioCtxRef.current) {
        gainRef.current.gain.cancelScheduledValues(audioCtxRef.current.currentTime);
        gainRef.current.gain.setValueAtTime(gainRef.current.gain.value, audioCtxRef.current.currentTime);
        gainRef.current.gain.linearRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.1);
        
        setTimeout(() => {
          if (oscRef.current) {
            oscRef.current.stop();
            oscRef.current.disconnect();
          }
          setSynthOn(false);
        }, 120);
      } else {
        setSynthOn(false);
      }
    } catch (e) {
      setSynthOn(false);
    }
  };

  const handleStartToggle = () => {
    if (synthOn) {
      stopSynth();
    } else {
      startSynth();
    }
  };

  // Dynamically update audio parameters when sliders change
  useEffect(() => {
    if (synthOn && audioCtxRef.current && filterRef.current) {
      const filterCutoff = 100 + (soundSynth * 35);
      filterRef.current.frequency.setTargetAtTime(filterCutoff, audioCtxRef.current.currentTime, 0.1);
    }
  }, [soundSynth, synthOn]);

  useEffect(() => {
    if (synthOn && audioCtxRef.current && oscRef.current) {
      const targetFreq = 110 + (knob2 * 4.5);
      oscRef.current.frequency.setTargetAtTime(targetFreq, audioCtxRef.current.currentTime, 0.15);
    }
  }, [knob2, synthOn]);

  // Motion dynamics for sand particles gathering
  const particleMultiplierRef = useRef<number>(1);
  useEffect(() => {
    // Dynamic spring deceleration with GSAP when Knob values are cranked
    gsap.to(particleMultiplierRef, {
      current: 1 + (knob1 / 30) + (knob2 / 30),
      duration: 0.8,
      ease: 'power2.out'
    });
  }, [knob1, knob2]);

  // Visualizer Animation heights
  const [visualizerHeights, setVisualizerHeights] = useState<number[]>(new Array(40).fill(10));
  useEffect(() => {
    let animationId: number;
    const animate = () => {
      setVisualizerHeights(prev => 
        prev.map(() => {
          const multiplier = synthOn ? 85 : 25;
          const randomFactor = Math.random() * multiplier;
          const minHeight = synthOn ? 18 : 6;
          return minHeight + randomFactor;
        })
      );
      const timeout = synthOn ? 80 : 150;
      animationId = window.setTimeout(animate, timeout);
    };
    animate();
    return () => clearTimeout(animationId);
  }, [synthOn]);

  // FX trigger tones on interaction
  const triggerTickTone = (freq: number = 880, duration: number = 0.05, style: 'sine' | 'square' = 'sine') => {
    try {
      initAudio();
      if (!audioCtxRef.current) return;
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = style;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // Ignored
    }
  };

  // Particles system engine on local canvas
  const particleCanvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = particleCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particlesArray: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      alpha: number;
      factor: number;
    }> = [];

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      const pCount = Math.floor((canvas.width * canvas.height) / 16000);
      particlesArray = [];
      for (let i = 0; i < pCount; i++) {
        particlesArray.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2.2 + 0.5,
          speedX: Math.random() * 0.6 - 0.3,
          speedY: Math.random() * 0.6 - 0.3,
          alpha: Math.random() * 0.55 + 0.1,
          factor: Math.random() * 0.12 + 0.02
        });
      }
    };

    let animationFrameId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mult = particleMultiplierRef.current || 1;
      
      for (let i = 0; i < particlesArray.length; i++) {
        const p = particlesArray[i];
        p.x += p.speedX * mult;
        p.y += p.speedY * mult;

        // Sand wrap-around borders
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Draw spice speckles
        ctx.fillStyle = overdriveActive 
          ? `rgba(93, 230, 255, ${p.alpha * 1.5})` 
          : `rgba(255, 182, 142, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      init();
    };

    window.addEventListener('resize', handleResize);
    init();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [overdriveActive]);

  // GSAP Mouse Parallax effect on Dune Sand Banner
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroImageContainerRef.current) return;
      const { clientX, clientY } = e;
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      const moveX = (clientX - width / 2) / 35;
      const moveY = (clientY - height / 2) / 35;

      gsap.to(heroImageContainerRef.current, {
        x: moveX,
        y: moveY,
        duration: 1.2,
        ease: 'power2.out'
      });
      
      // Secondary subtle parallax on HUD items
      if (gridLinesContainerRef.current) {
        gsap.to(gridLinesContainerRef.current, {
          x: -moveX / 2.5,
          y: -moveY / 2.5,
          duration: 1.5,
          ease: 'power1.out'
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // GSAP Cinematic Overdrive sequence controller - flash grids & sounds
  const handleGSAPAmpSweep = () => {
    if (overdriveActive) return;
    setOverdriveActive(true);
    triggerTickTone(220, 0.4, 'square');
    triggerTickTone(440, 0.2, 'sine');

    const sweepTL = gsap.timeline({
      onComplete: () => setOverdriveActive(false)
    });

    // Animate panels dynamically with severe cinematic flashing
    sweepTL.to('.hologram-card', {
      borderColor: '#5de6ff',
      boxShadow: '0 0 30px rgba(93, 230, 255, 0.4)',
      duration: 0.1,
      yoyo: true,
      repeat: 3
    })
    .to('.stamped-label', {
      color: '#e87b35',
      backgroundColor: 'rgba(232, 123, 53, 0.3)',
      duration: 0.1,
      stagger: 0.05
    }, 0)
    .to('.rotary-knob', {
      scale: 1.1,
      duration: 0.15,
      yoyo: true,
      repeat: 1
    }, 0.1)
    .to('.hologram-card', {
      borderColor: 'rgba(93, 230, 255, 0.2)',
      boxShadow: 'none',
      duration: 0.6
    });

    // Trigger local synthetic bass pulse
    let index = 0;
    const pulseInterval = setInterval(() => {
      if (index >= 6) {
        clearInterval(pulseInterval);
        return;
      }
      triggerTickTone(60 + index * 40, 0.08, 'square');
      index++;
    }, 90);
  };

  // Slider Mouse Drag Handlers
  const handleFaderDrag = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>, 
    setter: React.Dispatch<React.SetStateAction<number>>
  ) => {
    const track = e.currentTarget;
    const rect = track.getBoundingClientRect();
    
    const updatePosition = (clientX: number) => {
      const percentage = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
      setter(Math.round(percentage));
    };

    const getX = (evt: any) => {
      if (evt.touches && evt.touches[0]) {
        return evt.touches[0].clientX;
      }
      return evt.clientX;
    };

    // Trigger initial click update
    updatePosition(getX(e));
    triggerTickTone(330, 0.04);

    const onMove = (moveEvent: MouseEvent | TouchEvent) => {
      const clientX = (moveEvent as MouseEvent).clientX ?? (moveEvent as TouchEvent).touches?.[0]?.clientX;
      if (clientX !== undefined) {
        updatePosition(clientX);
      }
    };

    const onEnd = () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onEnd);
      document.removeEventListener('touchmove', onMove);
      document.removeEventListener('touchend', onEnd);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onEnd);
    document.addEventListener('touchmove', onMove);
    document.addEventListener('touchend', onEnd);
  };

  // Rotary Knob Mouse Drag Handlers
  const handleKnobDrag = (
    e: React.MouseEvent<SVGSVGElement> | React.TouchEvent<SVGSVGElement>,
    value: number,
    setter: React.Dispatch<React.SetStateAction<number>>
  ) => {
    const startY = e.clientY ?? (e as any).touches?.[0]?.clientY;
    let initialValue = value;

    const onMove = (moveEvent: MouseEvent | TouchEvent) => {
      const currentY = (moveEvent as MouseEvent).clientY ?? (moveEvent as TouchEvent).touches?.[0]?.clientY;
      if (currentY === undefined) return;
      const deltaY = startY - currentY;
      const step = deltaY * 0.8; 
      let newValue = Math.max(0, Math.min(100, initialValue + step));
      setter(Math.round(newValue));
    };

    const onEnd = () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onEnd);
      document.removeEventListener('touchmove', onMove);
      document.removeEventListener('touchend', onEnd);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onEnd);
    document.addEventListener('touchmove', onMove);
    document.addEventListener('touchend', onEnd);
  };

  // Form submission / Biometric scan handler calling our server-side API
  const handleBiometricScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isScanning) return;

    setIsScanning(true);
    setScanProgress(0);
    setScanMessage('ESTABLISHING INTERSTELLAR SIGNAL QUANTUM SYNC...');
    triggerTickTone(500, 0.3, 'square');

    // Simulate scanning loop
    const interval = setInterval(() => {
      setScanProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        triggerTickTone(550 + p * 3.5, 0.03, 'sine');
        return p + 4;
      });
    }, 80);

    setTimeout(async () => {
      setScanMessage('DECRYPTING DEEP SPACE SIGNAL BLOCK...');
      triggerTickTone(920, 0.4, 'sine');

      try {
        const response = await fetch('/api/transmission', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            identifier: userName,
            frequency: `${400 + (knob2 * 4)} Hz`,
            uiArchitecture: uiArch,
            soundSynthesis: soundSynth,
            spatialPerformance: spatialDesign,
            priorityOverride: priorityOverride,
            secureChannel: secureChannel,
            intensityThreshold: intensity,
            transmissionMessage: message
          })
        });

        const data = await response.json();
        setSignalResult(data);
        setScanMessage('SECURE ENCRYPTED TRANS-LINK ONLINE');
        triggerTickTone(1100, 0.18, 'sine');

        // Cinematic trigger for GSAP upon receiving data
        gsap.fromTo('.hologram-card', 
          { scale: 0.98, opacity: 0.9 },
          { scale: 1, opacity: 1, duration: 0.8, ease: 'elastic.out(1, 0.75)' }
        );
      } catch (err) {
        console.error("Transmit error:", err);
        setScanMessage('IMPERIAL BRIDGE INTERFERENCE DETECTED.');
      } finally {
        setIsScanning(false);
      }
    }, 2400);
  };

  // Detailed portfolio projects list
  const projects = [
    {
      id: "PROJECT_01",
      serial: "ZARAX-AGENT-X",
      title: "AGENT_ZARAX",
      description: "Advanced cybernetic terminal space agent and telemetry commanding system providing highly real-time responsive command prompt modules & signal analytics.",
      tag: "CORE: SECURE_AGENT",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAqhXS6kNtUqHR9gcAPAtlNcOUyFk0TIGLNV-vYgj3quHADTzj6NZ1UklqfmLPambKurWHy9QYhlCh8WwoPtIoMVDrRFkZCgx2F7G3yL4NonZWyakD2eF7dJ3wZ_vc7H2i5J0sEurYEunqk5OvfKTL_Bu1W3bx9kqPde6t2OGeGRxJ_1s7PxI7leQHG2pXZ7mbFar0cqTplz_NryicA01W-0V6GcNW6oxrz71vIARaY8EXUkvlfrP3gXCLyE9u9k7Lr3f9Gyy2RMOJ_",
      ledColor: "bg-secondary shadow-[0_0_10px_#5de6ff]"
    },
    {
      id: "PROJECT_02",
      serial: "BACKEND-GENAI-01",
      title: "BACKEND_GENAI",
      description: "Generative AI backend interface handling LLM context flows, custom structured schema streaming, and secure private pipeline routing with deep encryption.",
      tag: "AI: MODEL_DEEP",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAX_2CeNGOx3goesgSpr3kkFwLZSqaCq89mu6ozZqdb2aiXceLMYC73IxoQOFWIvhovjPD-SHjkFfakR6EU0E8e3tEzJ291nXTjSniwooN8pyEY3Gh4Ic4RIqt2AIbrp_Z0WIBYVKrwphvpgSSE3J90JDB5me1l_VumuroSnUxPr2HjrGtK-1i4faDZMM5he4G49jqhY0dc-L1iY354QXIePVvEWqbHpAaGiPpt3zO1CDqLB2V29fi_oQOlIZ_IEaky8Q9liRrVSQd4",
      ledColor: "bg-primary shadow-[0_0_10px_#ffb68e]"
    },
    {
      id: "PROJECT_03",
      serial: "SMARAK-26-W3",
      title: "PROJECT SMARAK 26",
      description: "A centralized secure portal, state controller, and modular reactive panel for streamlining localized telemetry maps and user activity audits.",
      tag: "PORTAL: TELEMETRY_HUD",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB0aLmdIsF6vthUw-5MmvIhWdbRT8rODjItWWqLWoAk0EfuJzDK4xPtTTQPFYVVoGRynxHTOnwiGB6zkvPSBxrVUnr1lzGqa3grsXhefPBpCyJYT0bhUugC4qF9SAGAJaPASma8K2rIBMauJszACZseSvxXH1Atlq8ERj32urCTTG44GFlAxd1AtYQ3Jgc5fKGGuXgJtVTvqKr4gtWhQcmP2G8uGlaYNfvOkShAgwojFfZ0KOLf0zOqwKogAGe7NMDSXvW2ZwkfWH0-",
      ledColor: "bg-secondary animate-pulse shadow-[0_0_10px_#5de6ff]"
    },
    {
      id: "PROJECT_04",
      serial: "REWEAR-PLAT-Y",
      title: "REWEAR PLATFORM",
      description: "Circular apparel recycling and e-commerce layout managing real-time product tracking, sustainability indices, and material carbon life expectancy tracking.",
      tag: "APP: GREEN_TECH",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCRfkbmgocj56-h3duwvoiKfLXWeBINV29dFp8y64wwXT4KzCtTd4ITVoc3VmuL5aB1ZF83Vy7-jGreJkN_TLAf8W0XXqzkPmdRg3nivlRPt997zt9anU47HPKSIt5YEV0v4nT0ZOOghgsGfJSvZtXUKTRfYV6UPxxFUBeFoi5umcFI8twsNkzCymfppAkL4J-qQhiIbR6sgSu8M-orU2Orbm95KpdhOFKDJliibPPOd9KEQXp5yTTxbWy-niH0jHaEuNQyHV9gwP4p",
      ledColor: "bg-primary shadow-[0_0_10px_#ffb68e]"
    }
  ];

  return (
    <div className="relative min-h-screen selection:bg-secondary/40 select-none pb-0 text-on-background bg-surface-dim">
      {/* Spaceship Cockpit Flight Deck - Custom Immersive Loader */}
      <AnimatePresence>
        {!appLoaded && (
          <motion.div
            key="arrakis-loader"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0, 
              scale: 1.05,
              filter: "blur(12px)",
              transition: { duration: 0.8, ease: 'easeInOut' } 
            }}
            className="fixed inset-0 z-[99999] flex flex-col justify-between bg-black text-on-background overflow-hidden p-4 md:p-8 font-mono select-none"
          >
            {/* Background Spaceship in deep space with GSAP panning/zoom cosmic drift */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img
                src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1920&q=80"
                alt="Spaceship cruising in the deep universe"
                referrerPolicy="no-referrer"
                className="gsap-spaceship-bg absolute w-[115%] h-[115%] object-cover opacity-50 mix-blend-screen scale-105"
              />
              {/* Arrakis Warm Palette Color Layers to tint the background space image */}
              <div className="absolute inset-0 bg-primary/25 mix-blend-color pointer-events-none" />
              <div className="absolute inset-0 bg-linear-to-tr from-primary/20 via-transparent to-secondary/15 mix-blend-screen pointer-events-none" />
              <div className="absolute inset-0 bg-radial-gradient from-transparent via-neutral-950/60 to-neutral-950 pointer-events-none" />
            </div>

            {/* Glowing Space Stars & Asteroid Specks */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-0.5 h-0.5 md:w-1 md:h-1 bg-white rounded-full"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    opacity: 0.3 + Math.random() * 0.7,
                    animation: `pulse ${1.5 + Math.random() * 2}s infinite ease-in-out`
                  }}
                />
              ))}
            </div>

            {/* SPACESHIP CANOPY STRUTS / HUD CROSSHAIRS */}
            <div className="absolute inset-0 border-[12px] border-neutral-950/80 pointer-events-none z-50">
              <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-white/5" />
              <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-white/5" />
            </div>

            {/* HEADER PANEL: Spaceship flight deck diagnostic status bar */}
            <div className="relative z-10 w-full flex flex-col md:flex-row justify-between items-center border-b border-primary/20 bg-neutral-950/60 backdrop-blur-md p-3 md:px-6 rounded-t-xs shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
              <div className="flex items-center gap-3">
                <div className="relative w-2 h-2 flex items-center justify-center">
                  <span className="absolute inset-0 rounded-full bg-secondary animate-ping opacity-75" />
                  <span className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_#5de6ff]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] md:text-xs font-black text-secondary tracking-[0.2em] font-syne">
                    ARRAKIS COMMAND DECK v10.0
                  </span>
                  <span className="text-[8px] text-on-surface-variant/40 tracking-wider">
                    LOCATION: SECTOR_7B_DEEP_SPACE
                  </span>
                </div>
              </div>
              
              <div className="text-[8px] md:text-[9px] text-primary/70 flex items-center gap-4 mt-2 md:mt-0">
                <span className="border border-primary/25 px-2 py-0.5 rounded-xs bg-primary/5 uppercase animate-pulse">
                  SYSTEM_INTEGRITY: OPTIMAL
                </span>
                <span className="hidden sm:inline">WARP ENGINE HYPERDRIVE: STANDBY</span>
              </div>
            </div>

            {/* MAIN COCKPIT DASHBOARD: Clean Centered Radar/Astrolabe Scope (Side boxes removed) */}
            <div className="relative z-10 flex items-center justify-center my-auto w-full max-w-2xl mx-auto px-6">
              <div className="flex flex-col items-center justify-center relative py-4 w-full">
                {/* Neon vertical laser scanning bar */}
                <div className="absolute inset-x-0 top-0 bottom-0 pointer-events-none overflow-hidden z-20">
                  <div className="w-full h-[2px] bg-secondary/35 shadow-[0_0_12px_#5de6ff] animate-[bounce_4s_infinite_ease-in-out]" />
                </div>

                {/* Space Flight Scope Astrolabe */}
                <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
                  {/* Outer spinning scope ring */}
                  <div className="gsap-orbit-outer absolute inset-0 rounded-full border border-dashed border-secondary/30" />
                  
                  {/* Scope compass ticks */}
                  <div className="absolute inset-2 rounded-full border border-primary/10 flex items-center justify-center">
                    <span className="absolute top-1 text-[7px] text-primary/40">N 0.0°</span>
                    <span className="absolute right-1 text-[7px] text-primary/40">E 90.0°</span>
                    <span className="absolute bottom-1 text-[7px] text-primary/40">S 180.0°</span>
                    <span className="absolute left-1 text-[7px] text-primary/40">W 270.0°</span>
                  </div>

                  {/* Concentric rotating radar sweep */}
                  <div className="gsap-orbit-inner absolute inset-6 rounded-full border border-double border-primary/25" />
                  
                  {/* Crosshairs targeting grid */}
                  <div className="absolute inset-12 rounded-full border border-dashed border-secondary/15" />
                  
                  {/* Glowing core orbital scope displaying the countdown */}
                  <div className="absolute w-36 h-36 md:w-44 md:h-44 rounded-full bg-linear-to-b from-neutral-950 to-black border-2 border-primary/40 flex flex-col items-center justify-center shadow-[0_0_35px_rgba(255,182,142,0.15),inset_0_0_20px_rgba(255,182,142,0.25)] backdrop-blur-md relative overflow-hidden">
                    <div className="absolute inset-0 grid-overlay opacity-10" />
                    
                    {/* Glowing circular sweep indicator */}
                    <div className="absolute inset-1 rounded-full border border-primary/5 animate-pulse" />
                    
                    {/* Countdown Percentage */}
                    <span className="text-4xl md:text-5xl font-syne font-black text-primary tracking-tighter drop-shadow-[0_0_15px_rgba(255,182,142,0.5)]">
                      {loadPercentage}%
                    </span>
                    <span className="text-[8px] text-secondary tracking-[0.25em] uppercase font-bold mt-1.5 animate-pulse">
                      HYPERDRIVE BOOT
                    </span>
                  </div>

                  {/* Horizon Level lines */}
                  <div className="absolute w-[112%] h-[1px] bg-secondary/15" />
                  <div className="absolute h-[112%] w-[1px] bg-secondary/15" />
                </div>

                {/* Spacecraft targeting reticle brackets */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-secondary" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-secondary" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-secondary" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-secondary" />
              </div>
            </div>

            {/* FOOTER COCKPIT TERMINAL: Text diagnostics status messages & high-speed scrolling binary packet stream */}
            <div className="relative z-10 w-full flex flex-col items-center bg-neutral-950/60 backdrop-blur-md p-4 border border-white/10 rounded-b-xs shadow-[0_-4px_25px_rgba(0,0,0,0.6)]">
              
              {/* Dynamic Status message */}
              <div className="text-xs font-mono uppercase tracking-wider text-center text-on-surface-variant flex items-center justify-center min-h-[1.5rem] mb-2 px-6">
                <span className="animate-ping mr-2.5 text-primary">●</span>
                <span className="text-primary font-black tracking-widest">{loadStatus}</span>
              </div>

              {/* Progress bar representing cockpit console slider status */}
              <div className="w-full max-w-xl h-1 bg-white/5 border border-white/10 rounded-full overflow-hidden mb-3">
                <motion.div 
                  className="h-full bg-linear-to-r from-primary via-secondary to-primary shadow-[0_0_12px_#ffb68e]"
                  style={{ width: `${loadPercentage}%` }}
                />
              </div>

              {/* Fast-scrolling high speed raw binary packet dump at the bottom */}
              <div className="w-full text-center text-[7px] md:text-[8px] text-primary/25 hover:text-primary/45 font-mono tracking-[0.15em] break-all max-w-4xl opacity-75 select-none font-bold overflow-hidden h-[1.5rem] leading-3">
                {binaryStream}
              </div>

              {/* Footer credits & warning disclaimer */}
              <div className="flex justify-between w-full text-[7px] text-on-surface-variant/30 uppercase mt-2 pt-2 border-t border-white/5">
                <span>HYPERDRIVE BOOT AUTONOMOUS DEPLOYMENT SEQUENCE ACTIVE</span>
                <span>HEADPHONES RECOMMENDED FOR COGNITIVE HARMONICS</span>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Dynamic grain and particle canvas background */}
      <canvas id="spice-canvas" ref={particleCanvasRef} className="fixed inset-0 z-0 pointer-events-none" />
      <div className="fixed inset-0 grain-overlay z-[999]" />

      {/* FIXED TELEMETRY HUD overlays (responsive, hidden on smaller devices to prevent overlapping elements) */}
      <div className="hidden md:block fixed top-24 left-8 z-40 text-[9px] font-mono text-primary/40 space-y-1 block pointer-events-none select-none">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-primary animate-ping rounded-full" />
          <span>LATENCY: </span>
          <span className="text-secondary font-bold">{latency}ms</span>
        </div>
        <div>ATMOSPHERE: SPICE-STORM (94%)</div>
        <div>SIGNAL: ESTABLISHED</div>
      </div>

      <div className="hidden md:block fixed bottom-10 right-8 z-40 text-[9px] font-mono text-secondary/40 space-y-1 block text-right pointer-events-none select-none">
        <div>COORDINATES: 44.20N / 12.05E</div>
        <div>FREQ: {300 + (knob2 * 4)} HZ</div>
        <div className="flex items-center justify-end gap-1.5 pt-1">
          <span>ENCRYPTION: ACTIVE</span>
          <Lock size={10} className="text-secondary" />
        </div>
      </div>

      {/* Navigation Bar */}
      <nav id="navbar" className="sticky top-0 z-50 w-full border-b border-outline-variant/20 bg-background/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 lg:px-12 py-4">
          <div className="flex flex-col">
            <h1 className="text-primary font-syne text-xs sm:text-base md:text-xl tracking-[0.15em] sm:tracking-[0.25em] font-extrabold uppercase select-none">
              <ScrambleText text="ARRAKIS HARMONIC" />
            </h1>
          </div>

          <div className="flex gap-4 md:gap-8 items-center">
            <div className="hidden md:flex gap-8">
              <a 
                href="#profile" 
                onClick={() => { triggerTickTone(440); setActiveTab('profile'); }}
                className={`font-mono text-xs uppercase tracking-widest nav-link-glow ${activeTab === 'profile' ? 'text-primary' : 'text-on-surface-variant'}`}
              >
                Profile
              </a>
              <a 
                href="#education" 
                onClick={() => { triggerTickTone(440); setActiveTab('education'); }}
                className={`font-mono text-xs uppercase tracking-widest nav-link-glow ${activeTab === 'education' ? 'text-primary' : 'text-on-surface-variant'}`}
              >
                Education
              </a>
              <a 
                href="#projects" 
                onClick={() => { triggerTickTone(440); setActiveTab('projects'); }}
                className={`font-mono text-xs uppercase tracking-widest nav-link-glow ${activeTab === 'projects' ? 'text-primary' : 'text-on-surface-variant'}`}
              >
                Projects
              </a>
              <a 
                href="#works" 
                onClick={() => { triggerTickTone(440); setActiveTab('works'); }}
                className={`font-mono text-xs uppercase tracking-widest nav-link-glow ${activeTab === 'works' ? 'text-primary' : 'text-on-surface-variant'}`}
              >
                Works
              </a>
              <a 
                href="#contact" 
                onClick={() => { triggerTickTone(440); setActiveTab('contact'); }}
                className={`font-mono text-xs uppercase tracking-widest nav-link-glow ${activeTab === 'contact' ? 'text-primary' : 'text-on-surface-variant'}`}
              >
                Contact
              </a>
            </div>

            <button 
              onClick={() => {
                triggerTickTone(1000, 0.2);
                const contactSection = document.getElementById('contact');
                if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-3 sm:px-5 py-1.5 sm:py-2 border border-primary text-primary font-mono text-[9px] sm:text-[11px] uppercase tracking-widest hover:bg-primary hover:text-surface-dim transition-all duration-300 pointer-events-auto shadow-[0_0_15px_rgba(255,182,142,0.15)]"
            >
              Connect
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION with GSAP Parallax Banner and Framer Motion staggered entry */}
      <section className="relative min-h-[92vh] flex flex-col items-center justify-center text-center overflow-hidden">
        {/* Live Date Time Telemetry Ticker */}
        <div className="absolute top-4 right-4 sm:top-8 sm:right-8 z-20 text-right font-mono text-[9px] sm:text-[11px] text-primary/80 bg-surface-container-low/80 p-2 border sm:p-3 sm:border border-primary/20 backdrop-blur-md rounded-xs select-none space-y-0.5 shadow-md">
          <div className="text-[7px] sm:text-[9px] text-secondary font-bold tracking-widest uppercase flex items-center justify-end gap-1.5">
            <span className="w-1.5 h-1.5 inline-block bg-secondary rounded-full animate-ping" />
            <ScrambleText text="CHRONO_STATUS" />
          </div>
          <div className="text-on-background font-bold tracking-wider font-mono text-[9px] sm:text-[11px]">{currentChrono}</div>
        </div>

        {/* Sun Aura */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-surface-container-lowest via-background to-background" />
        
        {/* Monochromatic Wide Angle Dune Dust with GSAP Parallax Ref */}
        <div ref={heroImageContainerRef} className="absolute inset-0 z-0 opacity-40 pointer-events-none scale-110">
          <div className="absolute inset-0 bg-linear-to-t from-surface-dim to-transparent z-10" />
          <img 
            alt="Endless sand dunes under a faint sun" 
            className="w-full h-full object-cover mix-blend-overlay"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1kAugab0l00IWWDMxUU2s0B8cIaVJIxhZyuEsL_ZnAK8mJfVlty0An34TV8Jn2-jS2b9LdmgWh4fn9obeG0OIkFZjXx1zRiNCz2yE6NlThL19tCcWPLl-dPtMPvc3PESKqL0FyebOGfgAi3vt0KbsBJedVhJyFvev3Pjbt_PH7mHttzaMlDD78UEleGeft1mW1hSE_-mASYL7DxcYOgB4tGO0DJTNP4afmKL0hHhFKeYSAfi9e54iepZ3KciwajZKxa34wgVraf7t"
          />
        </div>

        {/* HUD Grid Overlay reacting subtly to Parallax */}
        <div ref={gridLinesContainerRef} className="absolute inset-0 z-[1] grid-overlay opacity-[0.08] pointer-events-none scale-105" />

        {/* Floating Sun Orb */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/6 w-96 h-96 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />

        {/* Sound Decibel Matrix Pulse line */}
        <div ref={matrixPulseRef} className="absolute inset-x-0 top-1/2 h-[2px] bg-secondary/0 scale-y-0 transform origin-center z-[2] pointer-events-none" />

        {/* Real Audio visualizer blocks overlay with individual stagger */}
        <div className="absolute bottom-28 left-0 w-full h-24 z-10 flex items-end justify-center gap-1.5 opacity-30 pointer-events-none px-4">
          {visualizerHeights.map((h, i) => (
            <div 
              id={`viz-${i}`}
              key={i} 
              className="w-1 bg-secondary rounded-t-full transition-all duration-100"
              style={{ height: `${h}px` }}
            />
          ))}
        </div>

        {/* Giant Monochromatic Typography with nested motion tags */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 px-6 max-w-4xl mx-auto flex flex-col items-center"
        >
          <motion.h1 
            initial={{ letterSpacing: '0.1em', marginRight: '-0.1em', opacity: 0 }}
            animate={{ letterSpacing: '0.25em', marginRight: '-0.25em', opacity: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut', delay: 0.1 }}
            className="font-syne text-4xl sm:text-6xl md:text-8xl font-black text-primary leading-[1.05] drop-shadow-md select-none whitespace-normal text-center"
          >
            <ScrambleText text="ARRAKIS HARMONIC" />
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="font-mono text-xs md:text-sm text-on-surface-variant tracking-[0.45em] mt-8 uppercase select-none leading-relaxed"
          >
            PRECISION SOUNDSCAPES & VISUAL ARCHITECTURE
          </motion.p>

          {/* Golden Ratio interactive status pill */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8, type: 'spring' }}
            className="mt-6 flex items-center gap-2 bg-surface-container-high/60 border border-primary/20 rounded-full px-4 py-1.5 backdrop-blur-sm shadow-[0_0_12px_rgba(255,182,142,0.05)] cursor-pointer"
            onClick={handleGSAPAmpSweep}
          >
            <span className={`w-2 h-2 rounded-full ${overdriveActive ? 'bg-secondary animate-ping' : 'bg-primary animate-pulse'}`} />
            <span className="font-mono text-[9px] text-primary tracking-widest uppercase font-bold">
              {overdriveActive ? "GSAP CINEMATIC SWEEP ACTIVE" : "ENGINE INTEGRATED: GSAP & MOTION"}
            </span>
          </motion.div>

          {/* Interactive Start/Pause Synth Button */}
          <div className="mt-10">
            <button 
              id="start-synth"
              onClick={handleStartToggle}
              className={`group pointer-events-auto px-12 py-5 border-t border-primary/40 bg-surface-container-high relative flex items-center gap-4 transition-all duration-150 rounded-sm active:translate-y-1 ${synthOn ? 'piano-key-pressed border-t-transparent' : 'piano-key-shadow'}`}
            >
              <span className="font-syne font-bold text-headline-md tracking-[0.3em] text-primary">{synthOn ? 'PAUSE' : 'START'}</span>
              
              {synthOn ? (
                <span className="material-symbols-outlined text-secondary animate-pulse" style={{ fontVariationSettings: '"FILL" 1' }}>pause</span>
              ) : (
                <span className="material-symbols-outlined text-secondary group-hover:scale-110 duration-200" style={{ fontVariationSettings: '"FILL" 1' }}>play_arrow</span>
              )}
              
              <div className="absolute bottom-0 left-0 w-full h-[3px] bg-secondary opacity-0 group-hover:opacity-100 transition-opacity cyan-glow" />
            </button>
            <p className="text-[9px] text-primary/40 font-mono tracking-widest mt-2 uppercase">
              {synthOn ? "COEFFICENT VOLTAGE SIGNAL BROADCASTING..." : "PRESS TO INITIALIZE LOCAL SIGNAL GENERATOR"}
            </p>
          </div>
        </motion.div>

        {/* Bounce indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 transition-all block animate-bounce text-outline select-none">
          <span className="material-symbols-outlined text-4xl">keyboard_double_arrow_down</span>
        </div>
      </section>

      {/* BIOMETRIC DOSSIER & PROFILE SECTION */}
      <section id="profile" className="relative z-10 py-24 bg-surface-dim border-t border-outline-variant/10 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div>
              <span className="text-[10px] font-mono text-outline tracking-[0.4em] block mb-2 uppercase select-none">AUTHORIZED DOSSIER / SYSTEM FILE</span>
              <h2 className="text-3xl md:text-5xl font-black font-syne text-on-background tracking-wider">
                <ScrambleText text="BIOMETRIC PROFILE" />
              </h2>
            </div>
            <div className="font-mono text-[9px] text-secondary tracking-widest bg-secondary/10 border border-secondary/30 rounded-xs px-3 py-1 animate-pulse select-none">
              SECURE CLIENT CONNECTION ONLINE
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Operator Identity Card with avatar frame and metadata (spans 4 cols on desktop) */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="brushed-metal border border-secondary/40 p-6 rounded-sm relative overflow-hidden group">
                {/* Cyberpunk corner details */}
                <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-secondary" />
                <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-secondary" />
                <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-secondary" />
                <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-secondary" />

                {/* Cybernetic avatar container with scrolling scanline */}
                <div className="relative w-full aspect-square mb-6 overflow-hidden border border-outline-variant/20 rounded-xs">
                  <div className="absolute inset-0 grid-overlay z-10" />
                  <div className="absolute inset-x-0 h-[2px] bg-secondary/30 animate-[scanline_4s_linear_infinite] z-20 pointer-events-none" />
                  <img 
                    src="https://github.com/JITUDISHA.png" 
                    alt="Disha Sethi" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-102"
                  />
                </div>

                {/* Identity table */}
                <div className="space-y-4 text-left font-mono">
                  <div className="border-b border-outline-variant/20 pb-2">
                    <span className="text-[8px] text-outline uppercase tracking-widest block font-bold">OPERATOR IDENTITY</span>
                    <span className="text-base font-black text-on-background tracking-wider">DISHA SETHI</span>
                  </div>
                  <div className="border-b border-outline-variant/20 pb-2">
                    <span className="text-[8px] text-outline uppercase tracking-widest block font-bold">CORE DESIGNATION</span>
                    <span className="text-xs text-primary font-bold tracking-wider uppercase">CREATIVE DEVELOPER / WEB ARTISAN</span>
                  </div>
                  <div className="border-b border-outline-variant/20 pb-2">
                    <span className="text-[8px] text-outline uppercase tracking-widest block font-bold">NETWORK SECTOR</span>
                    <span className="text-xs text-secondary font-bold tracking-wider">CHANDIGARH / DELHI_HUB, IN</span>
                  </div>
                  <div className="border-b border-outline-variant/20 pb-2">
                    <span className="text-[8px] text-outline uppercase tracking-widest block font-bold">B.TECH GRADUATION SPECIALTY</span>
                    <span className="text-xs text-on-background tracking-wider">METALLURGICAL & MATERIALS ENGINEERING</span>
                  </div>
                  <div className="pb-1">
                    <span className="text-[8px] text-outline uppercase tracking-widest block font-bold font-bold">CLEARANCE CLASSIFICATION</span>
                    <span className="text-xs text-secondary font-bold tracking-wider animate-pulse uppercase">LEVEL_3: CORE ENGINEER</span>
                  </div>
                </div>
              </div>

              {/* Secure Node Links panel */}
              <div className="brushed-metal border border-outline-variant/20 p-5 rounded-sm text-left">
                <span className="text-[9px] text-primary font-mono tracking-widest font-extrabold uppercase block mb-3 border-b border-outline-variant/10 pb-1">TRANSMISSION SECTOR PORTS</span>
                <div className="space-y-3 font-mono text-[10px]">
                  <a 
                    href="https://github.com/JITUDISHA" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center justify-between p-2.5 bg-surface-container-highest/20 hover:bg-secondary/10 border border-outline-variant/10 hover:border-secondary/40 rounded-xs transition-all duration-200 group"
                    onClick={() => triggerTickTone(440)}
                  >
                    <span className="flex items-center gap-2">
                      <Github size={12} className="text-secondary" />
                      <span className="text-on-background font-bold tracking-wider">GITHUB PROFILE</span>
                    </span>
                    <span className="text-outline group-hover:text-secondary tracking-widest text-[8px] font-bold">JITUDISHA →</span>
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/disha-sethi-06b737315" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center justify-between p-2.5 bg-surface-container-highest/20 hover:bg-secondary/10 border border-outline-variant/10 hover:border-secondary/40 rounded-xs transition-all duration-200 group"
                    onClick={() => triggerTickTone(440)}
                  >
                    <span className="flex items-center gap-2">
                      <Linkedin size={12} className="text-secondary" />
                      <span className="text-on-background font-bold tracking-wider">LINKEDIN NUX</span>
                    </span>
                    <span className="text-outline group-hover:text-secondary tracking-widest text-[8px] font-bold">DISHA SETHI →</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Information Systems Dashboard (spans 8 cols on desktop) */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              
              {/* Card A: Operational Directive / Biography */}
              <div className="brushed-metal border border-outline-variant/25 p-6 md:p-8 rounded-sm text-left relative overflow-hidden flex-1 flex flex-col justify-center">
                <div className="absolute top-0 right-0 p-3 font-mono text-[8px] text-outline/30 select-none">
                  SYSTEM_D_DIRECTIVE
                </div>
                <h3 className="font-mono text-xs font-bold text-primary tracking-[0.25em] mb-4 uppercase">CORE OPERATIONAL DIRECTIVE</h3>
                <p className="font-syne text-xl sm:text-2xl font-black text-on-background leading-relaxed tracking-wider mb-4 italic uppercase">
                  "PASSIANATE DEVELOPER CRAFTING WEB EXPERIENCES AND LEARNING SOMETHING NEW EVERY DAY. 'JUST GO WITH FLOW'."
                </p>
                <p className="font-mono text-xs text-outline leading-relaxed tracking-wider">
                  Highly dedicated and responsive UI systems engineer translating mechanical and mathematical concepts into raw, highly tactile digital dashboards. Leverages React type-safety frameworks, advanced physical particle models, and robust Web API layers to synthesize flawless user interfaces that resonate with both speed and design precision.
                </p>
              </div>

              {/* Bento Row: Skills Matrix and Repository Registries */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Competency Skill Matrix (Expanded width showing the automated marquee stream with tech logos) */}
                <div className="md:col-span-8 brushed-metal border border-outline-variant/20 p-6 rounded-sm text-left flex flex-col justify-between overflow-hidden relative min-h-[310px] group/marquee">
                  {/* Glowing decorative corners */}
                  <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-secondary/30" />
                  <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-secondary/30" />
                  <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-secondary/30" />
                  <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-secondary/30" />

                  <div>
                    <div className="flex justify-between items-center mb-4 border-b border-outline-variant/15 pb-2">
                      <h3 className="font-mono text-xs font-bold text-secondary tracking-[0.2em] uppercase">SYSTEM TECHNOLOGIES MARQUEE</h3>
                      <span className="font-mono text-[8px] text-primary/70 tracking-widest uppercase bg-primary/10 px-1.5 py-0.5 rounded-xs animate-pulse">
                        AUTOSTREAM: ACTIVE
                      </span>
                    </div>

                    <p className="font-mono text-[10px] text-outline leading-relaxed mb-5 block uppercase tracking-wider">
                      Automated high-frequency feed broadcasting active operational frameworks, cybernetic tooling architectures, and specialized data processors.
                    </p>
                  </div>
                  
                  {/* Infinity Marquee track space */}
                  <div className="space-y-5 w-full overflow-hidden relative py-4 flex-grow flex flex-col justify-center">
                    {/* Shadow gradient fades on the edges for a real futuristic depth viewport look */}
                    <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-surface-dim to-transparent z-10 pointer-events-none" />
                    <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-surface-dim to-transparent z-10 pointer-events-none" />

                    {/* Track 1: Left moving */}
                    <div className="w-full overflow-hidden flex">
                      <div className="animate-marquee-infinite flex py-1">
                        {[
                          { name: "NEXT.JS", level: "PRO" },
                          { name: "PYTHON", level: "CORE" },
                          { name: "C++", level: "SYS" },
                          { name: "REACT", level: "UI" },
                          { name: "TYPESCRIPT", level: "SECURE" },
                          { name: "NODE.JS", level: "BACKEND" },
                          { name: "EXPRESS", level: "API" },
                          { name: "TAILWIND", level: "UX" },
                        ].concat([
                          { name: "NEXT.JS", level: "PRO" },
                          { name: "PYTHON", level: "CORE" },
                          { name: "C++", level: "SYS" },
                          { name: "REACT", level: "UI" },
                          { name: "TYPESCRIPT", level: "SECURE" },
                          { name: "NODE.JS", level: "BACKEND" },
                          { name: "EXPRESS", level: "API" },
                          { name: "TAILWIND", level: "UX" },
                        ]).map((item, index) => (
                          <div 
                            key={`${item.name}-t1-${index}`} 
                            className="flex-shrink-0 px-5 py-3 md:px-6 md:py-3.5 bg-black/50 border border-outline-variant/15 hover:border-secondary/40 rounded-xs flex items-center gap-3 mx-2 transition-all duration-300 relative group/badge cursor-default shadow-sm min-w-[155px]"
                          >
                            <div className="flex items-center gap-2.5">
                              {getTechIcon(item.name)}
                              <span className="font-mono text-[10px] md:text-xs text-on-background font-black tracking-widest">{item.name}</span>
                            </div>
                            <span className="ml-auto text-[7px] font-mono text-outline/50 border border-outline-variant/15 px-1 py-0.5 rounded-xs tracking-widest font-bold bg-surface-dim/30">{item.level}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Track 2: Right moving */}
                    <div className="w-full overflow-hidden flex">
                      <div className="animate-marquee-infinite-reverse flex py-1">
                        {[
                          { name: "FASTAPI", level: "API" },
                          { name: "MONGODB", level: "DATA" },
                          { name: "SQLITE", level: "DATA" },
                          { name: "GITHUB", level: "FLOW" },
                          { name: "DOCKER", level: "CONTAINER" },
                          { name: "PYTORCH", level: "AI" },
                          { name: "C++", level: "SYS" },
                          { name: "LINUX", level: "HOST" },
                        ].concat([
                          { name: "FASTAPI", level: "API" },
                          { name: "MONGODB", level: "DATA" },
                          { name: "SQLITE", level: "DATA" },
                          { name: "GITHUB", level: "FLOW" },
                          { name: "DOCKER", level: "CONTAINER" },
                          { name: "PYTORCH", level: "AI" },
                          { name: "C++", level: "SYS" },
                          { name: "LINUX", level: "HOST" },
                        ]).map((item, index) => (
                          <div 
                            key={`${item.name}-t2-${index}`} 
                            className="flex-shrink-0 px-5 py-3 md:px-6 md:py-3.5 bg-black/50 border border-outline-variant/15 hover:border-primary/40 rounded-xs flex items-center gap-3 mx-2 transition-all duration-300 relative group/badge cursor-default shadow-sm min-w-[155px]"
                          >
                            <div className="flex items-center gap-2.5">
                              {getTechIcon(item.name)}
                              <span className="font-mono text-[10px] md:text-xs text-on-background font-black tracking-widest">{item.name}</span>
                            </div>
                            <span className="ml-auto text-[7px] font-mono text-outline/50 border border-outline-variant/15 px-1 py-0.5 rounded-xs tracking-widest font-bold bg-surface-dim/30">{item.level}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="text-[7px] font-mono text-outline/40 uppercase tracking-widest mt-4 pt-1.5 flex justify-between items-center select-none border-t border-outline-variant/10">
                    <span>HOVER TO FREEZE TRANSMISSION</span>
                    <span>16 ACTIVE NODES REGISTERED</span>
                  </div>
                </div>

                {/* System Node Registry (Repositories) */}
                <div className="md:col-span-4 brushed-metal border border-outline-variant/20 p-6 rounded-sm text-left flex flex-col justify-between">
                  <div>
                    <h3 className="font-mono text-xs font-bold text-secondary tracking-[0.2em] mb-4 uppercase border-b border-outline-variant/15 pb-2">SYSTEM NODE REGISTRY</h3>
                    
                    <div className="space-y-3 font-mono text-[10px] h-[150px] overflow-y-auto pr-1">
                      <div className="border-l-2 border-primary/40 pl-3">
                        <span className="font-bold text-primary block leading-none">AGENT_ZARAX</span>
                        <p className="text-[9px] text-outline mt-1 leading-normal uppercase">Cybernetic terminal and command prompt workspace.</p>
                      </div>
                      <div className="border-l-2 border-secondary/40 pl-3">
                        <span className="font-bold text-secondary block leading-none">BACKEND_GENAI</span>
                        <p className="text-[9px] text-outline mt-1 leading-normal uppercase">Generative AI pipeline handling structured LLM streaming.</p>
                      </div>
                      <div className="border-l-2 border-primary/40 pl-3">
                        <span className="font-bold text-primary block leading-none">PROJECT-SMARAK-26</span>
                        <p className="text-[9px] text-outline mt-1 leading-normal uppercase">Secure client portal and centralized telemetry maps.</p>
                      </div>
                      <div className="border-l-2 border-secondary/40 pl-3">
                        <span className="font-bold text-secondary block leading-none">REWEAR</span>
                        <p className="text-[9px] text-outline mt-1 leading-normal uppercase">Circular apparel recycling sustainability layout platform.</p>
                      </div>
                    </div>
                  </div>

                  <div className="text-[8px] font-mono text-outline/40 uppercase tracking-widest pt-2 flex items-center justify-between">
                    <span>REGISTRY INDEX: ONLINE</span>
                    <span>30 DEPLOYED NODES</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* GSAP Trigger Panel & Console / Education Section */}
      <section id="education" className="relative z-10 py-10 md:py-14 bg-surface-dim border-t border-outline-variant/10 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Console / Sliders board */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h2 className="font-mono text-xs font-bold text-primary tracking-[0.3em] border-b border-outline-variant/30 pb-3 mb-8 text-left uppercase">
                  <ScrambleText text="CONSOLE: TECHNICAL KNOWLEDGE" />
                </h2>

                <div className="space-y-6">
                  {/* Sliders mimicking physical mixing equipment faders with Framer Motion spring layouts */}
                  <div className="space-y-3">
                    <div className="flex justify-between font-mono text-xs">
                      <span className="text-on-surface-variant font-bold tracking-wider uppercase">UI Architecture Slider</span>
                      <span className="text-primary font-bold">{uiArch}%</span>
                    </div>
                    <div 
                      id="slider-ui"
                      className="h-2 w-full bg-surface-container-low border border-outline-variant/30 relative rounded-sm cursor-pointer fader-groove px-1 touch-none"
                      onMouseDown={(e) => handleFaderDrag(e, setUiArch)}
                      onTouchStart={(e) => handleFaderDrag(e, setUiArch)}
                    >
                      <motion.div 
                        layout
                        className="absolute top-1/2 -translate-y-1/2 w-4 h-7 bg-primary-container border border-primary/50 flex flex-col justify-between p-[3px] shadow-lg rounded-sm cursor-ew-resize hover:border-primary transition-colors touch-none"
                        style={{ left: `calc(${uiArch}% - 8px)` }}
                      >
                        <div className="h-[2px] w-full bg-surface-dim" />
                        <div className="h-[2px] w-full bg-surface-dim" />
                        <div className="h-[2px] w-full bg-surface-dim" />
                      </motion.div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between font-mono text-xs block">
                      <span className="text-on-surface-variant font-bold tracking-wider uppercase">Sound Synthesis Friction</span>
                      <span className="text-primary font-bold">{soundSynth}%</span>
                    </div>
                    <div 
                      id="slider-sound"
                      className="h-2 w-full bg-surface-container-low border border-outline-variant/30 relative rounded-sm cursor-pointer fader-groove px-1 touch-none"
                      onMouseDown={(e) => handleFaderDrag(e, setSoundSynth)}
                      onTouchStart={(e) => handleFaderDrag(e, setSoundSynth)}
                    >
                      <motion.div 
                        layout
                        className="absolute top-1/2 -translate-y-1/2 w-4 h-7 bg-primary-container border border-primary/50 flex flex-col justify-between p-[3px] shadow-lg rounded-sm cursor-ew-resize hover:border-primary transition-colors touch-none"
                        style={{ left: `calc(${soundSynth}% - 8px)` }}
                      >
                        <div className="h-[2px] w-full bg-surface-dim" />
                        <div className="h-[2px] w-full bg-surface-dim" />
                        <div className="h-[2px] w-full bg-surface-dim" />
                      </motion.div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between font-mono text-xs block">
                      <span className="text-on-surface-variant font-bold tracking-wider uppercase">Spatial Resonance Depth</span>
                      <span className="text-primary font-bold">{spatialDesign}%</span>
                    </div>
                    <div 
                      id="slider-spatial"
                      className="h-2 w-full bg-surface-container-low border border-outline-variant/30 relative rounded-sm cursor-pointer fader-groove px-1 touch-none"
                      onMouseDown={(e) => handleFaderDrag(e, setSpatialDesign)}
                      onTouchStart={(e) => handleFaderDrag(e, setSpatialDesign)}
                    >
                      <motion.div 
                        layout
                        className="absolute top-1/2 -translate-y-1/2 w-4 h-7 bg-primary-container border border-primary/50 flex flex-col justify-between p-[3px] shadow-lg rounded-sm cursor-ew-resize hover:border-primary transition-colors touch-none"
                        style={{ left: `calc(${spatialDesign}% - 8px)` }}
                      >
                        <div className="h-[2px] w-full bg-surface-dim" />
                        <div className="h-[2px] w-full bg-surface-dim" />
                        <div className="h-[2px] w-full bg-surface-dim" />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="font-mono text-[9px] text-outline/50 leading-relaxed border-t border-outline-variant/10 pt-4 mt-8 select-none">
                * SYSTEM CALIBRATION ACTIVE: DRAG CORRESPONDING COEFfICIENTS ABOVE TO REAL-TIME OPTIMIZE DYNAMIC INTERACTIVE PHYSICS RENDER MATRIX.
              </div>

            </div>

            {/* Sequence history / Education */}
            <div className="flex-grow border-t lg:border-t-0 lg:border-l border-outline-variant/20 pt-8 lg:pt-0 pl-0 lg:pl-12">
              <h2 className="font-mono text-xs font-bold text-primary tracking-[0.3em] border-b border-outline-variant/30 pb-3 mb-10 text-left uppercase">
                <ScrambleText text="SEQUENCE: EDUCATION" />
              </h2>

              <div className="space-y-6 relative">
                {/* NIT Rourkela Entry */}
                <motion.div 
                  whileHover={{ x: 4 }}
                  className="relative p-5 brushed-metal border border-outline-variant/15 hover:border-secondary/45 rounded-sm group cursor-default flex flex-col sm:flex-row gap-5 items-start transition-all"
                >
                  {/* Cybernetic Logo Frame */}
                  <div className="relative w-14 h-14 md:w-16 md:h-16 flex-shrink-0 bg-white/5 border border-outline-variant/30 p-1.5 rounded-xs flex items-center justify-center overflow-hidden group-hover:border-secondary transition-colors shadow-sm">
                    <div className="absolute inset-0 grid-overlay opacity-10" />
                    <img 
                      src="https://res.cloudinary.com/dxi7mifgc/image/upload/v1779256344/NIT_Rourkela_Colour_Logo.svg_if6gcr.png" 
                      alt="NIT Rourkela Logo" 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(255,255,255,0.15)] group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  
                  <div className="flex-1 text-left">
                    <span className="font-mono text-[9px] text-secondary tracking-widest block mb-1 font-bold">AUG 2024 – 2028</span>
                    <h3 className="font-syne text-base md:text-lg text-on-background group-hover:text-primary transition-colors font-black tracking-wider leading-tight uppercase">
                      National Institute of Technology Rourkela
                    </h3>
                    <p className="text-primary font-mono text-[10px] tracking-wide mt-1 uppercase font-bold">
                      Bachelor of Technology - BTech, Metallurgical and Materials Engineering
                    </p>
                    <p className="text-outline text-[11px] leading-relaxed tracking-wide mt-2 font-mono">
                      Engineering advanced material pathways, thermodynamic microstructures, high-temperature synthesis, and computational mechanics.
                    </p>
                  </div>
                </motion.div>

                {/* SSVM Entry */}
                <motion.div 
                  whileHover={{ x: 4 }}
                  className="relative p-5 brushed-metal border border-outline-variant/15 hover:border-secondary/45 rounded-sm group cursor-default flex flex-col sm:flex-row gap-5 items-start transition-all"
                >
                  {/* Real Image of the Orange Temple-Style SSVM Building */}
                  <div className="relative w-14 h-14 md:w-16 md:h-16 flex-shrink-0 bg-white/5 border border-outline-variant/30 rounded-xs flex items-center justify-center overflow-hidden group-hover:border-primary transition-colors shadow-inner">
                    <div className="absolute inset-0 grid-overlay opacity-15" />
                    <img 
                      src="https://res.cloudinary.com/dxi7mifgc/image/upload/v1779256402/2021-07-08_jtjekc.jpg" 
                      alt="SSVM NK Nagar Berhampur Building" 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover filter drop-shadow-[0_0_8px_rgba(255,122,0,0.15)] group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  
                  <div className="flex-1 text-left">
                    <span className="font-mono text-[9px] text-outline tracking-widest block mb-1 font-bold">2009 – 2023</span>
                    <h3 className="font-syne text-base md:text-lg text-on-background group-hover:text-primary transition-colors font-black tracking-wider leading-tight uppercase">
                      SSVM NK Nagar, Berhampur
                    </h3>
                    <p className="text-secondary font-mono text-[10px] tracking-wide mt-1 uppercase font-bold">
                      Primary & Upper Secondary Education Hub
                    </p>
                    <p className="text-outline text-[11px] leading-relaxed tracking-wide mt-2 font-mono">
                      Primary values, rigorous foundational logic, basic mathematics, sciences, and engineering curiosity.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Framer motion list and interactive carousel */}
      <section id="projects" className="relative z-10 py-24 border-t border-outline-variant/20 px-6 lg:px-12">
        <div className="light-leak absolute top-0 left-1/4 w-[500px] h-[500px]" />
        
        <div className="max-w-7xl mx-auto">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div>
              <span className="text-[10px] font-mono text-outline tracking-[0.4em] block mb-2 uppercase select-none">MODULES / 001</span>
              <h2 className="text-3xl md:text-5xl font-black font-syne text-on-background tracking-wider">
                <ScrambleText text="LATEST PROJECTS" />
              </h2>
            </div>

            {/* Carousel navigation */}
            <div className="flex gap-3">
              <button 
                id="btn-prev"
                onClick={() => {
                  triggerTickTone(500);
                  setProjectIndex(prev => (prev === 0 ? projects.length - 1 : prev - 1));
                }}
                className="w-12 h-12 flex items-center justify-center border border-secondary/30 hover:bg-secondary/10 transition-all rounded-sm hover:border-secondary group"
              >
                <ChevronLeft size={20} className="text-secondary group-active:scale-90 transition-transform" />
              </button>
              <button 
                id="btn-next"
                onClick={() => {
                  triggerTickTone(500);
                  setProjectIndex(prev => (prev === projects.length - 1 ? 0 : prev + 1));
                }}
                className="w-12 h-12 flex items-center justify-center border border-secondary/30 hover:bg-secondary/10 transition-all rounded-sm hover:border-secondary group"
              >
                <ChevronRight size={20} className="text-secondary group-active:scale-90 transition-transform" />
              </button>
            </div>
          </div>

          {/* Cards dynamic rendering with springy transition layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((proj, idx) => {
              const isCurrent = idx === projectIndex;
              return (
                <motion.div 
                  key={proj.id} 
                  id={`project-card-${idx}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  className={`group relative min-h-[530px] h-auto flex flex-col justify-between brushed-metal p-5 border rounded-sm transition-all duration-300 cursor-pointer ${
                    isCurrent 
                      ? 'border-secondary/40 shadow-[0_0_20px_rgba(93,230,255,0.06)]' 
                      : 'border-outline-variant/25 opacity-70 hover:opacity-100'
                  }`}
                  onClick={() => {
                    setProjectIndex(idx);
                    triggerTickTone(700 + idx * 50, 0.08);
                  }}
                >
                  {/* Decorative Industrial Screws */}
                  <div className="screw top-2 left-2" />
                  <div className="screw top-2 right-2" />
                  <div className="screw bottom-2 left-2" />
                  <div className="screw bottom-2 right-2" />

                  {/* Stamp top metadata */}
                  <div className="flex justify-between items-center font-mono text-[9px] mb-4">
                    <div className="flex items-center gap-2">
                      <div className={`status-led ${proj.ledColor} ${isCurrent ? 'scale-125' : ''}`} />
                      <span className="text-secondary font-bold tracking-widest">{proj.id}</span>
                    </div>
                    <span className="stamped-label font-bold text-[8px] text-outline">{proj.serial}</span>
                  </div>

                  {/* Cinematic Monochromatic Image Frame with Grid Lines */}
                  <div className="relative flex-grow h-48 mb-5 overflow-hidden border border-outline-variant/10 rounded-sm">
                    <div className="absolute inset-0 recessed-frame overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                      <div className="absolute inset-0 grid-overlay z-10" />
                      <div className="absolute inset-x-0 h-[1.5px] bg-secondary/30 animate-[scanline_4s_linear_infinite] z-20 pointer-events-none" />
                      <img 
                        alt={proj.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        src={proj.image}
                      />
                    </div>
                  </div>

                  {/* Stamped Content Area */}
                  <div className="relative z-10 bg-surface-container-highest/20 p-4 border border-outline-variant/10 rounded-sm">
                    <h4 className="font-mono text-sm font-bold mb-2 text-primary tracking-wider uppercase">
                      {proj.title}
                    </h4>
                    <p className="text-on-surface-variant font-mono text-[11px] leading-relaxed tracking-normal opacity-90 h-16 overflow-y-auto">
                      {proj.description}
                    </p>
                  </div>

                  {/* Stamp bottom connection */}
                  <div className="flex justify-between items-center pt-3 mt-4 border-t border-outline-variant/20 font-mono">
                    <span className="text-[9px] text-outline/50 uppercase tracking-wider">{proj.tag}</span>
                    <span className="material-symbols-outlined text-secondary opacity-50 group-hover:opacity-100 transition-all group-hover:translate-x-1.5" style={{ fontVariationSettings: "'FILL' 1" }}>
                      arrow_right_alt
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* FULL SCREEN ACOUSTIC COHESION SOUNDPLATE SIMULATION */}
      <AcousticResonatorStation />

      {/* Visual Resonance Gallery */}
      <section id="works" className="relative z-10 py-24 bg-surface-container-low px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-mono text-xs font-bold text-primary tracking-[0.45em] text-center mb-16 uppercase">
            <ScrambleText text="VISUAL RESONANCE / ARCHIVE" />
          </h2>

          <div className="asymmetric-grid">
            {/* Dune Vessel with Framer Motion scroll loading */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="col-span-12 md:col-span-7 h-[280px] sm:h-[380px] md:h-[500px] relative group overflow-hidden border border-outline-variant/10 rounded-sm shadow-xl cursor-default"
            >
              <div className="absolute inset-0 grid-overlay z-10 pointer-events-none" />
              <img 
                alt="Imperial Space Vessel hovering over Dune landscape" 
                className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:scale-[1.02] duration-700 transition-all"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRfkbmgocj56-h3duwvoiKfLXWeBINV29dFp8y64wwXT4KzCtTd4ITVoc3VmuL5aB1ZF83Vy7-jGreJkN_TLAf8W0XXqzkPmdRg3nivlRPt997zt9anU47HPKSIt5YEV0v4nT0ZOOghgsGfJSvZtXUKTRfYV6UPxxFUBeFoi5umcFI8twsNkzCymfppAkL4J-qQhiIbR6sgSu8M-orU2Orbm95KpdhOFKDJliibPPOd9KEQXp5yTTxbWy-niH0jHaEuNQyHV9gwP4p"
              />
              <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 bg-background/90 backdrop-blur-md translate-y-0 md:translate-y-full md:group-hover:translate-y-0 transition-transform duration-500 border-t border-outline-variant/20 block z-20">
                <p className="font-mono text-[9px] sm:text-[10px] text-primary tracking-[0.34em] uppercase font-bold">EXPEDITION 09 / CINEMATOGRAPHY</p>
                <p className="font-mono text-[10px] sm:text-[11px] text-outline mt-1 font-normal leading-relaxed">Drone surveillance packet mapping coordinates over the deep northern shields.</p>
              </div>
            </motion.div>

            {/* Jet Intake Minimalist */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="col-span-12 md:col-span-5 h-[280px] sm:h-[380px] md:h-[500px] relative group overflow-hidden border border-outline-variant/10 rounded-sm shadow-xl cursor-default"
            >
              <div className="absolute inset-0 grid-overlay z-10 pointer-events-none" />
              <img 
                alt="An extreme close up of a massive jet fan blade turbine" 
                className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:scale-[1.02] duration-700 transition-all"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQW5rswk5dqUMpjGZzgyd8lc8e462wL1rghs-XE2mFJSNNqWhB91yM5BnOlNvvyJMa8unemm8ult-Dx0GtnnJonAw4XIH-MEzIrS_6hzsnP72jBK-FqZ2k6chHNBVjap9xiqe5L6zGPY1G_7hHjnrJxAkT2avH_FLGSqJeSCfQ5wIkm7LhAUaEvODiW91KJXWL8alBgTmwTivdXVKCdB8zxy-6wP5033D32z2X2RV8x0ItfHNDo5BQrIl4jMnyjAReZ2H0qusgNUN4"
              />
              <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 bg-background/90 backdrop-blur-md translate-y-0 md:translate-y-full md:group-hover:translate-y-0 transition-transform duration-500 border-t border-outline-variant/20 block z-20">
                <p className="font-mono text-[9px] sm:text-[10px] text-primary tracking-[0.34em] uppercase font-bold">OBSIDIAN FLOW / GEOMETRY</p>
                <p className="font-mono text-[10px] sm:text-[11px] text-outline mt-1 font-normal leading-relaxed">Mechanical geometry recording atmospheric shear coefficient during high thrust bursts.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tactile Contact Console Section */}
      <section id="contact" className="relative z-10 py-24 select-none px-6 lg:px-12">
        <div className="max-w-4xl mx-auto bg-surface-container-high border-t-2 border-primary/20 p-6 md:p-14 shadow-2xl relative hologram-card">
          {/* Virtual LED Indicators */}
          <div className="absolute top-4 right-4 flex gap-1.5">
            <div className={`w-2.5 h-2.5 rounded-full ${isScanning ? 'bg-secondary animate-ping' : 'bg-primary/20 animate-pulse'}`} />
            <div className={`w-2.5 h-2.5 rounded-full ${secureChannel ? 'bg-secondary font-bold' : 'bg-primary/10'}`} />
            <div className="w-2.5 h-2.5 rounded-full bg-outline-variant/30" />
          </div>

          <h2 className="font-syne text-3xl md:text-5xl font-extrabold text-primary mb-12 tracking-widest text-center uppercase">
            <ScrambleText text="INITIATE CONNECTION" />
          </h2>

          <form onSubmit={handleBiometricScan} className="space-y-12">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Tactile inputs and knobs */}
              <div className="space-y-8">
                
                {/* Knob 1 - Identifier */}
                <div className="flex items-center gap-6">
                  <div className="relative w-16 h-16 flex-shrink-0 cursor-ns-resize">
                    <svg 
                      className="rotary-knob w-full h-full select-none" 
                      viewBox="0 0 100 100"
                      onMouseDown={(evt) => handleKnobDrag(evt, knob1, setKnob1)}
                      onTouchStart={(evt) => handleKnobDrag(evt, knob1, setKnob1)}
                      style={{ transform: `rotate(${(knob1 * 2.8) - 140}deg)` }}
                    >
                      <circle cx="50" cy="50" r="45" fill="#1c1b1c" stroke="#564338" strokeWidth="3" />
                      <rect x="48" y="10" width="4" height="15" rx="2" fill="#ffb68e" />
                    </svg>
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 font-mono text-[9px] text-outline font-extrabold select-none uppercase">IDENTIFIER</div>
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 font-mono text-[8px] text-secondary select-none font-bold">{knob1}%</div>
                  </div>

                  <div className="flex-1 space-y-1">
                    <input 
                      type="text" 
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full bg-surface-dim/70 border-b border-outline-variant/30 text-on-background focus:outline-none focus:border-secondary transition-all py-2.5 px-3 font-mono text-xs tracking-wider uppercase rounded-sm"
                      placeholder="USER_NAME"
                    />
                  </div>
                </div>

                {/* Knob 2 - Frequency */}
                <div className="flex items-center gap-6">
                  <div className="relative w-16 h-16 flex-shrink-0 cursor-ns-resize">
                    <svg 
                      className="rotary-knob w-full h-full select-none" 
                      viewBox="0 0 100 100"
                      onMouseDown={(evt) => handleKnobDrag(evt, knob2, setKnob2)}
                      onTouchStart={(evt) => handleKnobDrag(evt, knob2, setKnob2)}
                      style={{ transform: `rotate(${(knob2 * 2.8) - 140}deg)` }}
                    >
                      <circle cx="50" cy="50" r="45" fill="#1c1b1c" stroke="#564338" strokeWidth="3" />
                      <rect x="48" y="10" width="4" height="15" rx="2" fill="#5de6ff" />
                    </svg>
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 font-mono text-[9px] text-outline font-extrabold select-none uppercase font-bold">FREQUENCY</div>
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 font-mono text-[8px] text-secondary select-none font-bold">{300 + (knob2 * 4)}Hz</div>
                  </div>

                  <div className="flex-1 space-y-1">
                    <input 
                      type="email" 
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      className="w-full bg-surface-dim/70 border-b border-outline-variant/30 text-on-background focus:outline-none focus:border-secondary transition-all py-2.5 px-3 font-mono text-xs tracking-wider rounded-sm"
                      placeholder="USER@NETWORK.COM"
                    />
                  </div>
                </div>

              </div>

              {/* Toggle Switches */}
              <div className="space-y-6 bg-surface-dim/40 p-5 rounded-sm border border-outline-variant/20 flex flex-col justify-between">
                
                {/* Switch 1 */}
                <div className="flex justify-between items-center">
                  <span className="font-mono text-[10px] text-outline font-bold tracking-widest uppercase">PRIORITY OVERRIDE</span>
                  <button 
                    type="button"
                    onClick={() => {
                      setPriorityOverride(prev => !prev);
                      triggerTickTone(500, 0.05);
                    }}
                    className={`w-12 h-6 bg-surface-container-low border border-outline-variant/25 rounded-full relative transition-colors ${priorityOverride ? 'bg-primary/30' : ''}`}
                  >
                    <motion.div 
                      layout
                      className="absolute top-0.5 w-4.5 h-4.5 bg-primary rounded-sm shadow-md"
                      style={{ left: priorityOverride ? '1.625rem' : '0.125rem' }} 
                    />
                  </button>
                </div>

                {/* Switch 2 */}
                <div className="flex justify-between items-center font-mono">
                  <span className="text-[10px] text-outline font-bold tracking-widest uppercase">SECURE CHANNEL</span>
                  <button 
                    type="button"
                    onClick={() => {
                      setSecureChannel(prev => !prev);
                      triggerTickTone(700, 0.05);
                    }}
                    className={`w-12 h-6 bg-surface-container-low border border-outline-variant/25 rounded-full relative transition-colors ${secureChannel ? 'bg-secondary/30' : ''}`}
                  >
                    <motion.div 
                      layout
                      className="absolute top-0.5 w-4.5 h-4.5 bg-secondary rounded-sm shadow-md"
                      style={{ left: secureChannel ? '1.625rem' : '0.125rem' }} 
                    />
                  </button>
                </div>

                {/* Intensity selector bar */}
                <div className="space-y-2 pt-2 text-left block">
                  <label className="font-mono text-[9px] text-outline uppercase tracking-widest font-bold block">Intensity Threshold</label>
                  <div className="flex items-center gap-4">
                    <div 
                      id="intensity-track"
                      className="flex-1 h-1.5 fader-groove bg-surface-dim relative rounded-sm cursor-pointer"
                      onClick={(e) => {
                        const r = e.currentTarget.getBoundingClientRect();
                        const pct = (e.clientX - r.left) / r.width;
                        if (pct < 0.33) setIntensity('LOW');
                        else if (pct < 0.66) setIntensity('MID');
                        else setIntensity('HI');
                        triggerTickTone(400, 0.08);
                      }}
                    >
                      <motion.div 
                        layout
                        className="absolute top-1/2 -translate-y-1/2 w-4 h-6 bg-primary border border-on-primary shadow-lg rounded-sm cursor-pointer hover:bg-primary-fixed-dim"
                        style={{ left: intensity === 'LOW' ? '15%' : intensity === 'MID' ? '48%' : '80%' }}
                      />
                    </div>
                    <span className="font-mono text-[10px] text-secondary font-bold w-12 text-right">{intensity}</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Input Message box */}
            <div className="space-y-2 group text-left block">
              <label className="font-mono text-xs text-outline uppercase group-focus-within:text-secondary transition-all font-bold">
                Transmission String (Message Buffer)
              </label>
              <textarea 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-surface-dim/40 border border-outline-variant/30 text-on-background focus:outline-none focus:border-secondary transition-all h-28 p-3 font-mono text-xs tracking-wider rounded-sm resize-none"
                placeholder="ENTER MESSAGE DATA TO SIGNAL ANALYZER..."
              />
            </div>

            {/* Scanning and terminal printouts */}
            <div className="flex flex-col items-center gap-6 mt-6">
              <button 
                id="submit-scan"
                type="submit"
                disabled={isScanning}
                className="piano-key-shadow group relative w-full md:w-80 bg-surface-container-high border-2 border-primary/20 p-6 transition-all duration-300 hover:border-primary active:translate-y-1 overflow-hidden"
              >
                {/* Horizontal Scanline bar animation */}
                {isScanning && (
                  <div className="absolute top-0 left-0 w-full h-[3px] bg-secondary shadow-[0_0_8px_rgb(93,230,255)] animate-[scanline_1.5s_linear_infinite]" />
                )}

                <div className="flex flex-col items-center gap-2">
                  <Fingerprint className={`text-4xl text-primary group-hover:scale-105 duration-300 ${isScanning ? 'animate-pulse text-secondary' : ''}`} />
                  <span className="font-mono text-[11px] text-primary tracking-[0.25em] font-extrabold uppercase">
                    {isScanning ? `SCANNING PROFILE ${scanProgress}%` : "BIOMETRIC VERIFICATION"}
                  </span>
                </div>
                <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none" />
              </button>
              
              <p className="font-mono text-[9px] text-outline/60 tracking-wider text-center max-w-sm">
                {scanMessage}
              </p>
            </div>

          </form>

          {/* DYNAMIC IMPERIAL SIGNAL DECRYPTOR LOG */}
          <AnimatePresence>
            {signalResult && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="mt-14 p-6 bg-surface-dim/80 border border-secondary/30 rounded-sm text-left relative overflow-hidden"
              >
                <div className="absolute top-3 right-3 flex items-center gap-1.5 text-[8px] text-secondary font-mono">
                  <Terminal size={10} className="animate-pulse" />
                  <span>DECRYPTED TERMINAL LINK</span>
                </div>

                <div className="space-y-4 font-mono text-xs">
                  {/* Telemetry link stats */}
                  <div className="border-b border-outline-variant/20 pb-3 flex justify-between items-center flex-wrap gap-2 text-[10px]">
                    <div>
                      <span className="text-outline uppercase">SIGNAL STATUS:</span>{' '}
                      <span className="text-secondary font-bold tracking-widest">{signalResult.signalStatus || "ESTABLISHED"}</span>
                    </div>
                    <div className="text-[9px] text-primary">
                      {signalResult.isSimulated ? "SIMULATED FAILSAFE MODEL" : "REAL-TIME SPEECH MODEL ACTIVE"}
                    </div>
                  </div>

                  {/* Wave profile info */}
                  <div className="text-left block">
                    <h5 className="text-[10px] text-primary uppercase tracking-widest font-extrabold mb-1">Frequency Wave Profile</h5>
                    <p className="text-on-surface-variant leading-relaxed">
                      {signalResult.frequencyAnalysis}
                    </p>
                  </div>

                  {/* Mentat log blueprint */}
                  <div className="text-left block">
                    <h5 className="text-[10px] text-primary uppercase tracking-widest font-extrabold mb-1 font-bold">Mentat Synaptic Log</h5>
                    <pre className="text-on-background/90 text-[11px] leading-relaxed whitespace-pre-wrap bg-surface-container-lowest/40 p-3 border border-outline-variant/10 rounded-sm overflow-x-auto">
                      {signalResult.mentatTechnicalLog}
                    </pre>
                  </div>

                  {/* Bene Gesserit Warning */}
                  <div className="pt-3 border-t border-outline-variant/15 flex items-start gap-2 text-outline italic">
                    <Activity size={14} className="text-primary mt-0.5 flex-shrink-0 animate-pulse" />
                    <p className="leading-relaxed">
                      "{signalResult.beneGesseritPoetry}"
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface-dim w-full py-16 mt-24 border-t border-outline-variant/20 relative z-30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-6 lg:px-12 gap-8">
          
          <div className="font-mono text-xs text-primary font-bold tracking-[0.25em]">
            ARRAKIS HARMONIC
          </div>

          <div className="text-on-surface-variant font-mono text-xs text-center md:text-left">
            © 2026 ARRAKIS HARMONIC. BUILT FOR THE VASTNESS.
          </div>

          <div className="flex gap-6">
            <a href="https://www.linkedin.com/in/disha-sethi-06b737315/" target="_blank" rel="noopener noreferrer" className="text-outline hover:text-primary transition-colors hover:scale-105" title="LinkedIn"><Linkedin size={18} /></a>
            <a href="https://github.com/JITUDISHA" target="_blank" rel="noopener noreferrer" className="text-outline hover:text-primary transition-colors hover:scale-105" title="GitHub"><Github size={18} /></a>
          </div>

        </div>
      </footer>

      {/* COMPREHENSIVE CYBERNETIC CUSTOM CURSOR OVERLAYS */}
      {!isCoarsePointer && isMouseInitialActive && (
        <>
          <style>{`
            @media (pointer: fine) {
              body, *, a, button, input, select, textarea, canvas, [role="button"], input[type="range"], .cursor-pointer, [id^="project-card-"] {
                cursor: none !important;
              }
            }
          `}</style>

          {/* Core Precise Aiming Point */}
          <div 
            ref={cursorPointRef}
            className="fixed pointer-events-none z-[9999] transition-transform duration-75"
            style={{ left: 0, top: 0, transform: 'translate3d(-100px, -100px, 0)' }}
          >
            <div className={`w-1.5 h-1.5 rounded-full transition-all duration-150 ${isCursorClicking ? 'bg-primary scale-150' : 'bg-secondary'}`} />
          </div>

          {/* Lagging Target Reticle Bracket Ring with Spring-lag Momentum */}
          <div 
            ref={cursorReticleRef}
            className="fixed pointer-events-none z-[9998]"
            style={{ left: 0, top: 0, transform: 'translate3d(-100px, -100px, 0)' }}
          >
            <div className={`relative transition-all duration-300 rounded-full flex items-center justify-center border ${
              isCursorClicking 
                ? 'w-6 h-6 border-primary bg-primary/10 rotate-95 scale-90' 
                : isCursorHoveringInteractive 
                  ? 'w-12 h-12 border-secondary bg-secondary/8 rotate-45 scale-110 shadow-[0_0_15px_rgba(93,230,255,0.25)]' 
                  : 'w-9 h-9 border-secondary/35 bg-transparent'
            }`}>
              {/* Aiming Reticle Brackets */}
              <span className="absolute top-[1.5px] left-[1.5px] w-[4px] h-[4px] border-t border-l border-current opacity-80" />
              <span className="absolute top-[1.5px] right-[1.5px] w-[4px] h-[4px] border-t border-r border-current opacity-80" />
              <span className="absolute bottom-[1.5px] left-[1.5px] w-[4px] h-[4px] border-b border-l border-current opacity-80" />
              <span className="absolute bottom-[1.5px] right-[1.5px] w-[4px] h-[4px] border-b border-r border-current opacity-80" />

              {/* LOCK ON / HIT A CLICK!! / ENTER Warning HUD Tag */}
              {isCursorHoveringInteractive && (
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 font-mono text-[8px] text-secondary font-bold tracking-[0.12em] uppercase whitespace-nowrap bg-[#0e0e0f] border border-secondary px-2 rounded-sm py-1 animate-bounce shadow-[0_0_10px_rgba(93,230,255,0.4)]">
                  {cursorLabel}
                </span>
              )}
            </div>

            {/* Micro Coordinate label tag under cursor */}
            <div ref={cursorCoordsRef} className="absolute top-6 left-6 font-mono text-[7px] text-outline/50 scale-90 tracking-widest whitespace-nowrap bg-[#0b0b0c]/50 p-0.5 border border-outline-variant/10 rounded-sm pointer-events-none select-none">
              SYS:0x0
            </div>
          </div>
        </>
      )}
    </div>
  );
}
