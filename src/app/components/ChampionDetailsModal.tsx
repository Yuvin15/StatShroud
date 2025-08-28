"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface ChampionDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  ddVersion: any;
  championName: string;
}

interface ChampionDetails{
  champPassive: string;
  championQ : string;
  championW : string;
  championE : string;
  championR : string;
}

const ChampionDetailsModal = ({ isOpen, onClose, ddVersion, championName }: ChampionDetailsProps) => {
  const [champion_Details, setChampionDetails] = useState<ChampionDetails[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

        setChampionDetails(data);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="rounded-2xl shadow-2xl p-6 mx-4 bg-[#0A0A0A] w-full max-w-6xl text-white transition-all duration-300 border border-gray-700 max-h-[90vh] overflow-y-auto">
          
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-yellow-300">{championName} Details</h2>
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

        {/* Success state - only show when we have data */}
        {!loading && !error && champion_Details.length > 0 && (
          <div className="grid grid-cols-5 gap-4">
            <div>
              <Image
                src={`https://ddragon.leagueoflegends.com/cdn/${ddVersion[0]}/img/passive/${champion_Details[0]}`}
                width={100}
                height={100}
                title={`${championName} Passive`}
                alt={`${championName} Passive`}
                unoptimized
              />
            </div>

            <div>
              <Image
                src={`https://ddragon.leagueoflegends.com/cdn/${ddVersion[0]}/img/spell/${champion_Details[1]}`}
                width={100}
                height={100}
                title={`${championName} Q`}
                alt={`${championName} Q`}
                unoptimized
              />
            </div>

            <div>
              <Image
                src={`https://ddragon.leagueoflegends.com/cdn/${ddVersion[0]}/img/spell/${champion_Details[2]}`}
                width={100}
                height={100}
                title={`${championName} W`}
                alt={`${championName} W`}
                unoptimized
              />
            </div>

            <div>
              <Image
                src={`https://ddragon.leagueoflegends.com/cdn/${ddVersion[0]}/img/spell/${champion_Details[3]}`}
                width={100}
                height={100}
                title={`${championName} E`}
                alt={`${championName} E`}
                unoptimized
              />
            </div>

            <div>
              <Image
                src={`https://ddragon.leagueoflegends.com/cdn/${ddVersion[0]}/img/spell/${champion_Details[4]}`}
                width={100}
                height={100}
                title={`${championName} R`}
                alt={`${championName} R`}
                unoptimized
              />
            </div>
          </div>
        )}

        {/* No data state */}
        {!loading && !error && champion_Details.length === 0 && (
          <div className="flex items-center justify-center py-8">
            <div className="text-gray-400">No champion data available</div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ChampionDetailsModal;