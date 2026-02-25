'use client'

import { Box, Flex, SimpleGrid, Stack, Text, Icon } from '@chakra-ui/react'
import { LuArrowLeft, LuArrowRight } from 'react-icons/lu'
import NextLink from 'next/link'
import { useUiSounds } from '@/hooks/use-ui-sounds'

interface PageLink {
  title: string
  href: string
}

interface PageNavProps {
  prev?: PageLink | null
  next?: PageLink | null
  dict?: any
}

export const Block = ({ prev, next, dict }: PageNavProps) => {
  const { playHover, playClick } = useUiSounds()

  if (!prev && !next) return null

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} gap="4" w="full">
      {prev ? (
        <Box asChild>
          <NextLink href={prev.href} onClick={playClick} onMouseEnter={playHover}>
            <Flex
              direction="column"
              align="flex-start"
              p={{ base: '6', md: '10' }}
              borderRadius="2xl"
              borderWidth="1px"
              borderColor="border.subtle"
              bg="bg.panel"
              shadow="sm"
              transition="all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
              _hover={{ 
                bg: 'bg.muted', 
                borderColor: 'border.muted',
                shadow: 'md',
                transform: 'translateY(-2px)'
              }}
              role="group"
              cursor="pointer"
            >
              <Stack direction="row" align="center" color="fg.muted" mb="3" fontSize="xs" fontWeight="bold" letterSpacing="widest" textTransform="uppercase">
                <Icon as={LuArrowLeft} transition="transform 0.2s" _groupHover={{ transform: 'translateX(-4px)' }} />
                <Text>{dict?.previous || "Previous"}</Text>
              </Stack>
              <Text textStyle={{ base: '2xl', md: '3xl' }} fontWeight="medium" color="fg.default">
                {prev.title}
              </Text>
            </Flex>
          </NextLink>
        </Box>
      ) : <Box />} {/* Empty box to maintain the right-side alignment if there is no previous page */}

      {next && (
        <Box asChild>
          <NextLink href={next.href} onClick={playClick} onMouseEnter={playHover}>
            <Flex
              direction="column"
              align="flex-end"
              textAlign="right"
              p={{ base: '6', md: '10' }}
              borderRadius="2xl"
              borderWidth="1px"
              borderColor="border.subtle"
              bg="bg.panel"
              shadow="sm"
              transition="all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
              _hover={{ 
                bg: 'bg.muted', 
                borderColor: 'border.muted',
                shadow: 'md',
                transform: 'translateY(-2px)'
              }}
              role="group"
              cursor="pointer"
            >
              <Stack direction="row" align="center" color="fg.muted" mb="3" fontSize="xs" fontWeight="bold" letterSpacing="widest" textTransform="uppercase">
                <Text>{dict?.next || "Up next"}</Text>
                <Icon as={LuArrowRight} transition="transform 0.2s" _groupHover={{ transform: 'translateX(4px)' }} />
              </Stack>
              <Text textStyle={{ base: '2xl', md: '3xl' }} fontWeight="medium" color="fg.default">
                {next.title}
              </Text>
            </Flex>
          </NextLink>
        </Box>
      )}
    </SimpleGrid>
  )
}