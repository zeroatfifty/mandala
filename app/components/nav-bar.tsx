"use client"

import React from 'react'
import { Home, FileText, MessageSquare, Settings, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { usePathname, useRouter } from 'next/navigation'

interface NavBarProps {
  onCreateNew: () => void;
}

export function NavBar({ onCreateNew }: NavBarProps) {
  const router = useRouter()
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  const navigate = (path: string) => {
    router.push(path)
  }

  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-[#14132A]/90 backdrop-blur-xl rounded-full flex justify-around items-center p-2 shadow-lg border border-white/10 w-[90%] max-w-[330px] z-50">
      <Button 
        variant="ghost"
        size="icon" 
        onClick={() => navigate('/home')}
        aria-label="Home"
        className={`${
          isActive('/home') 
            ? 'text-white bg-white/10' 
            : 'text-white/60 hover:text-white hover:bg-white/10'
        } rounded-full transition-colors p-2`}
      >
        <Home className="h-5 w-5" />
      </Button>
      <Button 
        variant="ghost"
        size="icon" 
        onClick={() => navigate('/shares')}
        aria-label="Shares"
        className={`${
          isActive('/shares') 
            ? 'text-white bg-white/10' 
            : 'text-white/60 hover:text-white hover:bg-white/10'
        } rounded-full transition-colors p-2`}
      >
        <FileText className="h-5 w-5" />
      </Button>
      <Button 
        onClick={onCreateNew} 
        size="icon" 
        className="rounded-full bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white p-2"
        aria-label="Create New"
      >
        <Plus className="h-5 w-5" />
      </Button>
      <Button 
        variant="ghost"
        size="icon" 
        onClick={() => navigate('/messages')}
        aria-label="Messages"
        className={`${
          isActive('/messages') 
            ? 'text-white bg-white/10' 
            : 'text-white/60 hover:text-white hover:bg-white/10'
        } rounded-full transition-colors p-2`}
      >
        <MessageSquare className="h-5 w-5" />
      </Button>
      <Button 
        variant="ghost"
        size="icon" 
        onClick={() => navigate('/settings')}
        aria-label="Settings"
        className={`${
          isActive('/settings') 
            ? 'text-white bg-white/10' 
            : 'text-white/60 hover:text-white hover:bg-white/10'
        } rounded-full transition-colors p-2`}
      >
        <Settings className="h-5 w-5" />
      </Button>
    </div>
  )
}

