'use client';

import React from 'react';
import Image from "next/image";
import { useEffect, useState } from "react"; 
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/Footer";
import { useSearchParams } from "next/navigation";
import Head from "next/head";

const faqData = [
    {
        question: "Where is the win rate per champion?",
        answer: "For me to be able to see win rate per champion, I need to scan every game played. This is a huge amount of data to process, and it takes time. This is in my backlog but I wanted to get the site out there first.",
    },
    {
        question: "Why can't I see recommended runes?",
        answer: "Same as Q1, I need to scan every game played to get this data.",
    },
    {
        question: "Why can't I see the best build and their corresponding win rates?",
        answer: "Same as Q1, I need to scan every game played to get this data.",
    },
    {
        question: "Why should I use this site over other sites?",
        answer: "This site was a side project I built to learn Next.js and React. I wanted to build a website that would just give a run down on a player, champions, and items. I wanted to keep it simple and easy to use.",
    },
    {
        question: "Will win rates ever be added?",
        answer: "Yes, win rates will be added in the future. This is in my backlog but I wanted to get the site out there first.",
    },
    {
        question: "Will other games ever be added?",
        answer: "Yes, other other titles will be released. I used League of Legends as a starting point because Riot Games has a public to use API. And I started playing League of Legends again after a long break.",
    }
];

export default function AboutPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const handleToggle = (idx: number) => {
        setOpenIndex(openIndex === idx ? null : idx);
    };

    return (
        <main className="flex flex-col min-h-screen "> 
            <Navbar />
            <div className="flex-grow p-6 max-w-4xl mx-auto text-center">
            <h1 className="font-bold text-3xl">About Page</h1>
            <section>
                <p>
                    StatsShroud was created as a personal project to enhance my skills in Next.js and React. 
                    The goal was to develop a straightforward platform that provides users with essential information about players, champions, and items in League of Legends. By focusing on simplicity and usability, 
                    I aimed to create an accessible resource for players seeking quick insights without overwhelming details. Here are some frequently asked questions about the site.
                </p>
            </section>
            <section className="mt-8 text-center">
                <h2 className="font-bold text-3xl">Frequently Asked Questions</h2>
                <div>
                    {faqData.map((item, idx) => (
                        <li key={idx} className="list-none border odd:border-white my-4 odd:bg-[#0A0A0A] even:bg-white even:text-black even:border-black rounded-2xl p-4">
                            <button
                                className="w-full flex justify-between items-center bg-transparent border-none py-3 text-base cursor-pointer font-bold"
                                onClick={() => handleToggle(idx)}
                                aria-expanded={openIndex === idx}
                                >
                                {item.question}
                                <span className="text-right">▼</span>
                            </button>

                            {openIndex === idx && (
                                <div className="border-t border-gray-300 mt-2 pt-2 text-gray-500">
                                    {item.answer}
                                </div>
                            )}
                        </li>
                    ))}
                </div>
            </section>
            </div>
            <Footer />
        </main>
    );
}