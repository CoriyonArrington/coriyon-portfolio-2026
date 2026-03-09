import { Box, Flex } from '@chakra-ui/react'
import { Block as Navbar } from '@/components/blocks/marketing-navbars/navbar-island/block'
import { Block as AiBlock } from '@/components/blocks/ai/ai-prompt-with-action-02/block'
import { Block as FooterBlock } from '@/components/blocks/footers/footer-with-address/block'
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
  
  // Fetch both home data (for navbar/footer) and chat data (for the AI hero)
  const [chatData, homeData] = await Promise.all([
    getCachedPage('chat'),
    getCachedPage('home')
  ]);
  
  const chatContent = chatData?.[`content_${currentLocale}`] || chatData?.content_en || {};
  const homeContent = homeData?.[`content_${currentLocale}`] || homeData?.content_en || {};

  return (
    <Flex direction="column" minH="100vh" bg="bg.canvas">
      <Navbar dict={homeContent.navbar} />

      <Box 
        flex="1" 
        minH="calc(100vh - 80px)" 
        pt={{ base: 28, md: 32 }}
        className="pattern-dots"
      >
        {/* Pass the specific chat content down to the AI block */}
        <AiBlock locale={currentLocale} isHero={true} dict={chatContent} />
      </Box>

      <FooterBlock dict={homeContent.footer} />
    </Flex>
  )
}