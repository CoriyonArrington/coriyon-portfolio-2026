import { Box, Container, Stack } from "@chakra-ui/react"
import { supabase } from "@/lib/supabase"
import { cache } from "react"
import type { Metadata, ResolvingMetadata } from "next"

import { Block as ProjectsHero } from "@/components/blocks/heroes/projects-page/block"
import { Block as CategoryGrid } from "@/components/blocks/product-categories/category-grid-02/block"
import { Block as Faq } from "@/components/blocks/faqs/faq-with-inline-headline/block"
import { Block as Cta } from "@/components/blocks/cta/cta-08/block"
import { FadeIn } from "@/components/ui/fade-in"

export const dynamic = 'force-dynamic'

// 1. Wrap fetches in React.cache for consistent server performance
const getPageData = cache(async (slug: string) => {
  const { data } = await supabase.from('pages').select('*').eq('slug', slug).single()
  return data || {}
})

const getProjectsData = cache(async () => {
  const { data } = await supabase.from('projects').select('*').eq('status', 'published').order('sort_order', { ascending: true })
  return data || []
})

// 2. Dynamic SEO Metadata Generation
export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { locale } = await params;
  const currentLocale = locale || 'en'
  const pageData = await getPageData('projects')
  
  const title = pageData?.[`title_${currentLocale}`] || pageData?.title_en || pageData?.title || 'Projects | Coriyon Arrington'
  const description = pageData?.[`description_${currentLocale}`] || pageData?.description_en || pageData?.description

  return {
    title,
    description,
    openGraph: { title, description },
    twitter: { title, description }
  }
}

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const currentLocale = locale || 'en'

  const [projectsPageData, homeData, projects] = await Promise.all([
    getPageData('projects'),
    getPageData('home'),
    getProjectsData()
  ]);

  const projectsContent = projectsPageData?.[`content_${currentLocale}`] || projectsPageData?.content_en || {}
  const homeContent = homeData?.[`content_${currentLocale}`] || homeData?.content_en || {}

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
    projectType: p.project_type,
    featured: p.featured,
    contentJson: p[`content_${currentLocale}`] || p.content_en || {}
  })) || []
  
  const regularProjects = localizedProjects.filter((p: any) => p.projectType !== 'playground')
  const playgroundProjects = localizedProjects.filter((p: any) => p.projectType === 'playground')
  
  const featuredProject = localizedProjects.find((p: any) => p.featured === true)
  
  const pageFaqs = projectsContent.faqs?.items || []

  return (
    <Stack gap="0" w="full">
      {(projectsContent.hero || featuredProject) && (
        <Box className="pattern-dots">
          <Container maxW="7xl" px={{ base: "4", md: "8" }}>
            <ProjectsHero 
              dict={{ 
                ...projectsContent.hero, 
                exploreWork: projectsContent.hero?.exploreWork, 
                showOverview: projectsContent.hero?.showOverview 
              }}
              title={projectsContent.hero?.title}
              description={projectsContent.hero?.description}
              tagline={projectsContent.hero?.tagline}
              
              imageUrl={featuredProject?.image_url || projectsContent.hero?.imageUrl}
              videoUrl={featuredProject?.videoUrl || projectsContent.hero?.videoUrl}
              mockupType={featuredProject?.mockupType || projectsContent.hero?.mockupType}
              bgColor={featuredProject?.bgColor || projectsContent.hero?.bgColor || "colorPalette.600"}
              
              summary={featuredProject?.contentJson?.overview?.oneLiner || featuredProject?.description || projectsContent.hero?.description}
              role={featuredProject?.contentJson?.overview?.myRole || projectsContent.hero?.stats?.role}
              duration={featuredProject?.contentJson?.overview?.timeframe?.total || projectsContent.hero?.stats?.duration}
              year={featuredProject?.contentJson?.overview?.year || projectsContent.hero?.stats?.year}
              teamRoles={featuredProject?.contentJson?.overview?.teamRoles || projectsContent.hero?.stats?.teamRoles}
              deliverables={featuredProject?.contentJson?.overview?.deliverables || projectsContent.hero?.stats?.deliverables}
              industries={featuredProject?.contentJson?.overview?.industries || projectsContent.hero?.stats?.industries}
            />
          </Container>
        </Box>
      )}

      {regularProjects.length > 0 && (
        <Box id="projects" py={{ base: "16", md: "24" }} className="pattern-dots" borderTopWidth="1px" borderColor="border.subtle">
          <Container maxW="7xl" px={{ base: "4", md: "8" }}>
            <FadeIn>
              <CategoryGrid 
                dict={homeContent.project} 
                projects={regularProjects} 
              />
            </FadeIn>
          </Container>
        </Box>
      )}

      {playgroundProjects.length > 0 && (
        <Box id="playground" py={{ base: "16", md: "24" }} bg="bg.canvas" borderTopWidth="1px" borderColor="border.subtle">
          <Container maxW="7xl" px={{ base: "4", md: "8" }}>
            <FadeIn>
              <CategoryGrid 
                dict={homeContent.playground} 
                projects={playgroundProjects} 
                viewAllHref={`/${currentLocale}/playground`}
                viewAllText={homeContent.playground?.viewAll}
              />
            </FadeIn>
          </Container>
        </Box>
      )}

      {pageFaqs.length > 0 && (
        <Box id="faqs" w="full" borderTopWidth="1px" borderColor="border.subtle">
          <FadeIn>
            <Faq dict={projectsContent.faqs} faqs={pageFaqs} />
          </FadeIn>
        </Box>
      )}

      {homeContent.contact && (
        <Box id="contact" py={{ base: "16", md: "24" }} className="pattern-dots" borderTopWidth="1px" borderColor="border.subtle">
          <Container maxW="7xl" px={{ base: "4", md: "8" }}>
            <FadeIn>
              <Cta dict={homeContent.contact} />
            </FadeIn>
          </Container>
        </Box>
      )}
    </Stack>
  )
}