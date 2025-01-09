"use client"

import * as React from "react"
import { Search, Home, Users, MessageSquare, Settings, Plus, UserCircle2, ArrowRight, X, Clock, Star } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { MeetingDetails } from "@/app/components/meeting-details"

interface HomeScreenProps {
  userName: string;
}

const filterTags = [
  { name: "Alcohol", color: "bg-red-200 text-red-800" },
  { name: "Gambling", color: "bg-blue-200 text-blue-800" },
  { name: "Sex", color: "bg-pink-200 text-pink-800" },
  { name: "Narcotics", color: "bg-purple-200 text-purple-800" },
  { name: "Food", color: "bg-green-200 text-green-800" },
  { name: "ADHD", color: "bg-yellow-200 text-yellow-800" }
]

const meetings = [
  { name: "Talking to your partner about addiction", startTime: "10:00 AM", closeTime: "11:30 AM", participants: 15, tag: "Alcohol" },
  { name: "1st Step in recovery", startTime: "2:00 PM", closeTime: "3:30 PM", participants: 8, tag: "Gambling" },
  { name: "ADHD and addiction", startTime: "7:00 PM", closeTime: "8:30 PM", participants: 20, tag: "ADHD" },
  { name: "Giving up control of finances", startTime: "11:00 AM", closeTime: "12:30 PM", participants: 12, tag: "Gambling" },
  { name: "Gamban and is it worth it", startTime: "3:00 PM", closeTime: "4:30 PM", participants: 10, tag: "Gambling" },
]

const gradients = [
  "from-pink-100 to-purple-100",
  "from-blue-100 to-green-200",
  "from-yellow-100 to-orange-200",
  "from-purple-100 to-pink-200",
  "from-green-100 to-blue-200",
]

export function HomeScreen({ userName }: HomeScreenProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = React.useState(false)
  const [isCreateMeetingOpen, setIsCreateMeetingOpen] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState("popular")

  const toggleModal = () => setIsOpen(!isOpen)
  const toggleCreateMeeting = () => {
    setIsOpen(false)
    setIsCreateMeetingOpen(!isCreateMeetingOpen)
  }

  const filteredMeetings = React.useMemo(() => {
    // In a real app, you'd implement actual filtering logic here
    return meetings
  }, [activeTab])

  return (
    <div className="flex flex-col h-full relative overflow-hidden">
      {/* Status Bar */}
      <div className="pt-8 px-4 pb-2">
        <div className="text-center font-semibold">9:41</div>
      </div>

      {/* Welcome Message */}
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-400">Hi, {userName}</h2>

      {/* Main Content */}
      <div className="flex-1 overflow-auto px-4 space-y-3 pb-20">
        {/* Search Bar */}
        <div className="relative mb-2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input className="pl-9 py-1 bg-gray-100 border-0 text-sm" placeholder="Search meetings..." />
        </div>

        {/* Filter Tags */}
        <div className="flex flex-wrap gap-1 mb-2">
          {filterTags.map((tag) => (
            <Badge key={tag.name} className={`cursor-pointer text-xs py-0 px-2 ${tag.color}`}>
              {tag.name}
            </Badge>
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="popular" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-2 h-8">
            <TabsTrigger value="popular" className="text-xs px-1">Popular</TabsTrigger>
            <TabsTrigger value="upcoming" className="text-xs px-1">Upcoming</TabsTrigger>
            <TabsTrigger value="favorites" className="text-xs px-1">Favorites</TabsTrigger>
          </TabsList>
          <TabsContent value="popular">
            <MeetingsList meetings={filteredMeetings} />
          </TabsContent>
          <TabsContent value="upcoming">
            <MeetingsList meetings={filteredMeetings} />
          </TabsContent>
          <TabsContent value="favorites">
            <MeetingsList meetings={filteredMeetings} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t flex justify-around items-center p-2">
        <Button variant="ghost" size="icon">
          <Home className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon">
          <Users className="h-6 w-6" />
        </Button>
        <Button onClick={toggleModal} size="icon" className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon">
          <MessageSquare className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon">
          <Settings className="h-6 w-6" />
        </Button>
      </div>

      {/* Create New Modal */}
      {isOpen && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end justify-center">
          <div className="bg-white w-full rounded-t-[40px] p-6 space-y-6 transform transition-transform duration-300 ease-out translate-y-0">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Create New</h2>
              <Button variant="ghost" size="icon" className="rounded-full" onClick={toggleModal}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-gray-500">Choose an option to create.</p>
            <div className="space-y-3">
              <Button className="w-full bg-black hover:bg-black/90 text-white" size="lg" onClick={toggleCreateMeeting}>
                Create Meeting
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Create Meeting Modal */}
      {isCreateMeetingOpen && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end justify-center">
          <div className="bg-white w-full h-[90%] rounded-t-[40px] p-6 space-y-6 transform transition-transform duration-300 ease-out translate-y-0 overflow-y-auto">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Create Meeting</h2>
              <Button variant="ghost" size="icon" className="rounded-full" onClick={toggleCreateMeeting}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Enter meeting description" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject-tag">Subject Tag</Label>
                <Select>
                  <SelectTrigger id="subject-tag">
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
                <Label htmlFor="open-time">Open Time</Label>
                <Input id="open-time" type="time" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="close-time">Close Time</Label>
                <Input id="close-time" type="time" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="max-participants">Max Participants</Label>
                <Input id="max-participants" type="number" min="1" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="max-share-time">Max Share Time (minutes)</Label>
                <Input id="max-share-time" type="number" min="1" />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="commenting-allowed" />
                <Label htmlFor="commenting-allowed">Commenting Allowed</Label>
              </div>
              <Button className="w-full bg-black hover:bg-black/90 text-white" size="lg">
                Create Meeting
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

function MeetingsList({ meetings }: { meetings: typeof meetings }) {
  const router = useRouter()

  return (
    <div className="grid grid-cols-1 gap-2">
      {meetings.map((meeting, index) => (
        <Card key={index} className={cn("overflow-hidden", `bg-gradient-to-br ${gradients[index % gradients.length]}`)}>
          <CardContent className="p-3 flex flex-col">
            <div className="flex justify-between items-start mb-2">
              <Badge variant="outline" className="text-xs">
                {meeting.tag}
              </Badge>
              <div className="flex items-center">
                <div className="flex -space-x-2 mr-1">
                  {[...Array(3)].map((_, i) => (
                    <Avatar key={i} className="w-5 h-5 border-2 border-white">
                      <AvatarFallback>U{i+1}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <span className="text-xs font-medium">{meeting.participants}</span>
              </div>
            </div>
            <h3 className="font-semibold text-sm mb-1 line-clamp-2">{meeting.name}</h3>
            <div className="flex justify-between items-end">
              <div className="flex items-center text-xs text-gray-600">
                <Clock className="w-3 h-3 mr-1" />
                <span>{meeting.startTime} - {meeting.closeTime}</span>
              </div>
              <Button
                size="sm"
                className="px-3 py-1 bg-white text-black hover:bg-gray-100 transition-colors duration-200 text-xs"
                onClick={() => router.push(`/meeting/${index}`)}
              >
                Join
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

