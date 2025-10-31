'use client';

import React from 'react';
import Image from "next/image";
import ChampionDetailsModal from '../../components/ChampionDetailsModal';
import { useEffect, useState } from "react"; 
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/Footer";
import { useSearchParams } from "next/navigation";

export default function ChampionsPage() {

    const searchParams = useSearchParams();
    const [ddData, setddVersion] = useState([]);
    const [freeChamp, setfreeChamp] = useState<string[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedChampion, setSelectedChampion] = useState("");

    useEffect(() => {

    const champName = searchParams.get("champion");

    if (champName && champions.find(champion => champion.image === champName)) 
    {
        setSelectedChampion(champName);
        openChampionModel(champName);
    } else 
    {
        console.log('Champion not found in dictionary');
    }

    const fetchData = async () => {
      try {
        const ddVersion = await fetch(`https://ddragon.leagueoflegends.com/api/versions.json`);
        const json = await ddVersion.json();

        const freeChampRotation = await fetch(`https://localhost:44365/Riot/GetFreeCharacters`);
        const freeChampJson = await freeChampRotation.json();
        console.log("Free Champ Rotation:", freeChampJson);

        setddVersion(json);
        setfreeChamp(freeChampJson);
      } catch (err) {
        console.error(err);
      } finally {
        console.log("Fetch attempt finished.");
      }
    };

    fetchData();
  }, []);

const champions = [
    { name: "Aatrox", image: "Aatrox" },
    { name: "Ahri", image: "Ahri" },
    { name: "Akali", image: "Akali" },
    { name: "Akshan", image: "Akshan" },
    { name: "Alistar", image: "Alistar" },
    { name: "Ambessa", image: "Ambessa" },
    { name: "Amumu", image: "Amumu" },
    { name: "Anivia", image: "Anivia" },
    { name: "Annie", image: "Annie" },
    { name: "Aphelios", image: "Aphelios" },
    { name: "Ashe", image: "Ashe" },
    { name: "Aurelion Sol", image: "AurelionSol" },
    { name: "Aurora", image: "Aurora" },
    { name: "Azir", image: "Azir" },
    { name: "Bard", image: "Bard" },
    { name: "Bel'Veth", image: "Belveth" },
    { name: "Blitzcrank", image: "Blitzcrank" },
    { name: "Brand", image: "Brand" },
    { name: "Braum", image: "Braum" },
    { name: "Briar", image: "Briar" },
    { name: "Caitlyn", image: "Caitlyn" },
    { name: "Camille", image: "Camille" },
    { name: "Cassiopeia", image: "Cassiopeia" },
    { name: "Cho'Gath", image: "Chogath" },
    { name: "Corki", image: "Corki" },
    { name: "Darius", image: "Darius" },
    { name: "Diana", image: "Diana" },
    { name: "Draven", image: "Draven" },
    { name: "Dr. Mundo", image: "DrMundo" },
    { name: "Ekko", image: "Ekko" },
    { name: "Elise", image: "Elise" },
    { name: "Evelynn", image: "Evelynn" },
    { name: "Ezreal", image: "Ezreal" },
    { name: "FiddleSticks", image: "Fiddlesticks" },
    { name: "Fiora", image: "Fiora" },
    { name: "Fizz", image: "Fizz" },
    { name: "Galio", image: "Galio" },
    { name: "Gangplank", image: "Gangplank" },
    { name: "Garen", image: "Garen" },
    { name: "Gnar", image: "Gnar" },
    { name: "Gragas", image: "Gragas" },
    { name: "Graves", image: "Graves" },
    { name: "Gwen", image: "Gwen" },
    { name: "Hecarim", image: "Hecarim" },
    { name: "Heimerdinger", image: "Heimerdinger" },
    { name: "Hwei", image: "Hwei" },
    { name: "Illaoi", image: "Illaoi" },
    { name: "Irelia", image: "Irelia" },
    { name: "Ivern", image: "Ivern" },
    { name: "Janna", image: "Janna" },
    { name: "Jarvan IV", image: "JarvanIV" },
    { name: "Jax", image: "Jax" },
    { name: "Jayce", image: "Jayce" },
    { name: "Jhin", image: "Jhin" },
    { name: "Jinx", image: "Jinx" },
    { name: "Kai'Sa", image: "Kaisa" },
    { name: "Kalista", image: "Kalista" },
    { name: "Karma", image: "Karma" },
    { name: "Karthus", image: "Karthus" },
    { name: "Kassadin", image: "Kassadin" },
    { name: "Katarina", image: "Katarina" },
    { name: "Kayle", image: "Kayle" },
    { name: "Kayn", image: "Kayn" },
    { name: "Kennen", image: "Kennen" },
    { name: "Kha'Zix", image: "Khazix" },
    { name: "Kindred", image: "Kindred" },
    { name: "Kled", image: "Kled" },
    { name: "Kog'Maw", image: "KogMaw" },
    { name: "K'Sante", image: "KSante" },
    { name: "LeBlanc", image: "Leblanc" },
    { name: "Lee Sin", image: "LeeSin" },
    { name: "Leona", image: "Leona" },
    { name: "Lillia", image: "Lillia" },
    { name: "Lissandra", image: "Lissandra" },
    { name: "Lucian", image: "Lucian" },
    { name: "Lulu", image: "Lulu" },
    { name: "Lux", image: "Lux" },
    { name: "Malphite", image: "Malphite" },
    { name: "Malzahar", image: "Malzahar" },
    { name: "Maokai", image: "Maokai" },
    { name: "Master Yi", image: "MasterYi" },
    { name: "Mel", image: "Mel" },
    { name: "Milio", image: "Milio" },
    { name: "Miss Fortune", image: "MissFortune" },
    { name: "Mordekaiser", image: "Mordekaiser" },
    { name: "Morgana", image: "Morgana" },
    { name: "Naafiri", image: "Naafiri" },
    { name: "Nami", image: "Nami" },
    { name: "Nasus", image: "Nasus" },
    { name: "Nautilus", image: "Nautilus" },
    { name: "Neeko", image: "Neeko" },
    { name: "Nidalee", image: "Nidalee" },
    { name: "Nilah", image: "Nilah" },
    { name: "Nocturne", image: "Nocturne" },
    { name: "Nunu & Willump", image: "Nunu" },
    { name: "Olaf", image: "Olaf" },
    { name: "Orianna", image: "Orianna" },
    { name: "Ornn", image: "Ornn" },
    { name: "Pantheon", image: "Pantheon" },
    { name: "Poppy", image: "Poppy" },
    { name: "Pyke", image: "Pyke" },
    { name: "Qiyana", image: "Qiyana" },
    { name: "Quinn", image: "Quinn" },
    { name: "Rakan", image: "Rakan" },
    { name: "Rammus", image: "Rammus" },
    { name: "Rek'Sai", image: "RekSai" },
    { name: "Rell", image: "Rell" },
    { name: "Renata Glasc", image: "Renata" },
    { name: "Renekton", image: "Renekton" },
    { name: "Rengar", image: "Rengar" },
    { name: "Riven", image: "Riven" },
    { name: "Rumble", image: "Rumble" },
    { name: "Ryze", image: "Ryze" },
    { name: "Samira", image: "Samira" },
    { name: "Sejuani", image: "Sejuani" },
    { name: "Senna", image: "Senna" },
    { name: "Seraphine", image: "Seraphine" },
    { name: "Sett", image: "Sett" },
    { name: "Shaco", image: "Shaco" },
    { name: "Shen", image: "Shen" },
    { name: "Shyvana", image: "Shyvana" },
    { name: "Singed", image: "Singed" },
    { name: "Sion", image: "Sion" },
    { name: "Sivir", image: "Sivir" },
    { name: "Skarner", image: "Skarner" },
    { name: "Smolder", image: "Smolder" },
    { name: "Sona", image: "Sona" },
    { name: "Soraka", image: "Soraka" },
    { name: "Swain", image: "Swain" },
    { name: "Sylas", image: "Sylas" },
    { name: "Syndra", image: "Syndra" },
    { name: "Tahm Kench", image: "TahmKench" },
    { name: "Taliyah", image: "Taliyah" },
    { name: "Talon", image: "Talon" },
    { name: "Taric", image: "Taric" },
    { name: "Teemo", image: "Teemo" },
    { name: "Thresh", image: "Thresh" },
    { name: "Tristana", image: "Tristana" },
    { name: "Trundle", image: "Trundle" },
    { name: "Tryndamere", image: "Tryndamere" },
    { name: "Twisted Fate", image: "TwistedFate" },
    { name: "Twitch", image: "Twitch" },
    { name: "Udyr", image: "Udyr" },
    { name: "Urgot", image: "Urgot" },
    { name: "Varus", image: "Varus" },
    { name: "Vayne", image: "Vayne" },
    { name: "Veigar", image: "Veigar" },
    { name: "Vel'Koz", image: "Velkoz" },
    { name: "Vex", image: "Vex" },
    { name: "Vi", image: "Vi" },
    { name: "Viego", image: "Viego" },
    { name: "Viktor", image: "Viktor" },
    { name: "Vladimir", image: "Vladimir" },
    { name: "Volibear", image: "Volibear" },
    { name: "Warwick", image: "Warwick" },
    { name: "Wukong", image: "MonkeyKing" },
    { name: "Xayah", image: "Xayah" },
    { name: "Xerath", image: "Xerath" },
    { name: "Xin Zhao", image: "XinZhao" },
    { name: "Yasuo", image: "Yasuo" },
    { name: "Yone", image: "Yone" },
    { name: "Yorick", image: "Yorick" },
    { name: "Yunara", image: "Yunara" },
    { name: "Yuumi", image: "Yuumi" },
    { name: "Zac", image: "Zac" },
    { name: "Zed", image: "Zed" },
    { name: "Zeri", image: "Zeri" },
    { name: "Ziggs", image: "Ziggs" },
    { name: "Zilean", image: "Zilean" },
    { name: "Zoe", image: "Zoe" },
    { name: "Zyra", image: "Zyra" }
];

    const openChampionModel = (championName: string) => {
        // alert(`You selected ${championName}!`);
        setSelectedChampion(championName);
        setIsModalOpen(true);
    }

  const closeChampionModal = () => {
    setIsModalOpen(false);
  };

    return (
        <main className="flex flex-col min-h-screen">
            <Navbar />
            {/* Header Section */}
            <div className="py-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold text-center mb-4">Champions</h1>
                    <p className="text-xl text-center">Click on any champion to view their abilities and detailed stats</p>
                </div>
            </div>

            {/* Champions Grid */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 cursor-pointer">
                    {champions.map((champion, index) => (
                        <div 
                            key={index} 
                            className="bg-[#0A0A0A] rounded-lg shadow-md hover:shadow-lg duration-300 p-4 text-center group hover:scale-105 transform transition-transform relative"
                        >
                            {freeChamp.includes(champion.name) && (
                                <svg 
                                    viewBox="-2.4 -2.4 28.80 28.80" 
                                    fill="none" 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    className="w-6 h-6 absolute top-2 right-2"
                                    stroke="#ffc800" transform="matrix(-1, 0, 0, 1, 0, 0)rotate(0)">
                                        <title>Free to play</title>
                                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" stroke-linejoin="round" stroke="#CCCCCC" strokeWidth="0.144"></g>
                                        <g id="SVGRepo_iconCarrier"> 
                                            <path d="M13 14C13 13.4477 12.5523 13 12 13C11.4477 13 11 13.4477 11 14V16C11 16.5523 11.4477 17 12 17C12.5523 17 13 16.5523 13 16V14Z" fill="#000000"></path> 
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M9.01875 3.33309C9.74975 2.51635 10.8152 2 12 2C14.2091 2 16 3.79086 16 6V8C18.1323 8 20 9.61368 20 11.7692V17.3077C20 19.973 17.6846 22 15 22H9C6.31545 22 4 19.973 4 17.3077V11.7692C4 9.61368 5.86773 8 8 8H14V6C14 4.89543 13.1046 4 12 4C11.4078 4 10.8767 4.25615 10.509 4.66691C10.1407 5.07844 9.5085 5.11346 9.09697 4.74513C8.68544 4.37681 8.65042 3.74461 9.01875 3.33309ZM8 10C6.81856 10 6 10.866 6 11.7692V17.3077C6 18.7208 7.26627 20 9 20H15C16.7337 20 18 18.7208 18 17.3077V11.7692C18 10.866 17.1814 10 16 10H8Z" fill="#000000"></path> 
                                        </g>
                                </svg>
                            )}
                            <h3 className="text-lg font-semibold">
                                {champion.name}
                            </h3>
                            <div className="relative overflow-hidden rounded-lg mb-4">
                                <Image
                                    src={`https://ddragon.leagueoflegends.com/cdn/15.17.1/img/champion/${champion.image}.png`}
                                    alt={champion.name}
                                    width={120}
                                    height={120}
                                    className="mx-auto group-hover:scale-110 transition-transform duration-300"
                                    unoptimized
                                    priority
                                    onClick={() => openChampionModel(champion.image)}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />

            {isModalOpen && (
                <ChampionDetailsModal
                    isOpen={isModalOpen}
                    onClose={closeChampionModal}
                    ddVersion={ddData[0]}
                    championName={selectedChampion}
                />
            )}
        </main>
        
    );
}