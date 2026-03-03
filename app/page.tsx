'use client';

import { useRouter } from 'next/navigation';

export default function WelcomePage() {

  const router = useRouter();

  const units = [
    { name: "Pahlawan", path: "/units-pahlawan" },
    { name: "Radio Dalam Lama", path: "/units-rd-lama" },
    { name: "Assirot", path: "/units-assirot" },
    { name: "Petukangan Baru", path: "/units-petukangan-baru" },
    { name: "Kemanggisan Pulo", path: "/units-k-pulo" },
    { name: "Cipete Utara", path: "/units-cipete-utara" },
    { name: "Kpbd", path: "/units-kpbd" },
    { name: "Ciledug", path: "/units-ciledug" },
  ];

  return (
    <main className="relative min-h-screen flex justify-center pt-20 pb-20 px-6">

      {/* BACKGROUND */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/background.png')" }}
      />

      <div className="absolute inset-0 bg-white/40" />

      {/* QR INSTAGRAM */}
      <div className="absolute right-12 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3">

        <p className="text-sm font-medium text-gray-700">
          Scan Instagram
        </p>

        <img
          src="/qr-instagram.jpeg"
          alt="Instagram QR"
          className="
          w-32
          drop-shadow-lg
          hover:scale-110
          transition
          duration-300
          rounded-sm
        "
        />

      </div>

      {/* CARD */}
      <section className="
      relative
      w-full
      max-w-xl
      bg-[#F97316]
      rounded-2xl
      shadow-2xl
      px-16
      pt-14
      pb-10
      flex
      flex-col
      items-center
      text-white
      ">

        {/* SOCIAL ICONS */}
        <div className="absolute top-5 left-6 flex gap-3">

          {/* Instagram */}
          <a
            href="https://instagram.com"
            target="_blank"
            className="
            w-10
            h-10
            flex
            items-center
            justify-center
            bg-white/90
            rounded-full
            shadow
            transition
            duration-300
            hover:scale-110
            hover:rotate-6
            hover:bg-[#FACC15]
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-gray-800"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M7.75 2C4.57 2 2 4.57 2 7.75v8.5C2 19.43 4.57 22 7.75 22h8.5C19.43 22 22 19.43 22 16.25v-8.5C22 4.57 19.43 2 16.25 2h-8.5zm4.25 5.2A4.8 4.8 0 1 1 7.2 12 4.8 4.8 0 0 1 12 7.2zm0 1.8A3 3 0 1 0 15 12a3 3 0 0 0-3-3zm4.6-2.2a1.2 1.2 0 1 1-1.2 1.2 1.2 1.2 0 0 1 1.2-1.2z"/>
            </svg>
          </a>

          {/* Facebook */}
          <a
            href="https://facebook.com"
            target="_blank"
            className="
            w-10
            h-10
            flex
            items-center
            justify-center
            bg-white/90
            rounded-full
            shadow
            transition
            duration-300
            hover:scale-110
            hover:rotate-6
            hover:bg-[#FACC15]
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-gray-800"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M22 12a10 10 0 1 0-11.56 9.87v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.23.19 2.23.19v2.45h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.88h-2.33v6.99A10 10 0 0 0 22 12z"/>
            </svg>
          </a>

        </div>

        {/* LOGO */}
        <img
          src="/logo2.jpg"
          alt="Sho-Sha Laundry"
          className="
          w-24
          h-24
          rounded-full
          object-cover
          border-2
          border-white
          mb-5
          "
        />

        {/* TITLE */}
        <h1 className="
        text-center
        text-4xl
        font-semibold
        tracking-tight
        leading-tight
        mb-6
        ">
          SHO-SHA <br />
          LAUNDRY
        </h1>

        {/* PROFIL */}
        <button
          onClick={() => router.push('/home')}
          className="
          w-full
          max-w-[360px]
          bg-[#FFF7ED]
          text-gray-800
          rounded-2xl
          py-4
          text-lg
          font-semibold
          shadow-md
          transition
          duration-300
          hover:bg-[#FACC15]
          hover:scale-[1.03]
          hover:shadow-xl
          mb-8
          "
        >
          PROFIL PERUSAHAAN
        </button>

        {/* DIVIDER */}
        <div className="w-full max-w-[360px] h-px bg-white/40 mb-5"/>

        {/* CABANG */}
        <p className="
        text-base
        uppercase
        tracking-widest
        text-white/90
        mb-6
        ">
          Cabang
        </p>

        {/* UNITS */}
        <div className="
        w-full
        flex
        flex-col
        items-center
        gap-5
        ">

          {units.map((unit) => (

            <button
              key={unit.path}
              onClick={() => router.push(unit.path)}
              className="
              w-full
              max-w-[360px]
              bg-[#FFF7ED]
              text-gray-800
              rounded-2xl
              py-4
              text-lg
              font-medium
              shadow-sm
              transition
              duration-300
              hover:bg-[#FACC15]
              hover:scale-[1.03]
              hover:shadow-xl
              "
            >
              {unit.name}
            </button>

          ))}

        </div>

        {/* COPYRIGHT */}
        <p className="
        text-sm
        text-white/80
        mt-10
        tracking-wide
        ">
          © {new Date().getFullYear()} SHO-SHA Laundry
        </p>

      </section>

    </main>
  );
}
