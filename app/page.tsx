"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  useSpring,
  AnimatePresence,
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
  ArrowLeft,
  CheckCircle2,
  Instagram,
  MessageCircle,
  Zap,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Users,
  TrendingUp,
  Calendar,
  DollarSign,
  Target,
  Award,
  Building2,
  Handshake,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

/* ═══════════════════════════════════════════
   DATA ARRAYS — edit these to update content
   ═══════════════════════════════════════════ */

const heroSlides = [
  {
    image: "https://picsum.photos/id/517/1920/1080",
    tagline: "Bersih Sempurna,\nSetiap Helai.",
    subtitle: "Layanan laundry profesional dengan standar premium untuk pakaian Anda.",
  },
  {
    image: "https://picsum.photos/id/525/1920/1080",
    tagline: "Mitra Bisnis\nTerpercaya.",
    subtitle: "Bergabung dengan jaringan franchise laundry terbesar di Indonesia.",
  },
  {
    image: "https://picsum.photos/id/534/1920/1080",
    tagline: "Teknologi Modern,\nHasil Maksimal.",
    subtitle: "Mesin cuci industri terkini dengan deterjen ramah lingkungan.",
  },
];

const companyTimeline = [
  { year: "2019", title: "Didirikan", desc: "SHO SHA LAUNDRY berdiri dengan 1 outlet pertama di Jakarta." },
  { year: "2020", title: "Ekspansi Digital", desc: "Meluncurkan sistem order online dan layanan antar-jemput." },
  { year: "2021", title: "10 Outlet", desc: "Membuka cabang ke-10 dan memulai program kemitraan." },
  { year: "2022", title: "Program Franchise", desc: "Resmi meluncurkan 3 paket franchise untuk mitra baru." },
  { year: "2023", title: "50+ Mitra", desc: "Jaringan mitra tersebar di Jabodetabek dan kota-kota besar." },
  { year: "2024", title: "Award Winner", desc: "Meraih penghargaan Best Laundry Franchise Indonesia." },
];

const mitraPackages = [
  {
    name: "Silver",
    modal: 15_000_000,
    pelanggan: 30,
    harga: 7_000,
    features: [
      "1 mesin cuci 8kg",
      "1 mesin pengering",
      "Perlengkapan dasar",
      "Training 3 hari",
      "Branding outlet",
    ],
  },
  {
    name: "Gold",
    modal: 30_000_000,
    pelanggan: 60,
    harga: 7_000,
    features: [
      "2 mesin cuci 12kg",
      "2 mesin pengering",
      "Perlengkapan lengkap",
      "Training 7 hari",
      "Branding outlet premium",
      "Sistem POS digital",
      "Support marketing 3 bulan",
    ],
  },
  {
    name: "Platinum",
    modal: 60_000_000,
    pelanggan: 120,
    harga: 7_000,
    features: [
      "4 mesin cuci 15kg",
      "3 mesin pengering",
      "Full perlengkapan + AC",
      "Training 14 hari",
      "Full branding + interior",
      "Sistem POS + CRM",
      "Support marketing 6 bulan",
      "Konsultasi bisnis 1 tahun",
    ],
  },
];

const galleryImages = [
  { src: "https://picsum.photos/id/395/600/400", alt: "Outlet modern SHO SHA", span: "tall" as const },
  { src: "https://picsum.photos/id/401/600/400", alt: "Mesin cuci industri", span: "normal" as const },
  { src: "https://picsum.photos/id/403/600/400", alt: "Tim profesional", span: "wide" as const },
  { src: "https://picsum.photos/id/399/600/400", alt: "Hasil cucian rapi", span: "normal" as const },
  { src: "https://picsum.photos/id/411/600/400", alt: "Proses quality control", span: "tall" as const },
  { src: "https://picsum.photos/id/416/600/400", alt: "Area packing premium", span: "normal" as const },
  { src: "https://picsum.photos/id/431/600/400", alt: "Interior outlet bersih", span: "wide" as const },
  { src: "https://picsum.photos/id/435/600/400", alt: "Layanan antar jemput", span: "normal" as const },
];

const marqueeWords = [
  "BERSIH", "WANGI", "CEPAT", "PROFESIONAL", "TERPERCAYA", "PREMIUM",
  "HIGIENIS", "RAPI", "BERKUALITAS", "MODERN",
];

const navLinks = [
  { label: "Tentang Kami", href: "#tentang" },
  { label: "Layanan", href: "#layanan" },
  { label: "Gallery", href: "#gallery" },
  { label: "Perhitungan ROI", href: "#roi" },
];

