'use client'

import { Badge, Box, Card, Container, Grid, GridItem, Heading, Stack, Text } from '@chakra-ui/react'
import Image from 'next/image'

interface BentoFeature {
  title: string;
  description: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
  colSpan?: number;
}

interface BentoGridProps {
  badge?: string; // NEW Prop
  title?: string;
  description?: string;
  features: BentoFeature[];
}

export const Block = ({ badge, title, description, features }: BentoGridProps) => {
  if (!features || features.length === 0) return null;

  return (
    <Stack gap={{ base: '10', md: '14' }} w="full">
      {(badge || title || description) && (
        <Stack gap="4" align="flex-start" maxW="3xl">
          {/* NEW: Render the badge if it exists */}
          {badge && (
            <Badge size="lg" colorPalette="green" variant="subtle" rounded="full" px="3" py="1">
              {badge}
            </Badge>
          )}
          {title && (
            <Heading size={{ base: '4xl', md: '5xl' }} fontWeight="bold" letterSpacing="tight">
              {title}
            </Heading>
          )}
          {description && (
            <Text color="fg.muted" textStyle="lg">
              {description}
            </Text>
          )}
        </Stack>
      )}

      {/* ... Rest of the existing Grid code ... */}
      <Grid
        templateColumns={{ base: '1fr', md: 'repeat(6, 1fr)' }}
        autoRows={{ base: '400px', md: 'minmax(380px, 1fr)' }}
        gap={{ base: 6, md: 8 }}
        alignItems="stretch"
      >
        {features.map((feature, index) => (
          <GridItem colSpan={{ base: 1, md: feature.colSpan || 3 }} key={index}>
             {/* ... your existing Card.Root code ... */}
             <Card.Root 
              variant="subtle" 
              height="full" 
              bg="bg.panel" 
              borderRadius="3xl" 
              overflow="hidden" 
              borderWidth="1px" 
              borderColor="border.subtle"
              shadow="sm"
              transition="all 0.2s"
              _hover={{ shadow: 'md', transform: 'translateY(-2px)' }}
            >
              <Card.Body flex="0" px={{ base: 6, md: 8 }} pt={{ base: 6, md: 8 }} pb="6" zIndex={2}>
                <Text textStyle="2xl" fontWeight="semibold" mb="2" color="fg.default">
                  {feature.title}
                </Text>
                <Text color="fg.muted" fontSize="lg">
                  {feature.description}
                </Text>
              </Card.Body>
              
              <Card.Footer flex="1" p="0" position="relative" minH="200px" overflow="hidden">
                <Box position="absolute" inset="0" top="auto" height="100%" width="100%" display="flex" alignItems="flex-end" justifyContent="center">
                  {feature.mediaType === 'video' ? (
                    <video src={feature.mediaUrl} autoPlay loop muted playsInline style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                  ) : feature.mediaUrl ? (
                    <Image src={feature.mediaUrl} alt={feature.title} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 50vw" />
                  ) : (
                    <Box bg="bg.muted" w="full" h="full" />
                  )}
                </Box>
              </Card.Footer>
            </Card.Root>
          </GridItem>
        ))}
      </Grid>
    </Stack>
  )
}