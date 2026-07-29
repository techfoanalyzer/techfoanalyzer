import Link from 'next/link';
import { MdEmail } from 'react-icons/md';
import { FaInstagram, FaFacebookF, FaWhatsapp, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="relative z-[999] bg-white border-t border-gray-300 py-10 text-black font-['Montserrat',sans-serif]">
      {/* Container wrapper */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Grid System */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          
          {/* Logo/Brand Section */}
          <div className="flex flex-col space-y-3">
            <Link href="/">
              <div className="flex justify-center md:justify-start">
                <h5 className="text-black font-bold tracking-[2px] text-lg">
                  TECHFO
                </h5>
                <h5 className="text-red-500 font-bold tracking-[2px] text-lg">
                  ANALYZER
                </h5>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-gray-700 px-5 md:px-0">
              Decoding technology for the digital age. Insights, analysis, and innovation in one place.
            </p>
            {/* <span className="text-xs text-gray-500">
              mohammadabdullah5341@gmail.com
            </span> */}
          </div>

          {/* Quick Links */}
          <div className="flex flex-col space-y-2  ">
            <h6 className="text-black space-y-2  font-semibold">Quick Links</h6>
            <ul className=" p-0 list-none space-y-2 text-black ">
               <li>
                <Link href="/about-us" className="hover:text-red-500 transition-colors text-sm no-underline">
                  About Us
                </Link>
              </li>
              
              <li>
                <Link href="/privacy-policy" className="hover:text-red-500 transition-colors text-sm no-underline">
                  Privacy Policy
                </Link>
              </li>

             <li>
               <Link href="/terms-and-conditions" className="hover:text-red-500 transition-colors text-sm no-underline">
                  Terms and Conditions
                </Link>
             </li>

             
              <li>
                <Link href="/disclaimer" className="hover:text-red-500 transition-colors text-sm no-underline">
                  Disclaimer
                </Link>
              </li>
               <li>
                <Link href="/contact-us" className="hover:text-red-500 transition-colors text-sm no-underline">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect & Social Icons */}
          <div className="flex flex-col space-y-3">
            <h6 className="text-black font-semibold">Stay Connected</h6>
            <p className="text-sm text-gray-700 m-0">
              Got questions or an idea to discuss? 
            </p>
              <p className='text-sm mt-1'>
                 We'd love to hear from you:
              </p>

            {/* Social Icons List */}
            <div className="flex items-center justify-center md:justify-start gap-3 pt-2">
  {/* Email / Contact Us - Next.js Link for internal route */}
  <Link
    href="/contact-us"
    title="Email Us"
    className="p-2.5 rounded-full hover:bg-gray-100 bg-red-500 text-white hover:text-gray-700 transition-all duration-300"
  >
    <MdEmail size={17} />
  </Link>

  {/* WhatsApp - External Link */}
  {/* <a
    href="https://wa.me/923267838125"
    target="_blank"
    rel="noopener noreferrer"
    title="WhatsApp"
    className="p-2.5 rounded-full hover:bg-gray-100 hover:text-gray-700 bg-green-500 text-white transition-all duration-300"
  >
    <FaWhatsapp size={17} />
  </a> */}

  {/* Instagram - External Link */}
  <a
    href="https://www.instagram.com/its.me.abdullahh?igsh=YWZ0eDRzZnFjbW42"
    target="_blank"
    rel="noopener noreferrer"
    title="Instagram"
    className="p-2.5 rounded-full hover:bg-gray-100 hover:text-gray-700 bg-pink-600 text-white transition-all duration-300"
  >
    <FaInstagram size={17} />
  </a>

  {/* YouTube - External Link */}
  <a
    href="https://www.youtube.com/@TechfoAnalyzer"
    target="_blank"
    rel="noopener noreferrer"
    title="YouTube"
    className="p-2.5 rounded-full hover:bg-gray-100 hover:text-gray-700 bg-red-600 text-white transition-all duration-300"
  >
    <FaYoutube size={17} />
  </a>

  {/* Facebook - External Link */}
  <a
    href="https://www.instagram.com/its.me.abdullahh?igsh=YWZ0eDRzZnFjbW42"
    target="_blank"
    rel="noopener noreferrer"
    title="Facebook"
    className="p-2.5 rounded-full hover:bg-gray-100 hover:text-gray-700 bg-blue-600 text-white transition-all duration-300"
  >
    <FaFacebookF size={17} />
  </a>
</div>

          </div>

        </div>

        {/* Divider Line */}
        {/* <hr className="border-gray-200 my-7" /> */}

        {/* Branding Footer Bottom */}
        <div className="text-center text-xs text-gray-600 mt-15 mb-5" >
          &copy; Copyright {new Date().getFullYear()} | TechfoAnalyzer. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;