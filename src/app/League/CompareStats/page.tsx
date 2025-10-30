'use client';

import React from 'react';
import Image from "next/image";
import Footer from '../../components/Footer';
import { useEffect, useState } from "react"; 
import Navbar from "../../components/navbar";
import { useSearchParams } from "next/navigation";
import ItemModal from '@/app/components/ItemModal';

interface LeaderBoard {
    tier: string;
    leagueId: string;
    queue : number;
    name : number;
    entry: Entry;
}

interface Entry{

}

export default function CompareStatsPage() {

const searchParams = useSearchParams();
    const [ddData, setddVersion] = useState<string[]>([]);
    const [leaderboardData, setleaderboardData] = useState<LeaderBoard>();

    useEffect(() => {
      const fetchData = async () => {
          try {
              const leaderboardResponse = await fetch('https://localhost:44365/Riot/GetItems');
              const leaderboardData = await leaderboardResponse.json();

              const ddVersion = await fetch(`https://ddragon.leagueoflegends.com/api/versions.json`);
              const versionData = await ddVersion.json();

              setddVersion(versionData);
              setleaderboardData(leaderboardData);
          } catch (err) {
              console.error(err);
          } finally {
              console.log("Fetch attempt finished.");
          }
      };

      fetchData();
    }, []);

    return (
      <main className="min-h-screen">
        <Navbar />
          <div>

          </div>
        <Footer />
      </main>
    );
}