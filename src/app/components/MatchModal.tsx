"use client";

import { useState } from "react";
import Image from "next/image";

interface MatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  matchId: any;
}

const MatchModal = ({ isOpen, onClose, matchId }: MatchModalProps) => {
  if (!isOpen) return null;

  const [expanded, setExpanded] = useState({
    blue1: false,
    blue2: false,
    blue3: false,
    blue4: false,
    blue5: false,
    red1: false,
    red2: false,
    red3: false,
    red4: false,
    red5: false,
  });

  const toggleExpand = (key: keyof typeof expanded) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="rounded-2xl shadow-2xl p-6 mx-4 bg-[#0A0A0A] w-full max-w-6xl text-white transition-all duration-300 border border-gray-700 max-h-[90vh] overflow-y-auto">
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

        {/* Match ID */}
        {matchId && (
          <p className="mb-4 text-sm text-gray-400">Match ID: {matchId}</p>
        )}

        {/* Scoreboard */}
        <div className="grid grid-cols-2 gap-4">
          {/* Blue Side */}
          <div>
            <h3 className="text-blue-400 text-xl font-semibold mb-2">Blue Side</h3>

            {/* Player Row - Blue 1 */}
            <div className="bg-black rounded-lg p-3 mb-3 text-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Image
                    src="https://ddragon.leagueoflegends.com/cdn/15.14.1/img/champion/MissFortune.png"
                    width={48}
                    height={48}
                    alt="Champion"
                    unoptimized
                    className="rounded"
                  />
                  <div>
                    <p className="font-bold">KDA: 10 / 2 / 5</p>
                    <p className="text-gray-300">Farm: 200 CS</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/15.14.1/img/item/1001.png`}
                  width={28}
                  height={28}
                  alt="Item"
                  unoptimized
                  />
                  <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/15.14.1/img/item/1001.png`}
                  width={28}
                  height={28}
                  alt="Item"
                  unoptimized
                  />
                  <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/15.14.1/img/item/1001.png`}
                  width={28}
                  height={28}
                  alt="Item"
                  unoptimized
                  />
                  <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/15.14.1/img/item/1001.png`}
                  width={28}
                  height={28}
                  alt="Item"
                  unoptimized
                  />
                  <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/15.14.1/img/item/1001.png`}
                  width={28}
                  height={28}
                  alt="Item"
                  unoptimized
                  />
                  <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/15.14.1/img/item/1001.png`}
                  width={28}
                  height={28}
                  alt="Item"
                  unoptimized
                  />
                </div>
                <button
                  onClick={() => toggleExpand("blue1")}
                  className="text-white text-xl px-2"
                >
                  {expanded.blue1 ? "▲" : "▼"}
                </button>
              </div>

              {expanded.blue1 && (
                <div className="pt-3 border-t border-blue-900 text-gray-300 grid grid-cols-2 gap-x-6 gap-y-1 mt-2">
                  <p>Damage Dealt: 9,000</p>
                  <p>Damage Taken: 1,200</p>
                  <p>TurrentDamage: 2,000</p>
                  <p>Objective Damage: 3,000</p>
                  <p>Healing & Shielding: 1,000</p>
                  <p>Skillshots Hit: 8</p>
                  <p>Skillshots Missed: 7</p>
                </div>
              )}
            </div>

            <div className="bg-black rounded-lg p-3 mb-3 text-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Image
                    src="https://ddragon.leagueoflegends.com/cdn/15.14.1/img/champion/MissFortune.png"
                    width={48}
                    height={48}
                    alt="Champion"
                    unoptimized
                    className="rounded"
                  />
                  <div>
                    <p className="font-bold">KDA: 10 / 2 / 5</p>
                    <p className="text-gray-300">Farm: 200 CS</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/15.14.1/img/item/1001.png`}
                  width={28}
                  height={28}
                  alt="Item"
                  unoptimized
                  />
                  <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/15.14.1/img/item/1001.png`}
                  width={28}
                  height={28}
                  alt="Item"
                  unoptimized
                  />
                  <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/15.14.1/img/item/1001.png`}
                  width={28}
                  height={28}
                  alt="Item"
                  unoptimized
                  />
                  <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/15.14.1/img/item/1001.png`}
                  width={28}
                  height={28}
                  alt="Item"
                  unoptimized
                  />
                  <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/15.14.1/img/item/1001.png`}
                  width={28}
                  height={28}
                  alt="Item"
                  unoptimized
                  />
                  <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/15.14.1/img/item/1001.png`}
                  width={28}
                  height={28}
                  alt="Item"
                  unoptimized
                  />
                </div>
                <button
                  onClick={() => toggleExpand("blue2")}
                  className="text-white text-xl px-2"
                >
                  {expanded.blue2 ? "▲" : "▼"}
                </button>
              </div>

              {expanded.blue2 && (
                <div className="pt-3 border-t border-blue-900 text-gray-300 grid grid-cols-2 gap-x-6 gap-y-1 mt-2">
                  <p>Damage Dealt: 9,000</p>
                  <p>Damage Taken: 1,200</p>
                  <p>TurrentDamage: 2,000</p>
                  <p>Objective Damage: 3,000</p>
                  <p>Healing & Shielding: 1,000</p>
                  <p>Skillshots Hit: 8</p>
                  <p>Skillshots Missed: 7</p>
                </div>
              )}
            </div>

            <div className="bg-black rounded-lg p-3 mb-3 text-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Image
                    src="https://ddragon.leagueoflegends.com/cdn/15.14.1/img/champion/MissFortune.png"
                    width={48}
                    height={48}
                    alt="Champion"
                    unoptimized
                    className="rounded"
                  />
                  <div>
                    <p className="font-bold">KDA: 10 / 2 / 5</p>
                    <p className="text-gray-300">Farm: 200 CS</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/15.14.1/img/item/1001.png`}
                  width={28}
                  height={28}
                  alt="Item"
                  unoptimized
                  />
                  <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/15.14.1/img/item/1001.png`}
                  width={28}
                  height={28}
                  alt="Item"
                  unoptimized
                  />
                  <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/15.14.1/img/item/1001.png`}
                  width={28}
                  height={28}
                  alt="Item"
                  unoptimized
                  />
                  <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/15.14.1/img/item/1001.png`}
                  width={28}
                  height={28}
                  alt="Item"
                  unoptimized
                  />
                  <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/15.14.1/img/item/1001.png`}
                  width={28}
                  height={28}
                  alt="Item"
                  unoptimized
                  />
                  <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/15.14.1/img/item/1001.png`}
                  width={28}
                  height={28}
                  alt="Item"
                  unoptimized
                  />
                </div>
                <button
                  onClick={() => toggleExpand("blue3")}
                  className="text-white text-xl px-2"
                >
                  {expanded.blue3 ? "▲" : "▼"}
                </button>
              </div>

              {expanded.blue3 && (
                <div className="pt-3 border-t border-blue-900 text-gray-300 grid grid-cols-2 gap-x-6 gap-y-1 mt-2">
                  <p>Damage Dealt: 9,000</p>
                  <p>Damage Taken: 1,200</p>
                  <p>TurrentDamage: 2,000</p>
                  <p>Objective Damage: 3,000</p>
                  <p>Healing & Shielding: 1,000</p>
                  <p>Skillshots Hit: 8</p>
                  <p>Skillshots Missed: 7</p>
                </div>
              )}
            </div>

            <div className="bg-black rounded-lg p-3 mb-3 text-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Image
                    src="https://ddragon.leagueoflegends.com/cdn/15.14.1/img/champion/MissFortune.png"
                    width={50}
                    height={50}
                    alt="Champion"
                    unoptimized
                    className="rounded"
                  />
                  <div>
                    <p className="font-bold">KDA: 10 / 2 / 5</p>
                    <p className="text-gray-300">Farm: 200 CS</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/15.14.1/img/item/1001.png`}
                  width={28}
                  height={28}
                  alt="Item"
                  unoptimized
                  />
                  <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/15.14.1/img/item/1001.png`}
                  width={28}
                  height={28}
                  alt="Item"
                  unoptimized
                  />
                  <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/15.14.1/img/item/1001.png`}
                  width={28}
                  height={28}
                  alt="Item"
                  unoptimized
                  />
                  <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/15.14.1/img/item/1001.png`}
                  width={28}
                  height={28}
                  alt="Item"
                  unoptimized
                  />
                  <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/15.14.1/img/item/1001.png`}
                  width={28}
                  height={28}
                  alt="Item"
                  unoptimized
                  />
                  <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/15.14.1/img/item/1001.png`}
                  width={28}
                  height={28}
                  alt="Item"
                  unoptimized
                  />
                </div>
                <button
                  onClick={() => toggleExpand("blue4")}
                  className="text-white text-xl px-2"
                >
                  {expanded.blue4 ? "▲" : "▼"}
                </button>
              </div>

              {expanded.blue4 && (
                <div className="pt-3 border-t border-blue-900 text-gray-300 grid grid-cols-2 gap-x-6 gap-y-1 mt-2">
                  <p>Damage Dealt: 9,000</p>
                  <p>Damage Taken: 1,200</p>
                  <p>TurrentDamage: 2,000</p>
                  <p>Objective Damage: 3,000</p>
                  <p>Healing & Shielding: 1,000</p>
                  <p>Skillshots Hit: 8</p>
                  <p>Skillshots Missed: 7</p>
                </div>
              )}
            </div>

            <div className="bg-black rounded-lg p-3 mb-3 text-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Image
                    src="https://ddragon.leagueoflegends.com/cdn/15.14.1/img/champion/MissFortune.png"
                    width={48}
                    height={48}
                    alt="Champion"
                    unoptimized
                    className="rounded"
                  />
                  <div>
                    <p className="font-bold">KDA: 10 / 2 / 5</p>
                    <p className="text-gray-300">Farm: 200 CS</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/15.14.1/img/item/1001.png`}
                  width={28}
                  height={28}
                  alt="Item"
                  unoptimized
                  />
                  <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/15.14.1/img/item/1001.png`}
                  width={28}
                  height={28}
                  alt="Item"
                  unoptimized
                  />
                  <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/15.14.1/img/item/1001.png`}
                  width={28}
                  height={28}
                  alt="Item"
                  unoptimized
                  />
                  <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/15.14.1/img/item/1001.png`}
                  width={28}
                  height={28}
                  alt="Item"
                  unoptimized
                  />
                  <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/15.14.1/img/item/1001.png`}
                  width={28}
                  height={28}
                  alt="Item"
                  unoptimized
                  />
                  <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/15.14.1/img/item/1001.png`}
                  width={28}
                  height={28}
                  alt="Item"
                  unoptimized
                  />
                </div>
                <button
                  onClick={() => toggleExpand("blue5")}
                  className="text-white text-xl px-2"
                >
                  {expanded.blue5 ? "▲" : "▼"}
                </button>
              </div>

              {expanded.blue5 && (
                <div className="pt-3 border-t border-blue-900 text-gray-300 grid grid-cols-2 gap-x-6 gap-y-1 mt-2">
                  <p>Damage Dealt: 9,000</p>
                  <p>Damage Taken: 1,200</p>
                  <p>TurrentDamage: 2,000</p>
                  <p>Objective Damage: 3,000</p>
                  <p>Healing & Shielding: 1,000</p>
                  <p>Skillshots Hit: 8</p>
                  <p>Skillshots Missed: 7</p>
                </div>
              )}
            </div>
          </div>

          {/* Red Side */}
          <div>
            <h3 className="text-red-400 text-xl font-semibold mb-2">Red Side</h3>

            {/* Player Row - Red 1 */}
            <div className="bg-black rounded-lg p-3 mb-3 text-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Image
                    src="https://ddragon.leagueoflegends.com/cdn/15.14.1/img/champion/Ahri.png"
                    width={48}
                    height={48}
                    alt="Champion"
                    unoptimized
                    className="rounded"
                  />
                  <div>
                    <p className="font-bold">KDA: 3 / 8 / 2</p>
                    <p className="text-gray-300">Farm: 130 CS</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Image
                    src={`https://ddragon.leagueoflegends.com/cdn/15.14.1/img/item/1001.png`}
                    width={28}
                    height={28}
                    alt="Item"
                    unoptimized
                  />
                  <Image
                    src={`https://ddragon.leagueoflegends.com/cdn/15.14.1/img/item/1001.png`}
                    width={28}
                    height={28}
                    alt="Item"
                    unoptimized
                  />
                  <Image
                    src={`https://ddragon.leagueoflegends.com/cdn/15.14.1/img/item/1001.png`}
                    width={28}
                    height={28}
                    alt="Item"
                    unoptimized
                  />
                  <Image
                    src={`https://ddragon.leagueoflegends.com/cdn/15.14.1/img/item/1001.png`}
                    width={28}
                    height={28}
                    alt="Item"
                    unoptimized
                  />
                  <Image
                    src={`https://ddragon.leagueoflegends.com/cdn/15.14.1/img/item/1001.png`}
                    width={28}
                    height={28}
                    alt="Item"
                    unoptimized
                  />
                  <Image
                    src={`https://ddragon.leagueoflegends.com/cdn/15.14.1/img/item/1001.png`}
                    width={28}
                    height={28}
                    alt="Item"
                    unoptimized
                  />
                </div>
                <button
                  onClick={() => toggleExpand("red1")}
                  className="text-white text-xl px-2"
                >
                  {expanded.red1 ? "▲" : "▼"}
                </button>
              </div>

              {expanded.red1 && (
                <div className="pt-3 border-t border-red-900 text-gray-300 grid grid-cols-2 gap-x-6 gap-y-1 mt-2">
                  <p>Damage Dealt: 9,000</p>
                  <p>Damage Taken: 1,200</p>
                  <p>TurrentDamage: 2,000</p>
                  <p>Objective Damage: 3,000</p>
                  <p>Healing & Shielding: 1,000</p>
                  <p>Skillshots Hit: 8</p>
                  <p>Skillshots Missed: 7</p>
                </div>
              )}
            </div>
            <div className="bg-black rounded-lg p-3 mb-3 text-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Image
                    src="https://ddragon.leagueoflegends.com/cdn/15.14.1/img/champion/Ahri.png"
                    width={48}
                    height={48}
                    alt="Champion"
                    unoptimized
                    className="rounded"
                  />
                  <div>
                    <p className="font-bold">KDA: 3 / 8 / 2</p>
                    <p className="text-gray-300">Farm: 130 CS</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Image
                    src={`https://ddragon.leagueoflegends.com/cdn/15.14.1/img/item/1001.png`}
                    width={28}
                    height={28}
                    alt="Item"
                    unoptimized
                  />
                  <Image
                    src={`https://ddragon.leagueoflegends.com/cdn/15.14.1/img/item/1001.png`}
                    width={28}
                    height={28}
                    alt="Item"
                    unoptimized
                  />
                  <Image
                    src={`https://ddragon.leagueoflegends.com/cdn/15.14.1/img/item/1001.png`}
                    width={28}
                    height={28}
                    alt="Item"
                    unoptimized
                  />
                  <Image
                    src={`https://ddragon.leagueoflegends.com/cdn/15.14.1/img/item/1001.png`}
                    width={28}
                    height={28}
                    alt="Item"
                    unoptimized
                  />
                  <Image
                    src={`https://ddragon.leagueoflegends.com/cdn/15.14.1/img/item/1001.png`}
                    width={28}
                    height={28}
                    alt="Item"
                    unoptimized
                  />
                  <Image
                    src={`https://ddragon.leagueoflegends.com/cdn/15.14.1/img/item/1001.png`}
                    width={28}
                    height={28}
                    alt="Item"
                    unoptimized
                  />
                </div>
                <button
                  onClick={() => toggleExpand("red2")}
                  className="text-white text-xl px-2"
                >
                  {expanded.red2 ? "▲" : "▼"}
                </button>
              </div>

              {expanded.red2 && (
                <div className="pt-3 border-t border-red-900 text-gray-300 grid grid-cols-2 gap-x-6 gap-y-1 mt-2">
                  <p>Damage Dealt: 9,000</p>
                  <p>Damage Taken: 1,200</p>
                  <p>TurrentDamage: 2,000</p>
                  <p>Objective Damage: 3,000</p>
                  <p>Healing & Shielding: 1,000</p>
                  <p>Skillshots Hit: 8</p>
                  <p>Skillshots Missed: 7</p>
                </div>
              )}
            </div>

            <div className="bg-black rounded-lg p-3 mb-3 text-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Image
                    src="https://ddragon.leagueoflegends.com/cdn/15.14.1/img/champion/Ahri.png"
                    width={48}
                    height={48}
                    alt="Champion"
                    unoptimized
                    className="rounded"
                  />
                  <div>
                    <p className="font-bold">KDA: 3 / 8 / 2</p>
                    <p className="text-gray-300">Farm: 130 CS</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Image
                    src={`https://ddragon.leagueoflegends.com/cdn/15.14.1/img/item/1001.png`}
                    width={28}
                    height={28}
                    alt="Item"
                    unoptimized
                  />
                  <Image
                    src={`https://ddragon.leagueoflegends.com/cdn/15.14.1/img/item/1001.png`}
                    width={28}
                    height={28}
                    alt="Item"
                    unoptimized
                  />
                  <Image
                    src={`https://ddragon.leagueoflegends.com/cdn/15.14.1/img/item/1001.png`}
                    width={28}
                    height={28}
                    alt="Item"
                    unoptimized
                  />
                  <Image
                    src={`https://ddragon.leagueoflegends.com/cdn/15.14.1/img/item/1001.png`}
                    width={28}
                    height={28}
                    alt="Item"
                    unoptimized
                  />
                  <Image
                    src={`https://ddragon.leagueoflegends.com/cdn/15.14.1/img/item/1001.png`}
                    width={28}
                    height={28}
                    alt="Item"
                    unoptimized
                  />
                  <Image
                    src={`https://ddragon.leagueoflegends.com/cdn/15.14.1/img/item/1001.png`}
                    width={28}
                    height={28}
                    alt="Item"
                    unoptimized
                  />
                </div>
                <button
                  onClick={() => toggleExpand("red3")}
                  className="text-white text-xl px-2"
                >
                  {expanded.red3 ? "▲" : "▼"}
                </button>
              </div>

              {expanded.red3 && (
                <div className="pt-3 border-t border-red-900 text-gray-300 grid grid-cols-2 gap-x-6 gap-y-1 mt-2">
                  <p>Damage Dealt: 9,000</p>
                  <p>Damage Taken: 1,200</p>
                  <p>TurrentDamage: 2,000</p>
                  <p>Objective Damage: 3,000</p>
                  <p>Healing & Shielding: 1,000</p>
                  <p>Skillshots Hit: 8</p>
                  <p>Skillshots Missed: 7</p>
                </div>
              )}
            </div>

            <div className="bg-black rounded-lg p-3 mb-3 text-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Image
                    src="https://ddragon.leagueoflegends.com/cdn/15.14.1/img/champion/Ahri.png"
                    width={48}
                    height={48}
                    alt="Champion"
                    unoptimized
                    className="rounded"
                  />
                  <div>
                    <p className="font-bold">KDA: 3 / 8 / 2</p>
                    <p className="text-gray-300">Farm: 130 CS</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Image
                    src={`https://ddragon.leagueoflegends.com/cdn/15.14.1/img/item/1001.png`}
                    width={28}
                    height={28}
                    alt="Item"
                    unoptimized
                  />
                  <Image
                    src={`https://ddragon.leagueoflegends.com/cdn/15.14.1/img/item/1001.png`}
                    width={28}
                    height={28}
                    alt="Item"
                    unoptimized
                  />
                  <Image
                    src={`https://ddragon.leagueoflegends.com/cdn/15.14.1/img/item/1001.png`}
                    width={28}
                    height={28}
                    alt="Item"
                    unoptimized
                  />
                  <Image
                    src={`https://ddragon.leagueoflegends.com/cdn/15.14.1/img/item/1001.png`}
                    width={28}
                    height={28}
                    alt="Item"
                    unoptimized
                  />
                  <Image
                    src={`https://ddragon.leagueoflegends.com/cdn/15.14.1/img/item/1001.png`}
                    width={28}
                    height={28}
                    alt="Item"
                    unoptimized
                  />
                  <Image
                    src={`https://ddragon.leagueoflegends.com/cdn/15.14.1/img/item/1001.png`}
                    width={28}
                    height={28}
                    alt="Item"
                    unoptimized
                  />
                </div>
                <button
                  onClick={() => toggleExpand("red4")}
                  className="text-white text-xl px-2"
                >
                  {expanded.red4 ? "▲" : "▼"}
                </button>
              </div>

              {expanded.red4 && (
                <div className="pt-3 border-t border-red-900 text-gray-300 grid grid-cols-2 gap-x-6 gap-y-1 mt-2">
                  <p>Damage Dealt: 9,000</p>
                  <p>Damage Taken: 1,200</p>
                  <p>TurrentDamage: 2,000</p>
                  <p>Objective Damage: 3,000</p>
                  <p>Healing & Shielding: 1,000</p>
                  <p>Skillshots Hit: 8</p>
                  <p>Skillshots Missed: 7</p>
                </div>
              )}
            </div>

            <div className="bg-black rounded-lg p-3 mb-3 text-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Image
                    src="https://ddragon.leagueoflegends.com/cdn/15.14.1/img/champion/Ahri.png"
                    width={48}
                    height={48}
                    alt="Champion"
                    unoptimized
                    className="rounded"
                  />
                  <div>
                    <p className="font-bold">KDA: 3 / 8 / 2</p>
                    <p className="text-gray-300">Farm: 130 CS</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Image
                    src={`https://ddragon.leagueoflegends.com/cdn/15.14.1/img/item/1001.png`}
                    width={28}
                    height={28}
                    alt="Item"
                    unoptimized
                  />
                  <Image
                    src={`https://ddragon.leagueoflegends.com/cdn/15.14.1/img/item/1001.png`}
                    width={28}
                    height={28}
                    alt="Item"
                    unoptimized
                  />
                  <Image
                    src={`https://ddragon.leagueoflegends.com/cdn/15.14.1/img/item/1001.png`}
                    width={28}
                    height={28}
                    alt="Item"
                    unoptimized
                  />
                  <Image
                    src={`https://ddragon.leagueoflegends.com/cdn/15.14.1/img/item/1001.png`}
                    width={28}
                    height={28}
                    alt="Item"
                    unoptimized
                  />
                  <Image
                    src={`https://ddragon.leagueoflegends.com/cdn/15.14.1/img/item/1001.png`}
                    width={28}
                    height={28}
                    alt="Item"
                    unoptimized
                  />
                  <Image
                    src={`https://ddragon.leagueoflegends.com/cdn/15.14.1/img/item/1001.png`}
                    width={28}
                    height={28}
                    alt="Item"
                    unoptimized
                  />
                </div>
                <button
                  onClick={() => toggleExpand("red5")}
                  className="text-white text-xl px-2"
                >
                  {expanded.red5 ? "▲" : "▼"}
                </button>
              </div>

              {expanded.red5 && (
                <div className="pt-3 border-t border-red-900 text-gray-300 grid grid-cols-2 gap-x-6 gap-y-1 mt-2">
                  <p>Damage Dealt: 9,000</p>
                  <p>Damage Taken: 1,200</p>
                  <p>TurrentDamage: 2,000</p>
                  <p>Objective Damage: 3,000</p>
                  <p>Healing & Shielding: 1,000</p>
                  <p>Skillshots Hit: 8</p>
                  <p>Skillshots Missed: 7</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end mt-6">
        </div>
      </div>
    </div>
  );
};

export default MatchModal;
