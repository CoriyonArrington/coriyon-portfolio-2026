import { Box, SimpleGrid } from '@chakra-ui/react'
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

  // Generate an array containing every item's value so they all mount open
  const allItemValues = faqs.map((_, index) => `item-${index}`)

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: 8, md: 12 }}>
      <SectionHeader dict={dict} />
      
      <AccordionRoot 
        collapsible 
        multiple 
        defaultValue={allItemValues}
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
  )
}