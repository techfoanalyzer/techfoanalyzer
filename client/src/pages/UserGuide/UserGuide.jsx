import React from 'react';
import { 
  BookOpen, 
  MessageSquare, 
  Bookmark, 
  UserCheck, 
  ShieldCheck, 
  Clock, 
  Mail, 
  KeyRound, 
  Volume2, 
  Languages, 
  Sparkles,
  AlertCircle
} from 'lucide-react';

const UserGuide = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 py-12 px-4 pt-17 sm:px-6 lg:px-8 text-slate-800 dark:text-slate-200">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Header Section */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Platform Guide
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Welcome to TechfoAnalyzer! 👋
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
            We are glad to have you here! This step-by-step guide will walk you through all the features available on our platform and show you how to get the most out of your experience.
          </p>
        </div>

        {/* Member Features Section */}
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/50 rounded-xl text-indigo-600 dark:text-indigo-400">
              <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Exclusive Member Features</h2>
              <p className="text-xs text-slate-500">Unlocking these 3 tools by creating an account</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-2">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-lg w-fit">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-base">Interactive Comments</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Join discussions on any article. Track your exact comment history with timestamps and delete your comments whenever you want.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-2">
              <div className="p-2 bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 rounded-lg w-fit">
                <Bookmark className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-base">My Personal Library</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Save your favorite posts to read later. Access your bookmarked articles instantly from your library or remove them anytime.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-2">
              <div className="p-2 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 rounded-lg w-fit">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-base">Profile Customization</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Manage your profile effortless. Update your profile avatar (DP) and change your account password seamlessly.
              </p>
            </div>
          </div>
        </div>

        {/* Account Signup Process */}
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/50 rounded-xl text-emerald-600 dark:text-emerald-400">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Step-by-Step Sign Up Process</h2>
              <p className="text-xs text-slate-500">Creating your new account is quick and simple</p>
            </div>
          </div>

          <ol className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-bold shrink-0 mt-0.5">1</span>
              <span><strong>Fill Your Details:</strong> Enter your chosen Username, Email address, Password, and Confirm Password on the signup form.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-bold shrink-0 mt-0.5">2</span>
              <span><strong>OTP Verification:</strong> Check your email inbox for a 6-digit verification code sent directly from TechfoAnalyzer.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-bold shrink-0 mt-0.5">3</span>
              <span><strong>10-Minute Expiry Limit:</strong> For security purposes, your OTP remains valid for 10 minutes. Please enter it within this window to complete registration.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-bold shrink-0 mt-0.5">4</span>
              <span><strong>Welcome Email:</strong> Once verified, you will be redirected to the Home page and receive an official welcome email from our team!</span>
            </li>
          </ol>

          {/* Spam Callout Box */}
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 flex items-start gap-3 text-amber-800 dark:text-amber-300 text-xs sm:text-sm">
            <AlertCircle className="w-5 h-5 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
            <div>
              <strong>Important Note regarding OTP Emails:</strong> If you do not see the verification email in your main inbox, please check your <strong>Spam or Junk folder</strong>. The email will strictly come under the sender name <i>TechfoAnalyzer</i>.
            </div>
          </div>
        </div>

        {/* Login & Security */}
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="p-2.5 bg-blue-50 dark:bg-blue-950/50 rounded-xl text-blue-600 dark:text-blue-400">
              <KeyRound className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Authentication & Account Recovery</h2>
              <p className="text-xs text-slate-500">Session rules and password recovery details</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1.5">
              <div className="flex items-center gap-2 font-semibold text-slate-800 dark:text-slate-200">
                <Clock className="w-4 h-4 text-indigo-500" />
                <span>7-Day Active Session</span>
              </div>
              <p className="text-slate-500 dark:text-slate-400">
                Once logged in, your session stays active for 7 days. After 7 days, you will be prompted to log back in for security reasons.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1.5">
              <div className="flex items-center gap-2 font-semibold text-slate-800 dark:text-slate-200">
                <KeyRound className="w-4 h-4 text-emerald-500" />
                <span>Forgot Password Recovery</span>
              </div>
              <p className="text-slate-500 dark:text-slate-400">
                Forgot your password? Click on "Forgot Password", enter your email, verify the OTP code, and set up a new password instantly.
              </p>
            </div>
          </div>

          {/* Google Login Banner */}
          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs sm:text-sm">
            <div className="space-y-0.5">
              <h4 className="font-semibold text-slate-900 dark:text-slate-100">⚡ Continue with Google (Instant & Safe)</h4>
              <p className="text-slate-500 dark:text-slate-400">Skip manual registration and sign in securely with a single click using Google.</p>
            </div>
          </div>
        </div>

        {/* Public Features (No Login Required) */}
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="p-2.5 bg-purple-50 dark:bg-purple-950/50 rounded-xl text-purple-600 dark:text-purple-400">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Public Reader Tools</h2>
              <p className="text-xs text-slate-500">Accessible to everyone without creating an account</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 rounded-lg shrink-0 mt-1">
                <Languages className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-base">In-Blog Tech Dictionary</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Stuck on a complex technical term? Use our built-in dictionary located at the top-right of the blog to view Urdu meanings, synonyms, and real-world usage examples.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-pink-100 dark:bg-pink-900/40 text-pink-600 dark:text-pink-400 rounded-lg shrink-0 mt-1">
                <Volume2 className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-base">AI Voice Blog Reader</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Prefer listening over reading? Hit the play button on our AI Voice Reader to listen to complete articles hands-free while working or commuting.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default UserGuide;