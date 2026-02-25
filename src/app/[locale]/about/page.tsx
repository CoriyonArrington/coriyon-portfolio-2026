import { Box, Container, Stack } from "@chakra-ui/react"
import { supabase } from "@/lib/supabase"
import { Block as NavbarIsland } from "@/components/blocks/marketing-navbars/navbar-island/block"
// FIX: Updated to the new renamed about-page hero component
import { Block as AboutHero } from "@/components/blocks/heroes/about-page/block"
import { Block as ServicesBlock } from "@/components/blocks/features/feature-10/block"
import { Block as TestimonialGrid } from "@/components/blocks/testimonials/testimonial-grid-with-logo/block"
import { Block as AboutFeatures } from "@/components/blocks/features/feature-07/block"
import { Block as Faq } from "@/components/blocks/faqs/faq-with-inline-headline/block"
import { Block as Cta } from "@/components/blocks/cta/cta-08/block"
import { Block as Footer } from "@/components/blocks/footers/footer-with-address/block"
import { FadeIn } from "@/components/ui/fade-in"

export const revalidate = 0 

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const currentLocale = locale || 'en'

  const { data: aboutData } = await supabase.from('pages').select('*').eq('slug', 'about').single()
  const { data: homeData } = await supabase.from('pages').select('*').eq('slug', 'home').single()
  
  const { data: services } = await supabase.from('services').select('*').order('sort_order', { ascending: true })
  const { data: allTestimonials } = await supabase.from('testimonials').select('*')
  const { data: faqs } = await supabase.from('faqs').select('*').order('id', { ascending: true })

  const aboutContent = aboutData?.[`content_${currentLocale}`] || aboutData?.content_en || {}
  const homeContent = homeData?.[`content_${currentLocale}`] || homeData?.content_en || {}

  const localizedServices = services?.map(s => ({
    id: s.id,
    title: s[`title_${currentLocale}`] || s.title_en || s.title,
    description: s[`description_${currentLocale}`] || s.description_en || s.description,
    icon_name: s.icon_name,
    url: s.url
  }))

  const localizedTestimonials = allTestimonials?.map(t => ({
    ...t,
    quote: t[`quote_${currentLocale}`] || t.quote_en || t.quote,
    role: t[`role_${currentLocale}`] || t.role_en || t.role
  }))

  const localizedFaqs = faqs?.map(faq => ({
    id: faq.id,
    question: faq[`question_${currentLocale}`] || faq.question_en || faq.question,
    answer: faq[`answer_${currentLocale}`] || faq.answer_en || faq.answer
  }))

  return (
    <Box bg="bg.canvas" minH="100vh">
      <NavbarIsland dict={homeContent.navbar} />
      
      <Stack gap="0">
        
        {/* FIX: Applied padding so the rounded hero clears the nav bar perfectly */}
        <Box pt={{ base: "32", md: "40" }} pb={{ base: "8", md: "12" }} className="pattern-dots">
          <Container maxW="7xl" px={{ base: "4", md: "8" }}>
            <FadeIn>
              <AboutHero 
                dict={aboutContent.hero}
                title={aboutContent.hero?.title}
                description={aboutContent.hero?.description}
                videoUrl={aboutContent.hero?.videoUrl}
              />
            </FadeIn>
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
              <ServicesBlock dict={homeContent.services} services={localizedServices || []} />
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
        
        <FadeIn>
          <Footer dict={homeContent.footer} />
        </FadeIn>
      </Stack>
    </Box>
  )
}