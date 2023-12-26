import React from "react";
import Image from "next/image";
import { UsersData } from "@/data/users";

const Card = () => {
  return (
    <>
      {UsersData.map(({ id,name,description }) => (
        <div className="border-2 rounded-md flex flex-col gap-4 p-4 hover:shadow-md h-auto hover:shadow-purple-500 cursor-pointer" key={id}>
          <div className="text-sm font-bold">
           {description}
          </div>
          <div className="flex gap-2 items-center">
            <Image
              src= {`https://source.unsplash.com/48x48/?${name}`}
              alt="testimonial_img"
              width={48}
              height={48}
              className="w-12 h-12 object-cover rounded-full"
            />
            <span className="text-xs text-gray-600 dark:text-gray-300">{name}</span>
          </div>
        </div>
      ))}
    </>
  );
};

export default Card;
