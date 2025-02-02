'use client'
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import { Product } from "../../../types/products"
import { getCartItems } from "../actions/actions"
import Link from "next/link"
import Image from "next/image"
import { urlFor } from "@/sanity/lib/image";
import { CgChevronRight } from "react-icons/cg";
import { client } from "@/sanity/lib/client"
import Swal from "sweetalert2"


export default function CheckOut(){
    const [cartItems,setCartItems] = useState<Product[]>([])
    const [discount,setDiscount] = useState <number>(0)
    const [formValuse,setFormValuse] = useState({
        firstName:"",
        lastName:"",
        phoneNumber:"",
        address:"",
        zipCode:"",        
        city:"",
        email:"",
        total:""
    })
    const [formErrors,setFormErrors]=useState({
        firstName:false,
        lastName:false,
        phoneNumber:false,
        address:false,
        zipCode:false,        
        city:false,
        email:false
    })
    useEffect(()=>{
        setCartItems(getCartItems())
        const appliedDiscount = localStorage.getItem("appliedDiscount");
        if(appliedDiscount){
            setDiscount(Number(appliedDiscount))
        }
    },[])
    const subTotal = cartItems.reduce(
        (total,item)=> total + item.price * item.quantity,0)
        const handleInputChange =(e: React.ChangeEvent<HTMLInputElement>)=>{
            setFormValuse({
                ...formValuse,
                [e.target.id]: e.target.value
            })
        }
        const validateForm = (): boolean => {
            const errors = {
              firstName: !formValuse.firstName,
              lastName: !formValuse.lastName,
              email: !formValuse.email,
              city: !formValuse.city,
              address: !formValuse.address,
              phoneNumber: !formValuse.phoneNumber,
              zipCode: !formValuse.zipCode,
            };
            setFormErrors(errors);
            return !Object.values(errors).includes(true);
          };

  const router = useRouter()
const handlePlaceOrder = async () => {

  

  if (!validateForm()) {
    console.log("Form has errors");
    return;
  }
  Swal.fire({
    title: "Processing your order",
    text: "Please wait a moment",
    icon: "info",
    showCancelButton: true,
    confirmButtonColor: "blue",
    cancelButtonColor: "gray",
    confirmButtonText: "Yes, proceed!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const orderData = {
          _type: "order",
          firstName: formValuse.firstName,
          lastName: formValuse.lastName,
          address: formValuse.address,
          city: formValuse.city,
          zipCode: formValuse.zipCode,
          phoneNumber: formValuse.phoneNumber,
          email: formValuse.email,
          cartItems: cartItems.map((item) => ({
            _type: "reference",
            _ref: item._id,
          })),
          total: subTotal,
          discount: discount,
          orderDate: new Date().toISOString(),
        };
       
        await client.create(orderData);
         
        Swal.fire("Success", "Your order has been successfully placed.", "success");
        setCartItems([]);
        localStorage.removeItem("appliedDiscount");
        router.push(
          `/order?firstName=${formValuse.firstName}&lastName=${formValuse.lastName}&email=${formValuse.email}&phoneNumber=${formValuse.phoneNumber}&address=${formValuse.address}&city=${formValuse.city}&zipCode=${formValuse.zipCode}&total=${subTotal - discount}`
        )
      } catch (errors) {
        Swal.fire("Error", "Failed to place order. Please try again.", "error");
        console.error("Error creating order:", errors);
      }
     
    }
  });
};

        
    return(
      <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="mt-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 py-4">
            <Link
              href="/cart"
              className="text-[#666666] hover:text-black transition text-sm"
            >
              Cart
            </Link>
            <CgChevronRight className="w-4 h-4 text-[#666666]" />
            <span className="text-sm">Checkout</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white border rounded-lg p-6 shadow-lg space-y-4">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-4 py-3 border-b"
                >
                  <div className="w-16 h-16 rounded overflow-hidden">
                    {item.image && (
                      <Image
                        src={urlFor(item.image).url()}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium">{item.name}</h3>
                    <p className="text-xs text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-medium">
                    ${item.price * item.quantity}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">Your cart is empty.</p>
            )}
            <div className="text-right pt-4">
              <p className="text-sm">
                Subtotal: <span className="font-medium">${subTotal}</span>
              </p>
              <p className="text-sm">
                Discount: <span className="font-medium">-${discount}</span>
              </p>
              <p className="text-lg font-semibold">
                Total: ${(subTotal - discount).toFixed(2)}
              </p>
            </div>
          </div>

          {/* Billing Form */}
          <div className="bg-white border rounded-lg p-6 shadow-lg space-y-6">
            <h2 className="text-xl font-semibold">Billing Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                  First Name
                </label>
                <input
                  id="firstName"
                  placeholder="Enter your first name"
                  value={formValuse.firstName}
                  onChange={handleInputChange}
                  className="w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
                {formErrors.firstName && (
                  <p className="text-sm text-red-500 mt-1">
                    First name is required.
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                  Last Name
                </label>
                <input
                  id="lastName"
                  placeholder="Enter your last name"
                  value={formValuse.lastName}
                  onChange={handleInputChange}
                  className="w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
                {formErrors.lastName && (
                  <p className="text-sm text-red-500 mt-1">
                    Last name is required.
                  </p>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium mb-1">
                Address
              </label>
              <input
                id="address"
                placeholder="Enter your address"
                value={formValuse.address}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
              {formErrors.address && (
                <p className="text-sm text-red-500 mt-1">Address is required.</p>
              )}
            </div>
            <div>
              <label htmlFor="city" className="block text-sm font-medium mb-1">
                City
              </label>
              <input
                id="city"
                placeholder="Enter your city"
                value={formValuse.city}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
              {formErrors.city && (
                <p className="text-sm text-red-500 mt-1">City is required.</p>
              )}
            </div>
            <div>
              <label htmlFor="zipCode" className="block text-sm font-medium mb-1">
                Zip Code
              </label>
              <input
                id="zipCode"
                placeholder="Enter your zip code"
                value={formValuse.zipCode}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
              {formErrors.zipCode && (
                <p className="text-sm text-red-500 mt-1">Zip Code is required.</p>
              )}
            </div>
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium mb-1">
                Phone
              </label>
              <input
                id="phoneNumber"
                placeholder="Enter your phone number"
                value={formValuse.phoneNumber}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
              {formErrors.phoneNumber && (
                <p className="text-sm text-red-500 mt-1">Phone is required.</p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                id="email"
                placeholder="Enter your email address"
                value={formValuse.email}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
              {formErrors.email && (
                <p className="text-sm text-red-500 mt-1">Email is required.</p>
              )}
            </div>
            <button
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg mt-4 transition-all"
              onClick={handlePlaceOrder}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
    )}
        