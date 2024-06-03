"use client";

import { account } from "@/utils/appWrite";
import { useEffect, useState } from "react";
import React from "react";
import * as Popover from "@radix-ui/react-popover";
import { FaUserCircle, FaBars, FaSignOutAlt } from "react-icons/fa";
import Link from "next/link";

const NavBar = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const user = await account.get();
      setUser(user);
    } catch (e) {}
  };
  //   const user = {
  //     avatar: "https://via.placeholder.com/150", // Replace with actual user avatar URL
  //     email: "johndoe@example.com", // Replace with actual user email
  //   };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">LuckyRupee</div>
        <div className="hidden md:flex space-x-8 items-center">
          <Link href="/" className="text-white hover:text-gray-400">
            Home
          </Link>
          <a href="#" className="text-white hover:text-gray-400">
            About
          </a>
          <a href="#" className="text-white hover:text-gray-400">
            Features
          </a>
          <a href="#" className="text-white hover:text-gray-400">
            Contact
          </a>
          <Link href={"/profile"} className="relative">
            <img src={"https://ui-avatars.com/api/?background=random"} alt="User Avatar" className="w-8 h-8 rounded-full" />
          </Link>
          <button
            className="p-2 text-white rounded-lg flex items-center justify-center"
            onClick={() => {
              account.deleteSession("current");
            }}
          >
            <FaSignOutAlt className="mr-2" />
            Logout
          </button>
        </div>
        <div className="md:hidden">
          <Popover.Root>
            <Popover.Trigger className="text-white focus:outline-none">
              <FaBars className="w-6 h-6" />
            </Popover.Trigger>
            <Popover.Content className="bg-gray-800 p-4 rounded-lg shadow-lg text-white">
              <div className="flex flex-col space-y-2">
                <a href="#" className="text-white hover:text-gray-400">
                  Home
                </a>
                <a href="#" className="text-white hover:text-gray-400">
                  About
                </a>
                <a href="#" className="text-white hover:text-gray-400">
                  Features
                </a>
                <a href="#" className="text-white hover:text-gray-400">
                  Contact
                </a>
                <div className="border-t border-gray-700 my-2"></div>
                <div className="flex items-center space-x-2">
                  <img src={"https://ui-avatars.com/api/?background=random"} alt="User Avatar" className="w-8 h-8 rounded-full" />
                  <span>{user?.email}</span>
                </div>
                <a href="/profile" className="text-gray-400 hover:text-gray-200 mt-2">
                  Profile
                </a>
                <button className="w-full p-2 bg-red-500 hover:bg-red-600 rounded-lg flex items-center justify-center mt-2">
                  <FaSignOutAlt className="mr-2" />
                  Logout
                </button>
              </div>
            </Popover.Content>
          </Popover.Root>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
