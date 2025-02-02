import React, { useState, useEffect } from "react";
import { Product } from "../../../types/products";
import { client } from "@/sanity/lib/client";
import { three } from "@/sanity/lib/queries";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import Swal from "sweetalert2";
import { addToCart } from "../actions/actions";


export default function PopularProducts() {
  const [product,setProduct] = useState<Product[]>([])
    useEffect(()=>{
      async function fetchproduct(){
        const  fetchedProduct : Product[]= await client.fetch(three)
        setProduct(fetchedProduct)
      }
      fetchproduct()
    },[])

const handleAddToCart =(e: React.MouseEvent, product:Product)=>{
  e.preventDefault()
 Swal.fire({
     position:"top-right",
     icon: "success",
     title :`${product.name} added to cart`,
     showConfirmButton: false,
     timer:1000,
     
 })
  addToCart(product)
}


  return (
    <div className="container mx-auto py-8 px-4">
      <h2 className="text-center text-3xl font-bold mb-8">Our Popular Products</h2>
    
      {product.length > 0 && product[0].image && (
       
        <div className="flex flex-wrap gap-6">
          {/* First product */}
          <div key={product[0]._id} className="w-full lg:w-1/2 flex flex-col items-center">
           <Link href={`/newProduct/${product[0].slug.current}`}>
           {product[0].image && (
            <Image
              src={urlFor(product[0].image).url()}
              alt="product image"
              height={200}
              width={200}
              className="w-full h-96 object-cover rounded-lg mb-4"
            />
          )}
            <h3 className="text-lg font-semibold">{product[0].name}</h3>
            <p className="text-gray-700">{product[0].price}</p>
            </Link> 
            <button className="bg-blue-950 text-white px-6 py-2 rounded-lg hover:bg-blue-800"
             onClick={(e) => handleAddToCart(e,product[0])} >
                   Add To Cart
            </button>
           </div>
       

           {/* Remaining products */}
           <div className="w-full lg:w-1/3 flex flex-col gap-6">
            <div className="flex items-center justify-center gap-6">
              {product.slice(1, 3).map((product) => (
                <div key={product._id} className="flex flex-col items-center">
                  <Link href={`/newProduct/${product.slug.current}`}>
                  {product.image && (
                    <Image
                      src={urlFor(product.image).url()}
                      alt="product image"
                      width={200}
                      height={200}
                      className="w-full h-96 object-cover rounded-lg mb-4"
                    />
                  )}
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-gray-700">{product.price}</p>
                  </Link>
                  <button className="bg-blue-950 text-white px-6 py-2 rounded-lg hover:bg-blue-800"
             onClick={(e) => handleAddToCart(e,product)} >
                   Add To Cart
            </button>
                </div>
              ))}
            </div>
          </div>
        
        </div>
      ) }
      <Link href={"/allProducts"}>
      <div className="flex justify-center items-center mt-9 mb-9 text-center hover:text-primary-900 bg-gray-400 p-3 w-64 mx-auto">
        <button>View Collection</button>
      </div>
      </Link>
    </div>
  );
}