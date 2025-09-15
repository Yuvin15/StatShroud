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
  item1: number | null;
  item2: number | null;
  item3: number | null;
  item4: number | null;
  item5: number | null;
  item6: number | null;
  ward: number;
}

interface Augments {
  augments1: number;
  augments2: number;
  augments3: number;
  augments4: number;
  augments5: number;
  augments6: number;
}

interface Player {
  playerName: string;
  playerTeamPosition: number;
  playerTeamName: string;
  championName: string;
  kda: string;
  damage: number;
  damageTaken: number;
  skillshotsHit: number;
  skillshotsMissed: number;
  healShield: number;
  items: PlayerItems;
  summonerSpell1: string;
  summonerSpell2: string;
  augments: Augments;
}

interface Team {
  teamName: string;
  position: number;
  players: Player[];
}

const ArenaMatchModal = ({ isOpen, onClose, matchId, gameRegion, ddVersion }: ArenaMatchModalProps) => {
  const [GameID, setGameID] = useState("");
  const [GameWinner, setGameWinner] = useState("Loading...");
  const [GameMode, setGameMode] = useState("Loading...");
  const [Players, setPlayers] = useState<Player[]>([]);
  const [Teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // AI helped me here
  const groupPlayersIntoTeams = (players: Player[]) => {
    const teamMap = new Map<string, Player[]>();
    
    // Group players by team name
    players.forEach(player => {
      if (!teamMap.has(player.playerTeamName)) {
        teamMap.set(player.playerTeamName, []);
      }
      teamMap.get(player.playerTeamName)?.push(player);
    });

    // Convert to Team objects and sort by team position
    const teams: Team[] = Array.from(teamMap.entries()).map(([teamName, teamPlayers]) => ({
      teamName,
      position: teamPlayers[0].playerTeamPosition, // All players in a team have same position
      players: teamPlayers
    }));
    
    return teams;
  };

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
        
        const players = data.specialGamePlayerStats || [];
        setPlayers(data);
        
        // Put players into teams
        const groupedTeams = groupPlayersIntoTeams(players);
        setTeams(groupedTeams);
        
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
      <div className="rounded-2xl shadow-2xl p-4 md:p-6 bg-[#0A0A0A] transition-all duration-300 border border-gray-700 max-h-[90vh] overflow-y-auto w-full max-w-7xl" onClick={(e) => e.stopPropagation()}>
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-yellow-300">Arena Match Details</h2>
          <button
            onClick={onClose} 
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

        {loading && (
          <div className="text-center text-gray-400 py-8">Loading match data...</div>
        )}

        {error && (
          <div className="text-center text-red-500 py-8">Error: {error}</div>
        )}

        {Teams.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
            {Teams.map((team) => (
              <div 
                key={team.teamName} 
                className="border border-amber-300 rounded-2xl p-4"
              >
                <h1 className="mb-4 text-lg font-bold text-center text-amber-300">
                  Team {team.teamName}
                </h1>
                
                <div className="flex flex-col gap-4">
                  {team.players.map((player, playerIndex) => (
                    <div key={`${player.playerName}-${playerIndex}`} className="flex flex-col items-center">
                      
                      <Image
                        src={`https://ddragon.leagueoflegends.com/cdn/${ddVersion}/img/champion/${player.championName}.png`}
                        alt={player.championName}
                        width={100}
                        height={50}
                        className="object-cover rounded-xl shadow-lg"
                        unoptimized
                      />
                      
                      <span className="mt-2 font-semibold text-sm text-center text-white">
                        {player.playerName}
                      </span>
                      
                      <span className="font-bold">
                        KDA : {player.kda}
                      </span>
                      
                      <div className="flex mt-2 space-x-1 flex-wrap justify-center">
                        {[player.items.item1, player.items.item2, player.items.item3, 
                          player.items.item4, player.items.item5, player.items.item6].map((itemId, itemIndex) => (
                          <div key={itemIndex} className="w-7 h-7 border border-blue-500 rounded bg-gray-700">
                            {itemId && ( 
                              <Image
                                src={`https://ddragon.leagueoflegends.com/cdn/${ddVersion}/img/item/${itemId}.png`}
                                width={28}
                                height={28}
                                alt="Item"
                                unoptimized
                                className="rounded border border-gray-600"
                              />
                            )}
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex mt-2 space-x-1 flex-wrap justify-center">
                        {[player.augments.augments1, player.augments.augments2, player.augments.augments3, 
                          player.augments.augments4, player.augments.augments5, player.augments.augments6].map((augmentID, augmentIndex) => (
                          <div key={augmentIndex} className="w-7 h-7 border border-blue-500 rounded bg-gray-700">
                            {augmentID && ( 
                              <Image
                                src={`https://raw.communitydragon.org/latest/game/assets/ux/cherry/augments/icons/${augmentID}.png`}
                                width={28}
                                height={28}
                                alt="Item"
                                unoptimized
                                className="rounded border border-gray-600"
                              />
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="flex mt-2.5 mb-2.5 space-x-1">
                        <Image
                          src={`https://ddragon.leagueoflegends.com/cdn/${ddVersion}/img/spell/${player.summonerSpell1}.png`}
                          alt={player.summonerSpell1}
                          width={30}
                          height={30}
                          className="object-cover rounded"
                          unoptimized
                        />
                        <Image
                          src={`https://ddragon.leagueoflegends.com/cdn/${ddVersion}/img/spell/${player.summonerSpell2}.png`}
                          alt={player.summonerSpell2}
                          width={30}
                          height={30}
                          className="object-cover rounded"
                          unoptimized
                        />
                      </div>
                      
                      <div className="text-center font-bold">
                        <div>Damage Dealt: {player.damage}</div>
                        <div>Damage Taken: {player.damageTaken}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArenaMatchModal;