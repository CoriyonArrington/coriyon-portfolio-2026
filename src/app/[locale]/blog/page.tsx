import { Box, Container, Stack } from "@chakra-ui/react"
import { supabase } from "@/lib/supabase"
import { cache } from "react"
import type { Metadata, ResolvingMetadata } from "next"

import { Block as BlogBlock } from "@/components/blocks/heroes/content-page-hero/block"
import { Block as Cta } from "@/components/blocks/cta/cta-08/block"
import { FadeIn } from "@/components/ui/fade-in"

export const dynamic = 'force-dynamic'

const getPageData = cache(async (slug: string) => {
  const { data } = await supabase.from('pages').select('*').eq('slug', slug).single()
  return data || {}
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
  const pageData = await getPageData('blog')
  
  const title = pageData?.[`title_${currentLocale}`] || pageData?.title_en || pageData?.title || 'Videos | Coriyon Arrington'
  const description = pageData?.[`description_${currentLocale}`] || pageData?.description_en || pageData?.description

  return {
    title,
    description,
    openGraph: { title, description },
    twitter: { title, description }
  }
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const currentLocale = locale || 'en'

  const [
    blogData,
    homeData,
    videos
  ] = await Promise.all([
    getPageData('blog'),
    getPageData('home'),
    getVideosData()
  ]);

  const blogContent = blogData?.[`content_${currentLocale}`] || blogData?.content_en || {}
  const homeContent = homeData?.[`content_${currentLocale}`] || homeData?.content_en || {}

  const localizedVideos = videos?.map((v: any) => ({
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
    <Stack gap="0" w="full">
      {/* Wrapper pt/pb standardized to match Services, Projects, Playground */}
      <Box className="pattern-dots">
        <Container maxW="7xl" px={{ base: "4", md: "8" }}>
          <BlogBlock 
            dict={blogContent.hero} 
            posts={localizedVideos || []} 
            locale={currentLocale} 
          />
        </Container>
      </Box>

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