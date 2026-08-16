import UserGuide from '@/pages/UserGuide/UserGuide'

export const metadata = {
  title: "User Guide - How to Use TechfoAnalyzer Features",
  description: "Learn how to use TechfoAnalyzer. Explore member features like bookmarks, comment management, in-blog dictionary, and AI voice reader.",
  openGraph: {
    title: "User Guide - TechfoAnalyzer",
    description: "Discover all the features of TechfoAnalyzer, including member library, comment history, AI voice reader, and built-in dictionary.",
    url: "https://www.techfoanalyzer.com/user-guide",
    siteName: "TechfoAnalyzer",
    type: "website",
  },
  alternates: {
    canonical: "https://www.techfoanalyzer.com/user-guide",
  },
};

const userGuide = () => {
  return (
    <div>
        <UserGuide/>
    </div>
  )
}

export default userGuide