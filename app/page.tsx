"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  useSpring,
  useMotionTemplate,
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
  TrendingUp,
  Award,
  BarChart3,
  Building2,
  Calendar,
  ChevronUp,
  CircleDot,
  CreditCard,
  Download,
  Eye,
  FileText,
  Gift,
  Handshake,
  Headphones,
  HelpCircle,
  LineChart,
  Menu,
  Play,
  Quote,
  Rocket,
  Send,
  Target,
  Users,
  Wrench,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

/* ─── Animated Counter ─── */
function AnimatedNumber({ value, suffix = "", prefix = "" }: { value: number; suffix?: string; prefix?: string }) {
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

/* ─── FadeIn Section Wrapper ─── */
function FadeIn({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
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

/* ─── Background Patterns ─── */
/* ─── Background Patterns ─── */
function BackgroundGrid() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotlightX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const spotlightY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${spotlightX}px ${spotlightY}px, black, transparent 80%)`;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Base subtle grid - increased opacity */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Interactive spotlight grid - increased opacity and defined color */}
      <motion.div
        className="absolute inset-0 opacity-[0.2] text-primary"
        style={{
          maskImage: spotlight,
          WebkitMaskImage: spotlight,
          backgroundImage: "linear-gradient(to right, currentColor 1.5px, transparent 1.5px), linear-gradient(to bottom, currentColor 1.5px, transparent 1.5px)",
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
}

function BackgroundDots() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotlightX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const spotlightY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const spotlightMask = useMotionTemplate`radial-gradient(400px circle at ${spotlightX}px ${spotlightY}px, black, transparent 85%)`;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Base dots - increased opacity */}
      <div
        className="absolute inset-0 opacity-[0.1]"
        style={{
          backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      {/* Spotlight enhanced dots - increased opacity and size */}
      <motion.div
        className="absolute inset-0 opacity-[0.35] text-primary"
        style={{
          maskImage: spotlightMask,
          WebkitMaskImage: spotlightMask,
          backgroundImage: "radial-gradient(currentColor 2.5px, transparent 2.5px)",
          backgroundSize: "32px 32px",
        }}
      />
    </div>
  );
}

function InteractiveBlobs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[100px]"
      />
      <motion.div
        animate={{
          x: [0, -80, 0],
          y: [0, 120, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute -right-1/4 bottom-0 h-[600px] w-[600px] rounded-full bg-secondary/5 blur-[120px]"
      />
    </div>
  );
}

/* ─── Data ─── */
const services = [
  { icon: Sparkles, title: "Self-Service Laundry", desc: "Mesin cuci LG 20kg premium dengan sistem pembayaran QRIS TORU", price: "8K", unit: "/kg" },
  { icon: Droplets, title: "Drop-Off Laundry", desc: "Layanan cuci, kering, lipat rapi dengan pewangi premium", price: "7K", unit: "/kg" },
  { icon: CreditCard, title: "Membership TORU", desc: "Top-up saldo digital dengan diskon 10-20% & reward poin", price: "REWARD", unit: "" },
  { icon: Clock, title: "Express 6H", desc: "Layanan kilat untuk kebutuhan mendesak Anda", price: "12K", unit: "/kg" },
  { icon: Shield, title: "Premium Care", desc: "Perawatan ekstra untuk bahan sutra, wool, dan cashmere", price: "25K", unit: "/kg" },
  { icon: Truck, title: "Antar Jemput", desc: "Free pickup & delivery untuk area jangkauan tertentu", price: "FREE", unit: "*" },
];

const processSteps = [
  { step: "01", icon: FileText, title: "Konsultasi", desc: "Diskusi kebutuhan investasi dan terima proyeksi ROI lengkap" },
  { step: "02", icon: Handshake, title: "MoU", desc: "Tanda tangan perjanjian kerja sama dan aktivasi investasi" },
  { step: "03", icon: Building2, title: "Setup", desc: "Tim kami siapkan outlet, interior, mesin, hingga rekrutmen" },
  { step: "04", icon: LineChart, title: "Profit", desc: "Outlet beroperasi autopilot. Pantau profit via dashboard" },
];

const companyTimeline = [
  { year: "2010", title: "Berdiri", desc: "SHO SHA LAUNDRY didirikan dengan 1 outlet pertama di Jakarta." },
  { year: "2015", title: "Ekspansi", desc: "Berkembang pesat menjadi 5 outlet di area strategis Jakarta." },
  { year: "2020", title: "Sistem Investor", desc: "Meluncurkan program kemitraan autopilot untuk investor pasif." },
  { year: "2025", title: "Scale Up", desc: "Beroperasi dengan 15+ outlet dan terus tumbuh di seluruh Indonesia." },
];

const investmentPackages = [
  {
    id: "Standard",
    investment: "150.000.000",
    profit: "6.500.000",
    payback: "18-24 Bulan",
    features: ["5 Mesin Cuci", "Standard Interior", "Basic Marketing"]
  },
  {
    id: "Premium",
    investment: "250.000.000",
    profit: "12.000.000",
    payback: "21 Bulan",
    features: ["8 Mesin Cuci", "Premium Interior", "Advanced Marketing", "Recruitment Support"]
  },
  {
    id: "Ultimate",
    investment: "450.000.000",
    profit: "25.000.000",
    payback: "19 Bulan",
    features: ["12 Mesin Cuci", "Luxury Interior", "Full Marketing Agency", "VIP Support"]
  },
];

const galleryImages = [
  { src: "https://images.unsplash.com/photo-1545173153-936277f37475?q=80&w=800&h=1200", alt: "Outlet Premium Shosha", col: "lg:col-span-2", row: "row-span-2" },
  { src: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?q=80&w=800&h=600", alt: "Mesin Cuci Industrial LG", col: "lg:col-span-2", row: "row-span-1" },
  { src: "https://images.unsplash.com/photo-1521656693074-0ef32e80a5d5?q=80&w=1000&h=600", alt: "Sistem Manajemen Digital", col: "lg:col-span-2 md:col-span-2", row: "row-span-1" },
  { src: "https://images.unsplash.com/photo-1489274495757-95c7c837b101?q=80&w=800&h=600", alt: "QC & Quality Control", col: "lg:col-span-2", row: "row-span-1" },
  { src: "https://images.unsplash.com/photo-1548142813-c348350df52b?q=80&w=800&h=1200", alt: "Hasil Laundry Higienis", col: "lg:col-span-2", row: "row-span-2" },
  { src: "https://images.unsplash.com/photo-1534349762230-e0cadf78f5ea?q=80&w=800&h=600", alt: "Interior Eksklusif BSD", col: "lg:col-span-2", row: "row-span-1" },
  { src: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?q=80&w=800&h=600", alt: "Layanan Ekspres", col: "lg:col-span-2", row: "row-span-1" },
  { src: "https://images.unsplash.com/photo-1489274495757-95c7c837b101?q=80&w=800&h=600", alt: "Customer Satisfaction", col: "lg:col-span-2", row: "row-span-1" },
  { src: "https://images.unsplash.com/photo-1521656693074-0ef32e80a5d5?q=80&w=1000&h=600", alt: "Modern Equipment", col: "lg:col-span-4", row: "row-span-1" },
];

const investmentHighlights = [
  { icon: TrendingUp, title: "ROI hingga 65%", desc: "Return on Investment yang sangat kompetitif di industri laundry." },
  { icon: Calendar, title: "Payback 19 Bulan", desc: "Proyeksi balik modal yang terukur dan relatif cepat." },
  { icon: Zap, title: "Sistem Autopilot", desc: "Operasional ditangani 100% oleh manajemen profesional kami." },
  { icon: Eye, title: "Transparansi 24/7", desc: "Pantau omzet dan profit real-time via dashboard digital." },
  { icon: Wrench, title: "Maintenance Siaga", desc: "Tim teknisi internal siap sedia menjaga operasional mesin." },
  { icon: Headphones, title: "Support Marketing", desc: "Dukungan promosi berkelanjutan untuk menjaga traffic outlet." },
];

const testimonials = [
  { name: "Hendra Wijaya", role: "Investor sejak 2021", text: "ROI 60% di tahun pertama. Saya tidak perlu turun tangan sama sekali — tim SHO SHA mengelola semuanya.", rating: 5 },
  { name: "Sari Indrawati", role: "Investor sejak 2022", text: "Dashboard real-time-nya luar biasa transparan. Saya bisa pantau omzet harian dari HP. Balik modal cepat!", rating: 5 },
  { name: "Bambang Sutrisno", role: "Investor sejak 2020", text: "Sudah punya 3 outlet SHO SHA. Passive income yang konsisten setiap bulan. Sistem autopilot-nya benar-benar works.", rating: 5 },
];

const faqItems = [
  { q: "Berapa modal minimum untuk berinvestasi?", a: "Investasi mulai dari Rp 150 juta untuk satu outlet laundry lengkap termasuk mesin, interior, branding, dan biaya operasional awal." },
  { q: "Apakah saya perlu mengelola outlet sendiri?", a: "Tidak. Kami menggunakan sistem full-autopilot di mana tim kamilah yang mengelola seluruh operasional dari A sampai Z." },
  { q: "Bagaimana pembagian keuntungannya?", a: "Keuntungan bersih dibagi secara transparan berdasarkan perjanjian MoU yang disepakati bersama di awal." },
  { q: "Apakah ada jaminan keberhasilan?", a: "Kami memiliki track record 15+ tahun dan sistem yang teruji. Kami juga memberikan garansi dukungan operasional penuh." },
];

const teamMembers = [
  { 
    name: "Anton Agusta", 
    role: "Founder & CEO", 
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=400&auto=format&fit=crop",
    initials: "AA" 
  },
  { 
    name: "Yesi Elfira", 
    role: "COO", 
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&h=400&auto=format&fit=crop",
    initials: "YE" 
  },
  { 
    name: "Riyanti", 
    role: "CFO", 
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&h=400&auto=format&fit=crop",
    initials: "RI" 
  },
];

const trustedLogos = ["LG Electronics", "QRIS", "Bank BCA", "Grab", "Gojek", "OVO"];

const marqueeWords = [
  "AUTOPILOT", "PASSIVE INCOME", "ROI 65%", "15+ TAHUN", "TRANSPARAN", "PROFESIONAL", "24/7 MONITORING", "PROVEN SYSTEM",
];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activePackage, setActivePackage] = useState("Premium");

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const navLinks = [
    { label: "Tentang", href: "#tentang" },
    { label: "Layanan", href: "#layanan" },
    { label: "Proses", href: "#proses" },
    { label: "ROI", href: "#roi" },
    { label: "Galeri", href: "#galeri" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* ═══ NAVBAR ═══ */}
      <nav className="fixed top-0 z-50 w-full">
        <div className="mx-auto max-w-7xl px-6">
          <div className={`mt-4 flex h-16 items-center justify-between rounded-2xl border border-border/50 px-8 shadow-lg shadow-black/5 backdrop-blur-xl transition-all duration-300 ${scrolled ? "bg-background/90" : "bg-background/70"}`}>
            <a href="#" className="flex items-center gap-2">
              <img src="/logo.svg" alt="SHO SHA Logo" className="h-10 w-auto" />
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
              <Button size="sm" className="hidden rounded-xl text-xs sm:inline-flex" asChild>
                <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-1.5 h-3.5 w-3.5" />
                  WhatsApp
                </a>
              </Button>
              <button
                className="flex h-9 w-9 items-center justify-center rounded-xl md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
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
              </div>
            </motion.div>
          )}
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

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 mx-auto max-w-7xl"
        >
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left Column: Text Content */}
            <div className="text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Badge
                  variant="outline"
                  className="mb-8 gap-2 border-primary/30 bg-primary/5 px-4 py-2 text-sm font-medium text-primary"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                  </span>
                  Peluang Investasi Terbuka
                </Badge>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="text-5xl font-extrabold leading-[1.1] tracking-tight sm:text-6xl md:text-7xl"
              >
                <span className="block">Bersih itu</span>
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">
                    segalanya.
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
                className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl lg:mx-0"
              >
                Bangun bisnis laundry autopilot dengan <span className="font-semibold text-foreground">passive income berkelanjutan</span>. Tim kami mengelola segalanya — Anda cukup memantau profit.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="mt-10 flex flex-col items-center gap-4 sm:flex-row lg:justify-start"
              >
                <Button size="lg" className="group gap-2 rounded-xl px-8 text-base shadow-xl shadow-primary/20" asChild>
                  <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer">
                    Konsultasi Gratis
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

              {/* Stats in 2 columns for lg */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="mt-12 grid grid-cols-3 gap-3 sm:gap-4 lg:grid-cols-3"
              >
                {[
                  { value: 15, suffix: "+", label: "Outlet Aktif", icon: Shield },
                  { value: 65, suffix: "%", label: "ROI Tahunan", icon: Star },
                  { value: 19, suffix: " Bln", label: "Payback Period", icon: Zap },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="group rounded-2xl border border-border/50 bg-card/50 p-4 backdrop-blur-sm transition-all duration-300 hover:border-primary/20 hover:shadow-lg"
                  >
                    <p className="text-xl font-bold tabular-nums sm:text-2xl">
                      <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                    </p>
                    <p className="mt-0.5 text-[10px] uppercase tracking-wide text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right Column: Hero Banner Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative mt-12 lg:mt-0"
            >
              {/* Decorative elements behind image */}
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent blur-3xl" />
              </div>
              <div className="relative z-10 flex justify-center">
                <img
                  src="/hero-banner.png"
                  alt="SHO SHA Investment"
                  className="h-[400px] w-auto object-contain drop-shadow-2xl sm:h-[500px] lg:h-[650px]"
                />
              </div>
              
              {/* Floating badges - responsive positioning */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-2 top-1/4 rounded-2xl border border-border/50 bg-card/80 p-3 shadow-xl backdrop-blur-md sm:-right-4 sm:p-4"
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary sm:h-10 sm:w-10">
                    <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground sm:text-xs">Potensi Profit</p>
                    <p className="text-sm font-bold text-foreground sm:text-base">Aktif 24/7</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-4 left-4 rounded-2xl border border-border/50 bg-card/80 p-4 shadow-xl backdrop-blur-md sm:left-1/4 sm:p-5"
              >
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-primary sm:text-3xl">100%</span>
                  <span className="text-xs font-medium text-muted-foreground sm:text-sm">Autopilot</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
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

      {/* ═══ TENTANG KAMI ═══ */}
      <section id="tentang" className="relative overflow-hidden bg-accent px-6 py-28 text-accent-foreground">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
          <span className="select-none text-[18vw] font-black leading-none tracking-tighter text-accent-foreground/[0.03]">
            SHO SHA
          </span>
        </div>

        <div className="relative mx-auto max-w-6xl">
          <div className="grid gap-16 lg:grid-cols-2">
            <FadeIn>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Visi & Misi</p>
              <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Merawat dengan <span className="text-primary">Hati.</span></h2>
              <p className="mt-6 text-lg leading-relaxed text-accent-foreground/70">
                Kami hadir untuk merevolusi industri laundry di Indonesia. Melalui sistem autopilot yang inovatif, kami memberikan solusi investasi yang aman bagi mitra sekaligus layanan premium bagi pelanggan.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  "Pelopor sistem laundry autopilot sejak 2010",
                  "Mengutamakan kualitas dan higienitasi tingkat tinggi",
                  "Menciptakan ekosistem investasi yang transparan"
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span className="text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={0.2} className="relative">
              <div className="relative z-10 space-y-8">
                {companyTimeline.map((item, i) => (
                  <div key={item.year} className="group relative flex gap-6">
                    <div className="flex flex-col items-center">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 font-bold text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        {item.year.slice(2)}
                      </div>
                      {i < companyTimeline.length - 1 && <div className="h-full w-px bg-accent-foreground/10" />}
                    </div>
                    <div className="pb-8">
                      <h3 className="text-lg font-bold">{item.title}</h3>
                      <p className="mt-1 text-sm text-accent-foreground/60">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══ LAYANAN ═══ */}
      <section id="layanan" className="relative px-6 py-28 overflow-hidden">
        <BackgroundDots />
        <div className="mx-auto max-w-6xl">
          <FadeIn className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Layanan Kami</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Solusi perawatan pakaian <span className="text-muted-foreground">menyeluruh.</span></h2>
          </FadeIn>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <FadeIn key={s.title} delay={i * 0.1}>
                <div className="group h-full rounded-3xl border border-border/50 bg-card p-8 transition-all duration-300 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5">
                  <div className="mb-6 inline-flex rounded-2xl bg-primary/10 p-3.5 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                    <s.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">Mulai</span>
                    <span className="text-2xl font-bold text-primary">{s.price}</span>
                    <span className="text-xs text-muted-foreground">{s.unit}</span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CARA KERJA / PROSES ═══ */}
      <section id="proses" className="relative bg-accent px-6 py-28 text-accent-foreground overflow-hidden">
        <BackgroundGrid />
        <div className="mx-auto max-w-6xl">
          <FadeIn className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Investasi</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Cara Kerja <span className="text-accent-foreground/60">Kemitraan.</span></h2>
          </FadeIn>

          <div className="mt-16 grid gap-8 md:grid-cols-4">
            {processSteps.map((p, i) => (
              <FadeIn key={p.step} delay={i * 0.15} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-6">
                    <div className="flex h-20 w-20 items-center justify-center rounded-[2rem] bg-accent-foreground/5 text-primary shadow-inner">
                      <p.icon className="h-8 w-8" />
                    </div>
                    <div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                      {p.step}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold">{p.title}</h3>
                  <p className="mt-2 text-sm text-accent-foreground/50">{p.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ROI SECTION ═══ */}
      <section id="roi" className="px-6 py-28 relative overflow-hidden">
        <InteractiveBlobs />
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
                        Rp {investmentPackages.find(p => p.id === activePackage)?.investment}
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
                        Rp {investmentPackages.find(p => p.id === activePackage)?.profit}
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
                        {investmentPackages.find(p => p.id === activePackage)?.payback}
                      </motion.span>
                    </div>
                  </div>
                  
                  <Button className="w-full rounded-2xl gap-2" size="lg" asChild>
                    <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer">
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

      {/* ═══ GALERI ═══ */}
      <section id="galeri" className="relative px-6 py-28 bg-accent text-accent-foreground overflow-hidden">
        <BackgroundGrid />
        <div className="mx-auto max-w-6xl">
          <FadeIn className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Galeri</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Visualisasi <span className="text-accent-foreground/50">Kesuksesan.</span></h2>
          </FadeIn>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 auto-rows-[200px] sm:auto-rows-[280px]">
            {galleryImages.map((img, i) => (
              <FadeIn 
                key={i} 
                delay={i * 0.1} 
                className={`group relative overflow-hidden rounded-[2rem] shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl col-span-2 ${img.col} ${img.row}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 translate-y-full transition-transform duration-500 group-hover:translate-y-0">
                  <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">Portfolio</p>
                  <p className="text-sm font-medium text-white line-clamp-1">{img.alt}</p>
                </div>
                {/* Overlay on hover for all */}
                <div className="absolute inset-0 bg-primary/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section id="faq" className="relative px-6 py-28 overflow-hidden">
        <BackgroundDots />
        <div className="mx-auto max-w-4xl">
          <FadeIn className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">FAQ</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Pertanyaan <span className="text-muted-foreground">Umum.</span></h2>
          </FadeIn>

          <div className="mt-16 space-y-4">
            {faqItems.map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div 
                  className={`rounded-3xl border border-border/50 transition-all duration-300 ${openFaq === i ? "bg-muted border-primary/20 shadow-lg" : "bg-card"}`}
                >
                  <button
                    className="flex w-full items-center justify-between px-8 py-6 text-left"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="font-bold">{item.q}</span>
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`}>
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ height: openFaq === i ? "auto" : 0, opacity: openFaq === i ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-8 text-sm leading-relaxed text-muted-foreground">
                      {item.a}
                    </div>
                  </motion.div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TEAM & TRUSTED LOGOS ═══ */}
      <section className="relative px-6 py-28 bg-accent text-accent-foreground overflow-hidden">
        <BackgroundGrid />
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-20">
            {/* Team */}
            <div>
              <FadeIn className="text-center mb-14">
                <h3 className="text-2xl font-bold sm:text-3xl">Pikiran di Balik <span className="text-primary italic">Layar.</span></h3>
              </FadeIn>
              <div className="grid gap-8 sm:grid-cols-3">
                {teamMembers.map((member, i) => (
                  <FadeIn key={member.name} delay={i * 0.1}>
                    <div className="group rounded-[2.5rem] bg-accent-foreground/5 p-10 text-center transition-all duration-300 hover:bg-accent-foreground/10 hover:-translate-y-2">
                      <div className="mx-auto mb-8 relative h-40 w-40 overflow-hidden rounded-[3rem] shadow-2xl transition-transform duration-500 group-hover:scale-105">
                        {member.image ? (
                          <img 
                            src={member.image} 
                            alt={member.name} 
                            className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-primary/10 text-2xl font-bold text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-500">
                            {member.initials}
                          </div>
                        )}
                      </div>
                      <h4 className="font-bold text-xl">{member.name}</h4>
                      <p className="text-base text-accent-foreground/50 mt-1">{member.role}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>

            {/* Trusted By */}
            <div className="pt-20 border-t border-accent-foreground/10 text-center">
              <FadeIn>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent-foreground/30 mb-10">Bekerja Sama Dengan</p>
                <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-40 hover:opacity-100 transition-opacity duration-500 grayscale">
                  {trustedLogos.map((logo) => (
                    <span key={logo} className="text-xl font-bold tracking-tighter">{logo}</span>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CONTACT ═══ */}
      <section id="kontak" className="relative px-6 py-28 overflow-hidden">
        <BackgroundDots />
        <InteractiveBlobs />
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-5">
            <FadeIn className="lg:col-span-2">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Kontak</p>
              <h2 className="mt-4 text-4xl font-bold tracking-tight">Mari bangun <br /><span className="text-muted-foreground">kesuksesan bersama.</span></h2>
              <p className="mt-6 text-muted-foreground">Kunjungi kantor pusat kami atau hubungi langsung untuk konsultasi investasi gratis.</p>

              <div className="mt-12 space-y-6">
                {[
                  { icon: MapPin, label: "Pusat", value: "Area Bisnis BSD, Tangerang" },
                  { icon: Phone, label: "Telepon", value: "+62 812-3456-7890" },
                  { icon: Mail, label: "Email", value: "partner@shosha.com" },
                  { icon: Clock, label: "Office", value: "Senin - Jumat, 09:00 - 18:00" },
                ].map((item) => (
                  <div key={item.label} className="group flex items-start gap-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{item.label}</p>
                      <p className="mt-1 font-semibold">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.2} className="lg:col-span-3">
              <div className="rounded-[2.5rem] bg-card border border-border/50 p-8 shadow-2xl lg:p-12">
                <h3 className="text-2xl font-bold">Kirim Pesan</h3>
                <p className="mt-2 text-muted-foreground">Tim kami akan merespon dalam waktu kurang dari 24 jam.</p>
                <form className="mt-10 space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1" htmlFor="name">Nama</label>
                      <input id="name" type="text" placeholder="John Doe" className="w-full rounded-2xl border border-input bg-background/50 px-5 py-4 text-sm outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1" htmlFor="phone">WhatsApp</label>
                      <input id="phone" type="tel" placeholder="08xxxx" className="w-full rounded-2xl border border-input bg-background/50 px-5 py-4 text-sm outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1" htmlFor="message">Pesan</label>
                    <textarea id="message" rows={4} placeholder="Saya tertarik berinvestasi..." className="w-full resize-none rounded-2xl border border-input bg-background/50 px-5 py-4 text-sm outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10" />
                  </div>
                  <Button className="w-full rounded-2xl gap-2 font-bold py-7" size="lg">
                    <Send className="h-5 w-5" />
                    Kirim Penawaran
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
