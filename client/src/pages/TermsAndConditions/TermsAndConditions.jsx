import React from "react";
import Link from "next/link";
import { 
  FileText, 
  ShieldAlert, 
  BookOpen, 
  UserX, 
  Scale, 
  Mail, 
  Sparkles,
  ArrowLeft 
} from "lucide-react";


const TermsAndConditions = () => {
  const lastUpdated = "July 21, 2026";
  const contactEmail = "techfoanalyzer@gmail.com";

  return (
    <div className="w-full min-h-screen bg-white py-16 md:py-24 px-4 sm:px-6 md:px-12 font-sans relative overflow-hidden selection:bg-red-500 selection:text-white">
      
      {/* Background Soft Glow & Ambient Grid Pattern */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] sm:w-[800px] h-[350px] sm:h-[400px] bg-gradient-to-b from-red-500/10 via-slate-200/20 to-transparent blur-3xl pointer-events-none rounded-full" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-12 relative z-10">
        
        {/* Top Back Navigation */}
        <div>
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 hover:text-red-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>

        {/* Header Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-600 border border-red-200/60 tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" /> User Agreement
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Last Updated: {lastUpdated}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
            Terms & Conditions
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl">
            Welcome to TechfoAnalyzer. By accessing or using our platform, you agree to comply with and be bound by the following terms and guidelines.
          </p>
        </div>

        {/* Soft Line Divider */}
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

        {/* Main Content Sections */}
        <div className="space-y-10 text-slate-700 leading-relaxed text-sm sm:text-base">

          {/* Section 1 */}
          <section className="space-y-3 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2.5">
              <BookOpen className="w-5 h-5 text-red-600" /> 1. Educational Purpose & Universal Access
            </h2>
            <p>
              TechfoAnalyzer is an open educational platform designed to provide insights on technology, computing, AI, and cybersecurity. 
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-600">
              <li>Our content is available to visitors of all ages across the globe for reading and educational reference.</li>
              <li>You agree to use the information provided on this platform solely for personal learning, academic study, and constructive knowledge sharing.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-3 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2.5">
              <FileText className="w-5 h-5 text-red-600" /> 2. Content Usage & Intellectual Property
            </h2>
            <p>
              All articles, technical analyses, graphics, and original material on TechfoAnalyzer are protected by intellectual property rights.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-600">
              <li>
                <strong>Allowed Usage:</strong> You are permitted to read our articles, take notes, and quote short excerpts for academic assignments, research papers, or educational presentations with proper attribution to TechfoAnalyzer.
              </li>
              <li>
                <strong>Prohibited Usage:</strong> You are strictly forbidden from copying, reproducing, or republishing full articles or substantial portions of our content on other commercial or personal websites, apps, or online publishing platforms without prior written authorization.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2.5">
              <UserX className="w-5 h-5 text-red-600" /> 3. User Conduct & Account Termination
            </h2>
            <p>
              Registered users who post comments or interact on TechfoAnalyzer must maintain a respectful and productive environment.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-600">
              <li>Spam, hate speech, abusive language, promotional links, or illegal content in comment sections will not be tolerated.</li>
              <li>
                <strong>Admin Moderation Rights:</strong> The site administration reserves full rights to remove any comment, restrict account access, or permanently block/delete user accounts without prior notice if these guidelines are violated.
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-3 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2.5">
              <ShieldAlert className="w-5 h-5 text-red-600" /> 4. Disclaimer & Limitation of Liability
            </h2>
            <p>
              While we strive for accuracy and rigorous analysis, technical concepts change rapidly. All content on TechfoAnalyzer is provided on an "as is" basis for informational purposes only.
            </p>
            <p>
              TechfoAnalyzer and its administrators are not liable for any technical issues, system configurations, or implementation outcomes resulting from the application of knowledge or code examples shared in our articles.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2.5">
              <Scale className="w-5 h-5 text-red-600" /> 5. Global Compliance & Changes
            </h2>
            <p>
              These terms are governed in accordance with international digital copyright practices and online standards. We reserve the right to modify these terms at any time. Continued use of the site following any changes constitutes acceptance of the new terms.
            </p>
          </section>

          {/* Section 6 - Contact */}
          <section className="p-6 sm:p-8 rounded-2xl bg-slate-900 text-white space-y-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h2 className="text-lg font-bold flex items-center gap-2 text-white">
                <Mail className="w-5 h-5 text-red-500" /> Need Clarification?
              </h2>
              <p className="text-slate-300 text-sm mt-1">
                If you have questions regarding these terms or copyright permissions, reach out to us.
              </p>
              <p className="text-xs font-mono text-red-400 mt-2">{contactEmail}</p>
            </div>

            <a 
              href={`/contact-us`} 
              className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-sm font-semibold transition-all duration-300 shrink-0"
            >
              Contact Admin
            </a>
          </section>

        </div>

      </div>
    </div>
  );
};

export default TermsAndConditions;