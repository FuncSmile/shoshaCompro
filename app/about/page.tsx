"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import {
  motion,
  useInView,
} from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Menu,
  Send,
  X,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

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

/* ─── Data (outside component — never re-created) ─── */
const navLinks = [
  { label: "Beranda", href: "/" },
  { label: "Tentang", href: "/about" },
  { label: "Kemitraan", href: "#partnership" },
  { label: "FAQ", href: "#faq" },
  { label: "Cabang", href: "#unit" },
];

const faqItems = [
  { q: "Berapa modal minimum untuk berinvestasi?", a: "Investasi mulai dari Rp 150 juta untuk satu outlet laundry lengkap termasuk mesin, interior, branding, dan biaya operasional awal." },
  { q: "Apakah saya perlu mengelola outlet sendiri?", a: "Tidak. Kami menggunakan sistem full-autopilot di mana tim kamilah yang mengelola seluruh operasional dari A sampai Z." },
  { q: "Bagaimana pembagian keuntungannya?", a: "Keuntungan bersih dibagi secara transparan berdasarkan perjanjian MoU yang disepakati bersama di awal." },
  { q: "Apakah ada jaminan keberhasilan?", a: "Kami memiliki track record 15+ tahun dan sistem yang teruji. Kami juga memberikan garansi dukungan operasional penuh." },
];

