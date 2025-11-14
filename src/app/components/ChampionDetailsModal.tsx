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

  hp: number;
  hpPerLevel: number;
  mp: number;
  mpPerLevel: number;
  moveSpeed: number;
  armor: number;
  armorPerLevel: number;
  spellBlock: number;
  spellBlockPerLevel: number;
  attackRange: number;
  hpRegen: number;
  hpRegenPerLevel: number;
  mpRegen: number;
  mpRegenPerLevel: number;
  crit: number;
  critPerLevel: number;
  attackDamage: number;
  attackDamagePerLevel: number;
  attackSpeedPerLevel: number;
  attackSpeed: number;

}

interface ChampionTips {
  Author: string;
  CreatedTime : string;
  HelpText: string;
}

const ChampionDetailsModal = ({ isOpen, onClose, ddVersion, championName }: ChampionDetailsProps) => {

  const [championDetails, setChampionDetails] = useState<ChampionDetails | null>(null);
  const [championTips, setchampionTips] = useState<ChampionTips[] | null>(null);
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

        const championTipsResponse = await fetch(
          `https://localhost:44365/Riot/GetChampionHelp/${championName}`
        );

        if (!response.ok || !championTipsResponse.ok) throw new Error("Error loading data");

        const data = await response.json();
        const championTipsData = await championTipsResponse.json();
        
        if(championDetails == null)
        {
          setChampionDetails(data);
          setchampionTips(championTipsData);
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

  async function SubmitTip()
  {
    const authorInput = (document.getElementById("NameID") as HTMLInputElement).value;
    const tipInput = (document.getElementById("TipsAndTricksID") as HTMLInputElement).value;

    if(authorInput.length < 1 || tipInput.length < 1)
    {
      alert("Please fill out both fields before submitting.");
      return;
    }
    if(tipInput.length > 200)
    {
      alert("Tip is too long, max length is 200 characters.");
      return;
    }

    const newTip = {
      Author: authorInput,
      helpText: tipInput    
    }

    const response = await fetch(`https://localhost:44365/Riot/AddChampionHelp?championName=${championName}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTip),
    });

    if(response.ok)
    {
      alert("Tip submitted successfully!");
      
    }

  }

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

            <div className="flex items-center justify-center gap-2 mb-2 relative group">
              <h1 className="text-xl md:text-2xl font-bold text-yellow-300">
                Abilities
              </h1>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke="currentColor" 
                className="size-6 align-middle"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" 
                />
              </svg>
              <div className="relative group">
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-4 py-3 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border border-white text-center min-w-max">
                  <div className="font-bold text-yellow-300 space-y-1">
                    {[
                      { label: "Base HP", value: championDetails.hp },
                      { label: "Base Mana", value: championDetails.mp },
                      { label: "Move Speed", value: championDetails.moveSpeed },
                      { label: "Base Armor", value: championDetails.armor },
                      { label: "Attack Range", value: championDetails.attackRange },
                      { label: "Base Attack Damage", value: championDetails.attackDamage },
                      { label: "Base Attack Speed", value: championDetails.attackSpeed },
                    ].map((stat, index) => (
                      <p key={index}>
                        <span className="text-white">{stat.label}:</span> {stat.value}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
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
            
            <div className="mt-8 flex flex-col items-center">
              <h1 className="text-xl font-bold text-yellow-300 text-center mb-2">Player Tips and Tricks</h1>
              
              <div className="flex flex-col items-center w-full">
                <textarea
                  maxLength={50} 
                  name="Name" 
                  id="NameID" 
                  className="bg-gray-800 rounded-lg w-full p-4 resize-none font-mono mb-4"
                  placeholder="Who is giving these tips? (Username)">
                </textarea>

                <textarea 
                  maxLength={200}
                  name="TipsAndTricks" 
                  id="TipsAndTricksID" 
                  className="bg-gray-800 rounded-lg w-full p-4 font-mono"
                  placeholder="Add your tips and tricks here...">
                </textarea>
                <button
                  className="mt-4 bg-blue-500 hover:bg-blue-600 font-bold py-2 px-4 rounded"
                  onClick={SubmitTip}
                >
                  Submit Tip
                </button>
              </div>
            </div>

            <div>
              <div className="mb-2 w-full mt-4">
                <h3 className="text-xl font-bold text-yellow-300 text-center mb-2">Current Tips for {championDetails?.champName}</h3>
                {championTips && championTips.length > 0 ? (
                  <div className="items-center">
                    {championTips.map((tip, index) => (
                      <div key={index} className="mb-4 p-4 bg-gray-800 rounded-lg">
                        <p className="font-bold text-green-600 mb-2">By: {tip.Author}</p>
                        <p className="">{tip.HelpText}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-gray-400 text-center">No tips currently. Be the first to add!</div>
                )}
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