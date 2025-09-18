'use client';

import { useEffect, useState } from "react";
import Image from 'next/image'
import MatchModal from '../components/MatchModal';
import ArenaMatchModal from '../components/ArenaMatchModal'; 
import Footer from '../components/Footer';
import Navbar from '../components/navbar';
import { useSearchParams } from "next/navigation";

export default function League() {
  
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


  const openModal = (matchID: string, gameMode: string) => {
    if(gameMode === 'Arena') {
      setSelectedMatchId(matchID);
      setArenaIsModalOpen(true);
    } else {
      setSelectedMatchId(matchID);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setArenaIsModalOpen(false);
    setSelectedMatchId('');
  };

  return (
    <div className="flex flex-col min-h-screen">
    <main className="flex-grow">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 mt-6">
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
                className="button disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </div>
          
          {error && (
            <div className="flex justify-center mb-4">
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md">
                Error: {error}
              </div>
            </div>
          )}

          {hasPlayerData && (
            <div className="">
              <div className="profilecontent playerprofile">
                <Image
                  id="PlayerIconID"
                  src={`https://ddragon.leagueoflegends.com/cdn/${ddData}/img/profileicon/${profileIconId}.png`}
                  width={100}
                  height={100}
                  unoptimized
                  alt='PlayerProfile'
                  title='PlayerProfile'
                />
                <div className="space-y-2 content-center">
                  <p>
                    <span className="font-bold" id="PlayerNameID">{gameName}</span>&nbsp;
                    <span id="PlayerLevelID">Level {summonerLevel}</span>
                  </p>
                  <p>
                    <span className="font-bold" id="SoloqID">Ranked Solo/Duo Queue:</span> {soloRank}
                  </p>
                  <p>
                    <span className="font-bold" id="FlexqID">Ranked Flex Queue:</span> {flexRank}
                  </p>
                </div>

                <div className="p-4 font-black">
                  <h1>Top Played</h1>
                  <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-center justify-center w-full max-w-2xl">
                    <span>
                      2nd
                      <Image
                        src={`https://ddragon.leagueoflegends.com/cdn/${ddData}/img/champion/${topPlayed[1].championName}.png`}
                        width={80}
                        height={80}
                        unoptimized
                        alt={`${topPlayed[1].championName}`}
                        title={topPlayed[1].championName}
                      />
                      {topPlayed[1].championPoints}
                    </span>
                    <span>
                      1st
                      <Image
                        src={`https://ddragon.leagueoflegends.com/cdn/${ddData}/img/champion/${topPlayed[0].championName}.png`}
                        width={100}
                        height={100}
                        unoptimized
                        alt={`${topPlayed[0].championName}`}
                        title={topPlayed[0].championName}
                      />
                      {topPlayed[0].championPoints}
                    </span>
                    <span>
                      3rd
                      <Image
                        src={`https://ddragon.leagueoflegends.com/cdn/${ddData}/img/champion/${topPlayed[2].championName}.png`}
                        width={60}
                        height={60}
                        unoptimized
                        alt={`${topPlayed[2].championName}`}
                        title={topPlayed[2].championName}
                      />
                      {topPlayed[2].championPoints}
                    </span>
                  </div>
                </div>

              </div>

              <div className="p-4">
                <p className="font-black text-center mb-4">Last 20 Games</p>

                <div className="space-y-4">
                  {matchHistory.map((match: any, index: number) => (
                    <div
                      key={index}
                      className={`flex flex-col sm:flex-row items-center sm:justify-between text-white p-4 ${
                        match.gameWinner === 'Victory' ? 'bg-[#25b8f7]' : 'bg-[#b80000]'
                      }`}
                    >
                      
                      <div className="flex items-center mb-2 sm:mb-0">
                        <Image
                          src={`https://ddragon.leagueoflegends.com/cdn/${ddData}/img/champion/${match.championName}.png`}
                          width={60}
                          height={60}
                          unoptimized
                          alt={match.championName}
                          title={match.championName}
                          className=""
                        />
                        <div className="m-3">
                          <p className="font-bold">{match.championName}</p>
                          <p className="text-sm">{match.gameMode}</p>
                        </div>
                      </div>

                      <div className="flex flex-col text-sm mb-2 sm:mb-0">
                        <span>KDA: {match.kda}</span>
                        <span>CS: {match.farm}</span>
                      </div>

                      <div className="w-full sm:w-auto text-center sm:text-right">
                        <button
                          className="px-4 py-2 bg-white text-black font-medium rounded-lg hover:bg-black hover:text-white transition"
                          onClick={() => openModal(match.matchID, match.gameMode)}
                        >
                          <p className="font-bold">See details</p>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {loading && (
            <div className="flex justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                <p>Loading player data...</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Render the modal */}
        {isModalOpen && (
          <MatchModal
            matchId={selectedMatchId}
            isOpen={isModalOpen}
            onClose={closeModal}
            gameRegion={selectedRegion}
            ddVersion={ddData}
          />
        )}

        {/* Render the modal */}
        {isArenaModalOpen && (
          <ArenaMatchModal
            matchId={selectedMatchId}
            isOpen={isArenaModalOpen}
            onClose={closeModal}
            gameRegion={selectedRegion}
            ddVersion={ddData}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}