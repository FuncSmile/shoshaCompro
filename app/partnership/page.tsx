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
} from "framer-motion";
import {
  Droplets,
  Clock,
  Shield,
  Sparkles,
  Phone,
  Mail,
  ArrowRight,
  CheckCircle2,
  MessageCircle,
  Zap,
  ChevronDown,
  Menu,
  X,
  Users,
  TrendingUp,
  BarChart3,
  Eye,
  Wrench,
  Headphones,
  Timer,
  CreditCard,
  Truck,
  Gift,
  Award,
  Building2,
  Target,
  Calendar,
  MapPin,
  Download,
  Send,
  Instagram,
  ChevronUp,
  HelpCircle,
  Star,
  Quote,
  Play,
  CircleDot,
  Rocket,
  FileText,
  Handshake,
  LineChart,
} from "lucide-react";
import { Button } from "@/components/ui/button";

/* ═══════════════════════════════════════════
   ANIMATED COUNTER
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
      if (ref.current)
        ref.current.textContent =
          prefix + Math.round(v).toLocaleString("id-ID") + suffix;
    });
    return unsub;
  }, [spring, suffix, prefix]);

  return (
    <span ref={ref}>
      {prefix}0{suffix}
    </span>
  );
}

/* ═══════════════════════════════════════════
   MARQUEE
   ═══════════════════════════════════════════ */

