"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  useSpring,
  type MotionValue,
} from "framer-motion";
import {
  Droplets,
  Clock,
  Shield,
  Sparkles,
  MapPin,
  Phone,
  Mail,
  Star,
  ArrowRight,
  Shirt,
  WashingMachine,
  Timer,
  Truck,
  CheckCircle2,
  Instagram,
  MessageCircle,
  Zap,
  Leaf,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

/* ─── Animated Counter ─── */
function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { damping: 40, stiffness: 120 });
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) motionVal.set(value);
  }, [isInView, motionVal, value]);

  useEffect(() => {
    const unsub = spring.on("change", (v) => {
      if (ref.current) ref.current.textContent = Math.round(v) + suffix;
    });
    return unsub;
  }, [spring, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

/* ─── Marquee ─── */
function Marquee({ children, reverse = false }: { children: React.ReactNode; reverse?: boolean }) {
  return (
    <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div
        className={`flex shrink-0 gap-6 py-4 ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
      >
        {children}
        {children}
      </div>
    </div>
  );
}

/* ─── Parallax wrapper ─── */
function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

/* ─── Data ─── */
const services = [
  { icon: Shirt, title: "Cuci Setrika", desc: "Bersih, rapi, dan wangi dengan perawatan premium", price: "7K", unit: "/kg" },
  { icon: WashingMachine, title: "Dry Clean", desc: "Profesional untuk pakaian formal & delicate fabric", price: "15K", unit: "/kg" },
  { icon: Timer, title: "Express 6H", desc: "Layanan kilat untuk kebutuhan mendesak Anda", price: "12K", unit: "/kg" },
  { icon: Sparkles, title: "Premium Care", desc: "Ekstra untuk bahan premium — sutra, wool, cashmere", price: "25K", unit: "/kg" },
  { icon: Truck, title: "Antar Jemput", desc: "Free pickup & delivery untuk area sekitar", price: "FREE", unit: "*" },
  { icon: Droplets, title: "Cuci Satuan", desc: "Per item untuk kebutuhan khusus Anda", price: "10K", unit: "+" },
];

const processSteps = [
  { step: "01", title: "Jemput", desc: "Tim kami menjemput cucian langsung ke lokasi Anda" },
  { step: "02", title: "Sortir", desc: "Pemisahan berdasarkan warna, bahan, dan jenis perawatan" },
  { step: "03", title: "Cuci", desc: "Proses pencucian dengan mesin modern & deterjen premium" },
  { step: "04", title: "Antar", desc: "Cucian bersih diantarkan kembali, rapi & wangi" },
];

const testimonials = [
  { name: "Rina Maharani", role: "Ibu Rumah Tangga", text: "Hasilnya selalu memuaskan! Baju wangi dan rapi. Sudah langganan 2 tahun dan tidak pernah mengecewakan.", rating: 5 },
  { name: "Budi Santoso", role: "Karyawan Swasta", text: "Layanan express-nya game changer. Pagi antar, sore sudah bisa diambil. Kualitasnya tetap premium.", rating: 5 },
  { name: "Dian Permata", role: "Mahasiswa", text: "Harga ramah di kantong mahasiswa tapi kualitasnya nggak murahan. Pewanginya juga tahan lama banget!", rating: 5 },
  { name: "Andre Wijaya", role: "Entrepreneur", text: "Untuk jas dan kemeja formal, saya selalu percaya SHO SHA. Dry clean-nya benar-benar profesional.", rating: 5 },
];

const marqueeWords = [
  "BERSIH", "WANGI", "CEPAT", "PROFESIONAL", "TERPERCAYA", "PREMIUM",
  "HIGIENIS", "RAPI", "BERKUALITAS", "MODERN",
];

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* ═══ NAVBAR ═══ */}
      <nav className="fixed top-0 z-50 w-full">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mt-4 flex h-14 items-center justify-between rounded-2xl border border-border/50 bg-background/70 px-6 shadow-lg shadow-black/5 backdrop-blur-xl">
            <a href="#" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80">
                <Droplets className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-base font-bold tracking-tight">SHO SHA</span>
            </a>
            <div className="hidden items-center gap-7 md:flex">
              {["Layanan", "Proses", "Harga", "Testimoni", "Kontak"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item}
                </a>
              ))}
            </div>
            <Button size="sm" className="rounded-xl text-xs" asChild>
              <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-1.5 h-3.5 w-3.5" />
                WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </nav>

      {/* ═══ HERO ═══ */}
      <section ref={heroRef} id="beranda" className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden px-6">
        {/* Animated gradient orbs */}
        <div className="pointer-events-none absolute inset-0">
          <motion.div
            animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-32 top-20 h-[600px] w-[600px] rounded-full bg-primary/10 blur-[120px]"
          />
          <motion.div
            animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-32 bottom-20 h-[500px] w-[500px] rounded-full bg-accent/8 blur-[120px]"
          />
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary/8 blur-[100px]"
          />
        </div>

        {/* Grid pattern overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 mx-auto max-w-5xl text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Badge variant="outline" className="mb-8 gap-2 border-primary/30 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Menerima order sekarang
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-5xl font-extrabold leading-[1.1] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
          >
            <span className="block">Bersih itu</span>
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">
                mudah.
              </span>
              <motion.svg
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 200 12"
                fill="none"
              >
                <motion.path
                  d="M2 8 C50 2, 150 2, 198 8"
                  stroke="url(#underline-gradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
                />
                <defs>
                  <linearGradient id="underline-gradient" x1="0" y1="0" x2="200" y2="0" gradientUnits="userSpaceOnUse">
                    <stop stopColor="oklch(0.7 0.18 50)" />
                    <stop offset="1" stopColor="oklch(0.92 0.08 85)" />
                  </linearGradient>
                </defs>
              </motion.svg>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
          >
            Serahkan cucian Anda pada ahlinya. Kami rawat setiap helai pakaian
            dengan <span className="font-medium text-foreground">standar premium</span> — dari
            jemput hingga antar kembali ke pintu rumah Anda.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button size="lg" className="group gap-2 rounded-xl px-8 text-base" asChild>
              <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer">
                Pesan Sekarang
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button size="lg" variant="ghost" className="gap-2 rounded-xl text-base text-muted-foreground" asChild>
              <a href="#proses">
                Lihat cara kerjanya
                <ChevronDown className="h-4 w-4" />
              </a>
            </Button>
          </motion.div>

          {/* Floating stats cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mx-auto mt-20 grid max-w-xl grid-cols-3 gap-4"
          >
            {[
              { value: 5, suffix: "+", label: "Tahun Pengalaman", icon: Shield },
              { value: 2000, suffix: "+", label: "Pelanggan Puas", icon: Star },
              { value: 98, suffix: "%", label: "Repeat Order", icon: Zap },
            ].map((stat) => (
              <div
                key={stat.label}
                className="group rounded-2xl border border-border/50 bg-card/50 p-4 backdrop-blur-sm transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5"
              >
                <stat.icon className="mx-auto mb-2 h-4 w-4 text-primary" />
                <p className="text-2xl font-bold tabular-nums sm:text-3xl">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-muted-foreground/30 p-1.5"
          >
            <motion.div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/50" />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══ MARQUEE STRIP ═══ */}
      <div className="border-y border-border/50 bg-accent py-5">
        <Marquee>
          {marqueeWords.map((word) => (
            <span key={word} className="flex items-center gap-6 text-sm font-bold tracking-[0.2em] text-accent-foreground/70">
              {word}
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
          ))}
        </Marquee>
      </div>

      {/* ═══ BENTO GRID SERVICES ═══ */}
      <section id="layanan" className="px-6 py-28">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Layanan</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Semua yang Anda butuhkan,
              <br />
              <span className="text-muted-foreground">dalam satu tempat.</span>
            </h2>
          </motion.div>

          {/* Bento Grid */}
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className={`${i === 0 ? "sm:col-span-2 lg:col-span-1 lg:row-span-2" : ""}`}
              >
                <div
                  className={`group relative h-full overflow-hidden rounded-3xl border border-border/50 bg-card p-6 transition-all duration-500 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 ${
                    i === 0 ? "flex flex-col justify-between lg:p-8" : ""
                  }`}
                >
                  {/* Hover gradient */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="relative">
                    <div className="mb-4 inline-flex rounded-2xl bg-primary/10 p-3 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                      <service.icon className={i === 0 ? "h-7 w-7" : "h-5 w-5"} />
                    </div>
                    <h3 className={`font-bold ${i === 0 ? "text-2xl" : "text-lg"}`}>{service.title}</h3>
                    <p className={`mt-2 text-muted-foreground ${i === 0 ? "text-base" : "text-sm"}`}>
                      {service.desc}
                    </p>
                  </div>

                  <div className={`relative ${i === 0 ? "mt-8" : "mt-4"}`}>
                    <div className="flex items-baseline gap-0.5">
                      <span className="text-xs text-muted-foreground">Rp</span>
                      <span className={`font-bold text-primary ${i === 0 ? "text-4xl" : "text-2xl"}`}>{service.price}</span>
                      <span className="text-sm text-muted-foreground">{service.unit}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PROCESS — Visual Timeline ═══ */}
      <section id="proses" className="relative overflow-hidden bg-accent px-6 py-28 text-accent-foreground">
        {/* Large background text */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
          <span className="select-none text-[20vw] font-black leading-none tracking-tighter text-accent-foreground/[0.03]">
            PROSES
          </span>
        </div>

        <div className="relative mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Cara Kerja</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Semudah{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                4 langkah.
              </span>
            </h2>
          </motion.div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="group relative"
              >
                {/* Connector line */}
                {i < processSteps.length - 1 && (
                  <div className="absolute right-0 top-10 hidden h-px w-6 translate-x-full bg-gradient-to-r from-primary/50 to-transparent lg:block" />
                )}
                <div className="rounded-3xl border border-accent-foreground/10 bg-accent-foreground/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-accent-foreground/10">
                  <span className="text-5xl font-black text-primary/20 transition-colors group-hover:text-primary/40">
                    {s.step}
                  </span>
                  <h3 className="mt-3 text-xl font-bold">{s.title}</h3>
                  <p className="mt-2 text-sm text-accent-foreground/60">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BIG STATEMENT ═══ */}
      <section className="relative overflow-hidden px-6 py-32">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/4 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-primary/5 blur-[100px]" />
          <div className="absolute right-1/4 top-1/2 h-[300px] w-[300px] -translate-y-1/2 rounded-full bg-secondary/8 blur-[100px]" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative mx-auto max-w-4xl text-center"
        >
          <h2 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl">
            Kami tidak hanya mencuci pakaian.
            <br />
            <span className="bg-gradient-to-r from-accent via-accent to-primary bg-clip-text text-transparent">
              Kami merawatnya.
            </span>
          </h2>
          <div className="mx-auto mt-12 flex flex-wrap items-center justify-center gap-6">
            {[
              { icon: Leaf, label: "Eco-Friendly" },
              { icon: Shield, label: "Bergaransi" },
              { icon: Zap, label: "Express Ready" },
              { icon: Clock, label: "24/7 Order" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2 rounded-full border border-border/50 bg-card px-5 py-2.5 text-sm font-medium">
                <item.icon className="h-4 w-4 text-primary" />
                {item.label}
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ═══ PRICING ═══ */}
      <section id="harga" className="px-6 py-28">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Harga</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Transparan. Tanpa biaya tersembunyi.
            </h2>
          </motion.div>

          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {[
              {
                name: "Reguler",
                price: "7K",
                desc: "Untuk kebutuhan sehari-hari",
                features: ["Cuci + Setrika", "Deterjen premium", "Selesai 2-3 hari", "Pewangi pilihan"],
                popular: false,
                accent: false,
              },
              {
                name: "Express",
                price: "12K",
                desc: "Butuh cepat? Ini solusinya",
                features: ["Cuci + Setrika", "Selesai 6 jam", "Deterjen premium", "Pewangi pilihan", "Prioritas antrian"],
                popular: true,
                accent: true,
              },
              {
                name: "Premium",
                price: "25K",
                desc: "Untuk pakaian berharga Anda",
                features: ["Dry clean / wet clean", "Bahan delicate & formal", "Selesai 1-2 hari", "Packaging eksklusif", "Garansi kepuasan"],
                popular: false,
                accent: false,
              },
            ].map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <div
                  className={`relative flex h-full flex-col rounded-3xl border p-8 transition-all duration-300 hover:shadow-2xl ${
                    plan.accent
                      ? "border-primary bg-accent text-accent-foreground shadow-xl shadow-accent/20"
                      : "border-border/50 bg-card hover:border-primary/20 hover:shadow-primary/5"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3.5 left-6">
                      <Badge className="rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground shadow-lg">
                        PALING POPULER
                      </Badge>
                    </div>
                  )}
                  <div>
                    <h3 className="text-lg font-semibold">{plan.name}</h3>
                    <p className={`mt-1 text-sm ${plan.accent ? "text-accent-foreground/60" : "text-muted-foreground"}`}>
                      {plan.desc}
                    </p>
                  </div>
                  <div className="mt-6 flex items-baseline gap-1">
                    <span className={`text-sm ${plan.accent ? "text-accent-foreground/50" : "text-muted-foreground"}`}>Rp</span>
                    <span className="text-5xl font-extrabold tabular-nums">{plan.price}</span>
                    <span className={`text-sm ${plan.accent ? "text-accent-foreground/50" : "text-muted-foreground"}`}>/kg</span>
                  </div>
                  <Separator className={`my-6 ${plan.accent ? "bg-accent-foreground/10" : ""}`} />
                  <ul className="flex-1 space-y-3">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm">
                        <CheckCircle2 className={`h-4 w-4 shrink-0 ${plan.accent ? "text-primary" : "text-primary"}`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`mt-8 w-full rounded-xl text-sm ${plan.accent ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""}`}
                    variant={plan.accent ? "default" : "outline"}
                    size="lg"
                    asChild
                  >
                    <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer">
                      Pilih {plan.name}
                    </a>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section id="testimoni" className="overflow-hidden px-6 py-28">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end"
          >
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Testimoni</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Yang mereka katakan.
              </h2>
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-primary text-primary" />
              ))}
              <span className="ml-2 text-sm font-semibold">4.9/5</span>
              <span className="text-sm text-muted-foreground">(2000+ reviews)</span>
            </div>
          </motion.div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <div className="group h-full rounded-3xl border border-border/50 bg-card p-6 transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5">
                  <div className="flex gap-0.5">
                    {[...Array(t.rating)].map((_, j) => (
                      <Star key={j} className="h-3.5 w-3.5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="mt-5 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 text-sm font-bold text-primary">
                      {t.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA BANNER ═══ */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary via-primary to-primary/80 px-8 py-16 text-center text-primary-foreground sm:px-16 sm:py-20"
          >
            {/* Decorative circles */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-white/10 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-white/10 blur-2xl" />
            <div className="pointer-events-none absolute left-1/2 top-0 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent" />

            <h2 className="relative text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
              Siap untuk pakaian yang
              <br />
              selalu bersih & wangi?
            </h2>
            <p className="relative mx-auto mt-4 max-w-lg text-base text-primary-foreground/80">
              Hubungi kami sekarang dan dapatkan layanan terbaik. Gratis antar
              jemput untuk order pertama Anda.
            </p>
            <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                size="lg"
                className="gap-2 rounded-xl bg-white px-8 text-base font-semibold text-primary shadow-xl hover:bg-white/90"
                asChild
              >
                <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4" />
                  Chat WhatsApp
                </a>
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="gap-2 rounded-xl border border-white/20 text-base text-primary-foreground hover:bg-white/10"
                asChild
              >
                <a href="tel:+6281234567890">
                  <Phone className="h-4 w-4" />
                  Telepon
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ CONTACT ═══ */}
      <section id="kontak" className="px-6 py-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-5">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Kontak</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Mari bicara.
              </h2>
              <p className="mt-3 text-muted-foreground">
                Kunjungi outlet kami atau hubungi langsung untuk informasi lebih lanjut.
              </p>

              <div className="mt-10 space-y-6">
                {[
                  { icon: MapPin, label: "Alamat", value: "Jl. Contoh No. 123, Kota, Indonesia" },
                  { icon: Phone, label: "Telepon", value: "+62 812-3456-7890" },
                  { icon: Mail, label: "Email", value: "hello@shoshalaundry.com" },
                  { icon: Clock, label: "Buka", value: "Setiap Hari, 07:00 - 21:00 WIB" },
                ].map((item) => (
                  <div key={item.label} className="group flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{item.label}</p>
                      <p className="mt-0.5 font-medium">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="lg:col-span-3"
            >
              <div className="rounded-3xl border border-border/50 bg-card p-8">
                <h3 className="text-xl font-bold">Kirim Pesan</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Atau langsung chat via WhatsApp untuk respon lebih cepat
                </p>
                <form className="mt-8 space-y-5" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground" htmlFor="name">
                        Nama
                      </label>
                      <input
                        id="name"
                        type="text"
                        placeholder="Nama lengkap"
                        className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground" htmlFor="phone">
                        WhatsApp
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        placeholder="08xxxxxxxxxx"
                        className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground" htmlFor="message">
                      Pesan
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      placeholder="Ceritakan kebutuhan Anda..."
                      className="mt-2 w-full resize-none rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <Button className="w-full gap-2 rounded-xl" size="lg">
                    <MessageCircle className="h-4 w-4" />
                    Kirim via WhatsApp
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t border-accent-foreground/10 bg-accent px-6 py-16 text-accent-foreground">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80">
                  <Droplets className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="text-lg font-bold">SHO SHA</span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-accent-foreground/50">
                Layanan laundry profesional dengan kualitas premium. Bersih, wangi, dan terpercaya sejak 2019.
              </p>
              <div className="mt-5 flex gap-2">
                <a href="#" className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-foreground/5 text-accent-foreground/60 transition-all hover:bg-primary hover:text-primary-foreground">
                  <Instagram className="h-4 w-4" />
                </a>
                <a href="#" className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-foreground/5 text-accent-foreground/60 transition-all hover:bg-primary hover:text-primary-foreground">
                  <MessageCircle className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider">Layanan</h4>
              <ul className="mt-4 space-y-2.5 text-sm text-accent-foreground/50">
                <li className="transition-colors hover:text-primary"><a href="#layanan">Cuci Setrika</a></li>
                <li className="transition-colors hover:text-primary"><a href="#layanan">Dry Clean</a></li>
                <li className="transition-colors hover:text-primary"><a href="#layanan">Express 6 Jam</a></li>
                <li className="transition-colors hover:text-primary"><a href="#layanan">Premium Care</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider">Navigasi</h4>
              <ul className="mt-4 space-y-2.5 text-sm text-accent-foreground/50">
                <li className="transition-colors hover:text-primary"><a href="#beranda">Beranda</a></li>
                <li className="transition-colors hover:text-primary"><a href="#proses">Cara Kerja</a></li>
                <li className="transition-colors hover:text-primary"><a href="#harga">Harga</a></li>
                <li className="transition-colors hover:text-primary"><a href="#kontak">Kontak</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider">Jam Buka</h4>
              <div className="mt-4 space-y-2.5 text-sm text-accent-foreground/50">
                <p>Senin - Minggu</p>
                <p className="text-lg font-bold text-accent-foreground">07:00 - 21:00</p>
                <p className="text-xs">Termasuk hari libur nasional</p>
              </div>
            </div>
          </div>

          <Separator className="my-10 bg-accent-foreground/10" />

          <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
            <p className="text-xs text-accent-foreground/40">
              &copy; {new Date().getFullYear()} SHO SHA LAUNDRY. All rights reserved.
            </p>
            <p className="text-xs text-accent-foreground/30">
              Crafted with care, just like your laundry.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
