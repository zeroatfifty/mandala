"use client"

import React, { useRef, useState, useEffect } from 'react'
import { X, Eye, MessageSquare, Users } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import { motion } from "framer-motion"

export interface RecordingModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (blob: Blob, settings: ShareSettings) => void
  isRecording: boolean
  startRecording: () => void
  stopRecording: () => void
  videoBlob: Blob | null
  recordingDuration: number
  guidelines?: string[]
}

interface ShareSettings {
  isAnonymous: boolean
  isCircleOnly: boolean
  allowComments: boolean
}

export function RecordingModal({
  isOpen,
  onClose,
  onSubmit,
  isRecording,
  startRecording,
  stopRecording,
  videoBlob,
  recordingDuration,
  guidelines = [
    "Just say how you're feeling",
    "Express your experiences",
    "Be free, this circle is safe"
  ]
}: RecordingModalProps) {
  const mainVideoRef = useRef<HTMLVideoElement>(null)
  const previewVideoRef = useRef<HTMLVideoElement>(null)
  const [shareSettings, setShareSettings] = useState<ShareSettings>({
    isAnonymous: false,
    isCircleOnly: true,
    allowComments: true,
  })
  const [stream, setStream] = useState<MediaStream | null>(null)

  useEffect(() => {
    if (isOpen) {
      navigator.mediaDevices
        .getUserMedia({
          video: { facingMode: 'user', aspectRatio: 9/16 },
          audio: true,
        })
        .then((mediaStream) => {
          setStream(mediaStream)
          if (previewVideoRef.current) {
            previewVideoRef.current.srcObject = mediaStream
          }
          if (mainVideoRef.current) {
            mainVideoRef.current.srcObject = mediaStream
          }
        })
        .catch((err) => console.error('Error accessing camera:', err))

      return () => {
        stream?.getTracks().forEach(track => track.stop())
      }
    }
  }, [isOpen])

  useEffect(() => {
    if (videoBlob && mainVideoRef.current) {
      mainVideoRef.current.src = URL.createObjectURL(videoBlob)
    }
  }, [videoBlob])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="absolute inset-0 z-50 bg-[#0A0A0A]">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white hover:text-white/80"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </Button>
            <span className="ml-2 text-white">Recording</span>
          </div>
          <span className="text-white/60 text-sm">{formatTime(recordingDuration)}</span>
        </div>

        {/* Main Content */}
        <div className="relative flex-1 bg-[#111111] p-4">
          {/* Preview Window */}
          <div className="absolute top-4 left-4 w-32 h-44 rounded-lg overflow-hidden z-10 ring-2 ring-white shadow-lg">
            {shareSettings.isAnonymous ? (
              <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white text-2xl font-bold">
                  A
                </div>
              </div>
            ) : (
              <video
                ref={previewVideoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* Main Window */}
          <Card className="w-full h-full border-white/10 relative overflow-hidden">
            {videoBlob ? (
              <video
                ref={mainVideoRef}
                controls
                className="w-full h-full object-cover"
              />
            ) : (
              <>
                {/* Background Image */}
                <div className="absolute inset-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-blue-500/20" />
                  <div className="absolute inset-0 backdrop-blur-sm" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                  <div className="w-full max-w-md">
                    {isRecording ? (
                      <div className="flex items-center justify-center text-white font-medium">
                        <span className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse" />
                        Recording your share
                      </div>
                    ) : (
                      <div className="text-center space-y-6">
                        <h3 className="text-2xl font-semibold text-white">Advice for Sharing</h3>
                        <div className="space-y-4">
                          <div className="space-y-3">
                            {guidelines.map((guideline, index) => (
                              <div key={index} className="flex items-center gap-3 justify-center">
                                <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center flex-shrink-0">
                                  <span className="text-sm font-medium text-white">{index + 1}</span>
                                </div>
                                <p className="text-sm text-white/80">
                                  {guideline}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* Share Settings Icons */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-8">
              <button 
                className="flex flex-col items-center group"
                onClick={() => setShareSettings(prev => ({ ...prev, isAnonymous: !prev.isAnonymous }))}
              >
                <div className={`p-2 rounded-full transition-all duration-200 ${
                  shareSettings.isAnonymous 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
                    : 'bg-white/10 text-white/60 hover:bg-white/20'
                }`}>
                  <Eye className="h-5 w-5" />
                </div>
                <span className={`text-xs mt-2 font-medium transition-colors ${
                  shareSettings.isAnonymous ? 'text-blue-400' : 'text-white/60'
                }`}>
                  Anonymous
                </span>
              </button>
              <button 
                className="flex flex-col items-center group"
                onClick={() => setShareSettings(prev => ({ ...prev, isCircleOnly: !prev.isCircleOnly }))}
              >
                <div className={`p-2 rounded-full transition-all duration-200 ${
                  shareSettings.isCircleOnly 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
                    : 'bg-white/10 text-white/60 hover:bg-white/20'
                }`}>
                  <Users className="h-5 w-5" />
                </div>
                <span className={`text-xs mt-2 font-medium transition-colors ${
                  shareSettings.isCircleOnly ? 'text-blue-400' : 'text-white/60'
                }`}>
                  Circle only
                </span>
              </button>
              <button 
                className="flex flex-col items-center group"
                onClick={() => setShareSettings(prev => ({ ...prev, allowComments: !prev.allowComments }))}
              >
                <div className={`p-2 rounded-full transition-all duration-200 ${
                  shareSettings.allowComments 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
                    : 'bg-white/10 text-white/60 hover:bg-white/20'
                }`}>
                  <MessageSquare className="h-5 w-5" />
                </div>
                <span className={`text-xs mt-2 font-medium transition-colors ${
                  shareSettings.allowComments ? 'text-blue-400' : 'text-white/60'
                }`}>
                  Comments
                </span>
              </button>
            </div>
          </Card>
        </div>

        {/* Recording Controls */}
        <div className="p-4 flex justify-center">
          {videoBlob ? (
            <div className="flex space-x-4">
              <Button
                variant="outline"
                onClick={() => {
                  if (mainVideoRef.current) mainVideoRef.current.srcObject = stream
                  if (previewVideoRef.current) previewVideoRef.current.srcObject = stream
                }}
                className="bg-white/10 text-white border-white/20 hover:bg-white/20 hover:text-white hover:border-white/30"
              >
                Re-record
              </Button>
              <Button
                onClick={() => onSubmit(videoBlob, shareSettings)}
                className="bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white"
              >
                Submit
              </Button>
            </div>
          ) : (
            <Button
              size="lg"
              variant="outline"
              className={`rounded-full w-16 h-16 p-0 ${
                isRecording 
                  ? 'bg-red-500 hover:bg-red-600 border-0' 
                  : 'bg-red-500 hover:bg-red-600 border-2 border-red-500'
              }`}
              onClick={isRecording ? stopRecording : startRecording}
            >
              {isRecording ? (
                <div className="w-6 h-6 bg-white rounded-sm" />
              ) : (
                <div className="w-6 h-6 bg-white rounded-full" />
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

