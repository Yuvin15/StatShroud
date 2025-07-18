'use client';

import { useState } from 'react';
import Image from 'next/image'

export default function League() {
  
  const [selectedRegion, setSelectedRegion] = useState('euw1');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Individual state for each piece of player data
  const [gameName, setGameName] = useState('Player Name');
  const [summonerLevel, setSummonerLevel] = useState('Level');
  const [profileIconId, setProfileIconId] = useState(4567);
  const [ddData, setddVersion] = useState([]);
  const [soloRank, setSoloRank] = useState('Gold II');
  const [flexRank, setFlexRank] = useState('Gold II');
  
  // Track if we've found player data
  const [hasPlayerData, setHasPlayerData] = useState(false);

  // API call function
  const handleSubmit = async () => {

    setHasPlayerData(false);

    // Input validation
    if (!username.trim()) {
      alert('Please enter a username');
      return;
    }

    // Parse username and tag
    const parts = username.split('#');
    if (parts.length !== 2) {
      alert('Please enter username in format: Username#Tag');
      return;
    }

    const [inputGameName, tagLine] = parts;
    const apiRegion = selectedRegion;

    // Set loading state
    setLoading(true);
    setError(null);

    try 
    {
      console.log('Searching for:', inputGameName, tagLine, 'in region:', apiRegion);
      
      const ddVersion = await fetch(`https://ddragon.leagueoflegends.com/api/versions.json`);
      const ddData = await ddVersion.json();
      // Make the API call
      const response = await fetch(`https://localhost:44365/Riot/GetAccount?gameName=${inputGameName}&tagLine=${tagLine}&region=${apiRegion}`);
      
      if (!response.ok) {
        throw new Error('Player not found');
      }
      
      const data = await response.json();
      
      // Update individual state variables
      setGameName(data.gameName);
      setSummonerLevel(data.summonerLevel);
      setProfileIconId(data.profileIconId);
      setSoloRank(data.soloRank);
      setFlexRank(data.flexRank);
      setddVersion(ddData[0]);
      
      // Show the player data now that we have it
      setHasPlayerData(true);
      
      console.log('Player data:', data);
    } catch (err) {
      // Handle errors
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      console.error('Error fetching player data:', err);
    } finally {
      // Reset loading state
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-8 ">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">League Stats Tracker</h1>
            <p className="">Search for player statistics and match history</p>
          </div>
          
          <div className="flex justify-center mb-8 text-black">
            <div className="flex flex-col gap-4 bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
              <h2 className="text-2xl font-bold text-center">Player Search</h2>

              <div className="flex">
                <select
                  id="Selector"
                  name="SelectName"
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
                </select>

                <input
                  type="text"
                  placeholder="Username#Tag"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="border rounded-r-md p-2 flex-1 focus:outline-none focus:ring-2 focus:ring-black"
                  disabled={loading}
                  onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="button disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </div>

            <div className="w-full max-w-4xl border border-black rounded-xl mx-auto">
              <table className="w-full table-auto border-collapse">
                <tbody className="">
                  <tr className="border-b border-black text-white bg-[#25b8f7]">
                    <td className="p-4">
                      <div className="flex items-center">
                          <Image
                            id="PlayerIconID"
                            src={`https://ddragon.leagueoflegends.com/cdn/15.14.1/img/champion/Yunara.png`}
                            width={100}
                            height={100}
                            unoptimized
                            alt='PlayerChampion'
                          />
                        {/* Label */}
                        <div className="ml-4">
                          <p className="font-bold">Champion Name</p>
                        </div>
                      </div>
                    </td>

                    <td className="p-4">
                      <div className="flex flex-col text-sm space-y-1">
                        <span>Lane</span>
                        <span>KDA</span>
                        <span>CS</span>
                      </div>
                    </td>

                    <td className="p-4 text-right">
                      <button className="px-4 py-2 bg-white text-black font-medium rounded-lg hover:bg-gray-200 transition">
                        <p className='font-bold'>See details</p>
                      </button>
                    </td>
                  </tr>
                  
                  <tr className="border-b border-black text-white bg-[#b80000]">
                    <td className="p-4">
                      <div className="flex items-center">
                          <Image
                            id="PlayerIconID"
                            src={`https://ddragon.leagueoflegends.com/cdn/15.14.1/img/champion/Yunara.png`}
                            width={100}
                            height={100}
                            unoptimized
                            alt='PlayerChampion'
                          />
                        {/* Label */}
                        <div className="ml-4">
                          <p className="font-bold">Champion Name</p>
                        </div>
                      </div>
                    </td>

                    <td className="p-4">
                      <div className="flex flex-col text-sm space-y-1">
                        <span>Lane</span>
                        <span>KDA</span>
                        <span>CS</span>
                      </div>
                    </td>

                    <td className="p-4 text-right">
                      <button className="px-4 py-2 bg-white text-black font-medium rounded-lg hover:bg-gray-200 transition">
                        <p className='font-bold'>See details</p>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>


          {/* Show error if there is one */}
          {error && (
            <div className="flex justify-center mb-4">
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md">
                Error: {error}
              </div>
            </div>
          )}

          {/* Player profile - only show if we have data */}
          {hasPlayerData && (
            <div className="playerprofile">
              <div className="profilecontent">
                <Image
                  id="PlayerIconID"
                  src={`https://ddragon.leagueoflegends.com/cdn/15.14.1/img/profileicon/${profileIconId}.png`}
                  width={100}
                  height={100}
                  unoptimized
                  alt='PlayerProfile'
                />
                <div className="space-y-2 content-center">
                  <p>
                    <span className="font-bold" id="PlayerNameID">{gameName}</span>&nbsp;
                    <span id="PlayerLevelID">Level {summonerLevel}</span>
                  </p>
                  <p>
                    <span className="font-medium" id="SoloqID">Ranked Solo/Duo Queue:</span> {soloRank}
                  </p>
                  <p>
                    <span className="font-medium" id="FlexqID">Ranked Flex Queue:</span> {flexRank}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Show loading spinner when loading */}
          {loading && (
            <div className="flex justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                <p>Loading player data...</p>
              </div>
            </div>
          )}
        </div>
      </div>
  );
}