"use client"

import Link from "next/link"

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
  text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")

export default function DropdownMenuCabang() {
  return (
    <div className="absolute right-0 top-full pt-4">
      <div
        className="
        w-[min(95vw,900px)]
        max-h-[420px]
        overflow-y-auto
        rounded-2xl
        border border-border/50
        bg-background/95
        backdrop-blur-xl
        shadow-xl
        p-4
        "
      >
        <div
          className="
          grid
          grid-cols-2
          sm:grid-cols-3
          md:grid-cols-4
          lg:grid-cols-5
          xl:grid-cols-6
          gap-2
          "
        >
          {outlets.map((outlet) => (
            <Link
              key={outlet}
              href={`/outlets/${slugify(outlet)}`}
              className="
              rounded-lg
              px-3 py-2
              text-sm
              font-medium
              text-muted-foreground
              hover:bg-primary/10
              hover:text-primary
              transition-colors
              "
            >
              {outlet}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
