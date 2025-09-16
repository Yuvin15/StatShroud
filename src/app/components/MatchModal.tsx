"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface MatchModalProps {
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

interface Runes {
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
  playerTag : string;
  teamID: string;
  championName: string;
  laneName: string;
  kda: string;
  goldSpent: number;
  goldEarned: number;
  damage: number;
  damageTaken: number;
  towerDamage: number;
  objDamage: number;
  skillshotsHit: number;
  skillshotsMissed: number;
  farm: number;
  visionScore: number;
  healShield: number;
  playerItems: PlayerItems;
  summonerSpell1: string;
  summonerSpell2: string;
  runes: Runes;
}

const MatchModal = ({ isOpen, onClose, matchId, gameRegion, ddVersion }: MatchModalProps) => {
  const [GameID, setGameID] = useState("");
  const [GameWinner, setGameWinner] = useState("Loading...");
  const [GameMode, setGameMode] = useState("Loading...");
  const [Players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  // Fetch match data when modal opens
  useEffect(() => {
    const fetchMatchData = async () => {
      if (!isOpen || !matchId || !gameRegion) return;
      console.log({ isOpen, matchId, gameRegion });
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `https://localhost:44365/Riot/GetSingleMatchDetailsForNormals?region=${gameRegion}&matchID=${matchId}`
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

  const toggleExpand = (key: string) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose} >
      <div className="rounded-2xl shadow-2xl p-6 mx-4 bg-[#0A0A0A] w-full max-w-6xl text-white transition-all duration-300 border border-gray-700 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-yellow-300">Match Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 text-3xl leading-none"
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        {/* Loading/Error States */}
        {loading && (
          <div className="text-center py-4">
            <p className="text-yellow-300">Loading match data...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-4">
            <p className="text-red-400">Error: {error}</p>
          </div>
        )}

        {/* Match Info */}
        <div className="mb-4">
          {GameID && (
            <p className="text-sm text-gray-400">Game ID: {GameID}</p>
          )}
          <p className="text-sm text-gray-400">Game Mode: {GameMode}</p>
          <p className="text-sm text-gray-400">Winner: {GameWinner}</p>
        </div>

        {/* Scoreboard - Only show if we have players data */}
        {Players.length > 0 && (() => {
          // Filter players by team using teamID property
          const blueTeam = Players.filter((player: Player) => 
            player.teamID === "Blue Team"
          );
          
          const redTeam = Players.filter((player: Player) => 
            player.teamID === "Red Team"
          );

          return (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Blue Side */}
              <div>
                <h3 className="text-blue-400 text-xl font-semibold mb-2">Blue Team</h3>
                {blueTeam.map((player: Player, index: number) => (
                  <div key={`blue-${player.playerName}-${index}`} className="bg-black rounded-lg p-3 mb-3 text-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
                        <div className="relative group">
                          <a href={`/League/Champions?champion=${player.championName}`} target="_blank" title="View Champion Details">
                            <Image
                              src={`https://ddragon.leagueoflegends.com/cdn/${ddVersion}/img/champion/${player.championName}.png`}
                              width={50}
                              height={50}
                              alt="Champion"
                              unoptimized
                              className="rounded"
                            />
                          </a>
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border border-white text-center">
                            <div className="font-bold text-blue-300 mb-1">
                                View {player.championName}'s Details
                            </div>
                          </div>
                        </div>
                        <div className="relative group">
                          <a href={`?playerName=${player.playerName}%23${player.playerTag}&region=${gameRegion}`} target="_blank">
                            <p className="font-bold text-blue-300">{player.playerName}</p>
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border border-white text-center">
                              <div className="font-bold text-blue-300 mb-1">
                                View {player.playerName}'s Details
                              </div>
                            </div>
                          </a>
                          <p className="font-bold">{player.kda}</p>
                          <p className="font-bold">{player.farm} CS</p>
                        </div>
                      </div>
                      
                      {/* Items */}
                      <div className="flex items-center space-x-1">
                        {[
                          player.playerItems.item1,
                          player.playerItems.item2,
                          player.playerItems.item3,
                          player.playerItems.item4,
                          player.playerItems.item5,
                          player.playerItems.item6
                        ].map((itemId, itemIndex) => (
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
                        
                        {/* Ward */}
                        <div className="relative w-7 h-7">
                          {player.playerItems.ward && (
                            <Image
                              src={`https://ddragon.leagueoflegends.com/cdn/${ddVersion}/img/item/${player.playerItems.ward}.png`}
                              width={28}
                              height={28}
                              alt="Ward"
                              unoptimized
                              className="rounded border border-yellow-500"
                            />
                          )}
                          
                          {/* Vision score overlay */}
                          <span className="absolute bottom-0 right-0 bg-black/70 text-white px-1 rounded">
                            {player.visionScore}
                          </span>
                        </div>
                        
                        {/* summoner spells */}
                        <div className="p-2">
                          <Image
                            src={`https://ddragon.leagueoflegends.com/cdn/15.15.1/img/spell/${player.summonerSpell1}.png`}
                            width={24}
                            height={24}
                            alt="Keystone"
                            unoptimized
                            className="rounded border"
                          />
                          <Image
                            src={`https://ddragon.leagueoflegends.com/cdn/15.15.1/img/spell/${player.summonerSpell2}.png`}
                            width={24}
                            height={24}
                            alt="Keystone"
                            unoptimized
                            className="rounded border"
                          />
                        </div>
                        
                      </div>
                      
                      <button
                        onClick={() => toggleExpand(`blue${player.playerName}${index}`)}
                        className="text-white text-xl px-2"
                      >
                        {expanded[`blue${player.playerName}${index}`] ? "▲" : "▼"}
                      </button>
                    </div>

                    {expanded[`blue${player.playerName}${index}`] && (
                      <div className="pt-3 border-t border-blue-900 text-gray-300">
                        
                        {/* Runes Section */}
                          <p className="text-blue-300 font-semibold mb-2">Summoner Runes</p>
                          <div className="flex items-center space-x-2">
                            <Image
                              src={`https://ddragon.leagueoflegends.com/cdn/img/${player.runes.keyStone}`}
                              width={24}
                              height={24}
                              alt="Keystone"
                              unoptimized
                              className="rounded border"
                              title={player.runes.keyStone.substring(player.runes.keyStone.indexOf("perk") + 5, player.runes.keyStone.lastIndexOf("/"))}
                            />
                            {[player.runes.primaryRune1, player.runes.primaryRune2, player.runes.primaryRune3].map((rune, runeIndex) => (
                              <Image
                                key={runeIndex}
                                src={`https://ddragon.leagueoflegends.com/cdn/img/${rune}`}
                                width={20}
                                height={20}
                                alt="Primary Rune"
                                unoptimized
                                className="rounded"
                                title={rune.substring(rune.indexOf("perk") + 5, rune.lastIndexOf("/"))}
                              />
                            ))}
                            {/* Secondary Runes */}
                            {[player.runes.secondaryRune1, player.runes.secondaryRune2].map((rune, runeIndex) => (
                              <Image
                                key={runeIndex}
                                src={`https://ddragon.leagueoflegends.com/cdn/img/${rune}`}
                                width={20}
                                height={20}
                                alt="Secondary Rune"
                                unoptimized
                                className="rounded"
                                title={rune.substring(rune.indexOf("perk") + 5, rune.lastIndexOf("/"))}
                              />
                            ))}
                          </div>

                        <div className="grid gap-x-6 gap-y-1 mt-2 font-bold">
                          <table>
                            <tr>
                              <td>
                                Damage Dealt: {player.damage}
                              </td>
                              <td>
                                Damage Taken: {player.damageTaken}
                              </td>
                            </tr>
                            <tr>
                              <td>
                                Gold Earned: {player.goldEarned}
                              </td>
                              <td>
                                Gold Spent: {player.goldSpent}
                              </td>
                            </tr>
                            <tr>
                              <td>
                                Tower Damage: {player.towerDamage}
                              </td>
                              <td>
                                Objective Damage: {player.objDamage}
                              </td>
                            </tr>
                            <tr>
                              <td>
                                Skillshots Hit: {player.skillshotsHit}
                              </td>
                              <td>
                                Skillshots Missed: {player.skillshotsMissed}
                              </td>
                            </tr>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Red Side */}
              <div>
                <h3 className="text-red-400 text-xl font-semibold mb-2">Red Team</h3>
                {redTeam.map((player: Player, index: number) => (
                  <div key={`red-${player.playerName}-${index}`} className="bg-black rounded-lg p-3 mb-3 text-sm">
                     <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
                        <div className="relative group">
                          <a href={`/League/Champions?champion=${player.championName}`} target="_blank" title="View Champion Details">
                            <Image
                              src={`https://ddragon.leagueoflegends.com/cdn/${ddVersion}/img/champion/${player.championName}.png`}
                              width={50}
                              height={50}
                              alt="Champion"
                              unoptimized
                              className="rounded"
                            />
                          </a>
                          <div className="absolute bottom-full left-1/2 transform -translate-x-5 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border border-white text-center">
                            <div className="font-bold text-red-300 mb-1">
                                View {player.championName}'s Details
                            </div>
                          </div>
                        </div>
                        <div className="relative group">
                          <a href={`?playerName=${player.playerName}%23${player.playerTag}&region=${gameRegion}`} target="_blank">
                            <p className="font-bold text-blue-300">{player.playerName}</p>
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border border-white text-center">
                              <div className="font-bold text-red-300 mb-1">
                                View {player.playerName}'s Details
                              </div>
                            </div>
                          </a>
                          <p className="font-bold">{player.kda}</p>
                          <p className="font-bold">{player.farm} CS</p>
                        </div>
                      </div>
                      
                      {/* Items */}
                      <div className="flex items-center space-x-1 ">
                        {[
                          player.playerItems.item1,
                          player.playerItems.item2,
                          player.playerItems.item3,
                          player.playerItems.item4,
                          player.playerItems.item5,
                          player.playerItems.item6
                        ].map((itemId, itemIndex) => (
                          <div key={itemIndex} className="w-7 h-7 border border-red-500 rounded bg-gray-700">
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
                        
                        {/* Ward */}
                        <div className="relative w-7 h-7">
                          {player.playerItems.ward && (
                            <Image
                              src={`https://ddragon.leagueoflegends.com/cdn/${ddVersion}/img/item/${player.playerItems.ward}.png`}
                              width={28}
                              height={28}
                              alt="Ward"
                              unoptimized
                              className="rounded border border-yellow-500"
                            />
                          )}
                          
                          {/* Vision score overlay */}
                          <span className="absolute bottom-0 right-0 bg-black/70 text-white px-1 rounded">
                            {player.visionScore}
                          </span>
                        </div>

                        {/* summoner spells */}
                        <div className="p-2">
                          <Image
                            src={`https://ddragon.leagueoflegends.com/cdn/15.15.1/img/spell/${player.summonerSpell1}.png`}
                            width={24}
                            height={24}
                            alt="Keystone"
                            unoptimized
                            className="rounded border"
                          />
                          <Image
                            src={`https://ddragon.leagueoflegends.com/cdn/15.15.1/img/spell/${player.summonerSpell2}.png`}
                            width={24}
                            height={24}
                            alt="Keystone"
                            unoptimized
                            className="rounded border"
                          />
                        </div>
                      </div>
                      
                      <button
                        onClick={() => toggleExpand(`red${player.playerName}${index}`)}
                        className="text-white text-xl px-2"
                      >
                        {expanded[`red${player.playerName}${index}`] ? "▲" : "▼"}
                      </button>
                    </div>

                    {expanded[`red${player.playerName}${index}`] && (
                      <div className="pt-3 border-t border-red-900 text-gray-300">
                        
                        {/* Runes Section */}
                          <p className="text-red-300 font-semibold mb-2">Runes:</p>

                          <div className="flex items-center space-x-2">
                            {/* Keystone */}
                            <Image
                              src={`https://ddragon.leagueoflegends.com/cdn/img/${player.runes.keyStone}`}
                              width={24}
                              height={24}
                              alt="Keystone"
                              unoptimized
                              className="rounded border"
                              title={player.runes.keyStone.substring(player.runes.keyStone.indexOf("perk") + 5, player.runes.keyStone.lastIndexOf("/"))}
                            />
                            {/* Primary Runes */}
                            {[player.runes.primaryRune1, player.runes.primaryRune2, player.runes.primaryRune3].map((rune, runeIndex) => (
                              <Image
                                key={runeIndex}
                                src={`https://ddragon.leagueoflegends.com/cdn/img/${rune}`}
                                width={20}
                                height={20}
                                alt="Primary Rune"
                                unoptimized
                                className="rounded"
                                title={rune.substring(rune.indexOf("perk") + 5, rune.lastIndexOf("/"))}
                              />
                            ))}
                            {/* Secondary Runes */}
                            {[player.runes.secondaryRune1, player.runes.secondaryRune2].map((rune, runeIndex) => (
                              <Image
                                key={runeIndex}
                                src={`https://ddragon.leagueoflegends.com/cdn/img/${rune}`}
                                width={20}
                                height={20}
                                alt="Secondary Rune"
                                unoptimized
                                className="rounded"
                                title={rune.substring(rune.indexOf("perk") + 5, rune.lastIndexOf("/"))}
                              />
                            ))}
                          </div>
                        <div className="grid gap-x-6 gap-y-1 mt-2 font-bold">
                          <table>
                            <tr>
                              <td>
                                Damage Dealt: {player.damage}
                              </td>
                              <td>
                                Damage Taken: {player.damageTaken}
                              </td>
                            </tr>
                            <tr>
                              <td>
                                Gold Earned: {player.goldEarned}
                              </td>
                              <td>
                                Gold Spent: {player.goldSpent}
                              </td>
                            </tr>
                            <tr>
                              <td>
                                Tower Damage: {player.towerDamage}
                              </td>
                              <td>
                                Objective Damage: {player.objDamage}
                              </td>
                            </tr>
                            <tr>
                              <td>
                                Skillshots Hit: {player.skillshotsHit}
                              </td>
                              <td>
                                Skillshots Missed: {player.skillshotsMissed}
                              </td>
                            </tr>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })()}

        {/* Show placeholder if no data loaded yet */}
        {!loading && !error && Players.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-400">No match data available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchModal;