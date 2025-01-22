import Image from "next/image";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaHeart,
} from "react-icons/fa";

const socialLinks = [
  { icon: FaFacebook, href: "#", hoverColor: "hover:text-blue-500" },
  { icon: FaInstagram, href: "#", hoverColor: "hover:text-pink-500" },
  { icon: FaTwitter, href: "#", hoverColor: "hover:text-sky-500" },
  { icon: FaLinkedin, href: "#", hoverColor: "hover:text-blue-700" },
];

const Footer = () => {
  return (
    <footer className="pt-8">
      <div className="container mx-auto">
        {/* Copyright Section */}
        <div className="border-t border-zinc-800 py-6 px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm text-gray-400">
            <p className="flex items-center gap-2">
              © {new Date().getFullYear()}. All rights reserved.
            </p>

            <p className="flex items-center gap-2">
              Made with <FaHeart className="text-red-500 animate-pulse" /> by
              Haider & Sharoon using
              <Image
                src="/next.svg"
                alt="Next.js"
                width={56}
                height={56}
                className="invert mx-2"
              />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
