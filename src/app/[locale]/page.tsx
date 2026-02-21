import { Box, Container, Stack } from "@chakra-ui/react"
import { supabase } from "@/lib/supabase"
import { Block as NavbarIsland } from "@/components/blocks/marketing-navbars/navbar-island/block"
import { Block as BannerBlock } from "@/components/blocks/banners/banner-with-link/block"
import { Block as HeroWithFullImage } from "@/components/blocks/heroes/hero-with-full-image/block"
import { Block as FeaturedTestimonial } from "@/components/blocks/testimonials/testimonial-with-rating/block"
import { Block as CategoryGrid } from "@/components/blocks/product-categories/category-grid-02/block"
import { Block as ServicesBlock } from "@/components/blocks/features/feature-10/block"
import { Block as TestimonialGrid } from "@/components/blocks/testimonials/testimonial-grid-with-logo/block"
import { Block as AboutFeatures } from "@/components/blocks/features/feature-07/block"
import { Block as ProcessTimeline } from "@/components/blocks/process/timeline-section"
import { Block as BlogBlock } from "@/components/blocks/blogs/blog-with-hero-image/block"
import { Block as Faq } from "@/components/blocks/faqs/faq-with-inline-headline/block"
import { Block as Cta } from "@/components/blocks/cta/cta-08/block"
import { Block as Footer } from "@/components/blocks/footers/footer-with-address/block"
import { FadeIn } from "@/components/ui/fade-in"

export const revalidate = 0 

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const currentLocale = locale || 'en'

  const { data: pageData } = await supabase.from('pages').select('*').eq('slug', 'home').single()
  const { data: projects } = await supabase.from('projects').select('*').order('sort_order', { ascending: true })
  const { data: services } = await supabase.from('services').select('*').order('sort_order', { ascending: true })
  const { data: allTestimonials } = await supabase.from('testimonials').select('*')
  const { data: faqs } = await supabase.from('faqs').select('*').order('id', { ascending: true })
  const { data: videos } = await supabase.from('videos').select('*').order('sort_order', { ascending: true })

  const content = pageData?.[`content_${currentLocale}`] || pageData?.content_en || {}

  const localizedProjects = projects?.map(p => ({
    id: p.id,
    title: p[`title_${currentLocale}`] || p.title_en || p.title,
    description: p[`description_${currentLocale}`] || p.description_en || p.description,
    image_url: p.featured_image_url, 
    videoUrl: p.featured_video_url, 
    link_url: `/${currentLocale}/projects/${p.slug}`,
    bgColor: p.bg_color,
    mockupType: p.mockup_type,
    category: p.project_category 
  }))
  
  const featuredProject = projects?.find(p => p.featured === true)

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
  const featuredTestimonial = localizedTestimonials?.find(t => t.is_featured === true)
  const gridTestimonials = localizedTestimonials?.filter(t => t.is_featured === false)

  const localizedFaqs = faqs?.map(faq => ({
    id: faq.id,
    question: faq[`question_${currentLocale}`] || faq.question_en || faq.question,
    answer: faq[`answer_${currentLocale}`] || faq.answer_en || faq.answer
  }))

  const localizedVideos = videos?.map(v => ({
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

  return (
    <Box bg="bg.canvas" minH="100vh">
      <NavbarIsland dict={content.navbar} />
      <Stack gap="0">
        <BannerBlock dict={content.banner} />

        <Box pt={{ base: "12", md: "12" }} className="pattern-dots">
          <Container maxW="7xl" px={{ base: "4", md: "8" }}>
            <FadeIn>
              <HeroWithFullImage 
                dict={content.hero}
                title={content.hero?.title || featuredProject?.[`title_${currentLocale}`] || featuredProject?.title_en}
                description={content.hero?.description || featuredProject?.[`description_${currentLocale}`] || featuredProject?.description_en}
                tagline={content.hero?.tagline}
                videoUrl={featuredProject?.featured_video_url}
                imageUrl={featuredProject?.featured_image_url} 
              />
            </FadeIn>
          </Container>
        </Box>

        <Box py={{ base: "16", md: "24" }} bg="bg.emphasized">
          <Container maxW="7xl" px={{ base: "4", md: "8" }}>
            <FadeIn>
              {featuredTestimonial && <FeaturedTestimonial testimonial={featuredTestimonial} />}
            </FadeIn>
          </Container>
        </Box>

        <Box id="projects" py={{ base: "16", md: "24" }} className="pattern-dots">
          <Container maxW="7xl" px={{ base: "4", md: "8" }}>
            <FadeIn>
              <CategoryGrid dict={content.project} projects={localizedProjects || []} />
            </FadeIn>
          </Container>
        </Box>

        <Box id="services" py={{ base: "16", md: "24" }} bg="bg.subtle" borderTopWidth="1px" borderBottomWidth="1px" borderColor="border.subtle">
          <Container maxW="7xl" px={{ base: "4", md: "8" }}>
            <FadeIn>
              <ServicesBlock dict={content.services} services={localizedServices || []} />
            </FadeIn>
          </Container>
        </Box>

        <Box id="testimonials" py={{ base: "16", md: "24" }} className="pattern-dots">
          <Container maxW="7xl" px={{ base: "4", md: "8" }}>
            <FadeIn>
              <TestimonialGrid dict={content.testimonial} testimonials={gridTestimonials || []} />
            </FadeIn>
          </Container>
        </Box>

        <Box id="about" py={{ base: "16", md: "24" }}>
          <Container maxW="7xl" px={{ base: "4", md: "8" }}>
            <FadeIn>
              <AboutFeatures dict={content.about} />
            </FadeIn>
          </Container>
        </Box>

        <Box id="process" w="full">
            <ProcessTimeline dict={content.process} />
        </Box>

        <Box id="blog" w="full">
          <FadeIn>
            <BlogBlock dict={content.blog} posts={localizedVideos || []} />
          </FadeIn>
        </Box>

        <Box id="faqs" bg="bg.subtle" py={{ base: "16", md: "24" }} className="pattern-grid">
          <Container maxW="7xl" px={{ base: "4", md: "8" }}>
            <FadeIn>
              <Faq dict={content.faq} faqs={localizedFaqs || []} />
            </FadeIn>
          </Container>
        </Box>

        <Box id="contact" py={{ base: "16", md: "24" }} className="pattern-dots">
          <Container maxW="7xl" px={{ base: "4", md: "8" }}>
            <FadeIn>
              <Cta dict={content.contact} />
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