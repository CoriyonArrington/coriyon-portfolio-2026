import { Container, Grid, Stack, Heading, Text, Badge } from '@chakra-ui/react'
import { CategoryItem } from './category-item'

interface Project {
  id: string | number 
  title: string
  description: string
  image_url: string
  link_url: string
  videoUrl?: string | null
  bgColor?: string
  mockupType?: string | null
}

interface BlockProps {
  dict?: any;
  projects: Project[]
}

export const Block = ({ dict, projects }: BlockProps) => {
  if (!projects || projects.length === 0) return null

  return (
    <Container maxW="7xl" py={{ base: '8', lg: '16' }}>
      
      {/* NEW: Left-Aligned Header Area to match Testimonials */}
      {(dict?.badge || dict?.tagline || dict?.title || dict?.description) && (
        <Stack gap={{ base: '4', md: '6' }} align="flex-start" mb={{ base: '10', md: '16' }}>
          <Stack gap="3" align="flex-start">
            {(dict?.badge || dict?.tagline || dict?.tag) && (
              <Badge 
                variant="subtle" 
                colorPalette="green" 
                size="lg" 
                rounded="full" 
                px="3" 
                py="1"
              >
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
        </Stack>
      )}

      <Grid
        gap={{ base: '8', md: '10' }}
        templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }}
      >
        {projects.map((item, index) => (
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
      </Grid>
    </Container>
  )
}