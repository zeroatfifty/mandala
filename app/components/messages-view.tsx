"use client"

import * as React from "react"
import { Search, ArrowLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useRouter } from "next/navigation"
import { NavBar } from "./nav-bar"
import { motion } from "framer-motion"

interface Chat {
  id: number
  name: string
  avatar: string
  lastMessage: {
    sender?: string
    content: string
  }
  time: string
  unreadCount: number
  isGroup: boolean
}

const chats: Chat[] = [
  {
    id: 1,
    name: "John Doe",
    avatar: "/avatars/john-doe.png",
    lastMessage: {
      content: "Hey, how are you doing?"
    },
    time: "10:30 AM",
    unreadCount: 2,
    isGroup: false
  },
  {
    id: 2,
    name: "Recovery Support Group",
    avatar: "/avatars/group.png",
    lastMessage: {
      sender: "Alice",
      content: "Thanks for sharing your experience with the group today. It really resonated with what I've been going through"
    },
    time: "Yesterday",
    unreadCount: 5,
    isGroup: true
  },
  {
    id: 3,
    name: "Jane Smith",
    avatar: "/avatars/jane-smith.png",
    lastMessage: {
      content: "See you at the meeting tonight!"
    },
    time: "2:45 PM",
    unreadCount: 0,
    isGroup: false
  },
  {
    id: 4,
    name: "Addiction Support Network",
    avatar: "/avatars/network.png",
    lastMessage: {
      sender: "Admin",
      content: "New resources available. Check them out!"
    },
    time: "Monday",
    unreadCount: 1,
    isGroup: true
  },
  {
    id: 5,
    name: "Dr. Emily Johnson",
    avatar: "/avatars/emily-johnson.png",
    lastMessage: {
      content: "Your progress is impressive. Keep up the good work!"
    },
    time: "Sunday",
    unreadCount: 0,
    isGroup: false
  },
]

const truncateMessage = (message: string, maxLength: number = 45) => {
  if (message.length <= maxLength) return message;
  return message.slice(0, maxLength) + '...';
}

const formatMessage = (chat: Chat) => {
  const content = chat.isGroup && chat.lastMessage.sender
    ? `${chat.lastMessage.sender}: ${chat.lastMessage.content}`
    : chat.lastMessage.content;
  return truncateMessage(content);
}

export function MessagesView() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = React.useState("")

  const filteredChats = React.useMemo(() => {
    return chats.filter(chat => 
      chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      formatMessage(chat).toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery])

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
            Messages
          </h1>
        </div>

        {/* Search */}
        <div className="px-4 py-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
            <Input 
              className="pl-9 py-2 bg-white/5 border-white/10 text-white placeholder:text-white/40 rounded-xl"
              placeholder="Search chats..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Chat List */}
        <ScrollArea className="flex-1">
          <div className="px-4 pb-24 space-y-1">
            {filteredChats.map((chat) => (
              <button
                key={chat.id}
                className="w-full text-left p-3 hover:bg-white/5 rounded-xl transition-colors"
                onClick={() => {/* Handle chat selection */}}
              >
                <div className="flex items-center">
                  <Avatar className="h-12 w-12 flex-shrink-0 ring-2 ring-white/10">
                    <AvatarImage src={chat.avatar} alt={chat.name} />
                    <AvatarFallback className="bg-gradient-to-br from-pink-500 to-purple-500 text-white">
                      {chat.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0 ml-3 mr-4">
                    <div className="flex justify-between items-baseline">
                      <h2 className="font-semibold text-sm text-white truncate">{chat.name}</h2>
                      <span className="text-xs text-white/60 ml-2">{chat.time}</span>
                    </div>
                    <p className="text-sm text-white/60 truncate">
                      {formatMessage(chat)}
                    </p>
                  </div>
                  {chat.unreadCount > 0 && (
                    <div className="flex-shrink-0 ml-2">
                      <div className="bg-gradient-to-r from-pink-500 to-blue-500 text-white text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center">
                        {chat.unreadCount}
                      </div>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>

        {/* Navigation Bar */}
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[90%] max-w-[330px] z-50">
          <NavBar onCreateNew={() => {}} />
        </div>
      </div>
    </div>
  )
}

