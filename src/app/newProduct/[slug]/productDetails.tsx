// (Client Component)
"use client";

import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Swal from "sweetalert2";
import { addToCart, handleAddToWishlist } from "@/app/actions/actions";
import { Product } from "../../../../types/products";


interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    Swal.fire({
      position: "top-right",
      icon: "success",
      title: `${product.name} added to cart`,
      showConfirmButton: false,
      timer: 1000,
    });
    addToCart(product);
  };


  return (
    <div className="container mx-auto py-8 px-4 flex flex-col md:flex-row">
      <div className="md:w-1/2">
        {product.image && (
          <Image
            src={urlFor(product.image).url()}
            alt={product.name || "Product Image"}
            height={200}
            width={200}
            className="w-96 h-96 object-cover rounded-lg"
          />
        )}
      </div>
      <div className="md:w-1/2 flex flex-col justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-2xl text-gray-700">Price: {product.price}</p>
          <p className="text-lg mb-8">{product.description}</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold">Tags:</h2>
          <ul className="list-disc list-inside">
            {product.tags?.map((tag, index) => (
              <li key={index}>{tag}</li>
            ))}
          </ul>
        </div>
        {product.features?.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold">Features:</h2>
            <ul className="list-disc list-inside">
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        )}
        {product.dimensions && (
          <div>
            <h2 className="text-lg font-semibold">Dimensions:</h2>
            <ul className="list-disc list-inside">
              {product.dimensions.height && <li>Height: {product.dimensions.height}</li>}
              {product.dimensions.width && <li>Width: {product.dimensions.width}</li>}
              {product.dimensions.depth && <li>Depth: {product.dimensions.depth}</li>}
            </ul>
          </div>
        )}
        <div>
          <label className="block text-lg font-semibold" htmlFor="quantity">
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            defaultValue={1}
            min={1}
            className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex space-x-4">
          <button
            className="bg-blue-950 text-white px-6 py-2 rounded-lg hover:bg-blue-800"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
           {/* Add to Wishlist Button */}
           <button
            className="bg-blue-950 text-white px-6 py-2 rounded-lg hover:bg-blue-800"
            onClick={(e) => handleAddToWishlist(e, product)} 
          >
            Add to Wishlist
          </button>
          </div>
        </div>
      </div>
    </div>
  );
}


