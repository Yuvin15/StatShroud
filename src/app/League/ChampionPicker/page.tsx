"use client";

import { ChangeEvent, SetStateAction, useState } from "react";
import Image from "next/image";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/Footer";

const champions = [
    { name: "Aatrox", image: "Aatrox" },
    { name: "Ahri", image: "Ahri" },
    { name: "Akali", image: "Akali" },
    { name: "Akshan", image: "Akshan" },
    { name: "Alistar", image: "Alistar" },
    { name: "Ambessa", image: "Ambessa" },
    { name: "Amumu", image: "Amumu" },
    { name: "Anivia", image: "Anivia" },
    { name: "Annie", image: "Annie" },
    { name: "Aphelios", image: "Aphelios" },
    { name: "Ashe", image: "Ashe" },
    { name: "Aurelion Sol", image: "AurelionSol" },
    { name: "Aurora", image: "Aurora" },
    { name: "Azir", image: "Azir" },
    { name: "Bard", image: "Bard" },
    { name: "Bel'Veth", image: "Belveth" },
    { name: "Blitzcrank", image: "Blitzcrank" },
    { name: "Brand", image: "Brand" },
    { name: "Braum", image: "Braum" },
    { name: "Briar", image: "Briar" },
    { name: "Caitlyn", image: "Caitlyn" },
    { name: "Camille", image: "Camille" },
    { name: "Cassiopeia", image: "Cassiopeia" },
    { name: "Cho'Gath", image: "Chogath" },
    { name: "Corki", image: "Corki" },
    { name: "Darius", image: "Darius" },
    { name: "Diana", image: "Diana" },
    { name: "Draven", image: "Draven" },
    { name: "Dr. Mundo", image: "DrMundo" },
    { name: "Ekko", image: "Ekko" },
    { name: "Elise", image: "Elise" },
    { name: "Evelynn", image: "Evelynn" },
    { name: "Ezreal", image: "Ezreal" },
    { name: "FiddleSticks", image: "Fiddlesticks" },
    { name: "Fiora", image: "Fiora" },
    { name: "Fizz", image: "Fizz" },
    { name: "Galio", image: "Galio" },
    { name: "Gangplank", image: "Gangplank" },
    { name: "Garen", image: "Garen" },
    { name: "Gnar", image: "Gnar" },
    { name: "Gragas", image: "Gragas" },
    { name: "Graves", image: "Graves" },
    { name: "Gwen", image: "Gwen" },
    { name: "Hecarim", image: "Hecarim" },
    { name: "Heimerdinger", image: "Heimerdinger" },
    { name: "Hwei", image: "Hwei" },
    { name: "Illaoi", image: "Illaoi" },
    { name: "Irelia", image: "Irelia" },
    { name: "Ivern", image: "Ivern" },
    { name: "Janna", image: "Janna" },
    { name: "Jarvan IV", image: "JarvanIV" },
    { name: "Jax", image: "Jax" },
    { name: "Jayce", image: "Jayce" },
    { name: "Jhin", image: "Jhin" },
    { name: "Jinx", image: "Jinx" },
    { name: "Kai'Sa", image: "Kaisa" },
    { name: "Kalista", image: "Kalista" },
    { name: "Karma", image: "Karma" },
    { name: "Karthus", image: "Karthus" },
    { name: "Kassadin", image: "Kassadin" },
    { name: "Katarina", image: "Katarina" },
    { name: "Kayle", image: "Kayle" },
    { name: "Kayn", image: "Kayn" },
    { name: "Kennen", image: "Kennen" },
    { name: "Kha'Zix", image: "Khazix" },
    { name: "Kindred", image: "Kindred" },
    { name: "Kled", image: "Kled" },
    { name: "Kog'Maw", image: "KogMaw" },
    { name: "K'Sante", image: "KSante" },
    { name: "LeBlanc", image: "Leblanc" },
    { name: "Lee Sin", image: "LeeSin" },
    { name: "Leona", image: "Leona" },
    { name: "Lillia", image: "Lillia" },
    { name: "Lissandra", image: "Lissandra" },
    { name: "Lucian", image: "Lucian" },
    { name: "Lulu", image: "Lulu" },
    { name: "Lux", image: "Lux" },
    { name: "Malphite", image: "Malphite" },
    { name: "Malzahar", image: "Malzahar" },
    { name: "Maokai", image: "Maokai" },
    { name: "Master Yi", image: "MasterYi" },
    { name: "Mel", image: "Mel" },
    { name: "Milio", image: "Milio" },
    { name: "Miss Fortune", image: "MissFortune" },
    { name: "Wukong", image: "MonkeyKing" },
    { name: "Mordekaiser", image: "Mordekaiser" },
    { name: "Morgana", image: "Morgana" },
    { name: "Naafiri", image: "Naafiri" },
    { name: "Nami", image: "Nami" },
    { name: "Nasus", image: "Nasus" },
    { name: "Nautilus", image: "Nautilus" },
    { name: "Neeko", image: "Neeko" },
    { name: "Nidalee", image: "Nidalee" },
    { name: "Nilah", image: "Nilah" },
    { name: "Nocturne", image: "Nocturne" },
    { name: "Nunu & Willump", image: "Nunu" },
    { name: "Olaf", image: "Olaf" },
    { name: "Orianna", image: "Orianna" },
    { name: "Ornn", image: "Ornn" },
    { name: "Pantheon", image: "Pantheon" },
    { name: "Poppy", image: "Poppy" },
    { name: "Pyke", image: "Pyke" },
    { name: "Qiyana", image: "Qiyana" },
    { name: "Quinn", image: "Quinn" },
    { name: "Rakan", image: "Rakan" },
    { name: "Rammus", image: "Rammus" },
    { name: "Rek'Sai", image: "RekSai" },
    { name: "Rell", image: "Rell" },
    { name: "Renata Glasc", image: "Renata" },
    { name: "Renekton", image: "Renekton" },
    { name: "Rengar", image: "Rengar" },
    { name: "Riven", image: "Riven" },
    { name: "Rumble", image: "Rumble" },
    { name: "Ryze", image: "Ryze" },
    { name: "Samira", image: "Samira" },
    { name: "Sejuani", image: "Sejuani" },
    { name: "Senna", image: "Senna" },
    { name: "Seraphine", image: "Seraphine" },
    { name: "Sett", image: "Sett" },
    { name: "Shaco", image: "Shaco" },
    { name: "Shen", image: "Shen" },
    { name: "Shyvana", image: "Shyvana" },
    { name: "Singed", image: "Singed" },
    { name: "Sion", image: "Sion" },
    { name: "Sivir", image: "Sivir" },
    { name: "Skarner", image: "Skarner" },
    { name: "Smolder", image: "Smolder" },
    { name: "Sona", image: "Sona" },
    { name: "Soraka", image: "Soraka" },
    { name: "Swain", image: "Swain" },
    { name: "Sylas", image: "Sylas" },
    { name: "Syndra", image: "Syndra" },
    { name: "Tahm Kench", image: "TahmKench" },
    { name: "Taliyah", image: "Taliyah" },
    { name: "Talon", image: "Talon" },
    { name: "Taric", image: "Taric" },
    { name: "Teemo", image: "Teemo" },
    { name: "Thresh", image: "Thresh" },
    { name: "Tristana", image: "Tristana" },
    { name: "Trundle", image: "Trundle" },
    { name: "Tryndamere", image: "Tryndamere" },
    { name: "Twisted Fate", image: "TwistedFate" },
    { name: "Twitch", image: "Twitch" },
    { name: "Udyr", image: "Udyr" },
    { name: "Urgot", image: "Urgot" },
    { name: "Varus", image: "Varus" },
    { name: "Vayne", image: "Vayne" },
    { name: "Veigar", image: "Veigar" },
    { name: "Vel'Koz", image: "Velkoz" },
    { name: "Vex", image: "Vex" },
    { name: "Vi", image: "Vi" },
    { name: "Viego", image: "Viego" },
    { name: "Viktor", image: "Viktor" },
    { name: "Vladimir", image: "Vladimir" },
    { name: "Volibear", image: "Volibear" },
    { name: "Warwick", image: "Warwick" },
    { name: "Xayah", image: "Xayah" },
    { name: "Xerath", image: "Xerath" },
    { name: "Xin Zhao", image: "XinZhao" },
    { name: "Yasuo", image: "Yasuo" },
    { name: "Yone", image: "Yone" },
    { name: "Yorick", image: "Yorick" },
    { name: "Yunara", image: "Yunara" },
    { name: "Yuumi", image: "Yuumi" },
    { name: "Zac", image: "Zac" },
    { name: "Zed", image: "Zed" },
    { name: "Zeri", image: "Zeri" },
    { name: "Ziggs", image: "Ziggs" },
    { name: "Zilean", image: "Zilean" },
    { name: "Zoe", image: "Zoe" },
    { name: "Zyra", image: "Zyra" }
];

