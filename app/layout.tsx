import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Trinity Microfinance Ltd',
  description: 'Microfinance Management System by Masaa24 Networks',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">{children}</body>
    </html>
  )
}