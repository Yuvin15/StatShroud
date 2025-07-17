"use client";

import { useState } from 'react';
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-[#003262] shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <span className="cursor-pointer">
               <Image
                  src="https://img.freepik.com/free-vector/vector-bright-splashes_2065-436.jpg"
                  alt="Logo"
                  width={50}
                  height={100}
                  unoptimized
                />
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <button className="px-3 py-2 rounded-md text-sm font-medium duration-200 nav-item navbarlink cursor-pointer">
                Home
              </button>
              <button className="px-3 py-2 rounded-md text-sm font-medium duration-200 nav-item navbarlink cursor-pointer">
                About
              </button>
              <button className="px-3 py-2 rounded-md text-sm font-medium duration-200 nav-item navbarlink cursor-pointer">
                Services
              </button>
              <button className="px-3 py-2 rounded-md text-sm font-medium duration-200 nav-item navbarlink cursor-pointer">
                Contact
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="focus:outline-none mobile-menu-btn"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 #003262">
              <button
                className="block px-3 py-2 rounded-md text-base font-medium w-full text-left nav-item navbarlink" 
                onClick={toggleMenu}
              >
                Home
              </button>
              <button
                className="block px-3 py-2 rounded-md text-base font-medium w-full text-left nav-item navbarlink"
                onClick={toggleMenu}
              >
                About
              </button>
              <button
                className="block px-3 py-2 rounded-md text-base font-medium w-full text-left nav-item navbarlink"
                onClick={toggleMenu}
              >
                Services
              </button>
              <button
                className="block px-3 py-2 rounded-md text-base font-medium w-full text-left nav-item navbarlink"
                onClick={toggleMenu}
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;