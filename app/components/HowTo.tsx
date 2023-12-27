import React from "react";
import Image from "next/image";
import img from "../../public/undraw_solution_mindset_re_57bf.svg";
// import "../../styles/styles.css"
import CarouselCard from "./CarouselCard";

const HowTo = () => {
  return (
    <div className="flex flex-col gap-12 p-8 lg:p-16  justify-center items-center w-full dark:bg-[#060606] rounded-tl-3xl">
      <div className="md:text-5xl text-2xl text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-600 dark:from-red-600 dark:to-pink-600 text-center font-extrabold">
        Start Your Interview Journey with InterViewMate !
      </div>
      <div className="grid lg:grid-cols-2 gap-8 rounded-md p-8 place-content-center border-2 border-gray-600">
        <Image
          src={img}
          alt="interview-illustration"
          className="h-full text-blue-200"
        />
        <div className="flex md:justify-center items-center">
          <ul className="flex flex-col gap-8 dark:text-white">
            <li>
              <div className="flex gap-2 items-center">
              <i className="fa-solid fa-diamond cursor-pointer"></i>
                <span className="font-semibold text-lg">Register & Log In</span>
              </div>
            </li>
            <li>
              <div className="flex gap-2 items-center">
              <i className="fa-solid fa-diamond cursor-pointer"></i>
                <span className="font-semibold text-lg">Choose Your Domain</span>
              </div>
            </li>
            <li>
              <div className="flex gap-2 items-center">
              <i className="fa-solid fa-diamond cursor-pointer"></i>
                <span className="font-semibold text-lg">Meet Your AI Interviewer</span>
              </div>
            </li>
            <li>
              <div className="flex gap-2 items-center">
              <i className="fa-solid fa-diamond cursor-pointer"></i>
                <span className="font-semibold text-lg">problem solving</span>
              </div>
            </li>
            <li>
              <div className="flex gap-2 items-center">
              <i className="fa-solid fa-diamond cursor-pointer"></i>
                <span className="font-semibold text-lg">Schedule Mock Interviews</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="md:text-6xl text-4xl text-center mt-12 font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-purple-600 mb-8">CHOOSE YOUR DOMAIN</div>
        <CarouselCard />
        {/* <div className="flex flex-col gap-2 bg-[#0a0a0a] p-2">
          <Image
            src="https://source.unsplash.com/300x300/?Software Development"
            alt="avatar1"
            width={300}
            height={300}
          />
          <span className="text-3xl font-bold text-purple-500">Software Development</span>
        </div>
        <div className="flex flex-col gap-2 bg-[#0a0a0a] p-2">
          <Image
            src="https://source.unsplash.com/300x300/?Finance and Accounting"
            alt="avatar2"
            width={300}
            height={300}
          />
          <span className="text-3xl text-purple-500 font-bold">Finance and Accounting</span>
        </div>
        <div className="flex flex-col gap-2 bg-[#0a0a0a] p-2">
          <Image
            src="https://source.unsplash.com/300x300/?Machine Learning"
            alt="avatar3"
            width={300}
            height={300}
          />
          <span className="text-3xl text-purple-500 font-bold">Machine Learning</span>
        </div>
        <div className="flex flex-col gap-2 bg-[#0a0a0a] p-2">
          <Image
            src="https://source.unsplash.com/300x300/?"
            alt="avatar4"
            width={300}
            height={300}
          />
          <span className="text-3xl text-purple-500 font-bold">MODEL-4</span>
        </div> */}
    </div>
  );
};

export default HowTo;
// Classic Dark Mode:
// Background: #1E1E1E
// Text: #FFFFFF
// Accent: #4CAF50 or #1976D2
// Secondary Text: #A9A9A9
// Monochrome Dark Mode:
// Background: #222222
// Text: #DDDDDD
// Accent: #6B8E23 or #FFA500
// Secondary Text: #888888
// Blue Tones Dark Mode:
// Background: #0E1621
// Text: #F5F5F5
// Accent: #3498DB or #4A90E2
// Secondary Text: #BDC3C7
// Subdued Dark Mode:
// Background: #333333
// Text: #CCCCCC
// Accent: #8E44AD or #E74C3C
// Secondary Text: #AAAAAA
// Ocean Dark Mode:
// Background: #1A2533
// Text: #E0E6F1
// Accent: #00BCD4 or #03A9F4
// Secondary Text: #90A4AE
