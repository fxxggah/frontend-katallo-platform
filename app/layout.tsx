import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "Katallo",

  description:
    "Transforme seu Instagram em uma máquina de vendas com um catálogo profissional.",

  openGraph: {
    title: "Katallo",
    description:
      "Transforme seu Instagram em uma máquina de vendas com um catálogo profissional.",
    siteName: "Katallo",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/brand/katallo-full.png",
        width: 1500,
        height: 830,
        alt: "Katallo",
      },
    ],
  },
}

export const viewport: Viewport = {
  themeColor: '#4f46e5',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-white`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}