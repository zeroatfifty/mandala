"use client"

import * as React from "react"
import { Search, ArrowLeft, Eye, Clock, Video, X, ChevronLeft, ChevronRight, MessageSquare, Heart, Send } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useRouter } from "next/navigation"
import { NavBar } from "./nav-bar"
import { format } from 'date-fns'
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"

interface Share {
  id: number
  circleName: string
  date: Date
  duration: string
  tag: string
  videoUrl: string
  userName: string
}

interface Friend {
  id: number
  name: string
  avatar: string
  shares: Share[]
}

const friends: Friend[] = [
  {
    id: 1,
    name: "Sarah",
    avatar: "/avatars/sarah.jpg",
    shares: [
      {
        id: 1,
        circleName: "Morning Reflection",
        date: new Date(2024, 0, 15, 10, 0),
        duration: "3 minutes",
        tag: "Alcohol",
        videoUrl: "/videos/sarah1.mp4",
        userName: "Sarah"
      }
    ]
  },
  {
    id: 2,
    name: "Michael",
    avatar: "/avatars/michael.jpg",
    shares: []
  },
  {
    id: 3,
    name: "Emma",
    avatar: "/avatars/emma.jpg",
    shares: []
  },
  {
    id: 4,
    name: "James",
    avatar: "/avatars/james.jpg",
    shares: []
  },
  {
    id: 5,
    name: "Lisa",
    avatar: "/avatars/lisa.jpg",
    shares: []
  },
  {
    id: 6,
    name: "David",
    avatar: "/avatars/david.jpg",
    shares: []
  }
]

const recentShares: Share[] = [
  {
    id: 1,
    circleName: "Talking to your partner about addiction",
    date: new Date(2024, 0, 15, 10, 0),
    duration: "5 minutes",
    tag: "Alcohol",
    videoUrl: "/videos/share1.mp4",
    userName: "Alice"
  },
  {
    id: 2,
    circleName: "1st Step in recovery",
    date: new Date(2024, 0, 18, 14, 0),
    duration: "4 minutes",
    tag: "Gambling",
    videoUrl: "/videos/share2.mp4",
    userName: "Alice"
  }
]

export function SharesView() {
  const router = useRouter()
  const [isViewShareModalOpen, setIsViewShareModalOpen] = React.useState(false)
  const [selectedShare, setSelectedShare] = React.useState<Share | null>(null)
  const [currentShareIndex, setCurrentShareIndex] = React.useState(0)
  const [currentShares, setCurrentShares] = React.useState<Share[]>([])

  const handleViewShare = (share: Share, shares: Share[]) => {
    setSelectedShare(share)
    setCurrentShares(shares)
    const shareIndex = shares.findIndex(s => s.id === share.id)
    setCurrentShareIndex(Math.max(0, shareIndex))
    setIsViewShareModalOpen(true)
  }

  return (
    <div className="h-full flex flex-col bg-[#14132A]">
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
      <div className="relative z-10">
        <div className="pt-8 px-4 pb-2">
          <div className="text-center font-semibold text-white/90">9:41</div>
        </div>

        {/* Header */}
        <div className="px-4 py-2 flex items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => router.push('/home')}
            className="text-white/80 hover:text-white"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold ml-2 bg-gradient-to-r from-pink-400 via-yellow-400 to-blue-400 bg-clip-text text-transparent">
            My Shares
          </h1>
        </div>

        {/* Friends Shares */}
        <div className="px-4 py-2">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-semibold text-sm text-white/90">Shares from friends</h2>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs text-white/60 hover:text-white"
            >
              View all
            </Button>
          </div>
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex space-x-4 p-1">
              {friends.map((friend) => (
                <button
                  key={friend.id}
                  className="flex flex-col items-center space-y-1"
                  onClick={() => friend.shares.length > 0 && handleViewShare(friend.shares[0], friend.shares)}
                >
                  <Avatar className="h-14 w-14 border-2 border-white/10 ring-2 ring-white/5">
                    <AvatarImage src={friend.avatar} alt={friend.name} />
                    <AvatarFallback className="bg-gradient-to-br from-pink-500 to-purple-500 text-white">
                      {friend.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-white/60">{friend.name}</span>
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Recent Shares */}
        <div className="flex-1 px-4"> {/* Updated content container */}
          <h2 className="font-semibold text-lg mb-4 text-white/90">Recent Shares</h2>
          <div className="space-y-3">
            {recentShares.map(share => (
              <Card 
                key={share.id} 
                className="overflow-hidden bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors"
              >
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <Badge className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-white border-0">
                      {share.tag}
                    </Badge>
                    <span className="text-xs text-white/60">{share.duration}</span>
                  </div>
                  <h3 className="font-semibold text-sm mb-2 text-white/90">{share.circleName}</h3>
                  <div className="flex items-center text-xs text-white/60 mb-3">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>
                      {format(share.date, 'M/d/yyyy')} at {format(share.date, 'h:mm a')}
                    </span>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white"
                    onClick={() => handleViewShare(share, recentShares)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Share
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Content wrapper to ensure proper spacing above nav bar */}
        <div className="pb-24"> {/* Added content wrapper */}
          {/* Navigation Bar */}
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[90%] max-w-[330px] z-50">
            <NavBar onCreateNew={() => {}} />
          </div>
        </div>

        {/* View Share Modal */}
        {isViewShareModalOpen && selectedShare && (
          <div className="absolute inset-0 z-50 bg-[#14132A]">
            <div className="h-full flex flex-col">
              {/* Modal Header */}
              <div className="p-4 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-white hover:text-white/80"
                    onClick={() => setIsViewShareModalOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                  <span className="text-white/90">View Share</span>
                  <div className="w-8" />
                </div>
              </div>

              {/* Video Player */}
              <div className="flex-1 relative bg-black">
                <video
                  src={selectedShare.videoUrl}
                  controls
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {currentShares.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-white/80"
                      onClick={() => setCurrentShareIndex((prev) => (prev - 1 + currentShares.length) % currentShares.length)}
                    >
                      <ChevronLeft className="h-8 w-8" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-white/80"
                      onClick={() => setCurrentShareIndex((prev) => (prev + 1) % currentShares.length)}
                    >
                      <ChevronRight className="h-8 w-8" />
                    </Button>
                  </>
                )}
              </div>

              {/* Share Info */}
              <div className="bg-[#14132A] text-white p-4 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10 ring-2 ring-white/10">
                      <AvatarImage src={`/avatars/${selectedShare.userName.toLowerCase()}.jpg`} />
                      <AvatarFallback className="bg-gradient-to-br from-pink-500 to-purple-500 text-white">
                        {selectedShare.userName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-white/90">{selectedShare.userName}</p>
                      <p className="text-sm text-white/60">
                        {format(selectedShare.date, 'MMM d, h:mm a')}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="bg-white/5 text-white hover:bg-white/10 hover:text-white"
                    >
                      <Heart className="h-5 w-5" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="bg-white/5 text-white hover:bg-white/10 hover:text-white"
                    >
                      <MessageSquare className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

