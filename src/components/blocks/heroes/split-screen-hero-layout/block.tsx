'use client'

import { Box, Flex, Heading, Highlight, Stack, Text } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface SplitScreenHeroLayoutProps {
  badge?: ReactNode | string | null;
  title: ReactNode | string;
  titleSize?: any; 
  highlightQueries?: string[];
  highlightColor?: string;
  description?: string | null;
  actions?: ReactNode;
  children?: ReactNode;
  pb?: any;
  forceStack?: boolean; 
}

export const SplitScreenHeroLayout = ({
  badge,
  title,
  titleSize,
  highlightQueries = [],
  highlightColor = "green.600",
  description,
  actions,
  children,
  pb = { base: '8', lg: '24' },
  forceStack = false
}: SplitScreenHeroLayoutProps) => {
  return (
    <Flex 
      direction={forceStack ? 'column' : { base: 'column', lg: 'row' }} 
      gap={{ base: 8, lg: 12 }} 
      w="full" 
      align="center"
    >
      {/* Text Column */}
      <Flex
        flex={forceStack ? "none" : "1"}
        align="center"
        justify={forceStack ? 'center' : { base: 'center', lg: 'flex-start' }}
        w="full"
        minW="0" 
        pe={forceStack ? '0' : { base: '0', lg: '8', xl: '12' }} 
        pt={{ base: '32', md: '40' }} 
        pb={forceStack ? { base: 8, md: 10 } : pb} 
      >
        <Stack 
          gap="6" 
          w="full" 
          minW="0" 
          maxW={forceStack ? "4xl" : "full"}
          mx={forceStack ? "auto" : "0"}
          alignItems={forceStack ? "center" : { base: "center", lg: "flex-start" }} 
          textAlign={forceStack ? "center" : { base: "center", lg: "start" }}
        >
          {badge && (
            <Box display="inline-flex">
              {badge}
            </Box>
          )}
          
          <Heading
            as="h1"
            textStyle={titleSize || { base: '4xl', sm: '5xl', md: '6xl', lg: '7xl' }} 
            w="full"
            minW="0"
            wordBreak="break-word" 
            lineHeight={{ base: '1.2', md: '1.1' }}
            fontWeight="bold"
            letterSpacing="tight"
          >
            {typeof title === 'string' && highlightQueries.length > 0 ? (
              <Highlight query={highlightQueries} styles={{ color: highlightColor, whiteSpace: 'normal' }}>
                {title}
              </Highlight>
            ) : (
              title
            )}
          </Heading>
          
          {description && (
            <Text color="fg.muted" textStyle={{ base: 'lg', md: 'xl' }} w="full" minW="0" maxW={forceStack ? "2xl" : "full"}>
              {description}
            </Text>
          )}

          {actions && (
            <Box mt={{ base: 2, md: 4 }} w="full" minW="0" display="flex" justifyContent={forceStack ? "center" : { base: "center", lg: "flex-start" }}>
              {actions}
            </Box>
          )}
        </Stack>
      </Flex>
      
      {/* Media Column */}
      <Flex 
        flex={forceStack ? "none" : "1"} 
        align="center" 
        justify="center" 
        w="full"
        maxW={forceStack ? "6xl" : "full"}
        mx={forceStack ? "auto" : "0"}
        minW="0" 
        minH={forceStack ? "auto" : { base: 'auto', lg: '3xl' }} 
        pt={forceStack ? { base: 4, md: 8 } : { base: 8, lg: 0 }}
        pb={{ base: 12, lg: 0 }}
      >
        <Box w="full" minW="0">
          {children}
        </Box>
      </Flex>
    </Flex>
  )
}