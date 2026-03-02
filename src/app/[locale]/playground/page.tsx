import { Box, Flex } from "@chakra-ui/react"
import { supabase } from "@/lib/supabase"
import { Block as NavbarIsland } from "@/components/blocks/marketing-navbars/navbar-island/block"
import { Block as AIInterface } from "@/components/blocks/ai/ai-prompt-with-action-02/block"

export const revalidate = 3600 

export default async function PlaygroundPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const currentLocale = locale || 'en'

  const [
    { data: playgroundData },
    { data: homeData }
  ] = await Promise.all([
    supabase.from('pages').select('*').eq('slug', 'playground').single(),
    supabase.from('pages').select('*').eq('slug', 'home').single()
  ])

  const playgroundContent = playgroundData?.[`content_${currentLocale}`] || playgroundData?.content_en || {}
  const homeContent = homeData?.[`content_${currentLocale}`] || homeData?.content_en || {}

  return (
    // OPTIMIZATION: 100dvh prevents mobile browser bar jumping, overflow hidden locks the outer page
    <Box bg="bg.canvas" h="100dvh" overflow="hidden" display="flex" flexDirection="column">
      <NavbarIsland dict={homeContent.navbar} />
      
      {/* pt="72px" safely clears the navbar without causing scroll overflow */}
      <Box flex="1" overflow="hidden" pt="72px" display="flex" flexDirection="column">
        <AIInterface dict={playgroundContent.ai} locale={currentLocale} />
      </Box>
    </Box>
  )
}