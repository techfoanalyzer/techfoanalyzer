"use client";

import { useState, useEffect, useRef } from "react";
import { FaPlay, FaPause, FaSquare } from "react-icons/fa6";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import { showToast } from "@/helper/showToast";

const TextToSpeech = ({ textToRead, title = "Article" }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [rate, setRate] = useState(1);
  const [isSupported, setIsSupported] = useState(true);

  const synthRef = useRef(null);
  const chunksRef = useRef([]);
  const currentChunkIndexRef = useRef(0);
  const rateRef = useRef(rate);

  useEffect(() => {
    rateRef.current = rate;
  }, [rate]);

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      synthRef.current = window.speechSynthesis;
      setIsSupported(true);

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

  const prepareChunks = (htmlOrText) => {
    if (!htmlOrText) return [];
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
        placeholder.innerText = ". Code snippet shown in post. ";
        codeEl.parentNode?.replaceChild(placeholder, codeEl);
      });

      let text = tempDiv.textContent || tempDiv.innerText || "";
      text = text.replace(/\s+/g, " ").trim();

      const fullText = `${title}. ${text}`.trim();
      const sentences = fullText
        .split(/(?<=[.!?])\s+/)
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      return sentences.length > 0 ? sentences : [fullText];
    } catch (e) {
      return [];
    }
  };

  // Best Voice Picker including iOS priority (Samantha/Daniel)
  const getBestVoice = () => {
    if (!synthRef.current) return null;
    let voices = synthRef.current.getVoices();

    if (!voices || voices.length === 0) return null;

    return (
      voices.find(
        (v) =>
          v.lang.startsWith("en") &&
          (v.name.includes("Samantha") ||
            v.name.includes("Daniel") ||
            v.name.includes("David") ||
            v.name.includes("Google UK English Male"))
      ) ||
      voices.find((v) => v.lang.startsWith("en")) ||
      voices[0]
    );
  };

  const speakNextChunk = () => {
    if (!synthRef.current) return;

    if (currentChunkIndexRef.current >= chunksRef.current.length) {
      setIsPlaying(false);
      setIsPaused(false);
      currentChunkIndexRef.current = 0;
      return;
    }

    const textToSpeak = chunksRef.current[currentChunkIndexRef.current];
    const utterance = new SpeechSynthesisUtterance(textToSpeak);

    utterance.rate = rateRef.current;
    utterance.pitch = 1.0;

    const bestVoice = getBestVoice();
    if (bestVoice) {
      utterance.voice = bestVoice;
    }

    utterance.onend = () => {
      currentChunkIndexRef.current += 1;
      speakNextChunk();
    };

    utterance.onerror = (event) => {
      if (event.error === "canceled" || event.error === "interrupted") return;
      setIsPlaying(false);
      setIsPaused(false);
    };

    synthRef.current.speak(utterance);
  };

  const handlePlayPause = () => {
    // English Fallback if browser/webview speech engine is blocked
    if (!isSupported || !synthRef.current) {
      const msg = "Audio speech is not supported in this browser. Please open in Chrome or Safari.";
      if (typeof showToast === "function") {
        showToast("info", msg);
      } else {
        alert(msg);
      }
      return;
    }

    // Direct User Interaction Fix for iOS Safari
    if (synthRef.current.getVoices().length === 0) {
      synthRef.current.getVoices();
    }

    // 1. PAUSE
    if (isPlaying) {
      synthRef.current.cancel();
      setIsPlaying(false);
      setIsPaused(true);
      return;
    }

    // 2. RESUME
    if (isPaused) {
      setIsPlaying(true);
      setIsPaused(false);
      speakNextChunk();
      return;
    }

    // 3. FRESH START
    const chunks = prepareChunks(textToRead);
    if (chunks.length === 0) return;

    chunksRef.current = chunks;
    currentChunkIndexRef.current = 0;

    setIsPlaying(true);
    setIsPaused(false);
    speakNextChunk();
  };

  const handleStop = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsPlaying(false);
      setIsPaused(false);
      currentChunkIndexRef.current = 0;
    }
  };

  const handleSpeedChange = (newRate) => {
    setRate(newRate);
    rateRef.current = newRate;

    if (isPlaying) {
      synthRef.current.cancel();
      speakNextChunk();
    }
  };

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

      {/* Control Buttons */}
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

        {/* Playback Speed Controls */}
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