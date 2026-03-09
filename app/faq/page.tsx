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
  Eye,
  Shield,
  Sparkles,
  MapPin,
  Phone,
  Quote,
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
  CreditCard,
  Download,
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
  Wrench,
  Headphones,
  BarChart3,
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
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

/* ═══════════════════════════════════════════
   DATA ARRAYS — edit these to update content
   ═══════════════════════════════════════════ */

const heroSlides = [
  {
    image: "https://picsum.photos/id/517/1920/1080",
    heroImage: "/hero1.svg",
    tagline: "Bersih Sempurna,\nSetiap Helai.",
    subtitle: "Layanan laundry profesional dengan standar premium untuk pakaian Anda."
  },
  {
    image: "https://picsum.photos/id/525/1920/1080",
    heroImage: "/hero2.svg",
    tagline: "Mitra Bisnis\nTerpercaya.",
    subtitle: "Bergabunglah dengan jaringan franchise laundry yang terus berkembang di Indonesia. Didukung sistem, tim profesional, dan peluang keuntungan berkelanjutan."
  },
  {
    image: "https://picsum.photos/id/534/1920/1080",
    heroImage: "/hero3.svg",
    tagline: "Teknologi Modern,\nHasil Maksimal.",
    subtitle: "Bangun bisnis laundry autopilot dengan sistem modern."
  },
];

const services = [
  {
    icon: Sparkles,
    title: "Self-Service Laundry",
    features: [
      "Mesin cuci LG 20kg premium",
      "Operasional 24 jam nonstop",
      "Sistem pembayaran QRIS TORU",
      "Mulai Rp 8.000/kg",
    ],
  },
  {
    icon: Droplets,
    title: "Drop-Off Laundry",
    features: [
      "Cuci, kering, lipat rapi",
      "Pewangi premium gratis",
      "Antar-jemput tersedia",
      "Rp 7.000/kg (min 3kg)",
    ],
  },
  {
    icon: CreditCard,
    title: "Membership TORU",
    features: [
      "Top-up saldo digital",
      "Diskon 10–20%",
      "Akumulasi poin reward",
      "Gratis pendaftaran",
    ],
  },
];

