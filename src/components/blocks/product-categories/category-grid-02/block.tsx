import { Container, Grid } from '@chakra-ui/react'
import { CategoryItem } from './category-item'

export interface Project {
  id: number
  title: string
  description: string
  image_url: string
  link_url: string
}

interface BlockProps {
  projects: Project[]
}

export const Block = ({ projects }: BlockProps) => {
  if (!projects || projects.length === 0) return null

  return (
    <Container maxW="7xl" py={{ base: '8', lg: '16' }}>
      <Grid
        height={{ md: '640px' }}
        gap={{ base: '4', md: '8' }}
        templateColumns={{ md: 'repeat(3, 1fr)' }}
        templateRows={{ md: 'repeat(2, 1fr)' }}
      >
        {projects.map((item, index) => (
          <CategoryItem
            key={item.id}
            data={{
              title: item.title,
              description: item.description,
              src: item.image_url,
              url: item.link_url,
            }}
            data-first={index === 0 || undefined}
            gridRow={index === 0 ? { md: 'span 2' } : undefined}
            gridColumn={index === 0 ? { md: 'span 2' } : undefined}
            objectPosition={index === 0 ? 'top center' : undefined}
          />
        ))}
      </Grid>
    </Container>
  )
}