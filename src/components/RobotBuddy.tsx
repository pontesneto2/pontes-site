"use client";

import { motion } from "framer-motion";

export default function RobotBuddy({
  size = 240,
  showBackdrop = true,
  showParticles = true,
  className = "",
}: {
  size?: number;
  showBackdrop?: boolean;
  showParticles?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {showBackdrop ? (
        <motion.div
          aria-hidden
          animate={{
            scale: [1, 1.18, 1],
            opacity: [0.25, 0.45, 0.25],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute w-80 h-80 bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 rounded-full blur-3xl"
        />
      ) : null}

      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10"
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Robô"
        >
          {/* Antena */}
          <motion.line
            x1="100"
            y1="30"
            x2="100"
            y2="50"
            stroke="url(#gradient1b)"
            strokeWidth="3"
            strokeLinecap="round"
            animate={{ strokeWidth: [3, 4, 3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.circle
            cx="100"
            cy="25"
            r="5"
            fill="url(#gradient1b)"
            animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Cabeça */}
          <rect
            x="70"
            y="50"
            width="60"
            height="50"
            rx="8"
            fill="url(#gradient2b)"
            stroke="white"
            strokeWidth="2"
            opacity="0.9"
          />

          {/* Olhos */}
          <motion.circle
            cx="85"
            cy="70"
            r="6"
            fill="#a855f7"
            animate={{ scale: [1, 0.8, 1] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0 }}
          />
          <motion.circle
            cx="115"
            cy="70"
            r="6"
            fill="#a855f7"
            animate={{ scale: [1, 0.8, 1] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0 }}
          />

          {/* Boca sorridente */}
          <motion.path
            d="M 85 85 Q 100 92 115 85"
            stroke="#d946ef"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            animate={{
              d: [
                "M 85 85 Q 100 92 115 85",
                "M 85 85 Q 100 95 115 85",
                "M 85 85 Q 100 92 115 85",
              ],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />

          {/* Corpo */}
          <rect
            x="60"
            y="105"
            width="80"
            height="70"
            rx="10"
            fill="url(#gradient3b)"
            stroke="white"
            strokeWidth="2"
            opacity="0.9"
          />

          {/* Detalhes do corpo */}
          <motion.circle
            cx="100"
            cy="130"
            r="8"
            fill="none"
            stroke="#d946ef"
            strokeWidth="2"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
          <line
            x1="75"
            y1="150"
            x2="125"
            y2="150"
            stroke="white"
            strokeWidth="2"
            opacity="0.3"
          />
          <line
            x1="75"
            y1="160"
            x2="125"
            y2="160"
            stroke="white"
            strokeWidth="2"
            opacity="0.3"
          />

          {/* Braços */}
          <motion.rect
            x="40"
            y="110"
            width="15"
            height="40"
            rx="7"
            fill="url(#gradient4b)"
            stroke="white"
            strokeWidth="1.5"
            animate={{ rotate: [-10, 10, -10] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{ transformOrigin: "47.5px 115px" }}
          />
          <motion.rect
            x="145"
            y="110"
            width="15"
            height="40"
            rx="7"
            fill="url(#gradient4b)"
            stroke="white"
            strokeWidth="1.5"
            animate={{ rotate: [10, -10, 10] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{ transformOrigin: "152.5px 115px" }}
          />

          {/* Pernas */}
          <rect
            x="75"
            y="180"
            width="18"
            height="35"
            rx="5"
            fill="url(#gradient5b)"
            stroke="white"
            strokeWidth="1.5"
          />
          <rect
            x="107"
            y="180"
            width="18"
            height="35"
            rx="5"
            fill="url(#gradient5b)"
            stroke="white"
            strokeWidth="1.5"
          />

          {/* Gradientes */}
          <defs>
            <linearGradient id="gradient1b" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#d946ef" />
            </linearGradient>
            <linearGradient id="gradient2b" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1a1a2e" />
              <stop offset="100%" stopColor="#16213e" />
            </linearGradient>
            <linearGradient id="gradient3b" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0f0f23" />
              <stop offset="100%" stopColor="#1a1a2e" />
            </linearGradient>
            <linearGradient id="gradient4b" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1a1a2e" />
              <stop offset="100%" stopColor="#0f0f23" />
            </linearGradient>
            <linearGradient id="gradient5b" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#16213e" />
              <stop offset="100%" stopColor="#0f0f23" />
            </linearGradient>
          </defs>
        </svg>

        {showParticles ? (
          <>
            <motion.div
              className="absolute top-10 left-10 w-2 h-2 bg-violet-400 rounded-full"
              animate={{ y: [-20, -60], opacity: [1, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            />
            <motion.div
              className="absolute top-20 right-10 w-2 h-2 bg-fuchsia-400 rounded-full"
              animate={{ y: [-20, -60], opacity: [1, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1,
                delay: 0.5,
              }}
            />
          </>
        ) : null}
      </motion.div>
    </div>
  );
}
