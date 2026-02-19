import { Container, Link, Separator, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { Copyright } from './copyright'
import { Logo } from './logo'
import { links } from './data'

export const Block = () => (
  <Container as="footer" textStyle="sm">
    <Stack
      direction={{ base: 'column', md: 'row' }}
      gap={{ base: '8', md: '12' }}
      justify="space-between"
      py={{ base: '10', md: '12' }}
    >
      <Stack alignItems="start" gap="6">
        <Logo height="32" />
        <Stack gap="5">
          <Stack gap="1">
            <Text fontWeight="medium">Address</Text>
            <Text color="fg.muted">1234 Market St, Suite 500, San Francisco, CA 94103</Text>
          </Stack>
          <Stack gap="1">
            <Text fontWeight="medium">Contact</Text>
            <Stack gap="0" color="fg.muted">
              <Link href="tel:+1-847-555-5555" colorPalette="gray" color="fg.muted">
                1-415-555-7890
              </Link>
              <Link href="mailto:support@logo.com" colorPalette="gray" color="fg.muted">
                support@logo.com
              </Link>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <SimpleGrid columns={2} gap="8" width={{ base: 'full', md: 'auto' }}>
        {links.slice(0, 2).map((group, idx) => (
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
    </Stack>
    <Separator />
    <Stack
      direction={{ base: 'column-reverse', md: 'row' }}
      alignItems="start"
      justify="space-between"
      align="center"
      py="6"
      gap="8"
    >
      <Copyright />
      <Stack direction={{ base: 'column', md: 'row' }} gap={{ base: '3', md: '6' }}>
        {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((label, idx) => (
          <Link key={idx} color="fg.muted">
            {label}
          </Link>
        ))}
      </Stack>
    </Stack>
  </Container>
)
