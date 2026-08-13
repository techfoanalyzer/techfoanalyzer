"use client";

import { useState, useEffect, useRef } from "react";
import { FaPlay, FaPause, FaSquare } from "react-icons/fa6";
import { HiMiniSpeakerWave } from "react-icons/hi2";

const TextToSpeech = ({ textToRead, title = "Article" }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [rate, setRate] = useState(1);
  const [isSupported, setIsSupported] = useState(true);

  const synthRef = useRef(null);
  const utteranceRef = useRef(null); // Active Utterance ka reference

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      synthRef.current = window.speechSynthesis;

      const loadVoices = () => {
        if (synthRef.current) {
          synthRef.current.getVoices();
        }
      };
      loadVoices();
      if (synthRef.current.onvoiceschanged !== undefined) {
        synthRef.current.onvoiceschanged = loadVoices;
      }
    } else {
      setIsSupported(false);
    }

    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  // Smart Plain Text Extractor
  const getPlainText = (htmlOrText) => {
    if (!htmlOrText) return "";

    try {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = htmlOrText;

      // 1. Remove Media & Non-Text Elements
      const mediaElements = tempDiv.querySelectorAll(
        "img, figure, svg, iframe, script, style"
      );
      mediaElements.forEach((el) => el.remove());

      // 2. Replace Code Blocks with friendly placeholder
      const codeBlocks = tempDiv.querySelectorAll("pre, code");
      codeBlocks.forEach((codeEl) => {
        const placeholder = document.createElement("span");
        placeholder.innerText = ". [Code snippet shown in post]. ";
        codeEl.parentNode?.replaceChild(placeholder, codeEl);
      });

      let text = tempDiv.textContent || tempDiv.innerText || "";
      return text.replace(/\s+/g, " ").trim();
    } catch (e) {
      return "";
    }
  };

 // Best/Energetic Voice Finder Function
  const getBestEnergeticVoice = () => {
    if (!synthRef.current) return null;
    const voices = synthRef.current.getVoices();

    if (!voices || voices.length === 0) return null;

    // 1. Edge/Chrome Natural or Neural Voices (High Quality & Energetic)
    const naturalVoice = voices.find(
      (v) =>
        v.lang.startsWith("en") &&
        (v.name.includes("Natural") ||
          v.name.includes("Online (Natural)") ||
          v.name.includes("Neural"))
    );
    if (naturalVoice) return naturalVoice;

    // 2. Google Premium Voices (Chrome Built-in)
    const googleVoice = voices.find(
      (v) => v.lang.startsWith("en") && v.name.includes("Google")
    );
    if (googleVoice) return googleVoice;

    // 3. Any English US/UK Voice
    const englishVoice = voices.find(
      (v) => v.lang === "en-US" || v.lang === "en-GB"
    );
    if (englishVoice) return englishVoice;

    return voices[0];
  };

  const startSpeaking = (currentRate) => {
    if (!synthRef.current) return;

    synthRef.current.cancel(); // Clear any existing speech

    const cleanBodyText = getPlainText(textToRead);
    const cleanText = `${title}. ${cleanBodyText}`.trim();

    if (!cleanBodyText && !title) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = currentRate;

    // Energetic Expression Enhancements
    utterance.pitch = 1.05; // Pitch ko thora sa high kiya hai energetic tone ke liye
    utterance.volume = 1;

    // Energetic / Natural Voice Selection
    const energeticVoice = getBestEnergeticVoice();
    if (energeticVoice) {
      utterance.voice = energeticVoice;
    }

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      utteranceRef.current = null;
    };

    utterance.onerror = (event) => {
      if (event.error === "canceled" || event.error === "interrupted") return;
      setIsPlaying(false);
      setIsPaused(false);
      utteranceRef.current = null;
    };

    utteranceRef.current = utterance;

    // Chrome timing fix
    setTimeout(() => {
      synthRef.current.speak(utterance);
      setIsPlaying(true);
      setIsPaused(false);
    }, 50);
  };

  const handlePlayPause = () => {
    if (!synthRef.current || !isSupported) return;

    // 1. Resume if paused
    if (isPaused) {
      synthRef.current.resume();
      setIsPlaying(true);
      setIsPaused(false);
      return;
    }

    // 2. Pause if playing
    if (isPlaying) {
      synthRef.current.pause();
      setIsPlaying(false);
      setIsPaused(true);
      return;
    }

    // 3. Start fresh speech
    startSpeaking(rate);
  };

  const handleStop = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsPlaying(false);
      setIsPaused(false);
      utteranceRef.current = null;
    }
  };

  const handleSpeedChange = (newRate) => {
    setRate(newRate);

    // Agar audio chal rahi hai ya paused hai, to naye rate ke saath restart karein
    if (isPlaying || isPaused) {
      startSpeaking(newRate);
    }
  };

  if (!isSupported) return null;

  return (
    <div className="my-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-red-500/20 bg-red-500/5 p-3 sm:px-4">
      {/* Label & Icon */}
      <div className="flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-600 text-white shadow-xs">
          <HiMiniSpeakerWave
            className={`text-lg ${isPlaying ? "animate-pulse" : ""}`}
          />
        </div>
        <div>
          <h4 className="text-xs font-bold text-foreground">
            Listen to Article
          </h4>
          <p className="text-[11px] text-muted-foreground">
            AI Text-to-Speech Voice
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handlePlayPause}
          className="flex items-center gap-1.5 rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-red-700 active:scale-95 transition-all"
        >
          {isPlaying ? (
            <>
              <FaPause className="text-xs" /> <span>Pause</span>
            </>
          ) : isPaused ? (
            <>
              <FaPlay className="text-xs" /> <span>Resume</span>
            </>
          ) : (
            <>
              <FaPlay className="text-xs" /> <span>Play</span>
            </>
          )}
        </button>

        {(isPlaying || isPaused) && (
          <button
            type="button"
            onClick={handleStop}
            className="flex items-center justify-center rounded-lg border border-border bg-background p-2 text-muted-foreground hover:bg-muted hover:text-foreground active:scale-95 transition-all"
            title="Stop Audio"
          >
            <FaSquare className="text-xs" />
          </button>
        )}

        {/* Speed Controls */}
        <div className="flex items-center rounded-lg border border-border bg-background p-0.5 text-[11px]">
          {[1, 1.25, 1.5].map((speed) => (
            <button
              key={speed}
              type="button"
              onClick={() => handleSpeedChange(speed)}
              className={`rounded-md px-2 py-1 font-mono font-medium transition-colors ${
                rate === speed
                  ? "bg-red-600 text-white"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {speed}x
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TextToSpeech;