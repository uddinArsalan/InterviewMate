"use client";

import Image from "next/image";
import React from "react";
import logo from "../../public/ai.png";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {
  const { setTheme } = useTheme();

  return (
    <div className="bg-[#FFFFFF] text-[#09090B] flex justify-around lg:justify-evenly w-full items-center border-[1] border-gray-200 p-6 border-b-[1px]">
      <Sheet>
        <SheetTrigger>
          {" "}
          <span className="lg:hidden">
            <i className="fa-solid fa-bars-staggered"></i>
          </span>
        </SheetTrigger>
        <SheetContent side={"left"}>
          <SheetHeader>
            <SheetTitle>
              <Link href="/">
                <div className="flex gap-2 justify-center items-center">
                  <Image
                    src={logo}
                    alt="icon"
                    className=" sm:w-10 w-7"
                  />
                  <div className="sm:text-3xl text-2xl font-sans">
                    <span className="font-semibold sm:font-bold rounded-md">
                      InterViewMate
                    </span>
                    {/* <span className="hover:translate-y-64 cursor-pointer">🛸</span> */}
                  </div>
                </div>
              </Link>
            </SheetTitle>
          </SheetHeader>
            {/* <SheetDescription> */}
            <div className="mt-16">
              <ul className="list-none flex flex-col items-center gap-6">
                <li className="hover:underline hover:text-purple-600 hover:underline-offset-8 cursor-pointer">
                  Home
                </li>
                <li className="hover:underline hover:text-purple-600  cursor-pointer hover:underline-offset-8">
                  Profile
                </li>
                <Link href="/interview">
                  <li className="hover:underline hover:text-purple-600  cursor-pointer hover:underline-offset-8">
                    Interview
                  </li>
                </Link>
                <li className="hover:underline hover:text-purple-600  cursor-pointer hover:underline-offset-8">
                  Feedback
                </li>
              </ul>
            </div>
            {/* </SheetDescription> */}
        </SheetContent>
      </Sheet>
      <Link href="/">
        <div className="flex gap-2 justify-center items-center">
          <Image src={logo} alt="icon" className=" sm:w-10 w-7 dark:bg-white" />
          <div className="sm:text-3xl text-2xl font-sans">
            <span className="font-semibold sm:font-bold rounded-md">
              InterViewMate
            </span>
            {/* <span className="hover:translate-y-64 cursor-pointer">🛸</span> */}
          </div>
        </div>
      </Link>
      <div className="lg:flex hidden">
        <ul className="list-none flex items-center gap-6">
          <li className="hover:underline hover:text-purple-600 hover:underline-offset-8 cursor-pointer">
            Home
          </li>
          <li className="hover:underline hover:text-purple-600  cursor-pointer hover:underline-offset-8">
            Profile
          </li>
          <Link href="/interview">
            <li className="hover:underline hover:text-purple-600  cursor-pointer hover:underline-offset-8">
              Interview
            </li>
          </Link>
          <li className="hover:underline hover:text-purple-600  cursor-pointer hover:underline-offset-8">
            Feedback
          </li>
        </ul>
      </div>
      <div className="md:flex gap-2 hidden">
        <Link href="/logIn">
          <div className="bg-[#09090B] text-[#FFFFFF] p-2 rounded-lg text-xs cursor-pointer">
            Log In
          </div>
        </Link>
        <Link href="/signUp">
          <div className="bg-[#09090B] text-[#FFFFFF] p-2 rounded-lg text-xs cursor-pointer">
            Sign Up
          </div>
        </Link>
      </div>
      <Sun
        className="h-[1.2rem] w-[1.2rem] dark:hidden"
        onClick={() => setTheme("dark")}
      />

      <Moon
        className="h-[1.2rem] w-[1.2rem] hidden dark:flex"
        onClick={() => setTheme("light")}
      />
    </div>
  );
};

export default Navbar;
