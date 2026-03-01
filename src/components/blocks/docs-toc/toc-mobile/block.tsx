'use client'

import { Box, Collapsible, Heading, HStack, Stack, Text } from '@chakra-ui/react'
import { useMemo, useState } from 'react'
import { LuChevronUp, LuChevronRight, LuList } from 'react-icons/lu'
import { TocLink } from './toc-link'
import { useScrollSpy } from './use-scroll-spy'

export interface TocItem {
  id: string
  text: string
  level: number
}

interface BlockProps {
  tocData: TocItem[];
  title?: string;
}

export const Block = ({ tocData, title }: BlockProps) => {
  if (!tocData || tocData.length === 0) return null;

  const [activeId, setActiveId] = useState<string[]>([tocData[0]?.id || ''])
  const [isOpen, setIsOpen] = useState(false)

  useScrollSpy({
    data: tocData,
    setActiveId,
  })

  const handleClick = (id: string) => {
    setActiveId([id])
    const element = document.getElementById(id)
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 180;
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
    setIsOpen(false)
  }

  const activeItem = useMemo(() => tocData.find((item) => activeId.includes(item.id)), [activeId, tocData])

  return (
    <Box position="relative" w="full">
      <Collapsible.Root open={isOpen} onOpenChange={(details) => setIsOpen(details.open)}>
        
        {/* Pop-up Menu Content */}
        <Collapsible.Content
          style={{
            position: 'absolute',
            bottom: 'calc(100% + 12px)',
            left: 0,
            right: 0,
            zIndex: 10,
          }}
        >
          <Box
            bg="bg.panel/90"
            backdropFilter="blur(16px) saturate(180%)"
            borderWidth="1px"
            borderColor="border.subtle"
            borderRadius="2xl"
            shadow="xl"
            p="3"
          >
            <Box maxH="40vh" overflowY="auto" className="scrollbar-hide">
              <Stack gap="1">
                {tocData.map((item) => {
                  const isActive = activeId.includes(item.id)
                  return (
                    <TocLink
                      key={item.id}
                      css={{ '--toc-item-depth': item.level }}
                      onClick={() => handleClick(item.id)}
                      data-current={isActive || undefined}
                      style={{
                        backgroundColor: isActive ? 'var(--chakra-colors-bg-muted)' : 'transparent',
                        borderRadius: 'var(--chakra-radii-lg)',
                        padding: '12px 16px',
                        fontWeight: isActive ? '600' : '400',
                        color: isActive ? 'var(--chakra-colors-fg-default)' : 'var(--chakra-colors-fg-muted)',
                        display: 'block'
                      }}
                    >
                      {item.text}
                    </TocLink>
                  )
                })}
              </Stack>
            </Box>
          </Box>
        </Collapsible.Content>

        {/* Trigger Pill - Exact pixel height to match FAB perfectly */}
        <Box 
          px={{ base: "5", md: "6" }} 
          h={{ base: "56px", md: "64px" }}
          w="full" 
          bg="bg.panel/90" 
          backdropFilter="blur(16px) saturate(180%)" 
          borderWidth="1px" 
          borderColor="border.subtle" 
          borderRadius="full" 
          shadow="lg"
          transition="all 0.2s"
          _hover={{ shadow: 'xl', bg: 'bg.panel' }}
        >
          <Collapsible.Trigger width="full" height="full" display="flex" alignItems="center" justifyContent="space-between" cursor="pointer">
            <HStack gap="3" overflow="hidden">
              <LuList color="var(--chakra-colors-fg-muted)" style={{ flexShrink: 0 }} />
              <Heading textStyle="sm" fontWeight="semibold" color="fg.default" whiteSpace="nowrap" display={{ base: isOpen ? "block" : "none", md: "block" }}>
                {title || "Case Study Navigation"}
              </Heading>
              
              {!isOpen && (
                <>
                  <Box display={{ base: "none", md: "block" }} color="fg.muted">
                    <LuChevronRight />
                  </Box>
                  <Text fontSize="sm" color="fg.muted" fontWeight="medium" lineClamp={1}>
                    {activeItem?.text || tocData[0]?.text || title}
                  </Text>
                </>
              )}
            </HStack>
            <Box transition="transform 0.2s" transform={isOpen ? 'rotate(180deg)' : 'rotate(0deg)'} color="fg.muted" style={{ flexShrink: 0 }} ml="2">
              <LuChevronUp />
            </Box>
          </Collapsible.Trigger>
        </Box>
        
      </Collapsible.Root>
    </Box>
  )
}