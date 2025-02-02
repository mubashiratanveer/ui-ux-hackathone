// newProduct/[slug]/page.tsx (Server Component)
import { client } from "@/sanity/lib/client";
import { Product } from "../../../../types/products";
import { groq } from "next-sanity";
import ProductDetails from "./productDetails"; // Import Client Component

interface ProductPageProps {
  params: { slug: string }; // Ensure params is of the correct type
}

// Function to fetch product data
async function getProduct(slug: string): Promise<Product | null> {
  try {
    return await client.fetch(
      groq`
        *[_type == "product" && slug.current == $slug][0]{
          _id,
          name,
          _type,
          image,
          price,
          description,
          tags[],
          features[],
          dimensions,
          category[],
          quantity,
        }
      `,
      { slug }
    );
  } catch (error) {
    console.error("Error fetching product:", error);
  return null
  }
}

// Server Component
export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.slug); // Fetch product using slug

  if (!product) {
    return <h1>Product not found</h1>;
  }

  // Pass the product data to the Client Component
  return <ProductDetails product={product} />;
}
