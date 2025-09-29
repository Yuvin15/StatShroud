'use client';

import React from 'react';
import Image from "next/image";
import Footer from '../../components/Footer';
import { useEffect, useState } from "react"; 
import Navbar from "../../components/navbar";
import { useSearchParams } from "next/navigation";
import ItemModal from '@/app/components/ItemModal';

interface Item {
    itemID: number;                 
    itemName: string;               
    itemDetail: string;             
    isActive: boolean;              
    price: number;                  
    priceTotal: number;             
    canPurchase: boolean;           
    buildFrom: number[] | null;     
    buildTo: number[] | null;       
    itemCategories: string[];       
}

export default function ChampionsPage() {

    const searchParams = useSearchParams();
    const [ddData, setddVersion] = useState<string[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [items, setItems] = useState<Item[]>([]);
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const itemsResponse = await fetch('https://localhost:44365/Riot/GetItems');
                const itemsData = await itemsResponse.json();

                const ddVersion = await fetch(`https://ddragon.leagueoflegends.com/api/versions.json`);
                const versionData = await ddVersion.json();

                setddVersion(versionData);
                setItems(itemsData);
            } catch (err) {
                console.error(err);
            } finally {
                console.log("Fetch attempt finished.");
            }
        };

        fetchData();

        
    }, []);

    const openItemModal = (item: Item) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    }

    const closeItemModal = () => {
        setIsModalOpen(false);
    };

    return (
        <main className="min-h-screen">
            <Navbar />
            {/* Header Section */}
            <div className="py-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold text-center mb-4">Items</h1>
                    <p className="text-xl text-center">Click on any item to see its details</p>
                </div>
            </div>

            {/* Items Grid */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {items.map((item, index) => (
                        <div 
                            key={`item-${item.itemID}-${index}`}
                            className="bg-[#0A0A0A] rounded-lg shadow-md hover:shadow-lg duration-300 p-4 text-center group hover:scale-105 transform transition-transform cursor-pointer"
                            onClick={() => openItemModal(item)}
                        >
                            <div className="relative overflow-hidden rounded-lg mb-4">
                                <Image
                                    src={`https://ddragon.leagueoflegends.com/cdn/${ddData[0]}/img/item/${item.itemID}.png`}
                                    alt={item.itemName}
                                    width={120}
                                    height={120}
                                    className="mx-auto group-hover:scale-110 transition-transform duration-300"
                                    unoptimized
                                />
                            </div>
                            <h3 className="text-lg font-semibold">
                                {item.itemName}
                            </h3>
                            <p className="text-sm text-gray-400 mt-2">
                                {`${item.priceTotal} gold`}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />

            {isModalOpen && selectedItem && (
                <ItemModal
                    isOpen={isModalOpen}
                    onClose={closeItemModal}
                    ddVersion={ddData[0]}
                    item={selectedItem}
                />
            )}
        </main>
    );
}