const roles = [
  { name: "Top", image: "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-top.png" },
  { name: "Jungle", image: "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-jungle.png" },
  { name: "Mid", image: "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-middle.png" },
  { name: "ADC", image: "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-bottom.png" },
  { name: "Support", image: "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-utility.png" }
];

const messages = [
  "Calculating the best champion to lose on...",
  "Consulting the crystal ball...",
  "Rolling a dice of despair...",
  "Analyzing your tragic gameplay...",
  "Messaging Teemo for advice...",
  "Spinning the wheel of misfortune...",
  "Asking the minions for their opinion...",
  "Checking the latest tilt trends...",
  "Finding the most frustrating pick...",
  "Loading your next disappointment...",
  "Preparing your next excuse...",
  "Choosing a champion to make you rage quit...",
  "Selecting a champion to test your patience...",
  "Deciding on a champion to ruin your day...",
  "Picking a champion to challenge your skills...",
  "Choosing a champion to make you question your life choices...",
  "Finding a champion to make you scream at your screen...",
  "Selecting a champion to make you want to throw your keyboard...",
  "Deciding on a champion to make you regret playing League of Legends..."
];

// AI helped me with the spinning function
export default function Spinner() {
  const [selectedValue, setSelectedValue] = useState("ChampionOnly");
  const [displayMessage, setDisplayMessage] = useState<string | null>(null);
  const [selectedChampion, setSelectedChampion] = useState<typeof champions[0] | null>(null);
  const [selectedRole, setSelectedRole] = useState<typeof roles[0] | null>(null);
  const [spinning, setSpinning] = useState(false);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setSelectedValue(event.target.value);
  }

  function spin() {
    if (spinning) return;
    setSpinning(true);
    setSelectedChampion(null);
    setSelectedRole(null);

    let cycles = 3;
    const intervalTime = 1000;
    const interval = setInterval(() => {
      const randomMsg = messages[Math.floor(Math.random() * messages.length)];
      setDisplayMessage(randomMsg);
      cycles--;

      if (cycles <= 0) {
        clearInterval(interval);
        const randomChampion = champions[Math.floor(Math.random() * champions.length)];
        setSelectedChampion(randomChampion);

        if (selectedValue === "ChampionAndRoleOnly") {
          const randomRole = roles[Math.floor(Math.random() * roles.length)];
          setSelectedRole(randomRole);
        }

        setDisplayMessage("Your champion has been chosen!");
        setSpinning(false);
      }
    }, intervalTime);
  }

  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold mb-6">Random Champion Spinner</h1>

        <p className="text-center text-lg md:text-xl font-bold p-4 rounded-xl mb-4">
          Want to spice up your next game?<br />
          Will you risk the fate of your next game to RNG?<br />
          Pick if you want a random <span className="text-green-400 font-extrabold">role </span> 
          and <span className="text-blue-400 font-extrabold">champion</span>, or just a <span className="text-blue-400 font-extrabold">champion</span>.
        </p>

        <div className="flex gap-6 mb-4">
          <div className="flex items-center">
            <input
              type="radio"
              id="championOnly"
              name="myRadioGroup"
              value="ChampionOnly"
              checked={selectedValue === "ChampionOnly"}
              onChange={handleChange}
              className="hidden peer"
            />
            <label htmlFor="championOnly" className="peer-checked:bg-black peer-checked:text-white px-4 py-2 rounded-lg border">Champion only</label>
          </div>

          <div className="flex items-center">
            <input
              type="radio"
              id="championAndRole"
              name="myRadioGroup"
              value="ChampionAndRoleOnly"
              checked={selectedValue === "ChampionAndRoleOnly"}
              onChange={handleChange}
              className="hidden peer"
            />
            <label htmlFor="championAndRole" className="peer-checked:bg-black peer-checked:text-white px-4 py-2 rounded-lg border">Champion and Role</label>
          </div>
        </div>

        <button
          onClick={spin}
          disabled={spinning}
          className={`px-6 py-2 rounded-lg mb-6 ${
            spinning ? "bg-gray-500 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          Spin <span className="italic font-bold">to lose</span>
        </button>

        {displayMessage && <p className="text-lg font-mono mb-4">{displayMessage}</p>}

        {selectedChampion && (
          <>
            <Image
              src={`https://ddragon.leagueoflegends.com/cdn/15.19.1/img/champion/${selectedChampion.image}.png`}
              alt={selectedChampion.name}
              width={150}
              height={150}
              className="rounded-lg shadow-lg"
              unoptimized
            />
            <p className="mt-4 text-lg font-semibold">{selectedChampion.name}</p>
          </>
        )}

        {/* Display selected role */}
        {selectedRole && (
          <>
            <Image
              src={selectedRole.image}
              alt={selectedRole.name}
              width={100}
              height={100}
              className="rounded-lg shadow-lg mt-2"
              unoptimized
            />
            <p className="mt-2 text-lg font-semibold">{selectedRole.name}</p>
          </>
        )}
      </div>

      <Footer />
    </main>
  );
}
