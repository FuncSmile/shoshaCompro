'use client';

import { useRouter } from 'next/navigation';

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

export default function WelcomePage() {

  const router = useRouter();

  const outlets = [
    { name: "Pahlawan", address: "Kebon Jeruk, Kota Jakarta Barat", icon: "/units-raw/pahlawan.png" },
    { name: "Radio Dalam Lama", address: " Kebayoran Baru, Jakarta", icon: "/units-raw/rd_lama.jpg" },
    { name: "Assirot", address: "Kebon Jeruk, Kota Jakarta Selatan", icon: "/units-raw/assirot.png" },
    { name: "Ciledug", address: "Karang Tengah, Kota Tangerang", icon: "/units/ciledug.jpg" },
    { name: "Cipete Utara", address: "Kebayoran Baru, Kota Jakarta Selatan", icon: "/units/cipete.jpg" }, 
    { name: "Kebon Mangga", address: "Kebayoran Lama, Kota Jakarta Selatan", icon: "" },
    { name: "Kemanggisan Pulo", address: "Palmerah, Kota Jakarta Barat", icon: "/units-raw/pulo.png" }, 
    { name: "KPBD", address: "Kebon Jeruk, Kota Jakarta Barat", icon: "/units-raw/kpbd.png" },
    { name: "Madrasah", address: "Cilandak, Kota Jakarta Selatan", icon: "/units/madrasah.jpg" },
    { name: "Petukangan Baru", address: "Pesanggrahan, Kota Jakarta Selatan", icon: "" },
    { name: "Petukangan Lama", address: "Pesanggrahan, Kota Jakarta Selatan", icon: "/units-raw/ptk_lama.png" },
    { name: "Radio Dalam 24 Jam", address: "Kebayoran Baru, Kota Jakarta Selatan", icon: "/units/rd24j2.jpg" },
    { name: "Tanah Kusir", address: "Kebayoran Lama, Kota Jakarta Selatan", icon: "/units/tanah_kusir.jpg" },
  ].map(outlet => ({
    ...outlet,
    path: `/outlets/${slugify(outlet.name)}`,
  }));

  return (
    <main className="relative min-h-screen flex justify-center pt-20 pb-20 px-6">
      {/* bg-[#FFF9E3] */}
      {/* Here to change BACKGROUND to Image*/}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/mesin/mesin1_rdlama.jpg')" }}
      />

      <div className="absolute inset-0 bg-white/40"/>

      {/* QR INSTAGRAM */}
      <div className="absolute right-4 xl:right-12 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3">
        <p className="text-sm font-medium text-gray-700">Scan Instagram</p>
        <img
          src="/assets/qr_instagram.jpeg"
          alt="Instagram QR"
          className="w-32 drop-shadow-lg hover:scale-110 transition duration-300 rounded-sm"
        />
      </div>

      {/* CARD with transparent orange */}
      <section className="
        relative
        w-full
        max-w-full
        sm:max-w-xl
        md:max-w-2xl
        lg:max-w-xl
        bg-[#F97316]/80
        rounded-2xl
        shadow-2xl
        px-6
        sm:px-10
        md:px-16
        pt-14
        pb-10
        flex
        flex-col
        items-center
        text-white
      ">

        {/* SOCIAL ICONS */}
        <div className="absolute top-5 left-4 sm:left-6 flex gap-4">
          {/* Instagram */}
          <a
            href="https://instagram.com/shoshalaundryofficial"
            target="_blank"
            className="
              w-12 h-12 flex items-center justify-center
              bg-white/90 rounded-full shadow-lg
              transition duration-300 hover:scale-110 hover:rotate-6 hover:bg-[#FACC15]
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-gray-800"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M7.75 2C4.57 2 2 4.57 2 7.75v8.5C2 19.43 4.57 22 7.75 22h8.5C19.43 22 22 19.43 22 16.25v-8.5C22 4.57 19.43 2 16.25 2h-8.5zm4.25 5.2A4.8 4.8 0 1 1 7.2 12 4.8 4.8 0 0 1 12 7.2zm0 1.8A3 3 0 1 0 15 12a3 3 0 0 0-3-3zm4.6-2.2a1.2 1.2 0 1 1-1.2 1.2 1.2 1.2 0 0 1 1.2-1.2z"/>
            </svg>
          </a>

          {/* Facebook */}
          <a
            href="https://www.facebook.com/profile.php?id=100087515256650"
            target="_blank"
            className="
              w-12 h-12 flex items-center justify-center
              bg-white/90 rounded-full shadow-lg
              transition duration-300 hover:scale-110 hover:rotate-6 hover:bg-[#FACC15]
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-gray-800"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M22 12a10 10 0 1 0-11.56 9.87v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.23.19 2.23.19v2.45h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.88h-2.33v6.99A10 10 0 0 0 22 12z"/>
            </svg>
          </a>
        </div>

        {/* LOGO */}
        <img
          src="/assets/logo.svg"
          alt="Sho-Sha Laundry"
          className="
            w-24 h-24 bg-yellow-400 rounded-full object-cover shadow-lg mt-10 mb-5
          "
        />

        {/* TITLE */}
        <h1 className="text-center text-4xl font-semibold tracking-tight leading-tight">
          SHO-SHA <br />
          LAUNDRY
        </h1>

        {/* SLOGAN */}
        <p className="text-center text-sm sm:text-base text-white/90 max-w-xs sm:max-w-sm mt-3 mb-8 italic">
          “Bersih, Wangi, dan Praktis – Laundry Autopilot untuk Hidup Lebih Mudah”
        </p>

        {/* PROFIL */}
        <button
          onClick={() => router.push('/home')}
          className="
            w-full bg-[#FFF7ED] text-gray-800 rounded-full py-4
            text-lg font-semibold shadow-md transition duration-300
            hover:bg-[#FACC15] hover:scale-[1.03] hover:shadow-xl
            mb-8
          "
        >
          PROFIL PERUSAHAAN
        </button>

        {/* DIVIDER */}
        <div className="w-full max-w-[360px] h-px bg-white/40 mb-5"/>

        {/* CABANG */}
        <p className="text-base uppercase tracking-widest text-white/90 mb-6">
          Cabang
        </p>

        {/* UNITS */}
        <div className="w-full flex flex-col items-center gap-4">
          {outlets.map((outlet) => (
            <button
              key={outlet.path}
              onClick={() => router.push(outlet.path)}
              className="
                w-full bg-[#FFF7ED] text-gray-800 rounded-2xl py-3 px-4
                flex items-center gap-3
                shadow-sm transition duration-300
                hover:bg-[#FACC15] hover:scale-[1.02] hover:shadow-xl
                text-left
              "
            >
              {/* Outlet Icon */}
              <span className="shrink-0 w-10 h-10 rounded-full overflow-hidden bg-white shadow-sm flex items-center justify-center">
                <img 
                  src={outlet.icon || "/mesin/mesin1_rdlama.jpg"}
                  alt={`Outlet ${outlet.name}`}
                  className="w-full h-full object-cover"
                />
              </span>

              {/* Name and Address */}
              <div className="flex-1">
                <div className="font-semibold text-base sm:text-lg">{outlet.name}</div>
                <div className="text-xs sm:text-sm text-gray-600">{outlet.address}</div>
              </div>
            </button>
          ))}
        </div>
        
        {/* DIVIDER */}
        <div className="w-full max-w-[360px] h-px bg-white/40 mt-10"/>

        {/* COPYRIGHT */}
        <p className="text-sm text-white/80 mt-5 tracking-wide">
          © {new Date().getFullYear()} SHO-SHA Laundry
        </p>
      </section>
    </main>
  );
}