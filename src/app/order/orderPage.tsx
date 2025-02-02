"use client";
/* eslint-disable @next/next/no-missing-suspense */

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function OrderPage() {
  const searchParams = useSearchParams();

  if (!searchParams) {
    return <div>Loading...</div>;
  }

  const firstName = searchParams.get("firstName");
  const lastName = searchParams.get("lastName") ;
  const email = searchParams.get("email") ;
  const phoneNumber = searchParams.get("phoneNumber") ;
  const address = searchParams.get("address") ;
  const city = searchParams.get("city") ;
  const zipCode = searchParams.get("zipCode") ;
  const total = searchParams.get("total") ;

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-200 flex justify-center items-center p-4">
      <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-lg w-full text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-blue-950 text-white p-4 rounded-full shadow-lg">✅</div>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Confirmed</h2>
        <p className="text-blue-950 text-lg font-semibold mb-4">Successfully Received 🎉</p>

        {/* Order Details */}
        <div className="bg-gray-100 p-4 rounded-lg text-left shadow-inner">
          <p><strong>Name:</strong> {firstName} {lastName}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Phone:</strong> {phoneNumber}</p>
          <p><strong>Address:</strong> {address}, {city}, {zipCode}</p>
          <p className="text-lg font-bold text-gray-900 mt-2"><strong>Total Amount:</strong> ${total}</p>
        </div>

        {/* Thank You Message */}
        <div className="mt-4">
          <p className="text-gray-600 font-medium">Thank you for your order! 😊</p>
          <Link href="/" className="mt-6 inline-block bg-blue-950 hover:bg-blue-800 text-white px-6 py-2 rounded-lg">
            Go Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
