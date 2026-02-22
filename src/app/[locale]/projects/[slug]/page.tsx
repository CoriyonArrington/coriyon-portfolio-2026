import { Box, Container, Stack, Badge } from "@chakra-ui/react"
import { supabase } from "@/lib/supabase"
import { notFound } from "next/navigation"
import { Block as NavbarIsland } from "@/components/blocks/marketing-navbars/navbar-island/block"
import { Block as HeroWithImageBottomCentered } from "@/components/blocks/heroes/hero-with-image-bottom-centered/block"
import { Block as FeaturedTestimonial } from "@/components/blocks/testimonials/testimonial-with-rating/block"
import { Block as CaseStudyAccordion } from "@/components/blocks/features/feature-06/block"
import { Block as TestimonialGrid } from "@/components/blocks/testimonials/testimonial-grid-with-logo/block"
import { Block as InterstitialNav } from "@/components/blocks/marketing-navbars/interstitial-nav/block" // <-- Import the new block
import { Block as Footer } from "@/components/blocks/footers/footer-with-address/block"
import { FadeIn } from "@/components/ui/fade-in"
import { LuTarget, LuLightbulb, LuTrendingUp } from "react-icons/lu"

export const revalidate = 0 

export default async function ProjectDetailPage({ params }: { params: Promise<{ locale: string, slug: string }> }) {
  const { locale, slug } = await params;
  const currentLocale = locale || 'en'

  // Fetch all projects ordered by sort_order so we can compute Next/Previous!
  const { data: allProjectsData } = await supabase
    .from('projects')
    .select('*')
    .order('sort_order', { ascending: true })

  const allProjects = allProjectsData || []
  const currentIndex = allProjects.findIndex(p => p.slug === slug)
  const project = allProjects[currentIndex]

  if (!project) notFound()

  // Extract Prev / Next data
  let prevProject = null
  let nextProject = null

  if (currentIndex > 0) {
    const p = allProjects[currentIndex - 1]
    prevProject = { slug: p.slug, title: p[`title_${currentLocale}`] || p.title_en || p.title }
  }

  if (currentIndex < allProjects.length - 1 && currentIndex !== -1) {
    const n = allProjects[currentIndex + 1]
    nextProject = { slug: n.slug, title: n[`title_${currentLocale}`] || n.title_en || n.title }
  }

  // Fetch global page dictionaries
  const { data: pageData } = await supabase.from('pages').select('*').eq('slug', 'home').single()
  const content = pageData?.[`content_${currentLocale}`] || pageData?.content_en || {}

  const { data: allTestimonials } = await supabase.from('testimonials').select('*')
  
  // Testimonial Logic
  const companyTestimonials = allTestimonials?.filter(t => project.company && t.company === project.company) || []
  
  let rawFeaturedTestimonial = project.testimonial_id 
    ? allTestimonials?.find(t => t.id === project.testimonial_id) 
    : null

  if (!rawFeaturedTestimonial && companyTestimonials.length > 0) {
    rawFeaturedTestimonial = companyTestimonials[0]
  }
  
  const remainingTestimonials = companyTestimonials.filter(t => t.id !== rawFeaturedTestimonial?.id)

  const localizedFeaturedTestimonial = rawFeaturedTestimonial ? {
    ...rawFeaturedTestimonial,
    quote: rawFeaturedTestimonial[`quote_${currentLocale}`] || rawFeaturedTestimonial.quote_en || rawFeaturedTestimonial.quote,
    role: rawFeaturedTestimonial[`role_${currentLocale}`] || rawFeaturedTestimonial.role_en || rawFeaturedTestimonial.role
  } : null

  const localizedRemainingTestimonials = remainingTestimonials.map(t => ({
    ...t,
    quote: t[`quote_${currentLocale}`] || t.quote_en || t.quote,
    role: t[`role_${currentLocale}`] || t.role_en || t.role
  }))

  const title = project[`title_${currentLocale}`] || project.title_en || project.title
  const description = project[`description_${currentLocale}`] || project.description_en || project.description
  const category = project.project_category || "Case Study"
  const videoUrl = project.featured_video_url
  const imageUrl = project.featured_image_url
  const mockupType = project.mockup_type 
  const bgColor = project.bg_color 

  const projectContentJson = project[`content_${currentLocale}`] || project.content_en || {}
  
  const overviewData = projectContentJson.overview || {}
  const projectMeta = projectContentJson.project_meta || {}
  
  const role = overviewData.role || projectMeta.role
  const duration = overviewData.duration || projectMeta.duration
  const year = overviewData.year || projectMeta.year || (project.project_date ? new Date(project.project_date).getFullYear() : null)
  const teamRoles = overviewData.team_roles || projectMeta.team
  const deliverables = overviewData.deliverables || (Array.isArray(projectMeta.deliverables) ? projectMeta.deliverables.join(', ') : projectMeta.deliverables)
  const summary = overviewData.summary || description

  const caseStudyData = projectContentJson.case_study || {}
  const resultData = caseStudyData.results || caseStudyData.result || {}
  
  const hasCaseStudy = !!caseStudyData.challenge || !!caseStudyData.solution || !!resultData.heading

  const caseStudyFeatures = hasCaseStudy ? [
    {
      value: 'challenge',
      icon: <LuTarget />,
      title: caseStudyData.challenge?.heading || caseStudyData.challenge?.title || 'The Challenge',
      description: caseStudyData.challenge?.text || caseStudyData.challenge?.description || '',
      imageSrc: caseStudyData.challenge?.image_url || imageUrl || '',
    },
    {
      value: 'solution',
      icon: <LuLightbulb />,
      title: caseStudyData.solution?.heading || caseStudyData.solution?.title || 'The Solution',
      description: caseStudyData.solution?.text || caseStudyData.solution?.description || '',
      imageSrc: caseStudyData.solution?.image_url || imageUrl || '',
    },
    {
      value: 'result',
      icon: <LuTrendingUp />,
      title: resultData?.heading || resultData?.title || 'The Result',
      description: resultData?.text || resultData?.description || '',
      imageSrc: resultData?.image_url || imageUrl || '',
    }
  ] : []

  return (
    <Box bg="bg.canvas" minH="100vh">
      <NavbarIsland dict={content.navbar} />
      
      <Stack gap="0" pt="24">
        
        <Box className="pattern-dots" pt={{ base: "8", md: "12" }} pb={{ base: "16", md: "24" }}>
          <Container maxW="7xl" px={{ base: "4", md: "8" }}>
            <FadeIn>
              <HeroWithImageBottomCentered 
                dict={content.hero}
                title={title}
                description={description}
                tagline={category}
                videoUrl={videoUrl}
                imageUrl={imageUrl} 
                mockupType={mockupType}
                bgColor={bgColor} 
                role={role}
                duration={duration}
                year={year}
                teamRoles={teamRoles}
                deliverables={deliverables}
                summary={summary}
              />
            </FadeIn>
          </Container>
        </Box>

        {localizedFeaturedTestimonial && (
          <Box bg="bg.emphasized" w="full" borderTopWidth="1px" borderBottomWidth="1px" borderColor="border.subtle">
            <Container maxW="7xl" px={{ base: "4", md: "8" }}>
              <FadeIn>
                <FeaturedTestimonial testimonial={localizedFeaturedTestimonial} />
              </FadeIn>
            </Container>
          </Box>
        )}

        <Box id="projects" minH="30vh" py={{ base: "16", md: "24" }} className="pattern-dots">
          <Container maxW="7xl" px={{ base: "4", md: "8" }}>
             {hasCaseStudy && (
               <FadeIn>
                 <CaseStudyAccordion 
                   badge={
                    <Badge size="lg" colorPalette="green" variant="subtle" rounded="full" px="3" py="1">
                      Case Study
                    </Badge>
                   }
                   title="Behind the process"
                   description={null} 
                   features={caseStudyFeatures}
                   mockupType={mockupType}
                 />
               </FadeIn>
             )}
          </Container>
        </Box>

        {localizedRemainingTestimonials.length > 0 && (
          <Box py={{ base: "16", md: "24" }} borderTopWidth="1px" borderColor="border.subtle" className="pattern-dots">
            <Container maxW="7xl" px={{ base: "4", md: "8" }}>
              <FadeIn>
                <TestimonialGrid 
                  testimonials={localizedRemainingTestimonials} 
                  dict={{ title: "More from this team", description: "Hear what else they had to say about our partnership." }} 
                />
              </FadeIn>
            </Container>
          </Box>
        )}

        {/* INTERSTITIAL NAVIGATION BLOCK */}
        <Box py={{ base: "12", md: "20" }} bg="bg.canvas">
          <Container maxW="5xl" px={{ base: "4", md: "8" }}>
            <FadeIn>
              <InterstitialNav prev={prevProject} next={nextProject} dict={content.interstitial} />
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