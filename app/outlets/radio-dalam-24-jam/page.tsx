"use client";

import dynamic from "next/dynamic";
import { Instagram, MapPin, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import Footer from "@/components/layouts/footer";

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);

const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);

const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

export default function RadioDalam24JamOutlet() {

  const position: [number, number] = [-6.262761, 106.789816];
  const [markerIcon, setMarkerIcon] = useState<any>(null);

  useEffect(() => {
    import("leaflet").then((L) => {
      const icon = new L.Icon({
        iconUrl: "/assets/point.gif",
        iconSize: [70, 70],
        iconAnchor: [36, 50],
      });

      setMarkerIcon(icon);
    });
  }, []);

  const navLinks = [
    { label: "Beranda", href: "/home" },
    { label: "Tentang Kami", href: "/about" },
    { label: "Kemitraan", href: "/partnership" },
    { label: "FAQ", href: "/faq" },
  ];

  return (
    <main className="min-h-screen flex flex-col">
      {/* HERO */}
      <section
        className="relative h-[70vh] flex items-center justify-center text-white"
        style={{
          backgroundImage: "url('/units/rd24j2.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 text-center px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Outlet Radio Dalam 24 Jam
          </h1>

          <p className="max-w-xl mx-auto text-lg text-white/90">
            Cabang Sho-Sha Laundry dengan layanan cepat, bersih, dan modern
            untuk memenuhi kebutuhan cucian Anda.
          </p>
        </div>
      </section>

      {/* SECTION INFO */}
      <section className="py-20 px-6 bg-white">
        {/* TITLE */}
        <div className="text-center mb-14">
          <h3 className="text-3xl font-bold text-accent inline-block relative">
            Tentang Outlet
            <span className="block w-14 h-[3px] bg-primary mx-auto mt-3 rounded-full"></span>
          </h3>
        </div>

        {/* WRAPPER GRID */}
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-stretch">
          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-8">
            <p className="text-gray-600 leading-relaxed text-justify">
              Outlet Radio Dalam 24 Jam merupakan salah satu cabang Sho-Sha Laundry yang melayani berbagai kebutuhan laundry seperti cuci kiloan, laundry satuan, hingga layanan express. Dengan mesin modern dan proses yang higienis, kami memastikan pakaian pelanggan kembali bersih, wangi, dan rapi.
              <br />
              Berlokasi di Gandaria Utara, Kebayoran Baru, Jakarta Selatan, outlet ini mudah dijangkau oleh masyarakat sekitar.
            </p>

            {/* GALLERY */}
            <div className="grid grid-cols-2 grid-rows-2 gap-4">
              {/* WIDE SIZE */}
              <img
                src="/units/rd24j2.jpg"
                alt="Wide Outlet Image"
                className="col-span-2 w-full object-cover rounded-xl shadow-md hover:scale-[1.02] transition aspect-[16/9]"
              />

              {/* NORMAL SIZE */}
              <img
                src="/gallery/galeri1.jpg"
                alt="Normal Outlet Image"
                className="w-full object-cover rounded-xl shadow-md hover:scale-[1.02] transition aspect-[4/3]"
              />

              {/* NORMAL SIZE */}
              <img
                src="/gallery/galeri2.jpg"
                alt="Normal Outlet Image"
                className="w-full object-cover rounded-xl shadow-md hover:scale-[1.02] transition aspect-[4/3]"
              />
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col gap-6">
            {/* MAP FRAME */}
            <div className="p-[3px] bg-primary rounded-2xl shadow-xl flex-1">
              <div className="w-full h-full rounded-xl overflow-hidden bg-white min-h-[280px]">
                {markerIcon && (
                  <MapContainer
                    center={position}
                    zoom={16}
                    scrollWheelZoom={true}
                    style={{ height: "100%", width: "100%" }}
                  >

                  <TileLayer
                    attribution="&copy; OpenStreetMap contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />

                  <Marker position={position} icon={markerIcon}>
                    <Popup>
                      <a
                        href="https://maps.app.goo.gl/ZEVWS3RQeSUwa2g56"
                        className="flex justify-center font-semibold"
                      >
                        Cabang Radio Dalam 24 Jam
                      </a>
                      Kebayoran Baru, Jakarta Selatan
                    </Popup>
                  </Marker>
                </MapContainer>
                )}
              </div>
            </div>

            {/* CONTACT CARD */}
            <div className="bg-orange-400 rounded-2xl p-6 shadow-md space-y-4">
              {/* LOCATION */}
              <div className="flex items-start gap-3">
                <MapPin className="text-accent w-5 h-5 shrink-0 mt-1" />
                <p className="text-accent text-sm">
                  Jl. Ps. Inpres No.80a, RT.4/RW.14, Gandaria Utara,
                  Kec. Kebayoran Baru, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12140
                </p>
              </div>

              {/* PHONE */}
              <div className="flex items-center gap-3">
                <Phone className="text-accent w-5 h-5 shrink-0" />
                <a 
                  href="https://wa.me/6281299531535"
                  target="_blank"
                  className="text-accent text-sm">
                  +62 812-9953-1535
                </a>
              </div>

              {/* INSTAGRAM */}
              <div className="flex items-center gap-3">
                <Instagram className="text-accent w-5 h-5 shrink-0" />
                <a
                  href="https://www.instagram.com/laundry24jamradiodalam"
                  target="_blank"
                  className="text-accent text-sm hover:text-white transition"
                >
                  @laundry24jamradiodalam
                </a>
              </div>

              {/* TIKTOK */}
              <div className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="1 0 24 24"
                  className="w-6 h-6 text-accent shrink-0"
                  fill="currentColor"
                >
                  <path d="M16.5 3c.3 1.9 1.8 3.5 3.7 3.9v2.7c-1.5 0-3-.5-4.2-1.4v6.4a6 6 0 1 1-6-6c.3 0 .6 0 .9.1v2.8c-.3-.1-.6-.1-.9-.1a3.2 3.2 0 1 0 3.2 3.2V2.9h2.3z"/>
                </svg>

                <a
                  href="https://www.tiktok.com/@laundry24jamradiodalam"
                  target="_blank"
                  className="ml-[-4px] text-gray-700 text-sm hover:text-white transition"
                >
                  @laundry24jamradiodalam
                </a>
              </div>
            </div>
          </div>
          
        </div>
      </section>
      <Footer navLinks={navLinks} />
    </main>
  );
}