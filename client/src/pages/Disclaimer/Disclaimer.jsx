import Link from "next/link";
import { 
  AlertTriangle, 
  ExternalLink, 
  ShieldCheck, 
  DollarSign, 
  BookOpen, 
  Mail, 
  Sparkles,
  ArrowLeft 
} from "lucide-react";


const Disclaimer = () => {
  const lastUpdated = "July 21, 2026";
  const contactEmail = "techfoanalyzer@gmail.com";

  return (
    <div className="w-full min-h-screen  bg-white py-16 md:py-24 px-4 sm:px-6 md:px-12 font-sans relative overflow-hidden selection:bg-red-500 selection:text-white">
      

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
              <Sparkles className="w-3.5 h-3.5" /> General Disclaimer
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Last Updated: {lastUpdated}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
            Disclaimer
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl">
            Please read this disclaimer carefully before using TechfoAnalyzer. All information provided on this platform is published in good faith and for general educational purposes only.
          </p>
        </div>

        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />


        <div className="space-y-10 text-slate-700 leading-relaxed text-sm sm:text-base">


          <section className="space-y-3 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2.5">
              <BookOpen className="w-5 h-5 text-red-600" /> 1. Educational Purpose Only
            </h2>
            <p>
              At TechfoAnalyzer, everything we share from
               tech tutorials to cybersecurity insights is 
               strictly for <strong>learning purposes</strong>. 
            </p>
            <p className="text-slate-600">
              Tech moves really fast, so code and frameworks change constantly. We always do our best to post accurate stuff, but we can't guarantee every single post is completely accurate or always up to date.
            </p>
          </section>


          <section className="space-y-3 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2.5">
              <AlertTriangle className="w-5 h-5 text-red-600" /> 2. Limitation of Liability & Use at Own Risk
            </h2>
            <p>
              Any action you take based upon the information found on TechfoAnalyzer is strictly at your own risk. 
            </p>
            <p className="text-slate-600">
              TechfoAnalyzer and its author(s) will not be held liable for any losses, system failures, data bugs, or damages in connection with the implementation or execution of any code snippets, tutorials, or configurations shared on this website. Users are advised to test code and procedures in isolated development environments.
            </p>
          </section>

          <section className="space-y-3 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2.5">
              <ExternalLink className="w-5 h-5 text-red-600" /> 3. External Links Disclaimer
            </h2>
            <p>
              From our website, you may visit external websites by following hyperlinks to third-party sources (e.g., GitHub, documentation sites, software vendors).
            </p>
            <p className="text-slate-600">
              While we strive to provide quality links to useful and ethical websites, we have no control over the content, security, or nature of these external sites. The inclusion of any link does not imply a full endorsement of all content found on those third-party platforms.
            </p>
          </section>

          {/* Section 4: Affiliate & Advertising Disclosure */}
          <section className="space-y-3 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2.5">
              <DollarSign className="w-5 h-5 text-red-600" /> 4. Advertising & Affiliate Disclosure
            </h2>
            <p>
              TechfoAnalyzer may display advertisements (via Google AdSense or other ad networks) and may include affiliate links in future content or reviews.
            </p>
            <p className="text-slate-600">
              If you click on a recommended tech product, service, or hosting affiliate link and make a purchase, TechfoAnalyzer may earn a small commission at no additional cost to you. We only recommend tools, frameworks, or services that align with our quality standards.
            </p>
          </section>

          {/* Section 5: Consent */}
          <section className="space-y-3 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-red-600" /> 5. User Consent
            </h2>
            <p className="text-slate-600">
              By using our website, you hereby consent to our disclaimer and agree to its terms.
            </p>
          </section>

          {/* Section 6 - Contact */}
          <section className="p-6 sm:p-8 rounded-2xl bg-slate-900 text-white space-y-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h2 className="text-lg font-bold flex items-center gap-2 text-white">
                <Mail className="w-5 h-5 text-red-500" /> Questions Regarding Our Disclaimer?
              </h2>
              <p className="text-slate-300 text-sm mt-1">
                If you require any more information or have questions about our site's disclaimer, please contact us.
              </p>
              <p className="text-xs font-mono text-red-400 mt-2">{contactEmail}</p>
            </div>

            <a 
              href={`mailto:${contactEmail}`} 
              className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-sm font-semibold transition-all duration-300 shrink-0"
            >
              Contact Support
            </a>
          </section>

        </div>

      </div>
    </div>
  );
};

export default Disclaimer;