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
  const utteranceRef = useRef(null);
  const charIndexRef = useRef(0);
  const timerRef = useRef(null);
  const startTimeRef = useRef(0);

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
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const clearProgressTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const getPlainText = (htmlOrText) => {
    if (!htmlOrText) return "";

    try {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = htmlOrText;

      const mediaElements = tempDiv.querySelectorAll(
        "img, figure, svg, iframe, script, style"
      );
      mediaElements.forEach((el) => el.remove());

      const codeBlocks = tempDiv.querySelectorAll("pre, code");
      codeBlocks.forEach((codeEl) => {
        const placeholder = document.createElement("span");
        placeholder.innerText = ". [Code snippet shown in post]. ";
        codeEl.parentNode?.replaceChild(placeholder, codeEl);
      });

      let text = tempDiv.textContent || tempDiv.innerText || "";
      text = text.replace(/\s+/g, " ").trim();

      return text.length > 2000 ? text.slice(0, 2000) + "..." : text;
    } catch (e) {
      return "";
    }
  };

  const getBestVoice = () => {
    if (!synthRef.current) return null;
    const voices = synthRef.current.getVoices();

    if (!voices || voices.length === 0) return null;

    return (
      voices.find(
        (v) =>
          v.lang.startsWith("en") &&
          (v.name.includes("David") ||
            v.name.includes("Mark") ||
            v.name.includes("Guy") ||
            v.name.includes("Male") ||
            v.name.includes("Google UK English Male"))
      ) ||
      voices.find((v) => v.lang.startsWith("en")) ||
      voices[0]
    );
  };

  const startSpeaking = (currentRate, startFromIndex = 0) => {
    if (!synthRef.current) return;

    synthRef.current.cancel();
    clearProgressTimer();

    const cleanBodyText = getPlainText(textToRead);
    const fullText = `${title}. ${cleanBodyText}`.trim();

    const textToSpeak =
      startFromIndex > 0 ? fullText.slice(startFromIndex) : fullText;

    if (!textToSpeak) return;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = currentRate;
    utterance.pitch = 1.0;

    const bestVoice = getBestVoice();
    if (bestVoice) {
      utterance.voice = bestVoice;
    }

    // Backup 1: Standard boundary tracking (Desk / Native support)
    utterance.onboundary = (event) => {
      if (event.name === "word") {
        charIndexRef.current = startFromIndex + event.charIndex;
      }
    };

    // Backup 2: Mobile Fallback Timer (Average English speed ~15-18 chars/sec at 1x)
    const charsPerSecond = 16 * currentRate;
    startTimeRef.current = Date.now();

    timerRef.current = setInterval(() => {
      const elapsedSeconds = (Date.now() - startTimeRef.current) / 1000;
      const estimatedCharsSpoken = Math.floor(elapsedSeconds * charsPerSecond);
      const calculatedIndex = startFromIndex + estimatedCharsSpoken;

      if (calculatedIndex < fullText.length) {
        // Sirf tab update karein agar boundary se precise index na mil raha ho
        charIndexRef.current = calculatedIndex;
      }
    }, 250);

    utterance.onend = () => {
      clearProgressTimer();
      setIsPlaying(false);
      setIsPaused(false);
      charIndexRef.current = 0;
      utteranceRef.current = null;
    };

    utterance.onerror = (event) => {
      clearProgressTimer();
      if (event.error === "canceled" || event.error === "interrupted") return;
      setIsPlaying(false);
      setIsPaused(false);
      charIndexRef.current = 0;
      utteranceRef.current = null;
    };

    utteranceRef.current = utterance;

    synthRef.current.speak(utterance);
    setIsPlaying(true);
    setIsPaused(false);
  };

  const handlePlayPause = () => {
    if (!synthRef.current || !isSupported) return;

    // 1. Pause
    if (isPlaying) {
      clearProgressTimer();
      synthRef.current.cancel();
      setIsPlaying(false);
      setIsPaused(true);
      return;
    }

    // 2. Resume (Starts directly from calculated charIndexRef)
    if (isPaused) {
      startSpeaking(rate, charIndexRef.current);
      return;
    }

    // 3. Fresh Start
    charIndexRef.current = 0;
    startSpeaking(rate, 0);
  };

  const handleStop = () => {
    if (synthRef.current) {
      clearProgressTimer();
      synthRef.current.cancel();
      setIsPlaying(false);
      setIsPaused(false);
      charIndexRef.current = 0;
      utteranceRef.current = null;
    }
  };

  const handleSpeedChange = (newRate) => {
    setRate(newRate);
    if (isPlaying || isPaused) {
      startSpeaking(newRate, charIndexRef.current);
    }
  };

  if (!isSupported) return null;

  return (
    <div className="my-4 flex items-center justify-between gap-2 rounded-2xl border border-red-500/20 bg-red-500/5 p-2.5 sm:p-3 sm:px-4">
      {/* Label & Icon */}
      <div className="flex items-center gap-2 min-w-0 shrink">
        <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-xl bg-red-600 text-white shadow-xs">
          <HiMiniSpeakerWave
            className={`text-base sm:text-lg ${
              isPlaying ? "animate-pulse" : ""
            }`}
          />
        </div>
        <div className="min-w-0">
          <h4 className="text-[11px] sm:text-xs font-bold text-foreground truncate">
            Listen Article
          </h4>
          <p className="text-[10px] sm:text-[11px] text-muted-foreground truncate hidden xs:block">
            AI Voice
          </p>
        </div>
      </div>

      {/* Controls Container */}
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        <button
          type="button"
          onClick={handlePlayPause}
          className="flex items-center gap-1 rounded-lg bg-red-600 px-2.5 py-1.5 sm:px-3 text-[11px] sm:text-xs font-semibold text-white shadow-xs hover:bg-red-700 active:scale-95 transition-all"
        >
          {isPlaying ? (
            <>
              <FaPause className="text-[10px] sm:text-xs" /> <span>Pause</span>
            </>
          ) : isPaused ? (
            <>
              <FaPlay className="text-[10px] sm:text-xs" /> <span>Resume</span>
            </>
          ) : (
            <>
              <FaPlay className="text-[10px] sm:text-xs" /> <span>Play</span>
            </>
          )}
        </button>

        {(isPlaying || isPaused) && (
          <button
            type="button"
            onClick={handleStop}
            className="flex items-center justify-center rounded-lg border border-border bg-background p-1.5 sm:p-2 text-muted-foreground hover:bg-muted hover:text-foreground active:scale-95 transition-all"
            title="Stop Audio"
          >
            <FaSquare className="text-[10px] sm:text-xs" />
          </button>
        )}

        {/* Speed Controls */}
        <div className="flex items-center rounded-lg border border-border bg-background p-0.5 text-[10px] sm:text-[11px]">
          {[1, 1.25, 1.5].map((speed) => (
            <button
              key={speed}
              type="button"
              onClick={() => handleSpeedChange(speed)}
              className={`rounded-md px-1.5 py-0.5 sm:px-2 sm:py-1 font-mono font-medium transition-colors ${
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