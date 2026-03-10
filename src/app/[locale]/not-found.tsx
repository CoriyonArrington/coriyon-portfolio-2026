import { Flex, Heading, Stack, Text, Button, Box } from "@chakra-ui/react";
import NextLink from "next/link";
import { headers, cookies } from "next/headers";
import { ErrorLottie } from "@/components/ui/error-lottie"; 

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
      button: "Return to Homepage"
    },
    es: {
      heading: "Parece que te has salido del camino 😅",
      description: "La página que buscas puede haber sido movida, eliminada o quizás hay un error tipográfico en la URL. Volvamos al inicio.",
      button: "Volver al inicio"
    }
  }[currentLocale];

  return (
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
        <Box position="relative" w="full" maxW="320px" h="320px" mx="auto">
          <ErrorLottie />
        </Box>

        <Stack gap={6}>
          <Heading fontSize={{ base: "3xl", md: "4xl" }} color="fg.default" lineHeight="1.4">
            {t.heading}
          </Heading>
          <Text fontSize="lg" color="fg.muted" lineHeight="1.6">
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
  );
}