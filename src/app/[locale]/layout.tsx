import type { Metadata } from "next";
import { Provider } from "@/components/ui/provider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ClarityAnalytics } from "@/components/ui/clarity";
import "../globals.css";

import { FloatingContact } from "@/components/ui/floating-contact";
import { montserrat, nunitoSans } from "../fonts";
import { Box, Flex, Container } from "@chakra-ui/react";
import { supabase } from "@/lib/supabase";
import { unstable_cache } from "next/cache";

import { Block as NavbarIsland } from "@/components/blocks/marketing-navbars/navbar-island/block";
import { Block as Footer } from "@/components/blocks/footers/footer-with-address/block";
import { Block as PageNav } from "@/components/blocks/marketing-navbars/page-nav/block";

export const metadata: Metadata = {
  metadataBase: new URL('https://www.coriyon.com'), 
  title: {
    template: '%s | Coriyon Arrington',
    default: 'Coriyon Arrington | Senior Product Designer',
  },
  description: 'Portfolio of Coriyon Arrington, a Senior Product Designer based in Minneapolis helping early-stage founders and small business owners design better products.',
  icons: {
    icon: [
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' }
    ]
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Coriyon Arrington Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Coriyon Arrington | Senior Product Designer',
    description: 'Portfolio of Coriyon Arrington, a Senior Product Designer based in Minneapolis.',
  },
};

const getCachedPage = unstable_cache(
  async (slug: string) => {
    const { data } = await supabase.from('pages').select('*').eq('slug', slug).single()
    return data || {}
  },
  ['page-data'],
  { revalidate: 3600, tags: ['pages'] }
)

// Fetch all pages globally so the Nav, Footer, and PageNav never flicker
const getCachedGlobalPages = unstable_cache(
  async () => {
    const { data } = await supabase
      .from('pages')
      .select('id, slug, title, nav_title, page_type, sort_order')
      .eq('status', 'PUBLISHED')
      .order('sort_order', { ascending: true })

    return data || [];
  },
  ['global-pages-list'],
  { revalidate: 3600, tags: ['pages'] }
)

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const currentLocale = locale || 'en';

  const [homeData, pages] = await Promise.all([
    getCachedPage('home'),
    getCachedGlobalPages()
  ]);

  const homeContent = homeData?.[`content_${currentLocale}`] || homeData?.content_en || {};

  const navLinks = pages
    .filter((p: any) => p.page_type === 'MAIN_MENU')
    .map((p: any) => ({
      id: p.id,
      slug: p.slug === 'home' ? '/' : p.slug,
      nav_title: p.nav_title || p.title
    }));

  const navDict = { 
    previous: currentLocale === 'es' ? 'Anterior' : 'Previous',
    next: currentLocale === 'es' ? 'Siguiente' : 'Up next' 
  };

  return (
    <html 
      lang={currentLocale} 
      className={`${montserrat.variable} ${nunitoSans.variable}`} 
      suppressHydrationWarning
    >
      <body>
        <Provider>
          <Flex direction="column" minH="100vh" bg="bg.canvas">
            
            <NavbarIsland dict={homeContent.navbar} links={navLinks} />
            
            <Box as="main" flex="1" display="flex" flexDirection="column" w="full">
              {children}
            </Box>

            <Box w="full" bg="bg.canvas" pt={{ base: 12, md: 16 }} pb={{ base: 12, md: 16 }}>
              <Container maxW="7xl" px={{ base: "4", md: "8" }}>
                <PageNav dict={navDict} pages={pages} />
              </Container>
            </Box>
            
            <Footer dict={homeContent.footer} pages={pages} />

          </Flex>
          <FloatingContact />
        </Provider>
        <Analytics />
        <SpeedInsights />
        <ClarityAnalytics />
      </body>
    </html>
  );
}