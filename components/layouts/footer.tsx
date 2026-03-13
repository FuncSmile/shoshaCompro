"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Instagram, Facebook, MessageCircle } from "lucide-react";

type NavLink = {
  label: string;
  href: string;
};

interface FooterProps {
  navLinks: NavLink[];
}

export default function Footer({ navLinks }: FooterProps) {
  const pathname = usePathname();

  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/shoshalaundryofficial", label: "Instagram" },
    { icon: Facebook, href: "https://www.facebook.com/profile.php?id=100087515256650", label: "Facebook" },
    { icon: MessageCircle, href: "https://wa.me/628111774438", label: "WhatsApp" },
  ];

  return (
    <footer className="border-t border-accent-foreground/10 bg-accent px-6 py-20 text-accent-foreground">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-16 lg:grid-cols-4">
          {/* LOGO */}
          <div className="lg:col-span-1">
            <img
              src="/assets/logo.svg"
              alt="SHO SHA Logo"
              className="h-9 w-auto brightness-0 invert opacity-60"
              loading="lazy"
            />

            <p className="mt-6 text-sm leading-relaxed text-accent-foreground/50">
              Memberikan kenyamanan laundry terbaik dan peluang investasi
              autopilot paling menguntungkan di Indonesia.
            </p>

            {/* SOCIAL */}
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

          {/* NAV */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-2">
            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest text-primary">
                Navigasi
              </h4>

              <ul className="mt-6 space-y-4 text-sm text-accent-foreground/50">
                {navLinks
                  .filter((link) => link.href !== pathname)
                  .map((link) => (
                    <li
                      key={link.label}
                      className="transition-colors hover:text-primary"
                    >
                      <Link href={link.href}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>

            {/* LAYANAN */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest text-primary">
                Layanan
              </h4>

              <ul className="mt-6 space-y-4 text-sm text-accent-foreground/50">
                <li className="transition-colors hover:text-primary cursor-pointer">
                  Self-Service
                </li>
                <li className="transition-colors hover:text-primary cursor-pointer">
                  Drop-Off Laundry
                </li>
                <li className="transition-colors hover:text-primary cursor-pointer">
                  Membership TORU
                </li>
                <li className="transition-colors hover:text-primary cursor-pointer">
                  Premium Care
                </li>
              </ul>
            </div>
          </div>

          {/* KANTOR */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-primary">
              Kantor Pusat
            </h4>

            <p className="mt-6 text-sm text-accent-foreground/50 leading-relaxed">
              Jl. Pahlawan No.34, RT.1/RW.5, Sukabumi Selatan
              <br />
              Kec. Kebon Jeruk, Kota Jakarta Barat
              <br />
              Daerah Khusus Ibukota Jakarta 11560, Indonesia
            </p>

            <p className="mt-4 text-lg font-bold">
              08:00 - 20:00
            </p>

            <p className="mt-1 text-xs text-accent-foreground/30">
              Setiap hari buka
            </p>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="my-16 h-px w-full bg-accent-foreground/10" />

        {/* BOTTOM */}
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <p className="text-[10px] font-medium uppercase tracking-widest text-accent-foreground/30">
            &copy; {new Date().getFullYear()} SHO-SHA LAUNDRY. ALL RIGHTS RESERVED.
          </p>

          <div className="flex gap-8 text-[10px] font-medium uppercase tracking-widest text-accent-foreground/30">
            <Link
              href="/privacy"
              className="hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}