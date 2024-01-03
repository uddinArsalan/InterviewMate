import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
// import "../../styles/styles.css"
// dark:text-gray-200
// background-image: linear-gradient(to top, #fdcbf1 0%, #fdcbf1 1%, #e6dee9 100%);
// Your Gateway to Success Through Expert Interviews and Feedback

const Hero = () => {
  return (
    <div className="p-10 lg:p-16 lg:pt-36 grid gap-8 mb-12">
      <div className="grid grid-cols-1 gap-8 place-content-center md:place-items-center items-center lg:mb-20 md:mb-18 mb-12">
        <div className="flex flex-col gap-2 md:text-center text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-700 justify-center items-center">
          <div className="font-extrabold">
            <span className="text-transparent top lg:text-6xl text-5xl bg-clip-text bg-gradient-to-br from-purple-700 to-pink-700">
              Interview Mate
            </span>
            ⚡
            {/* <div className="bottom" aria-hidden="true">InterView Mate</div> */}
          </div>
          <div className="dark:text-[#FFFFFF] text-xl md:text-3xl font-bold md:w-3/4">
            Empower Your Career: AI-Driven Interviews, Tailored Guidance,
            Elevate Your Potential
          </div>
        </div>
        <Link href="/signUp">
          <Button size={"lg"} className="from-purple-700 to-purple-950 bg-gradient-to-r font-semibold text-white gap-3 p-3">
            <span>Get Started </span>
            <i className="fa-solid fa-arrow-up-right-from-square"></i>
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 justify-center gap-12">
        <Image
          src="https://source.unsplash.com/random/1000?coding"
          width={1000}
          height={1000}
          // fill={true}
          className="rounded-md"
          alt="Hero Image"
        />

        <div className="flex flex-col gap-6">
          <div className="font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-purple-700 to-pink-700 text-4xl sm:text-5xl">
            Features
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <span className="text-2xl text-black font-semibold dark:text-purple-500 dark:font-extrabold dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-purple-600 dark:to-pink-600">
                AI-Powered Interviews:
              </span>
              <div>
                <i className="fa-solid fa-check text-purple-900 text-lg font-extrabold mr-2"></i>
                <span className="text-sm">
                  InterviewMate harnesses AI algorithms to tailor interview
                  questions based on users profiles, experiences, and job
                  preferences. Our AI engine ensures personalized questioning
                  for a more relevant and challenging practice session.
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-2xl text-black font-semibold dark:text-purple-500 dark:font-extrabold dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-purple-600 dark:to-pink-600">
                Real-time Feedback:
              </span>
              <div>
                <i className="fa-solid fa-check text-purple-900 text-lg font-extrabold mr-2"></i><span className="text-sm">
                Experience instant feedback on your responses. Receive constructive critiques and suggestions to refine your answers and presentation in real-time, fostering continuous improvement.
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-2xl text-black font-semibold dark:text-purple-500 dark:font-extrabold dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-purple-600 dark:to-pink-600">
                Domain-Specific Questions:
              </span>
              <div>
                <i className="fa-solid fa-check text-purple-900 text-lg font-extrabold mr-2"></i>{" "}
                <span className="text-sm">
                Tailored to diverse job roles and industries, InterviewMate crafts questions pertinent to specific domains, ensuring a comprehensive practice that mirrors real-world interview scenarios.
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-2xl text-black font-semibold dark:text-purple-500 dark:font-extrabold dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-purple-600 dark:to-pink-600">
                Interactive Interface:
              </span>
              <div>
                <i className="fa-solid fa-check text-purple-900 text-lg font-extrabold mr-2"></i>
                <span className="text-sm">
                Our platform boasts a user-friendly interface, making practice sessions engaging and interactive. Navigate seamlessly through interviews and feedback to enhance your preparation.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
