import React from "react";
import Image from "next/image";
import Link from "next/link";
// dark:text-gray-200
// background-image: linear-gradient(to top, #fdcbf1 0%, #fdcbf1 1%, #e6dee9 100%);
// Your Gateway to Success Through Expert Interviews and Feedback

const Hero = () => {
  return (
    <div className="dark:bg-none p-14 lg:p-16 lg:pt-36">
      <div className="grid grid-cols-1 gap-6 place-content-center md:place-items-center items-center ">
        <div className="flex flex-col gap-2 md:text-center text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-700">
          <div className="font-extrabold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-700">
              Interview Mate
            </span>
            ⚡
          </div>
          <div className="dark:text-[#FFFFFF] font-bold">
          Empower Your Career: AI-Driven Interviews, Tailored Guidance, Elevate Your Potential
          </div>
        </div>
        <Link href="/signUp"><button className="dark:bg-gray-600 bg-purple-800 transition-all dark:hover:bg-purple-800 w-36 font-bold text-white p-3 gap-3 rounded-md flex justify-center items-center">
          <span>Get Started </span>
          <i className="fa-solid fa-arrow-up-right-from-square"></i>
        </button></Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 justify-center gap-12 md:mt-36 mt-12">
        <Image
          src="https://source.unsplash.com/800x800/?coding"
          width={800}
          height={800}
          // fill={true}
          className="rounded-md"
          alt="Hero Image"
        />
      
      <div className="flex flex-col gap-6">
        <div className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-700 text-4xl sm:text-5xl">
          Features
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <span className="text-2xl text-black font-semibold dark:text-purple-500 dark:font-extrabold dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-purple-400 dark:to-pink-600">
              AI-Powered Interviews:
            </span>
            <div>
              <i className="fa-solid fa-check text-purple-900 text-lg font-extrabold mr-2"></i>
              Describe how the platform uses AI to generate tailored interview
              questions.
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-2xl text-black font-semibold dark:text-purple-500 dark:font-extrabold dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-purple-400 dark:to-pink-600">
              Real-time Feedback:
            </span>
            <div>
              <i className="fa-solid fa-check text-purple-900 text-lg font-extrabold mr-2"></i>{" "}
              Highlight instant feedback users receive on their interview
              performance.
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-2xl text-black font-semibold dark:text-purple-500 dark:font-extrabold dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-purple-400 dark:to-pink-600">
              Domain-Specific Questions:
            </span>
            <div>
              <i className="fa-solid fa-check text-purple-900 text-lg font-extrabold mr-2"></i>{" "}
              Emphasize the platforms ability to ask questions tailored to
              various job roles or industries.
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-2xl text-black font-semibold dark:text-purple-500 dark:font-extrabold dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-purple-400 dark:to-pink-600">
              Interactive Interface:
            </span>
            <div>
              <i className="fa-solid fa-check text-purple-900 text-lg font-extrabold mr-2"></i>
              Mention the platforms user-friendly and interactive design.
            </div>
          </div>
        </div>
      </div>
    </div>
      </div>
  );
};

export default Hero;
