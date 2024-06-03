import { DB_ID, account, database, serverAccount } from "@/utils/appWrite";
import { Button, Text } from "@radix-ui/themes";
import { Models } from "appwrite";
import { useEffect } from "react";
import { FaCamera, FaSearch, FaShoppingCart, FaUpload } from "react-icons/fa";

export default async function Home() {
  return (
    <div>
      <div className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Find Your Lucky Rupee</h1>
          <p className="text-lg md:text-2xl mb-8">Search and collect rupee notes with unique and auspicious serial numbers.</p>
          <div className="max-w-md mx-auto">
            <input type="text" placeholder="Enter Serial Number" className="w-full p-3 text-gray-800 rounded-lg focus:outline-none" />
            <button className="mt-4 w-full p-3 bg-blue-500 hover:bg-blue-600 rounded-lg">Search</button>
          </div>
        </div>
      </div>{" "}
      <div className="bg-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center">
              <FaCamera className="w-16 h-16 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Capture the Rupee</h3>
              <p className="text-gray-600">Take a clear photo of the rupee note you have.</p>
            </div>
            <div className="flex flex-col items-center">
              <FaUpload className="w-16 h-16 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Upload the Image</h3>
              <p className="text-gray-600">Upload the captured image to our app.</p>
            </div>
            <div className="flex flex-col items-center">
              <FaSearch className="w-16 h-16 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Search Serial Number</h3>
              <p className="text-gray-600">Enter the serial number to find its details.</p>
            </div>
            <div className="flex flex-col items-center">
              <FaShoppingCart className="w-16 h-16 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Purchase Rupee</h3>
              <p className="text-gray-600">Buy the rupee note if it matches your criteria.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
