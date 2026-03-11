import { Box, Container, Stack } from "@chakra-ui/react"
import { supabase } from "@/lib/supabase"
import { Block as ProjectsHero } from "@/components/blocks/heroes/projects-page/block"
import { Block as CategoryGrid } from "@/components/blocks/product-categories/category-grid-02/block"
import { Block as Cta } from "@/components/blocks/cta/cta-08/block"
import { FadeIn } from "@/components/ui/fade-in"

// FIX: Force dynamic rendering so Vercel never caches stale data. 
// When you publish a project in Supabase, it will show up instantly.
export const dynamic = 'force-dynamic'
export const revalidate = 0 

const getPageData = async (slug: string) => {
  const { data } = await supabase.from('pages').select('*').eq('slug', slug).single()
  return data || {}
}

const getProjectsData = async () => {
  const { data } = await supabase.from('projects').select('*').eq('status', 'published').order('sort_order', { ascending: true })
  return data || []
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

  return (
    <Stack gap="0" w="full">
      <Box className="pattern-dots" pb={{ base: "16", md: "24" }}>
        <Container maxW="7xl" px={{ base: "4", md: "8" }}>
          <ProjectsHero 
            dict={{ 
              ...projectsContent.hero, 
              exploreWork: projectsContent.hero?.exploreWork || (currentLocale === 'es' ? 'Ver proyectos' : 'View projects'), 
              showOverview: projectsContent.hero?.showOverview || (currentLocale === 'es' ? 'Resumen rápido' : 'Quick overview') 
            }}
            title={projectsContent.hero?.title}
            description={projectsContent.hero?.description}
            tagline={projectsContent.hero?.tagline}
            
            imageUrl={featuredProject?.image_url || projectsContent.hero?.imageUrl}
            videoUrl={featuredProject?.videoUrl || projectsContent.hero?.videoUrl}
            mockupType={featuredProject?.mockupType || projectsContent.hero?.mockupType}
            bgColor={featuredProject?.bgColor || projectsContent.hero?.bgColor || "green.600"}
            
            summary={featuredProject?.contentJson?.overview?.oneLiner || featuredProject?.description || projectsContent.hero?.summary}
            role={featuredProject?.contentJson?.overview?.myRole || projectsContent.hero?.role}
            duration={featuredProject?.contentJson?.overview?.timeframe?.total || projectsContent.hero?.duration}
            year={featuredProject?.contentJson?.overview?.year || projectsContent.hero?.year}
            teamRoles={featuredProject?.contentJson?.overview?.teamRoles || projectsContent.hero?.teamRoles}
            deliverables={featuredProject?.contentJson?.overview?.deliverables || projectsContent.hero?.deliverables}
          />
        </Container>
      </Box>

      {regularProjects.length > 0 && (
        <Box id="projects" py={{ base: "16", md: "24" }} className="pattern-dots" borderTopWidth="1px" borderColor="border.subtle">
          <Container maxW="7xl" px={{ base: "4", md: "8" }}>
            <FadeIn>
              <CategoryGrid dict={homeContent.project} projects={regularProjects} />
            </FadeIn>
          </Container>
        </Box>
      )}

      {playgroundProjects.length > 0 && (
        <Box id="playground" py={{ base: "16", md: "24" }} bg={{ base: "bg.subtle", _dark: "black" }} borderTopWidth="1px" borderColor="border.subtle">
          <Container maxW="7xl" px={{ base: "4", md: "8" }}>
            <FadeIn>
              <CategoryGrid 
                dict={homeContent.playground} 
                projects={playgroundProjects} 
                viewAllHref={`/${currentLocale}/playground`}
                viewAllText={currentLocale === 'es' ? 'Ver todos los experimentos' : 'View all experiments'}
              />
            </FadeIn>
          </Container>
        </Box>
      )}

      <Box id="contact" py={{ base: "16", md: "24" }} className="pattern-dots" borderTopWidth="1px" borderColor="border.subtle">
        <Container maxW="7xl" px={{ base: "4", md: "8" }}>
          <FadeIn>
            <Cta dict={homeContent.contact} />
          </FadeIn>
        </Container>
      </Box>
    </Stack>
  )
}