"use client";

import { useRef, useEffect, useState, useMemo, useCallback } from "react";
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
  Sparkles,
  ArrowRight,
  Building2,
  CheckCircle2,
  Clock,
  Download,
  FileText,
  Headphones,
  Handshake,
  Instagram,
  LineChart,
  Mail,
  MapPin,
  MessageCircle,
  Menu,
  Phone,
  Quote,
  Send,
  Star,
  TrendingUp,
  Users,
  Wrench,
  X,
  Zap,
  Eye,
  BarChart3,
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Facebook,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import DropdownMenuCabang from "@/components/ui/dropdown-menu-cabang";
import Link from "next/link";
import Footer from "@/components/layouts/footer";

const faqItems = [
  {
    q: "Berapa modal minimum untuk berinvestasi?",
    a: "Modal investasi mulai dari Rp 150 juta untuk satu outlet laundry lengkap termasuk mesin, interior, branding, dan biaya operasional 3 bulan pertama. Kami juga menyediakan opsi cicilan melalui mitra perbankan.",
  },
  {
    q: "Apakah saya perlu mengelola outlet sendiri?",
    a: "Tidak. SHO-SHA menggunakan sistem autopilot — seluruh operasional dikelola oleh tim manajemen profesional kami. Anda sebagai investor hanya perlu memantau performa melalui dashboard real-time.",
  },
  {
    q: "Berapa estimasi ROI dan payback period?",
    a: "ROI rata-rata mencapai 65% per tahun dengan payback period sekitar 19 bulan. Angka ini berdasarkan data aktual dari outlet-outlet yang sudah beroperasi.",
  },
  {
    q: "Bagaimana sistem pembagian keuntungan?",
    a: "Keuntungan bersih dibagi sesuai perjanjian MoU. Laporan keuangan diberikan setiap bulan secara transparan melalui dashboard digital dan laporan tertulis.",
  },
  {
    q: "Apakah ada jaminan jika bisnis tidak berjalan?",
    a: "Kami memberikan garansi dukungan operasional penuh dan buyback guarantee sesuai ketentuan dalam MoU. Dengan track record 15+ tahun, kami memastikan setiap outlet dikelola untuk sukses.",
  },
  {
    q: "Di mana lokasi outlet yang tersedia?",
    a: "Kami memiliki tim riset lokasi yang menganalisis traffic, demografi, dan potensi pasar. Saat ini tersedia di area Jabodetabek dan beberapa kota besar di Indonesia. Lokasi baru terus dibuka.",
  },
  {
    q: "Apa yang membedakan SHO-SHA dari franchise laundry lain?",
    a: "Sistem full-autopilot, dashboard monitoring 24/7, tim teknisi siaga, dan track record 15+ tahun yang proven. Investor benar-benar pasif — tidak perlu terlibat operasional sama sekali.",
  },
];

const navLinks = [
  { label: "Beranda", href: "/home" },
  { label: "Tentang Kami", href: "/about" },
  { label: "Kemitraan", href: "/partnership" },
];

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

