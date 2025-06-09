import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/navbar";
import Slideshow  from "./components/Slideshow"; // Changed from "../components/Navbar"

export default function Home() {
  return (
    // <div className="flex flex-col items-center justify-center min-h-screen gap-8 px-4 py-8">
    //   <h1 className="text-2xl md:text-3xl font-bold text-center">
    //     Please pick a Game to continue
    //   </h1>
    //   <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-center justify-center w-full max-w-2xl">
    //     <Link href="/Valorant" className="w-32 h-32 md:w-40 md:h-40 lg:w-[150px] lg:h-[150px] rounded-full overflow-hidden relative hover:scale-110 transition-transform duration-200 cursor-pointer shadow-lg">
    //       <Image
    //         src="https://cdn.iconscout.com/icon/free/png-512/free-valorant-logo-icon-download-in-svg-png-gif-file-formats--games-multiplayer-brand-filled-line-pack-logos-icons-2724649.png?f=webp&w=256"
    //         alt="Valorant"
    //         fill
    //         className="object-cover"
    //         unoptimized
    //       />
    //     </Link>
    //     <Link href="/League" className="w-32 h-32 md:w-40 md:h-40 lg:w-[150px] lg:h-[150px] rounded-full overflow-hidden relative hover:scale-110 transition-transform duration-200 cursor-pointer shadow-lg">
    //       <Image
    //         src="https://logos-world.net/wp-content/uploads/2023/02/LoL-Symbol.png"
    //         alt="League Of Legends"
    //         fill
    //         className="object-cover"
    //         unoptimized
    //       />
    //     </Link>
    //     <Link href="/Fortnite" className="w-32 h-32 md:w-40 md:h-40 lg:w-[150px] lg:h-[150px] rounded-full overflow-hidden relative hover:scale-110 transition-transform duration-200 cursor-pointer shadow-lg">
    //       <Image
    //         src="https://dev.epicgames.com/community/api/documentation/image/meta_tag?path=en-us/fortnite-creative/storm-circle&application_version=1.0"
    //         alt="Fortnite"
    //         fill
    //         className="object-cover"
    //         unoptimized
    //       />
    //     </Link>
    //   </div>
    // </div>

      <div>
        <Navbar />
          <div className="mt-8">
            <h1 className="text-pretty font-semibold text-center text-5xl font-[Open_Sans]">Welcome to WebName</h1>
            <div className="text-center text-wrap max-w-lg mx-auto p-4 text-100 leading-normal">
              <b>Lorem Ipsum</b> is simply dummy text of the printing and typesetting industry. 
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
              when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
              It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
              It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
              and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </div>
          </div>
          <div className="mt-8">
            <Slideshow />
          </div>
          <div className="mt-8 grid grid-cols-4 gap-4">
            <div className="text-center bg-amber-50 text-black rounded-md p-4">
              <b>Lorem Ipsum</b> is simply dummy text of the printing and typesetting industry. 
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
              when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
              It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
              It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
              and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </div>
            <div className="text-center bg-amber-50 text-black rounded-md p-4">
              <b>Lorem Ipsum</b> is simply dummy text of the printing and typesetting industry. 
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
              when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
              It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
              It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
              and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </div>
            <div className="text-center bg-amber-50 text-black rounded-md p-4">
              <b>Lorem Ipsum</b> is simply dummy text of the printing and typesetting industry. 
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
              when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
              It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
              It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
              and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </div>
            <div className="text-center bg-amber-50 text-black rounded-md p-4">
              <b>Lorem Ipsum</b> is simply dummy text of the printing and typesetting industry. 
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
              when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
              It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
              It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
              and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </div>
          </div>
          <div className="h-40">

          </div>
      </div>
  );
}

function nextFunc()
{

}