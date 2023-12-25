import React from "react";
import Image from "next/image";
import img from "../../public/undraw_solution_mindset_re_57bf.svg";
// import "../../styles/styles.css"

const HowTo = () => {
  return (
    <div className="flex flex-col gap-12 p-8 lg:p-16  justify-center items-center w-full bg-[#060606] rounded-t-3xl">
      <div className="md:text-5xl text-2xl text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-purple-600 text-center font-extrabold">
        Start Your Interview Journey with InterViewMate !
      </div>
      <div className="grid lg:grid-cols-2 gap-8 rounded-md p-8 place-content-center border-2 border-gray-600">
        <Image
          src={img}
          alt="interview-illustration"
          className="h-full text-blue-200"
        />
        <div className="flex md:justify-center items-center">
          <ul className="flex flex-col gap-8">
            <li>
              <div className="flex gap-2 items-center">
                <i className="fa-solid fa-square-plus cursor-pointer"></i>
                <span className="font-semibold">Register & Log In</span>
              </div>
            </li>
            <li>
              <div className="flex gap-2 items-center">
                <i className="fa-solid fa-square-plus cursor-pointer"></i>
                <span className="font-semibold">Choose Your Domain</span>
              </div>
            </li>
            <li>
              <div className="flex gap-2 items-center">
                <i className="fa-solid fa-square-plus cursor-pointer"></i>
                <span className="font-semibold">Meet Your AI Interviewer</span>
              </div>
            </li>
            <li>
              <div className="flex gap-2 items-center">
                <i className="fa-solid fa-square-plus cursor-pointer"></i>
                <span className="font-semibold">problem solving</span>
              </div>
            </li>
            <li>
              <div className="flex gap-2 items-center">
                <i className="fa-solid fa-square-plus cursor-pointer"></i>
                <span className="font-semibold">Schedule Mock Interviews</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="md:text-6xl text-4xl text-center mt-12 font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-purple-600">CHOOSE YOUR AVATAR</div>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2 bg-[#0a0a0a] p-2 border-2 hover:scale-105 transition-transform">
          <Image
            src="https://source.unsplash.com/300x300/?jack"
            alt="avatar1"
            width={300}
            height={300}
          />
          <span className="text-3xl font-bold text-purple-500">MODEL 1</span>
        </div>
        <div className="flex flex-col gap-2 bg-[#0a0a0a] p-2 border-2 hover:scale-105 transition-transform">
          <Image
            src="https://source.unsplash.com/300x300/?3d"
            alt="avatar2"
            width={300}
            height={300}
          />
          <span className="text-3xl text-purple-500 font-bold">MODEL-2</span>
        </div>
        <div className="flex flex-col gap-2 bg-[#0a0a0a] p-2 border-2 hover:scale-105 transition-transform">
          <Image
            src="https://source.unsplash.com/300x300/?manager"
            alt="avatar3"
            width={300}
            height={300}
          />
          <span className="text-3xl text-purple-500 font-bold">MODEL-3</span>
        </div>
        <div className="flex flex-col gap-2 bg-[#0a0a0a] p-2 border-2 hover:scale-105 transition-transform">
          <Image
            src="https://source.unsplash.com/300x300/?3d"
            alt="avatar4"
            width={300}
            height={300}
          />
          <span className="text-3xl text-purple-500 font-bold">MODEL-4</span>
        </div>
      </div>
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
