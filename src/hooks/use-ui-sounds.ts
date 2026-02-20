'use client'

import { Howl, Howler } from 'howler'
import { useEffect, useRef, useState } from 'react'

let sounds: Record<string, Howl> | null = null

// We only initialize Howler in the browser to prevent Next.js build crashes
if (typeof window !== 'undefined') {
  sounds = {
    hover: new Howl({ src: ['/sounds/hover.mp3'], volume: 0.15, preload: true }),
    click: new Howl({ src: ['/sounds/click.mp3'], volume: 0.2, preload: true }),
    switch: new Howl({ src: ['/sounds/switch.mp3'], volume: 0.4, preload: true }),
    success: new Howl({ src: ['/sounds/success.mp3'], volume: 0.4, preload: true }),
    whoosh: new Howl({ src: ['/sounds/whoosh.mp3'], volume: 0.3, preload: true }),
    soundtoggle: new Howl({ src: ['/sounds/soundtoggle.mp3'], volume: 0.5, preload: true })
  }
}

// Global state to sync the mute button across all components immediately
let globalMuted = false
const listeners = new Set<Function>()

const setGlobalMuted = (muted: boolean) => {
  globalMuted = muted
  Howler.mute(muted)
  listeners.forEach(fn => fn(muted))
}

export const useUiSounds = () => {
  const isReady = useRef(false)
  const [isMuted, setIsMuted] = useState(globalMuted)

  useEffect(() => {
    isReady.current = true
    const handleMuteChange = (muted: boolean) => setIsMuted(muted)
    listeners.add(handleMuteChange)
    return () => {
      listeners.delete(handleMuteChange)
    }
  }, [])

  const toggleMute = () => {
    const nextState = !isMuted
    if (!nextState && isReady.current && sounds) {
      // Unmuting: unmute first, then play the toggle sound
      setGlobalMuted(false)
      sounds.soundtoggle.play()
    } else {
      // Muting: just instantly silence everything
      setGlobalMuted(true)
    }
  }

  const playHover = () => { if (isReady.current && !globalMuted && sounds) sounds.hover.play() }
  const playClick = () => { if (isReady.current && !globalMuted && sounds) sounds.click.play() }
  const playSwitch = () => { if (isReady.current && !globalMuted && sounds) sounds.switch.play() }
  const playSuccess = () => { if (isReady.current && !globalMuted && sounds) sounds.success.play() }
  const playWhoosh = () => { if (isReady.current && !globalMuted && sounds) sounds.whoosh.play() }

  return { playHover, playClick, playSwitch, playSuccess, playWhoosh, toggleMute, isMuted }
}