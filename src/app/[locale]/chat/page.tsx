import { Box } from '@chakra-ui/react'
import { Block as AiBlock } from '@/components/blocks/ai/ai-prompt-with-action-02/block'
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

export default async function ChatPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const currentLocale = locale || 'en';
  
  const chatData = await getCachedPage('chat');
  const chatContent = chatData?.[`content_${currentLocale}`] || chatData?.content_en || {};

  return (
    <Box 
      w="full"
      flex="1" 
      pt={{ base: 28, md: 32 }}
      className="pattern-dots"
    >
      <AiBlock locale={currentLocale} isHero={true} dict={chatContent} />
    </Box>
  )
}