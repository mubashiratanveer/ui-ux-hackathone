// components/Header.tsx
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { IoPerson, IoMenu } from "react-icons/io5";
import SearchBar from "./searchBar";
import { CiHeart } from "react-icons/ci";
export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState<number>(0);

  // Update wishlist count from localStorage when component mounts
  useEffect(() => {
    const count = JSON.parse(localStorage.getItem("wishlistCount") || "0");
    setWishlistCount(count);

    // Listen to custom event for real-time updates
    const handleWishlistUpdate = () => {
      const updatedCount = JSON.parse(
        localStorage.getItem("wishlistCount") || "0"
      );
      setWishlistCount(updatedCount);
    };
    window.addEventListener("wishlistUpdated", handleWishlistUpdate);

    return () => {
      window.removeEventListener("wishlistUpdated", handleWishlistUpdate);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const categories = [
    "Chair",
    "Plant pots",
    "Ceramics",
    "Table",
    "Crockery",
    "Tableware",
  ];

  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-Semibold">
          Avion
        </Link>
        <nav className="hidden md:flex space-x-6 ">
          <Link href="/hero" className="text-gray-700 hover:text-blue-500">
            Home
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-blue-500">
            About
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-blue-500">
            Contact
          </Link>
          <Link
            href="/allProducts"
            className="text-gray-700 hover:text-blue-500"
          >
            All Products
          </Link>
          <Link href="/cart" className="text-gray-700 hover:text-blue-500">
            Cart
          </Link>
        </nav>
        <div className="hidden md:flex items-center space-x-4">
          <SearchBar />
          {/* edit*/}
          <Link href="/wishList">
            <div className="relative cursor-pointer">
              <CiHeart className="w-6 h-6" />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {wishlistCount}
                </span>
              )}
            </div>
          </Link>
          <IoPerson className="text-2xl text-gray-700 hover:text-blue-500 cursor-pointer" />
        </div>
        <button className="md:hidden text-2xl" onClick={toggleMenu}>
          <IoMenu />
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <nav className="flex flex-col space-y-2 px-6 py-4">
            <Link href="/hero" className="text-gray-700 hover:text-blue-500">
              Home
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-500">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-500">
              Contact
            </Link>
            <Link
              href="/allProducts"
              className="text-gray-700 hover:text-blue-500"
            >
              All Products
            </Link>
            <Link href="/cart" className="text-gray-700 hover:text-blue-500">
              Cart
            </Link>
            <div className="flex space-x-4 py-2">
              <SearchBar />
              <Link href="/wishList">
                <div className="relative cursor-pointer">
                  <CiHeart className="w-6 h-6" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      {wishlistCount}
                    </span>
                  )}
                </div>
              </Link>
              <IoPerson className="text-2xl text-gray-700 hover:text-blue-500 cursor-pointer" />
            </div>
          </nav>
        </div>
      )}
      <div className="border-t border-gray-300">
        <Link href="/allProducts">
        <div className="container mx-auto px-6 py-2 flex overflow-x-auto space-x-6 justify-center bg-gray-100">
          {categories.map((category, index) => (
            <span
              key={index}
              className="text-gray-700 hover:text-blue-500 cursor-pointer"
            >
              {category}
            </span>
          ))}
        </div>
        </Link>
      </div>
    </header>
  );
}
