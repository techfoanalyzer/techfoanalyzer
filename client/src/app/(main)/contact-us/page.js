import ContactUs from "@/pages/Contact/Contact";


export const metadata = {
  title: "Contact Us | TechfoAnalyzer",
  description:
    "Get in touch with the TechfoAnalyzer team for inquiries, feedback, or collaboration opportunities.",
  alternates: {
    canonical: "https://www.techfoanalyzer.com/contact",
  },
  openGraph: {
    title: "Contact Us | TechfoAnalyzer",
    description:
      "Get in touch with the TechfoAnalyzer team for inquiries, feedback, or collaboration opportunities.",
    url: "https://www.techfoanalyzer.com/contact",
    type: "website",
  },
};

const contactPage = () => {
  return (
    <div>
        <ContactUs/>
    </div>
  )
}

export default contactPage