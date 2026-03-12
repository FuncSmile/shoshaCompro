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

export default function AssirotOutlet() {

  const position: [number, number] = [-6.236778, 106.789401];
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
          backgroundImage: "url('/units-raw/assirot.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 text-center px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Outlet Assirot
          </h1>

          <p className="max-w-xl mx-auto text-lg text-white/90">
            Cabang Sho-Sha Laundry dengan layanan cepat, bersih, dan modern
            untuk memenuhi kebutuhan cucian Anda.
          </p>
        </div>
      </section>

      {/* SECTION INFO */}
      <section className="py-20 px-6 bg-white">

        <div className="text-center mb-14">
          <h3 className="text-3xl font-bold text-accent inline-block relative">
            Tentang Outlet
            <span className="block w-14 h-[3px] bg-primary mx-auto mt-3 rounded-full"></span>
          </h3>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-stretch">

          {/* LEFT */}
          <div className="flex flex-col gap-8">

            <p className="text-gray-600 leading-relaxed text-justify">
              Outlet Assirot merupakan salah satu cabang Sho-Sha Laundry yang
              melayani berbagai kebutuhan laundry seperti cuci kiloan,
              laundry satuan, hingga layanan express. Dengan mesin modern
              dan proses yang higienis, kami memastikan pakaian pelanggan
              kembali bersih, wangi, dan rapi.
              <br />
              Berlokasi di Grogol Selatan, Kebon Jeruk, Kota Jakarta Selatan,
              outlet ini mudah dijangkau oleh masyarakat sekitar.
            </p>

            <div className="grid grid-cols-2 grid-rows-2 gap-4">

              <img
                src="/units-raw/assirot.png"
                className="col-span-2 w-full object-cover rounded-xl shadow-md hover:scale-[1.02] transition aspect-[16/9]"
              />

              <img
                src="/units-raw/assirot.png"
                className="w-full object-cover rounded-xl shadow-md hover:scale-[1.02] transition aspect-[4/3]"
              />

              <img
                src="/units-raw/assirot.png"
                className="w-full object-cover rounded-xl shadow-md hover:scale-[1.02] transition aspect-[4/3]"
              />

            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col gap-6">

            {/* MAP */}
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
                          href="https://maps.app.goo.gl/WqT87RSq6Za9DS8N7"
                          className="flex justify-center font-semibold"
                        >
                          Cabang Assirot
                        </a>
                        Kebon Jeruk, Jakarta Barat
                      </Popup>
                    </Marker>

                  </MapContainer>
                )}

              </div>
            </div>

            {/* CONTACT */}
            <div className="bg-orange-400 rounded-2xl p-6 shadow-md space-y-4">

              <div className="flex items-start gap-3">
                <MapPin className="text-accent w-5 h-5 shrink-0 mt-1" />
                <p className="text-accent text-sm">
                  Jl. Assirot No.8B, Grogol Selatan,
                  Kebon Jeruk, Kota Jakarta Selatan,
                  Daerah Khusus Ibukota Jakarta 11560
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="text-accent w-5 h-5 shrink-0" />
                <span className="text-accent text-sm">
                  +62 812-8778-3962
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Instagram className="text-accent w-5 h-5 shrink-0" />
                <a
                  href="https://www.instagram.com/laundry24jamassirot"
                  target="_blank"
                  className="text-accent text-sm hover:text-white transition"
                >
                  @laundry24jamassirot
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
