'use client'

import { motion } from 'motion/react'
import type { PropsWithChildren } from 'react'

interface FadeInProps extends PropsWithChildren {
  delay?: number
}

export const FadeIn = ({ 
  children, 
  delay = 0 
}: FadeInProps) => {
  return (
    <motion.div
      // Strictly opacity. Zero spatial movement.
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ 
        // Repeats the fade as elements enter/leave
        once: false, 
        // Triggers when 15% of the element is visible
        amount: 0.15,
      }}
      transition={{
        duration: 0.4, 
        delay: delay,
        ease: "easeOut", 
      }}
    >
      {children}
    </motion.div>
  )
}