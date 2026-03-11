'use client'

import { Flex, Heading, Highlight, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface SplitScreenHeroLayoutProps {
  badge?: ReactNode | string | null;
  title: ReactNode | string;
  highlightQueries?: string[];
  highlightColor?: string;
  description?: string | null;
  actions?: ReactNode;
  children?: ReactNode;
  pb?: any;
}

export const SplitScreenHeroLayout = ({
  badge,
  title,
  highlightQueries = [],
  highlightColor = "green.600",
  description,
  actions,
  children,
  pb = { base: '8', lg: '24' }
}: SplitScreenHeroLayoutProps) => {
  return (
    <SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: 8, lg: 12 }}>
      <Flex
        align="center"
        justify="center"
        w="full"
        pt={{ base: '32', md: '40' }} 
        pb={pb} 
      >
        <Stack gap="6" w="full" alignItems={{ base: "center", lg: "flex-start" }} textAlign={{ base: "center", lg: "start" }}>
          {badge}
          
          <Heading
            as="h1"
            textStyle={{ base: '5xl', md: '6xl', lg: '7xl' }}
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
            <Text color="fg.muted" textStyle={{ base: 'lg', md: 'xl' }} maxW="2xl">
              {description}
            </Text>
          )}

          {actions && (
            <Stack mt="2" w="full" alignItems={{ base: "center", lg: "flex-start" }}>
              {actions}
            </Stack>
          )}
        </Stack>
      </Flex>
      
      <Flex 
        align="center" 
        justify="center" 
        minH={{ base: 'auto', lg: '3xl' }} 
        pt={{ base: 8, lg: 0 }}
        pb={{ base: 12, lg: 0 }}
        w="full"
      >
        {children}
      </Flex>
    </SimpleGrid>
  )
}