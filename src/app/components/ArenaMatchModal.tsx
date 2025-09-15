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
  augments1: string  | null;
  augments1Name: string  | null;
  augments1Description: string  | null;
  augments2: string  | null;
  augments2Name: string  | null;
  augments2Description: string  | null;
  augments3: string  | null;
  augments3Name: string  | null;
  augments3Description: string  | null;
  augments4: string  | null;
  augments4Name: string  | null;
  augments4Description: string  | null;
  augments5: string  | null;
  augments5Name: string  | null;
  augments5Description: string  | null;
  augments6: string  | null;
  augments6Name: string  | null;
  augments6Description: string  | null;
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
                    
                      <span className="mt-2 font-bold text-sm text-center text-white">
                        {player.playerName}
                      </span>  

                      <div  className="relative group">
                        <Image
                        src={`https://ddragon.leagueoflegends.com/cdn/${ddVersion}/img/champion/${player.championName}.png`}
                        alt={player.championName}
                        width={100}
                        height={50}
                        className="object-cover rounded-xl shadow-lg"
                        unoptimized
                        />
                        
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 font-bold rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border border-white">
                            <div className="font-bold text-purple-400 mb-1">
                              {player.championName}
                            </div>
                        </div>

                      </div>
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
                      
                      {/* AI helped build custom Tooltip and how to set up the augments loop properly */}
                      <div className="flex mt-2 space-x-1 flex-wrap justify-center">
                        {[
                          { id: player.augments.augments1, name: player.augments.augments1Name, desc: player.augments.augments1Description },
                          { id: player.augments.augments2, name: player.augments.augments2Name, desc: player.augments.augments2Description },
                          { id: player.augments.augments3, name: player.augments.augments3Name, desc: player.augments.augments3Description },
                          { id: player.augments.augments4, name: player.augments.augments4Name, desc: player.augments.augments4Description },
                          { id: player.augments.augments5, name: player.augments.augments5Name, desc: player.augments.augments5Description },
                          { id: player.augments.augments6, name: player.augments.augments6Name, desc: player.augments.augments6Description }
                        ].map((augment, augmentIndex) => (
                          <div key={augmentIndex} className="w-7 h-7 border border-blue-500 rounded bg-gray-700 relative group">
                            {augment.id && ( 
                              <>
                                <Image
                                  src={`https://raw.communitydragon.org/latest/game/${augment.id}`}
                                  width={28}
                                  height={28}
                                  alt={augment.name || "Augment"}
                                  unoptimized
                                  className="rounded border border-gray-600"
                                />
                                
                                {(augment.name || augment.desc) && (
                                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border border-white text-xs w-50">
                                    {/* Augment Name */}
                                    {augment.name && (
                                      <div className="font-bold text-red-300 mb-1">
                                        {augment.name}
                                      </div>
                                    )}
                                    {/* Augment Description with HTML */}
                                    {augment.desc && (
                                      <div 
                                        dangerouslySetInnerHTML={{ __html: augment.desc }}
                                      />
                                    )}
                                  </div>
                                )}
                              </>
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
                      
                      <div className="text-center text-xs font-medium">
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