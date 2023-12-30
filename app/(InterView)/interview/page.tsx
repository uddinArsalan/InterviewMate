import React from "react";
// import { createServerClient, type CookieOptions } from '@supabase/ssr'
// import { cookies } from 'next/headers'
import Navbar from "@/app/components/Navbar";
import SolutionTabs from "./SolutionTabs";

const page = async () => {
  // const cookieStore = cookies()

  // const supabase = createServerClient(
  //   process.env.NEXT_PUBLIC_SUPABASE_URL!,
  //   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  //   {
  //     cookies: {
  //       get(name: string) {
  //         return cookieStore.get(name)?.value
  //       },
  //     },
  //   }
  // )

  // const data = await supabase.auth.getSession()
  // const data = await supabase.auth.getUser()
  // console.log(data?.data.user)
  // console.log(data.data.session)

  return (
    <>
      <Navbar />
      <div className="dark:bg-[#000000] flex flex-col gap-8 p-4 md:p-6">
        {/* <div className='bg-blue-900'></div> */}
        <canvas className="w-full dark:bg-white bg-black border-2 h-full lg:h-3/4" ></canvas>
        <div className="grid lg:grid-cols-3 gap-2">
          {/* <div></div> */}
          <div className="md:text-4xl text-3xl lg:text-5xl font-bold bg-clip-text bg-gradient-to-br dark:text-transparent from-green-400 font-serif to-green-900 text-center lg:col-span-2 underline">
            Start Your AI Interview{" "}
          </div>
          <div className="flex flex-col gap-2 items-center justify-end">
            <div className="text-xs dark:text-gray-700">Give access to your microphone and web camera</div>
            <div className="flex gap-2 cursor-pointer text-green-700">
            <i className="fa-solid fa-microphone"></i>
            <i className="fa-solid fa-video"></i>
            </div>
          </div>
        </div>
          <div className="md:text-4xl text-2xl lg:text-4xl text-center text-green-800 font-extrabold mt-8 mb-0">OR</div>
          <div className="flex flex-col gap-4 p-2 md:p-4 lg:p-8 w-full">
            <div className="text-2xl md:text-3xl font-extrabold text-green-900 text-center">Submit Your Solution in text format</div>
          <SolutionTabs />
          </div>
      </div>
    </>
  );
};

export default page;
