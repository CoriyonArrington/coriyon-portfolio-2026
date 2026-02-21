'use client'

import { Button, Card, Heading, SimpleGrid, Stack, Text, Icon } from '@chakra-ui/react'
import { LuCalendar, LuMail, LuLinkedin, LuCheck } from 'react-icons/lu'
import { useState } from 'react'
import { SectionHeader } from './section-header'
import { CalendlyPopup } from '@/components/ui/calendly-popup'
import { useUiSounds } from '@/hooks/use-ui-sounds'

interface CtaProps {
  dict?: any;
}

export const Block = ({ dict }: CtaProps) => {
  const { playHover, playClick } = useUiSounds()
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false)
  const [hasCopied, setHasCopied] = useState(false)

  const emailAddress = "coriyonarrington@gmail.com"

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.stopPropagation()
    playClick()
    navigator.clipboard.writeText(emailAddress)
    setHasCopied(true)
    setTimeout(() => setHasCopied(false), 2000)
  }

  const handleCalendlyOpen = () => {
    playClick()
    setIsCalendlyOpen(true)
  }

  const handleLinkedInOpen = () => {
    playClick()
    window.open("https://linkedin.com/in/coriyon", "_blank")
  }

  // Helper to ensure we get the right card data from the nested dict
  const cards = dict?.cards || {}

  return (
    <Stack gap={{ base: '8', md: '12' }}>
      <CalendlyPopup 
        isOpen={isCalendlyOpen} 
        onClose={() => setIsCalendlyOpen(false)} 
      />

      <SectionHeader 
        tagline={dict?.badge}
        headline={dict?.title}
        description={dict?.description}
      />

      <SimpleGrid columns={{ base: 1, md: 3 }} gap="8">
        
        {/* Card 1: Calendly */}
        <Card.Root 
          variant="outline" 
          p="6" 
          borderRadius="l3" 
          cursor="pointer"
          onClick={handleCalendlyOpen}
          onMouseEnter={playHover}
          transition="all 0.2s"
          _hover={{ borderColor: 'green.500', transform: 'translateY(-4px)', bg: 'bg.muted/50' }}
        >
          <Card.Body gap="4" alignItems="center" textAlign="center" p="0">
            <Icon size="2xl" color="green.600" mb="2">
              <LuCalendar />
            </Icon>
            <Heading size="md" fontWeight="bold">{cards.call?.title}</Heading>
            <Text color="fg.muted">{cards.call?.description}</Text>
            <Button variant="ghost" color="fg" mt="4" pointerEvents="none">
              {cards.call?.linkText}
            </Button>
          </Card.Body>
        </Card.Root>

        {/* Card 2: Email Copy to Clipboard */}
        <Card.Root 
          variant="outline" 
          p="6" 
          borderRadius="l3" 
          cursor="pointer"
          onClick={handleCopyEmail}
          onMouseEnter={playHover}
          transition="all 0.2s"
          _hover={{ borderColor: 'green.500', transform: 'translateY(-4px)', bg: 'bg.muted/50' }}
        >
          <Card.Body gap="4" alignItems="center" textAlign="center" p="0">
            <Icon size="2xl" color={hasCopied ? "green.500" : "green.600"} mb="2" transition="color 0.2s">
              {hasCopied ? <LuCheck /> : <LuMail />}
            </Icon>
            <Heading size="md" fontWeight="bold">{cards.email?.title}</Heading>
            <Text color="fg.muted">{cards.email?.description}</Text>
            <Button 
              variant="ghost" 
              color={hasCopied ? "green.600" : "fg"} 
              mt="4" 
              pointerEvents="none"
            >
              {hasCopied ? (dict?.badge === "Conectemos" ? "¡Correo copiado!" : "Email copied!") : cards.email?.linkText}
            </Button>
          </Card.Body>
        </Card.Root>

        {/* Card 3: LinkedIn */}
        <Card.Root 
          variant="outline" 
          p="6" 
          borderRadius="l3" 
          cursor="pointer"
          onClick={handleLinkedInOpen}
          onMouseEnter={playHover}
          transition="all 0.2s"
          _hover={{ borderColor: 'green.500', transform: 'translateY(-4px)', bg: 'bg.muted/50' }}
        >
          <Card.Body gap="4" alignItems="center" textAlign="center" p="0">
            <Icon size="2xl" color="green.600" mb="2">
              <LuLinkedin />
            </Icon>
            <Heading size="md" fontWeight="bold">{cards.linkedin?.title}</Heading>
            <Text color="fg.muted">{cards.linkedin?.description}</Text>
            <Button variant="ghost" color="fg" mt="4" pointerEvents="none">
              {cards.linkedin?.linkText}
            </Button>
          </Card.Body>
        </Card.Root>

      </SimpleGrid>
    </Stack>
  )
}