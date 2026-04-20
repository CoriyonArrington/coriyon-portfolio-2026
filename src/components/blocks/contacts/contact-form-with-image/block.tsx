'use client'

import { Box, Badge } from '@chakra-ui/react'
import { SplitScreenHeroLayout } from '@/components/blocks/heroes/split-screen-hero-layout/block'
import { ContactForm } from './contact-form'
import NextImage from 'next/image'
import { useMemo } from 'react'

interface ContactBlockProps {
  dict?: any
}

export const Block = ({ dict }: ContactBlockProps) => {
  const rawTitle = dict?.headline || "Let's build *something great.*"
  
  const { displayTitle, highlightQueries } = useMemo(() => {
    const matches = rawTitle.match(/\*(.*?)\*/g)
    const queries = matches ? matches.map((m: string) => m.replace(/\*/g, '')) : []
    const cleanText = rawTitle.replace(/\*/g, '')
    return { displayTitle: cleanText, highlightQueries: queries }
  }, [rawTitle])

  return (
    <SplitScreenHeroLayout
      badge={
        <Badge size="lg" variant="subtle" colorPalette="gray" rounded="full" px="4" py="1">
          {dict?.tagline || "Get in touch"}
        </Badge>
      }
      title={displayTitle}
      highlightQueries={highlightQueries}
      description={dict?.description || "Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible."}
      actions={
        <Box w="full" mt="4">
          <ContactForm w="full" />
        </Box>
      }
    >
      <Box 
        position="relative" 
        w="full" 
        h={{ base: 'md', md: 'full' }} 
        minH={{ md: '600px', lg: '800px' }} 
        rounded="3xl" 
        overflow="hidden" 
        shadow="2xl" 
        borderWidth="1px" 
        borderColor="border.subtle"
        bg="bg.muted"
      >
        <NextImage 
          src={dict?.imageUrl || "https://kkegducuyzwdmxlzhxcm.supabase.co/storage/v1/object/public/images/misc/the-next-step.png"} 
          alt="Contact me" 
          fill 
          style={{ objectFit: 'cover' }} 
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </Box>
    </SplitScreenHeroLayout>
  )
}