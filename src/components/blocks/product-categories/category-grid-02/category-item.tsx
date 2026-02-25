'use client'

import { Box, Button, Heading, Stack, Text, Center } from '@chakra-ui/react'
import Image from 'next/image'
import NextLink from 'next/link'
import { motion } from 'motion/react'

interface CategoryItemProps {
  dict?: any
  data: { 
    title: string;
    description?: string;
    src?: string | null;
    url?: string | null;
    videoUrl?: string | null; 
    bgColor?: string; 
    mockupType?: string | null;
  }
  minH?: any
  priority?: boolean
}

export const CategoryItem = (props: CategoryItemProps) => {
  const { dict, data, minH, priority } = props
  
  const showMockup = data.mockupType === 'phone' || data.mockupType === 'tablet'
  const isTablet = data.mockupType === 'tablet'
  const isPadded = data.mockupType === 'padded'
  const hasVideo = !!data.videoUrl

  const validSrc = data.src && data.src.trim() !== "" ? data.src : null

  const DoubleLayerMedia = () => (
    <>
      {validSrc && (
        <Box position="absolute" inset="0" zIndex="0">
          <Image
            src={validSrc}
            alt={data.title}
            fill
            priority={priority}
            style={{ objectFit: isPadded ? 'contain' : 'cover' }}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </Box>
      )}

      {hasVideo && (
        <video
          src={data.videoUrl!}
          autoPlay 
          loop 
          muted 
          playsInline
          poster={validSrc || undefined}
          preload={priority ? "auto" : "metadata"}
          style={{ 
            position: 'absolute', 
            inset: 0, 
            width: '100%', 
            height: '100%', 
            objectFit: isPadded ? 'contain' : 'cover', 
            zIndex: 1 
          }}
        />
      )}
    </>
  )

  return (
    <Box 
      asChild
      borderRadius="l3" 
      overflow="hidden" 
      position="relative" 
      width="full" 
      display="flex"
      bg={data.bgColor || "bg.muted"}
      minH={minH}
      cursor="pointer"
    >
      <NextLink href={data.url || '#'}>
        <motion.div
          layout
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          whileHover={{ y: -8 }}
          transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
          style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden', width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}
        >
          {showMockup ? (
            <Center position="absolute" inset="0" p={{ base: '6', md: '10' }} pb={{ base: '32', md: '40' }} zIndex="0">
              <Box position="relative" h="full" w="full" maxH={isTablet ? "360px" : "480px"} display="flex" justifyContent="center" alignItems="center">
                <Box position="relative" h="full" aspectRatio={isTablet ? '1106/814' : '422/862'}>
                  <Box position="absolute" inset={isTablet ? "4.8% 4.2%" : "2.2% 5.2% 2.2% 5.2%"} borderRadius={isTablet ? "sm" : "3xl"} overflow="hidden" bg="black" zIndex="0">
                    <DoubleLayerMedia />
                  </Box>
                  <Box position="relative" h="full" w="auto" aspectRatio={isTablet ? '1106/814' : '422/862'} zIndex="1">
                    <Image
                      src={isTablet 
                        ? "https://kkegducuyzwdmxlzhxcm.supabase.co/storage/v1/object/public/images/misc/ipad-mockup-optimized.png"
                        : "https://kkegducuyzwdmxlzhxcm.supabase.co/storage/v1/object/public/images/misc/iphone-mockup-optimized.png"
                      }
                      alt={`${data.mockupType} mockup`}
                      fill
                      priority={priority}
                      unoptimized={true}
                      style={{ objectFit: 'contain', pointerEvents: 'none' }}
                    />
                  </Box>
                </Box>
              </Box>
            </Center>
          ) : isPadded ? (
            <Box 
              position="absolute" 
              inset="0" 
              zIndex="0" 
              p={{ base: '8', md: '12' }} 
              pb={{ base: '40', md: '48' }} 
              display="flex"
              alignItems="center" 
              justifyContent="center"
            >
               <Box position="relative" w="full" aspectRatio="16/9" borderRadius="xl" overflow="hidden" shadow="2xl">
                 <DoubleLayerMedia />
               </Box>
            </Box>
          ) : (
            // FIX: For videos/images where mockupType is null. 
            // Creates a 16:9 ratio box so the sides of your pre-rendered videos don't get chopped off!
            <Box 
              position="absolute" 
              inset="0" 
              zIndex="0" 
              display="flex"
              alignItems="center"
              justifyContent="center"
              pb={{ base: '28', md: '40' }} // Pushes the video up so it doesn't overlap with the title text
            >
               <Box position="relative" w="full" aspectRatio="16/9" overflow="hidden">
                 <DoubleLayerMedia />
               </Box>
            </Box>
          )}

          <Box 
            position="relative" 
            mt="auto" 
            width="full" 
            zIndex="2" 
            background="linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0.4) 75%, transparent 100%)" 
            px={{ base: '6', md: '10' }} 
            pb={{ base: '8', md: '10' }} 
            pt={{ base: '32', md: '48' }} 
            display="flex" 
            flexDirection="column" 
            justifyContent="flex-end"
          >
            <Stack gap="3">
              <Heading size={{ base: "xl", md: "2xl" }} color="white">{data.title}</Heading>
              {data.description && <Text color="whiteAlpha.900" maxW="lg" fontWeight="medium" fontSize={{ base: "sm", md: "md" }}>{data.description}</Text>}
              
              <Button 
                variant="solid" 
                bg="white" 
                color="black" 
                _hover={{ bg: "gray.100" }} 
                alignSelf="start" 
                mt="2"
                pointerEvents="none"
              >
                {dict?.viewProject || "View Project"}
              </Button>
            </Stack>
          </Box>
        </motion.div>
      </NextLink>
    </Box>
  )
}