/* ═══════════════════════════════════════════
   HELPER FUNCTIONS
   ═══════════════════════════════════════════ */

function formatRupiah(amount: number): string {
  if (amount >= 1_000_000_000) return `${(amount / 1_000_000_000).toFixed(1)} Miliar`;
  if (amount >= 1_000_000) return `${(amount / 1_000_000).toFixed(1)} Juta`;
  if (amount >= 1_000) return `${(amount / 1_000).toFixed(0)} Ribu`;
  return amount.toString();
}

function calculateROI(pkg: typeof mitraPackages[number]) {
  const pendapatanBulanan = pkg.pelanggan * pkg.harga * 26;
  const biayaOperasional = pendapatanBulanan * 0.4;
  const keuntunganBersih = pendapatanBulanan - biayaOperasional;
  const bepBulan = Math.ceil(pkg.modal / keuntunganBersih);
  const roiPersen = Math.round((keuntunganBersih * 12 / pkg.modal) * 100);
  return { pendapatanBulanan, keuntunganBersih, bepBulan, roiPersen };
}

/* ═══════════════════════════════════════════
   COMPONENTS
   ═══════════════════════════════════════════ */

function AnimatedNumber({
  value,
  suffix = "",
  prefix = "",
}: {
  value: number;
  suffix?: string;
  prefix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { damping: 40, stiffness: 120 });
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) motionVal.set(value);
  }, [isInView, motionVal, value]);

  useEffect(() => {
    const unsub = spring.on("change", (v) => {
      if (ref.current) ref.current.textContent = prefix + Math.round(v).toLocaleString("id-ID") + suffix;
    });
    return unsub;
  }, [spring, suffix, prefix]);

  return <span ref={ref}>{prefix}0{suffix}</span>;
}

