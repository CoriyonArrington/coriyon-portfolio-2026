'use client'

import { SimpleGrid, Box } from '@chakra-ui/react'
import { SectionHeader } from './section-header'
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from '@/components/ui/accordion'

interface FaqProps {
  dict?: any;
  faqs: { id: number; question: string; answer: string }[];
}

export const Block = ({ dict, faqs }: FaqProps) => {
  if (!faqs || faqs.length === 0) return null

  return (
    <Box>
      <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: 8, md: 12 }}>
        <SectionHeader dict={dict} />
        
        {/* OPTIMIZATION: Used native defaultValue instead of React state */}
        <AccordionRoot 
          collapsible 
          multiple 
          defaultValue={['item-0']}
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