import { Box, Container, Stack } from "@chakra-ui/react"
import { supabase } from "@/lib/supabase"
import { unstable_cache } from "next/cache"
import { Block as HomeHero } from "@/components/blocks/heroes/home-page/block"
import { Block as FeaturedTestimonial } from "@/components/blocks/testimonials/testimonial-with-rating/block"
import { Block as CategoryGrid } from "@/components/blocks/product-categories/category-grid-02/block"
import { Block as ProcessTimeline } from "@/components/blocks/process/timeline-section"
import { Block as Cta } from "@/components/blocks/cta/cta-08/block"
import { FadeIn } from "@/components/ui/fade-in"

export const revalidate = 3600 

const getCachedPage = unstable_cache(
  async (slug: string) => {
    const { data } = await supabase.from('pages').select('*').eq('slug', slug).single()
    return data || {}
  },
  ['page-data'],
  { revalidate: 3600, tags: ['pages'] }
)

const getCachedProjects = unstable_cache(
  async () => {
    const { data } = await supabase.from('projects').select('*').eq('status', 'published').order('sort_order', { ascending: true })
    return data || []
  },
  ['published-projects-list'],
  { revalidate: 3600, tags: ['projects'] }
)

const getCachedFeaturedTestimonials = unstable_cache(
  async () => {
    const { data } = await supabase.from('testimonials').select('*').eq('is_featured', true).limit(1)
    return data || []
  },
  ['featured-testimonials'],
  { revalidate: 3600, tags: ['testimonials'] }
)

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const currentLocale = locale || 'en'

  const [pageData, projects, featuredTestimonials] = await Promise.all([
    getCachedPage('home'),
    getCachedProjects(),
    getCachedFeaturedTestimonials()
  ]);

  const content = pageData?.[`content_${currentLocale}`] || pageData?.content_en || {}

  const localizedProjects = projects?.map((p: any) => ({
    id: p.id,
    title: p[`title_${currentLocale}`] || p.title_en || p.title,
    description: p[`description_${currentLocale}`] || p.description_en || p.description,
    image_url: p.featured_image_url, 
    src: p.featured_image_url,       
    videoUrl: p.featured_video_url, 
    link_url: `/${currentLocale}/projects/${p.slug}`, 
    url: `/${currentLocale}/projects/${p.slug}`,      
    bgColor: p.bg_color,
    mockupType: p.mockup_type,
    category: p.project_category,
    projectType: p.project_type
  }))
  
  const regularProjects = localizedProjects?.filter((p: any) => p.projectType !== 'playground') || []
  const playgroundProjects = localizedProjects?.filter((p: any) => p.projectType === 'playground') || []
  
  const featuredProject = projects?.find((p: any) => p.featured === true)

  const featuredTestimonial = featuredTestimonials?.[0] ? {
    ...featuredTestimonials[0],
    quote: featuredTestimonials[0][`quote_${currentLocale}`] || featuredTestimonials[0].quote_en || featuredTestimonials[0].quote,
    role: featuredTestimonials[0][`role_${currentLocale}`] || featuredTestimonials[0].role_en || featuredTestimonials[0].role
  } : null;

  return (
    <Stack gap="0" w="full">
      <Box className="pattern-dots">
        <Container maxW="7xl" px={{ base: "4", md: "8" }}>
          <HomeHero 
            dict={content.hero}
            title={content.hero?.title || featuredProject?.[`title_${currentLocale}`] || featuredProject?.title_en}
            description={content.hero?.description || featuredProject?.[`description_${currentLocale}`] || featuredProject?.description_en}
            tagline={content.hero?.tagline}
            videoUrl={featuredProject?.featured_video_url}
            imageUrl={featuredProject?.featured_image_url} 
          />
        </Container>
      </Box>

      <Box id="testimonials" py={{ base: "16", md: "24" }} bg={{ base: "bg.emphasized", _dark: "black" }}>
        <Container maxW="7xl" px={{ base: "4", md: "8" }}>
          <FadeIn>
            {featuredTestimonial && <FeaturedTestimonial testimonial={featuredTestimonial} />}
          </FadeIn>
        </Container>
      </Box>

      {regularProjects.length > 0 && (
        <Box id="projects" py={{ base: "16", md: "24" }} className="pattern-dots" suppressHydrationWarning>
          <Container maxW="7xl" px={{ base: "4", md: "8" }}>
            <FadeIn>
              <CategoryGrid 
                dict={content.project} 
                projects={regularProjects} 
                viewAllHref={`/${currentLocale}/projects`}
                viewAllText={currentLocale === 'es' ? 'Ver todos los proyectos' : 'View all projects'}
              />
            </FadeIn>
          </Container>
        </Box>
      )}

      {playgroundProjects.length > 0 && (
        <Box id="playground" py={{ base: "16", md: "24" }} bg={{ base: "bg.subtle", _dark: "black" }} borderTopWidth="1px" borderColor="border.subtle" suppressHydrationWarning>
          <Container maxW="7xl" px={{ base: "4", md: "8" }}>
            <FadeIn>
              <CategoryGrid 
                dict={content.playground} 
                projects={playgroundProjects} 
                viewAllHref={`/${currentLocale}/playground`}
                viewAllText={currentLocale === 'es' ? 'Ver todos los experimentos' : 'View all experiments'}
              />
            </FadeIn>
          </Container>
        </Box>
      )}

      <Box id="process" w="full" pt={{ base: "16", md: "24" }}>
          <ProcessTimeline dict={content.process} />
      </Box>

      <Box id="contact" py={{ base: "16", md: "24" }} className="pattern-dots" borderTopWidth="1px" borderColor="border.subtle" suppressHydrationWarning>
        <Container maxW="7xl" px={{ base: "4", md: "8" }}>
          <FadeIn>
            <Cta dict={content.contact} />
          </FadeIn>
        </Container>
      </Box>
    </Stack>
  )
}