export default function Faq() {
/* ═══════════════════════════════════════════
   DATA ARRAYS — edit these to update content
   ═══════════════════════════════════════════ */
  const hero = {
      image: "/units/madrasah.jpg",
      heroImage: "/hero/hero3.svg",
      tagline: "Pertanyaan\nUmum.",
      subtitle: "Bangun bisnis laundry autopilot dengan passive income berkelanjutan. Tim kami mengelola segalanya — Anda cukup memantau profit.",
    };

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  /* ── Navbar scroll state ── */
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openCabang, setOpenCabang] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  /* FAQ accordion */
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const toggleFaq = useCallback((i: number) => {
    setOpenFaq((prev) => (prev === i ? null : i));
  }, []);

  /* ── Hero parallax ── */
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* ═══ NAVBAR — floating glassmorphism ═══ */}
      <nav className="fixed top-0 z-50 w-full">
        <div className="mx-auto max-w-7xl px-6">
          <div
            className={`mt-4 flex h-16 items-center justify-between rounded-2xl border border-border/50 px-8 shadow-lg shadow-black/5 backdrop-blur-xl transition-all duration-300 ${
              scrolled ? "bg-background/90" : "bg-background/70"
            }`}
          >
            <a href="/home" className="flex items-center gap-2">
              <img src="/assets/logo.svg" alt="SHO SHA Logo" className="h-10 w-auto" />
            </a>

            {/* Custom Right-Aligned Navigation */}
            <div className="hidden md:flex items-center ml-auto">
              <ul className="flex items-center gap-2 text-right">
                <li>
                  <a href="/home" className="px-4 py-2 text-[13px] font-medium text-muted-foreground hover:text-primary transition-colors rounded-xl">
                    Beranda
                  </a>
                </li>
            <li>
                  <a href="/about" className="px-4 py-2 text-[13px] font-medium text-muted-foreground hover:text-primary transition-colors rounded-xl">
                    Tentang
                  </a>
                </li>
                <li>
                  <a href="/partnership" className="px-4 py-2 text-[13px] font-medium text-muted-foreground hover:text-primary transition-colors rounded-xl">
                    Kemitraan
                  </a>
                </li>
                <li>
                  <a href="/faq" className="px-4 py-2 text-[13px] font-medium text-orange-600 hover:text-orange-600 transition-colors rounded-xl">
                    FAQ
                  </a>
                </li>

                {/* Cabang Menu */}
                <li className="relative group">
                  <button className="px-4 py-2 text-[13px] font-medium text-muted-foreground hover:text-primary transition-colors rounded-xl flex items-center gap-1">
                    Cabang <ChevronDown className="w-3 h-3 ml-1" />
                  </button>

                  <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200">
                    <DropdownMenuCabang />
                  </div>
                </li>
              </ul>
            </div>

            <div className="flex items-center gap-3">
              <Button size="sm" className="hidden rounded-xl text-xs sm:inline-flex" asChild>
                <a href="https://wa.me/628111774438" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-1.5 h-3.5 w-3.5" />
                  Hubungi Kami
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

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden md:hidden"
              >
                <div className={`mt-2 flex flex-col gap-1 rounded-2xl border border-border/50 shadow-lg p-4 shadow-black/5 backdrop-blur-xl transition-all duration-300 ${
                    scrolled ? "bg-background/90" : "bg-background/70"
                  }`}
                >
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

                  {/* Dropdown Cabang */}
                  <div className="flex flex-col">
                    <button
                      onClick={() => setOpenCabang(!openCabang)}
                      className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      <span>Cabang</span>
                      <ChevronDown className="w-3 h-3" />
                    </button>

                    {openCabang && (
                      <ul className="ml-4 mt-1 mb-1 flex flex-col divide-y divide-border/40 border-l border-border/40">
                        {outlets.map((outlet) => (
                          <li key={outlet}>
                            <Link
                              href={`/units-${outlet.toLowerCase().replace(/\s+/g, "-")}`}
                              onClick={() => setMobileMenuOpen(false)}
                              className="block px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                            >
                              {outlet}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  
                  <Button size="sm" className="rounded-xl text-xs sm:inline-flex" asChild>
                    <a href="https://wa.me/628111774438" target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="mr-1.5 h-3.5 w-3.5" />
                      Hubungi Kami
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
      >
        {/* Background slides */}
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <img
            src={hero.image}
            alt="SHO SHA Laundry"
            className="h-full w-full object-cover"
          />
        </motion.div>

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />

        {/* Content */}
        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 flex min-h-[100dvh] items-center px-6">
          <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left column - Text content */}
            <div className="text-center lg:text-left">
              <h1 className="whitespace-pre-line mx-auto lg:mx-0 text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                {hero.tagline}
              </h1>

              <p className="mt-6 mx-auto lg:mx-0 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
                {hero.subtitle}
              </p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:items-start lg:items-center"
              >
                <Button size="lg" className="group gap-2 rounded-xl px-8 text-base" asChild>
                  <a href="https://wa.me/628111774438" target="_blank" rel="noopener noreferrer">
                    Hubungi Kami
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
                <Button size="lg" variant="ghost" className="gap-2 rounded-xl border border-white/20 text-base text-white hover:bg-white/10" asChild>
                  <a href="/about">
                    Pelajari Lebih Lanjut
                    <ChevronDown className="h-4 w-4" />
                  </a>
                </Button>
              </motion.div>
            </div>

            {/* Right column - Hero image */}
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.8 }} className="hidden lg:block relative">
              <img
                src={hero.heroImage}
                alt="SHO SHA Laundry Hero"
                className="w-full h-auto max-h-[100vh] object-contain"
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section id="faq" className="px-6 py-28">
        <div className="mx-auto max-w-3xl">
          <FadeIn className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              FAQ
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Pertanyaan yang Sering{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Ditanyakan
              </span>
            </h2>
          </FadeIn>

          <div className="mt-14 space-y-3">
            {faqItems.map((item, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div className="rounded-2xl border border-border/50 bg-card transition-all duration-300 hover:border-primary/20">
                  <button
                    onClick={() => toggleFaq(i)}
                    className="flex w-full items-center justify-between gap-4 p-6 text-left"
                  >
                    <span className="text-sm font-semibold sm:text-base">{item.q}</span>
                    <motion.div
                      animate={{ rotate: openFaq === i ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="shrink-0"
                    >
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-6 text-sm leading-relaxed text-muted-foreground">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA SECTION ═══ */}
      <section className="px-6 py-16 bg-orange-50">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary via-primary to-primary/80 px-8 py-16 text-center text-primary-foreground sm:px-16 sm:py-20">
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
                    href="https://wa.me/628111774438"
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
                    href="https://wa.me/628111774438"
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
      <Footer navLinks={navLinks}/>
    </div>
  );
}
