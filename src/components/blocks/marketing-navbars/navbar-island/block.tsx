'use client'

import {
  Button,
  Center,
  CollapsibleContent,
  CollapsibleRoot,
  Container,
  HStack,
  Spacer,
  Box
} from '@chakra-ui/react'
import { ColorModeButton } from "@/components/ui/color-mode"
import { LuCalendar } from 'react-icons/lu'
import Script from 'next/script'
import { Logo } from './logo'
import { CollapsibleTrigger } from './collapsible-trigger'
import { NavbarLinks } from './navbar-links'
import { LanguageSwitcher } from './language-switcher'

interface NavbarBlockProps {
  dict?: {
    projects?: string;
    testimonials?: string;
    faqs?: string;
    contact?: string;
    bookCall?: string;
  }
}

export const Block = ({ dict }: NavbarBlockProps) => {
  const openCalendly = (e: React.MouseEvent) => {
    e.preventDefault()
    // @ts-ignore
    if (window.Calendly) {
      // @ts-ignore
      window.Calendly.initPopupWidget({ 
        url: 'https://calendly.com/coriyonarrington/intro-call' 
      })
    }
  }

  const bookCallText = dict?.bookCall || "Book an intro call"

  return (
    <>
      <Box
        position="fixed"
        top="0"
        left="0"
        right="0"
        height="24px" 
        bg="bg.canvas/40"
        backdropFilter="blur(4px)" 
        style={{
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)'
        }}
        zIndex={99}
        pointerEvents="none"
      />

      <Box
        position="fixed"
        bottom="0"
        left="0"
        right="0"
        height="24px"
        bg="bg.canvas/40"
        backdropFilter="blur(4px)"
        style={{
          maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)'
        }}
        zIndex={99}
        pointerEvents="none"
      />

      <Center position="fixed" zIndex={100} top="4" left="4" right="4">
        <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
        <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" />

        <Container
          bg="bg.panel/80" 
          backdropFilter="blur(16px)"
          borderRadius="l3"
          boxShadow="sm"
          maxW={{ base: 'full', md: 'fit-content' }}
          px="4"
          py="3"
          border="1px solid"
          borderColor="border.subtle"
        >
          <CollapsibleRoot>
            <HStack gap={{ base: '3', md: '8' }}>
              <Logo />
              <Spacer hideFrom="md" />
              <NavbarLinks dict={dict} hideBelow="md" />
              
              <HStack gap="1">
                <LanguageSwitcher />
                <ColorModeButton />
              </HStack>
              
              <Button size={{ base: 'sm', md: 'md' }} onClick={openCalendly}>
                {bookCallText} <LuCalendar />
              </Button>
              
              <CollapsibleTrigger />
            </HStack>
            
            <CollapsibleContent hideFrom="md">
              <NavbarLinks dict={dict} pt="5" pb="2" alignItems="center" />
            </CollapsibleContent>
          </CollapsibleRoot>
        </Container>
      </Center>
    </>
  )
}