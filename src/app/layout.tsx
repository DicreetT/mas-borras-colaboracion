import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Programa de Colaboración · El Mas de Borràs",
    template: "%s · El Mas de Borràs",
  },
  description:
    "Demo de la plataforma de colaboración para estancias cuidadas, proyectos comunitarios y legado en El Mas de Borràs.",
  metadataBase: new URL("https://colaboracion.elmasdeborras.com"),
  applicationName: "Programa de Colaboración · El Mas de Borràs",
  appleWebApp: {
    capable: true,
    title: "Mas de Borràs",
    statusBarStyle: "default",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${cormorant.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
