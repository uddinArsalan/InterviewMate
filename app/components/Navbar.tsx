"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import logo from "../../public/ai.png";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import ProfileIcon from "./ProfileIcon";
import { useApp } from "../../context/AppProvider";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const NavItem = ({ href, label }: { href: string; label: string }) => (
  <Link
    href={href}
    className="text-gray-700 hover:text-purple-600 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
  >
    {label}
  </Link>
);

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 text-yellow-400" />
      ) : (
        <Moon className="h-5 w-5 text-gray-700" />
      )}
    </button>
  );
};

const MobileMenu = () => {
  const { currentUser } = useApp();
  return (
    <Sheet>
      <SheetTrigger className="md:hidden p-2">
        <i className="fa-solid fa-bars-staggered text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"></i>
      </SheetTrigger>
      <SheetContent side="right" className="w-64">
        <SheetHeader>
          <SheetTitle className="text-lg font-semibold">Menu</SheetTitle>
        </SheetHeader>
        <nav className="mt-8 flex flex-col space-y-4">
          <MobileNavItem href="/" label="Home" />
          <MobileNavItem href="/interview" label="Interview" />
          <MobileNavItem href="/feedback" label="Feedback" />
          {currentUser ? (
              <MobileNavItem href="/profile" label="Profile">
              <ProfileIcon />
              </MobileNavItem>
          ) : (
            <div className="mt-8 space-y-4">
              <Link href="/login" className="block w-full">
                <button className="w-full bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-700 transition duration-150 ease-in-out">
                  Log In
                </button>
              </Link>
              <Link href="/signup" className="block w-full">
                <button className="w-full bg-gray-800 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition duration-150 ease-in-out">
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

const MobileNavItem = ({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children?: React.ReactNode;
}) => (
  <Link
    href={href}
    className="block px-4 py-2 text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800 rounded-md "
  >
    <div className="flex justify-between items-center">
      {label}
      <span>{children}</span>
    </div>
  </Link>
);

const Navbar = () => {
  const { currentUser } = useApp();

  return (
    <nav className="bg-gray-50 dark:bg-black dark:border-0 border-gray-200 dark:border-gray-700 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Image src={logo} alt="InterViewMate" className="h-8 w-auto" />
              <span className="ml-3 text-xl font-bold text-gray-900 dark:text-white">
                InterViewMate
              </span>
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-6">
            <NavItem href="/" label="Home" />
            <NavItem href="/profile" label="Profile" />
            <NavItem href="/interview" label="Interview" />
            <NavItem href="/feedback" label="Feedback" />
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex md:items-center md:space-x-2">
              {currentUser ? (
                <ProfileIcon />
              ) : (
                <>
                  <Link href="/login">
                    <button className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-700 transition duration-150 ease-in-out">
                      Log In
                    </button>
                  </Link>
                  <Link href="/signup">
                    <button className="bg-gray-800 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition duration-150 ease-in-out">
                      Sign Up
                    </button>
                  </Link>
                </>
              )}
            </div>
            <ThemeToggle />
            <MobileMenu />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
