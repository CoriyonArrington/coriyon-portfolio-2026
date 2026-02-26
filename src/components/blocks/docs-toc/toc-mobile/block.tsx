'use client'

import { Box, Heading, HStack, Stack, Text, Collapsible } from '@chakra-ui/react'
import { useMemo, useState } from 'react'
import { LuChevronDown, LuChevronRight, LuText } from 'react-icons/lu'
import { TocLink } from './toc-link'
import { useScrollSpy } from './use-scroll-spy'

export interface TocItem {
  id: string
  text: string
  level: number
}

interface BlockProps {
  tocData: TocItem[];
}

export const Block = ({ tocData }: BlockProps) => {
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
      // Offset for sticky headers
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
    setIsOpen(false)
  }

  const activeItem = useMemo(() => tocData.find((item) => activeId.includes(item.id)), [activeId, tocData])

  return (
    <Box px="6" py="4" w="full" bg="bg.panel" borderWidth="1px" borderColor="border.subtle" borderRadius="xl" shadow="sm">
      <Collapsible.Root open={isOpen} onOpenChange={(details) => setIsOpen(details.open)}>
        <Collapsible.Trigger
          width="full"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          cursor="pointer"
        >
          <HStack gap="3">
            <LuText color="var(--chakra-colors-fg-muted)" />
            <Heading textStyle="md" fontWeight="semibold" color="fg.default">
              Case Study Navigation
            </Heading>
            {!isOpen && activeItem && (
              <>
                <LuChevronRight color="var(--chakra-colors-fg-muted)" />
                <Text fontSize="sm" color="fg.muted" fontWeight="medium">
                  {activeItem.text}
                </Text>
              </>
            )}
          </HStack>
          <Box transition="transform 0.2s" transform={isOpen ? 'rotate(180deg)' : 'rotate(0deg)'} color="fg.muted">
            <LuChevronDown />
          </Box>
        </Collapsible.Trigger>

        <Collapsible.Content>
          <Box mt="4" maxH="50vh" overflowY="auto">
            <Stack gap="1">
              {tocData.map((item) => {
                const isActive = activeId.includes(item.id)
                return (
                  <TocLink
                    key={item.id}
                    css={{
                      '--toc-item-depth': item.level,
                    }}
                    onClick={() => handleClick(item.id)}
                    data-current={isActive || undefined}
                    style={{
                      backgroundColor: isActive ? 'var(--chakra-colors-bg-muted)' : 'transparent',
                      borderRadius: 'var(--chakra-radii-md)',
                      padding: '8px 12px'
                    }}
                  >
                    {item.text}
                  </TocLink>
                )
              })}
            </Stack>
          </Box>
        </Collapsible.Content>
      </Collapsible.Root>
    </Box>
  )
}