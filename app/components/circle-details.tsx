"use client"

import React, { useState, useRef } from "react"
import { ArrowLeft, Eye, Users, MessageSquare, Video, X, ChevronLeft, ChevronRight, Heart, Send, MessageCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useRouter } from 'next/navigation'
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { RecordingModal } from "./recording-modal"
import { Input } from "@/components/ui/input"
import { format } from 'date-fns'

interface CircleDetailsPageProps {
  id: string
}

interface Share {
  id: number
  userName: string
  duration: string
  videoUrl: string
  avatarUrl: string
  timestamp: Date
}

interface Comment {
  id: number
  userName: string
  avatarUrl: string
  text: string
  timestamp: Date
  likes: number
}

const shares: Share[] = [
  { 
    id: 1, 
    userName: "Alice", 
    duration: "2:30", 
    videoUrl: "/videos/share1.mp4",
    avatarUrl: "/avatars/alice.jpg",
    timestamp: new Date(2024, 0, 15, 14, 30)
  },
  { 
    id: 2, 
    userName: "Bob", 
    duration: "3:15", 
    videoUrl: "/videos/share2.mp4",
    avatarUrl: "/avatars/bob.jpg",
    timestamp: new Date(2024, 0, 15, 14, 35)
  },
]

const comments: Comment[] = [
  {
    id: 1,
    userName: "donastro",
    avatarUrl: "/avatars/donastro.jpg",
    text: "Really resonated with what you said about communication",
    timestamp: new Date(2024, 0, 15, 15, 10),
    likes: 2,
  },
  {
    id: 2,
    userName: "simon",
    avatarUrl: "/avatars/simon.jpg",
    text: "Thank you for sharing your experience 🙏",
    timestamp: new Date(2024, 0, 15, 15, 19),
    likes: 1,
  }
]

