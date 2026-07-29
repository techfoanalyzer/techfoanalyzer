import Link from "next/link";
import { 
  ShieldCheck, 
  Lock, 
  Eye, 
  Database, 
  Cookie, 
  Mail, 
  Sparkles,
  ArrowLeft 
} from "lucide-react";



const PrivacyPolicy = () => {
  const lastUpdated = "July 21, 2026";
  const contactEmail = "techfoanalyzer@gmail.com";

  return (
    <div className="w-full min-h-screen bg-white py-16 md:py-24 px-4 sm:px-6 md:px-12 font-sans relative overflow-hidden selection:bg-red-500 selection:text-white">
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] sm:w-[800px] h-[350px] sm:h-[400px] bg-gradient-to-b from-red-500/10 via-slate-200/20 to-transparent blur-3xl pointer-events-none rounded-full" />
      {/* <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" /> */}

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
              <Sparkles className="w-3.5 h-3.5" /> Legal Transparency
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Last Updated: {lastUpdated}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
            Privacy Policy
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl">
            At TechfoAnalyzer, we value your privacy. This policy outlines how we collect, use, and safeguard your personal information across our platform.
          </p>
        </div>

        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

        <div className="space-y-10 text-slate-700 leading-relaxed text-sm sm:text-base">

          <section className="space-y-3 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2.5">
              <Database className="w-5 h-5 text-red-600" /> 1. Information We Collect
            </h2>
            <p>
              We collect information to provide better services and an interactive experience for all users reading our technology insights.
            </p>
            <ul className="list-disc pl-5 space-y-3 text-slate-600">
  <li>
    <strong>Account Information & Sign-In / Sign-Up Verification:</strong> When
    you Sign Up or Sign In to TechfoAnalyzer, we collect your Name and Email address.
    To ensure your security and prevent unauthorized access, an One-Time Password
    (OTP) is sent to your registered email for account verification. Please rest
    assured that your personal details and passwords are strictly encrypted and
    securely stored.
  </li>
  <li>
    <strong>Email OTP Delivery & Spam Disclaimer:</strong> OTP verification
    emails are usually delivered to your Primary Inbox within seconds. In rare
    cases where the email does not appear in your main inbox, please check your{" "}
    <strong>Spam, Junk, or Promotions folder</strong>. There is no need to worry—our
    verification emails are completely safe, free from spam, and strictly sent
    for account authentication purposes.
  </li>
  <li>
    <strong>Third-Party Authentication:</strong> If you choose the "Continue with
    Google" option, we only receive basic public profile details such as your
    Name, Email address, and Profile Picture provided directly by Google. We
    never request or store your Google account password.
  </li>
  <li>
    <strong>User Activity & Interactions:</strong> When logged in, we securely
    store interactions you perform on our blogs—such as comments posted
    (including post details and timestamps) and liked articles. You retain full
    control to view, manage, or delete your past comments at any time.
    Additional features, such as bookmarking posts for a saved reading list,
    may be introduced in future updates.
  </li>
</ul>
          </section>


          <section className="space-y-3 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2.5">
              <Eye className="w-5 h-5 text-red-600" /> 2. How We Use Your Information
            </h2>
            <p>Your data allows us to maintain and improve your reading experience. Specifically, we use it to:</p>
            <ul className="list-disc pl-5 space-y-2 text-slate-600">
              <li>Authenticate your access to logged-in features (comments, likes, saved blogs).</li>
              <li>Display your public profile name on comments you publish.</li>
              <li>Prevent spam, unauthorized access, and protect platform security.</li>
              <li>Analyze web performance to deliver faster and relevant technical content.</li>
            </ul>
          </section>

          <section className="space-y-3 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2.5">
              <Cookie className="w-5 h-5 text-red-600" /> 3. Cookies, Analytics & Advertising
            </h2>
            <p>
              TechfoAnalyzer uses cookies and tracking technologies to optimize performance and support the platform:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-600">
              <li>
                <strong>Google Analytics & Search Console:</strong> We use web analytics tools to understand site traffic patterns, popular tech categories, and search performance. This data is aggregated and anonymized.
              </li>
              <li>
                <strong>Google AdSense & Ad Networks:</strong> We partner with Google AdSense and third-party advertising partners to show advertisements. Google uses cookies (such as the DART cookie) to serve ads based on your visits to our site and other sites on the Internet.
              </li>
              <li>
                You can opt out of personalized advertising by visiting{" "}
                <a 
                  href="https://www.google.com/settings/ads" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-red-600 underline font-medium hover:text-red-700"
                >
                  Google Ad Settings
                </a>.
              </li>
            </ul>
          </section>


          <section className="space-y-3 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2.5">
              <Lock className="w-5 h-5 text-red-600" /> 4. Data Security & Rights
            </h2>
            <p>
              We prioritize data security and use industry-standard measures to protect your credentials. We do not sell, trade, or rent your personal information to third parties.
            </p>
            <p>
              Regardless of where you reside globally (including GDPR or CCPA jurisdictions), you have the right to access, update, or request the deletion of your account and personal data at any time.
            </p>
          </section>

          <section className="p-6 sm:p-8 rounded-2xl bg-slate-900 text-white space-y-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h2 className="text-lg font-bold flex items-center gap-2 text-white">
                <Mail className="w-5 h-5 text-red-500" /> Questions About Privacy?
              </h2>
              <p className="text-slate-300 text-sm mt-1">
                If you have any questions or data removal requests, feel free to contact us directly.
              </p>
              <p className="text-xs font-mono text-red-400 mt-2">{contactEmail}</p>
            </div>

            <a 
              href={`/contact-us`} 
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

export default PrivacyPolicy;