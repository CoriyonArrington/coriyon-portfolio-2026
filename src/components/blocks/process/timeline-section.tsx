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
  SimpleGrid,
  Center
} from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { useScroll, useTransform, motion, useSpring, AnimatePresence } from 'motion/react'
import { LuDownload } from 'react-icons/lu'
import { useUiSounds } from '@/hooks/use-ui-sounds'
import { DownloadTrigger } from '@/components/ui/download-trigger'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

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
    <>
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
                <AnimatePresence mode="popLayout">
                  {visibleSteps.map((step, index) => (
                    <TimelineStepItem key={index} step={step} index={index} />
                  ))}
                </AnimatePresence>

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
    </>
  )
}

const TimelineStepItem = ({ step, index }: { step: TimelineStep, index: number }) => {
  const itemRef = useRef<HTMLDivElement>(null)
  const { playHover } = useUiSounds()
  const [isLottieReady, setIsLottieReady] = useState(false)

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
              {step.date || `Step 0${index + 1}`}
            </Text>
            <Heading size="3xl">{step.heading}</Heading>
            
            {step.description && (
              <Text color="fg.muted" fontSize="md" lineHeight="relaxed">
                {step.description}
              </Text>
            )}
          </Stack>
          
          {/* REORDERED: Image sits right below the header */}
          {step.imageSrc && (
            <motion.div
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
                <Image 
                  src={step.imageSrc} 
                  alt={step.heading} 
                  w="full" 
                  h="full" 
                  objectFit="cover" 
                  transition="transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
                  _groupHover={{ transform: (step.lottieUrl && isLottieReady) ? "none" : "scale(1.05)" }}
                />

                {step.lottieUrl && (
                  <Box 
                    position="absolute" 
                    inset="0" 
                    zIndex="1" 
                    bg={isLottieReady ? "bg.muted" : "transparent"} 
                    opacity={isLottieReady ? 1 : 0}
                    transition="opacity 0.5s ease"
                  >
                    <DotLottieReact
                      src={step.lottieUrl}
                      loop
                      autoplay
                      dotLottieRefCallback={(dotLottie: any) => {
                        if (dotLottie) {
                          dotLottie.addEventListener('load', () => setIsLottieReady(true));
                          dotLottie.addEventListener('error', () => setIsLottieReady(false));
                        }
                      }}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </Box>
                )}
              </Box>
            </motion.div>
          )}

          {/* REORDERED: Details provide additional context below the image */}
          {step.details && step.details.length > 0 && (
            <Stack gap="4" mt="2">
              {step.details.map((detail, idx) => (
                <Box key={idx} bg="bg.panel" p="4" rounded="2xl" borderWidth="1px" borderColor="border.subtle">
                  <Text fontWeight="semibold" color="fg.default">{detail.label}</Text>
                  {Array.isArray(detail.value) ? (
                    <Stack as="ul" pl="4" gap="2" mt="2" style={{ listStyleType: 'disc' }}>
                      {detail.value.map((v, i) => (
                        <Box as="li" key={i} color="fg.muted" fontSize="sm">{v}</Box>
                      ))}
                    </Stack>
                  ) : (
                    <Text color="fg.muted" fontSize="sm" mt="1">{detail.value}</Text>
                  )}
                </Box>
              ))}
            </Stack>
          )}
        </Stack>
      </motion.div>
    </Box>
  )
}