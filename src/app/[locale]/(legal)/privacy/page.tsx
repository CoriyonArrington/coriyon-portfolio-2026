import { Box, Container, Stack, Badge } from "@chakra-ui/react"
import { supabase } from "@/lib/supabase"
import { cache } from "react"
import type { Metadata, ResolvingMetadata } from "next"

import { MarkdownRenderer } from "@/components/ui/markdown-renderer"
import { FadeIn } from "@/components/ui/fade-in"
import { CenteredHeroLayout } from "@/components/blocks/heroes/centered-hero-layout/block"

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
  const pageData = await getPageData('privacy')
  
  const title = pageData?.[`title_${currentLocale}`] || pageData?.title || 'Privacy Policy | Coriyon Arrington'
  const description = pageData?.[`meta_description`] || 'Privacy Policy for CoriyonsList and Fearfully Forged LLC.'

  return {
    title,
    description,
    openGraph: { title, description },
    twitter: { title, description }
  }
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const currentLocale = locale || 'en'
  const isEs = currentLocale === 'es'

  const pageData = await getPageData('privacy')
  const pageContent = pageData?.[`content_${currentLocale}`] || pageData?.content_en || {}
  
  // Extract the markdown body and dynamically strip the # H1 so we can use the Custom Hero
  let content = pageContent?.body || "Privacy policy content not found."
  content = content.replace(/^#\s.*$/m, '').trim()

  return (
    <Stack gap="0" w="full">
      
      {/* 1. Centered Hero Section */}
      <Box 
        className="pattern-dots" 
        borderTopWidth="1px" 
        borderColor="border.subtle"
        bg="bg.canvas"
      >
        <Container maxW="7xl" px={{ base: "4", md: "8" }}>
          <FadeIn>
            <CenteredHeroLayout 
              badge={
                <Badge size="lg" colorPalette="gray" variant="subtle" rounded="full" px="3" py="1">
                  {isEs ? "Legal" : "Legal"}
                </Badge>
              }
              title={isEs ? (pageData?.title_es || "Política de Privacidad") : (pageData?.title || "Privacy Policy")}
              description={isEs 
                ? "Cómo recopilamos, usamos y protegemos sus datos." 
                : "How we collect, use, and protect your data."
              }
              pb={{ base: "12", md: "16" }}
            />
          </FadeIn>
        </Container>
      </Box>

      {/* 2. Content Section */}
      <Box 
        pt={{ base: "8", md: "12" }} 
        pb={{ base: "16", md: "24" }} 
        bg="bg.panel" 
        borderTopWidth="1px" 
        borderColor="border.subtle"
        minH="50vh"
      >
        <Container maxW="3xl" px={{ base: "4", md: "8" }}>
          <FadeIn>
            <Box
              css={{
                // 1. The Dateline: Tighten this so it hugs the intro text
                '& p:first-of-type': { 
                  fontSize: { base: 'md', md: 'lg' }, 
                  color: 'fg.subtle', 
                  mb: 2, 
                  mt: 0 
                },
                // 2. The Intro Paragraph: Add the massive gap HERE, before the first H2 starts
                '& p:nth-of-type(2)': {
                  mb: { base: 12, md: 16 }
                },
                // 3. The Headings: Standardize the gaps for the rest of the document
                '& h2': { 
                  fontSize: { base: '2xl', md: '3xl' }, 
                  fontWeight: 'bold', 
                  mb: 6, 
                  mt: { base: 12, md: 16 }, 
                  lineHeight: '1.2', 
                  letterSpacing: 'tight', 
                  color: 'fg.default' 
                },
                '& h3': { fontSize: 'xl', fontWeight: 'semibold', mb: 4, mt: 10, lineHeight: '1.3', color: 'fg.default' },
                '& p': { mb: 6, lineHeight: '1.8', color: 'fg.muted', fontSize: { base: 'lg', md: 'xl' } },
                '& ul': { pl: 6, mb: 6, listStyleType: 'disc', color: 'fg.muted', fontSize: { base: 'lg', md: 'xl' }, lineHeight: '1.8' },
                '& ol': { pl: 6, mb: 6, listStyleType: 'decimal', color: 'fg.muted', fontSize: { base: 'lg', md: 'xl' }, lineHeight: '1.8' },
                '& li': { mb: 3 },
                '& strong': { fontWeight: '600', color: 'fg.default' },
                '& a': { color: 'colorPalette.600', textDecoration: 'underline', textUnderlineOffset: '4px', fontWeight: '500' },
                '& a:hover': { color: 'colorPalette.700' },
                '& hr': { my: 12, borderColor: 'border.subtle' },
              }}
            >
              <MarkdownRenderer content={content} />
            </Box>
          </FadeIn>
        </Container>
      </Box>
      
    </Stack>
  )
}