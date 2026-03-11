import { Box, Container, Stack } from "@chakra-ui/react"
import { supabase } from "@/lib/supabase"
import { cache } from "react"
import type { Metadata, ResolvingMetadata } from "next"

// Corrected import path for the AI Chat component
import { Block as AiBlock } from "@/components/blocks/ai/ai-prompt-with-action-02/block"

export const dynamic = 'force-dynamic'

// Replaced unstable_cache with standard React.cache for consistent server performance
const getPageData = cache(async (slug: string) => {
  const { data } = await supabase.from('pages').select('*').eq('slug', slug).single()
  return data || {}
})

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { locale } = await params;
  const currentLocale = locale || 'en'
  const pageData = await getPageData('chat')
  
  const title = pageData?.[`title_${currentLocale}`] || pageData?.title_en || pageData?.title || 'Chat | Coriyon Arrington'
  const description = pageData?.[`description_${currentLocale}`] || pageData?.description_en || pageData?.description

  return {
    title,
    description,
    openGraph: { title, description },
    twitter: { title, description }
  }
}

export default async function ChatPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  const currentLocale = locale || 'en';
  
  const chatData = await getPageData('chat');
  const chatContent = chatData?.[`content_${currentLocale}`] || chatData?.content_en || {};

  return (
    <Stack gap="0" w="full">
      {/* FIX: Standardized Wrapper exactly like Home, Projects, Playground, and Services */}
      <Box className="pattern-dots" pt={{ base: '32', md: '40' }} pb={{ base: '16', md: '24' }}>
        <Container maxW="7xl" px={{ base: "4", md: "8" }}>
          <AiBlock locale={currentLocale} isHero={true} dict={chatContent} />
        </Container>
      </Box>
    </Stack>
  )
}