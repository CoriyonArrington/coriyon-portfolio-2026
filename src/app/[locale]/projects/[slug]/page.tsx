import { Box, Container, Stack, Badge, Heading, Text, SimpleGrid, Image } from "@chakra-ui/react"
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
import { Block as TableOfContents, type TocItem } from "@/components/blocks/docs-toc/toc-mobile/block"
import { Block as TimelineSection } from "@/components/blocks/process/timeline-section"

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

  if (!project) return { title: 'Project Not Found' }

  const title = (project as any)[`title_${currentLocale}`] || project.title_en || project.title
  const description = (project as any)[`description_${currentLocale}`] || project.description_en || project.description
  const imageUrl = project.og_image_url || project.featured_image_url 

  return {
    title,
    description,
    openGraph: { title, description, images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630, alt: title }] : [] },
    twitter: { card: 'summary_large_image', title, description, images: imageUrl ? [imageUrl] : [] },
  }
}

// --- NARRATIVE STORYTELLING COMPONENT ---
const StoryHeroBlock = ({ id, badge, title, description, items, imageSrc, isDark, pt, pb, borderTopWidth, className, children }: any) => {
  const renderValue = (v: any) => {
    if (typeof v === 'string') return <Text color="fg.muted" lineHeight="relaxed">{v}</Text>;
    if (Array.isArray(v)) {
      if (v.length > 0 && typeof v[0] === 'object' && v[0].key) {
         return (
           <Stack gap="4">
             {v.map((sub: any, i: number) => (
               <Box key={i}>
                 <Text fontWeight="semibold" color="fg.default" textTransform="capitalize" mb="1">
                   {sub.key.replace(/([A-Z])/g, ' $1')}
                 </Text>
                 {renderValue(sub.val)}
               </Box>
             ))}
           </Stack>
         )
      }
      return (
        <Stack as="ul" pl="4" gap="2" style={{ listStyleType: 'disc' }}>
          {v.map((str: string, i: number) => <Box as="li" key={i} color="fg.muted" lineHeight="relaxed">{str}</Box>)}
        </Stack>
      )
    }
    if (typeof v === 'object' && v !== null) {
       return (
         <Stack gap="3">
           {Object.entries(v).map(([k, val]) => (
             <Box key={k}>
               <Text fontWeight="medium" color="fg.default" textTransform="capitalize">{k.replace(/([A-Z])/g, ' $1')}</Text>
               <Text color="fg.muted">{String(val)}</Text>
             </Box>
           ))}
         </Stack>
       )
    }
    return null;
  }

  return (
    <Box 
      id={id} 
      className={className}
      pt={pt || { base: "16", md: "24" }} 
      pb={pb || { base: "16", md: "24" }} 
      bg={isDark ? "bg.emphasized" : "bg.canvas"} 
      borderTopWidth={borderTopWidth !== undefined ? borderTopWidth : (isDark ? "0" : "1px")} 
      borderColor="border.subtle"
    >
      <Container maxW="5xl">
        <Stack gap={{ base: "10", md: "16" }} align="center">
          
          <Stack gap="6" align="center" textAlign="center" maxW="3xl">
            {badge && <Badge size="lg" colorPalette="green" variant="subtle" rounded="full" px="3" py="1">{badge}</Badge>}
            <Heading as="h2" size={{ base: "4xl", md: "5xl" }} fontWeight="bold" letterSpacing="tight">{title}</Heading>
            {description && <Text color="fg.muted" textStyle="xl">{description}</Text>}
          </Stack>

          <Stack gap={{ base: "8", md: "12" }} w="full">
            {imageSrc && (
              <Box w="full" rounded="3xl" overflow="hidden" shadow="xl" borderWidth="1px" borderColor="border.subtle">
                 <Image src={imageSrc} alt={title} w="full" h="auto" objectFit="cover" />
              </Box>
            )}

            {children}

            {items && items.length > 0 && (
              <SimpleGrid columns={{ base: 1, md: items.length > 1 ? 2 : 1 }} gap="6" alignItems="stretch">
                {items.map((item: any, idx: number) => (
                  <Box key={idx} bg="bg.panel" p={{ base: "6", md: "8" }} rounded="3xl" borderWidth="1px" borderColor="border.subtle" shadow="sm">
                    <Heading size="lg" mb="4" color="fg.default">{item.label}</Heading>
                    {renderValue(item.value)}
                  </Box>
                ))}
              </SimpleGrid>
            )}
          </Stack>

        </Stack>
      </Container>
    </Box>
  )
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ locale: string, slug: string }> }) {
  const { locale, slug } = await params;
  const currentLocale = locale || 'en'

  const { data: allProjectsData } = await supabase.from('projects').select('*').order('sort_order', { ascending: true })
  const allProjects = allProjectsData || []
  const currentIndex = allProjects.findIndex(p => p.slug === slug)
  const project = allProjects[currentIndex]

  if (!project) notFound()

  let prevProject = null
  let nextProject = null
  if (currentIndex > 0) prevProject = { slug: allProjects[currentIndex - 1].slug, title: (allProjects[currentIndex - 1] as any)[`title_${currentLocale}`] || allProjects[currentIndex - 1].title_en || allProjects[currentIndex - 1].title }
  if (currentIndex < allProjects.length - 1 && currentIndex !== -1) nextProject = { slug: allProjects[currentIndex + 1].slug, title: (allProjects[currentIndex + 1] as any)[`title_${currentLocale}`] || allProjects[currentIndex + 1].title_en || allProjects[currentIndex + 1].title }

  const { data: pageData } = await supabase.from('pages').select('*').eq('slug', 'home').single()
  const content = pageData?.[`content_${currentLocale}`] || pageData?.content_en || {}
  const { data: allTestimonials } = await supabase.from('testimonials').select('*')
  
  const companyTestimonials = allTestimonials?.filter(t => project.company && t.company === project.company) || []
  let rawFeaturedTestimonial = project.testimonial_id ? allTestimonials?.find(t => t.id === project.testimonial_id) : null
  if (!rawFeaturedTestimonial && companyTestimonials.length > 0) rawFeaturedTestimonial = companyTestimonials[0]
  
  const remainingTestimonials = companyTestimonials.filter(t => t.id !== rawFeaturedTestimonial?.id)
  const localizedFeaturedTestimonial = rawFeaturedTestimonial ? { ...rawFeaturedTestimonial, quote: (rawFeaturedTestimonial as any)[`quote_${currentLocale}`] || rawFeaturedTestimonial.quote_en || rawFeaturedTestimonial.quote, role: (rawFeaturedTestimonial as any)[`role_${currentLocale}`] || rawFeaturedTestimonial.role_en || rawFeaturedTestimonial.role } : null
  const localizedRemainingTestimonials = remainingTestimonials.map(t => ({ ...t, quote: (t as any)[`quote_${currentLocale}`] || t.quote_en || t.quote, role: (t as any)[`role_${currentLocale}`] || t.role_en || t.role }))

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
  
  const role = overviewData.myRole || overviewData.role || projectMeta.role
  const duration = overviewData.timeframe?.total || overviewData.duration || projectMeta.duration
  const summary = overviewData.oneLiner || overviewData.summary || description
  const year = overviewData.year || projectMeta.year || (project.project_date ? new Date(project.project_date).getFullYear() : null)
  const teamRoles = overviewData.users ? overviewData.users.join(', ') : (overviewData.team_roles || projectMeta.team)
  const deliverables = overviewData.deliverables || (Array.isArray(projectMeta.deliverables) ? projectMeta.deliverables.join(', ') : projectMeta.deliverables)
  const industries = overviewData.industries || projectMeta.industries
  const platforms = overviewData.platforms || projectMeta.platforms

  const pmContext = projectContentJson.context
  const pmProblem = projectContentJson.problem
  const pmStrategy = projectContentJson.strategy
  const pmApproach = projectContentJson.approach
  const pmOutcomes = projectContentJson.outcomes
  const pmScaling = projectContentJson.scalingPlan
  const pmLearnings = projectContentJson.challengesAndLearnings

  const cleanStr = (val: any) => typeof val === 'string' ? val.replace(/^"|"$/g, '') : val;

  // STRICT RENDER GUARDS (Prevents empty sections from rendering)
  const hasContextData = pmContext?.whatExisted || pmContext?.whatChanged || pmContext?.imageSrc || pmContext?.heading;
  const hasProblemData = pmProblem?.businessProblem || pmProblem?.productProblem || pmProblem?.risk || pmProblem?.imageSrc || pmProblem?.heading;
  const hasStrategyData = pmStrategy?.initialBet || pmStrategy?.northStarMetric || pmStrategy?.imageSrc || pmStrategy?.heading;
  
  let statsData = projectContentJson.stats || {}
  if (!statsData.items && pmOutcomes?.estimatedROI?.math) {
     const math = pmOutcomes.estimatedROI.math;
     statsData = {
       items: [
         { value: `${math.hoursSavedPerClinicianPerWeek} hrs`, label: "Saved per Clinician / Week" },
         { value: `${(math.annualHoursSaved / 1000).toFixed(0)}k`, label: "Annual Hours Saved (Est.)" },
       ]
     }
  }
  const hasStats = statsData.items && statsData.items.length > 0;
  const hasOutcomesData = pmOutcomes?.headline || pmOutcomes?.impactAreas || pmOutcomes?.imageSrc || pmOutcomes?.heading;
  const shouldRenderOutcomes = hasOutcomesData || hasStats;

  // Smart Timeline Extraction
  const hasApproach = pmApproach && Object.keys(pmApproach).length > 0;
  const processSteps = hasApproach ? Object.entries(pmApproach).map(([key, phase]: [string, any]) => {
    const stepNumber = key.replace(/\D/g, '') || "1"; 
    const details = Object.entries(phase)
      .filter(([k]) => k !== 'title' && k !== 'imageSrc')
      .map(([k, v]) => {
        const formattedKey = k.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
        let value: string | string[] = '';
        if (Array.isArray(v)) { value = v as string[]; } 
        else if (typeof v === 'object' && v !== null) {
          value = Object.entries(v).map(([sk, sv]) => {
            const subFormatted = sk.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
            return `${subFormatted}: ${sv}`;
          });
        } else { value = String(v); }
        return { label: formattedKey, value };
      });

    return {
      date: `Phase ${stepNumber}`,
      heading: phase.title || `Phase ${stepNumber}`,
      description: "", 
      details: details,
      imageSrc: cleanStr(phase.imageSrc)
    }
  }) : []

  // --- UNIFIED BENTO GRID (Learnings + Scaling/Impact) ---
  const unifiedBentoFeatures = [];
  
  if (pmOutcomes?.impactAreas && pmOutcomes.impactAreas.length > 0) {
    unifiedBentoFeatures.push({
      title: "Impact Areas",
      colSpan: 4,
      description: pmOutcomes.impactAreas.join(' • '),
      mediaUrl: cleanStr(pmOutcomes.media?.mediaUrl),
      mediaType: cleanStr(pmOutcomes.media?.mediaType) as any,
    });
  }
  if (pmScaling?.pilot || pmScaling?.rollout) {
    unifiedBentoFeatures.push({
      title: "Pilot & Rollout",
      colSpan: 2,
      description: `Pilot: ${pmScaling.pilot} • Rollout: ${pmScaling.rollout}`,
    });
  }
  if (pmScaling?.enablement?.onboardingPlaybook || pmScaling?.adoptionGuardrails) {
    unifiedBentoFeatures.push({
      title: "Enablement & Guardrails",
      colSpan: 2,
      description: [pmScaling.enablement?.onboardingPlaybook, ...(pmScaling.adoptionGuardrails || [])].filter(Boolean).join(' • '),
    });
  }
  
  if (pmLearnings) {
    if (pmLearnings.scoping) {
      unifiedBentoFeatures.push({
        title: "Scoping",
        colSpan: 4, 
        description: pmLearnings.scoping?.learning || pmLearnings.scoping?.whatHappened,
      });
    }
    if (pmLearnings.stakeholderAlignment) {
      unifiedBentoFeatures.push({
        title: "Stakeholder Alignment",
        colSpan: 2,
        description: pmLearnings.stakeholderAlignment?.learning || pmLearnings.stakeholderAlignment?.tension,
      });
    }
    if (pmLearnings.timing) {
      unifiedBentoFeatures.push({
        title: "Timing",
        colSpan: 2,
        description: pmLearnings.timing?.learning || pmLearnings.timing?.risk,
      });
    }
  }

  const hasLearningsData = pmLearnings?.scoping || pmLearnings?.stakeholderAlignment || pmLearnings?.timing || pmLearnings?.imageSrc || pmLearnings?.heading;
  const shouldRenderLearnings = hasLearningsData || unifiedBentoFeatures.length > 0;

  // Clean Fallback for Non-PM (Standard) projects
  const bentoData = projectContentJson.bento_grid || {}
  const bentoFeatures = bentoData.features || []
  const hasBentoGrid = bentoFeatures.length > 0

  const caseStudyData = projectContentJson.case_study || {}
  const resultData = caseStudyData.results || caseStudyData.result || {}
  const hasStandardCaseStudy = !!caseStudyData.challenge || !!caseStudyData.solution || !!resultData.heading
  const caseStudyFeatures = hasStandardCaseStudy ? [
    { value: 'challenge', icon: <LuTarget />, title: caseStudyData.challenge?.heading || 'The Challenge', description: caseStudyData.challenge?.text, imageSrc: caseStudyData.challenge?.image_url || '' },
    { value: 'solution', icon: <LuLightbulb />, title: caseStudyData.solution?.heading || 'The Solution', description: caseStudyData.solution?.text, imageSrc: caseStudyData.solution?.image_url || '' },
    { value: 'result', icon: <LuTrendingUp />, title: resultData?.heading || 'The Result', description: resultData?.text, imageSrc: resultData?.image_url || '' }
  ] : []

  let faqData = projectContentJson.faq || {}
  if (!faqData.faqs && projectContentJson.faqs) {
     faqData = { badge: "Insights", title: "Strategic Takeaways", faqs: projectContentJson.faqs.map((f: any) => ({ question: f.q, answer: f.a })) }
  }
  const hasFaqs = faqData.faqs && faqData.faqs.length > 0
  const globalContactData = content.contact || {}
  const hasCta = !!globalContactData.title

  // --- EXECUTIVE TOP-DOWN TABLE OF CONTENTS ---
  const dynamicToc: TocItem[] = [];
  if (shouldRenderOutcomes) dynamicToc.push({ id: 'outcomes', text: 'The Results', level: 1 });
  if (shouldRenderLearnings) dynamicToc.push({ id: 'learnings', text: 'Key Takeaways', level: 1 });
  if (hasContextData) dynamicToc.push({ id: 'context', text: 'The Context', level: 1 });
  if (hasProblemData) dynamicToc.push({ id: 'problem', text: 'The Problem', level: 1 });
  if (hasStrategyData) dynamicToc.push({ id: 'strategy', text: 'The Strategy', level: 1 });
  if (hasApproach) dynamicToc.push({ id: 'execution', text: 'The Execution', level: 1 });
  
  if (!pmContext && hasBentoGrid) dynamicToc.push({ id: 'features', text: 'Core Features', level: 1 });
  if (!pmContext && hasStandardCaseStudy) dynamicToc.push({ id: 'case-study', text: 'Case Study', level: 1 });

  return (
    <Box bg="bg.canvas" minH="100vh">
      <NavbarIsland dict={content.navbar} />
      
      <Stack gap="0">
        
        <Box className="pattern-dots" pb={{ base: "16", md: "24" }}>
          <Container maxW="7xl" px={{ base: "4", md: "8" }}>
            <FadeIn>
              <ProjectsHero 
                dict={{ ...content.hero, exploreWork: content.project?.readCaseStudy || "Read case study" }}
                title={projectContentJson.hero?.title || title}
                description={projectContentJson.hero?.subtitle || description}
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

        {dynamicToc.length > 0 && (
          <Box 
            position="sticky" 
            top={{ base: "80px", md: "110px" }} 
            zIndex="40" 
            w="full" 
            mt={{ base: 4, md: 8 }} 
            mb={{ base: 4, md: 0 }}
            pointerEvents="none" 
          >
            <Container maxW="3xl" pointerEvents="auto">
              <TableOfContents tocData={dynamicToc} />
            </Container>
          </Box>
        )}

        {/* --- EXECUTIVE TOP-DOWN STORY SEQUENCE --- */}
        <Box id="projects">

          {/* 1. OUTCOMES & ANIMATED STATS */}
          {shouldRenderOutcomes && (
            <Box id="outcomes" className="pattern-dots" bg="bg.canvas" borderTopWidth="1px" borderColor="border.subtle">
              <FadeIn>
                <StoryHeroBlock 
                  badge={pmOutcomes ? "The Results" : (statsData.tagline || "The Results")} 
                  title={pmOutcomes?.heading || statsData.headline || "Performance Metrics"} 
                  description={pmOutcomes?.headline || statsData.description}
                  imageSrc={cleanStr(pmOutcomes?.imageSrc) || null} 
                  isDark={false}
                  pb={{ base: "16", md: "24" }}
                >
                  {hasStats && (
                    <Box w="full" pt={{ base: 4, md: 8 }}>
                      <ProjectStats stats={statsData.items} headline={undefined} tagline={undefined} description={undefined} />
                    </Box>
                  )}
                </StoryHeroBlock>
              </FadeIn>
            </Box>
          )}

          {/* 2. LEARNINGS & MASSIVE UNIFIED BENTO GRID */}
          {shouldRenderLearnings && (
            <Box id="learnings" bg="bg.emphasized" borderTopWidth="1px" borderColor="border.subtle">
              <FadeIn>
                <StoryHeroBlock 
                  badge="Key Takeaways" 
                  title={pmLearnings?.heading || "Key Learnings & Impact"} 
                  description={pmLearnings?.description || null}
                  imageSrc={cleanStr(pmLearnings?.imageSrc) || null} 
                  isDark={true}
                  pb="4" 
                >
                  {unifiedBentoFeatures.length > 0 && (
                    <Box w="full" pt={{ base: 8, md: 12 }}>
                       <ProjectBentoGrid features={unifiedBentoFeatures} />
                    </Box>
                  )}
                </StoryHeroBlock>
              </FadeIn>
            </Box>
          )}

          {/* 3. CONTEXT */}
          {hasContextData && (
            <FadeIn>
              <StoryHeroBlock 
                id="context"
                className="pattern-dots"
                badge="The Context" 
                title={pmContext?.heading || "The Starting Point"} 
                items={[
                  ...(pmContext?.whatExisted ? [{ label: "What Existed", value: pmContext.whatExisted }] : []),
                  ...(pmContext?.whatChanged ? [{ label: "What Changed", value: pmContext.whatChanged }] : [])
                ]}
                imageSrc={cleanStr(pmContext?.imageSrc) || null} 
                isDark={false}
              />
            </FadeIn>
          )}

          {/* 4. PROBLEM */}
          {hasProblemData && (
            <FadeIn>
              <StoryHeroBlock 
                id="problem"
                badge="The Problem" 
                title={pmProblem?.heading || "Identifying the Real Blocker"} 
                description={pmProblem?.risk}
                items={[
                  ...(pmProblem?.businessProblem ? [{ label: "Business Problem", value: pmProblem.businessProblem }] : []),
                  ...(pmProblem?.productProblem ? [{ label: "Product Problem", value: pmProblem.productProblem }] : [])
                ]}
                imageSrc={cleanStr(pmProblem?.imageSrc) || null} 
                isDark={true}
              />
            </FadeIn>
          )}

          {/* 5. STRATEGY */}
          {hasStrategyData && (
            <FadeIn>
              <StoryHeroBlock 
                id="strategy"
                className="pattern-dots"
                badge="The Strategy" 
                title={pmStrategy?.heading || "Defining the North Star"} 
                items={[
                  ...(pmStrategy?.initialBet ? [{ label: "Initial Bet", value: pmStrategy.initialBet }] : []),
                  ...(pmStrategy?.northStarMetric ? [{ label: "North Star Metric", value: `${pmStrategy.northStarMetric.metric} — ${pmStrategy.northStarMetric.definition}` }] : [])
                ]}
                imageSrc={cleanStr(pmStrategy?.imageSrc) || null} 
                isDark={false}
              />
            </FadeIn>
          )}

          {/* 6. EXECUTION (TIMELINE) */}
          {hasApproach && (
            <Box id="execution" bg="bg.emphasized" borderTopWidth="1px" borderColor="border.subtle">
              <FadeIn>
                <TimelineSection 
                  dict={{
                    badge: "The Execution",
                    title: projectContentJson.approachHeading || "How We Got There",
                    description: "A phased execution plan prioritizing discovery, patient-centered redesign, and workflow adoption.",
                    steps: processSteps
                  }}
                />
              </FadeIn>
            </Box>
          )}
          
          {/* FALLBACK FOR NON-PM CASE STUDIES */}
          {!pmContext && hasBentoGrid && (
            <Box id="features" py={{ base: "16", md: "24" }} className="pattern-dots" borderTopWidth="1px" borderColor="border.subtle">
              <Container maxW="7xl" px={{ base: "4", md: "8" }}>
                <FadeIn>
                  <ProjectBentoGrid badge={bentoData.badge} title={bentoData.title || "Core Features"} description={bentoData.description} features={bentoFeatures} />
                </FadeIn>
              </Container>
            </Box>
          )}

          {!pmContext && hasStandardCaseStudy && (
            <Box id="case-study" py={{ base: "16", md: "24" }} className={hasBentoGrid ? "" : "pattern-dots"} borderTopWidth={hasBentoGrid ? "1px" : "0"} borderColor="border.subtle">
              <Container maxW="7xl" px={{ base: "4", md: "8" }}>
                 <FadeIn>
                   <CaseStudyAccordion badge={<Badge size="lg" colorPalette="green" variant="subtle" rounded="full" px="3" py="1">Case Study</Badge>} title="Behind the process" description={caseStudyData.description || null} features={caseStudyFeatures} mockupType={mockupType} />
                 </FadeIn>
              </Container>
            </Box>
          )}

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

        {hasFaqs && (
          <Box py={{ base: "16", md: "24" }} bg="bg.canvas" borderTopWidth={localizedRemainingTestimonials.length === 0 ? "1px" : "0"} borderColor="border.subtle">
            <Container maxW="7xl" px={{ base: "4", md: "8" }}>
              <FadeIn>
                <ProjectFaq dict={faqData} faqs={faqData.faqs} />
              </FadeIn>
            </Container>
          </Box>
        )}

        {hasCta && (
          <Box bg="bg.canvas" py={{ base: "12", md: "20" }} borderTopWidth={hasFaqs ? "0" : "1px"} borderColor="border.subtle" className="pattern-dots">
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