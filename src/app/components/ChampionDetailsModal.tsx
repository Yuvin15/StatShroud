"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface ChampionDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  ddVersion: any;
  championName: string;
}

interface Skin {
  skinName: string;
  skinNum: number;
}

interface ChampionDetails {
  championPassive: string;
  passive_SpellName: string;
  passive_Description: string;

  championQ: string;
  q_SpellName: string;
  q_Description: string;

  championW: string;
  w_SpellName: string;
  w_Description: string;

  championE: string;
  e_SpellName: string;
  e_Description: string;

  championR: string;
  r_SpellName: string;
  r_Description: string;

  champName: string;
  championLore: string;

  champSkins: Skin[];
}

const ChampionDetailsModal = ({ isOpen, onClose, ddVersion, championName }: ChampionDetailsProps) => {

  const [championDetails, setChampionDetails] = useState<ChampionDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // I hate Fiddlesticks both in game and in code, why is his name like that, this is pain
  const getChampionProperName = (name: string) => 
  {
    return name === "Fiddlesticks" ? "FiddleSticks" : name;
  };

  useEffect(() => {
    const fetchChampData = async () => {
      if (!isOpen || !championName) return;

      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `https://localhost:44365/Riot/GetChampionData?championName=${championName}`
        );

        if (!response.ok) throw new Error("Error loading data");

        const data = await response.json();
        
        if(championDetails == null)
        {
          setChampionDetails(data);
        }
        
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchChampData();
  }, [isOpen, championName]);

  if (!isOpen) return null;

  return (
    //AI helped here with the onClose on the backdrop
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"  onClick={onClose} > 
      <div className="rounded-2xl shadow-2xl p-6 mx-4 bg-[#0A0A0A] w-full max-w-6xl text-white transition-all duration-300 border border-gray-700 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
          
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-yellow-300">{championDetails?.champName}</h2>
          <button
            onClick={onClose} 
            className="text-gray-400 hover:text-red-500 text-3xl leading-none"
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex items-center justify-center py-8">
            <div className="text-white">Loading champion data...</div>
          </div>
        )}

        {/* Error state */}
        {error && !loading && (
          <div className="flex items-center justify-center py-8">
            <div className="text-red-500">Error: {error}</div>
          </div>
        )}

        {/* Champion Info Section */}
        {!loading && !error && championDetails && (
          <>
            <div className="mb-6 justify-center text-center">
              <Image
                src={`https://ddragon.leagueoflegends.com/cdn/${ddVersion}/img/champion/${championName}.png`}
                width={100}
                height={100}
                alt="Champion"
                unoptimized
                className="rounded mx-auto"
                title={championName}
              />
              <div className="text-bold" dangerouslySetInnerHTML={{ __html: championDetails.championLore }} />
            </div>

            {/* Abilities Section */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 justify-center text-center">
              {/* Passive */}
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-pink-500 mb-2">
                  {championDetails.passive_SpellName} (Passive)
                </h3>
                <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/${ddVersion}/img/passive/${championDetails.championPassive}`}
                  width={64}
                  height={64}
                  title={`${championDetails.passive_SpellName}`}
                  alt={`${championName} Passive`}
                  unoptimized
                  className="rounded mb-2 mx-auto"
                />
                <div className="text-sm" dangerouslySetInnerHTML={{ __html: championDetails.passive_Description }} />
              </div>

              {/* Q Ability */}
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-green-400 mb-2">
                  {championDetails.q_SpellName} (Q)
                </h3>
                <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/${ddVersion}/img/spell/${championDetails.championQ}`}
                  width={64}
                  height={64}
                  title={`${championDetails.q_SpellName}`}
                  alt={`${championName} Q`}
                  unoptimized
                  className="rounded mb-2 mx-auto"
                />
                <div className="text-sm" dangerouslySetInnerHTML={{ __html: championDetails.q_Description }} />
              </div>

              {/* W Ability */}
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-400 mb-2">
                  {championDetails.w_SpellName} (W)
                </h3>
                <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/${ddVersion}/img/spell/${championDetails.championW}`}
                  width={64}
                  height={64}
                  title={`${championDetails.w_SpellName}`}
                  alt={`${championName} W`}
                  unoptimized
                  className="rounded mb-2 mx-auto"
                />
                <div className="text-sm" dangerouslySetInnerHTML={{ __html: championDetails.w_Description }} />
              </div>

              {/* E Ability */}
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-purple-400 mb-2">
                  {championDetails.e_SpellName} (E)
                </h3>
                <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/${ddVersion}/img/spell/${championDetails.championE}`}
                  width={64}
                  height={64}
                  title={`${championDetails.e_SpellName}`}
                  alt={`${championName} E`}
                  unoptimized
                  className="rounded mb-2 mx-auto"
                />
                <div className="text-sm" dangerouslySetInnerHTML={{ __html: championDetails.e_Description }} />
              </div>

              {/* R Ability */}
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-red-400 mb-2">
                  {championDetails.r_SpellName} (R)
                </h3>
                <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/${ddVersion}/img/spell/${championDetails.championR}`}
                  width={64}
                  height={64}
                  title={`${championDetails.r_SpellName}`}
                  alt={`${championName} R`}
                  unoptimized
                  className="rounded mb-2 mx-auto"
                />
                <div className="text-sm" dangerouslySetInnerHTML={{ __html: championDetails.r_Description }} />
              </div>
            </div>
            
            <div className="mt-8">
              <h1 className="text-xl md:text-2xl font-bold text-yellow-300 text-center mb-2">Champion Skins</h1>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {championDetails.champSkins?.map((skin, i) => (
                  <div key={skin.skinNum} className="bg-gray-800 rounded-lg p-3 text-center hover:shadow-lg duration-300 hover:scale-130 hover:focus transform transition-transform items-center">
                    <h3 className="text-sm font-semibold text-white mb-3">
                      {skin.skinName}
                    </h3>
                    <a href={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${getChampionProperName(championName)}_${skin.skinNum}.jpg`} target="_blank" rel="noopener noreferrer">
                      <Image
                      src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${getChampionProperName(championName)}_${skin.skinNum}.jpg`}
                      width={100}
                      height={100}
                      title={skin.skinName}
                      alt={skin.skinName}
                      unoptimized
                      className="rounded mb-2 w-full h-auto object-cover"
                    />
                    </a>
                  </div>
                ))}
              </div>
              
            </div>
          </>
        )}

        {/* No data state */}
        {!loading && !error && !championDetails && (
          <div className="flex items-center justify-center py-8">
            <div className="text-gray-400">No champion data available</div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ChampionDetailsModal;