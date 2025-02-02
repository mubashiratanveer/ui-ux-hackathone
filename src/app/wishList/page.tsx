"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Product } from "../../../types/products";
import { urlFor } from "@/sanity/lib/image";
import { product } from "@/sanity/schemaTypes/product";

const WishListPage = () => {
  const [wishlist, setWishlist] = useState<Product[]>([]);

  // Fetch wishlist from localStorage
  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlist(storedWishlist);
  }, []);

  const handleRemoveFromWishlist = (id: string) => {
    const updatedWishlist = wishlist.filter((item) => item._id !== id);
    setWishlist(updatedWishlist);

    // Update localStorage
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    localStorage.setItem("wishlistCount", updatedWishlist.length.toString());

    // Dispatch update event for header count
    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">My Wishlist</h1>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty!</p>
      ) : (
        <div className="container mx-auto py-8 px-4 space-y-4">
          {wishlist.map((item) => (
            <div
              key={item._id}
              className="flex flex-col sm:flex-row items-center sm:justify-between bg-gray-100 p-4 rounded-lg shadow-md space-y-4 sm:space-y-0"
            >
              {/* Left Section: Image and Details */}
              <div className="flex items-center space-x-4">
                {item.image && (
                  <Image
                    src={urlFor(item.image).url()}
                    alt={product.name}
                    height={200}
                    width={200}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                )}
                <div>
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-gray-600">${item.price}</p>
                </div>
              </div>
              {/* Right Section: Remove Button */}
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                onClick={() => handleRemoveFromWishlist(item._id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishListPage;
