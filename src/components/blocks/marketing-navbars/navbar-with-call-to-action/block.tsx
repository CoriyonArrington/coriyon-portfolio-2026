'use client'

import { Box, Button, Container, HStack, Spacer } from '@chakra-ui/react'
import { LuCalendar } from 'react-icons/lu'
import Script from 'next/script'
import { Logo } from './logo'
import { MobilePopover } from './mobile-popover'
import { NavbarLinks } from './navbar-links'

export const Block = () => {
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

  return (
    <Box borderBottomWidth="1px" bg="bg.panel">
      {/* Load Calendly CSS and JS natively in Next.js */}
      <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
      <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" />

      <Container py={{ base: '3.5', md: '4' }}>
        <HStack justify="space-between">
          <Logo />
          <Spacer hideFrom="md" />
          <NavbarLinks hideBelow="md" />
          
          <Button size={{ base: 'sm', md: 'md' }} onClick={openCalendly}>
            Book an intro call <LuCalendar />
          </Button>
          
          <MobilePopover>
            <NavbarLinks />
          </MobilePopover>
        </HStack>
      </Container>
    </Box>
  )
}