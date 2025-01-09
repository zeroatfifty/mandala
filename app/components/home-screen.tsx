"use client"

import "@/app/styles/custom-scrollbar.css"
import * as React from "react"
import { Search, Clock, Users, X } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useRouter } from 'next/navigation'
import { NavBar } from "./nav-bar"
import { EmptyState } from "./empty-state"
import { formatDistanceToNow } from 'date-fns'
import { motion } from "framer-motion"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

interface HomeScreenProps {
  userName: string;
}

const filterTags = [
  { name: "Alcohol" },
  { name: "Gambling" },
  { name: "Sex" },
  { name: "Narcotics" },
  { name: "Food" },
  { name: "ADHD" }
]

const circles = [
  { 
    name: "ADHD and addiction", 
    startTime: new Date(Date.now() + 7 * 3600000),
    participants: 20, 
    tag: "ADHD",
    gradient: "from-purple-700 to-purple-900",
    glow: "purple-400"
  },
  { 
    name: "Talking to your partner about addiction", 
    startTime: new Date(Date.now() + 45 * 60000),
    participants: 15, 
    tag: "Alcohol",
    gradient: "from-blue-700 to-blue-900",
    glow: "blue-400"
  },
  { 
    name: "Giving up control of finances", 
    startTime: new Date(Date.now() + 24 * 3600000),
    participants: 12, 
    tag: "Gambling",
    gradient: "from-amber-700 to-amber-900",
    glow: "amber-400"
  },
  { 
    name: "Gamban and is it worth it", 
    startTime: new Date(Date.now() + 72 * 3600000),
    participants: 10, 
    tag: "Gambling",
    gradient: "from-rose-700 to-rose-900",
    glow: "rose-400"
  },
]

