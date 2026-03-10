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
    features: ["Cuci, kering, lipat rapi", "Pewangi premium gratis", "Antar-jemput tersedia", "Rp 7.000/kg (min 3kg)"],
  },
  {
    icon: CreditCard,
    title: "Membership TORU",
    features: ["Top-up saldo digital", "Diskon 10–20%", "Akumulasi poin reward", "Gratis pendaftaran"],
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
    features: ["1 mesin cuci 8kg", "1 mesin pengering", "Perlengkapan dasar", "Training 3 hari", "Branding outlet"],
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

const investorJourney = [
  {
    step: "01",
    icon: FileText,
    title: "Konsultasi & Proposal",
    desc: "Diskusi kebutuhan investasi dan terima proposal lengkap dengan proyeksi ROI.",
  },
  {
    step: "02",
    icon: Handshake,
    title: "Tanda Tangan MoU",
    desc: "Sepakati perjanjian kerja sama dan lakukan pembayaran investasi.",
  },
  {
    step: "03",
    icon: Building2,
    title: "Setup Outlet",
    desc: "Tim kami siapkan outlet lengkap: mesin, interior, branding, dan rekrutmen staff.",
  },
  {
    step: "04",
    icon: LineChart,
    title: "Monitoring & Profit",
    desc: "Outlet beroperasi autopilot. Pantau profit via dashboard dan terima dividen bulanan.",
  },
];

const investmentPackages = [
  { id: "Standard", investment: "150.000.000", profit: "6.500.000", payback: "18-24 Bulan", features: ["5 Mesin Cuci", "Standard Interior", "Basic Marketing"] },
  { id: "Premium", investment: "250.000.000", profit: "12.000.000", payback: "21 Bulan", features: ["8 Mesin Cuci", "Premium Interior", "Advanced Marketing", "Recruitment Support"] },
  { id: "Ultimate", investment: "450.000.000", profit: "25.000.000", payback: "19 Bulan", features: ["12 Mesin Cuci", "Luxury Interior", "Full Marketing Agency", "VIP Support"] },
];

const investmentHighlights = [
  { icon: TrendingUp, title: "ROI hingga 65%", desc: "Return on Investment yang sangat kompetitif di industri laundry." },
  { icon: Calendar, title: "Payback 19 Bulan", desc: "Proyeksi balik modal yang terukur dan relatif cepat." },
  { icon: Zap, title: "Sistem Autopilot", desc: "Operasional ditangani 100% oleh manajemen profesional kami." },
  { icon: Eye, title: "Transparansi 24/7", desc: "Pantau omzet dan profit real-time via dashboard digital." },
  { icon: Wrench, title: "Maintenance Siaga", desc: "Tim teknisi internal siap sedia menjaga operasional mesin." },
  { icon: Headphones, title: "Support Marketing", desc: "Dukungan promosi berkelanjutan untuk menjaga traffic outlet." },
];

const investorTestimonials = [
  {
    name: "Hendra Wijaya",
    role: "Investor sejak 2021",
    text: "ROI 60% di tahun pertama. Saya tidak perlu turun tangan sama sekali — tim SHO-SHA mengelola semuanya dengan sangat profesional.",
    rating: 5,
  },
  {
    name: "Sari Indrawati",
    role: "Investor sejak 2022",
    text: "Dashboard real-time-nya luar biasa transparan. Saya bisa pantau omzet harian dari HP. Balik modal dalam 17 bulan!",
    rating: 5,
  },
  {
    name: "Bambang Sutrisno",
    role: "Investor sejak 2020",
    text: "Sudah punya 3 outlet SHO-SHA. Passive income yang konsisten setiap bulan. Sistem autopilot-nya benar-benar works.",
    rating: 5,
  },
];

const navLinks = [
  { label: "Beranda", href: "/home" },
  { label: "Tentang Kami", href: "/about" },
  { label: "FAQ", href: "/faq" },
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

const socialLinks = [
  { icon: Instagram, href: "https://www.instagram.com/shoshalaundryofficial", label: "Instagram" },
  { icon: Facebook, href: "https://www.facebook.com/profile.php?id=100087515256650", label: "Facebook" },
  { icon: MessageCircle, href: "https://wa.me/628111774438", label: "WhatsApp" },
];

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

export default function Partnership() {
/* ═══════════════════════════════════════════
   DATA ARRAYS — edit these to update content
   ═══════════════════════════════════════════ */
  const hero = {
      image: "/units/pahlawan.png",
      heroImage: "/hero2.svg",
      tagline: "Mitra Bisnis\nSHO-SHA.",
      subtitle: "Bergabunglah dengan jaringan franchise laundry yang terus berkembang di Indonesia. Didukung sistem, tim profesional, dan peluang keuntungan berkelanjutan.",
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

  /* ── Hero parallax ── */
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const [activePackage, setActivePackage] = useState("Premium");
  
  // Memoize active package data
  const activePkg = useMemo(
    () => investmentPackages.find(p => p.id === activePackage) ?? investmentPackages[1],
    [activePackage]
  );

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
              <img src="/logo.svg" alt="SHO SHA Logo" className="h-10 w-auto" />
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
                  <a href="/partnership" className="px-4 py-2 text-[13px] font-medium text-orange-600 hover:text-orange-600 transition-colors rounded-xl">
                    Kemitraan
                  </a>
                </li>
                <li>
                  <a href="/faq" className="px-4 py-2 text-[13px] font-medium text-muted-foreground hover:text-primary transition-colors rounded-xl">
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

      {/* ═══ KEUNGGULAN INVESTASI ═══ */}
      <section id="keunggulan" className="px-6 py-28">
        <div className="mx-auto max-w-6xl">
          <FadeIn className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Keunggulan</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Mengapa Memilih Kemitraan <br />
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">SHO-SHA Laundry?</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">Investasi laundry autopilot dengan keuntungan maksimal dan risiko minimal. Dikelola profesional, dipantau transparan.</p>
          </FadeIn>

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
                  <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
          </FadeIn>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {investmentCards.map((card, i) => (
              <FadeIn key={card.title} delay={i * 0.08}>
                <div className="group h-full rounded-3xl border border-border/50 bg-card p-6 transition-all duration-300 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5">
                  <div className="mb-4 inline-flex rounded-2xl bg-primary/10 p-3 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                    <card.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold">{card.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{card.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ LAYANAN — Paket Mitra ═══ */}
      <section id="layanan-mitra" className="relative overflow-hidden bg-accent px-6 py-28 text-accent-foreground">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
          <span className="select-none text-[20vw] font-black leading-none tracking-tighter text-accent-foreground/[0.03]">MITRA</span>
        </div>

        <div className="relative mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Kemitraan</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Pilih Paket Mitra Anda</h2>
            <p className="mx-auto mt-4 max-w-2xl text-accent-foreground/60">Mulai bisnis laundry Anda bersama SHO SHA. Tiga paket investasi dengan dukungan penuh dari kami.</p>
          </motion.div>

          <div className="mt-16 grid items-end gap-6 lg:grid-cols-3">
            {mitraPackages.map((pkg, i) => (
              <motion.div key={pkg.name} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: i * 0.12, duration: 0.5 }} className={i === 1 ? "lg:-mt-8" : ""}>
                <div className={`relative flex flex-col rounded-3xl border p-8 transition-all duration-300 hover:shadow-2xl ${i === 1 ? "border-primary bg-primary text-primary-foreground shadow-xl shadow-primary/20" : "border-accent-foreground/10 bg-accent-foreground/5 backdrop-blur-sm hover:border-primary/30"}`}>
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
                    <p className={`mt-2 text-sm ${i === 1 ? "text-primary-foreground/70" : "text-accent-foreground/50"}`}>Est. {pkg.pelanggan} pelanggan/hari</p>
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

                  <Button className={`mt-8 w-full rounded-xl text-sm ${i === 1 ? "bg-white text-primary hover:bg-white/90" : "border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground"}`} variant={i === 1 ? "default" : "outline"} size="lg" asChild>
                    <a href="https://wa.me/628111774438" target="_blank" rel="noopener noreferrer">
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

      {/* ═══ LAYANAN ═══ */}
      {/* <section id="layanan" className="px-6 py-28">
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
      </section> */}
      
      {/* ═══ HOW IT WORKS — Investor Journey ═══ */}
      <section className="px-6 py-28">
        <div className="mx-auto max-w-6xl">
          <FadeIn className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Cara Kerja
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Semudah{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                4 Langkah
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Dari konsultasi hingga profit — proses investasi yang simpel dan transparan.
            </p>
          </FadeIn>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {investorJourney.map((step, i) => (
              <FadeIn key={step.step} delay={i * 0.12}>
                <div className="group relative h-full">
                  {/* Connector */}
                  {i < investorJourney.length - 1 && (
                    <div className="absolute right-0 top-12 hidden h-px w-6 translate-x-full bg-gradient-to-r from-primary/40 to-transparent lg:block" />
                  )}
                  <div className="flex h-full flex-col rounded-3xl border border-border/50 bg-card p-6 transition-all duration-300 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5">
                    <span className="text-5xl font-black text-primary/15 transition-colors group-hover:text-primary/30">
                      {step.step}
                    </span>
                    <div className="mt-2 mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                      <step.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-bold">{step.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section
        id="roi"
        className="px-6 py-28 relative overflow-hidden"
      >
        {/* Static blobs — CSS-only, no JS animation for background blobs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-1/4 top-0 h-[500px] w-[500px] animate-[pulse_20s_ease-in-out_infinite] rounded-full bg-primary/5 blur-[80px]" />
          <div className="absolute -right-1/4 bottom-0 h-[600px] w-[600px] animate-[pulse_25s_ease-in-out_infinite] rounded-full bg-secondary/5 blur-[80px]" />
        </div>
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <FadeIn>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Potensi Keuntungan</p>
              <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Investasi Cerdas, <br /><span className="text-muted-foreground">Masa Depan Cerah.</span></h2>
              <p className="mt-6 text-lg text-muted-foreground">Sistem kami dirancang untuk efisiensi maksimal. Nikmati ROI tinggi dengan transparansi penuh 24/7 melalui dashboard mitra kami.</p>

              <div className="mt-10 grid grid-cols-2 gap-4">
                {investmentHighlights.slice(0, 4).map((h) => (
                  <div key={h.title} className="rounded-2xl border border-border/50 bg-card/50 p-5">
                    <h.icon className="h-5 w-5 text-primary mb-3" />
                    <h4 className="font-bold text-sm">{h.title}</h4>
                    <p className="mt-1 text-xs text-muted-foreground">{h.desc}</p>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.2} className="relative">
              <div className="relative rounded-[2.5rem] border border-primary/20 bg-gradient-to-br from-card to-background p-8 shadow-2xl lg:p-12">
                <div className="absolute -right-4 -top-4 rounded-2xl bg-primary px-4 py-2 font-bold text-primary-foreground shadow-lg">
                  Simulasi ROI
                </div>
                <h3 className="text-2xl font-bold tracking-tight">Kalkulator Mitra</h3>
                <p className="mt-2 text-sm text-muted-foreground">Pilih paket investasi dan lihat estimasi pendapatannya.</p>

                <div className="mt-10 space-y-6">
                  {/* Package Toggle */}
                  <div className="flex rounded-2xl bg-muted p-1">
                    {investmentPackages.map((pkg) => (
                      <button
                        key={pkg.id}
                        onClick={() => setActivePackage(pkg.id)}
                        className={`flex-1 rounded-xl py-2.5 text-sm font-semibold transition-all ${activePackage === pkg.id ? "bg-background shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"}`}
                      >
                        {pkg.id}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-4 rounded-2xl bg-muted/50 p-6">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Modal Investasi</span>
                      <motion.span
                        key={activePackage + "inv"}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="font-bold"
                      >
                        Rp {activePkg.investment}
                      </motion.span>
                    </div>
                    <Separator className="bg-border/50" />
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Estimasi Profit / Bln</span>
                      <motion.span
                        key={activePackage + "prof"}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="font-bold text-primary"
                      >
                        Rp {activePkg.profit}
                      </motion.span>
                    </div>
                    <Separator className="bg-border/50" />
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Payback Period</span>
                      <motion.span
                        key={activePackage + "pay"}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="font-bold"
                      >
                        {activePkg.payback}
                      </motion.span>
                    </div>
                  </div>

                  <Button className="w-full rounded-2xl gap-2" size="lg" asChild>
                    <a href="https://wa.me/628111774438" target="_blank" rel="noopener noreferrer">
                      Dapatkan Proposal Lengkap
                      <Download className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
      
      {/* ═══ TESTIMONIALS — Investor Reviews ═══ */}
      <section className="relative overflow-hidden bg-accent px-6 py-28 text-accent-foreground">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
          <Quote className="h-[40vw] w-[40vw] text-accent-foreground/[0.02]" />
        </div>

        <div className="relative mx-auto max-w-6xl">
          <FadeIn className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Testimoni Investor
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Kata Mereka yang Sudah Berinvestasi
            </h2>
          </FadeIn>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {investorTestimonials.map((t, i) => (
              <FadeIn key={t.name} delay={i * 0.1}>
                <div className="group h-full rounded-3xl border border-accent-foreground/10 bg-accent-foreground/5 p-8 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-accent-foreground/10">
                  {/* Stars */}
                  <div className="flex gap-0.5">
                    {[...Array(t.rating)].map((_, j) => (
                      <Star
                        key={j}
                        className="h-4 w-4 fill-primary text-primary"
                      />
                    ))}
                  </div>
                  <p className="mt-5 text-sm leading-relaxed text-accent-foreground/70">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 text-sm font-bold text-primary">
                      {t.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{t.name}</p>
                      <p className="text-xs text-accent-foreground/50">
                        {t.role}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
      
      {/* ═══ KONTAK ═══ */}
      <section id="kontak" className="px-6 py-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-5">
            <FadeIn className="lg:col-span-2">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                Kontak
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Hubungi Kami
              </h2>
              <p className="mt-3 text-muted-foreground">
                Siap menjawab pertanyaan Anda tentang investasi laundry
                autopilot.
              </p>

              <div className="mt-10 space-y-6">
                {[
                  {
                    icon: MapPin,
                    label: "Alamat",
                    value: "Jl. Contoh No. 123, Jakarta, Indonesia",
                  },
                  {
                    icon: Phone,
                    label: "Telepon",
                    value: "+62 812-3456-7890",
                  },
                  {
                    icon: Mail,
                    label: "Email",
                    value: "invest@shoshalaundry.com",
                  },
                  {
                    icon: Clock,
                    label: "Buka",
                    value: "Senin - Minggu, 07:00 - 21:00 WIB",
                  },
                ].map((item) => (
                  <div key={item.label} className="group flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        {item.label}
                      </p>
                      <p className="mt-0.5 font-medium">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.1} className="lg:col-span-3">
              <div className="rounded-3xl border border-border/50 bg-card p-8">
                <h3 className="text-xl font-bold">Kirim Pesan</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Atau langsung chat via WhatsApp untuk respon lebih cepat
                </p>
                <form
                  className="mt-8 space-y-5"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
                        htmlFor="name"
                      >
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
                      <label
                        className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
                        htmlFor="phone"
                      >
                        Nomor WhatsApp
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
                    <label
                      className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="email@contoh.com"
                      className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label
                      className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
                      htmlFor="message"
                    >
                      Pesan
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      placeholder="Ceritakan rencana investasi Anda..."
                      className="mt-2 w-full resize-none rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <Button className="w-full gap-2 rounded-xl" size="lg">
                    <Send className="h-4 w-4" />
                    Kirim Pesan
                  </Button>
                </form>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t border-accent-foreground/10 bg-accent px-6 py-20 text-accent-foreground">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-16 lg:grid-cols-4">
            <div className="lg:col-span-1">
              <img src="/logo.svg" alt="SHO SHA Logo" className="h-9 w-auto brightness-0 invert opacity-60" />
              <p className="mt-6 text-sm leading-relaxed text-accent-foreground/50">Memberikan kenyamanan laundry terbaik dan peluang investasi autopilot paling menguntungkan di Indonesia.</p>
              <div className="mt-8 flex gap-3">
                {socialLinks.map((item, i) => {
                  const Icon = item.icon;

                  return (
                    <a
                      key={i}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent-foreground/5 text-accent-foreground/40 transition-all hover:bg-primary hover:text-primary-foreground hover:scale-110"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 lg:col-span-2">
              <div>
                <h4 className="text-sm font-bold uppercase tracking-widest text-primary">Navigasi</h4>
                <ul className="mt-6 space-y-4 text-sm text-accent-foreground/50">
                  {navLinks
                    .filter((link) => link.label !== "Cabang")
                    .map((link) => (
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
              <p className="mt-6 text-sm text-accent-foreground/50 leading-relaxed">Jl. Pahlawan No.34, RT.1/RW.5, Sukabumi Selatan<br />Kec. Kebon Jeruk, Kota Jakarta Barat<br />Daerah Khusus Ibukota Jakarta 11560, Indonesia</p>
              <p className="mt-4 text-lg font-bold">08:00 - 20:00</p>
              <p className="mt-1 text-xs text-accent-foreground/30">Setiap hari buka</p>
            </div>
          </div>

          <Separator className="my-16 bg-accent-foreground/10" />

          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <p className="text-[10px] font-medium uppercase tracking-widest text-accent-foreground/30">&copy; {new Date().getFullYear()} SHO SHA LAUNDRY. All RIGHTS RESERVED.</p>
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
