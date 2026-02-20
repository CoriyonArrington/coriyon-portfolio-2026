import { Box, Container, HStack, Stack, Text, IconButton, Link as ChakraLink, Avatar } from '@chakra-ui/react'
import { LuLinkedin, LuGithub, LuYoutube } from 'react-icons/lu'
import { LanguageSwitcher } from '@/components/blocks/marketing-navbars/navbar-island/language-switcher'
import { ColorModeButton } from '@/components/ui/color-mode'
import NextLink from 'next/link'

interface FooterProps {
  dict?: any;
}

export const Block = ({ dict }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <Box as="footer" bg="bg.panel" borderTopWidth="1px" borderColor="border.subtle">
      <Container maxW="7xl" py={{ base: '12', md: '16' }} px={{ base: '4', md: '8' }}>
        <Stack gap="10" align="center">
          
          <Stack 
            direction={{ base: 'column', md: 'row' }} 
            justify="space-between" 
            align="center" 
            w="full" 
            gap="8"
          >
            {/* Logo Area with Avatar - Wrapped in a link to scroll to top */}
            <ChakraLink href="#" variant="plain" _hover={{ textDecoration: "none" }}>
              <HStack gap="3">
                <Avatar.Root size="sm">
                  {/* Updated with your specific Supabase avatar URL */}
                  <Avatar.Image src="https://kkegducuyzwdmxlzhxcm.supabase.co/storage/v1/object/public/images/avatars/coriyon-arrington.png" alt="Coriyon Arrington" />
                  <Avatar.Fallback name="Coriyon Arrington" />
                </Avatar.Root>
                <Text fontWeight="bold" fontSize="xl" color="fg" letterSpacing="tight">
                  {dict?.logo || "Coriyon"}
                </Text>
              </HStack>
            </ChakraLink>

            {/* Navigation Links with Smooth Scroll using native anchor behavior */}
            <HStack 
              gap={{ base: '6', md: '10' }} 
              flexWrap="wrap" 
              justify="center" 
              color="fg.muted" 
              fontWeight="medium"
              fontSize="sm"
            >
              <ChakraLink href="#projects" variant="plain" _hover={{ color: "fg", textDecoration: "none" }}>
                {dict?.projects || "Projects"}
              </ChakraLink>
              <ChakraLink href="#testimonials" variant="plain" _hover={{ color: "fg", textDecoration: "none" }}>
                {dict?.testimonials || "Testimonials"}
              </ChakraLink>
              <ChakraLink href="#faqs" variant="plain" _hover={{ color: "fg", textDecoration: "none" }}>
                {dict?.faqs || "FAQs"}
              </ChakraLink>
              <ChakraLink href="#contact" variant="plain" _hover={{ color: "fg", textDecoration: "none" }}>
                {dict?.contact || "Contact"}
              </ChakraLink>
            </HStack>

            {/* Controls & Socials */}
            <HStack gap="4">
              <HStack gap="2">
                <IconButton variant="ghost" size="sm" aria-label="LinkedIn" asChild>
                  <NextLink href="https://linkedin.com/in/coriyonarrington" target="_blank">
                    <LuLinkedin />
                  </NextLink>
                </IconButton>
                <IconButton variant="ghost" size="sm" aria-label="GitHub" asChild>
                  <NextLink href="https://github.com/CoriyonArrington" target="_blank">
                    <LuGithub />
                  </NextLink>
                </IconButton>
                <IconButton variant="ghost" size="sm" aria-label="YouTube" asChild>
                  <NextLink href="https://www.youtube.com/@uxcoriyon" target="_blank">
                    <LuYoutube />
                  </NextLink>
                </IconButton>
              </HStack>
              <HStack gap="1" borderRightWidth="1px" borderColor="border.subtle" pe="4">
                <LanguageSwitcher />
                <ColorModeButton />
              </HStack>
            </HStack>
          </Stack>
          
          {/* Copyright */}
          <Box w="full" borderTopWidth="1px" borderColor="border.subtle" pt="8">
            <Text color="fg.subtle" fontSize="xs" textAlign="center">
              © {currentYear} Coriyon Arrington. {dict?.rights || "All rights reserved."}
            </Text>
          </Box>

        </Stack>
      </Container>
    </Box>
  )
}