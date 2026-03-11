import { Box } from "@chakra-ui/react"
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
    <Box 
      w="full"
      flex="1" 
      pt={{ base: 28, md: 32 }}
      className="pattern-dots"
    >
      {/* Restored the original layout utilizing the AiBlock as the hero */}
      <AiBlock locale={currentLocale} isHero={true} dict={chatContent} />
    </Box>
  )
}