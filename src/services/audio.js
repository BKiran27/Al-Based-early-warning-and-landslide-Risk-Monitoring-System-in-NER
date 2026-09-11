// Web Audio API siren synthesizer & Web Speech API TTS voice announcer

let audioCtx = null;
let currentUtterance = null;
let activeSirenOsc = null;
let activeSirenGain = null;
let activeSirenInterval = null;

const getAudioContext = () => {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return null;
  if (!audioCtx) {
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

export const playEmergencySiren = (durationSeconds = 3) => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    const now = ctx.currentTime;

    // Siren wailing frequency sweep between 750Hz and 1150Hz
    const cycles = Math.floor(durationSeconds / 0.8);
    for (let i = 0; i < cycles; i++) {
      const startT = now + i * 0.8;
      osc.frequency.setValueAtTime(750, startT);
      osc.frequency.exponentialRampToValueAtTime(1150, startT + 0.4);
      osc.frequency.exponentialRampToValueAtTime(750, startT + 0.8);
    }

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + durationSeconds);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + durationSeconds + 0.1);
  } catch (err) {
    console.warn("Web Audio API siren error:", err);
  }
};

export const startSirenSound = () => {
  try {
    stopSirenSound();
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    gain.gain.setValueAtTime(0.12, ctx.currentTime);

    osc.connect(gain);
    gain.connect(ctx.destination);

    let high = false;
    osc.frequency.setValueAtTime(750, ctx.currentTime);
    osc.start();

    activeSirenOsc = osc;
    activeSirenGain = gain;

    activeSirenInterval = setInterval(() => {
      if (!activeSirenOsc) return;
      const now = ctx.currentTime;
      high = !high;
      activeSirenOsc.frequency.exponentialRampToValueAtTime(high ? 1150 : 750, now + 0.4);
    }, 450);
  } catch (err) {
    console.warn("Web Audio start siren error:", err);
  }
};

export const stopSirenSound = () => {
  if (activeSirenInterval) {
    clearInterval(activeSirenInterval);
    activeSirenInterval = null;
  }
  if (activeSirenOsc) {
    try {
      activeSirenOsc.stop();
      activeSirenOsc.disconnect();
    } catch (e) {}
    activeSirenOsc = null;
  }
  if (activeSirenGain) {
    try {
      activeSirenGain.disconnect();
    } catch (e) {}
    activeSirenGain = null;
  }
};

export const playVoiceAlert = (text, lang = 'en', onEnd = null) => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn("Speech Synthesis is not supported in this browser environment.");
    if (onEnd) onEnd();
    return;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  
  // Set language code
  if (lang === 'hi') {
    utterance.lang = 'hi-IN';
  } else if (lang === 'as' || lang === 'brx' || lang === 'kha') {
    // Fallback regional language synthesizer
    utterance.lang = 'hi-IN';
  } else {
    utterance.lang = 'en-IN';
  }

  utterance.rate = 0.95;
  utterance.pitch = 1.05;

  utterance.onend = () => {
    currentUtterance = null;
    if (onEnd) onEnd();
  };

  utterance.onerror = (e) => {
    console.warn("TTS Speech error:", e);
    currentUtterance = null;
    if (onEnd) onEnd();
  };

  currentUtterance = utterance;
  window.speechSynthesis.speak(utterance);
};

export const stopVoiceAlert = () => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  currentUtterance = null;
};
