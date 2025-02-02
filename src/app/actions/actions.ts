import { Product } from "../../../types/products";
import Swal from "sweetalert2";
export const addToCart=(product :Product)=>{
       const cart:Product[]= JSON.parse(localStorage.getItem('cart') || "[]")
       const existingProductIndex = cart.findIndex(item => item._id === product._id)

       if(existingProductIndex > -1){
        cart[existingProductIndex].quantity +=1
       }
       else{
        cart.push({
            ...product,quantity:1
        })
       }
       localStorage.setItem('cart', JSON.stringify(cart))
}

export const removeFromCart = (productId :string) => {
    let cart :Product[] = JSON.parse(localStorage.getItem('cart') || '[]')
    cart = cart.filter(item => item._id !== productId)
    localStorage.setItem ('cart', JSON.stringify(cart))
}

export const updateCartQuantity = (productId :string, quantity :number) =>{
         const cart :Product[]= JSON.parse(localStorage.getItem('cart') || '[]')
         const produtIndex = cart.findIndex(item => item._id === productId)

         if (produtIndex > -1){
            cart[produtIndex].quantity = quantity
            localStorage.setItem('cart' ,JSON.stringify(cart))
         }
}

export const getCartItems = (): Product[]  => {
    return JSON.parse(localStorage.getItem('cart') || '[]')
}


export const handleAddToWishlist = (e: React.MouseEvent, product: Product) => {
  e.preventDefault();
  const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

  const isAlreadyInWishlist = wishlist.some(
    (item: Product) => item.name === product.name
  );

  if (isAlreadyInWishlist) {
    Swal.fire({
      position: "top-right",
      icon: "info",
      title: `${product.name} is already in your wishlist`,
      showConfirmButton: false,
      timer: 1000,
    });
  } else {
    wishlist.push({
      ...product,
      name: product.name,
      image: product.image,
      price: product.price,
    });
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    localStorage.setItem("wishlistCount", JSON.stringify(wishlist.length));

    Swal.fire({
      position: "top-right",
      icon: "success",
      title: `${product.name} added to wishlist`,
      showConfirmButton: false,
      timer: 1000,
    });

    // Dispatch a custom event for real-time wishlist update
    window.dispatchEvent(new Event("wishlistUpdated"));
  }
};
