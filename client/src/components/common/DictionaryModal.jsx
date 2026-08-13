"use client";

import { useState } from "react";
import { FiSearch, FiX, FiBookOpen } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const DictionaryModal = ({ isOpen, onClose }) => {
  const [word, setWord] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSearch = async (e) => {
    e?.preventDefault();
    const cleanWord = word.trim();
    if (!cleanWord) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      // 1. Fetch English Definition & Synonyms
      let englishData = null;
      let extractedSynonyms = new Set();

      try {
        const dictRes = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(cleanWord.toLowerCase())}`
        );
        if (dictRes.ok) {
          const dictJson = await dictRes.json();
          if (Array.isArray(dictJson) && dictJson.length > 0) {
            englishData = dictJson[0];

            // Collect all synonyms from all meanings & definitions
            englishData.meanings?.forEach((meaning) => {
              meaning.synonyms?.forEach((syn) => extractedSynonyms.add(syn));
              meaning.definitions?.forEach((def) => {
                def.synonyms?.forEach((syn) => extractedSynonyms.add(syn));
              });
            });
          }
        }
      } catch (err) {
        // Silently catch dictionary API errors
      }

      // 2. Fetch Urdu Translation via Google Translate API
      const translateRes = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ur&dt=t&q=${encodeURIComponent(cleanWord)}`
      );
      
      let urduTranslation = "";
      if (translateRes.ok) {
        const transJson = await translateRes.json();
        urduTranslation = transJson?.[0]?.[0]?.[0] || "";
      }

      if (!englishData && !urduTranslation) {
        throw new Error("No definition found");
      }

      setResult({
        word: cleanWord,
        urduMeaning: urduTranslation,
        phonetic: englishData?.phonetics?.find((p) => p.text)?.text || "",
        meanings: englishData?.meanings || [],
        allSynonyms: Array.from(extractedSynonyms),
      });

    } catch (err) {
      setError(`"${word}" ka matlab nahi mil saka. Dusra lafz try karein.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md rounded-xl border border-border bg-card p-5 shadow-2xl text-card-foreground animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/60 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <FiBookOpen className="text-red-600 size-5" />
            <h3 className="font-bold text-lg">Tech & Urdu Dictionary</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close modal"
          >
            <FiX className="size-5" />
          </button>
        </div>

        {/* Intro Text */}
        <p className="text-xs text-muted-foreground mb-4">
          Type a word and view its English definition, Urdu meaning, and synonyms.
        </p>

        {/* Search Input */}
        <form onSubmit={handleSearch} className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm" />
            <Input
              type="text"
              placeholder="Enter a word (e.g., Hello, API, Database)..."
              value={word}
              onChange={(e) => setWord(e.target.value)}
              className="pl-9 text-sm"
              autoFocus
            />
          </div>
          <Button type="submit" disabled={loading || !word.trim()} className="bg-red-600 hover:bg-red-700 text-white">
            {loading ? "Searching..." : "Search"}
          </Button>
        </form>

        {/* Results Area */}
        <div className="max-h-64 overflow-y-auto pr-1 text-sm space-y-3">
          {error && (
            <p className="text-center text-red-500 py-4 text-xs font-medium">{error}</p>
          )}

          {result && (
            <div className="space-y-3">
              {/* Word Header & Urdu Box */}
              <div className="bg-muted/50 p-3 rounded-lg border border-border/50">
                <div className="flex items-center justify-between">
                  <h4 className="text-xl font-extrabold capitalize text-foreground">{result.word}</h4>
                  {result.phonetic && (
                    <span className="text-xs text-muted-foreground font-mono">{result.phonetic}</span>
                  )}
                </div>

                {/* Urdu Translation */}
                {result.urduMeaning && (
                  <div className="mt-2 pt-2 border-t border-border/40 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-muted-foreground">Urdu Meaning:</span>
                    <span className="text-lg font-bold text-red-600 font-serif dir-rtl">
                      {result.urduMeaning}
                    </span>
                  </div>
                )}
              </div>

              {/* Main Synonyms Badges */}
              {result.allSynonyms?.length > 0 && (
                <div className="bg-red-500/5 p-2.5 rounded-lg border border-red-500/10">
                  <span className="text-[11px] font-bold text-red-600 dark:text-red-400 block mb-1.5">
                    Synonyms / Similar Words:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {result.allSynonyms.slice(0, 8).map((syn, i) => (
                      <span key={i} className="text-xs bg-background border border-border px-2 py-0.5 rounded-md font-mono text-foreground shadow-xs">
                        {syn}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* English Meanings */}
              {result.meanings.length > 0 && (
                <div className="space-y-2">
                  <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">English Definition:</p>
                  {result.meanings.map((meaning, idx) => (
                    <div key={idx} className="border-t border-border/40 pt-2">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-red-600 bg-red-500/10 px-2 py-0.5 rounded">
                        {meaning.partOfSpeech}
                      </span>
                      
                      <p className="mt-1 text-xs text-foreground/90 leading-relaxed">
                        {meaning.definitions?.[0]?.definition}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Close Button */}
        <div className="mt-5 border-t border-border/40 pt-3 flex justify-end">
          <Button variant="outline" size="sm" onClick={onClose} className="text-xs">
            Close Window
          </Button>
        </div>

      </div>
    </div>
  );
};

export default DictionaryModal;