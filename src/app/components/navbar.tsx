'use client';

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <nav className="bg-[#003262] shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 text-white text-xl font-semibold tracking-wide">
            StatsShroud
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link
              href="/"
              className="text-white hover:bg-[#00558c] px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300"
            >
              Home
            </Link>
            <Link
              href="/League/Champions"
              className="text-white hover:bg-[#00558c] px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300"
            >
              Champions
            </Link>
            <Link
              href="/League/PlayerStats"
              className="text-white hover:bg-[#00558c] px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300"
            >
              Player Stats
            </Link>
            <Link
              href="/League/Items"
              className="text-white hover:bg-[#00558c] px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300"
              onClick={() => setIsDropdownOpen(false)}
            >
              Items
            </Link>
            {/* Dropdown */}
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="text-white hover:bg-[#00558c] px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300"
              >
                More ▼
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                  <Link
                    href="/League/ChampionPicker"
                    className="block px-4 py-2 text-black hover:bg-[#00558c] hover:text-white hover:rounded-md"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Random champion picker
                  </Link>

                  <Link
                    href="/League/About"
                    className="block px-4 py-2 text-black hover:bg-[#00558c] hover:text-white hover:rounded-md"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    About
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-gray-300 transition-colors duration-200 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
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
          <div className="md:hidden mt-2 max-h-[calc(100vh-4rem)] overflow-y-auto px-2 pt-2 pb-3 space-y-1 bg-[#04141f] rounded-2xl">
            <Link
              href="/"
              className="block text-white hover:bg-[#00558c] px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              href="/League/Champions"
              className="block text-white hover:bg-[#00558c] px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
              onClick={toggleMenu}
            >
              Champions
            </Link>
            <Link
              href="/League/PlayerStats"
              className="block text-white hover:bg-[#00558c] px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
              onClick={toggleMenu}
            >
              Player Stats
            </Link>
            <Link
              href="/League/Items"
              className="block text-white hover:bg-[#00558c] px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
              onClick={() => setIsDropdownOpen(false)}
            >
              Items
            </Link>
            {/* Mobile dropdown */}
            <div>
              <button
                onClick={toggleDropdown}
                className="w-full text-left text-white hover:bg-[#00558c] px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
              >
                More ▾
              </button>
              {isDropdownOpen && (
                <div className="pl-4 mt-1 space-y-1 ">
                  <Link
                    href="/League/ChampionPicker"
                    className="block px-4 py-2 hover:bg-[#00558c] rounded transition-colors duration-200"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Random champion picker
                  </Link>

                  <Link
                    href="/League/About"
                    className="block px-4 py-2 hover:bg-[#00558c] rounded  transition-colors duration-200"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    About
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </nav>
  );
}
