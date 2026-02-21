'use client'

import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  Stack, 
  Badge, 
  Button, 
  Image, 
  SimpleGrid
} from '@chakra-ui/react'
import { useRef } from 'react'
import { useScroll, useTransform, motion, useSpring } from 'motion/react'
import { LuDownload } from 'react-icons/lu'
import { useUiSounds } from '@/hooks/use-ui-sounds'
import { DownloadTrigger } from '@/components/ui/download-trigger'

interface TimelineStep {
  date: string
  heading: string
  description: string
  imageSrc: string
}

interface TimelineSectionProps {
  dict?: {
    badge?: string
    title?: string
    description?: string
    steps?: TimelineStep[]
    viewProcess?: string
  }
}

const GAP_MD = "48px" 
const GAP_LG = "128px" 

export const Block = ({ dict }: TimelineSectionProps) => {
  const { playHover, playClick, playSuccess } = useUiSounds()
  const sectionRef = useRef<HTMLElement | null>(null)
  const steps = dict?.steps || []

  // 1. Center Line Scroll Animation (We keep this because we want it to animate)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"]
  })

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <>
      {/* THE STICKY FIX: 
        If a parent container (like body or html) has overflow-x: hidden, 
        CSS position: sticky is instantly broken. Changing it to 'clip' 
        maintains the exact same protection against horizontal scrolling 
        while allowing sticky elements to function natively without lag!
      */}
      <style dangerouslySetInnerHTML={{ __html: `
        html, body {
          overflow-x: clip !important;
        }
      `}} />

      <Box 
        as="section" 
        py={{ base: '16', md: '24', lg: '32' }} 
        ref={sectionRef as unknown as React.RefObject<HTMLDivElement>} 
        className="pattern-dots"
      >
        <Container maxW="7xl">
          {/* alignItems="stretch" ensures the left column is exactly 
              as tall as the timeline steps, creating the "track" */}
          <SimpleGrid 
            columns={{ base: 1, md: 2 }} 
            gap={{ base: '12', md: GAP_MD, lg: GAP_LG }} 
            alignItems="stretch" 
          >
            
            {/* LEFT COLUMN: The Track */}
            <Box height="100%">
              {/* Native CSS Sticky Element (Zero Lag, Perfectly Still) */}
              <Box 
                position={{ base: 'relative', md: 'sticky' }} 
                top={{ base: 'auto', md: '140px' }} // Clears the navbar perfectly
                zIndex="10"
              >
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <Stack gap="6" align="flex-start">
                    {dict?.badge && (
                      <Badge variant="subtle" colorPalette="green" size="lg" rounded="full" px="3" py="1">
                        {dict.badge}
                      </Badge>
                    )}
                    
                    <Heading as="h2" size={{ base: "3xl", md: "4xl" }} fontWeight="bold" lineHeight="tight">
                      {dict?.title || "My creative process"}
                    </Heading>
                    
                    <Text color="fg.muted" fontSize="lg" maxW="md">
                      {dict?.description || "How I take ideas from initial concept to production-ready products."}
                    </Text>
                    
                    <DownloadTrigger 
                      value="/Coriyon-Studio-Design-Process.pdf"
                      fileName="Coriyon_Design_Process.pdf"
                    >
                      <Button 
                        variant="solid" 
                        size="2xl" 
                        colorPalette="gray" 
                        onClick={() => { playClick(); playSuccess(); }}
                        onMouseEnter={playHover}
                      >
                        {dict?.viewProcess || "Download Process PDF"} <LuDownload />
                      </Button>
                    </DownloadTrigger>
                  </Stack>
                </motion.div>
              </Box>
            </Box>

            {/* RIGHT COLUMN: Progress Line & Steps */}
            <Box position="relative">
               {/* Animated Center Progress Line */}
               <Box 
                hideBelow="md"
                position="absolute" 
                left={{ md: `calc(-${GAP_MD} / 2 - 2px)`, lg: `calc(-${GAP_LG} / 2 - 2px)` }}
                top="0"
                bottom="0"
                w="4px" 
                zIndex="1"
              >
                <Box h="full" w="full" bg="border.subtle" borderRadius="full" />
                <motion.div
                  style={{
                    scaleY,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '100%',
                    backgroundColor: 'var(--chakra-colors-green-500)',
                    transformOrigin: 'top',
                    borderRadius: 'full'
                  }}
                />
              </Box>

              <Stack gap={{ base: '16', md: '40' }} pt={{ base: '0', md: '8' }}>
                {steps.map((step, index) => (
                  <TimelineStepItem key={index} step={step} index={index} />
                ))}
              </Stack>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>
    </>
  )
}

const TimelineStepItem = ({ step, index }: { step: TimelineStep, index: number }) => {
  const itemRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ['start 80%', 'start 55%'],
  })

  const dotBg = useTransform(
    scrollYProgress, 
    [0, 1], 
    ['var(--chakra-colors-border-subtle)', 'var(--chakra-colors-green-500)']
  )

  return (
    <Box position="relative" ref={itemRef}>
      <Box 
        hideBelow="md"
        position="absolute" 
        left={{ 
          md: `calc(-${GAP_MD} / 2 - 10px)`, 
          lg: `calc(-${GAP_LG} / 2 - 10px)` 
        }} 
        top="8" 
        zIndex="20"
      >
        <motion.div
          style={{
            backgroundColor: dotBg,
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            border: '4px solid var(--chakra-colors-bg-canvas)',
          }}
        />
      </Box>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Stack gap="6">
          <Stack gap="3">
            <Text fontWeight="bold" color="green.500" fontSize="sm" letterSpacing="widest" textTransform="uppercase">
              Step 0{index + 1}
            </Text>
            <Heading size="3xl">{step.heading}</Heading>
            <Text color="fg.muted" fontSize="md" lineHeight="relaxed">
              {step.description}
            </Text>
          </Stack>
          
          <Box 
            borderRadius="l3" 
            overflow="hidden" 
            borderWidth="1px" 
            borderColor="border.subtle"
            bg="bg.muted"
            aspectRatio={4/3}
            shadow="sm"
          >
            <Image 
              src={step.imageSrc} 
              alt={step.heading} 
              w="full" 
              h="full" 
              objectFit="cover" 
            />
          </Box>
        </Stack>
      </motion.div>
    </Box>
  )
}