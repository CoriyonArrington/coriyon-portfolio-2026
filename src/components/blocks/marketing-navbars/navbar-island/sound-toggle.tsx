'use client'

import { IconButton } from '@chakra-ui/react'
import { LuVolume2, LuVolumeX } from 'react-icons/lu'
import { useUiSounds } from '@/hooks/use-ui-sounds'

export const SoundToggle = () => {
  const { toggleMute, isMuted, playHover } = useUiSounds()

  return (
    <IconButton
      aria-label={isMuted ? "Enable sounds" : "Disable sounds"}
      variant="ghost"
      size="sm"
      colorPalette="green"
      // Show as subtle grey when muted, but vibrant green when active
      color={isMuted ? "fg.muted" : "colorPalette.fg"}
      _hover={{ color: 'colorPalette.fg', bg: 'colorPalette.subtle' }}
      onClick={toggleMute}
      onMouseEnter={playHover}
    >
      {isMuted ? <LuVolumeX /> : <LuVolume2 />}
    </IconButton>
  )
}