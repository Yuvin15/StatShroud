'use client';

import { useState } from 'react';
import Image from 'next/image'

export default function League() {
  const [selectedRegion, setSelectedRegion] = useState('EUW');
  const [username, setUsername] = useState('');

  const handleSubmit = () => {
    if (!username.trim()) {
      alert('Please enter a username');
      return;
    }
    
    console.log('Searching for:', username, 'in region:', selectedRegion);
  };

  return (
    <div className="min-h-screenpy-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">League Stats Tracker</h1>
          <p className="">Search for player statistics and match history</p>
        </div>
        <div className="flex justify-center mb-8 text-black">
          <div className="flex flex-col gap-4 bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold text-cente">Player Search</h2>

            <div className="flex">
              <select
                id="Selector"
                name="SelectName"
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="border border-r-0 rounded-l-md p-2 w-40 focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="EUW">EUW</option>
                <option value="EUNE">EUNE</option>
                <option value="NA">NA</option>
                <option value="KR">KR</option>
                <option value="OCE">OCE</option>
              </select>

              <input
                type="text"
                placeholder="Username#Tag"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border rounded-r-md p-2 flex-1 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <button
              onClick={handleSubmit}
              className="btn btn-three"
            >
              To reveal stats
            </button>
          </div>
        </div>

        <div className="playerprofile">
          <div className="profilecontent">
             <Image
                id="PlayerIconID"
                src="https://ddragon.leagueoflegends.com/cdn/14.14.1/img/profileicon/4567.png"
                width={100}
                height={100}
                unoptimized
                alt="Picture of the author"
              />
            <div className="space-y-2 content-center">
              <p>
                <span className="font-bold" id="PlayerNameID">Player Name</span>&nbsp;<span id="PlayerLevelID">Level</span>
              </p>
              <p>
                <span className="font-medium" id="SoloqID">Ranked Solo/Duo Queue:</span> Gold II
              </p>
              <p>
                <span className="font-medium" id="FlexqID">Ranked Flex Queue</span> Gold II
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}