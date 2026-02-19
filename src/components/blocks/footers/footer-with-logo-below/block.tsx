import { Container, HStack, Link, Separator, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { Copyright } from './copyright'
import { Logo } from './logo'
import { links } from './data'
import { NewsletterForm } from './newsletter-form'

export const Block = () => (
  <Container as="footer" textStyle="sm">
    <Stack
      gap="8"
      direction={{ base: 'column-reverse', lg: 'row' }}
      justify="space-between"
      py={{ base: '10', md: '12' }}
    >
      <SimpleGrid columns={{ base: 2, md: 4 }} gap="8" width={{ base: 'full', md: 'auto' }}>
        {links.map((group, idx) => (
          <Stack key={idx} gap="4" minW={{ md: '40' }}>
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
      <NewsletterForm />
    </Stack>
    <Separator />
    <HStack py="6" justify="space-between">
      <Logo height="32" />
      <Copyright />
    </HStack>
  </Container>
)
