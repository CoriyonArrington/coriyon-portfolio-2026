'use client'

import { Badge, Box, Stack, Tabs, Text, VStack, Heading, Image } from '@chakra-ui/react'
import { TimerProgress } from './progress'
import { useTimedState } from './use-timed-state'
import { useUiSounds } from '@/hooks/use-ui-sounds'

interface FeatureProps {
  dict?: any
}

export const Block = ({ dict }: FeatureProps) => {
  const { playHover, playClick } = useUiSounds()

  const features = [
    {
      value: 'designer',
      title: dict?.features?.design?.title || "Think like a designer 🧠",
      description: dict?.features?.design?.description || "Crafting intuitive, accessible user experiences rooted in deep customer empathy. I champion user-centered methodologies to solve complex human problems.",
      imageSrc: "https://kkegducuyzwdmxlzhxcm.supabase.co/storage/v1/object/public/images/misc/the-next-step-guide.jpg",
    },
    {
      value: 'engineer',
      title: dict?.features?.engineer?.title || "Build like an engineer ⚙️",
      description: dict?.features?.engineer?.description || "Turning high-fidelity prototypes into production-ready reality. I build robust, scalable web and mobile applications utilizing Next.js, Supabase, and Chakra UI.",
      imageSrc: "https://kkegducuyzwdmxlzhxcm.supabase.co/storage/v1/object/public/images/misc/the-next-step-build.png",
    },
    {
      value: 'founder',
      title: dict?.features?.founder?.title || "Grow like a founder 🚀",
      description: dict?.features?.founder?.description || "Strategizing beyond the screen. I focus on business viability, MVP scoping, and speed-to-market to ensure the products we build actually drive growth and ROI.",
      imageSrc: "https://kkegducuyzwdmxlzhxcm.supabase.co/storage/v1/object/public/images/misc/the-next-step.png",
    },
  ]

  const [selected, setSelected] = useTimedState({
    defaultValue: features[0].value,
    timeout: 5000,
    values: features.map((feature) => feature.value),
  })

  return (
    <Box>
      <VStack gap={{ base: '8', md: '16' }} align="flex-start">
        <Stack gap={{ base: '10', md: '16' }} flex="1" w="full">
          
          <Stack gap="4" align="flex-start" textAlign="left">
            {(dict?.badge || "About Me") && (
              <Badge size="lg" colorPalette="green" variant="subtle" rounded="full" px="3" py="1">
                {dict?.badge || "About Me"}
              </Badge>
            )}
            <Heading as="h2" size="4xl" fontWeight="bold">
              {dict?.title || "The complete package"}
            </Heading>
            {(dict?.description || "Bridging the gap between design, technology, and business to bring high-impact digital products to life.") && (
              <Text color="fg.muted" fontSize="lg" maxW="2xl">
                {dict?.description || "Bridging the gap between design, technology, and business to bring high-impact digital products to life."}
              </Text>
            )}
          </Stack>

          <Tabs.Root
            hideBelow="md"
            size="lg"
            variant="subtle"
            value={selected}
            onValueChange={(e) => {
              playClick()
              setSelected(e.value)
            }}
          >
            <Tabs.List gap="4">
              {features.map((feature) => (
                <Tabs.Trigger
                  key={feature.title}
                  value={feature.value}
                  flex="1"
                  h="auto"
                  p="5"
                  rounded="l2"
                  textAlign="start"
                  onMouseEnter={playHover}
                >
                  <Stack>
                    {/* SVG Icons removed, text naturally left-aligned */}
                    <Text fontWeight="semibold">
                      {feature.title}
                    </Text>
                    <Text color="fg.muted" fontWeight="normal">
                      {feature.description}
                    </Text>
                    <TimerProgress key={selected} selected={selected === feature.value} />
                  </Stack>
                </Tabs.Trigger>
              ))}
            </Tabs.List>

            <Box 
              position="relative" 
              w="full" 
              aspectRatio={16 / 9} 
              mt="8"
              bg="bg.muted"
              borderRadius="l3" 
              overflow="hidden" 
              borderWidth="1px" 
              borderColor="border.subtle"
              shadow="sm"
            >
              {features.map((feature) => (
                <Image 
                  key={feature.value}
                  src={feature.imageSrc} 
                  alt={feature.title} 
                  position="absolute"
                  inset="0"
                  w="full" 
                  h="full" 
                  objectFit="cover" 
                  objectPosition="center"
                  opacity={selected === feature.value ? 1 : 0}
                  transition="opacity 0.4s ease-in-out"
                  pointerEvents={selected === feature.value ? "auto" : "none"}
                />
              ))}
            </Box>
          </Tabs.Root>

          {/* Mobile View */}
          <Stack gap="8" hideFrom="md">
            {features.map((feature) => (
              <Stack 
                key={feature.title} 
                gap="6"
                p="6"
                bg="bg.panel"
                borderRadius="l3"
                borderWidth="1px"
                borderColor="border.subtle"
              >
                <Stack>
                  {/* SVG Icons removed, text naturally left-aligned */}
                  <Text fontWeight="semibold">
                    {feature.title}
                  </Text>
                  <Text color="fg.muted" fontWeight="normal">
                    {feature.description}
                  </Text>
                </Stack>
                
                <Box w="full" aspectRatio={4 / 3} position="relative" borderRadius="l2" overflow="hidden" bg="bg.muted">
                  <Image 
                    src={feature.imageSrc} 
                    alt={feature.title} 
                    position="absolute"
                    inset="0"
                    w="full" 
                    h="full" 
                    objectFit="cover" 
                  />
                </Box>
              </Stack>
            ))}
          </Stack>

        </Stack>
      </VStack>
    </Box>
  )
}