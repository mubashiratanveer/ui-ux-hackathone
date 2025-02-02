"use client";
import { useEffect, useState } from "react";
import { Product } from "../../../types/products";
import {
  getCartItems,
  removeFromCart,
  updateCartQuantity,
} from "../actions/actions";
import Swal from "sweetalert2";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Cart() {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  // Fetch cart items on initial render
  useEffect(() => {
    setCartItems(getCartItems());
  }, []);

  const handleRemove = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this item!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "blue",
      cancelButtonColor: "blue",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        removeFromCart(id);
        setCartItems(getCartItems());
        Swal.fire("Item has been removed.");
      }
    });
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    updateCartQuantity(id, quantity);
    setCartItems(getCartItems());
  };

  const handleIncrement = (id: string, product: Product) => {
    handleQuantityChange(id, product.quantity + 1);
  };

  const handleDecrement = (id: string, product: Product) => {
    if (product.quantity > 1) {
      handleQuantityChange(id, product.quantity - 1);
    }
  };

  const calculatedTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };
   
const router = useRouter(); 
const handledProceed = () => {
    Swal.fire({
      title: "Proceed to checkout?",
      text: "Please review your cart before checkout.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "blue",
      cancelButtonColor: "blue",
      confirmButtonText: "Yes, proceed!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Success", "Your order has been successfully placed.");
        router.push("/checkOut");
        setCartItems([]);
      }
    });
    
  };

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-xl md:text-2xl font-bold mb-4">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <div className="container mx-auto space-y-4">
          {/* Cart Items */}
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex flex-col sm:flex-row items-center sm:justify-between bg-gray-100 p-4 rounded-lg shadow-md space-y-4 sm:space-y-0"
            >
              {/* Image */}
              {item.image && (
                <Image
                  src={urlFor(item.image).url()}
                  alt="product image"
                  width={100}
                  height={100}
                  className="object-cover rounded-lg"
                />
              )}

              {/* Name and Price */}
              <div className="text-center sm:text-left">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-gray-600">Price: ${item.price}</p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDecrement(item._id, item)}
                  className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  -
                </button>
                <span className="text-lg font-medium">{item.quantity}</span>
                <button
                  onClick={() => handleIncrement(item._id, item)}
                  className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  +
                </button>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => handleRemove(item._id)}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}

          {/* Cart Summary */}
          <div className="mt-8 border-t pt-4">
            <h2 className="text-lg font-semibold">
              Total: ${calculatedTotal()}
            </h2>
            <button
              onClick={handledProceed}
              className="mt-4 bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
