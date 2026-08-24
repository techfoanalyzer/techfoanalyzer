import { GlobalToastContainer } from "@/helper/showToast";
import "./globals.css";
import { Nunito } from "next/font/google";

const nunito = Nunito({
  subsets: ["latin"],
});


export const metadata = {
  metadataBase: new URL("https://www.techfoanalyzer.com"),
  title: {
    default: "TechfoAnalyzer | Latest Tech News & Analysis",
    // template: "%s | TechfoAnalyzer", 
  },
  description: "Explore in-depth tech insights, cyber security updates, passkeys, software analysis, and modern web development trends on TechfoAnalyzer.",
  keywords: ["Tech News", "Cyber Security", "Software Analysis", "Web Development", "TechfoAnalyzer"],
  authors: [{ name: "TechfoAnalyzer Team" }],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-icon.png", sizes: "192x192", type: "image/png" }],
  },
  openGraph: {
    title: "TechfoAnalyzer | Latest Tech News & Analysis",
    description: "Explore in-depth tech insights, cyber security updates, passkeys, software analysis, and modern web development trends on TechfoAnalyzer.",
    url: "/",
    siteName: "TechfoAnalyzer",
    images: [
      {
        url: "/og-home-banner.jpg",
        width: 4096,
        height: 2163,
        alt: "TechfoAnalyzer tech insights and cybersecurity analysis",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TechfoAnalyzer | Latest Tech News & Analysis",
    description: "Explore in-depth tech insights, cyber security updates, passkeys, software analysis, and modern web development trends on TechfoAnalyzer.",
    images: ["/og-home-banner.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: "1FsZfeC4IAGJ1psSY3nvsD__rk-aHFmEYvoGnSPUZo8",
    yandex: "3b14d0c187a3a554",
    bing: "CF3488EE22D586836FC42AC9A387885F",
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