export default function About() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const toggleFaq = useCallback((i: number) => {
    setOpenFaq(prev => prev === i ? null : i);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* ═══ NAVBAR (from home) ═══ */}
      <nav className="fixed top-0 z-50 w-full">
        <div className="mx-auto max-w-7xl px-6">
          <div className={`mt-4 flex h-16 items-center justify-between rounded-2xl border border-border/50 px-8 shadow-lg shadow-black/5 backdrop-blur-xl transition-all duration-300 ${scrolled ? "bg-background/90" : "bg-background/70"}`}>
            <a href="/" className="flex items-center gap-2">
              <img src="/logo.svg" alt="SHO SHA Logo" className="h-10 w-auto" />
            </a>
            {/* Custom Right-Aligned Navigation */}
            <div className="hidden md:flex items-center ml-auto">
              <ul className="flex items-center gap-2 text-right">
                <li>
                  <a href="/" className="px-4 py-2 text-[13px] font-medium text-muted-foreground hover:text-primary transition-colors rounded-xl">Beranda</a>
                </li>
                <li>
                  <a href="/about" className="px-4 py-2 text-[13px] font-medium text-primary hover:text-primary transition-colors rounded-xl">Tentang</a>
                </li>
                <li>
                  <a href="#partnership" className="px-4 py-2 text-[13px] font-medium text-muted-foreground hover:text-primary transition-colors rounded-xl">Kemitraan</a>
                </li>
                <li>
                  <a href="#faq" className="px-4 py-2 text-[13px] font-medium text-muted-foreground hover:text-primary transition-colors rounded-xl">FAQ</a>
                </li>
                <li className="relative group">
                  <span className="px-4 py-2 text-[13px] font-medium text-muted-foreground hover:text-primary transition-colors rounded-xl flex items-center gap-1">
                    Cabang
                    <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                  </span>
                  {/* Dropdown */}
                  <div className="absolute right-0 mt-4 w-[420px] min-w-full bg-white border border-border/50 rounded-2xl shadow-xl opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-all duration-200 z-50 overflow-hidden">
                    <div className="flex flex-col divide-y divide-border/30">
                      {['Jakarta', 'Bandung', 'Surabaya', 'Semarang', 'Medan', 'Makassar', 'Bali', 'Yogyakarta'].map((city) => (
                        <a
                          key={city}
                          href={`#unit-${city.toLowerCase()}`}
                          className="px-6 py-4 text-[14px] text-right font-medium text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                        >
                          {city}
                        </a>
                      ))}
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="flex items-center gap-3">
              <Button size="sm" className="hidden rounded-xl text-xs sm:inline-flex" asChild>
                <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-1.5 h-3.5 w-3.5" />
                  Hubungi Kami
                </a>
              </Button>
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
      
      {/* ═══ HERO SECTION (from home) ═══ */}
      <section className="relative overflow-hidden px-4 pt-24 pb-16 sm:px-6 lg:flex lg:min-h-[100dvh] lg:items-center lg:pt-0 lg:pb-0">
        {/* Solid background #FAFFC5, no gradient */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute left-0 top-0 h-full w-full bg-[#FFFAE7]" />
        </div>
        {/* Animated gradient orbs — use will-change + reduced blur */}
        <div className="pointer-events-none absolute inset-0">
          <motion.div
            animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-32 top-20 h-[600px] w-[600px] rounded-full bg-primary/10 blur-[80px] will-change-transform"
          />
          <motion.div
            animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-32 bottom-20 h-[500px] w-[500px] rounded-full bg-accent/8 blur-[80px] will-change-transform"
          />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Left Column: Text Content */}
            <div className="text-center lg:text-left">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="text-[2.25rem] font-extrabold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
              >
                <span className="block">Tentang</span>
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">
                    SHO SHA
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
                className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:mt-8 sm:text-lg md:text-xl lg:mx-0"
              >
                Pelopor sistem <span className="font-semibold text-foreground">laundry autopilot</span> di Indonesia sejak 2010. Kami menghadirkan solusi investasi pasif yang transparan dan terpercaya.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="mt-7 flex flex-col items-center gap-3 sm:mt-10 sm:flex-row sm:gap-4 lg:justify-start"
              >
                <Button size="lg" className="group w-full gap-2 rounded-xl px-8 text-base shadow-xl shadow-primary/20 sm:w-auto" asChild>
                  <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer">
                    Konsultasi Gratis
                    <ChevronDown className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
                <Button size="lg" variant="ghost" className="w-full gap-2 rounded-xl text-base text-muted-foreground sm:w-auto" asChild>
                  <a href="#faq">
                    Pelajari Lebih Lanjut
                    <ChevronDown className="h-4 w-4" />
                  </a>
                </Button>
              </motion.div>
            </div>

            {/* Right Column: Hero Image — hidden on mobile, shown from lg */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative hidden lg:block"
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 z-0">
                <div className="absolute top-10 right-10 w-32 h-32 bg-orange-200 rounded-full opacity-20 blur-xl" />
                <div className="absolute bottom-20 left-10 w-40 h-40 bg-blue-200 rounded-full opacity-20 blur-xl" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-orange-100 to-blue-100 rounded-full opacity-10 blur-3xl" />
              </div>
              
              <div className="relative z-10 flex justify-center">
                <img
                  src="/hero.png"
                  alt="SHO SHA About Image"
                  className="h-[650px] w-auto object-contain drop-shadow-2xl"
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ FAQ SECTION ═══ */}
      <section
        id="faq"
        className="relative px-6 py-28 overflow-hidden"
      >
        <div className="mx-auto max-w-4xl">
          <FadeIn className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">FAQ</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Pertanyaan <span className="text-muted-foreground">Umum.</span>
            </h2>
          </FadeIn>
          <div className="mt-16 space-y-4">
            {faqItems.map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div
                  className={`rounded-3xl border border-border/50 transition-all duration-300 ${openFaq === i ? "bg-muted border-primary/20 shadow-lg" : "bg-card"}`}
                >
                  <button
                    className="flex w-full items-center justify-between px-8 py-6 text-left"
                    onClick={() => toggleFaq(i)}
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

      {/* ═══ CONTACT SECTION ═══ */}
      <section id="contact" className="relative px-6 py-28 overflow-hidden">
        {/* Static blobs — CSS only */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-1/4 top-0 h-[500px] w-[500px] animate-[pulse_20s_ease-in-out_infinite] rounded-full bg-primary/5 blur-[80px]" />
          <div className="absolute -right-1/4 bottom-0 h-[600px] w-[600px] animate-[pulse_25s_ease-in-out_infinite] rounded-full bg-secondary/5 blur-[80px]" />
        </div>
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

      {/* ═══ FOOTER (from home) ═══ */}
      <footer className="border-t border-accent-foreground/10 bg-accent px-6 py-20 text-accent-foreground">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-16 lg:grid-cols-4">
            <div className="lg:col-span-1">
              <img src="/logo.svg" alt="SHO SHA Logo" className="h-9 w-auto brightness-0 invert opacity-60" />
              <p className="mt-6 text-sm leading-relaxed text-accent-foreground/50">
                Memberikan kenyamanan laundry terbaik dan peluang investasi autopilot paling menguntungkan di Indonesia.
              </p>
              <div className="mt-8 flex gap-3">
                {[<MessageCircle key="message" />].map((Icon, i) => (
                  <a key={i} href="#" className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent-foreground/5 text-accent-foreground/40 transition-all hover:bg-primary hover:text-primary-foreground hover:scale-110">
                    {Icon}
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