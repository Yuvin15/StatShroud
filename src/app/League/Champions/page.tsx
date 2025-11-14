'use client';

import React from 'react';
import Image from "next/image";
import ChampionDetailsModal from '../../components/ChampionDetailsModal';
import { useEffect, useState } from "react"; 
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/Footer";
import { useSearchParams } from "next/navigation";

interface Champion {
    name: string;
    image: string;
}

export default function ChampionsPage() {

    const searchParams = useSearchParams();
    const [ddData, setddVersion] = useState([]);
    const [freeChamp, setfreeChamp] = useState<string[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedChampion, setSelectedChampion] = useState("");
    const [allChampionsData, setAllChampionsData] = useState<Champion[]>([]);

    useEffect(() => {
    const fetchData = async () => {
        try {
        const ddVersionRes = await fetch(`https://ddragon.leagueoflegends.com/api/versions.json`);
        const ddVersionJson = await ddVersionRes.json();

        const allChampRes = await fetch(`https://localhost:44365/Riot/GetAllChampions`);
        const allChampData = await allChampRes.json();

        const freeChampRes = await fetch(`https://localhost:44365/Riot/GetFreeCharacters`);
        const freeChampJson = await freeChampRes.json();

        setddVersion(ddVersionJson);
        setAllChampionsData(allChampData);
        setfreeChamp(freeChampJson);
        } catch (err) {
        console.error(err);
        }
    };

    fetchData();
    }, []);

    useEffect(() => {

    const champName = searchParams.get("champion");

    if (champName && allChampionsData.find(champion => champion.image === champName)) {
        setSelectedChampion(champName);
        openChampionModel(champName);
    } else {
        console.log("Champion not found");
    }
    }, [allChampionsData, searchParams]);

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
                    {allChampionsData.map((champion, index) => (
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
                                    src={`https://ddragon.leagueoflegends.com/cdn/${ddData[0]}/img/champion/${champion.image}.png`}
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