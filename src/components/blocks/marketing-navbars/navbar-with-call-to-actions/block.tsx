import { Box, Container, HStack } from '@chakra-ui/react'
import { Logo } from './logo'
import { MobilePopover } from './mobile-popover'
import { NavbarLinks } from './navbar-links'

export const Block = () => {
  return (
    <Box borderBottomWidth="1px" bg="bg.panel">
      <Container py={{ base: '3.5', md: '4' }}>
        <HStack justify="space-between">
          <Logo />
          <NavbarLinks hideBelow="md" />
          <MobilePopover>
            <NavbarLinks />
          </MobilePopover>
        </HStack>
      </Container>
    </Box>
  )
}
