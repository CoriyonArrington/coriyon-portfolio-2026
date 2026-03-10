import { Box, Container, Stack } from '@chakra-ui/react'
import { Block as ServicesHero } from '@/components/blocks/heroes/services-page/block'
import { Block as PricingBlock } from '@/components/blocks/pricing/pricing-with-icon/block'
import { Block as FaqBlock } from '@/components/blocks/faqs/faq-with-inline-headline/block'
import { Block as CtaBlock } from '@/components/blocks/cta/cta-08/block'
import { supabase } from '@/lib/supabase'

// OPTIMIZATION: Force dynamic rendering so pricing updates show immediately
export const dynamic = 'force-dynamic'
export const revalidate = 0

const getPageData = async (slug: string) => {
  const { data } = await supabase.from('pages').select('*').eq('slug', slug).single()
  return data || {}
}

export default async function ServicesPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const currentLocale = locale || 'en';
  
  const [servicesData, homeData] = await Promise.all([
    getPageData('services'),
    getPageData('home')
  ]);
    
  const content = servicesData?.[`content_${currentLocale}`] || servicesData?.content_en || {};
  const homeContent = homeData?.[`content_${currentLocale}`] || homeData?.content_en || {};

  return (
    <Stack gap="0" w="full">
      <Box className="pattern-dots" borderBottomWidth="1px" borderColor="border.subtle">
        <Container maxW="7xl" px="0">
          <ServicesHero 
            dict={content.hero}
            chatHref={`/${currentLocale}/chat`}
          >
            <PricingBlock dict={content} />
          </ServicesHero>
        </Container>
      </Box>

      <Box id="faqs" bg={{ base: "bg.subtle", _dark: "black" }} py={{ base: "16", md: "24" }} className="pattern-grid" borderTopWidth="1px" borderColor="border.subtle">
        <Container maxW="7xl" px={{ base: "4", md: "8" }}>
          <FaqBlock dict={content?.faqs} faqs={content?.faqs?.items || []} />
        </Container>
      </Box>

      <Box id="contact" py={{ base: "16", md: "24" }} className="pattern-dots" borderTopWidth="1px" borderColor="border.subtle">
        <Container maxW="7xl" px={{ base: "4", md: "8" }}>
          <CtaBlock dict={homeContent.contact} />
        </Container>
      </Box>
    </Stack>
  )
}