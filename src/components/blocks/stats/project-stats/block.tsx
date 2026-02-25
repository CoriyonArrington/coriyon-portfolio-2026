'use client'

import { Badge, Card, Container, Icon, SimpleGrid, Stack, Text, Box } from '@chakra-ui/react'
import { LuArrowUp, LuChartPie, LuHeart, LuTrendingUp, LuClock, LuUsers } from 'react-icons/lu'
import { SectionHeader } from './section-header'
import { useEffect, useState, useRef } from 'react'

const IconMap: Record<string, React.ElementType> = {
  chart: LuChartPie,
  heart: LuHeart,
  arrow: LuArrowUp,
  trending: LuTrendingUp,
  clock: LuClock,
  users: LuUsers,
}

// Custom component to smoothly animate numbers when they scroll into view
const AnimatedNumber = ({ text }: { text: string }) => {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const [isInView, setIsInView] = useState(false)

  // Robust regex to split prefix (e.g., "$"), number (e.g., "4.8"), and suffix (e.g., "%" or "/5")
  const match = text.match(/^([^0-9+-]*)([+-]?[\d.]+)(.*)$/)
  const prefix = match ? match[1] : ''
  const endValue = match ? parseFloat(match[2]) : null
  const suffix = match ? match[3] : ''
  const isFloat = match ? match[2].includes('.') : false

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isInView || endValue === null) return

    let startTimestamp: number
    const duration = 1500 // 1.5 seconds animation

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 4) // easeOutQuart curve
      const currentCount = endValue * ease

      setCount(currentCount)

      if (progress < 1) {
        window.requestAnimationFrame(step)
      } else {
        setCount(endValue)
      }
    }

    window.requestAnimationFrame(step)
  }, [isInView, endValue])

  // If there's no number in the string to animate, just render the plain text
  if (endValue === null) return <Box as="span">{text}</Box>

  const displayValue = isFloat ? count.toFixed(1) : Math.floor(count)

  return (
    <Box as="span" ref={ref}>
      {prefix}{displayValue}{suffix}
    </Box>
  )
}

interface StatItem {
  value: string;
  label: string;
  icon?: string;
}

interface Props {
  tagline?: string;
  headline?: string;
  description?: string;
  stats?: StatItem[];
}

export const Block = ({ tagline, headline, description, stats }: Props) => {
  if (!stats || stats.length === 0) return null;

  return (
    <Container maxW="7xl" px={{ base: "4", md: "8" }} py={{ base: "16", md: "24" }}>
      <SectionHeader
        tagline={
          tagline ? (
            <Badge size="lg" colorPalette="green" variant="subtle" rounded="full" px="3" py="1">
              {tagline}
            </Badge>
          ) : undefined
        }
        headline={headline || "Performance Metrics"}
        description={description}
      >
        <SimpleGrid columns={{ base: 1, md: 3 }} gap="6" mt="8">
          {stats.map((item, idx) => {
            const IconComponent = item.icon && IconMap[item.icon] ? IconMap[item.icon] : LuTrendingUp;
            return (
              <Card.Root 
                key={idx} 
                minH={{ md: '48' }} 
                variant="outline" 
                bg="bg.panel" 
                borderWidth="1px"
                borderColor="border.muted" // Darker border so it doesn't vanish in light mode
                shadow="sm" // Adds baseline definition
                rounded="3xl"
                transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                _hover={{
                  borderColor: 'green.500',
                  transform: 'translateY(-4px)',
                  bg: 'bg.muted/50',
                  shadow: 'md'
                }}
              >
                <Card.Body gap="4">
                  <Icon size="xl" color="green.600"><IconComponent /></Icon>
                  <Stack gap="1" flex="1" justify="flex-end">
                    <Text textStyle={{ base: '4xl', md: '5xl' }} fontWeight="bold" letterSpacing="tight">
                      <AnimatedNumber text={item.value} />
                    </Text>
                    <Text fontSize="md" color="fg.muted" fontWeight="medium">{item.label}</Text>
                  </Stack>
                </Card.Body>
              </Card.Root>
            )
          })}
        </SimpleGrid>
      </SectionHeader>
    </Container>
  )
}