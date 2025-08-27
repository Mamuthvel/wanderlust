
import { Link } from "react-router-dom";
import { Mail, Phone, Instagram, Facebook, Twitter, Linkedin } from "lucide-react";

const FooterLink = ({ href, children }) => (
  <Link to={href} className="text-nature-sky hover:text-nature-temple transition-colors duration-300 hover:scale-105 inline-block">
    {children}
  </Link>
);

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-nature-earth to-nature-stone text-white py-16 mt-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-xl mb-4 bg-gradient-to-r from-nature-temple to-nature-sunset bg-clip-text text-transparent">
              WanderStay<br />
              <span className="text-sm font-bold flex text-nature-sky">Tiruvannamalai</span>
            </h3> 
            <p className="text-nature-sky mb-4 leading-relaxed">
              Experience the spiritual essence of Tiruvannamalai with premium accommodations near the sacred Arunachala Mountain.
            </p>
            <div className="flex space-x-4">
              <FooterLink href="/">
                <Facebook size={20} />
              </FooterLink>
              <FooterLink href="/">
                <Twitter size={20} />
              </FooterLink>
              <FooterLink href="/">
                <Instagram size={20} />
              </FooterLink>
              <FooterLink href="/">
                <Linkedin size={20} />
              </FooterLink>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-base mb-4">Company</h4>
            <ul className="space-y-2">
              <li><FooterLink href="/">About us</FooterLink></li>
              <li><FooterLink href="/">Careers</FooterLink></li>
              <li><FooterLink href="/">Press</FooterLink></li>
              <li><FooterLink href="/">Investor relations</FooterLink></li>
              <li><FooterLink href="/">Partner help</FooterLink></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-base mb-4">Support</h4>
            <ul className="space-y-2">
              <li><FooterLink href="/">Help center</FooterLink></li>
              <li><FooterLink href="/">Safety information</FooterLink></li>
              <li><FooterLink href="/">Cancellation options</FooterLink></li>
              <li><FooterLink href="/">COVID-19 response</FooterLink></li>
              <li><FooterLink href="/">Report a concern</FooterLink></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-base mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail size={16} className="mr-2 text-gray-500" />
                <a
                  href="mailto:maxthvel@gmail.com?subject=Hello%20Max"
                  className="text-gray-500 hover:underline"
                >
                  maxthvel@gmail.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone size={16} className="mr-2 text-gray-500" />
                <a
                  href="tel:+918778860001"
                  className="text-gray-500 hover:underline"
                >
                  +91 8778860001
                </a>
              </li>
              <li>
                <FooterLink href="/">
                  Contact us
                </FooterLink>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} WanderStay Inc. All rights reserved.
          </p>

          <div className="flex space-x-4 mt-4 md:mt-0">
            <FooterLink href="/">Privacy</FooterLink>
            <FooterLink href="/">Terms</FooterLink>
            <FooterLink href="/">Sitemap</FooterLink>
            <FooterLink href="/">Destinations</FooterLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
