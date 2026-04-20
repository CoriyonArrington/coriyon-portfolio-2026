import { Box, Container, Stack, Button } from "@chakra-ui/react"
import NextLink from "next/link"
import { LuArrowRight } from "react-icons/lu"
import { supabase } from "@/lib/supabase"
import { cache } from "react"
import type { Metadata, ResolvingMetadata } from "next"

import { Block as HeroBlock } from "@/components/blocks/heroes/content-page-hero/block"
import { Block as AboutFeatures } from "@/components/blocks/about/about-features/block"
import { Block as TestimonialGrid } from "@/components/blocks/testimonials/testimonial-grid-with-logo/block"
import { Block as Faq } from "@/components/blocks/faqs/faq-with-inline-headline/block"
import { Block as Cta } from "@/components/blocks/cta/cta-08/block"
import { FadeIn } from "@/components/ui/fade-in"

export const dynamic = 'force-dynamic'

const getPageData = cache(async (slug: string) => {
  const { data } = await supabase.from('pages').select('*').eq('slug', slug).single()
  return data || {}
})

const getTestimonials = cache(async () => {
  const { data } = await supabase.from('testimonials').select('*')
  return data || []
})

const getFaqs = cache(async () => {
  const { data } = await supabase.from('faqs').select('*').order('id', { ascending: true })
  return data || []
})

const getVideosData = cache(async () => {
  const { data } = await supabase.from('videos').select('*').order('sort_order', { ascending: true })
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
    allTestimonials,
    faqs,
    videos
  ] = await Promise.all([
    getPageData('about'),
    getPageData('home'),
    getTestimonials(),
    getFaqs(),
    getVideosData()
  ]);

  const aboutContent = aboutData?.[`content_${currentLocale}`] || aboutData?.content_en || {}
  const homeContent = homeData?.[`content_${currentLocale}`] || homeData?.content_en || {}

  const localizedVideos = videos
    ?.filter((v: any) => v.category_en === 'Intro' || v.is_featured)
    .slice(0, 1)
    .map((v: any) => ({
      id: v.id,
      title: v[`title_${currentLocale}`] || v.title_en || v.title,
      excerpt: v[`excerpt_${currentLocale}`] || v.excerpt_en || v.excerpt,
      youtubeId: v.youtube_id,
      category: v[`category_${currentLocale}`] || v.category_en || v.category,
      publishedAt: v[`published_at_${currentLocale}`] || v.published_at_en || v.published_at,
      isFeatured: v.is_featured,
      author: {
        name: 'Coriyon Arrington',
        avatarUrl: 'https://kkegducuyzwdmxlzhxcm.supabase.co/storage/v1/object/public/images/avatars/coriyon-arrington.png'
      }
    }))

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
      {aboutContent.hero && (
        <Box className="pattern-dots">
          <Container maxW="7xl" px={{ base: "4", md: "8" }}>
            <HeroBlock 
              dict={{ ...aboutContent.hero, videoUrl: null, imageUrl: null }} 
              posts={localizedVideos || []} 
              locale={currentLocale} 
            />
            
            {localizedVideos && localizedVideos.length > 0 && (
              <Stack mt={{ base: "-8", md: "-12" }} pb={{ base: "16", md: "24" }} align="flex-start" position="relative" zIndex="10">
                <Button variant="ghost" asChild size="lg">
                  <NextLink href={`/${currentLocale}/blog`}>
                    {currentLocale === 'es' ? 'Ver todos los videos' : 'View all videos'} <LuArrowRight />
                  </NextLink>
                </Button>
              </Stack>
            )}
          </Container>
        </Box>
      )}

      {homeContent.about && (
        <Box id="about" py={{ base: "16", md: "24" }} className="pattern-dots" borderTopWidth="1px" borderColor="border.subtle">
          <Container maxW="7xl" px={{ base: "4", md: "8" }}>
            <FadeIn>
              <AboutFeatures dict={homeContent.about} />
            </FadeIn>
          </Container>
        </Box>
      )}

      {localizedTestimonials && localizedTestimonials.length > 0 && (
        <Box id="testimonials" py={{ base: "16", md: "24" }} className="pattern-dots">
          <Container maxW="7xl" px={{ base: "4", md: "8" }}>
            <FadeIn>
              <TestimonialGrid dict={homeContent.testimonial} testimonials={localizedTestimonials} />
            </FadeIn>
          </Container>
        </Box>
      )}

      {localizedFaqs && localizedFaqs.length > 0 && (
        <Box id="faqs" w="full" borderTopWidth="1px" borderColor="border.subtle">
          <FadeIn>
            <Faq dict={homeContent.faq} faqs={localizedFaqs} />
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