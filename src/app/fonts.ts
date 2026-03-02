import localFont from "next/font/local";

export const montserrat = localFont({
  src: "../fonts/Montserrat/Montserrat-VariableFont_wght.ttf",
  variable: "--font-heading",
  display: "swap",
  weight: "100 900",
  preload: true,
});

export const nunitoSans = localFont({
  src: "../fonts/Nunito-Sans/NunitoSans-VariableFont_YTLC,opsz,wdth,wght.ttf",
  variable: "--font-body",
  display: "swap",
  weight: "200 1000",
  preload: true,
});