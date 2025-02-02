'use client'

import Link from "next/link";
import ProductPageHeader from "../pageHeaders/productPage";
import { useState,useEffect} from "react";
import { Product } from "../../../types/products";
import { client } from '@/sanity/lib/client';
import { allProducts } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Swal from "sweetalert2";
import { addToCart } from "../actions/actions";


export default  function Products(){
  const [product,setProduct] = useState<Product[]>([])
      useEffect(()=>{
        async function fetchproduct(){
          const  fetchedProduct : Product[]= await client.fetch(allProducts)
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
    <div>
        <ProductPageHeader/>
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-center text-3xl font-bold mb-8">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {product.map((product) => (
          <div key={product._id} className="border p-4 rounded-lg">
             {product.image && (
                            <Image
                            src={urlFor(product.image).url()}
                            alt="product image"
                            width={200}
                            height={200}
                            className="w-full h-80 object-cover mb-4 rounded-lg"/>
                          )}

            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-700 mb-4">{product.price}</p>

          <Link href={`/newProduct/${product.slug.current}`} className="text-blue-500">
              {" "}
              View Details{" "}
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
  );
};


