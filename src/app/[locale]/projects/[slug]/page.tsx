import { Box, Container, Stack, Badge } from "@chakra-ui/react"
import type { Metadata, ResolvingMetadata } from 'next'
import { supabase } from "@/lib/supabase"
import { notFound } from "next/navigation"
import { Block as NavbarIsland } from "@/components/blocks/marketing-navbars/navbar-island/block"
import { Block as ProjectsHero } from "@/components/blocks/heroes/projects-page/block"
import { Block as FeaturedTestimonial } from "@/components/blocks/testimonials/testimonial-with-rating/block"
import { Block as ProjectBentoGrid } from "@/components/blocks/features/project-bento-grid/block"
import { Block as CaseStudyAccordion } from "@/components/blocks/features/feature-06/block"
import { Block as TestimonialGrid } from "@/components/blocks/testimonials/testimonial-grid-with-logo/block"
import { Block as InterstitialNav } from "@/components/blocks/marketing-navbars/interstitial-nav/block"
import { Block as Footer } from "@/components/blocks/footers/footer-with-address/block"
import { FadeIn } from "@/components/ui/fade-in"
import { LuTarget, LuLightbulb, LuTrendingUp } from "react-icons/lu"

import { Block as ProjectStats } from "@/components/blocks/stats/project-stats/block"
import { Block as ProjectFaq } from "@/components/blocks/faqs/faq-with-inline-headline/block"
import { Block as ProjectCta } from "@/components/blocks/cta/cta-08/block"

