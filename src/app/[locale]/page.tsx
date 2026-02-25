import { Box, Container, Stack } from "@chakra-ui/react"
import { supabase } from "@/lib/supabase"
import { Block as NavbarIsland } from "@/components/blocks/marketing-navbars/navbar-island/block"
import { Block as HeroWithFullImage } from "@/components/blocks/heroes/hero-with-full-image/block"
import { Block as FeaturedTestimonial } from "@/components/blocks/testimonials/testimonial-with-rating/block"
import { Block as CategoryGrid } from "@/components/blocks/product-categories/category-grid-02/block"
import { Block as ProcessTimeline } from "@/components/blocks/process/timeline-section"
import { Block as Cta } from "@/components/blocks/cta/cta-08/block"
import { Block as Footer } from "@/components/blocks/footers/footer-with-address/block"
import { FadeIn } from "@/components/ui/fade-in"

export const revalidate = 0 

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const currentLocale = locale || 'en'

  const { data: pageData } = await supabase.from('pages').select('*').eq('slug', 'home').single()
  const { data: projects } = await supabase.from('projects').select('*').order('sort_order', { ascending: true })
  
  const { data: featuredTestimonials } = await supabase.from('testimonials').select('*').eq('is_featured', true).limit(1)

  const content = pageData?.[`content_${currentLocale}`] || pageData?.content_en || {}

  const localizedProjects = projects?.map(p => ({
    id: p.id,
    title: p[`title_${currentLocale}`] || p.title_en || p.title,
    description: p[`description_${currentLocale}`] || p.description_en || p.description,
    image_url: p.featured_image_url, 
    videoUrl: p.featured_video_url, 
    link_url: `/${currentLocale}/projects/${p.slug}`,
    bgColor: p.bg_color,
    mockupType: p.mockup_type,
    category: p.project_category 
  }))
  
  const regularProjects = localizedProjects?.filter(p => !p.category?.includes('Playground'))
  const playgroundProjects = localizedProjects?.filter(p => p.category?.includes('Playground'))
  
  const featuredProject = projects?.find(p => p.featured === true)

  const featuredTestimonial = featuredTestimonials?.[0] ? {
    ...featuredTestimonials[0],
    quote: featuredTestimonials[0][`quote_${currentLocale}`] || featuredTestimonials[0].quote_en || featuredTestimonials[0].quote,
    role: featuredTestimonials[0][`role_${currentLocale}`] || featuredTestimonials[0].role_en || featuredTestimonials[0].role
  } : null;

  return (
    <Box bg="bg.canvas" minH="100vh">
      <NavbarIsland dict={content.navbar} />
      <Stack gap="0">
        
        <Box className="pattern-dots">
          <Container maxW="7xl" px={{ base: "4", md: "8" }}>
            <FadeIn>
              <HeroWithFullImage 
                dict={content.hero}
                title={content.hero?.title || featuredProject?.[`title_${currentLocale}`] || featuredProject?.title_en}
                description={content.hero?.description || featuredProject?.[`description_${currentLocale}`] || featuredProject?.description_en}
                tagline={content.hero?.tagline}
                videoUrl={featuredProject?.featured_video_url}
                imageUrl={featuredProject?.featured_image_url} 
              />
            </FadeIn>
          </Container>
        </Box>

        <Box py={{ base: "16", md: "24" }} bg="bg.emphasized">
          <Container maxW="7xl" px={{ base: "4", md: "8" }}>
            <FadeIn>
              {featuredTestimonial && <FeaturedTestimonial testimonial={featuredTestimonial} />}
            </FadeIn>
          </Container>
        </Box>

        <Box id="projects" py={{ base: "16", md: "24" }} className="pattern-dots">
          <Container maxW="7xl" px={{ base: "4", md: "8" }}>
            <FadeIn>
              <CategoryGrid 
                dict={content.project} 
                projects={regularProjects || []} 
                viewAllHref={`/${currentLocale}/projects`}
                viewAllText={currentLocale === 'es' ? 'Ver todos los proyectos' : 'View all projects'}
              />
            </FadeIn>
          </Container>
        </Box>

        <Box id="playground" py={{ base: "16", md: "24" }} bg="bg.subtle" borderTopWidth="1px" borderColor="border.subtle">
          <Container maxW="7xl" px={{ base: "4", md: "8" }}>
            <FadeIn>
              <CategoryGrid 
                dict={content.playground} 
                projects={playgroundProjects || []} 
                viewAllHref={`/${currentLocale}/playground`}
                viewAllText={currentLocale === 'es' ? 'Ver todos los experimentos' : 'View all experiments'}
              />
            </FadeIn>
          </Container>
        </Box>

        <Box id="process" w="full" pt={{ base: "16", md: "24" }}>
            <ProcessTimeline dict={content.process} />
        </Box>

        <Box id="contact" py={{ base: "16", md: "24" }} className="pattern-dots" borderTopWidth="1px" borderColor="border.subtle">
          <Container maxW="7xl" px={{ base: "4", md: "8" }}>
            <FadeIn>
              <Cta dict={content.contact} />
            </FadeIn>
          </Container>
        </Box>
        
        <FadeIn>
          <Footer dict={content.footer} />
        </FadeIn>
      </Stack>
    </Box>
  )
}