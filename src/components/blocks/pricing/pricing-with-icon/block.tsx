'use client'

import { Badge, Box, SegmentGroup, Stack, Text, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { PricingCard, type PlanData } from './pricing-card'

interface PricingProps {
  dict?: any;
}

export const Block = ({ dict }: PricingProps) => {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('yearly')
  
  const header = dict?.pricing_header || {}
  const plans = (dict?.pricing_plans || []) as PlanData[]

  if (!plans || plans.length === 0) return null;

  return (
    <Box w="full" maxW="6xl" mx="auto">
      <VStack gap="8">
        <SegmentGroup.Root
          size="sm"
          defaultValue="yearly"
          onValueChange={(e) => setBilling(e.value as 'monthly' | 'yearly')}
        >
          <SegmentGroup.Indicator />
          <SegmentGroup.Items
            items={[
              {
                label: (
                  <Text>
                    {header.billed_annually || 'Pay in full'}{' '}
                    <Badge size="xs" variant="solid" pos="relative" bottom="1px" colorPalette="green">
                      -20%
                    </Badge>
                  </Text>
                ),
                value: 'yearly',
              },
              { label: <Text>{header.billed_monthly || 'Deposit only'}</Text>, value: 'monthly' },
            ]}
          />
        </SegmentGroup.Root>
        <Stack w="full" direction={{ base: 'column', lg: 'row' }} gap="6" justify="center">
          {plans.map((plan: PlanData) => (
            <PricingCard key={plan.value} billing={billing} data={plan} flex="1" />
          ))}
        </Stack>
      </VStack>
    </Box>
  )
}