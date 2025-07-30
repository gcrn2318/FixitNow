import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/contexts/AuthContext"
import { AppDataProvider } from "@/contexts/AppDataContext"
import { SocketProvider } from "@/contexts/SocketContext"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FixItNow - All Services at One Place",
  description:
    "Connect with vetted local home service professionals instantly. From plumbing to electrical work, get quality service with real-time tracking and guaranteed satisfaction.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <AppDataProvider>
              <SocketProvider>
                {children}
                <Toaster position="top-right" richColors />
              </SocketProvider>
            </AppDataProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
