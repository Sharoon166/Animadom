"use client";
import { motion } from "framer-motion";

export const BlurImage = ({ src, alt, className, overlay }) => {
  return (
    <div className="relative w-full h-full">
      <motion.img
        src={src}
        alt={alt}
        className={`${className} filter blur-[2px]`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
      {overlay === "gradient" && (
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/80" />
      )}
    </div>
  );
};
