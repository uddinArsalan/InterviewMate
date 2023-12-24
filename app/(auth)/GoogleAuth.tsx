"use client";
import React, { useContext } from "react";
import google_icon from "@/public/google-icon.svg";
import { SupbaseContext } from "@/app/context/SupbaseProvider";
import Image from "next/image";

const GoogleAuth = () => {
  const supabase = useContext(SupbaseContext);
  const signInWithGoogle = async () => {
    if (supabase) {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });
      console.log(data, error);
    }
  };
  return (
    <div className="flex bg-blue-500 text-sm font-semibold border-2 cursor-pointer" onClick={signInWithGoogle}>
      <div className="bg-white p-2 flex justify-center items-center">
        <Image src={google_icon} alt="" className="w-4" />
      </div>
      <span className="text-white flex justify-center items-center p-2">
        Sign In with Google
      </span>
    </div>
  );
};

export default GoogleAuth;