export function HomeScreen({ userName }: HomeScreenProps) {
  const router = useRouter()
  const [selectedTag, setSelectedTag] = React.useState<string | null>(null)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [activeTab, setActiveTab] = React.useState("popular")
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false)

  const handleTagClick = (tag: string) => {
    setSelectedTag(selectedTag === tag ? null : tag)
  }

  const filteredAndSortedCircles = React.useMemo(() => {
    let filtered = circles.filter(circle => {
      const matchesSearch = circle.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesTag = !selectedTag || circle.tag === selectedTag
      return matchesSearch && matchesTag
    })

    if (activeTab === "popular") {
      return filtered.sort((a, b) => b.participants - a.participants)
    } else if (activeTab === "upcoming") {
      return filtered.sort((a, b) => a.startTime.getTime() - b.startTime.getTime())
    } else if (activeTab === "favorites") {
      return []
    }

    return filtered
  }, [activeTab, selectedTag, searchQuery])

  const handleCreateCircle = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle circle creation logic here
    setIsCreateModalOpen(false)
  }

  return (
    <div className="flex flex-col h-full bg-[#14132A] overflow-y-auto custom-scrollbar">
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
      <div className="relative z-10 h-full flex flex-col">
        {/* Fixed Header Area */}
        <div className="sticky top-0 z-20 bg-[#14132A] px-4 pt-8 pb-4 space-y-4">
          <div className="text-center font-semibold text-white/90">9:41</div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-400 via-yellow-400 to-blue-400 bg-clip-text text-transparent">
              Hi, {userName}
              <span className="block text-lg font-normal text-white/60">find your circle</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
              <Input 
                className="pl-9 py-2 bg-white/5 border-white/10 text-white placeholder:text-white/40 rounded-xl" 
                placeholder="Search circles..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="overflow-x-auto pb-2 -mx-4 px-4 no-scrollbar"
          >
            <div className="flex flex-nowrap gap-2">
              {filterTags.map((tag) => (
                <Badge 
                  key={tag.name} 
                  className={cn(
                    "cursor-pointer text-xs py-1.5 px-4 transition-all duration-200 whitespace-nowrap rounded-full",
                    selectedTag === tag.name
                      ? "bg-gradient-to-r from-pink-500 to-blue-500 text-white"
                      : "bg-white/5 text-white/60 hover:bg-white/10"
                  )}
                  onClick={() => handleTagClick(tag.name)}
                >
                  {tag.name}
                </Badge>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex justify-between border-b border-white/10">
              {["Popular", "Upcoming", "Favorites"].map((tab) => (
                <button
                  key={tab}
                  className={`pb-2 px-2 text-sm transition-colors ${
                    activeTab === tab.toLowerCase()
                      ? "text-white font-bold border-b-2 border-blue-500"
                      : "text-white/40 hover:text-white/60"
                  }`}
                  onClick={() => setActiveTab(tab.toLowerCase())}
                >
                  {tab}
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto pb-24 px-4">
          {filteredAndSortedCircles.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-1 gap-3 pt-4"
            >
              {filteredAndSortedCircles.map((circle, index) => (
                <Card 
                  key={index} 
                  className={cn(
                    "overflow-hidden border-0 relative",
                    `bg-gradient-to-br ${circle.gradient}`,
                    "shadow-lg"
                  )}
                >
                  <div className={`absolute inset-0 opacity-20 bg-gradient-to-br ${circle.gradient}`} />
                  <div className={`absolute inset-0 opacity-10 bg-[#14132A]`} />
                  <div className={`absolute inset-0 opacity-50 bg-gradient-to-t from-transparent to-${circle.glow}/10`} />
                  <CardContent className="p-4 relative z-10">
                    <div className="flex justify-between items-start mb-2">
                      <Badge className={`text-xs bg-${circle.glow}/20 text-${circle.glow} border-0`}>
                        {circle.tag}
                      </Badge>
                      <div className="flex items-center text-xs text-white/80">
                        <Users className="w-3 h-3 mr-1" />
                        <span>{circle.participants}</span>
                      </div>
                    </div>
                    <h3 className="font-semibold text-sm mb-1 text-white">{circle.name}</h3>
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center text-xs text-white/80">
                        <Clock className="w-3 h-3 mr-1" />
                        <span>in {formatDistanceToNow(circle.startTime)}</span>
                      </div>
                      <Button
                        size="sm"
                        className={`px-4 py-1.5 text-xs bg-${circle.glow}/20 hover:bg-${circle.glow}/30 text-white rounded-full border border-${circle.glow}/30`}
                        onClick={() => router.push(`/meeting/${index}`)}
                      >
                        Share Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          ) : (
            <EmptyState 
              message={
                activeTab === "favorites" 
                  ? "No favorite circles yet. Explore and add some!" 
                  : "No circles found. Try adjusting your filters."
              } 
            />
          )}
        </div>
      </div>

      <NavBar onCreateNew={() => setIsCreateModalOpen(true)} />

      {/* Create Circle Modal */}
      {isCreateModalOpen && (
        <div className="absolute inset-0 bg-black/50 flex items-end justify-center z-50">
          <div className="bg-[#14132A] w-full h-[90%] rounded-t-[40px] p-6 space-y-6 overflow-y-auto">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-white">Create Circle</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsCreateModalOpen(false)}>
                <X className="h-4 w-4 text-white" />
              </Button>
            </div>
            <form onSubmit={handleCreateCircle} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-white">Circle Title</Label>
                <Input id="title" placeholder="Enter circle title" className="bg-white/5 border-white/10 text-white placeholder:text-white/40" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description" className="text-white">Description</Label>
                <Textarea id="description" placeholder="Enter circle description" className="bg-white/5 border-white/10 text-white placeholder:text-white/40" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject-tag" className="text-white">Subject Tag</Label>
                <Select>
                  <SelectTrigger id="subject-tag" className="bg-white/5 border-white/10 text-white">
                    <SelectValue placeholder="Select a tag" />
                  </SelectTrigger>
                  <SelectContent>
                    {filterTags.map((tag) => (
                      <SelectItem key={tag.name} value={tag.name}>{tag.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="start-time" className="text-white">Start Time</Label>
                <Input id="start-time" type="datetime-local" className="bg-white/5 border-white/10 text-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration" className="text-white">Duration (hours)</Label>
                <Input id="duration" type="number" min="1" max="24" placeholder="Enter duration in hours" className="bg-white/5 border-white/10 text-white placeholder:text-white/40" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="max-participants" className="text-white">Max Participants</Label>
                <Input id="max-participants" type="number" min="1" placeholder="Enter maximum participants" className="bg-white/5 border-white/10 text-white placeholder:text-white/40" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="max-share-time" className="text-white">Max Share Time (minutes)</Label>
                <Input id="max-share-time" type="number" min="1" placeholder="Enter maximum share time" className="bg-white/5 border-white/10 text-white placeholder:text-white/40" />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="commenting-allowed" />
                <Label htmlFor="commenting-allowed" className="text-white">Commenting Allowed</Label>
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white">
                Create Circle
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

