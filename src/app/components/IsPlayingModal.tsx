'use client';

import React from 'react';
import Image from "next/image";
import { useEffect, useState } from "react"; 
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/Footer";
import { useSearchParams } from "next/navigation";

interface Participant {
  teamId: string;
  spell1Id: number;
  spell2Id: number;
  championId: string;
  profileIconId: number;
  riotId: string;
  bot: boolean;
}

interface LiveGame {
  GameID: string;
  MapID: string;
  gameMode: string;
  gameType: string;
  gameQueueConfigId: string;
  participants: Participant[];
}

interface IsPlayingModalProps {
  open: boolean;
  onClose: () => void;
  liveGameData?: LiveGame;
}

const IsPlayingModal: React.FC<IsPlayingModalProps> = ({
    open,
    onClose,
    liveGameData
    }) => {
    if (!open) return null;


    const blueTeam = liveGameData?.participants.filter((p) => p.teamId === "100") || [];
    const redTeam = liveGameData?.participants.filter((p) => p.teamId === "200") || [];

    console.log("blueTeam:", blueTeam);
    console.log("redTeam:", redTeam);

  const [ddData, setddVersion] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ddVersion = await fetch(`https://ddragon.leagueoflegends.com/api/versions.json`);
        const json = await ddVersion.json();

        setddVersion(json);
      } catch (err) {
        console.error(err);
      } finally {
        console.log("Fetch attempt finished.");
      }
    };

    fetchData();
  }, []);

return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="rounded-2xl shadow-2xl p-6 mx-4 bg-[#0A0A0A] max-w-3/4 text-white transition-all duration-300 border border-gray-700 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
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

        <div className="m-4">
          {liveGameData?.GameID && (
            <p className="text-sm text-gray-400">Game ID: {liveGameData.GameID}</p>
          )}
          <p className="text-sm text-gray-400">Game Mode: {liveGameData?.gameMode}</p>
          <p className="text-sm text-gray-400">Game Type: {liveGameData?.gameType}</p>

          <div className="mt-4 text-sm text-gray-400 px-4 py-2 rounded-xl border border-white">
            If the game is completed, you can view the match by researching the player's profile.
          </div>

        </div>

        {/* Scoreboard */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Blue Team */}
          <div>
            <p>
                <span className="text-blue-300 font-bold">Blue Team</span>
            </p>
            {blueTeam.map((player, index) => (
              <div
                key={`blue-${player.riotId}-${index}`}
                className="bg-black rounded-lg p-3 mb-3 text-sm"
              >
                <div className="flex items-center space-x-2">
                  <a
                    href={`/League/Champions?champion=${player.championId}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Image
                      src={`https://ddragon.leagueoflegends.com/cdn/${ddData[0]}/img/champion/${player.championId}.png`}
                      width={50}
                      height={50}
                      alt="Champion"
                      unoptimized
                      className="rounded"
                    />
                  </a>
                  <span
                    className="font-bold text-blue-300"
                  >
                    {player.riotId}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Red Team */}
          <div>
            <p>
                <span className="text-red-300 font-bold">Red Team</span>
            </p>
            {redTeam.map((player, index) => (
              <div
                key={`red-${player.riotId}-${index}`}
                className="bg-black rounded-lg p-3 mb-3 text-sm"
              >
                <div className="flex items-center space-x-2">
                  <a
                    href={`/League/Champions?champion=${player.championId}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Image
                      src={`https://ddragon.leagueoflegends.com/cdn/${ddData[0]}/img/champion/${player.championId}.png`}
                      width={50}
                      height={50}
                      alt="Champion"
                      unoptimized
                      className="rounded"
                    />
                  </a>
                    <span
                        className="font-bold text-red-300"
                        >
                        {player.riotId}
                    </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IsPlayingModal;
