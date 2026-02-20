'use client'

import { Flex, Image, Text } from '@chakra-ui/react'
import Link from 'next/link'

export const Logo = () => {
  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Intercept the click if we are already on the home page
    if (window.location.pathname === '/' || window.location.pathname.match(/^\/[a-z]{2}(-[A-Z]{2})?$/)) {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
      window.history.pushState(null, '', window.location.pathname)
    }
  }

  return (
    <Link href="/" onClick={scrollToTop}>
      <Flex align="center" gap="3" cursor="pointer">
        <Image 
          src="https://kkegducuyzwdmxlzhxcm.supabase.co/storage/v1/object/public/images/avatars/coriyon-arrington.png" 
          alt="Coriyon Arrington" 
          boxSize="8" 
          borderRadius="full" 
          objectFit="cover"
        />
        <Text fontWeight="bold" fontSize="lg">Coriyon</Text>
      </Flex>
    </Link>
  )
}