import React from "react";
// import { createServerClient, type CookieOptions } from '@supabase/ssr'
// import { cookies } from 'next/headers';
import Navbar from "@/app/components/Navbar";
import ModelContextProvider from "../../context/ModelContextProvider";
import InterviewPreparationPanel from "./components/InterviewPreparationPanel";
import ModelAndVideoDisplay from "./components/Stepper/InterviewPanel";
import InterviewSteps from "./components/Stepper/Steps";

const page = () => {
  // const [showModel,setShowModel] = useState(false)
  // const VideoRef = useRef<HTMLVideoElement>(null);
  // console.log(process.env.OPENAI_API_KEY)
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
  // const API_TOKEN = process.env.HUGGING_API_KEY

  //   const response = await fetch(
  //     "https://api-inference.huggingface.co/models/gpt2",
  //     {
  //         headers: { Authorization: `Bearer ${API_TOKEN}` },
  //         method: "POST",
  //         body: JSON.stringify("Give 10 interview questions"),
  //         // return_full_text : false
  //       },
  //       //
  // );

  // const result = await response.json();
  // console.log(result)

  // 
  // const generateData = async () => {
  //   const res = await fetch("http://localhost:3000/api/cohereai", {
  //     method: "POST",
  //   });
  //   console.log("Hi Client");
  //   const data = await res.json();
  //   console.log(data);
  // };

  return (
    <>
      <Navbar />
      <ModelContextProvider>
        <div className="dark:bg-[#000000] flex flex-col gap-8 p-4 md:p-6">
          <InterviewSteps />
          <div>
            <InterviewPreparationPanel />
          </div>
        </div>
      </ModelContextProvider>
    </>
  );
};

export default page;
