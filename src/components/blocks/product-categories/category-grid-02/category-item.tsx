import { Box, Button, Heading, Stack, Text, Center } from '@chakra-ui/react'
import Image from 'next/image'
import NextLink from 'next/link'

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
            style={{ objectFit: 'cover' }}
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
            objectFit: 'cover', 
            zIndex: 1 
          }}
        />
      )}
    </>
  )

  return (
    <Box 
      borderRadius="l3" 
      overflow="hidden" 
      position="relative" 
      width="full" 
      display="flex"
      bg={data.bgColor || "bg.muted"}
      minH={minH}
      style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }} 
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
      ) : (
        <Box position="absolute" inset="0" zIndex="0">
           <DoubleLayerMedia />
        </Box>
      )}

      <Box position="relative" mt="auto" width="full" zIndex="2" background="linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)" px={{ base: '6', md: '10' }} py={{ base: '8', md: '10' }} display="flex" flexDirection="column" justifyContent="flex-end">
        <Stack gap="3">
          <Heading size={{ base: "xl", md: "2xl" }} color="white">{data.title}</Heading>
          {data.description && <Text color="whiteAlpha.900" maxW="lg" fontWeight="medium" fontSize={{ base: "sm", md: "md" }}>{data.description}</Text>}
          <Button variant="solid" bg="white" color="black" _hover={{ bg: "gray.100" }} alignSelf="start" asChild mt="2">
            <NextLink href={data.url || '#'}>{dict?.viewProject || "View Project"}</NextLink>
          </Button>
        </Stack>
      </Box>
    </Box>
  )
}