'use client';

import React from 'react';
import Image from "next/image";
import Footer from '../../components/Footer';
import { useEffect, useState } from "react"; 
import Navbar from "../../components/navbar";
import { useSearchParams } from "next/navigation";
import ItemModal from '@/app/components/ItemModal';

export default function CompareStatsPage() {

  const searchParams = useSearchParams();
  const [selectedRegion, setSelectedRegion] = useState('euw1');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [gameName, setGameName] = useState('Player Name');
  const [summonerLevel, setSummonerLevel] = useState('Level');
  const [profileIconId, setProfileIconId] = useState(4567);
  const [ddData, setddVersion] = useState([]);
  const [soloRank, setSoloRank] = useState('Unranked');
  const [flexRank, setFlexRank] = useState('Unranked');
  const [matchHistory, setMatchHistory] = useState([]);
  const [hasPlayerData, setHasPlayerData] = useState(false);
  const [topPlayed, setTopPlayed] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isArenaModalOpen, setArenaIsModalOpen] = useState(false);
  const [selectedMatchId, setSelectedMatchId] = useState<string>('');

  const [hasSubmitted, setHasSubmitted] = useState(true);

  useEffect(() => {
    const playerName = searchParams.get("playerName");
    const region = searchParams.get("region");
    setHasSubmitted(true);

    if (playerName)
    { 
      setUsername(playerName);
    };
    if (region)
    { 
      setSelectedRegion(region);
    };

    if (playerName && region) 
    {
      setHasSubmitted(false);
    }

  }, [searchParams, hasSubmitted]);

  useEffect(() => {
    
    if (username && selectedRegion && !hasSubmitted) 
    {
      handleSubmit();
    }
  }, [username, selectedRegion]);

  const handleSubmit = async () => {

    setHasPlayerData(false);

    if (!username.trim()) {
      alert('Please enter a username');
      return;
    }

    const parts = username.split('#');
    if (parts.length !== 2) {
      alert('Please enter username in format: Username#Tag');
      return;
    }

    const [inputGameName, tagLine] = parts;
    const apiRegion = selectedRegion;

    setLoading(true);
    setError(null);

    try 
    {
      const ddVersion = await fetch(`https://ddragon.leagueoflegends.com/api/versions.json`);
      const ddData = await ddVersion.json();

      const response = await fetch(`https://localhost:44365/Riot/GetAccount?gameName=${inputGameName}&tagLine=${tagLine}&region=${apiRegion}`);
      const topPlayedResponse = await fetch(`https://localhost:44365/Riot/GetTopPlayed?gameName=${inputGameName}&tagLine=${tagLine}&region=${apiRegion}`);
      if (!response.ok && !topPlayedResponse.ok) {
        throw new Error('Stats not found');
      }
      
      const data = await response.json();
      const topPlayedData = await topPlayedResponse.json();
      setGameName(data.gameName);
      setSummonerLevel(data.summonerLevel);
      setProfileIconId(data.profileIconId);
      setSoloRank(data.soloRank);
      setFlexRank(data.flexRank);
      setMatchHistory(data.basicMatchDetails);
      setddVersion(ddData[0]);
      
      setTopPlayed(topPlayedData);
      console.log(topPlayed);

      setHasPlayerData(true);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit2 = async () => {

    setHasPlayerData(false);

    if (!username.trim()) {
      alert('Please enter a username');
      return;
    }

    const parts = username.split('#');
    if (parts.length !== 2) {
      alert('Please enter username in format: Username#Tag');
      return;
    }

    const [inputGameName, tagLine] = parts;
    const apiRegion = selectedRegion;

    setLoading(true);
    setError(null);

    try 
    {
      const ddVersion = await fetch(`https://ddragon.leagueoflegends.com/api/versions.json`);
      const ddData = await ddVersion.json();

      const response = await fetch(`https://localhost:44365/Riot/GetAccount?gameName=${inputGameName}&tagLine=${tagLine}&region=${apiRegion}`);
      const topPlayedResponse = await fetch(`https://localhost:44365/Riot/GetTopPlayed?gameName=${inputGameName}&tagLine=${tagLine}&region=${apiRegion}`);
      if (!response.ok && !topPlayedResponse.ok) {
        throw new Error('Stats not found');
      }
      
      const data = await response.json();
      const topPlayedData = await topPlayedResponse.json();
      setGameName(data.gameName);
      setSummonerLevel(data.summonerLevel);
      setProfileIconId(data.profileIconId);
      setSoloRank(data.soloRank);
      setFlexRank(data.flexRank);
      setMatchHistory(data.basicMatchDetails);
      setddVersion(ddData[0]);
      
      setTopPlayed(topPlayedData);
      console.log(topPlayed);

      setHasPlayerData(true);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
    return (
        <main className="flex flex-col min-h-screen">
          <Navbar />

          <div className="flex-grow">
            <h3 className="text-3xl font-bold text-center m-5">
              Compare your account stats with another player here.
            </h3>
            <p className="text-center mt-2 text-gray-400">
              (Note this only shows rank, account level, and total mastery score)
            </p>

            {/* Search Section */}
            <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 mt-10 px-4">
              
              {/* Player 1 */}
              <div className="flex-1 max-w-md bg-white p-8 rounded-2xl shadow-lg text-black mx-auto">
                <h4 className="text-xl font-semibold mb-4 text-center">Player 1</h4>

                <div className="flex mb-4">
                  <select
                    id="Selector1"
                    name="SelectName1"
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="border border-r-0 rounded-l-md p-2 w-40 focus:outline-none focus:ring-2 focus:ring-black"
                    disabled={loading}
                  >
                    <option value="euw1">EUW</option>
                    <option value="eun1">EUNE</option>
                    <option value="na1">NA</option>
                    <option value="kr">KR</option>
                    <option value="jp1">JP</option>
                    <option value="br1">BR</option>
                    <option value="la1">LAN</option>
                    <option value="la2">LAS</option>
                    <option value="oc1">OCE</option>
                    <option value="ru">RU</option>
                    <option value="tr1">TR</option>
                    <option value="ph2">PH</option>
                    <option value="sg2">SG</option>
                    <option value="th2">TH</option>
                    <option value="tw2">TW</option>
                    <option value="vn2">VN</option>
                  </select>

                  <input
                    type="text"
                    placeholder="Username#Tag"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border rounded-r-md p-2 flex-1 focus:outline-none focus:ring-2 focus:ring-black"
                    disabled={loading}
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full py-2 bg-black text-white font-semibold rounded-md hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Searching...' : 'Search'}
                </button>
              </div>

              {/* Player 2 */}
              <div className="flex-1 max-w-md bg-white p-8 rounded-2xl shadow-lg text-black mx-auto">
                <h4 className="text-xl font-semibold mb-4 text-center">Player 2</h4>

                <div className="flex mb-4">
                  <select
                    id="Selector2"
                    name="SelectName2"
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="border border-r-0 rounded-l-md p-2 w-40 focus:outline-none focus:ring-2 focus:ring-black"
                    disabled={loading}
                  >
                    <option value="euw1">EUW</option>
                    <option value="eun1">EUNE</option>
                    <option value="na1">NA</option>
                    <option value="kr">KR</option>
                    <option value="jp1">JP</option>
                    <option value="br1">BR</option>
                    <option value="la1">LAN</option>
                    <option value="la2">LAS</option>
                    <option value="oc1">OCE</option>
                    <option value="ru">RU</option>
                    <option value="tr1">TR</option>
                    <option value="ph2">PH</option>
                    <option value="sg2">SG</option>
                    <option value="th2">TH</option>
                    <option value="tw2">TW</option>
                    <option value="vn2">VN</option>
                  </select>

                  <input
                    type="text"
                    placeholder="Username#Tag"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border rounded-r-md p-2 flex-1 focus:outline-none focus:ring-2 focus:ring-black"
                    disabled={loading}
                  />
                </div>

                <button
                  onClick={handleSubmit2}
                  disabled={loading}
                  className="w-full py-2 bg-black text-white font-semibold rounded-md hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Searching...' : 'Search'}
                </button>
              </div>

            </div>
          </div>

          <Footer />
        </main>

    );
}