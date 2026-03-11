import { Box, Container, Button } from "@chakra-ui/react";
import NextLink from "next/link";
import { headers, cookies } from "next/headers";
import { ErrorLottie } from "@/components/ui/error-lottie"; 
import { CenteredHeroLayout } from "@/components/blocks/heroes/centered-hero-layout/block";

export default async function NotFound() {
  const headersList = await headers();
  const cookieStore = await cookies();
  
  const nextIntlHeader = headersList.get('x-next-intl-locale');
  const localeCookie = cookieStore.get('NEXT_LOCALE')?.value;
  const referer = headersList.get('referer') || '';
  const acceptLanguage = headersList.get('accept-language') || '';
  
  let currentLocale: 'en' | 'es' = 'en';
  if (nextIntlHeader) {
    currentLocale = nextIntlHeader === 'es' ? 'es' : 'en';
  } else if (localeCookie) {
    currentLocale = localeCookie === 'es' ? 'es' : 'en';
  } else if (referer.includes('/es') || acceptLanguage.toLowerCase().startsWith('es')) {
    currentLocale = 'es';
  }

  const t = {
    en: {
      heading: "Looks like you've wandered off the path 😅",
      description: "The page you're looking for might have been moved, deleted, or perhaps there's a typo in the URL. Let's get you back on track.",
      button: "Return to Home"
    },
    es: {
      heading: "Parece que te has salido del camino 😅",
      description: "La página que buscas puede haber sido movida, eliminada o quizás hay un error tipográfico en la URL. Volvamos al inicio.",
      button: "Volver al inicio"
    }
  }[currentLocale];

  return (
    <Box flex="1" className="pattern-dots" w="full">
      <Container maxW="7xl" px={{ base: "4", md: "8" }}>
        <CenteredHeroLayout
          title={t.heading}
          description={t.description}
          primaryAction={
            <NextLink href={`/${currentLocale}`}>
              <Button 
                size="xl" 
                h={{ base: 14, md: 16 }} 
                px={{ base: 6, md: 8 }} 
                fontSize="lg" 
                colorPalette="green" 
                variant="solid"
                w={{ base: 'full', md: 'auto' }}
              >
                {t.button}
              </Button>
            </NextLink>
          }
        >
          <Box position="relative" w="full" maxW="320px" h="320px" mx="auto" mt={{ base: 4, md: 8 }}>
            <ErrorLottie />
          </Box>
        </CenteredHeroLayout>
      </Container>
    </Box>
  );
}