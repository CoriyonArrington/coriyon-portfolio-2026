'use client'

import { Box, Grid, Stack, Heading, Text, Badge, HStack, Button } from '@chakra-ui/react'
import { CategoryItem } from './category-item'
import { useState, useMemo } from 'react'
import { AnimatePresence } from 'motion/react'

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
  projects: Project[]
}

export const Block = ({ dict, projects }: BlockProps) => {
  const [activeFilter, setActiveFilter] = useState('All')

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

  return (
    // Swapped Container for Box to prevent double-padding from page.tsx
    <Box py={{ base: '8', lg: '16' }}>
      {(dict?.badge || dict?.tagline || dict?.title || dict?.description) && (
        <Stack gap={{ base: '4', md: '6' }} align="flex-start" mb={{ base: '10', md: '16' }}>
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
            <Text color="fg.muted" fontSize="lg" maxW="2xl">
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
                  onClick={() => setActiveFilter(filterName)}
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
          {filteredProjects.map((item, index) => (
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
    </Box>
  )
}