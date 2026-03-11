import { Box, Container, Stack, Button } from "@chakra-ui/react"
import NextLink from "next/link"
import { LuArrowRight } from "react-icons/lu"
import { supabase } from "@/lib/supabase"
import { cache } from "react"
import type { Metadata, ResolvingMetadata } from "next"

// Unified Hero component (formerly BlogBlock)
import { Block as HeroBlock } from "@/components/blocks/heroes/content-page-hero/block"
import { Block as AboutFeatures } from "@/components/blocks/features/feature-07/block"
import { Block as ServicesBlock } from "@/components/blocks/features/feature-10/block"
import { Block as TestimonialGrid } from "@/components/blocks/testimonials/testimonial-grid-with-logo/block"
import { Block as Faq } from "@/components/blocks/faqs/faq-with-inline-headline/block"
import { Block as Cta } from "@/components/blocks/cta/cta-08/block"
import { FadeIn } from "@/components/ui/fade-in"

export const dynamic = 'force-dynamic'

const getPageData = cache(async (slug: string) => {
  const { data } = await supabase.from('pages').select('*').eq('slug', slug).single()
  return data || {}
})

const getServices = cache(async () => {
  const { data } = await supabase.from('services').select('*').order('sort_order', { ascending: true })
  return data || []
})

const getTestimonials = cache(async () => {
  const { data } = await supabase.from('testimonials').select('*')
  return data || []
})

const getFaqs = cache(async () => {
  const { data } = await supabase.from('faqs').select('*').order('id', { ascending: true })
  return data || []
})

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { locale } = await params;
  const currentLocale = locale || 'en'
  const pageData = await getPageData('about')
  
  const title = pageData?.[`title_${currentLocale}`] || pageData?.title_en || pageData?.title || 'About | Coriyon Arrington'
  const description = pageData?.[`description_${currentLocale}`] || pageData?.description_en || pageData?.description

  return {
    title,
    description,
    openGraph: { title, description },
    twitter: { title, description }
  }
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const currentLocale = locale || 'en'

  const [
    aboutData,
    homeData,
    services,
    allTestimonials,
    faqs
  ] = await Promise.all([
    getPageData('about'),
    getPageData('home'),
    getServices(),
    getTestimonials(),
    getFaqs()
  ]);

  const aboutContent = aboutData?.[`content_${currentLocale}`] || aboutData?.content_en || {}
  const homeContent = homeData?.[`content_${currentLocale}`] || homeData?.content_en || {}

  const localizedServices = services?.map((s: any) => ({
    id: s.id,
    title: s[`title_${currentLocale}`] || s.title_en || s.title,
    description: s[`description_${currentLocale}`] || s.description_en || s.description,
    icon_name: s.icon_name,
    url: s.url,
    featured: s.featured
  }))

  const displayServices = localizedServices?.filter((s: any) => s.featured !== true).slice(0, 6) || []

  const localizedTestimonials = allTestimonials?.map((t: any) => ({
    ...t,
    quote: t[`quote_${currentLocale}`] || t.quote_en || t.quote,
    role: t[`role_${currentLocale}`] || t.role_en || t.role
  }))

  const localizedFaqs = faqs?.map((faq: any) => ({
    id: faq.id,
    question: faq[`question_${currentLocale}`] || faq.question_en || faq.question,
    answer: faq[`answer_${currentLocale}`] || faq.answer_en || faq.answer
  }))

  return (
    <Stack gap="0" w="full">
      {/* Unified Hero Section */}
      <Box className="pattern-dots">
        <Container maxW="7xl" px={{ base: "4", md: "8" }}>
          <HeroBlock dict={aboutContent.hero} locale={currentLocale} />
        </Container>
      </Box>

      <Box id="about" py={{ base: "16", md: "24" }} className="pattern-dots" borderTopWidth="1px" borderColor="border.subtle">
        <Container maxW="7xl" px={{ base: "4", md: "8" }}>
          <FadeIn>
            <AboutFeatures dict={homeContent.about} />
          </FadeIn>
        </Container>
      </Box>

      <Box id="services" py={{ base: "16", md: "24" }} bg="bg.subtle" borderTopWidth="1px" borderBottomWidth="1px" borderColor="border.subtle">
        <Container maxW="7xl" px={{ base: "4", md: "8" }}>
          <FadeIn>
            <ServicesBlock dict={homeContent.services} services={displayServices} />
            
            <Stack mt="10" align="flex-start">
              <Button variant="ghost" colorPalette="green" asChild size="lg">
                <NextLink href={`/${currentLocale}/services`}>
                  {currentLocale === 'es' ? 'Ver todos los servicios' : 'View all services'} <LuArrowRight />
                </NextLink>
              </Button>
            </Stack>
          </FadeIn>
        </Container>
      </Box>

      <Box id="testimonials" py={{ base: "16", md: "24" }} className="pattern-dots">
        <Container maxW="7xl" px={{ base: "4", md: "8" }}>
          <FadeIn>
            <TestimonialGrid dict={homeContent.testimonial} testimonials={localizedTestimonials || []} />
          </FadeIn>
        </Container>
      </Box>

      <Box id="faqs" bg="bg.subtle" py={{ base: "16", md: "24" }} className="pattern-grid" borderTopWidth="1px" borderColor="border.subtle">
        <Container maxW="7xl" px={{ base: "4", md: "8" }}>
          <FadeIn>
            <Faq dict={homeContent.faq} faqs={localizedFaqs || []} />
          </FadeIn>
        </Container>
      </Box>

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