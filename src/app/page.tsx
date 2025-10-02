"use client"

import Navbar from "./components/navbar";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";

interface MaintenanceUpdate {
  id: number;
  translations: { locale: string; content: string }[];
}

interface Maintenance {
  id: number;
  maintenance_status: string;
  titles: { locale: string; content: string }[];
  updates: MaintenanceUpdate[];
}

interface IncidentUpdate {
  id: number;
  translations: { locale: string; content: string }[];
}

interface Incident {
  id: number;
  incident_severity: string | null;
  titles: { locale: string; content: string }[];
  updates: IncidentUpdate[];
}

interface ServerStatus {
  id: string;
  name: string;
  locales: string[];
  maintenances: Maintenance[];
  incidents: Incident[];
}

interface Servers {
  regionName: string;
  serverStatus: ServerStatus;
}

export default function Home() {
  const [server, setseverStatus] = useState<Servers[]>();
  useEffect(() => {
    const fetchData = async () => {
      // You need to define gameRegion and matchId or remove them if not used
      // Example values:
      // const gameRegion = "NA";
      // const matchId = "12345";
      const response = await fetch(
        `https://localhost:44365/Riot/CheckServerStatus`
      );
      // You can handle the response here if needed
      const data = await response.json();

      setseverStatus(data);

    };
    fetchData();
  }, []);

  return (
    <main className="flex flex-col min-h-screen">
      <div className="flex-grow mr-5 ml-5">
        <Navbar />

        <section className="flex flex-col items-center text-center mt-24 mb-8">
          <h1 className="text-5xl font-extrabold mb-6">
            Welcome to first personal big project!
          </h1>
          <p className="text-lg max-w-2xl">
            This is a passion project I've always wanted to build. I challenged myself to bring it to life, and now you can explore everything from champions to your personal stats.
          </p>
        </section>

        <section className="text-center mb-4">
          <h2 className="text-3xl font-bold mb-6">Features</h2>
          <ul className="space-y-4 text-lg">
            <li>View detailed stats for champions, items, and players.</li>
            <li>Feeling lucky? Spin the random champion & role selector!</li>
            <li>Fully responsive design for every device.</li>
          </ul>
        </section>

        <section className="text-center mb-4">
          <h2 className="text-3xl font-bold mb-6">Getting Started</h2>
          <p className="text-lg mb-4">
            These all the current feature. If this gets big enough I will add a lot more features in the future!
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/League/PlayerStats"
              target="_blank"
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 transition"
            >
              View Player Stats
            </a>
            <a
              href="/League/Champions"
              target="_blank"
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 transition"
            >
              View Champions
            </a>
            <a
              href="/League/Items"
              target="_blank"
              className="px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 transition"
            >
              View Items
            </a>
            <a
              href="/League/ChampionPicker"
              target="_blank"
              className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 transition"
            >
              Random Champion and Role Gamble
            </a>
          </div>
          <p className="text-sm text-gray-400 mt-4">(I do not take responsibility for your losses!)</p>
        </section>
      
        <section className="flex flex-col items-center text-center mb-8">
          <h1 className="text-5xl font-extrabold mb-6">
            Server status
          </h1>
          <p className="text-lg max-w-2xl mb-8">
            Currently it only shows League of Legends server status. Will add more games in the future.
          </p>

          {/* AI helped me get this working, when I did it, it was displaying what I wanted. I used a map and then it was displaying differently and it wasn't as I wanted. */}
          {/* I was struggling to get incidents part working  */}
          {/* I do kinda understand it a bit more. Gonna try to do it myself next time. */}
          <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-6 w-full max-w-6xl mr-3 ml-3"> 
            {server?.map((servers) => (
              <section
                key={servers.serverStatus.id}
                className="flex flex-col items-center p-6 rounded-xl shadow-md bg-[#0A0A0A]"
              >
                <h2 className="text-2xl font-bold mb-2">
                  {servers.serverStatus.name} ({servers.regionName})
                </h2>

                {/* Maintenances */}
                <div className="mb-2 w-full">
                  <h3 className="font-semibold text-gray-200">Maintenances:</h3>
                  {servers.serverStatus.maintenances.length > 0 ? (
                    servers.serverStatus.maintenances.map((m) => (
                      <div className="mb-2">
                        <div>
                          Status: <span className="text-sm text-gray-400">{m.maintenance_status}</span>
                        </div>
                        {m.titles.map((t) => (
                          <div>
                            Info: <span className="text-sm text-gray-400">{t.content}</span>
                          </div>
                        ))}
                      </div>
                    ))
                  ) : (
                    <div className="text-sm text-gray-400">No maintenances</div>
                  )}
                </div>

                {/* Incidents */}
                <div className="w-full">
                  <h3 className="font-semibold text-gray-200">Incidents:</h3>
                  {servers.serverStatus.incidents.length > 0 ? (
                    servers.serverStatus.incidents.map((i) => (
                      <div className="mb-2">
                        <div>
                          Severity: <span className="text-sm text-gray-400">{i.incident_severity ?? "None"}</span>
                        </div>
                        {i.titles.map((t) => (
                          <div>
                            Info: <span className="text-sm text-gray-400">{t.content}</span>
                          </div>
                        ))}
                      </div>
                    ))
                  ) : (
                    <div className="text-sm text-gray-400">No incidents</div>
                  )}
                </div>
              </section>
            ))}
          </div>

        </section>

      </div>
      <Footer />
    </main>
  );
}
