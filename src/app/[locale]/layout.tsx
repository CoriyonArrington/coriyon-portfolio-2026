import type { Metadata } from "next";
import localFont from "next/font/local";
import { Provider } from "@/components/ui/provider";
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
  metadataBase: new URL('https://coriyonarrington.com'), 
  title: {
    template: '%s | Coriyon Arrington',
    default: 'Coriyon Arrington | Senior Product Designer',
  },
  description: 'Portfolio of Coriyon Arrington, a Senior Product Designer based in Minneapolis helping early-stage founders and small business owners design better products.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Coriyon Arrington Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Coriyon Arrington - Senior Product Designer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Coriyon Arrington | Senior Product Designer',
    description: 'Portfolio of Coriyon Arrington, a Senior Product Designer based in Minneapolis.',
    images: ['/og-image.png'],
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
      </body>
    </html>
  );
}