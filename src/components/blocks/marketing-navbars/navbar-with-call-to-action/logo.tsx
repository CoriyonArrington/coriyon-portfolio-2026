import { Flex, Image, Text } from '@chakra-ui/react'
import Link from 'next/link'

export const Logo = () => (
  <Link href="/">
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