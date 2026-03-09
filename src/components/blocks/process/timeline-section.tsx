'use client'

import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  Stack, 
  Badge, 
  Button, 
  SimpleGrid,
  Center
} from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { useScroll, useTransform, m, useSpring, LazyMotion, domAnimation } from 'motion/react'
import { LuDownload } from 'react-icons/lu'
import { useUiSounds } from '@/hooks/use-ui-sounds'
import { DownloadTrigger } from '@/components/ui/download-trigger'
import NextImage from 'next/image'
import dynamic from 'next/dynamic'

const LottiePlayer = dynamic(
  () => import('@lottiefiles/dotlottie-react').then(mod => mod.DotLottieReact), 
  { ssr: false }
)

interface TimelineStep {
  date: string
  heading: string
  description?: string
  details?: { label: string; value: string | string[] }[] 
  imageSrc?: string
  lottieUrl?: string 
}

interface TimelineSectionProps {
  dict?: {
    badge?: string
    title?: string
    description?: string
    steps?: TimelineStep[]
    viewProcess?: string
    showMore?: string
  }
}

const GAP_MD = "48px" 
const GAP_LG = "128px" 

export const Block = ({ dict }: TimelineSectionProps) => {
  const { playHover, playClick, playSuccess } = useUiSounds()
  const sectionRef = useRef<HTMLElement | null>(null)
  const steps = dict?.steps || []
  
  const [isExpanded, setIsExpanded] = useState(false)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"]
  })

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const visibleSteps = isExpanded ? steps : steps.slice(0, 3)

  if (!steps || steps.length === 0) return null;

  return (
    <LazyMotion features={domAnimation}>
      <Box 
        as="section" 
        py={{ base: '16', md: '24', lg: '32' }} 
        ref={sectionRef as unknown as React.RefObject<HTMLDivElement>} 
        className="pattern-dots"
        overflowX="clip" // FIX: Localized clipping prevents horizontal scroll without breaking anchor links
        w="full"
      >
        <Container maxW="7xl">
          <SimpleGrid 
            columns={{ base: 1, md: 2 }} 
            gap={{ base: '12', md: GAP_MD, lg: GAP_LG }} 
            alignItems="stretch" 
          >
            
            <Box height="100%">
              <Box 
                position={{ base: 'relative', md: 'sticky' }} 
                top={{ base: 'auto', md: '140px' }} 
                zIndex="10"
              >
                <m.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
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
                </m.div>
              </Box>
            </Box>

            <Box position="relative">
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
                <m.div
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
                {visibleSteps.map((step, index) => (
                  <TimelineStepItem key={index} step={step} index={index} />
                ))}

                {!isExpanded && steps.length > 3 && (
                  <Center pt={{ base: '4', md: '8' }}>
                    <Button
                      variant="outline"
                      colorPalette="gray"
                      size="xl"
                      rounded="full"
                      onClick={() => {
                        playClick()
                        setIsExpanded(true)
                      }}
                      onMouseEnter={playHover}
                    >
                      {dict?.showMore || "Show more steps"}
                    </Button>
                  </Center>
                )}
              </Stack>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>
    </LazyMotion>
  )
}

const TimelineStepItem = ({ step, index }: { step: TimelineStep, index: number }) => {
  const itemRef = useRef<HTMLDivElement>(null)
  const { playHover } = useUiSounds()

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
        <m.div
          style={{
            backgroundColor: dotBg,
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            border: '4px solid var(--chakra-colors-bg-canvas)',
          }}
        />
      </Box>

      <m.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }} 
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Stack gap="6">
          <Stack gap="3">
            <Text fontWeight="bold" color="green.500" fontSize="sm" letterSpacing="widest" textTransform="uppercase">
              {step.date || `Step 0${index + 1}`}
            </Text>
            <Heading size="3xl">{step.heading}</Heading>
            
            {step.description && (
              <Text color="fg.muted" fontSize="md" lineHeight="relaxed">
                {step.description}
              </Text>
            )}
          </Stack>
          
          {(step.imageSrc || step.lottieUrl) && (
            <m.div
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              onHoverStart={() => playHover()}
              style={{ width: '100%', cursor: 'default' }}
            >
              <Box 
                borderRadius="l3" 
                overflow="hidden" 
                borderWidth="1px" 
                borderColor="border.subtle"
                bg="bg.muted"
                aspectRatio={4/3}
                shadow="sm"
                position="relative"
                role="group"
              >
                {step.lottieUrl ? (
                  <Box position="absolute" inset="0" zIndex="1">
                    <LottiePlayer
                      src={step.lottieUrl}
                      loop
                      autoplay
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </Box>
                ) : step.imageSrc ? (
                  <Box 
                    position="absolute" 
                    inset="0" 
                    transition="transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
                    _groupHover={{ transform: "scale(1.05)" }}
                  >
                    <NextImage 
                      src={step.imageSrc} 
                      alt={step.heading} 
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </Box>
                ) : null}
              </Box>
            </m.div>
          )}

          {step.details && step.details.length > 0 && (
            <Stack gap="4" mt="2">
              {step.details.map((detail, idx) => (
                <Box 
                  key={idx} 
                  bg="bg.panel"
                  p={{ base: "6", md: "8" }}
                  rounded="3xl" 
                  borderWidth="1px" 
                  borderColor="border.subtle"
                  shadow="sm"
                  transition="all 0.2s"
                  _hover={{ transform: 'translateY(-2px)', shadow: 'md' }}
                >
                  <Heading size="lg" color="fg.default">{detail.label}</Heading>
                  {Array.isArray(detail.value) ? (
                    <Stack as="ul" pl="4" gap="2" mt="3" style={{ listStyleType: 'disc' }}>
                      {detail.value.map((v, i) => (
                        <Box as="li" key={i} color="fg.muted" lineHeight="relaxed">{v}</Box>
                      ))}
                    </Stack>
                  ) : (
                    <Text color="fg.muted" mt="2" lineHeight="relaxed">{detail.value}</Text>
                  )}
                </Box>
              ))}
            </Stack>
          )}
        </Stack>
      </m.div>
    </Box>
  )
}