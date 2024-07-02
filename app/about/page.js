"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { FaDribbble, FaLinkedin, FaGithub } from "react-icons/fa";

const AboutUs = () => {
  const sharoonRef = useRef(null);
  const haiderRef = useRef(null);
  const aboutRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      [aboutRef.current, sharoonRef.current, haiderRef.current],
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.3, stagger: 0.2 }
    );
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-10 ">
      <div ref={aboutRef} className="max-w-4xl mx-auto space-y-8 ">
        <h1 className="text-4xl font-bold text-center">About Us</h1>
        <p className="text-lg text-gray-300">
          I created this website because of my love for anime and my desire to
          build something that I enjoy. This project serves as a fantastic
          practice for honing my skills in Next.js, providing a hands-on
          experience that combines my passion with learning. The inspiration for
          the design and layout was taken from the creative and visually
          appealing works on Dribble, which motivated me to bring this vision to
          life. Special thanks to the Jikan API for providing the rich and
          comprehensive anime data that powers this site, making it possible to
          offer detailed information on various anime series, characters, and
          more. By integrating these elements, I aimed to create a platform that
          not only reflects my interests but also helps others discover and
          appreciate anime.
        </p>
        <div className="flex  items-center justify-evenly gap-4">
          <p className="text-2xl">
            <a
              href="https://dribbble.com/shots/22982773-Kurosaw-Anime-Streaming-Web-App"
              target="_blank"
              className=" 
              hover:underline"
            >
              Design Inspiration
              <FaDribbble className="inline-block text-2xl text-gray-300 mx-3" />
            </a>
          </p>
          <p className="text-2xl">
            <a
              href="https://docs.api.jikan.moe"
              target="_blank"
              className=" 
              hover:underline"
            >
              Jikan API
              <span className="inline-block rounded-md p-1 m-1 text-center size-10 bg-indigo-800">
                J
              </span>
            </a>
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-10 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Sharoon's Card */}
          <div
            ref={sharoonRef}
            className="bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center transform hover:scale-105 transition-transform duration-300"
          >
            <img
              src="/sharoon.png"
              alt="Sharoon's Profile Picture"
              className="w-32 h-32 object-cover rounded-full mb-4"
            />
            <h2 className="text-2xl font-bold text-white  ">Sharoon</h2>
            <p className="text-gray-300 text-center mt-4">
              Hi, I'm Sharoon, currently pursuing my degree in Computer Science.
              I have a strong passion for web development and design. From
              creating interactive animations to building scalable applications,
              I enjoy every aspect of crafting digital experiences
            </p>
            <div className="text-3xl flex items-center gap-12 mt-6">
              <a
                href="https://www.linkedin.com/in/sharoon-shaleem-0a7a85226/"
                target="_blank"
                className="hover:text-indigo-700 transition-colors duration-150"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://github.com/Sharoon-Shaleem"
                target="_blank"
                className="hover:invert transition-all duration-150"
              >
                <FaGithub />
              </a>
            </div>
          </div>

          {/* Haider's Card */}
          <div
            ref={haiderRef}
            className="bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center transform hover:scale-105 transition-transform duration-300"
          >
            <img
              src="/haider.jpg"
              alt="Haider's Profile Picture"
              className="w-32 h-32 object-cover rounded-full mb-4"
            />
            <h2 className="text-2xl font-bold text-gray-300">Haider</h2>
            <p className="text-gray-730 text-center mt-4">
              Hey, I'm Haider, a passionate web developer and student of
              Computer Science. I am fascinated by the intersection of design
              and technology, striving to create websites that not only look
              great but also provide intuitive user experiences.
            </p>
            <div className="text-3xl flex items-center gap-12 mt-6">
              <a
                href="https://www.linkedin.com/in/haider-ahmad-439317164/"
                target="_blank"
                className="hover:text-indigo-700 transition-colors duration-150"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://github.com/haider-9"
                target="_blank"
                className="hover:invert transition-all duration-150"
              >
                <FaGithub />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
