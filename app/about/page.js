"use client"
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const AboutUs = () => {
  const sharoonRef = useRef(null);
  const haiderRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(
      [sharoonRef.current, haiderRef.current],
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 0.3, stagger: 0.2 }
    );
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center py-10">
      <div className="max-w-4xl mx-auto space-y-10">
        <h1 className="text-4xl font-bold text-center ">About Us</h1>

        <div className="flex flex-col md:flex-row items-center justify-center gap-10">
          {/* Sharoon's Card */}
          <div
            ref={sharoonRef}
            className="bg-gray-600 rounded-lg shadow-lg p-6 w-full md:w-1/2 flex flex-col items-center transform hover:scale-105 transition-transform duration-300"
          >
            <img
              src="/sharoon.png" // Add the correct path to Sharoon's profile picture
              alt="Sharoon's Profile Picture"
              className="w-32 h-32 object-cover rounded-full mb-4"
            />
            <h2 className="text-2xl font-bold text-gray-800">Sharoon</h2>
            <p className="text-white text-center mt-4">
              Hi, I'm Sharoon, currently pursuing my degree in Computer Science. I have a strong passion for web development and design. From creating interactive animations to building scalable applications, I enjoy every aspect of crafting digital experiences that are both beautiful and functional.
              <br /><br />
              Outside of coding, I love exploring new music genres and playing basketball with friends. I believe in continuous learning and always look forward to challenges that push me to grow as a developer.
            </p>
          </div>

          {/* Haider's Card */}
          <div
            ref={haiderRef}
            className="bg-gray-600 rounded-lg shadow-lg p-6 w-full md:w-1/2 flex flex-col items-center transform hover:scale-105 transition-transform duration-300"
          >
            <img
              src="/haider.jpg" // Add the correct path to Haider's profile picture
              alt="Haider's Profile Picture"
              className="w-32 h-32 object-cover rounded-full mb-4"
            />
            <h2 className="text-2xl font-bold text-gray-800">Haider</h2>
            <p className="text-white text-center mt-4">
              Hey, I'm Haider, a passionate web developer and student of Computer Engineering. I am fascinated by the intersection of design and technology, striving to create websites that not only look great but also provide intuitive user experiences.
              <br /><br />
              When I'm not coding, you can find me exploring nature photography or diving into classic literature. I enjoy brainstorming creative solutions with my team and am excited about the future possibilities in the web development field.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
