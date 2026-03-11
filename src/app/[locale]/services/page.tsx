import { Box, Container, Stack } from "@chakra-ui/react"
import { supabase } from "@/lib/supabase"
import { cache } from "react"
import type { Metadata, ResolvingMetadata } from "next"

import { Block as ServicesHero } from "@/components/blocks/heroes/services-page/block"
import { Block as ServicesBlock } from "@/components/blocks/features/feature-10/block"
import { Block as PricingBlock } from "@/components/blocks/pricing/pricing-with-icon/block"
import { Block as ProcessTimeline } from "@/components/blocks/process/timeline-section"
import { Block as Faq } from "@/components/blocks/faqs/faq-with-inline-headline/block"
import { Block as Cta } from "@/components/blocks/cta/cta-08/block"
import { FadeIn } from "@/components/ui/fade-in"

export const dynamic = 'force-dynamic'

const getPageData = cache(async (slug: string) => {
  const { data } = await supabase.from('pages').select('*').eq('slug', slug).single()
  return data || {}
})

const getServicesList = cache(async () => {
  const { data } = await supabase.from('services').select('*').order('sort_order', { ascending: true })
  return data || []
})

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { locale } = await params;
  const currentLocale = locale || 'en'
  const pageData = await getPageData('services')
  
  const title = pageData?.[`title_${currentLocale}`] || pageData?.title_en || pageData?.title || 'Services | Coriyon Arrington'
  const description = pageData?.[`description_${currentLocale}`] || pageData?.description_en || pageData?.description

  return {
    title,
    description,
    openGraph: { title, description },
    twitter: { title, description }
  }
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const currentLocale = locale || 'en'

  const [
    servicesPageData,
    homeData,
    servicesList
  ] = await Promise.all([
    getPageData('services'),
    getPageData('home'),
    getServicesList()
  ]);

  const servicesContent = servicesPageData?.[`content_${currentLocale}`] || servicesPageData?.content_en || {}
  const homeContent = homeData?.[`content_${currentLocale}`] || homeData?.content_en || {}

  const localizedServices = servicesList?.map((s: any) => ({
    id: s.id,
    title: s[`title_${currentLocale}`] || s.title_en || s.title,
    description: s[`description_${currentLocale}`] || s.description_en || s.description,
    icon_name: s.icon_name,
    url: s.url,
    featured: s.featured
  }))

  const pageFaqs = servicesContent.faqs?.items || []

  return (
    <Stack gap="0" w="full">
      {/* Box padding completely removed. Pattern-dots remains. */}
      <Box className="pattern-dots">
        <Container maxW="7xl" px={{ base: "4", md: "8" }}>
          <ServicesHero 
            dict={servicesContent.hero}
            title={servicesContent.hero?.title}
            description={servicesContent.hero?.description}
            tagline={servicesContent.hero?.tagline}
          />
        </Container>
      </Box>

      {servicesContent.pricing_plans && servicesContent.pricing_plans.length > 0 && (
        <Box id="pricing" py={{ base: "16", md: "24" }} className="pattern-dots" borderBottomWidth="1px" borderColor="border.subtle">
          <Container maxW="7xl" px={{ base: "4", md: "8" }}>
            <FadeIn>
              <PricingBlock dict={servicesContent.pricing_header} plans={servicesContent.pricing_plans} />
            </FadeIn>
          </Container>
        </Box>
      )}

      <Box id="services" py={{ base: "16", md: "24" }} bg="bg.subtle" borderTopWidth="1px" borderBottomWidth="1px" borderColor="border.subtle">
        <Container maxW="7xl" px={{ base: "4", md: "8" }}>
          <FadeIn>
            <ServicesBlock dict={homeContent.services} services={localizedServices || []} />
          </FadeIn>
        </Container>
      </Box>

      <Box id="process" w="full" pt={{ base: "16", md: "24" }}>
        <ProcessTimeline dict={homeContent.process} />
      </Box>

      {pageFaqs.length > 0 && (
        <Box id="faqs" bg="bg.subtle" py={{ base: "16", md: "24" }} className="pattern-grid" borderTopWidth="1px" borderColor="border.subtle">
          <Container maxW="7xl" px={{ base: "4", md: "8" }}>
            <FadeIn>
              <Faq dict={servicesContent.faqs} faqs={pageFaqs} />
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