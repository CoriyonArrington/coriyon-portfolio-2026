import { Link, Stack, type StackProps } from '@chakra-ui/react'

const navLinks = [
  { label: 'Projects', href: '#projects' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'FAQs', href: '#faqs' },
  { label: 'Contact', href: '#contact' },
]

export const NavbarLinks = (props: StackProps) => {
  return (
    <Stack direction={{ base: 'column', md: 'row' }} gap={{ base: '6', md: '8' }} {...props}>
      {navLinks.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          fontWeight="medium"
          color="fg.muted"
          _hover={{ color: 'colorPalette.fg', textDecoration: 'none' }}
        >
          {item.label}
        </Link>
      ))}
    </Stack>
  )
}