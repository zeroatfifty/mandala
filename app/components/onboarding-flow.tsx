"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { HomeScreen } from "./home-screen"
import { VideoGallery } from "./video-gallery"
import { RecordingUI } from "./recording-ui"
import { ConnectIllustration } from "./connect-illustration"
import { motion, AnimatePresence } from "framer-motion"

export default function OnboardingFlow() {
  const [currentSlide, setCurrentSlide] = React.useState(0)
  const [onboardingComplete, setOnboardingComplete] = React.useState(false)
  const [userName, setUserName] = React.useState("Sachin")

  const slides = [
    {
      title: "ShareCircle",
      subtitle: "Solving any problem starts with authentic sharing",
      gradient: "from-pink-500/20 to-purple-500/20",
    },
    {
      title: "Find your Circle",
      subtitle: "A Circle is a group of people interested in a subject matter that you empathize with",
      gradient: "from-blue-500/20 to-green-500/20",
      showVideoGallery: true,
    },
    {
      title: "Record your share",
      subtitle: "Share your story publicly or anonymously to unlock the circle",
      gradient: "from-yellow-500/20 to-orange-500/20",
      showRecordingUI: true,
    },
    {
      title: "Your circle all share",
      subtitle: "Everyone in the circle shares before it closes",
      gradient: "from-purple-500/20 to-pink-500/20",
      showVideoGallery: true,
    },
    {
      title: "Connect & Support",
      subtitle: "View, comment, and connect over similar experiences",
      gradient: "from-green-500/20 to-blue-500/20",
      showIllustration: true,
    },
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? prev : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? prev : prev - 1))
  }

  const completeOnboarding = () => {
    setOnboardingComplete(true)
  }

  if (onboardingComplete) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="w-full max-w-[375px] h-[812px] bg-[#14132A] rounded-[60px] relative overflow-hidden shadow-xl border-8 border-gray-900">
          <div className="h-6 w-40 bg-black absolute top-0 left-1/2 -translate-x-1/2 rounded-b-3xl" />
          <HomeScreen userName={userName} />
          <div className="h-1 w-32 bg-black rounded-full mx-auto absolute bottom-2 left-1/2 transform -translate-x-1/2" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-[375px] h-[812px] bg-[#14132A] rounded-[60px] relative overflow-hidden shadow-xl border-8 border-gray-900">
        {/* Status Bar */}
        <div className="h-6 w-40 bg-black absolute top-0 left-1/2 -translate-x-1/2 rounded-b-3xl z-50" />

        {/* Mandala Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 60,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div className="w-full h-full rounded-full bg-gradient-to-r from-pink-500/10 via-yellow-500/10 to-blue-500/10 blur-3xl" />
          </motion.div>
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px]"
            animate={{
              rotate: -360,
            }}
            transition={{
              duration: 45,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div className="w-full h-full rounded-full bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 blur-2xl" />
          </motion.div>
        </div>

        {/* Content */}
        <div className="h-full pt-8 pb-8 flex flex-col relative z-10">
          {/* Time */}
          <div className="text-center font-semibold mb-4 text-white/90">9:41</div>

          {/* Slides */}
          <div className="flex-1 relative px-6">
            <AnimatePresence mode="wait">
              {slides.map((slide, index) => (
                currentSlide === index && (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="h-full flex flex-col"
                  >
                    <div className={cn(
                      "w-full h-full rounded-3xl p-8 backdrop-blur-sm border border-white/10",
                      "bg-gradient-to-br",
                      slide.gradient
                    )}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                        className="text-center space-y-4"
                      >
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-400 via-yellow-400 to-blue-400 bg-clip-text text-transparent">
                          {slide.title}
                        </h1>
                        <p className="text-white/80 leading-relaxed">
                          {slide.subtitle}
                        </p>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, duration: 0.4 }}
                        className="flex-1 flex items-center justify-center mt-8"
                      >
                        {slide.showVideoGallery && (
                          <VideoGallery className="w-full max-w-xs" />
                        )}
                        {slide.showRecordingUI && (
                          <RecordingUI className="w-full max-w-xs" />
                        )}
                        {slide.showIllustration && (
                          <ConnectIllustration className="w-full max-w-xs" />
                        )}
                      </motion.div>
                    </div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="px-6 space-y-6 mt-6">
            <div className="flex justify-center space-x-2">
              {slides.map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "w-2 h-2 rounded-full transition-colors duration-300",
                    currentSlide === index 
                      ? "bg-gradient-to-r from-pink-500 to-blue-500" 
                      : "bg-white/20"
                  )}
                />
              ))}
            </div>

            <div className="flex gap-4">
              {currentSlide > 0 && (
                <Button
                  variant="outline"
                  className="flex-1 bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white"
                  onClick={prevSlide}
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              )}
              <Button
                className="flex-1 bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white"
                onClick={currentSlide === slides.length - 1 ? completeOnboarding : nextSlide}
              >
                {currentSlide === slides.length - 1 ? (
                  "Get Started"
                ) : (
                  <>
                    Continue
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Home Indicator */}
          <div className="h-1 w-32 bg-white/20 rounded-full mx-auto mt-6" />
        </div>
      </div>
    </div>
  )
}

