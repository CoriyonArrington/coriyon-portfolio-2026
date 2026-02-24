'use client'

import { Box, Grid, Stack, Heading, Text, Badge, HStack, Button } from '@chakra-ui/react'
import { CategoryItem } from './category-item'
import { useState, useMemo, useEffect } from 'react'
import { AnimatePresence } from 'motion/react'
import { useUiSounds } from '@/hooks/use-ui-sounds'
import Link from 'next/link'
import { LuArrowRight } from 'react-icons/lu'

interface Project {
  id: string | number 
  title: string
  description: string
  image_url: string
  link_url: string
  videoUrl?: string | null
  bgColor?: string
  mockupType?: string | null
  category?: string | null 
}

interface BlockProps {
  dict?: any;
  projects: Project[];
  viewAllHref?: string;
  viewAllText?: string;
}

export const Block = ({ dict, projects, viewAllHref, viewAllText }: BlockProps) => {
  const [activeFilter, setActiveFilter] = useState('All')
  const [isMobile, setIsMobile] = useState(false)
  
  // Track mounting to prevent Server-Side Hydration errors!
  const [mounted, setMounted] = useState(false) 
  const { playHover, playClick } = useUiSounds()

  useEffect(() => {
    setMounted(true) // Marks that we are safely on the client
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile() 
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleFilterChange = (filterName: string) => {
    playClick()
    setActiveFilter(filterName)
  }

  const categories = useMemo(() => {
    if (!projects) return ['All']
    
    const uniqueCategories = new Set<string>()
    projects.forEach(project => {
      if (project.category) {
        project.category.split(',').forEach(cat => {
          if (cat.trim() !== "") {
            uniqueCategories.add(cat.trim())
          }
        })
      }
    })
    
    return ['All', ...Array.from(uniqueCategories).sort()]
  }, [projects])

  if (!projects || projects.length === 0) return null

  const filteredProjects = projects.filter(project => {
    if (activeFilter === 'All') return true
    if (!project.category) return false
    
    const projectTags = project.category.split(',').map(c => c.trim())
    return projectTags.includes(activeFilter)
  })

  // Safe progressive disclosure:
  // If not mounted (SSR), it renders all cards to match the server. 
  // Once mounted on the client, it strictly enforces the 2-item mobile limit!
  const displayedProjects = (mounted && isMobile) ? filteredProjects.slice(0, 2) : filteredProjects

  return (
    <Box py={{ base: '8', lg: '16' }}>
      
      {(dict?.badge || dict?.tagline || dict?.title || dict?.description) && (
        <Stack gap={{ base: '4', md: '6' }} align="flex-start" maxW="2xl" mb={{ base: '10', md: '16' }}>
          <Stack gap="3" align="flex-start">
            {(dict?.badge || dict?.tagline || dict?.tag) && (
              <Badge variant="subtle" colorPalette="green" size="lg" rounded="full" px="3" py="1">
                {dict?.badge || dict?.tagline || dict?.tag}
              </Badge>
            )}
            
            {dict?.title && (
              <Heading size={{ base: "3xl", md: "4xl" }}>
                {dict.title}
              </Heading>
            )}
          </Stack>
          
          {dict?.description && (
            <Text color="fg.muted" fontSize="lg">
              {dict.description}
            </Text>
          )}

          {categories.length > 1 && (
            <HStack gap="2" pt="4" flexWrap="wrap">
              {categories.map((filterName) => (
                <Button
                  key={filterName}
                  size="sm"
                  variant={activeFilter === filterName ? "solid" : "subtle"}
                  colorPalette="green"
                  rounded="full"
                  onClick={() => handleFilterChange(filterName)}
                  onMouseEnter={playHover}
                  transition="all 0.2s"
                >
                  {filterName}
                </Button>
              ))}
            </HStack>
          )}
        </Stack>
      )}

      <Grid
        gap={{ base: '8', md: '10' }}
        templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }}
      >
        <AnimatePresence mode="popLayout">
          {displayedProjects.map((item, index) => (
            // Removed the wrapper Box to let the CategoryItem control its own Grid layout!
            <CategoryItem
              key={item.id}
              dict={dict} 
              data={{
                title: item.title,
                description: item.description,
                src: item.image_url,
                url: item.link_url,
                videoUrl: item.videoUrl,
                bgColor: item.bgColor,
                mockupType: item.mockupType
              }}
              minH={{ base: '500px', md: '640px' }}
              priority={index < 4} 
            />
          ))}
        </AnimatePresence>
      </Grid>

      <Stack mt="10" align="flex-start">
        {viewAllHref && (
          <Button variant="ghost" colorPalette="green" asChild size="lg" onClick={playClick} onMouseEnter={playHover}>
            <Link href={viewAllHref}>
              {viewAllText || "View all"} <LuArrowRight />
            </Link>
          </Button>
        )}
      </Stack>
    </Box>
  )
}