import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'

const roboto = Roboto({
  variable: '--roboto-sans',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Clicka Shop',
  description: 'ecommerce ficticio de perifericos',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className={`${roboto.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}