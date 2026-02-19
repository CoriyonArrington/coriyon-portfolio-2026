import { Box, Container, Stack } from "@chakra-ui/react"
import { Block as NavbarIsland } from "@/components/blocks/marketing-navbars/navbar-island/block"
import { Block as HeroWithFullImage } from "@/components/blocks/heroes/hero-with-full-image/block"
import { Block as FeaturedTestimonial } from "@/components/blocks/testimonials/testimonial-with-rating/block"
import { Block as MainProject } from "@/components/blocks/features/feature-08/block"
import { Block as ProjectGrid } from "@/components/blocks/features/feature-bento-grid-01/block"
import { Block as TestimonialGrid } from "@/components/blocks/testimonials/testimonial-grid-with-logo/block"
import { Block as Faq } from "@/components/blocks/faqs/faq-with-inline-headline/block"
import { Block as Cta } from "@/components/blocks/cta/cta-08/block"
import { Block as Footer } from "@/components/blocks/footers/footer-with-links-centered/block"

export default function Home() {
  return (
    <Box bg="bg.canvas" minH="100vh">
      {/* Navbar Wrapper 
         - Changed maxW to "7xl" to align with the rest of the page content.
      */}
      <Box position="fixed" top="4" width="full" zIndex={20} px="4">
        <Container maxW="7xl">
          <NavbarIsland />
        </Container>
      </Box>

      <Stack gap="0">
        {/* Hero Section */}
        <Box pt={{ base: "24", md: "32" }}>
            <HeroWithFullImage />
        </Box>

        {/* Featured Testimonial */}
        <Box py={{ base: "16", md: "24" }}>
          <FeaturedTestimonial />
        </Box>

        {/* Main Project (Striped Background) */}
        <Box bg="bg.subtle" py={{ base: "16", md: "24" }}>
            <MainProject />
        </Box>

        {/* Project Grid */}
        <Box py={{ base: "16", md: "24" }}>
          <ProjectGrid />
        </Box>

        {/* Testimonials Grid (Striped Background) */}
        <Box bg="bg.subtle" py={{ base: "16", md: "24" }}>
            <TestimonialGrid />
        </Box>

        {/* FAQ Section */}
        <Box py={{ base: "16", md: "24" }}>
          <Faq />
        </Box>

        {/* CTA Section (Light Gray Background) */}
        <Box bg="bg.subtle" py={{ base: "16", md: "24" }}>
            <Cta />
        </Box>

        {/* Footer */}
        <Footer />
      </Stack>
    </Box>
  )
}