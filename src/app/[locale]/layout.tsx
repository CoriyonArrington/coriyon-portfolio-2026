import type { Metadata } from "next";
import localFont from "next/font/local";
import { Provider } from "@/components/ui/provider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ClarityAnalytics } from "@/components/ui/clarity";
import "../globals.css";

const montserrat = localFont({
  src: "../../fonts/Montserrat/Montserrat-VariableFont_wght.ttf",
  variable: "--font-heading",
  display: "swap",
});

const nunitoSans = localFont({
  src: "../../fonts/Nunito-Sans/NunitoSans-VariableFont_YTLC,opsz,wdth,wght.ttf",
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  // Updated to your new primary production domain!
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
    // Next.js automatically injects the image from src/app/opengraph-image.png!
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Coriyon Arrington | Senior Product Designer',
    description: 'Portfolio of Coriyon Arrington, a Senior Product Designer based in Minneapolis.',
    // Next.js automatically falls back to opengraph-image.png here as well!
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  // FIX: Await the params Promise before accessing locale
  const { locale } = await params;

  return (
    <html lang={locale || "en"} suppressHydrationWarning>
      <body className={`${montserrat.variable} ${nunitoSans.variable}`}>
        <Provider>
          {children}
        </Provider>
        <Analytics />
        <SpeedInsights />
        <ClarityAnalytics />
      </body>
    </html>
  );
}