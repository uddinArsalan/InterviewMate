import React from "react";
import { Button } from "@/components/ui/button";
import Footer from "./Footer";
import Link from "next/link";

const LastSection = () => {
  return (
    <>
      <div className="flex flex-col bg-[#F5F5F5] dark:bg-[#151414] justify-center items-center p-16 gap-8">
        <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-pink-800 to-purple-700">
          Join Interview-Mate Now
        </div>
        <div className="">A quick way to prepare for your next interview </div>
        <Link href="/interview">
          <Button
            size={"lg"}
            className="bg-red-500 text-white rounded-md dark:hover:text-black"
          >
            Start practicing
          </Button>
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default LastSection;
