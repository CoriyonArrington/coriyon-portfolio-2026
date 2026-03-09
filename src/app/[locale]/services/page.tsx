import { Box, Container, Flex, Stack } from '@chakra-ui/react'
import { Block as Navbar } from '@/components/blocks/marketing-navbars/navbar-island/block'
import { Block as ServicesHero } from '@/components/blocks/heroes/services-page/block'
import { Block as PricingBlock } from '@/components/blocks/pricing/pricing-with-icon/block'
import { Block as FaqBlock } from '@/components/blocks/faqs/faq-with-inline-headline/block'
import { Block as CtaBlock } from '@/components/blocks/cta/cta-08/block'
import { Block as FooterBlock } from '@/components/blocks/footers/footer-with-address/block'
import { supabase } from '@/lib/supabase'
import { unstable_cache } from 'next/cache'

const getCachedPage = unstable_cache(
  async (slug: string) => {
    const { data } = await supabase.from('pages').select('*').eq('slug', slug).single()
    return data || {}
  },
  ['page-data'],
  { revalidate: 3600, tags: ['pages'] }
)

export default async function ServicesPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const currentLocale = locale || 'en';
  
  const [servicesData, homeData] = await Promise.all([
    getCachedPage('services'),
    getCachedPage('home')
  ]);
    
  const content = servicesData?.[`content_${currentLocale}`] || servicesData?.content_en || {};
  const homeContent = homeData?.[`content_${currentLocale}`] || homeData?.content_en || {};

  return (
    <Flex direction="column" minH="100vh" bg="bg.canvas">
      <Navbar dict={homeContent.navbar} />

      <Stack gap="0" flex="1">
        
        <Box className="pattern-dots" borderBottomWidth="1px" borderColor="border.subtle">
          {/* Passed px="0" to allow the Hero & Pricing Block to handle their own standard horizontal padding */}
          <Container maxW="7xl" px="0">
            <ServicesHero 
              dict={content.hero}
              chatHref={`/${currentLocale}/chat`}
            >
              {/* Nested directly within the hero */}
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

      <FooterBlock dict={homeContent.footer} />
    </Flex>
  )
}