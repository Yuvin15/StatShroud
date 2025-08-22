// ArenaMatchModal.tsx
"use client";

import { useEffect } from "react";
import Image from "next/image";

interface ArenaMatchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PlayerItems {
  item1: number;
  item2: number;
  item3: number;
  item4: number;
  item5: number;
  item6: number;
  ward: number;
}

interface Augments {
  augments1 : number;
  augments2 : number; 
  augments3 : number; 
  augments4 : number; 
  augments5 : number; 
  augments6 : number; 
}

interface Player {
  playerName: string;
  championName: string;
  playerTeam: number;
  playerTeamPosition: number;
  kda: string;
  damage: number;
  damageTaken: number;
  skillshotsHit: number;
  skillshotsMissed: number;
  healShield: number;
  playerItems: PlayerItems;
  summonerSpell1: string;
  summonerSpell2: string;
  augments: Augments;
}


const ArenaMatchModal: React.FC<ArenaMatchModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // Don't render if not open

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="rounded-2xl shadow-2xl p-4 md:p-6 bg-[#0A0A0A] transition-all duration-300 border border-gray-700 max-h-[90vh] overflow-y-auto w-full max-w-6xl">
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-yellow-300">Match Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 text-3xl leading-none"
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        <div className="mb-6">
          <p className="text-sm text-gray-400">Game ID: 10</p>
          <p className="text-sm text-gray-400">Game Mode: Arena</p>
        </div>
      
        {/* Teams Container - Display 4 matches (8 teams total) */}
        <div className="space-y-6">
          {[...Array(4)].map((_, matchIndex) => (
            <div key={matchIndex} className="flex flex-col lg:flex-row gap-4 lg:gap-6">
              
              {/* Team 1 */}
              <div className="flex-1 border border-amber-300 rounded-2xl p-4">
                <h1 className="mb-4 text-lg font-bold text-center text-amber-300">Game placement {matchIndex * 2 + 1}</h1>
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                  {/* Player 1 */}
                  <div className="flex flex-col items-center">
                    <Image
                      src="https://ddragon.leagueoflegends.com/cdn/15.14.1/img/champion/Yunara.png"
                      alt={`Team ${matchIndex * 2 + 1} Player 1`}
                      width={50}
                      height={50}
                      className="object-cover rounded-xl shadow-lg "
                      unoptimized
                    />
                    <span className="mt-2 font-semibold text-sm md:text-base">Player 1</span>
                    <div className="flex mt-2 space-x-1">
                      {[...Array(6)].map((_, i) => (
                        <Image
                          key={i}
                          src="https://ddragon.leagueoflegends.com/cdn/15.14.1/img/item/1001.png"
                          alt={`Team ${matchIndex * 2 + 1} Player 1 Item ${i + 1}`}
                          width={24}
                          height={24}
                          className="object-cover rounded shadow md:w-7 md:h-7"
                          unoptimized
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* Player 2 */}
                  <div className="flex flex-col items-center">
                    <Image
                      src="https://ddragon.leagueoflegends.com/cdn/15.14.1/img/champion/Yunara.png"
                      alt={`Team ${matchIndex * 2 + 1} Player 2`}
                      width={50}
                      height={50}
                      className="object-cover rounded-xl shadow-lg "
                      unoptimized
                    />
                    <span className="mt-2 font-semibold text-sm md:text-base">Player 2</span>
                    <div className="flex mt-2 space-x-1">
                      {[...Array(6)].map((_, i) => (
                        <Image
                          key={i}
                          src="https://ddragon.leagueoflegends.com/cdn/15.14.1/img/item/1001.png"
                          alt={`Team ${matchIndex * 2 + 1} Player 2 Item ${i + 1}`}
                          width={24}
                          height={24}
                          className="object-cover rounded shadow md:w-7 md:h-7"
                          unoptimized
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Team 2 */}
              <div className="flex-1 border border-amber-300 rounded-2xl p-4">
                <h1 className="mb-4 text-lg font-bold text-center text-amber-300">Game placement {matchIndex * 2 + 2}</h1>
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                  {/* Player 1 */}
                  <div className="flex flex-col items-center">
                    <Image
                      src="https://ddragon.leagueoflegends.com/cdn/15.14.1/img/champion/Yunara.png"
                      alt={`Team ${matchIndex * 2 + 2} Player 1`}
                      width={50}
                      height={50}
                      className="object-cover rounded-xl shadow-lg "
                      unoptimized
                    />
                    <span className="mt-2 font-semibold text-sm md:text-base">Player 1</span>
                    <div className="flex mt-2 space-x-1">
                      {[...Array(6)].map((_, i) => (
                        <Image
                          key={i}
                          src="https://ddragon.leagueoflegends.com/cdn/15.14.1/img/item/1001.png"
                          alt={`Team ${matchIndex * 2 + 2} Player 1 Item ${i + 1}`}
                          width={24}
                          height={24}
                          className="object-cover rounded shadow md:w-7 md:h-7"
                          unoptimized
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* Player 2 */}
                  <div className="flex flex-col items-center">
                    <Image
                      src="https://ddragon.leagueoflegends.com/cdn/15.14.1/img/champion/Yunara.png"
                      alt={`Team ${matchIndex * 2 + 2} Player 2`}
                      width={50}
                      height={50}
                      className="object-cover rounded-xl shadow-lg "
                      unoptimized
                    />
                    <span className="mt-2 font-semibold text-sm md:text-base">Player 2</span>
                    <div className="flex mt-2 space-x-1">
                      {[...Array(6)].map((_, i) => (
                        <Image
                          key={i}
                          src="https://ddragon.leagueoflegends.com/cdn/15.14.1/img/item/1001.png"
                          alt={`Team ${matchIndex * 2 + 2} Player 2 Item ${i + 1}`}
                          width={24}
                          height={24}
                          className="object-cover rounded shadow md:w-7 md:h-7"
                          unoptimized
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArenaMatchModal;