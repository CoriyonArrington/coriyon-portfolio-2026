'use client'

import { useState, useEffect, useRef, createElement } from 'react';
import { Box, Button, Center, VStack, Text, HStack } from '@chakra-ui/react';
import { LuPlay, LuMousePointer2, LuMove } from 'react-icons/lu';
import Script from 'next/script';

export function InteractiveSpline() {
  const [isStarted, setIsStarted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Your optimized background image from Supabase
  const bgImageUrl = "https://kkegducuyzwdmxlzhxcm.supabase.co/storage/v1/object/public/images/misc/3d-paths-playground.png";

  useEffect(() => {
    // We only need to listen for scrolling and clicking if the WebGL canvas is actively running
    if (!isStarted || !containerRef.current) return;

    // 1. Click Outside Handler
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsStarted(false); // Unmount Spline and revert to the image facade
      }
    };

    // 2. Scroll Out of View Handler
    const observer = new IntersectionObserver(
      ([entry]) => {
        // If the component is completely out of the viewport, stop the scene
        if (!entry.isIntersecting) {
          setIsStarted(false);
        }
      },
      { threshold: 0 } // 0 means it triggers the moment it's 100% off-screen
    );

    // Attach the listeners
    document.addEventListener('mousedown', handleClickOutside);
    observer.observe(containerRef.current);

    // Cleanup listeners when the component unmounts or state changes
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      observer.disconnect();
    };
  }, [isStarted]);

  return (
    // The master ref wrapper tracks the physical space of the component for our click/scroll detectors
    <Box ref={containerRef} w="full" h="full" borderRadius="inherit" position="relative">
      {!isStarted ? (
        <Center
          w="full"
          h="full"
          borderRadius="inherit"
          position="absolute"
          inset="0"
          backgroundImage={`url(${bgImageUrl})`}
          backgroundSize="cover"
          backgroundPosition="center"
          overflow="hidden"
        >
          {/* Dark overlay to ensure text readability against the dynamic background image */}
          <Box position="absolute" inset="0" bg="blackAlpha.600" zIndex="0" />

          <VStack gap="8" p="8" textAlign="center" zIndex="1" color="white">
            <VStack gap="3">
              <Button
                size="xl"
                onClick={() => setIsStarted(true)}
                rounded="full"
                shadow="lg"
                px="8"
                h="14"
                _hover={{ transform: 'scale(1.05)', shadow: 'xl' }}
                transition="all 0.2s"
              >
                <LuPlay fill="currentColor" size="20px" style={{ marginRight: '8px' }} /> Start 3D Experience
              </Button>
              <Text color="whiteAlpha.800" fontSize="sm">
                Loads interactive WebGL content
              </Text>
            </VStack>

            <HStack gap={{ base: "4", md: "8" }} color="whiteAlpha.800" fontSize="sm" fontWeight="medium" flexWrap="wrap" justify="center">
              <HStack gap="2">
                <LuMousePointer2 size="18px" />
                <Text>Click & drag to orbit</Text>
              </HStack>
              <HStack gap="2">
                <LuMove size="18px" />
                <Text>Scroll to zoom</Text>
              </HStack>
            </HStack>
          </VStack>
        </Center>
      ) : (
        <Box w="full" h="full" borderRadius="inherit" overflow="hidden" pointerEvents="auto" bg="bg.canvas" position="absolute" inset="0">
          {/* Optimized Next.js script loader */}
          <Script 
            type="module" 
            src="https://unpkg.com/@splinetool/viewer@1.12.61/build/spline-viewer.js" 
          />
          
          {/* Uses native createElement to perfectly bypass strict JSX IntrinsicElements TS errors */}
          {createElement('spline-viewer', {
            url: "https://prod.spline.design/O7IfMXEyBtgF0GMw/scene.splinecode",
            style: { width: '100%', height: '100%', minHeight: '100%' }
          })}
        </Box>
      )}
    </Box>
  );
}