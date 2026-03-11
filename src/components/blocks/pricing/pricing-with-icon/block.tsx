'use client'

import { Box, SimpleGrid, Stack, Text, Center, Highlight, HStack, Button } from '@chakra-ui/react'
import { PricingCard, PlanData } from './pricing-card'
import { useMemo, useState } from 'react'

interface PricingProps {
  dict?: any
  plans?: PlanData[]
}

export const Block = ({ dict, plans = [] }: PricingProps) => {
  // State to manage the billing toggle
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('yearly')

  const rawTitle = dict?.title || "Pricing"
  const { displayTitle, highlightQueries } = useMemo(() => {
    const matches = rawTitle.match(/\*(.*?)\*/g)
    const queries = matches ? matches.map((m: string) => m.replace(/\*/g, '')) : []
    const cleanText = rawTitle.replace(/\*/g, '')
    return { displayTitle: cleanText, highlightQueries: queries }
  }, [rawTitle])

  return (
    <Box py={{ base: '16', md: '24' }} w="full">
      <Stack gap={{ base: '12', md: '16' }} maxW="7xl" mx="auto">
        
        <Stack gap="4" align="center" textAlign="center">
          <Text textStyle={{ base: '4xl', md: '5xl' }} fontWeight="bold" letterSpacing="tight">
            <Highlight query={highlightQueries} styles={{ color: "green.600" }}>
              {displayTitle}
            </Highlight>
          </Text>
          <Text color="fg.muted" textStyle="xl" maxW="2xl">
            {dict?.description}
          </Text>

          {/* Billing Toggle Switch */}
          <HStack bg="bg.muted" p="1" rounded="full" mt="4">
            <Button
              size="sm"
              variant={billing === 'yearly' ? 'solid' : 'ghost'}
              colorPalette={billing === 'yearly' ? 'green' : 'gray'}
              rounded="full"
              onClick={() => setBilling('yearly')}
              transition="all 0.2s"
            >
              {dict?.billed_annually || 'Pay in full'}
            </Button>
            <Button
              size="sm"
              variant={billing === 'monthly' ? 'solid' : 'ghost'}
              colorPalette={billing === 'monthly' ? 'green' : 'gray'}
              rounded="full"
              onClick={() => setBilling('monthly')}
              transition="all 0.2s"
            >
              {dict?.billed_monthly || 'Deposit only'}
            </Button>
          </HStack>
        </Stack>

        {plans.length > 0 ? (
          <SimpleGrid columns={{ base: 1, md: 3 }} gap="8">
            {plans.map((plan, id) => (
              <PricingCard 
                key={plan.value || id} 
                data={plan} 
                billing={billing} // Now dynamically passes the billing state to the card
              />
            ))}
          </SimpleGrid>
        ) : (
          <Center h="40">
            <Text color="fg.muted">No pricing plans available.</Text>
          </Center>
        )}
        
      </Stack>
    </Box>
  )
}