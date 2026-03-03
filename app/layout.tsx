import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, DM_Sans, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import JsonLd from "@/components/json-ld";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400','600','700'],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  weight: ['400','500','600','700']
})

const dmsans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dmsans',
  weight: ['400','500']
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://shosha-laundry.com"),
  title: {

    default: "SHO-SHA LAUNDRY | Professional Laundry & Investment",
    template: "%s | SHO-SHA LAUNDRY",
  },
  description:
    "Layanan laundry profesional dengan sistem autopilot. Investasi laundry terpercaya dengan keuntungan maksimal dan ROI teruji 15+ tahun.",
  keywords: [
    "laundry profesional",
    "investasi laundry",
    "laundry autopilot",
    "franchise laundry",
    "laundry jakarta",
    "bisnis passive income",
    "laundry kiloan",
    "self service laundry",
    "sho sha laundry",
  ],
  alternates: {
    canonical: "https://shosha-laundry.com",
  },

  authors: [{ name: "SHO SHA LAUNDRY" }],
  creator: "SHO SHA LAUNDRY",
  publisher: "SHO SHA LAUNDRY",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://shosha-laundry.com",
    siteName: "SHO SHA LAUNDRY",
    title: "SHO SHA LAUNDRY | Professional Laundry & Investment",
    description:
      "Layanan laundry profesional dengan sistem autopilot. Bangun passive income dari bisnis laundry yang terpercaya dan berpengalaman.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SHO SHA LAUNDRY - Professional Laundry Service",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SHO SHA LAUNDRY | Professional Laundry & Investment",
    description:
      "Layanan laundry profesional dengan sistem autopilot. Bangun passive income dari bisnis laundry yang terpercaya.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "Business",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body
        className={`${inter.variable} ${jakarta.variable} ${dmsans.variable} ${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <JsonLd />
        {children}
      </body>

    </html>
  );
}
