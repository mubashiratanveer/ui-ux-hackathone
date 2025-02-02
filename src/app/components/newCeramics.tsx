'use client'
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Product } from '../../../types/products';
import { client } from '@/sanity/lib/client';
import {  four } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/image';
import Link from 'next/link';
import { addToCart } from '../actions/actions';
import Swal from 'sweetalert2'


export default function NewCeramics(){
  const [product,setProduct] = useState<Product[]>([])
    useEffect(()=>{
      async function fetchproduct(){
        const  fetchedProduct : Product[]= await client.fetch(four)
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
    <div className="container mx-auto  px-6 py-12 ">
      <h2 className="text-center text-3xl font-bold  mb-8">New Ceramics</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {product.map((product) => (
          <div key={product._id} className="flex flex-col items-center bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-shadow">
            <Link href={`/newProduct/${product.slug.current}`}>
                      {product.image && (
                <Image
                src={urlFor(product.image).url()}
                alt="product image"
                width={200}
                height={200}
                className="w-full h-96 object-cover rounded-lg mb-4"/>
              )}
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-700">{product.price}</p>
            <button className="bg-blue-950 text-white px-6 py-2 rounded-lg hover:bg-blue-800"
             onClick={(e) => handleAddToCart(e,product)} >
                   Add To Cart
            </button>
            </Link>
          </div>
        ))}
      </div>
      <Link href={"/allProducts"}>
      <div className="flex justify-center items-center mt-9 mb-9 text-center hover:text-primary-900 bg-gray-400 p-3 w-64 mx-auto">
         <button> view collection    
      </button>
        </div>
            </Link>
    </div>
  );
};




