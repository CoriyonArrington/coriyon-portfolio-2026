import { Button, Link, Stack, type StackProps } from '@chakra-ui/react'

export const NavbarLinks = (props: StackProps) => {
  return (
    <Stack direction={{ base: 'column', md: 'row' }} gap={{ base: '6', md: '8' }} {...props}>
      {['Blocks', 'Pricing', 'Marketplace', 'Support'].map((item) => (
        <Link
          key={item}
          fontWeight="medium"
          color="fg.muted"
          _hover={{
            _hover: { color: 'colorPalette.fg', textDecoration: 'none' },
          }}
        >
          {item}
        </Link>
      ))}
      <Stack gap="3" direction={{ base: 'column', md: 'row' }}>
        <Button variant="outline" colorPalette="gray">
          Sign In
        </Button>
        <Button>Buy Now</Button>
      </Stack>
    </Stack>
  )
}
