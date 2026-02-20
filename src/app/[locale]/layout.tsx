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
  title: "Coriyon Arrington | Product Designer",
  description: "Portfolio of Coriyon Arrington, Senior Product Designer.",
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