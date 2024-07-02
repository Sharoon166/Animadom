import React from "react";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
const Footer = () => {
  return (
    <div>
      <div className="flex justify-evenly items-center bg-[#121212] border-t text-white flex-col md:flex-row gap-3">
        <div className="size-24 overflow-hidden invert">
          <Link href="/" className="text-2xl">
            <img src="/logo.png" alt="" />
          </Link>
        </div>
        <ul className="opacity-70 flex items-center justify-center gap-4">
          <li>Terms & Privacy</li>
          <li>Contact</li>
        </ul>
        <ul className="flex items-center justify-center gap-4 text-2xl">
          <li className="hover:text-blue-800 transition-colors duration-100">
            {" "}
            <Link href="#">
              <FaFacebook />
            </Link>
          </li>
          <li className="hover:text-red-800 transition-colors duration-100">
            {" "}
            <Link href="#">
              <FaInstagram />
            </Link>
          </li>
          <li className="hover:text-blue-800 transition-colors duration-100">
            {" "}
            <Link href="#">
              <FaTwitter />
            </Link>
          </li>
          <li className="hover:text-blue-800 transition-colors duration-100">
            {" "}
            <Link href="#">
              <FaLinkedin />
            </Link>
          </li>
        </ul>
      </div>
     

      <div className="text-white text-sm text-center">
        
        <p className=" ">
          © 2024. All rights reserved. Website designed and developed in{" "}
          <img
            src="/next.svg"
            alt=""
            className="size-14 mx-2 invert inline-block"
          />
          by Haider & Sharoon.
        </p>
      </div>
    </div>
  );
};

export default Footer;