export function CircleDetailsPage({ id }: CircleDetailsPageProps) {
  const router = useRouter()
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [isViewSharesModalOpen, setIsViewSharesModalOpen] = useState(false)
  const [submittedCount, setSubmittedCount] = useState(9)
  const [totalParticipants, setTotalParticipants] = useState(15)
  const [isRecording, setIsRecording] = useState(false)
  const [recordingDuration, setRecordingDuration] = useState(0)
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null)
  const [currentShareIndex, setCurrentShareIndex] = useState(0)
  const [isCommentsOpen, setIsCommentsOpen] = useState(false)
  const [newComment, setNewComment] = useState("")
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', aspectRatio: 9/16 },
        audio: true
      })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      const chunks: BlobPart[] = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' })
        setVideoBlob(blob)
        stream.getTracks().forEach(track => track.stop())
        if (timerRef.current) {
          clearInterval(timerRef.current)
        }
      }

      setIsRecording(true)
      mediaRecorder.start()

      timerRef.current = setInterval(() => {
        setRecordingDuration(prev => prev + 1)
      }, 1000)

    } catch (error) {
      console.error('Error accessing camera:', error)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  const resetRecording = () => {
    setVideoBlob(null)
    setRecordingDuration(0)
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
  }

  const nextShare = () => {
    setCurrentShareIndex(prev => (prev + 1) % shares.length)
    setIsCommentsOpen(false)
  }

  const previousShare = () => {
    setCurrentShareIndex(prev => (prev - 1 + shares.length) % shares.length)
    setIsCommentsOpen(false)
  }

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment.trim()) {
      setNewComment("")
    }
  }

  const handleDirectMessage = (userName: string) => {
    router.push(`/messages/${userName}`)
  }

  const circle = {
    title: "Talking to your partner about addiction",
    description: "Learn effective communication strategies for discussing addiction with your partner in a supportive and understanding way.",
    host: "Sachin Pabari",
    hostRole: "Circle Host",
    previousShares: 125,
    tag: "Relationships"
  }

  return (
    <div className="h-full flex flex-col bg-[#14132A] text-white">
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
      <div className="relative z-10 flex-1 overflow-auto">
        {/* Header */}
        <div className="px-6 pt-4 pb-2 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => router.push('/home')}
              className="text-white/80 hover:text-white"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <Badge className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-white border-0">
              {circle.tag}
            </Badge>
          </div>
        </div>

        <div className="px-6 py-6 space-y-6">
          {/* Title and Description */}
          <div className="space-y-2">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-400 via-yellow-400 to-blue-400 bg-clip-text text-transparent">
              {circle.title}
            </h1>
            <p className="text-white/60 leading-relaxed">
              {circle.description}
            </p>
          </div>

          {/* Host Information */}
          <Card className="p-4 bg-white/5 border-white/10">
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12 border-2 border-white/10">
                <AvatarImage src="/placeholder.svg?height=48&width=48" />
                <AvatarFallback className="bg-gradient-to-r from-pink-500 to-purple-500 text-white">
                  {circle.host[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-white font-semibold">{circle.host}</h2>
                <p className="text-sm text-white/60">{circle.hostRole}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="text-xs text-emerald-400">{circle.previousShares} previous shares</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Share to View Card */}
          {!hasSubmitted && (
            <Card className="relative overflow-hidden border-0">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-purple-600 opacity-90" />
              <div className="relative p-8 flex flex-col items-center text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-white">Share to View</h3>
                  <p className="text-white/80 max-w-sm">
                    To view your peers' shares, share yours with them.
                  </p>
                </div>
                <Button
                  onClick={() => setIsShareModalOpen(true)}
                  className="bg-white hover:bg-white/90 text-purple-900 font-medium px-8 py-2 rounded-full"
                >
                  Share Now
                </Button>
                <p className="text-sm text-white/60">
                  5 shares waiting to be discovered!
                </p>
              </div>
            </Card>
          )}

          {hasSubmitted && (
            <div className="space-y-6">
              <Card className="p-6 bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-0">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-blue-400" />
                      <span className="font-medium text-white">
                        {submittedCount} of {totalParticipants} shared their stories
                      </span>
                    </div>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                      style={{ width: `${(submittedCount / totalParticipants) * 100}%` }}
                    />
                  </div>
                </div>
              </Card>

              <Button
                className="w-full bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white h-12 rounded-full"
                onClick={() => setIsViewSharesModalOpen(true)}
              >
                <Video className="mr-2 h-5 w-5" />
                View All Circle Shares
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Recording Modal */}
      {isShareModalOpen && (
        <RecordingModal
          isOpen={isShareModalOpen}
          onClose={() => {
            setIsShareModalOpen(false)
            resetRecording()
          }}
          onSubmit={(blob, settings) => {
            console.log('Submitting with settings:', settings)
            setHasSubmitted(true)
            setIsShareModalOpen(false)
            setSubmittedCount(prev => prev + 1)
            resetRecording()
          }}
          isRecording={isRecording}
          startRecording={startRecording}
          stopRecording={stopRecording}
          videoBlob={videoBlob}
          recordingDuration={recordingDuration}
        />
      )}

      {/* View Shares Modal */}
      {isViewSharesModalOpen && shares[currentShareIndex] && (
        <div className="absolute inset-0 z-50 bg-[#14132A]">
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-white hover:text-white/80"
                  onClick={() => setIsViewSharesModalOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
                <span className="text-white">View Shares</span>
                <div className="w-8" />
              </div>
              <div className="space-y-1">
                <h2 className="text-xl font-bold bg-gradient-to-r from-pink-400 via-yellow-400 to-blue-400 bg-clip-text text-transparent">
                  {circle.title}
                </h2>
                <Badge className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-white border-0">
                  {circle.tag}
                </Badge>
              </div>
              <div className="text-white/60 text-sm">
                Shares submitted: {submittedCount} / {totalParticipants}
              </div>
            </div>

            {/* Video Player */}
            <div className="flex-1 relative bg-black">
              <video
                src={shares[currentShareIndex].videoUrl}
                controls
                className="absolute inset-0 w-full h-full object-cover"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-white/80"
                onClick={previousShare}
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-white/80"
                onClick={nextShare}
              >
                <ChevronRight className="h-8 w-8" />
              </Button>
            </div>

            {/* Share Info and Comments */}
            <div className="bg-[#14132A] text-white">
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10 ring-2 ring-white/10">
                      <AvatarImage src={shares[currentShareIndex].avatarUrl} />
                      <AvatarFallback>{shares[currentShareIndex].userName[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{shares[currentShareIndex].userName}</p>
                      <p className="text-sm text-white/60">
                        {format(shares[currentShareIndex].timestamp, 'MMM d, h:mm a')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="bg-white/10 text-white hover:bg-white/20 hover:text-white transition-colors"
                      onClick={() => setIsCommentsOpen(!isCommentsOpen)}
                    >
                      <MessageCircle className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="bg-white/10 text-white hover:bg-white/20 hover:text-white transition-colors"
                      onClick={() => handleDirectMessage(shares[currentShareIndex].userName)}
                    >
                      <MessageSquare className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                {/* Comments Section */}
                {isCommentsOpen && (
                  <div className="space-y-4">
                    <div className="h-[300px] overflow-y-auto space-y-4">
                      {comments.map((comment) => (
                        <div key={comment.id} className="flex space-x-3">
                          <Avatar className="h-8 w-8 ring-2 ring-white/10">
                            <AvatarImage src={comment.avatarUrl} />
                            <AvatarFallback>{comment.userName[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-baseline justify-between">
                              <h4 className="font-medium text-sm">{comment.userName}</h4>
                              <span className="text-xs text-white/60">
                                {format(comment.timestamp, 'h:mm a')}
                              </span>
                            </div>
                            <p className="text-sm text-white/80">{comment.text}</p>
                            <div className="flex items-center space-x-4 mt-1">
                              <button className="text-xs text-white/60 hover:text-white flex items-center space-x-1">
                                <Heart className="h-3 w-3" />
                                <span>{comment.likes}</span>
                              </button>
                              <button className="text-xs text-white/60 hover:text-white">
                                Reply
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <form onSubmit={handleSubmitComment} className="flex items-center space-x-2">
                      <Input
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a comment..."
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                      />
                      <Button type="submit" size="icon" className="bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600">
                        <Send className="h-4 w-4" />
                      </Button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

