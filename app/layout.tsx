import "./globals.css"
import "react-photo-view/dist/react-photo-view.css"
import { Inter } from "next/font/google"
import { Rosario } from "next/font/google"
import type { Metadata, Viewport } from "next"

const rosario = Rosario({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Artworks Demo",
    description: "A Demo of Artworks which is a collection of art pieces from the Art Institute of Chicago."
}

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    minimumScale: 1
}

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={rosario.className}>{children}</body>
        </html>
    )
}
