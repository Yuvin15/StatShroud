"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface ArenaMatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  matchId: any;
  gameRegion: any;
  ddVersion: any;
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
  keyStone: string;
  primaryRune1: string;
  primaryRune2: string;
  primaryRune3: string;
  secondaryRune1: string;
  secondaryRune2: string;
  runeShard1: string;
  runeShard2: string;
  runeShard3: string;
}

interface Player {
  playerName: string;
  PlayerTeamPosition: number;
  PlayerTeamName: string;
  championName: string;
  laneName: string;
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

const ArenaMatchModal = ({ isOpen, onClose, matchId, gameRegion, ddVersion }: ArenaMatchModalProps) => {
  const [GameID, setGameID] = useState("");
  const [GameWinner, setGameWinner] = useState("Loading...");
  const [GameMode, setGameMode] = useState("Loading...");
  const [Players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMatchData = async () => {
      if (!isOpen || !matchId || !gameRegion) return;
      console.log("useEffect triggered:", { isOpen, matchId, gameRegion });
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `https://localhost:44365/Riot/GetSingleMatchDetailsForArena?region=${gameRegion}&matchID=${matchId}`
        );

        if (!response.ok) throw new Error("Error loading data");

        const data = await response.json();

        setGameID(data.gameID);
        setGameWinner(data.gameWinner);
        setGameMode(data.gameMode);
        setPlayers(data.players || []);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchMatchData();
  }, [isOpen, matchId, gameRegion]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="rounded-2xl shadow-2xl p-4 md:p-6 bg-[#0A0A0A] transition-all duration-300 border border-gray-700 max-h-[90vh] overflow-y-auto w-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-yellow-300">Match Details</h2>
          <button
            onClick={ onClose } 
            className="text-gray-400 hover:text-red-500 text-3xl leading-none"
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        <div className="mb-6">
          <p className="text-sm text-gray-400">Game ID: {GameID}</p>
          <p className="text-sm text-gray-400">Game Mode: {GameMode}</p>
          <p className="text-sm text-gray-400">Winning Team: {GameWinner}</p>
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
                      src={`https://ddragon.leagueoflegends.com/cdn/${ddVersion}/img/champion/Yunara.png`}
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
                          src={`https://ddragon.leagueoflegends.com/cdn/${ddVersion}/img/item/1001.png`}
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
                      src={`https://ddragon.leagueoflegends.com/cdn/${ddVersion}/img/champion/Yunara.png`}
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
                          src={`https://ddragon.leagueoflegends.com/cdn/${ddVersion}/img/item/1001.png`}
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
                      src={`https://ddragon.leagueoflegends.com/cdn/${ddVersion}/img/champion/Yunara.png`}
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
                          src={`https://ddragon.leagueoflegends.com/cdn/${ddVersion}/img/item/1001.png`}
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
                      src={`https://ddragon.leagueoflegends.com/cdn/${ddVersion}/img/champion/Yunara.png`}
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
                          src={`https://ddragon.leagueoflegends.com/cdn/${ddVersion}/img/champion/Yunara.png`}
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