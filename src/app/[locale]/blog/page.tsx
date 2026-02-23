import { Box, Container, Stack } from "@chakra-ui/react"
import { supabase } from "@/lib/supabase"
import { Block as NavbarIsland } from "@/components/blocks/marketing-navbars/navbar-island/block"
import { Block as BlogBlock } from "@/components/blocks/blogs/blog-with-hero-image/block"
import { Block as Cta } from "@/components/blocks/cta/cta-08/block"
import { Block as Footer } from "@/components/blocks/footers/footer-with-address/block"
import { FadeIn } from "@/components/ui/fade-in"

export const revalidate = 0 

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const currentLocale = locale || 'en'

  const { data: blogData } = await supabase.from('pages').select('*').eq('slug', 'blog').single()
  const { data: homeData } = await supabase.from('pages').select('*').eq('slug', 'home').single()
  const { data: videos } = await supabase.from('videos').select('*').order('sort_order', { ascending: true })

  const blogContent = blogData?.[`content_${currentLocale}`] || blogData?.content_en || {}
  const homeContent = homeData?.[`content_${currentLocale}`] || homeData?.content_en || {}

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
      <NavbarIsland dict={homeContent.navbar} />
      
      <Stack gap="0">
        
        {/* The BlogBlock is now the very first element on the page */}
        <FadeIn>
          <BlogBlock 
            dict={{ ...homeContent.blog, ...blogContent.header }} 
            posts={localizedVideos || []} 
            locale={currentLocale} 
          />
        </FadeIn>

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