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
            MyApp
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
              href="/League"
              className="text-white hover:bg-[#00558c] px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300"
            >
              Player Stats
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
                    href="/League/Items"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Items
                  </Link>
                  <Link
                    href=""
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Coming Soon
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
              href="/League"
              className="block text-white hover:bg-[#00558c] px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
              onClick={toggleMenu}
            >
              Player Stats
            </Link>

            {/* Mobile dropdown */}
            <div>
              <button
                onClick={toggleDropdown}
                className="w-full text-left text-white hover:bg-[#00558c] px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
              >
                Coming Soon ▾
              </button>
              {isDropdownOpen && (
                <div className="pl-4 mt-1 space-y-1">
                  <Link
                    href="/feature1"
                    className="block text-white hover:bg-[#00558c] px-3 py-2 rounded-md text-base font-medium"
                    onClick={() => {
                      toggleMenu();
                      setIsDropdownOpen(false);
                    }}
                  >
                    Feature 1
                  </Link>
                  <Link
                    href="/feature2"
                    className="block text-white hover:bg-[#00558c] px-3 py-2 rounded-md text-base font-medium"
                    onClick={() => {
                      toggleMenu();
                      setIsDropdownOpen(false);
                    }}
                  >
                    Feature 2
                  </Link>
                  <Link
                    href="/feature3"
                    className="block text-white hover:bg-[#00558c] px-3 py-2 rounded-md text-base font-medium"
                    onClick={() => {
                      toggleMenu();
                      setIsDropdownOpen(false);
                    }}
                  >
                    Feature 3
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
