"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-[375px] h-[812px] bg-[#14132A] rounded-[60px] relative overflow-hidden shadow-xl border-8 border-gray-900">
        {/* Status Bar */}
        <div className="h-6 w-40 bg-black absolute top-0 left-1/2 -translate-x-1/2 rounded-b-3xl z-50" />

        {/* Content */}
        <div className="h-full pt-8 pb-8 flex flex-col relative">
          {/* Time */}
          <div className="text-center font-semibold mb-4 text-white/90 relative z-10">9:41</div>

          {/* Mandala Background */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px]"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 60,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <div className="w-full h-full rounded-full bg-gradient-to-r from-pink-500/20 via-yellow-500/20 to-blue-500/20 blur-3xl" />
            </motion.div>
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px]"
              animate={{
                rotate: -360,
              }}
              transition={{
                duration: 45,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <div className="w-full h-full rounded-full bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 blur-2xl" />
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col items-center justify-center px-8 relative z-10">
            <div className="text-center space-y-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.8,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
              >
                <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-400 via-yellow-400 to-blue-400 bg-clip-text text-transparent">
                  Mandala
                </h1>
              </motion.div>
              <motion.p 
                className="text-xl text-white/90 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Circles for sharing our most authentic experiences
              </motion.p>
              <motion.p 
                className="text-base text-white/70 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Join supportive communities where your story creates ripples of change
              </motion.p>
            </div>
          </div>

          {/* Buttons */}
          <div className="px-8 space-y-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Button 
                asChild
                className="w-full h-12 text-lg bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 text-white rounded-full shadow-lg border border-white/10"
              >
                <Link href="/sign-in">
                  Sign In
                </Link>
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Button 
                asChild
                className="w-full h-12 text-lg bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-sm border border-white/20 shadow-lg"
              >
                <Link href="/sign-up">
                  Create Account
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Home Indicator */}
          <div className="h-1 w-32 bg-white/20 rounded-full mx-auto mt-6 relative z-10" />
        </div>
      </div>
    </div>
  )
}

