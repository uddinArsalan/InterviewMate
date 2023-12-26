import React from "react";

const Pay = () => {
  return (
    <div className="flex flex-col gap-4 justify-center items-center p-12 ">
      <div className="text-4xl">Start your journey today</div>
      <div className="text-gray-400 text-lg">
        Choose your plan and get instant access.
      </div>
      <div className="grid lg:grid-cols-3 mt-8 gap-4">
        <div className="flex flex-col gap-6 justify-center items-center rounded-md bg-[#1a1717] p-8">
          <div className="text-2xl">Flex</div>
          <div className="text-5xl">$99</div>
          <div className="text-gray-600 text-sm">Per quarter</div>
          <hr className=" bg-gray-100 w-full" />
          <div className="flex flex-col gap-4 mt-6 font-light text-sm">
            <div className="flex gap-2 justify-center items-center">
              <i className="fa-solid fa-plus"></i>
              <span>Access all previous contents</span>
            </div>
            <div className="flex gap-2 justify-center items-center">
              <i className="fa-solid fa-plus"></i>
              <span>Access all previous contents</span>
            </div>
            <div className="flex gap-2 justify-center items-center">
              <i className="fa-solid fa-plus"></i>
              <span>Access all previous contents</span>
            </div>
            <div className="flex gap-2 justify-center items-center">
              <i className="fa-solid fa-plus"></i>
              <span>Access all previous contents</span>
            </div>
            <div className="flex gap-2 justify-center items-center">
              <i className="fa-solid fa-plus"></i>
              <span>Access all previous contents</span>
            </div>
            <div className="flex gap-2 justify-center items-center">
              <i className="fa-solid fa-plus"></i>
              <span>Access all previous contents</span>
            </div>
          </div>
          <button className="border-2 border-white p-4 w-full rounded-lg">Choose quaterly plan</button>
        </div>

        <div className="flex flex-col gap-6 justify-center items-center rounded-md bg-pink-600 p-8">
          <div className="text-2xl text-white">Pro</div>
          <div className="text-5xl">$299</div>
          <div className="text-gray-100 text-sm">Per Year</div>
          <hr className=" bg-gray-100 w-full" />
          <div className="flex flex-col gap-4 mt-6 font-light text-sm">
            <div className="flex gap-2 justify-center items-center">
              <i className="fa-solid fa-plus"></i>
              <span>Access all previous contents</span>
            </div>
            <div className="flex gap-2 justify-center items-center">
              <i className="fa-solid fa-plus"></i>
              <span>Access all previous contents</span>
            </div>
            <div className="flex gap-2 justify-center items-center">
              <i className="fa-solid fa-plus"></i>
              <span>Access all previous contents</span>
            </div>
            <div className="flex gap-2 justify-center items-center">
              <i className="fa-solid fa-plus"></i>
              <span>Access all previous contents</span>
            </div>
            <div className="flex gap-2 justify-center items-center">
              <i className="fa-solid fa-plus"></i>
              <span>Access all previous contents</span>
            </div>
            <div className="flex gap-2 justify-center items-center">
              <i className="fa-solid fa-plus"></i>
              <span>Access all previous contents</span>
            </div>
          </div>
          <button className="text-white bg-black p-4 w-full rounded-lg">Choose quaterly plan</button>
        </div>

        <div className="flex flex-col gap-6 justify-center items-center rounded-md bg-[#1a1717] p-8">
          <div className="text-2xl">Ultimate</div>
          <div className="text-5xl">$999</div>
          <div className="text-gray-500 text-sm">One-time payment</div>
          <hr className=" bg-gray-100 w-full" />
          <div className="flex flex-col gap-4 mt-6 font-light text-sm mb-12">
            <div className="flex gap-2 items-center">
              <i className="fa-solid fa-plus"></i>
              <span>Everything in Pro, plus:</span>
            </div>
            <div className="flex gap-2 items-center">
              <i className="fa-solid fa-plus"></i>
              <span>Lifetime access to InterViewMate</span>
            </div>
            <div className="flex gap-2 items-center">
              <i className="fa-solid fa-plus"></i>
              <span>Special badge in the community</span>
            </div>
            <div className="flex gap-2 items-center">
              <i className="fa-solid fa-plus"></i>
              <span>1 Month of free mentoring (3 sessions)</span>
            </div>
          </div>
          <button className="border-2 border-white p-3 w-full rounded-lg">Choose quaterly plan</button>
        </div>

      </div>
    </div>
  );
};

export default Pay;
