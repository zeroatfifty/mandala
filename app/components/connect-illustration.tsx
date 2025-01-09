import React from 'react'
import { motion } from "framer-motion"

interface ConnectIllustrationProps {
  className?: string
}

export function ConnectIllustration({ className }: ConnectIllustrationProps) {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div className="relative w-64 h-64">
        {/* Animated circles */}
        <motion.div
          className="absolute top-0 left-0 w-20 h-20 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/4 right-0 w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-green-500/20"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 4,
            delay: 1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 left-1/4 w-24 h-24 rounded-full bg-gradient-to-br from-yellow-500/20 to-orange-500/20"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 4,
            delay: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Connecting lines */}
        <svg className="absolute inset-0" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <motion.line
            x1="20"
            y1="20"
            x2="200"
            y2="180"
            stroke="url(#line-gradient)"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.3 }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.line
            x1="200"
            y1="60"
            x2="60"
            y2="200"
            stroke="url(#line-gradient)"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.3 }}
            transition={{ duration: 2, delay: 1, repeat: Infinity }}
          />
          <defs>
            <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(236, 72, 153, 0.3)" />
              <stop offset="100%" stopColor="rgba(59, 130, 246, 0.3)" />
            </linearGradient>
          </defs>
        </svg>

        {/* Central element */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="w-20 h-20 bg-gradient-to-br from-pink-500/20 to-blue-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
            <span className="text-3xl">💞</span>
          </div>
        </motion.div>

        {/* Abstract comment bubbles */}
        <motion.div
          className="absolute top-1/3 left-1/6 w-8 h-8 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-lg transform rotate-12 backdrop-blur-sm border border-white/10"
          animate={{
            rotate: [12, 24, 12],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/6 w-10 h-10 bg-gradient-to-br from-blue-500/20 to-green-500/20 rounded-lg transform -rotate-12 backdrop-blur-sm border border-white/10"
          animate={{
            rotate: [-12, -24, -12],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4,
            delay: 1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  )
}

