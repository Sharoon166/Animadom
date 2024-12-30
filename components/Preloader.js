"use client";
import { motion } from "framer-motion";

// Component for floating orbs
const FloatingOrbs = ({ count = 40 }) => (
  <div className="absolute inset-0">
    {[...Array(count)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-yellow-300/60 rounded-full"
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [-10, 10],
          x: [-10, 10],
          opacity: [0, 1, 0],
          scale: [0.8, 1.2, 0.8],
        }}
        transition={{
          duration: 2 + Math.random() * 3,
          repeat: Infinity,
          delay: Math.random() * 2,
        }}
      />
    ))}
  </div>
);

// Component for the magic circle
const MagicCircle = () => (
  <div className="relative">
    {/* Glowing background */}
    <motion.div
      className="w-52 h-52 rounded-full bg-gradient-radial from-yellow-200 via-yellow-400/50 to-transparent blur-xl"
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.4, 0.8, 0.4],
      }}
      transition={{ duration: 3, repeat: Infinity }}
    />

    {/* SVG Magic Circle */}
    <motion.svg
      width="260"
      height="260"
      viewBox="0 0 100 100"
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      {[45, 38, 31].map((radius, i) => (
        <motion.circle
          key={i}
          cx="50"
          cy="50"
          r={radius}
          className="fill-none stroke-yellow-400/90"
          strokeWidth={0.8 - i * 0.2}
          strokeDasharray={i === 1 ? "2 3" : "4 6"}
          animate={{
            rotate: 360,
            scale: [1, 1.05, 1],
          }}
          transition={{
            rotate: { duration: 15 - i * 3, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity },
          }}
        />
      ))}

      <motion.circle
        cx="50"
        cy="50"
        r="20"
        className="fill-none stroke-yellow-300"
        strokeWidth="0.5"
        animate={{
          scale: [1, 2, 1],
          opacity: [1, 0, 1],
          strokeWidth: [0.5, 0.1, 0.5],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <motion.path
          key={i}
          d={`M ${50 + Math.cos((angle * Math.PI) / 180) * 25} ${
            50 + Math.sin((angle * Math.PI) / 180) * 25
          } L ${50 + Math.cos((angle * Math.PI) / 180) * 20} ${
            50 + Math.sin((angle * Math.PI) / 180) * 20
          }`}
          className="stroke-yellow-200"
          strokeWidth="1"
          strokeLinecap="round"
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [0.9, 1.1, 0.9],
          }}
          transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
        />
      ))}
    </motion.svg>
  </div>
);

const LoadingText = () => (
  <div className="space-y-8 text-center">
    <motion.h2
      className="text-6xl font-bold"
      style={{
        fontFamily: "'Cinzel Decorative', cursive",
        background: "linear-gradient(to right, #FFD700, #FFA500, #FFD700)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundSize: "200% auto",
      }}
      animate={{
        backgroundPosition: ["0% center", "200% center"],
      }}
      transition={{ duration: 3, repeat: Infinity }}
    >
      AnimaDom
    </motion.h2>

    <div className="flex flex-col items-center gap-5">
      <div className="flex items-center gap-4 text-yellow-400">
        <span className="text-2xl font-mono tracking-[0.5em]">LOADING</span>
        <div className="flex gap-2">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2.5 h-2.5 bg-yellow-400 rounded-full"
              animate={{
                scale: [0.5, 1.5, 0.5],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1,
                delay: i * 0.2,
                repeat: Infinity,
              }}
            />
          ))}
        </div>
      </div>

      <div className="w-72 h-1.5 bg-yellow-900/30 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-300"
          animate={{
            width: ["0%", "100%"],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  </div>
);

const Preloader = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#0F0F0F] overflow-hidden">
    <motion.div
      className="relative w-full max-w-2xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <FloatingOrbs />
      <motion.div className="relative z-10 flex flex-col items-center gap-16">
        <MagicCircle />
        <LoadingText />
      </motion.div>
    </motion.div>
  </div>
);

export default Preloader;
