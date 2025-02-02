"use client";

import React, { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import Link from "next/link";
import { IoSearch } from "react-icons/io5";
import Image from "next/image";
import { Product } from "../../../types/products";
import { urlFor } from "@/sanity/lib/image";


export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState(""); // User's input
  const [suggestions, setSuggestions] = useState<Product[]>([]); // Suggested products
  const [isDropdownVisible, setDropdownVisible] = useState(false); // Dropdown visibility

  // Fetch products based on search term
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchTerm.trim() === "") {
        setSuggestions([]); // If no input, clear suggestions
        setDropdownVisible(false);
        return;
      }

      try {
        const products = await client.fetch(
          groq`*[_type == "product" && name match $searchTerm + "*"]{
            _id,
            name,
            price,
            "slug": slug.current,
            image
          }`,
          { searchTerm } // Params object
        );

        setSuggestions(products);
        setDropdownVisible(products.length > 0);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [searchTerm]);

  return (
    <div className="relative w-full max-w-lg mx-auto ">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search for products..."
        className="w-full border p-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setDropdownVisible(suggestions.length > 0)}
      />

      {/* Search Icon */}
      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
        <IoSearch size={20} />
      </span>

      {/* Suggestions Dropdown */}
      {isDropdownVisible && (
        <div className="absolute top-full mt-2 w-full bg-white border rounded-lg shadow-lg z-50">
          {suggestions.map((product) => (
            <Link
              key={product._id}
              href={product.slug ? `/newProduct/${product.slug}` : "#"}
              className="block px-4 py-2 hover:bg-gray-100"
            >
                 <div className="flex items-center">
                {product.image && (
                  <Image
                  src={urlFor(product.image).url()} 
                    alt={product.name}
                    width={40} // Adjust the width
                    height={40} // Adjust the height
                    className="object-cover rounded mr-3"
                  />
                )}
                <div>
                  <p className="font-semibold">{product.name}</p>
                  <p className="text-sm text-gray-500">
                    Price: ${product.price}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