function Marquee({ children, reverse = false }: { children: React.ReactNode; reverse?: boolean }) {
  return (
    <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div className={`flex shrink-0 gap-6 py-4 ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}>
        {children}
        {children}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════ */

export default function Home() {
  /* ── Hero carousel state ── */
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slideCount = heroSlides.length;

  const nextSlide = useCallback(() => setCurrentSlide((p) => (p + 1) % slideCount), [slideCount]);
  const prevSlide = useCallback(() => setCurrentSlide((p) => (p - 1 + slideCount) % slideCount), [slideCount]);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  /* ── Navbar scroll state ── */
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  /* ── Hero parallax ── */
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  /* ── About show more ── */
  const [showMoreAbout, setShowMoreAbout] = useState(false);

  /* ── Gallery lightbox ── */
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  /* ── ROI calculator ── */
  const [selectedPackage, setSelectedPackage] = useState("Silver");
  const currentPkg = mitraPackages.find((p) => p.name === selectedPackage) ?? mitraPackages[0];
  const roi = calculateROI(currentPkg);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* ═══ NAVBAR — floating glassmorphism ═══ */}
      <nav className="fixed top-0 z-50 w-full">
        <div className="mx-auto max-w-7xl px-6">
          <div
            className={`mt-4 flex h-14 items-center justify-between rounded-2xl border border-border/50 px-6 shadow-lg shadow-black/5 backdrop-blur-xl transition-all duration-300 ${
              scrolled ? "bg-background/90" : "bg-background/70"
            }`}
          >
            <a href="#" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80">
                <Droplets className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-base font-bold tracking-tight">SHO SHA</span>
            </a>

            {/* Desktop nav */}
            <div className="hidden items-center gap-7 md:flex">
              {navLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <Button size="sm" className="hidden rounded-xl text-xs sm:inline-flex" asChild>
                <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-1.5 h-3.5 w-3.5" />
                  WhatsApp
                </a>
              </Button>

              {/* Mobile hamburger */}
              <button
                className="flex h-9 w-9 items-center justify-center rounded-xl md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile menu slide-down */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden md:hidden"
              >
                <div className="mt-2 flex flex-col gap-1 rounded-2xl border border-border/50 bg-background/95 p-4 backdrop-blur-xl">
                  {navLinks.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      {item.label}
                    </a>
                  ))}
                  <Button size="sm" className="mt-2 rounded-xl text-xs" asChild>
                    <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="mr-1.5 h-3.5 w-3.5" />
                      WhatsApp
                    </a>
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* ═══ HERO — Interactive Carousel ═══ */}
      <section
        ref={heroRef}
        id="beranda"
        className="relative min-h-[100dvh] overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Background slides */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <motion.div style={{ y: heroY }} className="absolute inset-0">
              <img
                src={heroSlides[currentSlide].image}
                alt={heroSlides[currentSlide].tagline}
                className="h-full w-full object-cover"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />

        {/* Content */}
        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 flex min-h-[100dvh] items-center px-6">
          <div className="mx-auto max-w-5xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="whitespace-pre-line text-5xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
                  {heroSlides[currentSlide].tagline}
                </h1>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70 sm:text-xl">
                  {heroSlides[currentSlide].subtitle}
                </p>
              </motion.div>
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-10 flex flex-col items-start gap-4 sm:flex-row"
            >
              <Button size="lg" className="group gap-2 rounded-xl px-8 text-base" asChild>
                <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer">
                  Hubungi Kami
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="gap-2 rounded-xl border border-white/20 text-base text-white hover:bg-white/10"
                asChild
              >
                <a href="#tentang">
                  Pelajari Lebih Lanjut
                  <ChevronDown className="h-4 w-4" />
                </a>
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Navigation arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20 sm:left-8"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20 sm:right-8"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Dots navigation */}
        <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-500 ${
                i === currentSlide ? "w-8 bg-white" : "w-2 bg-white/40"
              }`}
            />
          ))}
        </div>
      </section>

      {/* ═══ MARQUEE STRIP ═══ */}
      <div className="bg-accent py-5">
        <Marquee>
          {marqueeWords.map((word) => (
            <span key={word} className="flex items-center gap-6 text-sm font-bold tracking-[0.2em] text-accent-foreground/70">
              {word}
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
          ))}
        </Marquee>
      </div>

      {/* ═══ TENTANG KAMI ═══ */}
      <section id="tentang" className="px-6 py-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-16 lg:grid-cols-2">
            {/* Left — visual stats */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-3xl bg-gradient-to-br from-primary to-primary/80 p-6 text-primary-foreground">
                  <Shield className="mb-3 h-8 w-8" />
                  <p className="text-4xl font-extrabold">
                    <AnimatedNumber value={5} suffix="+" />
                  </p>
                  <p className="mt-1 text-sm text-primary-foreground/70">Tahun Pengalaman</p>
                </div>
                <div className="rounded-3xl border border-border/50 bg-card p-6">
                  <Users className="mb-3 h-8 w-8 text-primary" />
                  <p className="text-4xl font-extrabold">
                    <AnimatedNumber value={2000} suffix="+" />
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">Pelanggan Puas</p>
                </div>
                <div className="rounded-3xl border border-border/50 bg-card p-6">
                  <Building2 className="mb-3 h-8 w-8 text-primary" />
                  <p className="text-4xl font-extrabold">
                    <AnimatedNumber value={50} suffix="+" />
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">Outlet Mitra</p>
                </div>
                <div className="rounded-3xl bg-accent p-6 text-accent-foreground">
                  <Zap className="mb-3 h-8 w-8" />
                  <p className="text-4xl font-extrabold">
                    <AnimatedNumber value={98} suffix="%" />
                  </p>
                  <p className="mt-1 text-sm text-accent-foreground/70">Repeat Order</p>
                </div>
              </div>
            </motion.div>

            {/* Right — company story */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Tentang Kami</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Lebih dari sekadar{" "}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  laundry.
                </span>
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                SHO SHA LAUNDRY didirikan pada tahun 2019 dengan misi sederhana: memberikan
                layanan laundry terbaik dengan harga terjangkau. Kami percaya bahwa pakaian
                bersih dan wangi adalah hak semua orang.
              </p>

              <AnimatePresence>
                {showMoreAbout && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4 }}
                    className="overflow-hidden"
                  >
                    <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                      Dengan tim profesional dan mesin berteknologi tinggi, kami melayani ribuan
                      pelanggan setiap bulannya. Kini, SHO SHA telah berkembang menjadi jaringan
                      franchise dengan 50+ mitra di seluruh Indonesia. Kami terus berinovasi
                      untuk memberikan pengalaman laundry terbaik — dari proses pencucian hingga
                      pengantaran ke pintu rumah Anda.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                onClick={() => setShowMoreAbout(!showMoreAbout)}
                className="mt-4 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
              >
                {showMoreAbout ? "Tampilkan Lebih Sedikit" : "Baca Selengkapnya"}
              </button>
            </motion.div>
          </div>

          {/* Timeline */}
          <div className="mt-24">
            <h3 className="mb-12 text-center text-2xl font-bold">Perjalanan Kami</h3>
            <div className="relative">
              {/* Center line */}
              <div className="absolute left-4 top-0 h-full w-px bg-border md:left-1/2 md:-translate-x-px" />

              {companyTimeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className={`relative mb-10 flex items-start gap-8 pl-12 md:pl-0 ${
                    i % 2 === 0 ? "md:flex-row md:text-right" : "md:flex-row-reverse md:text-left"
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-2.5 top-1 h-3 w-3 rounded-full border-2 border-primary bg-background md:left-1/2 md:-translate-x-1.5" />

                  <div className={`flex-1 ${i % 2 === 0 ? "md:pr-16" : "md:pl-16"}`}>
                    <span className="text-sm font-bold text-primary">{item.year}</span>
                    <h4 className="mt-1 text-lg font-bold">{item.title}</h4>
                    <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                  <div className="hidden flex-1 md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ LAYANAN — Paket Mitra ═══ */}
      <section id="layanan" className="relative overflow-hidden bg-accent px-6 py-28 text-accent-foreground">
        {/* Ghost background text */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
          <span className="select-none text-[20vw] font-black leading-none tracking-tighter text-accent-foreground/[0.03]">
            MITRA
          </span>
        </div>

        <div className="relative mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Kemitraan</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Pilih Paket Mitra Anda
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-accent-foreground/60">
              Mulai bisnis laundry Anda bersama SHO SHA. Tiga paket investasi dengan dukungan penuh dari kami.
            </p>
          </motion.div>

          <div className="mt-16 grid items-end gap-6 lg:grid-cols-3">
            {mitraPackages.map((pkg, i) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className={i === 1 ? "lg:-mt-8" : ""}
              >
                <div
                  className={`relative flex flex-col rounded-3xl border p-8 transition-all duration-300 hover:shadow-2xl ${
                    i === 1
                      ? "border-primary bg-primary text-primary-foreground shadow-xl shadow-primary/20"
                      : "border-accent-foreground/10 bg-accent-foreground/5 backdrop-blur-sm hover:border-primary/30"
                  }`}
                >
                  {i === 1 && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-4 py-1 text-xs font-semibold text-secondary-foreground shadow-lg">
                        <Star className="h-3 w-3" />
                        PALING POPULER
                      </span>
                    </div>
                  )}

                  <div>
                    <h3 className="text-lg font-semibold">{pkg.name}</h3>
                    <div className="mt-3 flex items-baseline gap-1">
                      <span className={`text-sm ${i === 1 ? "text-primary-foreground/60" : "text-accent-foreground/50"}`}>Rp</span>
                      <span className="text-4xl font-extrabold tabular-nums">{(pkg.modal / 1_000_000).toFixed(0)}</span>
                      <span className={`text-sm ${i === 1 ? "text-primary-foreground/60" : "text-accent-foreground/50"}`}>Juta</span>
                    </div>
                    <p className={`mt-2 text-sm ${i === 1 ? "text-primary-foreground/70" : "text-accent-foreground/50"}`}>
                      Est. {pkg.pelanggan} pelanggan/hari
                    </p>
                  </div>

                  <div className={`my-6 h-px ${i === 1 ? "bg-primary-foreground/20" : "bg-accent-foreground/10"}`} />

                  <ul className="flex-1 space-y-3">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm">
                        <CheckCircle2 className={`h-4 w-4 shrink-0 ${i === 1 ? "text-secondary" : "text-primary"}`} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`mt-8 w-full rounded-xl text-sm ${
                      i === 1
                        ? "bg-white text-primary hover:bg-white/90"
                        : "border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground"
                    }`}
                    variant={i === 1 ? "default" : "outline"}
                    size="lg"
                    asChild
                  >
                    <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer">
                      <Handshake className="mr-2 h-4 w-4" />
                      Jadi Mitra {pkg.name}
                    </a>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ GALLERY — Collage Masonry ═══ */}
      <section id="gallery" className="px-6 py-28">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Gallery</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Lihat lebih dekat.
            </h2>
          </motion.div>

          <div className="mt-14 grid auto-rows-[200px] grid-cols-2 gap-4 md:grid-cols-4">
            {galleryImages.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                className={`group relative cursor-pointer overflow-hidden rounded-2xl ${
                  img.span === "tall" ? "row-span-2" : img.span === "wide" ? "col-span-2" : ""
                }`}
                onClick={() => {
                  setLightboxIndex(i);
                  setLightboxOpen(true);
                }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <p className="text-sm font-medium text-white">{img.alt}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Lightbox */}
        <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
          <DialogContent className="max-w-4xl border-none bg-black/95 p-0">
            <div className="relative">
              <img
                src={galleryImages[lightboxIndex]?.src}
                alt={galleryImages[lightboxIndex]?.alt}
                className="max-h-[80vh] w-full object-contain"
              />
              <p className="absolute bottom-4 left-4 text-sm font-medium text-white/80">
                {galleryImages[lightboxIndex]?.alt}
              </p>
              <button
                onClick={() => setLightboxIndex((p) => (p - 1 + galleryImages.length) % galleryImages.length)}
                className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => setLightboxIndex((p) => (p + 1) % galleryImages.length)}
                className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </section>

      {/* ═══ PERHITUNGAN ROI ═══ */}
      <section id="roi" className="px-6 py-28">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Simulasi Investasi</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Perhitungan ROI
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Lihat estimasi keuntungan bisnis laundry Anda. Pilih paket dan lihat proyeksi balik modal.
            </p>
          </motion.div>

          <div className="mt-12">
            <Tabs value={selectedPackage} onValueChange={setSelectedPackage} className="w-full">
              <TabsList className="mx-auto grid w-full max-w-md grid-cols-3">
                {mitraPackages.map((pkg) => (
                  <TabsTrigger key={pkg.name} value={pkg.name}>
                    {pkg.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {mitraPackages.map((pkg) => {
                const r = calculateROI(pkg);
                return (
                  <TabsContent key={pkg.name} value={pkg.name}>
                    <motion.div
                      key={pkg.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      {/* Info bar */}
                      <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
                        <span>Modal: <strong className="text-foreground">Rp {formatRupiah(pkg.modal)}</strong></span>
                        <span>Pelanggan/hari: <strong className="text-foreground">{pkg.pelanggan}</strong></span>
                        <span>Harga rata-rata: <strong className="text-foreground">Rp {pkg.harga.toLocaleString("id-ID")}</strong></span>
                      </div>

                      {/* Result cards */}
                      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                          { icon: DollarSign, label: "Pendapatan / Bulan", value: r.pendapatanBulanan, format: true },
                          { icon: TrendingUp, label: "Keuntungan Bersih", value: r.keuntunganBersih, format: true },
                          { icon: Calendar, label: "Balik Modal (BEP)", value: r.bepBulan, suffix: " Bulan" },
                          { icon: Target, label: "ROI Tahunan", value: r.roiPersen, suffix: "%" },
                        ].map((card) => (
                          <div
                            key={card.label}
                            className="rounded-2xl border border-border/50 bg-card p-6 text-center transition-all hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5"
                          >
                            <card.icon className="mx-auto mb-3 h-6 w-6 text-primary" />
                            <p className="text-3xl font-extrabold tabular-nums">
                              <AnimatedNumber
                                value={card.value}
                                suffix={card.suffix ?? ""}
                                prefix={card.format ? "Rp " : ""}
                              />
                            </p>
                            <p className="mt-2 text-xs text-muted-foreground">{card.label}</p>
                          </div>
                        ))}
                      </div>

                      {/* Progress bar — BEP projection */}
                      <div className="mt-10">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Proyeksi Balik Modal</span>
                          <span className="font-semibold text-primary">{r.bepBulan} bulan</span>
                        </div>
                        <div className="mt-3 h-4 overflow-hidden rounded-full bg-muted">
                          <motion.div
                            key={pkg.name + "-bar"}
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min(100, (12 / r.bepBulan) * 100)}%` }}
                            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                            className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                          />
                        </div>
                        <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                          <span>Bulan ke-0</span>
                          <span>Bulan ke-12</span>
                        </div>
                      </div>
                    </motion.div>
                  </TabsContent>
                );
              })}
            </Tabs>
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
              <h4 className="text-sm font-semibold uppercase tracking-wider">Navigasi</h4>
              <ul className="mt-4 space-y-2.5 text-sm text-accent-foreground/50">
                <li className="transition-colors hover:text-primary"><a href="#tentang">Tentang Kami</a></li>
                <li className="transition-colors hover:text-primary"><a href="#layanan">Layanan Mitra</a></li>
                <li className="transition-colors hover:text-primary"><a href="#gallery">Gallery</a></li>
                <li className="transition-colors hover:text-primary"><a href="#roi">Perhitungan ROI</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider">Kontak</h4>
              <ul className="mt-4 space-y-2.5 text-sm text-accent-foreground/50">
                <li className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5" />Jl. Contoh No. 123, Jakarta</li>
                <li className="flex items-center gap-2"><Phone className="h-3.5 w-3.5" />+62 812-3456-7890</li>
                <li className="flex items-center gap-2"><Mail className="h-3.5 w-3.5" />hello@shoshalaundry.com</li>
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

          <div className="my-10 h-px bg-accent-foreground/10" />

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
