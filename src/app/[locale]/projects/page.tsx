import { Box, Container, Stack } from "@chakra-ui/react"
import { supabase } from "@/lib/supabase"
import { Block as NavbarIsland } from "@/components/blocks/marketing-navbars/navbar-island/block"
// FIX: Updated to the newly renamed projects-page hero component
import { Block as ProjectsHero } from "@/components/blocks/heroes/projects-page/block"
import { Block as CategoryGrid } from "@/components/blocks/product-categories/category-grid-02/block"
import { Block as Cta } from "@/components/blocks/cta/cta-08/block"
import { Block as Footer } from "@/components/blocks/footers/footer-with-address/block"
import { FadeIn } from "@/components/ui/fade-in"

export const revalidate = 0 

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const currentLocale = locale || 'en'

  const { data: projectsPageData } = await supabase.from('pages').select('*').eq('slug', 'projects').single()
  const { data: homeData } = await supabase.from('pages').select('*').eq('slug', 'home').single()
  const { data: projects } = await supabase.from('projects').select('*').order('sort_order', { ascending: true })

  const projectsContent = projectsPageData?.[`content_${currentLocale}`] || projectsPageData?.content_en || {}
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
  
  const regularProjects = localizedProjects?.filter(p => !p.category?.includes('Playground')) || []
  const playgroundProjects = localizedProjects?.filter(p => p.category?.includes('Playground')) || []

  return (
    <Box bg="bg.canvas" minH="100vh">
      <NavbarIsland dict={homeContent.navbar} />
      
      <Stack gap="0">
        <Box className="pattern-dots" pb={{ base: "16", md: "24" }}>
          <Container maxW="7xl" px={{ base: "4", md: "8" }}>
            <FadeIn>
              <ProjectsHero 
                dict={{ 
                  ...projectsContent.hero, 
                  exploreWork: projectsContent.hero?.exploreWork || (currentLocale === 'es' ? 'Ver proyectos' : 'View projects'), 
                  showOverview: projectsContent.hero?.showOverview || (currentLocale === 'es' ? 'Resumen rápido' : 'Quick overview') 
                }}
                title={projectsContent.hero?.title}
                description={projectsContent.hero?.description}
                tagline={projectsContent.hero?.tagline}
                imageUrl={projectsContent.hero?.imageUrl}
                videoUrl={projectsContent.hero?.videoUrl}
                mockupType={projectsContent.hero?.mockupType}
                bgColor={projectsContent.hero?.bgColor || "green.600"}
                summary={projectsContent.hero?.summary}
                role={projectsContent.hero?.role}
                duration={projectsContent.hero?.duration}
                year={projectsContent.hero?.year}
                teamRoles={projectsContent.hero?.teamRoles}
                deliverables={projectsContent.hero?.deliverables}
              />
            </FadeIn>
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
          <Box id="playground" py={{ base: "16", md: "24" }} bg="bg.subtle" borderTopWidth="1px" borderColor="border.subtle">
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
        
        <FadeIn>
          <Footer dict={homeContent.footer} />
        </FadeIn>
      </Stack>
    </Box>
  )
}