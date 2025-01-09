"use client"

import React, { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface VideoGalleryProps {
  className?: string
}

const videos = [
  '/videos/share1.mp4',
  '/videos/share2.mp4',
  '/videos/share3.mp4',
]

export function VideoGallery({ className }: VideoGalleryProps) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)

  const nextVideo = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length)
  }

  const prevVideo = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex - 1 + videos.length) % videos.length)
  }

  return (
    <div className={className}>
      <div className="flex justify-center gap-4">
        {videos.map((video, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ 
              opacity: currentVideoIndex === index ? 1 : 0.5,
              scale: currentVideoIndex === index ? 1 : 0.9,
            }}
            transition={{ duration: 0.3 }}
            className={`relative w-[100px] aspect-[9/16] overflow-hidden rounded-xl border-2 ${
              currentVideoIndex === index 
                ? 'border-white/20 ring-2 ring-white/20' 
                : 'border-white/10'
            }`}
          >
            <video
              src={video}
              className="w-full h-full object-cover"
              autoPlay={currentVideoIndex === index}
              loop
              muted
              playsInline
            />
          </motion.div>
        ))}
      </div>
      <div className="flex justify-center mt-4 gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-white/5 text-white hover:bg-white/10 hover:text-white"
          onClick={prevVideo}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-white/5 text-white hover:bg-white/10 hover:text-white"
          onClick={nextVideo}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

