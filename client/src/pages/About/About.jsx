import React from "react";
import textlogo from "@/assets/images/logo.png";
import { 
  ShieldCheck, 
  Cpu, 
  Terminal, 
  ArrowRight, 
  Mail, 
  Sparkles,
  CheckCircle2
} from "lucide-react";
import Image from "next/image";

const AboutPage = () => {
  return (
    <div className="w-full min-h-screen bg-white py-16 md:py-24 px-4 sm:px-6 md:px-12 font-sans relative overflow-hidden selection:bg-red-500 selection:text-white">
      
      {/* Background Soft Glow & Ambient Grid Pattern */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] sm:w-[800px] h-[350px] sm:h-[400px] bg-gradient-to-b from-red-500/10 via-slate-200/20 to-transparent blur-3xl pointer-events-none rounded-full" />
      {/* <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" /> */}

      <div className="max-w-5xl mx-auto space-y-16 sm:space-y-20 relative z-10">
        
        {/* 1. Header & Brand Logo Section */}
        <div className="space-y-6 sm:space-y-8">
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
            {/* Transparent Web Logo */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-rose-400 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
              <Image
                src={textlogo} 
                alt="TechfoAnalyzer Logo" 
                className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover bg-white p-2 border border-slate-200/80 shadow-sm"
              />
            </div>
            
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-600 border border-red-200/60 tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" /> About the platform
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-tight text-slate-900 leading-[1.18] max-w-4xl">
            TechfoAnalyzer is an independent journal dedicated to tracking{" "}
            <span className="font-semibold bg-gradient-to-r from-red-600 via-rose-600 to-red-500 bg-clip-text text-transparent">
              computing, security, and intelligence
            </span>
            .
          </h1>
        </div>

        {/* 2. Soft Line Divider */}
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

        {/* 3. Narrative Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6 sm:p-10 rounded-3xl bg-white/80 backdrop-blur-sm border border-slate-200/80 shadow-xl shadow-slate-200/40 relative">
          <div className="md:col-span-1 flex flex-col justify-between">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-red-600 flex items-center gap-2">
                <Terminal className="w-4 h-4" /> Our Scope
              </h2>
              <p className="mt-2 text-2xl font-bold text-slate-900">Unfiltered Technical Depth</p>
            </div>
          </div>
          
          <div className="md:col-span-2 space-y-5 text-slate-600 leading-relaxed text-base sm:text-lg font-normal">
            <p>
              We dive deep into the technology driving the modern world — covering everything from core computer science and AI to system architecture and ethical hacking.
            </p>
            <p className="text-slate-800 font-medium">
             At TechfoAnalyzer, we skip the fluff, hype, and PR spin. Instead, we break down complex technical ideas with clarity, precision, and complete honesty.
            </p>
          </div>
        </div>

        {/* 4. Specs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Niches */}
          <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/80 hover:border-red-300 shadow-sm hover:shadow-md transition-all duration-300 group">
            <div className="p-3 rounded-xl bg-red-50 text-red-600 w-fit mb-6 group-hover:scale-110 transition-transform">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400 mb-4">
              Niches
            </h3>
            <ul className="space-y-3 text-sm font-medium text-slate-700">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-red-500/80 shrink-0" />
                <span>Computer Science</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-red-500/80 shrink-0" />
                <span>Cybersecurity & Hacking</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-red-500/80 shrink-0" />
                <span>Artificial Intelligence</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-red-500/80 shrink-0" />
                <span>Systems Engineering</span>
              </li>
            </ul>
          </div>

          {/* Card 2: Focus */}
          <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/80 hover:border-red-300 shadow-sm hover:shadow-md transition-all duration-300 group">
            <div className="p-3 rounded-xl bg-red-50 text-red-600 w-fit mb-6 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400 mb-4">
              Focus
            </h3>
            <ul className="space-y-3 text-sm font-medium text-slate-700">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-red-500/80 shrink-0" />
                <span>Deep Technical Analysis</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-red-500/80 shrink-0" />
                <span>Practical Frameworks</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-red-500/80 shrink-0" />
                <span>0% Corporate Noise</span>
              </li>
            </ul>
          </div>

          {/* Card 3: Contact */}
          <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/80 hover:border-red-300 shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col justify-between">
            <div>
              <div className="p-3 rounded-xl bg-red-50 text-red-600 w-fit mb-6 group-hover:scale-110 transition-transform">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400 mb-2">
                Contact
              </h3>
              <p className="text-sm font-semibold text-slate-900 mb-6 font-mono break-all">
               techfoanalyzer@gmail.com
              </p>
            </div>
            
            <a 
              href="/contact-us" 
              className="inline-flex items-center justify-between w-full px-4 py-3 rounded-xl bg-slate-900 hover:bg-red-600 text-white text-sm font-medium transition-all duration-300 shadow-sm group/btn"
            >
              <span>Get in touch</span>
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AboutPage;