import React from "react";
import Image from "next/image";
import { UsersData } from "@/data/users";

const Card = () => {
  return (
    <>
      {UsersData.map(({ id,name,description }) => (
        <div className="border-2 border-[#CCCCCC] rounded-md flex flex-col gap-4 p-4 hover:shadow-md h-auto hover:shadow-gray-800 dark:hover:shadow-purple-600 cursor-pointer" key={id}>
          <div className="text-sm font-bold">
           {description}
          </div>
          <div className="flex gap-2 items-center">
            <Image
              src={`https://source.unsplash.com/48x48/?headshot&sig=${Math.random()}`}
              alt={`testimonial_img-${id}`}
              width={48}
              height={48}
              className="rounded-full"
              unoptimized
            />
            <span className="text-xs text-gray-600 dark:text-gray-300">{name}</span>
          </div>
        </div>
      ))}
    </>
  );
};

export default Card;
