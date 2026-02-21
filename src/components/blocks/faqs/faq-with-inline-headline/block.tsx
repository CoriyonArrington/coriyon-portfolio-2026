'use client'

import { SimpleGrid, Box } from '@chakra-ui/react'
import { SectionHeader } from './section-header'
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from '@/components/ui/accordion'
import { useState } from 'react'

interface FaqProps {
  dict?: any;
  faqs: { id: number; question: string; answer: string }[];
}

export const Block = ({ dict, faqs }: FaqProps) => {
  // Initialize state with 'item-0' so the first accordion item is open by default
  const [value, setValue] = useState<string[]>(['item-0'])

  if (!faqs || faqs.length === 0) return null

  return (
    // Removed the manual padding wrapper so it naturally aligns with page.tsx
    <Box>
      <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: 8, md: 12 }}>
        <SectionHeader dict={dict} />
        
        <AccordionRoot 
          collapsible 
          multiple 
          value={value}
          onValueChange={(e) => setValue(e.value)}
        >
          {faqs.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionItemTrigger fontSize="lg" fontWeight="semibold">
                {item.question}
              </AccordionItemTrigger>
              <AccordionItemContent color="fg.muted">
                {item.answer}
              </AccordionItemContent>
            </AccordionItem>
          ))}
        </AccordionRoot>
      </SimpleGrid>
    </Box>
  )
}