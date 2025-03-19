import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SAO6 - Login',
  description: 'Login de SAO6',
  generator: 'sao6.com.co',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
