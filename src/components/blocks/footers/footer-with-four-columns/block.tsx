import {
  Container,
  HStack,
  IconButton,
  Link,
  Separator,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import { SiGithub, SiLinkedin, SiX } from 'react-icons/si'
import { Copyright } from './copyright'
import { Logo } from './logo'
import { links } from './data'

export const Block = () => (
  <Container as="footer">
    <Stack
      justify="space-between"
      align="flex-start"
      direction={{ base: 'column', lg: 'row' }}
      py={{ base: '12', md: '16' }}
      gap="8"
    >
      <Stack gap={{ base: '4', md: '6' }} align="flex-start">
        <Logo height="32" />
        <Text color="fg.muted">Create beautiful websites remarkably fast.</Text>
      </Stack>
      <SimpleGrid columns={{ base: 2, md: 4 }} gap="8" width={{ base: 'full', lg: 'auto' }}>
        {links.map((group, idx) => (
          <Stack key={idx} gap="4" minW={{ lg: '40' }} textStyle="sm">
            <Text fontWeight="medium">{group.title}</Text>
            <Stack gap="3" alignItems="start">
              {group.links.map((link, idx) => (
                <Link key={idx} href={link.href} color="fg.muted">
                  {link.label}
                </Link>
              ))}
            </Stack>
          </Stack>
        ))}
      </SimpleGrid>
    </Stack>
    <Separator />
    <Stack
      py="4"
      justify="space-between"
      direction={{ base: 'column-reverse', md: 'row' }}
      align="center"
    >
      <Copyright />
      <HStack gap="2">
        {socialLinks.map(({ href, icon }, index) => (
          <IconButton variant="ghost" key={index} colorPalette="gray" asChild aria-label={href}>
            <Link key={index} href={href}>
              {icon}
            </Link>
          </IconButton>
        ))}
      </HStack>
    </Stack>
  </Container>
)

const socialLinks = [
  { href: 'https://x.com', icon: <SiX /> },
  { href: 'https://github.com', icon: <SiGithub /> },
  { href: 'https://www.linkedin.com', icon: <SiLinkedin /> },
]
