import { HomeData } from '@/apiServices/Home/Home'
import HomePage from '@/pages/Home/Home'

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Tech, Cyber Security, AI, Web Dev & Software Analysis",
  description:
    "Your ultimate tech hub for Cyber Security, Artificial Intelligence, Web Development, Cloud Computing, Software Reviews, DevOps, and Emerging Tech Trends.",


  alternates: {
    canonical: "https://www.techfoanalyzer.com",
  },

  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
  },

  keywords: [
    "TechfoAnalyzer", "Tech News", "Software Analysis", "Tech Blogs", "IT Industry Insights",
    "Cyber Security", "Ethical Hacking", "Passkeys", "MFA Security", "Network Security", "Data Privacy",
    "Artificial Intelligence", "AI Trends", "Machine Learning", "Generative AI", "LLMs",
    "Web Development", "Next.js", "React", "MERN Stack", "Full Stack Development", "JavaScript",
    "Cloud Computing", "DevOps", "Cybersecurity Threats", "Software Engineering", "Tech Tutorials"
  ],

  authors: [{ name: "TechfoAnalyzer Team" }],
  category: "Technology",

  openGraph: {
    title: "TechfoAnalyzer | Latest Tech News, AI & Cyber Security Insights",
    description:
      "Stay ahead with in-depth technical analysis, cyber security updates, AI breakthroughs, and modern web development tutorials.",
    url: "https://www.techfoanalyzer.com", 
    siteName: "TechfoAnalyzer",
    images: [
      {
        url: "https://www.techfoanalyzer.com/og-home-banner.jpg", 
        width: 1200,
        height: 630,
        alt: "TechfoAnalyzer Tech Hub Banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "TechfoAnalyzer | Tech, Security & Development Insights",
    description:
      "In-depth articles on Cyber Security, AI, Web Development, and Modern Tech Trends.",
    images: ["https://www.techfoanalyzer.com/og-home-banner.jpg"],
  },
};

const page = async () => {
  const AllBlogs = (await HomeData()) || [];
  
  
  return (
    <div>
      <HomePage blogData={AllBlogs}/>
    </div>
  )
}

export default page