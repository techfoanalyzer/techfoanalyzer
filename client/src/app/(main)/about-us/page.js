import AboutPage from '@/pages/About/About'
import React from 'react'

export const metadata = {
  title: "About Us | TechfoAnalyzer",
  description: "Learn more about TechfoAnalyzer, our mission, technical coverage, and the team behind our in-depth analysis.",
  alternates: {
    canonical: "https://www.techfoanalyzer.com/about",
  },
  openGraph: {
    title: "About Us | TechfoAnalyzer",
    description: "Learn more about TechfoAnalyzer, our mission, technical coverage, and the team behind our in-depth analysis.",
    url: "https://www.techfoanalyzer.com/about",
    type: "website",
  },
};

const About = () => {
  return (
    <main>
        <AboutPage/>
    </main>
  )
}

export default About