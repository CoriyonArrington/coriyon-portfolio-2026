import {
  Button,
  Center,
  CollapsibleContent,
  CollapsibleRoot,
  Container,
  HStack,
  Spacer,
} from '@chakra-ui/react'
import { Logo } from './logo'
import { CollapsibleTrigger } from './collapsible-trigger'
import { NavbarLinks } from './navbar-links'

export const Block = () => {
  return (
    <Center position="absolute" zIndex="docked" top="6" left="4" right="4">
      <Container
        background="bg.panel"
        borderRadius="l3"
        boxShadow="xs"
        maxW={{ base: 'full', md: 'fit-content' }}
        px="4"
        py="3"
      >
        <CollapsibleRoot>
          <HStack gap={{ base: '3', md: '8' }}>
            <Logo />
            <Spacer hideFrom="md" />
            <NavbarLinks hideBelow="md" />
            <Button size={{ base: 'sm', md: 'md' }}>Buy Now</Button>
            <CollapsibleTrigger />
          </HStack>
          <CollapsibleContent hideFrom="md">
            <NavbarLinks pt="5" pb="2" alignItems="center" />
          </CollapsibleContent>
        </CollapsibleRoot>
      </Container>
    </Center>
  )
}
