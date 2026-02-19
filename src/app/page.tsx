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

export default async function Home() {
  const { data: pageData } = await supabase
    .from('pages')
    .select('content')
    .eq('slug', 'home')
    .single()

  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .order('id', { ascending: true })

  const { data: allTestimonials } = await supabase
    .from('testimonials')
    .select('*')

  const { data: faqs } = await supabase
    .from('faqs')
    .select('*')
    .order('id', { ascending: true })

  const featuredTestimonial = allTestimonials?.find(t => t.is_featured === true)
  const gridTestimonials = allTestimonials?.filter(t => t.is_featured === false)
  const featuredProject = projects?.find(p => p.is_featured === true)

  const heroContent = pageData?.content?.hero

  return (
    <Box bg="bg.canvas" minH="100vh">
      <Box position="fixed" top="4" width="full" zIndex={20} px="4">
        <Container maxW="7xl">
          <NavbarIsland />
        </Container>
      </Box>

      <Stack gap="0">
        <Box pt={{ base: "16", md: "16" }}>
            <HeroWithFullImage 
              title={heroContent?.title || featuredProject?.title}
              description={heroContent?.description || featuredProject?.description}
              tagline={heroContent?.tagline} // Pass the tagline here
              videoUrl={featuredProject?.video_url}
              imageUrl={featuredProject?.image_url}
            />
        </Box>

        <Box py={{ base: "16", md: "24" }}>
          {featuredTestimonial && <FeaturedTestimonial testimonial={featuredTestimonial} />}
        </Box>

        <Box id="projects" bg="bg.subtle" py={{ base: "16", md: "24" }}>
            <CategoryGrid projects={projects || []} />
        </Box>

        <Box py={{ base: "16", md: "24" }}>
            <TestimonialGrid testimonials={gridTestimonials || []} />
        </Box>

        <Box bg="bg.subtle" py={{ base: "16", md: "24" }}>
          <Faq faqs={faqs || []} />
        </Box>

        <Box py={{ base: "16", md: "24" }}>
            <Cta />
        </Box>

        <Footer />
      </Stack>
    </Box>
  )
}