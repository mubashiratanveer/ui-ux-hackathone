import groq from 'groq';

// Query to fetch all products
export const allProducts = groq`*[_type == "product"]`;

// 
export const four = groq`*[_type == "product"][0..3]`;

export const three = groq`*[_type == "product"][4..6]`