function Marquee({
  children,
  reverse = false,
}: {
  children: React.ReactNode;
  reverse?: boolean;
}) {
  return (
    <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div
        className={`flex shrink-0 gap-8 py-4 ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {children}
        {children}
      </div>
    </div>
  );
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
   DATA
   ═══════════════════════════════════════════ */

const navLinks = [
  { label: "Beranda", href: "#beranda" },
  { label: "Keunggulan", href: "#keunggulan" },
  { label: "Tentang", href: "#tentang" },
  { label: "Layanan", href: "#layanan" },
  { label: "FAQ", href: "#faq" },
  { label: "Kontak", href: "#kontak" },
];

const highlights = [
  {
    icon: Shield,
    title: "Bisnis Teruji 15+ Tahun",
    desc: "Pengalaman panjang dalam industri laundry dengan track record proven.",
  },
  {
    icon: Zap,
    title: "Sistem Autopilot",
    desc: "100% dikelola manajemen profesional. Investor pasif, profit aktif.",
  },
  {
    icon: Eye,
    title: "Transparansi 24/7",
    desc: "Dashboard real-time untuk monitoring omzet, profit, dan operasional.",
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

const timeline = [
  {
    year: "2010",
    title: "Berdiri",
    desc: "SHO-SHA LAUNDRY didirikan dengan 1 outlet pertama.",
  },
  {
    year: "2015",
    title: "Ekspansi",
    desc: "Berkembang menjadi 5 outlet di Jakarta.",
  },
  {
    year: "2020",
    title: "Sistem Investor",
    desc: "Meluncurkan sistem kemitraan investor autopilot.",
  },
  {
    year: "2025",
    title: "12+ Outlet",
    desc: "Beroperasi di berbagai lokasi strategis.",
  },
];

const teamMembers = [
  {
    name: "Anton Agusta",
    role: "Founder & CEO",
    desc: "15+ tahun pengalaman di industri laundry dan sistem manajemen operasional.",
    initials: "AA",
  },
  {
    name: "Yesi Elfira",
    role: "COO",
    desc: "Ahli operasional dan quality control dengan track record membangun 10+ outlet.",
    initials: "YE",
  },
  {
    name: "Riyanti",
    role: "CFO",
    desc: "Spesialis keuangan dan analisa investasi untuk memastikan ROI optimal.",
    initials: "RI",
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

const marqueeWords = [
  "AUTOPILOT",
  "PASSIVE INCOME",
  "ROI 65%",
  "15+ TAHUN",
  "TRANSPARAN",
  "PROFESIONAL",
  "24/7 MONITORING",
  "PROVEN SYSTEM",
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

const trustedLogos = [
  "LG Electronics",
  "QRIS",
  "Bank BCA",
  "Grab",
  "Gojek",
  "OVO",
];

/* ═══════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════ */

export default function Home() {
  /* Navbar state */
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  /* Hero parallax */
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* ═══ NAVBAR ═══ */}
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
              <span className="text-base font-bold tracking-tight">
                SHO-SHA
              </span>
            </a>

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
              <Button
                size="sm"
                className="hidden rounded-xl text-xs sm:inline-flex"
                asChild
              >
                <a
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-1.5 h-3.5 w-3.5" />
                  Konsultasi
                </a>
              </Button>
              <button
                className="flex h-9 w-9 items-center justify-center rounded-xl md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
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
                  <a
                    href="https://wa.me/6281234567890"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="mr-1.5 h-3.5 w-3.5" />
                    Konsultasi
                  </a>
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* ═══ HERO SECTION ═══ */}
      <section
        ref={heroRef}
        id="beranda"
        className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden px-6"
      >
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

        {/* Grid pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 mx-auto max-w-5xl text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Peluang Investasi Terbuka
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Bangun Passive Income dari
            <br />
            <span className="bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">
              Bisnis Laundry Autopilot
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
          >
            100% dikelola manajemen profesional.{" "}
            <span className="font-medium text-foreground">
              Investor pasif, profit aktif.
            </span>
          </motion.p>

          {/* 3 Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-3"
          >
            {highlights.map((h) => (
              <div
                key={h.title}
                className="group rounded-2xl border border-border/50 bg-card/50 p-5 text-left backdrop-blur-sm transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5"
              >
                <h.icon className="mb-3 h-6 w-6 text-primary transition-transform duration-300 group-hover:scale-110" />
                <h3 className="text-sm font-bold">{h.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {h.desc}
                </p>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button
              size="lg"
              className="group gap-2 rounded-xl px-8 text-base"
              asChild
            >
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
              >
                Investasi Sekarang
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="gap-2 rounded-xl text-base text-muted-foreground"
              asChild
            >
              <a href="#keunggulan">
                Pelajari Lebih Lanjut
                <ChevronDown className="h-4 w-4" />
              </a>
            </Button>
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
            <span
              key={word}
              className="flex items-center gap-8 text-sm font-bold tracking-[0.2em] text-accent-foreground/70"
            >
              {word}
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
          ))}
        </Marquee>
      </div>

      {/* ═══ KEUNGGULAN INVESTASI ═══ */}
      <section id="keunggulan" className="px-6 py-28">
        <div className="mx-auto max-w-6xl">
          <FadeIn className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Keunggulan
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              ROI Cepat &{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Aman
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

      {/* ═══ TENTANG KAMI ═══ */}
      <section
        id="tentang"
        className="relative overflow-hidden bg-accent px-6 py-28 text-accent-foreground"
      >
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
          <span className="select-none text-[18vw] font-black leading-none tracking-tighter text-accent-foreground/[0.03]">
            SHO-SHA
          </span>
        </div>

        <div className="relative mx-auto max-w-6xl">
          {/* Visi & Misi */}
          <div className="grid gap-12 lg:grid-cols-2">
            <FadeIn>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                Tentang Kami
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Visi Kami
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-accent-foreground/70">
                Menjadi jaringan laundry terkemuka di Indonesia dengan sistem
                autopilot yang memberikan{" "}
                <span className="font-semibold text-accent-foreground">
                  passive income berkelanjutan
                </span>{" "}
                bagi investor dan layanan terbaik bagi pelanggan.
              </p>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="flex h-full flex-col justify-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                  Misi Kami
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-accent-foreground/70">
                  Memberikan solusi investasi bisnis laundry yang{" "}
                  <span className="font-semibold text-accent-foreground">
                    menguntungkan, transparan, dan mudah dikelola
                  </span>{" "}
                  dengan dukungan operasional penuh dari tim profesional kami.
                </p>
              </div>
            </FadeIn>
          </div>

          {/* Timeline */}
          <div className="mt-28">
            <FadeIn className="text-center">
              <h3 className="text-2xl font-bold sm:text-3xl">
                Perjalanan Kami
              </h3>
              <p className="mt-2 text-accent-foreground/60">
                15+ tahun membangun kepercayaan dan kesuksesan bersama
              </p>
            </FadeIn>

            <div className="relative mt-16">
              {/* Center line */}
              <div className="absolute left-4 top-0 h-full w-px bg-accent-foreground/10 md:left-1/2 md:-translate-x-px" />

              {timeline.map((item, i) => (
                <FadeIn key={item.year} delay={i * 0.1}>
                  <div
                    className={`relative mb-12 flex items-start gap-8 pl-12 md:pl-0 ${
                      i % 2 === 0
                        ? "md:flex-row md:text-right"
                        : "md:flex-row-reverse md:text-left"
                    }`}
                  >
                    {/* Dot */}
                    <div className="absolute left-2 top-1 h-4 w-4 rounded-full border-[3px] border-primary bg-accent md:left-1/2 md:-translate-x-2" />

                    <div
                      className={`flex-1 ${
                        i % 2 === 0 ? "md:pr-16" : "md:pl-16"
                      }`}
                    >
                      <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-sm font-bold text-primary">
                        {item.year}
                      </span>
                      <h4 className="mt-2 text-xl font-bold">{item.title}</h4>
                      <p className="mt-1 text-sm text-accent-foreground/60">
                        {item.desc}
                      </p>
                    </div>
                    <div className="hidden flex-1 md:block" />
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* Tim Kami */}
          <div className="mt-28">
            <FadeIn className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                Tim Kami
              </p>
              <h3 className="mt-3 text-2xl font-bold sm:text-3xl">
                Dikelola oleh Profesional
              </h3>
            </FadeIn>

            <div className="mt-14 grid gap-6 sm:grid-cols-3">
              {teamMembers.map((member, i) => (
                <FadeIn key={member.name} delay={i * 0.1}>
                  <div className="group rounded-3xl border border-accent-foreground/10 bg-accent-foreground/5 p-8 text-center backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-accent-foreground/10">
                    {/* Avatar placeholder */}
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 text-2xl font-bold text-primary transition-all duration-300 group-hover:from-primary group-hover:to-primary/80 group-hover:text-primary-foreground">
                      {member.initials}
                    </div>
                    <h4 className="mt-5 text-lg font-bold">{member.name}</h4>
                    <p className="mt-1 text-sm font-medium text-primary">
                      {member.role}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-accent-foreground/60">
                      {member.desc}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ LAYANAN ═══ */}
      <section id="layanan" className="px-6 py-28">
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

      {/* ═══ TRUSTED BY — Logo Cloud ═══ */}
      <div className="border-y border-border/50 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <FadeIn className="text-center">
            <p className="text-sm font-medium text-muted-foreground">
              Dipercaya oleh brand dan partner terkemuka
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-8 sm:gap-12">
              {trustedLogos.map((logo, i) => (
                <motion.div
                  key={logo}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="flex h-12 items-center rounded-xl border border-border/50 bg-muted/50 px-6 text-sm font-bold tracking-wide text-muted-foreground/60 transition-all hover:border-primary/20 hover:text-foreground"
                >
                  {logo}
                </motion.div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>

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
      <section className="px-6 py-16">
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
                  <a href="#kontak">
                    <Download className="h-4 w-4" />
                    Download Proposal
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
      <footer className="border-t border-accent-foreground/10 bg-accent px-6 py-16 text-accent-foreground">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80">
                  <Droplets className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="text-lg font-bold">SHO-SHA</span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-accent-foreground/50">
                Investasi laundry autopilot dengan sistem manajemen profesional.
                Passive income, active profit.
              </p>
              <div className="mt-5 flex gap-2">
                <a
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-foreground/5 text-accent-foreground/60 transition-all hover:bg-primary hover:text-primary-foreground"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-foreground/5 text-accent-foreground/60 transition-all hover:bg-primary hover:text-primary-foreground"
                >
                  <MessageCircle className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider">
                Navigasi
              </h4>
              <ul className="mt-4 space-y-2.5 text-sm text-accent-foreground/50">
                {navLinks.map((link) => (
                  <li
                    key={link.label}
                    className="transition-colors hover:text-primary"
                  >
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider">
                Layanan
              </h4>
              <ul className="mt-4 space-y-2.5 text-sm text-accent-foreground/50">
                <li className="transition-colors hover:text-primary">
                  <a href="#layanan">Self-Service Laundry</a>
                </li>
                <li className="transition-colors hover:text-primary">
                  <a href="#layanan">Drop-Off Laundry</a>
                </li>
                <li className="transition-colors hover:text-primary">
                  <a href="#layanan">Membership TORU</a>
                </li>
                <li className="transition-colors hover:text-primary">
                  <a href="#layanan">Investasi Autopilot</a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider">
                Kontak
              </h4>
              <ul className="mt-4 space-y-2.5 text-sm text-accent-foreground/50">
                <li className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5" />
                  Jakarta, Indonesia
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5" />
                  +62 812-3456-7890
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5" />
                  invest@shoshalaundry.com
                </li>
              </ul>
            </div>
          </div>

          <div className="my-10 h-px bg-accent-foreground/10" />

          <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
            <p className="text-xs text-accent-foreground/40">
              &copy; {new Date().getFullYear()} SHO-SHA LAUNDRY. All rights
              reserved.
            </p>
            <p className="text-xs text-accent-foreground/30">
              Investor pasif, profit aktif.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
