import localFont from "next/font/local";
import { Provider } from "@/components/ui/provider";
import "./globals.css";
import { Flex, Heading, Stack, Text, Button } from "@chakra-ui/react";
import NextLink from "next/link";
import { supabase } from "@/lib/supabase";
import { headers, cookies } from "next/headers";
import { Block as NavbarIsland } from "@/components/blocks/marketing-navbars/navbar-island/block";
import { Block as Footer } from "@/components/blocks/footers/footer-with-address/block";

// Because this is at the root level, we use one less `../` to find the fonts!
const montserrat = localFont({
  src: "../fonts/Montserrat/Montserrat-VariableFont_wght.ttf",
  variable: "--font-heading",
  display: "swap",
});

const nunitoSans = localFont({
  src: "../fonts/Nunito-Sans/NunitoSans-VariableFont_YTLC,opsz,wdth,wght.ttf",
  variable: "--font-body",
  display: "swap",
});

export default async function GlobalNotFound() {
  const headersList = await headers();
  const cookieStore = await cookies();
  
  // 1. Advanced Locale Detection: Check middleware, cookies, referer, and browser
  const nextIntlHeader = headersList.get('x-next-intl-locale');
  const localeCookie = cookieStore.get('NEXT_LOCALE')?.value;
  const referer = headersList.get('referer') || '';
  const acceptLanguage = headersList.get('accept-language') || '';
  
  // FIX: Explicitly type currentLocale to guarantee it matches our translation keys
  let currentLocale: 'en' | 'es' = 'en';
  if (nextIntlHeader) {
    currentLocale = nextIntlHeader === 'es' ? 'es' : 'en';
  } else if (localeCookie) {
    currentLocale = localeCookie === 'es' ? 'es' : 'en';
  } else if (referer.includes('/es') || acceptLanguage.toLowerCase().startsWith('es')) {
    currentLocale = 'es';
  }

  // 2. Fetch the corresponding localized content for Navbar & Footer
  const { data: pageData } = await supabase.from('pages').select('*').eq('slug', 'home').maybeSingle();
  const content = currentLocale === 'es' ? (pageData?.content_es || {}) : (pageData?.content_en || {});

  // 3. Define the translations
  const t = {
    en: {
      heading: "Looks like you've wandered off the path 😅",
      description: "The page you're looking for might have been moved, deleted, or perhaps there's a typo in the URL. Let's get you back on track.",
      button: "Return to Homepage"
    },
    es: {
      heading: "Parece que te has salido del camino 😅",
      description: "La página que buscas puede haber sido movida, eliminada o quizás hay un error tipográfico en la URL. Volvamos al inicio.",
      button: "Volver al inicio"
    }
  }[currentLocale];

  return (
    <html lang={currentLocale} suppressHydrationWarning>
      <body className={`${montserrat.variable} ${nunitoSans.variable}`}>
        <Provider>
          <Flex direction="column" minH="100vh" bg="bg.canvas">
            <NavbarIsland dict={content.navbar} />
            
            <Flex
              align="center"
              justify="center"
              flex="1"
              px={4}
              pt="72px"
              className="pattern-dots"
            >
              <Stack
                gap={8}
                mx="auto"
                maxW="lg"
                py={12}
                textAlign="center"
                align="center"
              >
                <Stack gap={6}>
                  <Heading 
                    fontSize={{ base: "3xl", md: "4xl" }} 
                    color="fg.default"
                    lineHeight="1.4" 
                  >
                    {t.heading}
                  </Heading>
                  <Text 
                    fontSize="lg" 
                    color="fg.muted"
                    lineHeight="1.6"
                  >
                    {t.description}
                  </Text>
                </Stack>
                
                <NextLink href={`/${currentLocale}`} passHref>
                  <Button size="lg" mt={2} colorPalette="gray">
                    {t.button}
                  </Button>
                </NextLink>
              </Stack>
            </Flex>
            
            <Footer dict={content.footer} />
          </Flex>
        </Provider>
      </body>
    </html>
  );
}