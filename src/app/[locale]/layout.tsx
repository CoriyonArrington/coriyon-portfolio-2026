import type { Metadata } from "next";
import localFont from "next/font/local";
import { Provider } from "@/components/ui/provider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ClarityAnalytics } from "@/components/ui/clarity";
import "../globals.css";

import { supabase } from "@/lib/supabase";
import { FloatingContact } from "@/components/ui/floating-contact";
import { Block as BannerBlock } from "@/components/blocks/banners/banner-with-link/block";

const montserrat = localFont({
  src: "../../fonts/Montserrat/Montserrat-VariableFont_wght.ttf",
  variable: "--font-heading",
  display: "swap",
  weight: "100 900",
});

const nunitoSans = localFont({
  src: "../../fonts/Nunito-Sans/NunitoSans-VariableFont_YTLC,opsz,wdth,wght.ttf",
  variable: "--font-body",
  display: "swap",
  weight: "200 1000",
});

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

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const currentLocale = locale || 'en';

  // Fetch the home page data to pass the dictionary to the global banner
  const { data: homeData } = await supabase.from('pages').select('*').eq('slug', 'home').single();
  const homeContent = homeData?.[`content_${currentLocale}`] || homeData?.content_en || {};

  return (
    <html 
      lang={locale || "en"} 
      className={`${montserrat.variable} ${nunitoSans.variable}`} 
      suppressHydrationWarning
    >
      <body>
        <Provider>
          {children}
          
          <FloatingContact />
          <BannerBlock dict={homeContent.banner} />
          
        </Provider>
        <Analytics />
        <SpeedInsights />
        <ClarityAnalytics />
      </body>
    </html>
  );
}