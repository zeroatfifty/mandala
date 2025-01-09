"use client"

import React from 'react'
import { Button } from "@/components/ui/button"
import { Video } from 'lucide-react'
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"

interface RecordingUIProps {
  className?: string
}

export function RecordingUI({ className }: RecordingUIProps) {
  const [isAnonymous, setIsAnonymous] = React.useState(false)

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-[120px] aspect-[9/16] bg-white/5 rounded-xl border-2 border-white/20 ring-2 ring-white/10 mb-6 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-blue-500/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Video className="w-8 h-8 text-white/40" />
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="flex items-center space-x-2 mb-4"
      >
        <Switch
          id="anonymous-mode"
          checked={isAnonymous}
          onCheckedChange={setIsAnonymous}
          className="data-[state=checked]:bg-gradient-to-r from-pink-500 to-blue-500"
        />
        <Label htmlFor="anonymous-mode" className="text-sm text-white/80">
          Share anonymously
        </Label>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <Button 
          variant="outline"
          size="lg"
          className="rounded-full bg-white/5 border-white/20 text-white hover:bg-white/10 hover:text-white space-x-2"
        >
          <Video className="w-4 h-4" />
          <span>Record</span>
        </Button>
      </motion.div>
    </div>
  )
}

