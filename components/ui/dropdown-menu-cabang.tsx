"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

const outlets = [
  "Pahlawan",
  "Radio Dalam Lama",
  "Assirot",
  "Ciledug",
  "Cipete Utara",
  "Kebon Mangga",
  "Kemanggisan Pulo",
  "KPBD",
  "Madrasah",
  "Petukangan Baru",
  "Petukangan Lama",
  "Radio Dalam 24 Jam",
  "Tanah Kusir",
]

const slugify = (text: string) =>
  text.toLowerCase().replace(/\s+/g, "-")

export default function DropdownMenuCabang() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="absolute right-0 top-full pt-4">
      <div
        className={`w-[900px] rounded-b-2xl border border-border/50 backdrop-blur-xl shadow-xl overflow-hidden transition-all duration-300 ${
          scrolled ? "bg-background/90" : "bg-background/70"
        }`}
      >
        
        {/* GRID */}
        <div className="grid grid-cols-7 divide-x divide-y divide-border/40 gap-x-6 gap-y-3">

          {outlets.map((outlet) => (
            <Link
              key={outlet}
              href={`/units-${slugify(outlet)}`}
              className="px-2 py-3 text-sm font-medium text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors leading-snug"
            >
              {outlet}
            </Link>
          ))}

        </div>

      </div>
    </div>
  )
}
