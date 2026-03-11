"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

export default function Gallery() {

  const images = [
    { src: "/gallery/rd_lama.jpg", alt: "Outlet modern SHO SHA", span: "col-span-2 row-span-2" },
    { src: "/units/ciledug.jpg", alt: "Mesin cuci industri", span: "col-span-1 row-span-1" },
    { src: "/units/madrasah.jpg", alt: "Tim profesional", span: "col-span-1 row-span-1" },
    { src: "/units-raw/kpbd.png", alt: "Hasil cucian rapi", span: "col-span-1 row-span-1" },
    { src: "/gallery/galeri1.jpg", alt: "Proses quality control", span: "col-span-1 row-span-2" },
    { src: "/mesin/mesin1_rdlama.jpg", alt: "Area packing premium", span: "col-span-2 row-span-1" },
    { src: "/units/cipete.jpg", alt: "Interior outlet bersih", span: "col-span-1 row-span-1" }
  ]

  const [index, setIndex] = useState<number | null>(null)

  const open = (i:number) => setIndex(i)
  const close = () => setIndex(null)

  const next = () => {
    if(index === null) return
    setIndex((index + 1) % images.length)
  }

  const prev = () => {
    if(index === null) return
    setIndex((index - 1 + images.length) % images.length)
  }

  useEffect(()=>{
    const handle = (e:KeyboardEvent)=>{

      if(index === null) return

      if(e.key === "Escape") close()
      if(e.key === "ArrowRight") next()
      if(e.key === "ArrowLeft") prev()

    }
    window.addEventListener("keydown",handle)
    return ()=> window.removeEventListener("keydown",handle)
  },[index])


  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          Gallery
        </p>

        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Lihat lebih dekat.
        </h2>

        <p className="mt-4 text-muted-foreground">
          Lihat aktivitas, outlet modern, dan kualitas layanan laundry kami.
        </p>
      </motion.div>

      {/* GRID */}
      <div className="mt-14 grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[200px] gap-5">
        {images.map((img, i) => (
          <motion.div
            key={i}
            onClick={() => open(i)}
            className={`relative cursor-pointer overflow-hidden rounded-2xl ${img.span}`}
            whileHover={{ scale: 1.03 }}
          >
            <Image
              src={img.src}
              alt=""
              fill
              loading="lazy"
              sizes="(max-width:768px) 50vw, 25vw"
              className="object-cover transition duration-500 hover:scale-110"
            />
          </motion.div>
        ))}
      </div>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {index !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0}}
          >
            {/* BACKGROUND */}
            <div
              className="absolute inset-0 backdrop-blur-xl bg-black/40"
              onClick={close}
            />

            {/* COUNTER */}
            <div className="absolute top-6 left-6 text-white text-sm">
              {index + 1} / {images.length}
            </div>

            {/* CLOSE */}
            <button
              onClick={close}
              className="absolute top-6 right-6 text-white"
            >
              <X size={30}/>
            </button>

            {/* PREV */}
            <button
              onClick={prev}
              className="absolute left-4 md:left-10 text-white"
            >
              <ChevronLeft size={38}/>
            </button>

            {/* IMAGE */}
            <motion.div
              key={images[index].src}
              initial={{scale:0.95,opacity:0}}
              animate={{scale:1,opacity:1}}
              exit={{scale:0.95,opacity:0}}
              className="
                relative
                w-[82vw]
                md:w-[70vw]
                lg:w-[60vw]
                max-w-[900px]
                aspect-[16/9]
              "
            >
              <Image
                src={images[index].src}
                alt=""
                fill
                priority
                className="object-contain rounded-xl"
              />
            </motion.div>

            {/* NEXT */}
            <button
              onClick={next}
              className="absolute right-4 md:right-10 text-white"
            >
              <ChevronRight size={38}/>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
