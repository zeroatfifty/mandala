"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { HomeScreen } from "./home-screen"

export default function OnboardingFlow() {
  const [currentSlide, setCurrentSlide] = React.useState(0)
  const [onboardingComplete, setOnboardingComplete] = React.useState(false)
  const [userName, setUserName] = React.useState("Sachin")

  const slides = [
    {
      title: "Starts With You",
      gradient: "from-pink-200 to-purple-200",
    },
    {
      title: "Find a meeting to attend",
      gradient: "from-blue-200 to-green-200",
    },
    {
      title: "Record your share of how you're feeling",
      gradient: "from-yellow-200 to-orange-200",
    },
    {
      title: "All the attendees also share before the meeting closes",
      gradient: "from-purple-200 to-pink-200",
    },
    {
      title: "View all the shares, connect, comment and experience",
      gradient: "from-green-200 to-blue-200",
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
        <div className="w-full max-w-[375px] h-[812px] bg-white rounded-[60px] relative overflow-hidden shadow-xl border-8 border-gray-900">
          <div className="h-6 w-40 bg-black absolute top-0 left-1/2 -translate-x-1/2 rounded-b-3xl" />
          <HomeScreen userName={userName} />
          <div className="h-1 w-32 bg-black rounded-full mx-auto absolute bottom-2 left-1/2 transform -translate-x-1/2" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {/* Mobile Container */}
      <div className="w-full max-w-[375px] h-[812px] bg-white rounded-[60px] relative overflow-hidden shadow-xl border-8 border-gray-900">
        {/* Status Bar */}
        <div className="h-6 w-40 bg-black absolute top-0 left-1/2 -translate-x-1/2 rounded-b-3xl" />

        {/* Content */}
        <div className="h-full pt-8 pb-8 flex flex-col">
          {/* Time */}
          <div className="text-center font-semibold mb-4">9:41</div>

          {/* Slides */}
          <div className="flex-1 relative">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={cn(
                  "absolute inset-0 transition-opacity duration-300 flex flex-col items-center justify-center p-6",
                  currentSlide === index ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
              >
                <Card className={cn(
                  "w-full h-full rounded-3xl flex items-center justify-center p-6 bg-gradient-to-br",
                  slide.gradient
                )}>
                  <h1 className="text-2xl font-bold text-center text-gray-900">
                    {slide.title}
                  </h1>
                </Card>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="px-6 space-y-6">
            <div className="flex justify-center space-x-2">
              {slides.map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "w-2 h-2 rounded-full transition-colors",
                    currentSlide === index ? "bg-gray-900" : "bg-gray-300"
                  )}
                />
              ))}
            </div>

            <div className="flex gap-4">
              {currentSlide > 0 && (
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={prevSlide}
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              )}
              <Button
                className="flex-1"
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
          <div className="h-1 w-32 bg-black rounded-full mx-auto mt-6" />
        </div>
      </div>
    </div>
  )
}