const investmentCards = [
  {
    icon: TrendingUp,
    title: "ROI hingga 65%",
    desc: "Return on Investment hingga 65% per tahun dari modal investasi Anda.",
  },
  {
    icon: Calendar,
    title: "Payback 19 Bulan",
    desc: "Payback period cepat hanya dalam 19 bulan untuk balik modal penuh.",
  },
  {
    icon: Wrench,
    title: "Support Teknis Mandiri",
    desc: "Tim teknisi berpengalaman siap menangani seluruh kebutuhan teknis.",
  },
  {
    icon: Users,
    title: "Manajemen Profesional",
    desc: "Pengelolaan operasional oleh tim manajemen yang terlatih dan berdedikasi.",
  },
  {
    icon: Headphones,
    title: "Tim Teknisi 24 Jam",
    desc: "Layanan darurat dan pemeliharaan rutin tersedia 24 jam nonstop.",
  },
  {
    icon: BarChart3,
    title: "Dashboard Real-Time",
    desc: "Pantau performa bisnis kapan saja dari mana saja melalui dashboard digital.",
  },
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

const testimonials = [
  {
    name: "Dewi Kartika",
    role: "Pelanggan Setia",
    text: "Saya sudah mencuci di SHO-SHA hampir 3 tahun dan selalu puas dengan hasilnya.",
    img: "/user.png"
  },
  {
    name: "Rina Sari",
    role: "Pelanggan",
    text: "Laundry di SHO-SHA benar-benar beda. Pakaian selalu bersih, wangi, dan cepat selesai.",
    img: "/user.png"
  },
  {
    name: "Budi Rizwan",
    role: "Mitra Franchise",
    text: "Bergabung dengan SHO-SHA adalah keputusan terbaik saya. Dalam 2 tahun modal sudah kembali.",
    img: "/user.png"
  }
]

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

const navLinks = [
  { label: "Tentang Kami", href: "/about" },
  { label: "Kemitraan", href: "/partnership" },
  { label: "FAQ", href: "/faq" },
  { label: "Cabang", href: "/units" },
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

/* ═══════════════════════════════════════════
   SECTION WRAPPER WITH FADE-IN
   ═══════════════════════════════════════════ */

function FadeIn({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
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
                <img src={"/logo.svg"} alt={"Logo"} className="h-10 w-10" />
              </div>
              <span className="text-base font-bold tracking-tight">SHO-SHA</span>
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
          <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left column - Text content */}
            <div>
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

            {/* Right column - Hero image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="hidden lg:block relative"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.6 }}
                  className="relative"
                >
                  <img
                    src={heroSlides[currentSlide].heroImage}
                    alt="SHO SHA Laundry Hero"
                    className="w-full h-auto max-h-[100vh] object-contain"
                  />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>

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

      {/* ═══ TENTANG KAMI ═══ */}
      <section id="tentang" className="px-6 py-28 bg-primary-foreground">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-16 lg:grid-cols-2">

            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                Tentang Kami
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Lebih dari sekadar{" "}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  laundry.
                </span>
              </h2>

              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                SHO-SHA LAUNDRY didirikan pada tahun 2011 dengan misi sederhana:
                memberikan layanan laundry terbaik dengan harga terjangkau.
                Kami percaya bahwa pakaian bersih dan wangi adalah hak semua orang.
              </p>

              {/* Baca Selengkapnya */}
              <div className="mt-6">
                <a
                  href="/about"
                  className="text-sm font-semibold text-primary transition hover:text-primary/80"
                >
                  Baca Selengkapnya →
                </a>
              </div>

              {/* Stats */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-3xl bg-gradient-to-br from-primary to-primary/80 p-6 text-primary-foreground">
                  <Shield className="mb-3 h-8 w-8" />
                  <p className="text-4xl font-extrabold">
                    <AnimatedNumber value={5} suffix="+" />
                  </p>
                  <p className="mt-1 text-sm text-primary-foreground/70">
                    Tahun Pengalaman
                  </p>
                </div>

                <div className="rounded-3xl border border-border/50 bg-card p-6">
                  <Users className="mb-3 h-8 w-8 text-primary" />
                  <p className="text-4xl font-extrabold">
                    <AnimatedNumber value={2000} suffix="+" />
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Pelanggan Puas
                  </p>
                </div>

                <div className="rounded-3xl border border-border/50 bg-card p-6">
                  <Building2 className="mb-3 h-8 w-8 text-primary" />
                  <p className="text-4xl font-extrabold">
                    <AnimatedNumber value={50} suffix="+" />
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Outlet Mitra
                  </p>
                </div>

                <div className="rounded-3xl bg-accent p-6 text-accent-foreground">
                  <Zap className="mb-3 h-8 w-8" />
                  <p className="text-4xl font-extrabold">
                    <AnimatedNumber value={98} suffix="%" />
                  </p>
                  <p className="mt-1 text-sm text-accent-foreground/70">
                    Repeat Order
                  </p>
                </div>
              </div>
            </motion.div>

            
            {/* Right Column: Hero Image — hidden on mobile, shown from lg */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative hidden lg:block"
            >
              <div className="relative z-10 flex justify-center">
                <img
                  src="/picture2.svg"
                  alt="SHO SHA Hero Image"
                  className="h-full w-full object-contain drop-shadow-2xl"
                  loading="eager"
                  fetchPriority="high"
                />
              </div>

              {/* Floating badges — only on desktop where image is visible */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-6 top-12 rounded-2xl border border-border/50 bg-card/80 p-4 shadow-xl backdrop-blur-md will-change-transform"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Potensi Profit</p>
                    <p className="text-base font-bold text-foreground">Aktif 24/7</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute bottom-6 -right-12 rounded-2xl border border-border/50 bg-card/80 p-5 shadow-xl backdrop-blur-md will-change-transform"
              >
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-primary">100%</span>
                  <span className="text-sm font-medium text-muted-foreground">Autopilot</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
      
        {/* ═══ LAYANAN ═══ */}
        <section id="layanan" className="px-6 py-28 bg-gradient-to-b from-primary-foreground to-orange-50">
            <div className="mx-auto max-w-6xl">
                <FadeIn className="text-center">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                    Layanan
                  </p>
                  <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                    Solusi Laundry{" "}
                    <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      Lengkap
                    </span>
                  </h2>
                </FadeIn>
      
                <div className="mt-14 grid gap-6 lg:grid-cols-3">
                  {services.map((service, i) => (
                    <FadeIn key={service.title} delay={i * 0.1}>
                      <div className="group flex h-full flex-col rounded-3xl border border-border/50 bg-card p-8 transition-all duration-300 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5">
                        <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                          <service.icon className="h-7 w-7" />
                        </div>
                        <h3 className="text-xl font-bold">{service.title}</h3>
                        <ul className="mt-5 flex-1 space-y-3">
                          {service.features.map((f) => (
                            <li
                              key={f}
                              className="flex items-center gap-2.5 text-sm text-muted-foreground"
                            >
                              <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                              {f}
                            </li>
                          ))}
                        </ul>
                        <Button
                          className="mt-8 w-full rounded-xl"
                          variant="outline"
                          size="lg"
                          asChild
                        >
                          <a
                            href="https://wa.me/6281234567890"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Selengkapnya
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </div>
            </section>

      {/* ═══ KEUNGGULAN INVESTASI ═══ */}
      <section id="keunggulan" className="px-6 py-28 bg-orange-50">
        <div className="mx-auto max-w-6xl">
          <FadeIn className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Keunggulan
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Mengapa Memilih Kemitraan <br />
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                SHO-SHA Laundry?
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Investasi laundry autopilot dengan keuntungan maksimal dan risiko
              minimal. Dikelola profesional, dipantau transparan.
            </p>
          </FadeIn>

          {/* Stats bar */}
          <FadeIn delay={0.15}>
            <div className="mx-auto mt-12 flex max-w-3xl flex-wrap items-center justify-center gap-8 rounded-2xl border border-border/50 bg-card p-6 sm:gap-12">
              {[
                { value: 65, suffix: "%", label: "ROI / Tahun" },
                { value: 19, suffix: " Bln", label: "Payback Period" },
                { value: 12, suffix: "+", label: "Outlet Aktif" },
                { value: 15, suffix: "+", label: "Tahun Pengalaman" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-3xl font-extrabold tabular-nums text-primary sm:text-4xl">
                    <AnimatedNumber value={s.value} suffix={s.suffix} />
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Cards */}
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {investmentCards.map((card, i) => (
              <FadeIn key={card.title} delay={i * 0.08}>
                <div className="group h-full rounded-3xl border border-border/50 bg-card p-6 transition-all duration-300 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5">
                  <div className="mb-4 inline-flex rounded-2xl bg-primary/10 p-3 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                    <card.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold">{card.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {card.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
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

      <section className="py-24 bg-primary relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-40 h-40 border-4 border-white rounded-full rotate-45" />
        <div className="absolute bottom-20 right-20 w-60 h-60 border-4 border-white rounded-full -rotate-12" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-white/80 font-bold uppercase tracking-widest text-sm mb-4">Testimonial</h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">Apa Kata <span className="text-accent">Client</span></h3>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <Card key={i} className="bg-white/10 backdrop-blur-xl border-white/20 text-white hover:bg-white/20 transition-all duration-300">
              <CardContent className="pt-8 pb-8 flex flex-col h-full">
                <div className="flex items-center gap-1 mb-6 text-yellow-400">
                   {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <Quote className="w-12 h-12 text-accent opacity-30 mb-4" />
                <p className="text-lg leading-relaxed mb-8 flex-grow italic">"{t.text}"</p>
                <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-accent">
                    <Image src={t.img || ""} alt={t.name} fill className="object-cover" />
                  </div>
                  <div>
                    <p className="font-bold text-lg">{t.name}</p>
                    <p className="text-sm text-white/60">{t.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>

      {/* ═══ GALLERY — Collage Masonry ═══ */}
      <section id="gallery" className="px-6 py-28 bg-gradient-to-b from-orange-50 to-primary-foreground">
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

      
      {/* ═══ CTA SECTION ═══ */}
      <section className="px-6 py-16 bg-primary-foreground">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary via-primary to-primary/80 shadow-xl px-8 py-16 text-center text-primary-foreground sm:px-16 sm:py-20">
              {/* Decorative */}
              <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-white/10 blur-2xl" />
              <div className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-white/10 blur-2xl" />
              <div className="pointer-events-none absolute left-1/2 top-0 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent" />

              <h2 className="relative text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
                Siap Memulai Investasi
                <br />
                Laundry Autopilot?
              </h2>
              <p className="relative mx-auto mt-4 max-w-lg text-base text-primary-foreground/80">
                Konsultasikan rencana investasi Anda dengan tim profesional
                kami. Dapatkan proposal lengkap dan jadwalkan kunjungan outlet.
              </p>
              <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button
                  size="lg"
                  className="gap-2 rounded-xl bg-white px-8 text-base font-semibold text-primary shadow-xl hover:bg-white/90"
                  asChild
                >
                  <a
                    href="https://wa.me/6281234567890"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Hubungi Kami
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="ghost"
                  className="gap-2 rounded-xl border border-white/20 text-base text-primary-foreground hover:bg-white/10"
                  asChild
                >
                  <a
                    href="https://wa.me/6281234567890"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Calendar className="h-4 w-4" />
                    Jadwalkan Konsultasi
                  </a>
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    
      {/* ═══ FOOTER ═══ */}
      <footer className="border-t border-accent-foreground/10 bg-accent px-6 py-20 text-accent-foreground">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-16 lg:grid-cols-4">
            <div className="lg:col-span-1">
              <img src="/logo.svg" alt="SHO SHA Logo" className="h-9 w-auto brightness-0 invert opacity-60" />
              <p className="mt-6 text-sm leading-relaxed text-accent-foreground/50">
                Memberikan kenyamanan laundry terbaik dan peluang investasi autopilot paling menguntungkan di Indonesia.
              </p>
              <div className="mt-8 flex gap-3">
                {[Instagram, MessageCircle].map((Icon, i) => (
                  <a key={i} href="#" className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent-foreground/5 text-accent-foreground/40 transition-all hover:bg-primary hover:text-primary-foreground hover:scale-110">
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 lg:col-span-2">
              <div>
                <h4 className="text-sm font-bold uppercase tracking-widest text-primary">Navigasi</h4>
                <ul className="mt-6 space-y-4 text-sm text-accent-foreground/50">
                  {navLinks.map((link) => (
                    <li key={link.label} className="transition-colors hover:text-primary">
                      <a href={link.href}>{link.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-bold uppercase tracking-widest text-primary">Layanan</h4>
                <ul className="mt-6 space-y-4 text-sm text-accent-foreground/50">
                  <li className="transition-colors hover:text-primary">Self-Service</li>
                  <li className="transition-colors hover:text-primary">Drop-Off Laundry</li>
                  <li className="transition-colors hover:text-primary">Membership TORU</li>
                  <li className="transition-colors hover:text-primary">Premium Care</li>
                </ul>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest text-primary">Kantor Pusat</h4>
              <p className="mt-6 text-sm text-accent-foreground/50 leading-relaxed">
                BSD Business Center, Tower B Lt. 12<br />
                Tangerang, Indonesia 15310
              </p>
              <p className="mt-4 text-lg font-bold">07:00 - 21:00</p>
              <p className="mt-1 text-xs text-accent-foreground/30">Setiap hari buka</p>
            </div>
          </div>

          <Separator className="my-16 bg-accent-foreground/10" />

          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <p className="text-[10px] font-medium uppercase tracking-widest text-accent-foreground/30">
              &copy; {new Date().getFullYear()} SHO SHA LAUNDRY. All RIGHTS RESERVED.
            </p>
            <div className="flex gap-8 text-[10px] font-medium uppercase tracking-widest text-accent-foreground/30">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