export const revalidate = 0 

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string, slug: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { locale, slug } = await params;
  const currentLocale = locale || 'en'

  const { data: project } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .maybeSingle()

  if (!project) {
    return { title: 'Project Not Found' }
  }

  const title = (project as any)[`title_${currentLocale}`] || project.title_en || project.title
  const description = (project as any)[`description_${currentLocale}`] || project.description_en || project.description
  
  // FIX: Prioritize og_image_url from the database, fallback to featured_image_url
  const imageUrl = project.og_image_url || project.featured_image_url 

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630, alt: title }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: imageUrl ? [imageUrl] : [],
    },
  }
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ locale: string, slug: string }> }) {
  const { locale, slug } = await params;
  const currentLocale = locale || 'en'

  const { data: allProjectsData } = await supabase
    .from('projects')
    .select('*')
    .order('sort_order', { ascending: true })

  const allProjects = allProjectsData || []
  const currentIndex = allProjects.findIndex(p => p.slug === slug)
  const project = allProjects[currentIndex]

  if (!project) notFound()

  let prevProject = null
  let nextProject = null

  if (currentIndex > 0) {
    const p = allProjects[currentIndex - 1]
    prevProject = { slug: p.slug, title: (p as any)[`title_${currentLocale}`] || p.title_en || p.title }
  }

  if (currentIndex < allProjects.length - 1 && currentIndex !== -1) {
    const n = allProjects[currentIndex + 1]
    nextProject = { slug: n.slug, title: (n as any)[`title_${currentLocale}`] || n.title_en || n.title }
  }

  const { data: pageData } = await supabase.from('pages').select('*').eq('slug', 'home').single()
  const content = pageData?.[`content_${currentLocale}`] || pageData?.content_en || {}

  const { data: allTestimonials } = await supabase.from('testimonials').select('*')
  
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
    quote: (rawFeaturedTestimonial as any)[`quote_${currentLocale}`] || rawFeaturedTestimonial.quote_en || rawFeaturedTestimonial.quote,
    role: (rawFeaturedTestimonial as any)[`role_${currentLocale}`] || rawFeaturedTestimonial.role_en || rawFeaturedTestimonial.role
  } : null

  const localizedRemainingTestimonials = remainingTestimonials.map(t => ({
    ...t,
    quote: (t as any)[`quote_${currentLocale}`] || t.quote_en || t.quote,
    role: (t as any)[`role_${currentLocale}`] || t.role_en || t.role
  }))

  const title = (project as any)[`title_${currentLocale}`] || project.title_en || project.title
  const description = (project as any)[`description_${currentLocale}`] || project.description_en || project.description
  const category = project.project_category || "Case Study"
  const videoUrl = project.featured_video_url
  const imageUrl = project.featured_image_url
  const mockupType = project.mockup_type 
  const bgColor = project.bg_color 

  const projectContentJson = (project as any)[`content_${currentLocale}`] || project.content_en || {}
  
  const overviewData = projectContentJson.overview || {}
  const projectMeta = projectContentJson.project_meta || {}
  
  const role = overviewData.role || projectMeta.role
  const duration = overviewData.duration || projectMeta.duration
  const year = overviewData.year || projectMeta.year || (project.project_date ? new Date(project.project_date).getFullYear() : null)
  const teamRoles = overviewData.team_roles || projectMeta.team
  const deliverables = overviewData.deliverables || (Array.isArray(projectMeta.deliverables) ? projectMeta.deliverables.join(', ') : projectMeta.deliverables)
  const summary = overviewData.summary || description
  const industries = overviewData.industries || projectMeta.industries
  const platforms = overviewData.platforms || projectMeta.platforms

  const bentoData = projectContentJson.bento_grid || {}
  const bentoFeatures = bentoData.features || []
  const hasBentoGrid = bentoFeatures.length > 0

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

  const statsData = projectContentJson.stats || {}
  const hasStats = statsData.items && statsData.items.length > 0

  const faqData = projectContentJson.faq || {}
  const hasFaqs = faqData.faqs && faqData.faqs.length > 0

  const globalContactData = content.contact || {}
  const hasCta = !!globalContactData.title

  return (
    <Box bg="bg.canvas" minH="100vh">
      <NavbarIsland dict={content.navbar} />
      
      <Stack gap="0">
        
        <Box className="pattern-dots" pb={{ base: "16", md: "24" }}>
          <Container maxW="7xl" px={{ base: "4", md: "8" }}>
            <FadeIn>
              <ProjectsHero 
                dict={{ ...content.hero, exploreWork: content.project?.readCaseStudy || "Read case study" }}
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
                industries={industries}
                platforms={platforms}
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

        {hasBentoGrid && (
          <Box py={{ base: "16", md: "24" }} className="pattern-dots">
            <Container maxW="7xl" px={{ base: "4", md: "8" }}>
              <FadeIn>
                <ProjectBentoGrid 
                  badge={bentoData.badge}
                  title={bentoData.title || "Core Features"} 
                  description={bentoData.description} 
                  features={bentoFeatures} 
                />
              </FadeIn>
            </Container>
          </Box>
        )}

        <Box id="projects" py={hasCaseStudy ? { base: "16", md: "24" } : "0"} className={hasBentoGrid ? "" : "pattern-dots"}>
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
                   description={caseStudyData.description || null} 
                   features={caseStudyFeatures}
                   mockupType={mockupType}
                 />
               </FadeIn>
             )}
          </Container>
        </Box>

        {hasStats && (
          <Box borderTopWidth="1px" borderColor="border.subtle" bg="bg.canvas">
             <FadeIn>
               <ProjectStats 
                 tagline={statsData.tagline}
                 headline={statsData.headline}
                 description={statsData.description}
                 stats={statsData.items}
               />
             </FadeIn>
          </Box>
        )}

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

        {hasFaqs && (
          <Box py={{ base: "16", md: "24" }} bg="bg.canvas" borderTopWidth={localizedRemainingTestimonials.length === 0 ? "1px" : "0"} borderColor="border.subtle">
            <Container maxW="7xl" px={{ base: "4", md: "8" }}>
              <FadeIn>
                <ProjectFaq 
                  dict={faqData}
                  faqs={faqData.faqs}
                />
              </FadeIn>
            </Container>
          </Box>
        )}

        {hasCta && (
          <Box bg="bg.canvas" py={{ base: "12", md: "20" }} borderTopWidth={hasFaqs ? "0" : "1px"} borderColor="border.subtle">
            <Container maxW="7xl" px={{ base: "4", md: "8" }}>
              <FadeIn>
                <ProjectCta dict={globalContactData} />
              </FadeIn>
            </Container>
          </Box>
        )}

        <Box py={{ base: "12", md: "20" }} bg="bg.canvas" borderTopWidth="1px" borderColor="border.subtle">
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