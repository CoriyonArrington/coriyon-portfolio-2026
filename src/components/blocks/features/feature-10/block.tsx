'use client'

import {
  Badge,
  Box,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Span,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { LuPenTool, LuCode, LuTrendingUp, LuUsers, LuLayers, LuSparkles, LuLightbulb } from 'react-icons/lu'
import { useUiSounds } from '@/hooks/use-ui-sounds'

interface ServiceData {
  id: number | string
  title: string
  description: string
  icon_name?: string
  url?: string
}

interface BlockProps {
  dict?: any
  services: ServiceData[]
}

// Map string values from Supabase to actual React Icons
const getIcon = (iconName?: string) => {
  switch (iconName?.toLowerCase()) {
    case 'design': return <LuPenTool />
    case 'code': return <LuCode />
    case 'strategy': return <LuTrendingUp />
    case 'users': return <LuUsers />
    case 'workshop': return <LuLightbulb />
    case 'ai': return <LuSparkles />
    default: return <LuLayers />
  }
}

export const Block = ({ dict, services }: BlockProps) => {
  const { playHover } = useUiSounds()

  if (!services || services.length === 0) return null

  return (
    <Box>
      <Stack gap={{ base: '12', md: '16' }}>
        
        {/* Left-Aligned Header */}
        <Stack gap="4" align="flex-start" textAlign="left" w="full">
          <Badge size="lg" colorPalette="green" variant="subtle" rounded="full" px="3" py="1">
            {dict?.badge || "How I can help"}
          </Badge>
          <Heading as="h2" size="4xl" fontWeight="bold">
            {dict?.title || "Services & Offerings"}
          </Heading>
          <Text color="fg.muted" fontSize="lg" maxW="2xl">
            {dict?.description || "Whether you need a high-fidelity prototype to secure funding, or a fully functioning web app, I've got you covered."}
          </Text>
        </Stack>

        {/* 3x3 Grid layout */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={{ base: '8', md: '12' }}>
          {services.map((service) => (
            <VStack
              key={service.id}
              className="group"
              alignItems="flex-start"
              textAlign="left"
              transition="all 0.2s"
              _hover={{ transform: 'translateY(-4px)' }}
              onMouseEnter={playHover}
            >
              <Box
                w="14"
                h="14"
                borderRadius="2xl"
                bg="colorPalette.subtle"
                color="colorPalette.fg"
                display="flex"
                alignItems="center"
                justifyContent="center"
                mb="2"
              >
                <Icon size="xl" asChild>
                  {getIcon(service.icon_name)}
                </Icon>
              </Box>
              <HStack fontWeight="bold" color="fg" mt="2">
                <Span textStyle="xl">{service.title}</Span>
              </HStack>
              <Text color="fg.muted" mt="2" lineHeight="tall">
                {service.description}
              </Text>
            </VStack>
          ))}
        </SimpleGrid>
      </Stack>
    </Box>
  )
}