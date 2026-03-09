import { Box, Stack, Container } from "@chakra-ui/react"
import { supabase } from "@/lib/supabase"
import { unstable_cache } from "next/cache"
import { Block as NavbarIsland } from "@/components/blocks/marketing-navbars/navbar-island/block"
import { Block as CategoryGrid } from "@/components/blocks/product-categories/category-grid-02/block"
import { Block as Footer } from "@/components/blocks/footers/footer-with-address/block"
import { FadeIn } from "@/components/ui/fade-in"

// Import the specialized Project Detail Hero & your new Interactive Embed
import { Block as ProjectDetailHero } from "@/components/blocks/heroes/project-detail-page/block"
import { InteractiveSpline } from "@/components/ui/interactive-spline"

export const revalidate = 3600 

// --- OPTIMIZATION: Next.js memory cache for DB queries to eliminate FCP delay ---
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
    // FIX: Ensure we only pull published projects
    const { data } = await supabase.from('projects').select('*').eq('status', 'published').order('sort_order', { ascending: true })
    return data || []
  },
  ['published-projects-list'],
  { revalidate: 3600, tags: ['projects'] }
)
// ---------------------------------------------------------------------------------

export default async function PlaygroundPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const currentLocale = locale || 'en'

  // OPTIMIZATION: Parallelize Data Fetching using the lightning-fast memory cache
  const [
    playgroundData,
    homeData,
    projects
  ] = await Promise.all([
    getCachedPage('playground'),
    getCachedPage('home'),
    getCachedProjects()
  ]);

  const playgroundContent = playgroundData?.[`content_${currentLocale}`] || playgroundData?.content_en || {}
  const homeContent = homeData?.[`content_${currentLocale}`] || homeData?.content_en || {}

  const localizedProjects = projects?.map((p: any) => ({
    id: p.id,
    title: p[`title_${currentLocale}`] || p.title_en || p.title,
    description: p[`description_${currentLocale}`] || p.description_en || p.description,
    image_url: p.featured_image_url, 
    videoUrl: p.featured_video_url, 
    link_url: `/${currentLocale}/projects/${p.slug}`,
    bgColor: p.bg_color,
    mockupType: p.mockup_type,
    category: p.project_category,
    projectType: p.project_type 
  }))
  
  // FIX: Split sections using the new project_type enum instead of category string parsing
  const playgroundProjects = localizedProjects?.filter((p: any) => p.projectType === 'playground') || []

  return (
    <Box bg="bg.canvas" minH="100vh">
      <NavbarIsland dict={homeContent.navbar} />
      
      <Stack gap="0">
        <ProjectDetailHero 
          dict={playgroundContent.hero}
          title={playgroundContent.hero?.title || "*Creative* Playground."}
          description={playgroundContent.hero?.description || "A collection of experimental projects, interactive 3D scenes, and technical explorations."}
          tagline={playgroundContent.hero?.tagline || "Experiments & Explorations"}
          primaryCtaText="Explore projects"
          secondaryCtaText="Show overview"
          primaryScrollTo="playground-projects"
          buttonColor="green.600"
          bgColor="transparent"
          interactiveElement={<InteractiveSpline />}
        />

        {playgroundProjects.length > 0 && (
          <Box id="playground-projects" py={{ base: "16", md: "24" }} borderTopWidth="1px" borderColor="border.subtle" className="pattern-dots" position="relative">
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