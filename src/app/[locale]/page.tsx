import { Box, Container, Stack } from "@chakra-ui/react"
import { supabase } from "@/lib/supabase"
import { Block as NavbarIsland } from "@/components/blocks/marketing-navbars/navbar-island/block"
import { Block as HeroWithFullImage } from "@/components/blocks/heroes/hero-with-full-image/block"
import { Block as FeaturedTestimonial } from "@/components/blocks/testimonials/testimonial-with-rating/block"
import { Block as CategoryGrid } from "@/components/blocks/product-categories/category-grid-02/block"
import { Block as TestimonialGrid } from "@/components/blocks/testimonials/testimonial-grid-with-logo/block"
import { Block as Faq } from "@/components/blocks/faqs/faq-with-inline-headline/block"
import { Block as Cta } from "@/components/blocks/cta/cta-08/block"
import { Block as Footer } from "@/components/blocks/footers/footer-with-links-centered/block"

export const revalidate = 0 

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const currentLocale = locale || 'en'

  const { data: pageData } = await supabase.from('pages').select('*').eq('slug', 'home').single()
  const { data: projects } = await supabase.from('projects').select('*').order('sort_order', { ascending: true })
  const { data: allTestimonials } = await supabase.from('testimonials').select('*')
  const { data: faqs } = await supabase.from('faqs').select('*').order('id', { ascending: true })

  const content = pageData?.[`content_${currentLocale}`] || pageData?.content_en || {}

  const localizedProjects = projects?.map(p => ({
    id: p.id,
    title: p[`title_${currentLocale}`] || p.title_en || p.title,
    description: p[`description_${currentLocale}`] || p.description_en || p.description,
    image_url: p.featured_image_url, 
    videoUrl: p.featured_video_url, 
    link_url: `/${currentLocale}/projects/${p.slug}`,
    bgColor: p.bg_color,
    mockupType: p.mockup_type 
  }))
  
  const featuredProject = projects?.find(p => p.featured === true)

  const localizedTestimonials = allTestimonials?.map(t => ({
    ...t,
    quote: t[`quote_${currentLocale}`] || t.quote_en || t.quote,
    role: t[`role_${currentLocale}`] || t.role_en || t.role
  }))
  const featuredTestimonial = localizedTestimonials?.find(t => t.is_featured === true)
  const gridTestimonials = localizedTestimonials?.filter(t => t.is_featured === false)

  const localizedFaqs = faqs?.map(faq => ({
    id: faq.id,
    question: faq[`question_${currentLocale}`] || faq.question_en || faq.question,
    answer: faq[`answer_${currentLocale}`] || faq.answer_en || faq.answer
  }))

  return (
    <Box bg="bg.canvas" minH="100vh">
      <NavbarIsland dict={content.navbar} />
      <Stack gap="0">
        <Box pt={{ base: "12", md: "12" }}>
          <Container maxW="7xl" px={{ base: "4", md: "8" }}>
            <HeroWithFullImage 
              dict={content.hero}
              title={content.hero?.title || featuredProject?.[`title_${currentLocale}`] || featuredProject?.title_en}
              description={content.hero?.description || featuredProject?.[`description_${currentLocale}`] || featuredProject?.description_en}
              tagline={content.hero?.tagline}
              videoUrl={featuredProject?.featured_video_url}
              imageUrl={featuredProject?.featured_image_url} 
            />
          </Container>
        </Box>

        <Box py={{ base: "16", md: "24" }}>
          <Container maxW="7xl" px={{ base: "4", md: "8" }}>
            {featuredTestimonial && <FeaturedTestimonial testimonial={featuredTestimonial} />}
          </Container>
        </Box>

        <Box id="projects" bg="bg.subtle" py={{ base: "16", md: "24" }}>
          <Container maxW="7xl" px={{ base: "4", md: "8" }}>
            <CategoryGrid dict={content.project} projects={localizedProjects || []} />
          </Container>
        </Box>

        <Box id="testimonials" py={{ base: "16", md: "24" }}>
          <Container maxW="7xl" px={{ base: "4", md: "8" }}>
            <TestimonialGrid dict={content.testimonial} testimonials={gridTestimonials || []} />
          </Container>
        </Box>

        <Box id="faqs" bg="bg.subtle" py={{ base: "16", md: "24" }}>
          <Container maxW="7xl" px={{ base: "4", md: "8" }}>
            <Faq dict={content.faq} faqs={localizedFaqs || []} />
          </Container>
        </Box>

        <Box id="contact" py={{ base: "16", md: "24" }}>
          <Container maxW="7xl" px={{ base: "4", md: "8" }}>
            <Cta dict={content.contact} />
          </Container>
        </Box>
        <Footer dict={content.footer} />
      </Stack>
    </Box>
  )
}