import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-center">
        Please pick a Game to continue
      </h1>
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-center justify-center w-full max-w-2xl">
        <Link href="/Valorant" className="w-32 h-32 md:w-40 md:h-40 lg:w-[150px] lg:h-[150px] rounded-full overflow-hidden relative hover:scale-110 transition-transform duration-200 cursor-pointer shadow-lg">
          <Image
            src="https://cdn.iconscout.com/icon/free/png-512/free-valorant-logo-icon-download-in-svg-png-gif-file-formats--games-multiplayer-brand-filled-line-pack-logos-icons-2724649.png?f=webp&w=256"
            alt="Valorant"
            fill
            className="object-cover"
            unoptimized
          />
        </Link>
        <Link href="/League" className="w-32 h-32 md:w-40 md:h-40 lg:w-[150px] lg:h-[150px] rounded-full overflow-hidden relative hover:scale-110 transition-transform duration-200 cursor-pointer shadow-lg">
          <Image
            src="https://logos-world.net/wp-content/uploads/2023/02/LoL-Symbol.png"
            alt="League Of Legends"
            fill
            className="object-cover"
            unoptimized
          />
        </Link>
        <Link href="/Fortnite" className="w-32 h-32 md:w-40 md:h-40 lg:w-[150px] lg:h-[150px] rounded-full overflow-hidden relative hover:scale-110 transition-transform duration-200 cursor-pointer shadow-lg">
          <Image
            src="https://dev.epicgames.com/community/api/documentation/image/meta_tag?path=en-us/fortnite-creative/storm-circle&application_version=1.0"
            alt="Fortnite"
            fill
            className="object-cover"
            unoptimized
          />
        </Link>
      </div>
    </div>
  );
}