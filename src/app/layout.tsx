import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Chatbot from '@/components/Chatbot'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Lost & Found Portal - AI Powered Matching',
  description: 'Find your lost items with AI-powered image matching',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        {children}
        <Chatbot />
      </body>
    </html>
  )
}
