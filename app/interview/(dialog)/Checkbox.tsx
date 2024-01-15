'use client'
import React,{useState} from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { CarouselData as DomainData } from "@/data/Carousel-domain";

interface DomainType {
  value : string;
  setValue : React.Dispatch<React.SetStateAction<string>>
 }

const Check = ({value,setValue} : DomainType) => {
  return (
    <> 
      {DomainData.map(({ id, domain }) => (
        <div key={id} className="flex gap-3 bg-gray-800 p-4 text-lg text-white">
          <Checkbox id={domain} checked={value == domain} onCheckedChange={() => setValue(domain)}/>
          <label
            htmlFor={domain}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {domain}
          </label>
        </div>
      ))}
     </>
  );
};

export default Check;
