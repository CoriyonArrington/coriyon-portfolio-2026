import {
  Button,
  Card,
  Icon,
  List,
  Separator,
  Span,
  Stack,
  type StackProps,
} from '@chakra-ui/react'
import { LuBuilding, LuCheck, LuRocket, LuUsers } from 'react-icons/lu'
import { useUiSounds } from '@/hooks/use-ui-sounds'
import { useEffect, useState } from 'react'

export interface PlanData {
  value: string
  title: string
  description: string
  features: string[]
  priceCurrency: string
  recommended?: boolean
  priceSymbol: string
  monthlyPrice: { unit: string; price: number }
  yearlyPrice: { unit: string; price: number }
  checkoutUrl?: string
  buttonText?: string
}

const iconMap: Record<string, React.ReactNode> = {
  workshop: <LuUsers />,
  'web-design': <LuRocket />,
  'product-design': <LuBuilding />,
}

interface PricingCardProps extends StackProps {
  billing: 'monthly' | 'yearly'
  data: PlanData
}

// Custom hook to animate the price number whenever it changes
const useAnimatedPrice = (endValue: number) => {
  const [currentValue, setCurrentValue] = useState(endValue)

  useEffect(() => {
    let startTimestamp: number | null = null;
    const duration = 600; // Fast 600ms transition
    const startValue = currentValue;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // easeOutQuart
      const ease = 1 - Math.pow(1 - progress, 4);
      
      const nextValue = startValue + (endValue - startValue) * ease;
      setCurrentValue(nextValue);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCurrentValue(endValue);
      }
    };

    window.requestAnimationFrame(step);
  }, [endValue]);

  return Math.round(currentValue);
}

export const PricingCard = (props: PricingCardProps) => {
  const { billing, data, ...rest } = props
  const { playHover, playClick } = useUiSounds()
  
  const targetPrice = billing === 'monthly' ? data.monthlyPrice.price : data.yearlyPrice.price
  const animatedPrice = useAnimatedPrice(targetPrice)

  const btnText = data.buttonText || 'Reserve a spot'
  const checkoutLink = data.checkoutUrl || 'https://calendly.com/coriyonarrington/intro-call'

  return (
    <Card.Root 
      variant={data.recommended ? 'elevated' : 'outline'} 
      shadow={data.recommended ? 'xl' : 'sm'}
      borderColor={data.recommended ? 'colorPalette.500' : 'border.subtle'}
      borderWidth={data.recommended ? '2px' : '1px'}
      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
      _hover={{ 
        shadow: '2xl', 
        transform: 'translateY(-6px)',
        borderColor: 'colorPalette.500'
      }}
      onMouseEnter={playHover}
      {...rest}
    >
      <Card.Body>
        <Stack gap={{ base: '6', md: '8' }} pos="relative">
          <Stack gap="3">
            <Icon size="2xl" color="colorPalette.600" _dark={{ color: "colorPalette.400" }}>
              {iconMap[data.value] || <LuUsers />}
            </Icon>
            <Card.Title mt="2" fontSize="xl">{data.title}</Card.Title>
            <Card.Description minH="2lh" fontSize="md">{data.description}</Card.Description>
          </Stack>

          <Stack gap="1">
            <Span textStyle="5xl" lineHeight="1" fontWeight="bold" fontVariantNumeric="tabular-nums">
              {data.priceSymbol}
              {animatedPrice}
            </Span>
            <Span textStyle="sm" color="fg.muted" fontWeight="medium">
              {billing === 'monthly' ? 'deposit to start' : 'pay in full'}
            </Span>
          </Stack>

          {/* FIX: Inherits global color when recommended is true, defaults to gray when false */}
          <Button 
            size="lg" 
            variant={data.recommended ? 'solid' : 'outline'} 
            colorPalette={data.recommended ? undefined : "gray"}
            color={data.recommended ? "white" : undefined}
            _dark={data.recommended ? { color: "gray.900" } : undefined}
            alignSelf="flex-start" 
            w="full"
            onClick={playClick}
            asChild
          >
            <a href={checkoutLink} target="_blank" rel="noreferrer">
              {btnText}
            </a>
          </Button>
        </Stack>
      </Card.Body>

      <Separator borderColor="border.subtle" />

      <Card.Body>
        <List.Root variant="plain" align="start" textStyle="md" gap="4">
          {data.features.map((item) => (
            <List.Item alignItems="flex-start" key={item} display="flex" gap="3">
              <List.Indicator asChild color="colorPalette.600" _dark={{ color: "colorPalette.400" }} mt="1">
                <LuCheck />
              </List.Indicator>
              <Span>{item}</Span>
            </List.Item>
          ))}
        </List.Root>
      </Card.Body>
    </Card.Root>
  )
}