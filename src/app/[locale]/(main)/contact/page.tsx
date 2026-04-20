import { Box, Container, Stack } from "@chakra-ui/react"
import { supabase } from "@/lib/supabase"
import { cache } from "react"
import type { Metadata, ResolvingMetadata } from "next"

import { Block as ContactBlock } from "@/components/blocks/contacts/contact-form-with-image/block"
import { FadeIn } from "@/components/ui/fade-in"

export const dynamic = 'force-dynamic'

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
  const pageData = await getPageData('contact')
  
  const title = pageData?.[`title_${currentLocale}`] || pageData?.title_en || pageData?.title || 'Contact | Coriyon Arrington'
  const description = pageData?.[`description_${currentLocale}`] || pageData?.description_en || pageData?.description

  return {
    title,
    description,
    openGraph: { title, description },
    twitter: { title, description }
  }
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const currentLocale = locale || 'en'

  const pageData = await getPageData('contact')
  const content = pageData?.[`content_${currentLocale}`] || pageData?.content_en || {}

  return (
    <Stack gap="0" w="full">
      {/* FIX: Let SplitScreenHeroLayout handle its own vertical padding, just wrap in Container */}
      <Box className="pattern-dots">
        <Container maxW="7xl" px={{ base: "4", md: "8" }}>
          <FadeIn>
            <ContactBlock dict={content.contact} />
          </FadeIn>
        </Container>
      </Box>
    </Stack>
  )
}