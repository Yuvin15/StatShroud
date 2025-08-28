"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface ChampionDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  ddVersion: any;
  championName: string;
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
}

const ChampionDetailsModal = ({ isOpen, onClose, ddVersion, championName }: ChampionDetailsProps) => {
  const [championDetails, setChampionDetails] = useState<ChampionDetails | null>(null);
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
        
        setChampionDetails(Array.isArray(data) ? data[0] : data);
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
              <p className=" mt-2">{championDetails.championLore}</p>
            </div>

            {/* Abilities Section */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 justify-center text-center">
              {/* Passive */}
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">
                  {championDetails.passive_SpellName} (Passive)
                </h3>
                <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/${ddVersion}/img/passive/${championDetails.championPassive}`}
                  width={64}
                  height={64}
                  title={`${championName} Passive`}
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
                  title={`${championName} Q`}
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
                  title={`${championName} W`}
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
                  title={`${championName} E`}
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
                  title={`${championName} R`}
                  alt={`${championName} R`}
                  unoptimized
                  className="rounded mb-2 mx-auto"
                />
                <div className="text-sm" dangerouslySetInnerHTML={{ __html: championDetails.r_Description }} />
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