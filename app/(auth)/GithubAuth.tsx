"use client";
import React from "react";
import { useSupabase } from "@/context/SupabaseProvider";

const GithubAuth = () => {
  const { supabase } = useSupabase();
  async function signInWithGithub() {
    if (supabase) {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "github",
      });
      console.log(data, error);
    }
  }

  return (
    <div
      className="dark:bg-gray-400 dark:hover:bg-gray-300 bg-gray-300 cursor-pointer rounded-md flex justify-center w-fit p-2"
      onClick={signInWithGithub}
    >
      <i className="fa-brands fa-github text-xl text-black"></i>
    </div>
  );
};

export default GithubAuth;
