'use client'

import { Accordion, Box, Flex, HStack, Icon, Stack } from '@chakra-ui/react'
import { useState, ReactNode } from 'react'
import { SectionHeader } from './section-header'
import { useUiSounds } from '@/hooks/use-ui-sounds'
import Image from 'next/image'

interface FeatureItem {
  value: string
  icon: ReactNode
  title: string
  description: string
  imageSrc?: string
}

interface FeatureProps {
  badge?: ReactNode
  title?: ReactNode
  description?: ReactNode
  features: FeatureItem[]
  mockupType?: string | null
}

export const Block = ({ badge, title, description, features, mockupType }: FeatureProps) => {
  const [selected, setSelected] = useState<string[]>([features[0]?.value || ''])
  const { playClick, playHover } = useUiSounds()

  if (!features || features.length === 0) return null

  // Mockup normalization logic
  const normalizedMockupType = mockupType?.toString().toLowerCase().trim()
  const isTablet = normalizedMockupType === 'tablet' || normalizedMockupType === 'ipad'
  const isPhone = normalizedMockupType === 'phone' || normalizedMockupType === 'mobile' || normalizedMockupType === 'iphone'
  const showMockup = isTablet || isPhone

  return (
    <Box w="full">
      <Flex direction={{ base: 'column', md: 'row' }} gap={{ base: '8', md: '20' }}>
        <Stack gap="6" pt="2" flex="1">
          <SectionHeader
            tagline={badge}
            headline={title}
            description={description}
          />
          <Accordion.Root
            variant="plain"
            size="lg"
            value={selected}
            onValueChange={(e) => {
              playClick()
              setSelected(e.value)
            }}
          >
            {features.map((feature) => (
              <Accordion.Item key={feature.value} value={feature.value}>
                <Accordion.ItemTrigger
                  fontWeight="semibold"
                  alignItems="center"
                  _expanded={{ color: 'colorPalette.fg' }}
                  onMouseEnter={playHover}
                >
                  <HStack flex="1">
                    {feature.icon && <Icon size="md">{feature.icon}</Icon>}
                    {feature.title}
                  </HStack>
                  <Accordion.ItemIndicator />
                </Accordion.ItemTrigger>
                <Accordion.ItemContent>
                  <Accordion.ItemBody>
                    <Stack gap="5">
                      {feature.description}
                      {/* The massive mobile image block that used to be rendered inside 
                        this accordion body has been removed to prevent the layout collapse jump! 
                      */}
                    </Stack>
                  </Accordion.ItemBody>
                </Accordion.ItemContent>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </Stack>

        {/* Shared Image Display (Now handles both Desktop & Mobile perfectly) */}
        <Box flex="1" w="full" position="relative" display="flex" justifyContent="center" alignItems="center">
          {showMockup ? (
            <Box position="relative" w="full" maxW={isTablet ? "100%" : "320px"} aspectRatio={isTablet ? '1106/814' : '1/2'}>
              {/* Inner screen crossfade container */}
              <Box position="absolute" inset={isTablet ? "4.8% 4.2%" : "1.8% 5%"} borderRadius={isTablet ? "md" : "3rem"} overflow="hidden" bg="black" zIndex="0">
                {features.map((feature) => (
                  <Box
                    key={feature.value}
                    position="absolute"
                    inset="0"
                    opacity={selected[0] === feature.value ? 1 : 0}
                    transition="opacity 0.4s ease-in-out"
                    zIndex={selected[0] === feature.value ? 1 : 0}
                  >
                    {feature.imageSrc && (
                      <Image src={feature.imageSrc} alt={feature.title} fill style={{ objectFit: 'cover' }} priority={selected[0] === feature.value} />
                    )}
                  </Box>
                ))}
              </Box>
              {/* Device Frame */}
              <Box position="relative" h="full" w="full" zIndex="1" pointerEvents="none">
                <Image
                  src={isTablet ? "https://kkegducuyzwdmxlzhxcm.supabase.co/storage/v1/object/public/images/misc/ipad-mockup-optimized.png" : "https://kkegducuyzwdmxlzhxcm.supabase.co/storage/v1/object/public/images/misc/iphone-mockup.png"}
                  alt={`${normalizedMockupType} mockup`}
                  fill
                  unoptimized={true}
                  style={{ objectFit: 'contain' }}
                />
              </Box>
            </Box>
          ) : (
            <Box w="full" h="full" minH={{ base: 'sm', md: 'md' }} borderRadius="2xl" overflow="hidden" bg="bg.muted" borderWidth="1px" borderColor="border.subtle" shadow="sm" position="relative">
              {features.map((feature) => (
                <Box
                  key={feature.value}
                  position="absolute"
                  inset="0"
                  opacity={selected[0] === feature.value ? 1 : 0}
                  transition="opacity 0.4s ease-in-out"
                  zIndex={selected[0] === feature.value ? 1 : 0}
                >
                  {feature.imageSrc && (
                    <Image src={feature.imageSrc} alt={feature.title} fill style={{ objectFit: 'cover' }} priority={selected[0] === feature.value} />
                  )}
                </Box>
              ))}
            </Box>
          )}
        </Box>
        
      </Flex>
    </Box>
  )
}