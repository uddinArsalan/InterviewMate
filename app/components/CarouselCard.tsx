"use client"

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CarouselData } from "@/data/Carousel-domain";
import Image from "next/image";

// grid lg:grid-cols-3 md:grid-cols-2 gap-6

const CarouselCard = () => {
  return (
    <Carousel className="w-full relative">
      <CarouselContent className=''>
        {CarouselData.map(({ id, domain }) => (
          <CarouselItem key={id} className='basis-full md:basis-1/2'>
          <div className="flex flex-col gap-2 items-center cursor-pointer">
            <Image
              src={`https://source.unsplash.com/600x300/?${domain}`}
              alt="avatar1"
              width={600}
              height={300}
              className="object-cover"
            />
            <span className="text-3xl font-bold dark:text-purple-500">
              {domain}
            </span>
          </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default CarouselCard;
