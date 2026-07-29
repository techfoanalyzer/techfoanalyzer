"use client";

import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { showToast } from '@/helper/showToast';
import { 
  Mail, 
  MessageSquare, 
  Send, 
  Sparkles, 
  ArrowLeft, 
  Clock, 
  MapPin,
  Loader2
} from "lucide-react";

export default function ContactUs() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "techfoanalyzer@gmail.com";

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.target);
    formData.append("access_key", process.env.NEXT_PUBLIC_ACCESS_KEY_EMAIL);

    try {
      const response = await axios.post("https://api.web3forms.com/submit", formData);

      if (response.data.success) {
        showToast('success', "Your message has been sent successfully.");
        event.target.reset();
      } else {
        showToast('error', response.data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      showToast('error', "Network error. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-white py-16 md:py-24 px-4 sm:px-6 md:px-12 font-sans relative overflow-hidden selection:bg-red-500 selection:text-white">
 
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] sm:w-[800px] h-[350px] sm:h-[400px] bg-gradient-to-b from-red-500/10 via-slate-200/20 to-transparent blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-4xl mx-auto space-y-12 relative z-10">

        <div>
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 hover:text-red-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-600 border border-red-200/60 tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" /> Get In Touch
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
            Contact Us
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl">
            Have a question, feedback about our articles, or a project collaboration in mind? We would love to hear from you.
          </p>
        </div>

        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
         
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-4">
              <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-200/60 flex items-center justify-center text-red-600">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Email Admin</h3>
                <p className="text-xs text-slate-500 mt-1">Send us a message directly anytime.</p>
                <a 
  href={`mailto:${contactEmail}`}
  className="text-xs sm:text-sm font-mono text-red-600 hover:underline inline-block mt-2 whitespace-nowrap truncate max-w-full"
>
  {contactEmail}
</a>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-4">
              <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-200/60 flex items-center justify-center text-red-600">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Response Time</h3>
                <p className="text-xs text-slate-500 mt-1">We usually reply within 24 to 48 hours on business days.</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-4">
              <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-200/60 flex items-center justify-center text-red-600">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Location</h3>
                <p className="text-xs text-slate-500 mt-1">Worldwide Digital Presence</p>
              </div>
            </div>
          </div>

       
          <div className="md:col-span-2 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-red-600" />
              <h2 className="text-lg font-bold text-slate-900">Send a Message</h2>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Your Name
                  </label>
                  <input 
                    type="text" 
                    name="name"
                    placeholder="TechfoAnalyzer"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Your Email
                  </label>
                  <input 
                    type="email" 
                    name="email"
                    placeholder="techfoanalyzer@example.com"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Subject
                </label>
                <input 
                  type="text" 
                  name="subject"
                  placeholder="General Query / Collaboration / Issue Report"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Message
                </label>
                <textarea 
                  rows="5"
                  name="message"
                  placeholder="Type your message here..."
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all resize-none"
                ></textarea>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 disabled:bg-red-400 text-white font-semibold text-sm transition-all duration-300 inline-flex items-center justify-center gap-2 shadow-sm cursor-pointer disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Send Message
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}