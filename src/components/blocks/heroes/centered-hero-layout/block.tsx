'use client'

import { Badge, Box, Heading, Highlight, Stack, Text, VStack } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface CenteredHeroLayoutProps {
  badge?: ReactNode | string | null;
  title: ReactNode | string;
  highlightQueries?: string[];
  highlightColor?: string;
  description?: string | null;
  primaryAction?: ReactNode;
  secondaryAction?: ReactNode;
  children?: ReactNode;
  pb?: any;
}

export const CenteredHeroLayout = ({
  badge,
  title,
  highlightQueries = [],
  highlightColor = "green.600",
  description,
  primaryAction,
  secondaryAction,
  children,
  pb = { base: '16', md: '24' }
}: CenteredHeroLayoutProps) => {
  return (
    <VStack gap={{ base: '12', md: '16' }} textAlign="center" w="full" pt={{ base: '32', md: '40' }} pb={pb}>
      <Stack gap="6" align="center" w="full">
        {badge && (
          typeof badge === 'string' ? (
            <Badge size="lg" variant="subtle" colorPalette="gray" alignSelf="center" rounded="full" px="4" py="1">
              {badge}
            </Badge>
          ) : (
            badge
          )
        )}
        
        <Heading
          as="h1"
          textStyle={{ base: '5xl', md: '6xl', lg: '7xl' }}
          maxW="4xl"
          mx="auto"
          lineHeight={{ base: '1.2', md: '1.1' }}
          fontWeight="bold"
          letterSpacing="tight"
        >
          {typeof title === 'string' && highlightQueries.length > 0 ? (
            <Highlight query={highlightQueries} styles={{ color: highlightColor }}>
              {title}
            </Highlight>
          ) : (
            title
          )}
        </Heading>
        
        {description && (
          <Text color="fg.muted" textStyle={{ base: 'lg', md: 'xl' }} maxW="2xl" mx="auto">
            {description}
          </Text>
        )}

        {(primaryAction || secondaryAction) && (
          <Stack 
            direction={{ base: 'column', md: 'row' }} 
            gap="4" 
            mt={{ base: 4, md: 6 }} 
            w={{ base: 'full', md: 'auto' }}
            align={{ base: 'stretch', md: 'center' }} 
            justify="center"
          >
            {primaryAction}
            {secondaryAction}
          </Stack>
        )}
      </Stack>

      {children && (
        <Box w="full" mt={{ base: 4, md: 8 }}>
          {children}
        </Box>
      )}
    </VStack>
  )
}