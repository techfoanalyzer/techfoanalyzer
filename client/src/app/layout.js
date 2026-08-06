import { GlobalToastContainer } from "@/helper/showToast";
import "./globals.css";
import { Nunito } from "next/font/google";

const nunito = Nunito({
  subsets: ["latin"],
});


export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://techfoanalyzer.com"),
  title: {
    default: "TechfoAnalyzer | Latest Tech News & Analysis",
    template: "%s | TechfoAnalyzer", 
  },
  description: "Explore in-depth tech insights, cyber security updates, passkeys, software analysis, and modern web development trends on TechfoAnalyzer.",
  keywords: ["Tech News", "Cyber Security", "Software Analysis", "Web Development", "TechfoAnalyzer"],
  authors: [{ name: "TechfoAnalyzer Team" }],
  robots: {
    index: true,
    follow: true,
  },

  verification: {
    google: "1FsZfeC4IAGJ1psSY3nvsD__rk-aHFmEYvoGnSPUZo8",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={nunito.className}>
      <body>
        {children}
        <GlobalToastContainer />
      </body>
    </html>
  );
}