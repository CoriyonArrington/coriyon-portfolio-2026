import { Box, Stack, Container } from "@chakra-ui/react"
import { supabase } from "@/lib/supabase"
import { Block as NavbarIsland } from "@/components/blocks/marketing-navbars/navbar-island/block"
import { Block as HeroSpline } from "@/components/blocks/heroes/hero-with-video/block"
import { Block as CategoryGrid } from "@/components/blocks/product-categories/category-grid-02/block"
import { Block as Footer } from "@/components/blocks/footers/footer-with-address/block"
import { FadeIn } from "@/components/ui/fade-in"

export const revalidate = 0 

export default async function PlaygroundPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const currentLocale = locale || 'en'

  const { data: playgroundData } = await supabase.from('pages').select('*').eq('slug', 'playground').single()
  const { data: homeData } = await supabase.from('pages').select('*').eq('slug', 'home').single()
  const { data: projects } = await supabase.from('projects').select('*').order('sort_order', { ascending: true })

  const playgroundContent = playgroundData?.[`content_${currentLocale}`] || playgroundData?.content_en || {}
  const homeContent = homeData?.[`content_${currentLocale}`] || homeData?.content_en || {}

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
  
  // Filter only projects belonging to the 'Playground' category
  const playgroundProjects = localizedProjects?.filter(p => p.category?.includes('Playground')) || []

  return (
    <Box bg="bg.canvas" minH="100vh">
      <NavbarIsland dict={homeContent.navbar} />
      
      <Stack gap="0">
        <FadeIn>
          <HeroSpline dict={playgroundContent.hero} />
        </FadeIn>

        {/* Playground Projects Section */}
        {playgroundProjects.length > 0 && (
          <Box py={{ base: "16", md: "24" }} className="pattern-dots" borderTopWidth="1px" borderColor="border.subtle">
            <Container maxW="7xl" px={{ base: "4", md: "8" }}>
              <FadeIn>
                <CategoryGrid dict={homeContent.playground} projects={playgroundProjects} />
              </FadeIn>
            </Container>
          </Box>
        )}

        <FadeIn>
          <Footer dict={homeContent.footer} />
        </FadeIn>
      </Stack>
    </Box>
  )
}