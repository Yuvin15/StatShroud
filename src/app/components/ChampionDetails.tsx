"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface ChampionDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  ddVersion: any;
  championName: string;
}

interface championDetails{

}

const ChampionDetails = ({ isOpen, onClose, ddVersion, championName }: ChampionDetailsProps) => {
  const [champion_Details, setChampionDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchChampData = async () => {
      if (!isOpen || !championName) return;
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `https://localhost:44365/Riot/GetChampionData?region=${championName}`
        );

        if (!response.ok) throw new Error("Error loading data");

        const data = await response.json();

        setChampionDetails(data);
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
    <div>
        Placeholder for Champion Details Modal
    </div>
  );
};

export default ChampionDetails;