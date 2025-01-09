"use client"

import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, X, Users } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"

const filterTags = [
  { name: "Alcohol", color: "bg-red-200 text-red-800" },
  { name: "Gambling", color: "bg-blue-200 text-blue-800" },
  { name: "Sex", color: "bg-pink-200 text-pink-800" },
  { name: "Narcotics", color: "bg-purple-200 text-purple-800" },
  { name: "Food", color: "bg-green-200 text-green-800" },
  { name: "ADHD", color: "bg-yellow-200 text-yellow-800" }
]

const friends = [
  { id: 1, username: 'johndoit', avatar: '/avatars/john.jpg' },
  { id: 2, username: 'm4th4s40', avatar: '/avatars/math.jpg' },
  { id: 3, username: 'jobe100', avatar: '/avatars/joe.jpg' },
  { id: 4, username: 'vaness4', avatar: '/avatars/vanessa.jpg' },
  { id: 5, username: 'e.drt', avatar: '/avatars/edrt.jpg' },
  { id: 6, username: 'xtrnbit', avatar: '/avatars/xtrnbit.jpg' },
  { id: 7, username: 'djembooms', avatar: '/avatars/djembooms.jpg' },
  { id: 8, username: 'bound2relax', avatar: '/avatars/bound2relax.jpg' },
  { id: 9, username: 'donastro', avatar: '/avatars/donastro.jpg' },
  { id: 10, username: 'mathilde00', avatar: '/avatars/mathilde.jpg' },
  { id: 11, username: 'elizabooth', avatar: '/avatars/elizabeth.jpg' },
  { id: 12, username: 'julessprm8', avatar: '/avatars/jules.jpg' },
  { id: 13, username: 'kronomsc', avatar: '/avatars/krono.jpg' },
]

export default function CreateMeeting() {
  const router = useRouter()
  const [isInviteModalOpen, setIsInviteModalOpen] = React.useState(false)
  const [selectedFriends, setSelectedFriends] = React.useState<number[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push('/home')
  }

  const toggleFriendSelection = (friendId: number) => {
    setSelectedFriends(prev => 
      prev.includes(friendId) 
        ? prev.filter(id => id !== friendId)
        : [...prev, friendId]
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-[375px] h-[812px] bg-white rounded-[60px] relative overflow-hidden shadow-xl border-8 border-gray-900">
        <div className="h-6 w-40 bg-black absolute top-0 left-1/2 -translate-x-1/2 rounded-b-3xl" />
        <div className="h-full pt-8 pb-8 flex flex-col">
          <div className="text-center font-semibold mb-4">9:41</div>
          <div className="flex-1 overflow-auto px-4 space-y-4">
            <div className="flex items-center">
              <Button variant="ghost" size="sm" onClick={() => router.push('/home')}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-semibold ml-2">Create Circle</h1>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Circle Title</Label>
                <Input id="title" placeholder="Enter circle title" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Enter circle description" />
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
                <Label htmlFor="start-time">Start Time</Label>
                <Input id="start-time" type="datetime-local" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Open for (hours)</Label>
                <Input 
                  id="duration" 
                  type="number" 
                  min="1" 
                  max="24" 
                  placeholder="Enter duration in hours"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="max-participants">Max Participants</Label>
                <Input 
                  id="max-participants" 
                  type="number" 
                  min="1" 
                  placeholder="Enter maximum participants"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="max-share-time">Max Share Time (minutes)</Label>
                <Input 
                  id="max-share-time" 
                  type="number" 
                  min="1" 
                  placeholder="Enter maximum share time"
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="commenting-allowed">Commenting Allowed</Label>
                <Switch id="commenting-allowed" />
              </div>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => setIsInviteModalOpen(true)}
              >
                <Users className="w-4 h-4 mr-2" />
                Invite Friends
              </Button>
              <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800">
                Create Circle
              </Button>
            </form>
          </div>
        </div>
        <div className="h-1 w-32 bg-black rounded-full mx-auto absolute bottom-2 left-1/2 transform -translate-x-1/2" />

        {/* Invite Friends Modal */}
        {isInviteModalOpen && (
          <div className="absolute inset-0 z-50">
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-x-0 bottom-0 bg-black rounded-t-[40px] p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-white">Tag your friends</h2>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="text-white hover:text-white/80"
                  onClick={() => setIsInviteModalOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <ScrollArea className="h-[400px] pr-4">
                <div className="grid grid-cols-3 gap-4">
                  {friends.map((friend) => (
                    <button
                      key={friend.id}
                      className="flex flex-col items-center space-y-2"
                      onClick={() => toggleFriendSelection(friend.id)}
                    >
                      <div className={`relative rounded-full ${
                        selectedFriends.includes(friend.id) 
                          ? "ring-2 ring-blue-500" 
                          : ""
                      }`}>
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={friend.avatar} alt={friend.username} />
                          <AvatarFallback>{friend.username[0]}</AvatarFallback>
                        </Avatar>
                      </div>
                      <span className="text-xs text-gray-400">{friend.username}</span>
                    </button>
                  ))}
                </div>
              </ScrollArea>
              <Button 
                className="w-full mt-6 bg-white text-black hover:bg-white/90"
                onClick={() => setIsInviteModalOpen(false)}
              >
                Add to your circle
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

