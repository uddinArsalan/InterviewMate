'use client'
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { CarouselData as DomainData } from "@/data/Carousel-domain";
import { useApp } from "@/context/AppProvider";

const CheckList = () => {
  const {domainValue,updateDomainValue} = useApp();
  return (
    <div className="space-y-2">
    {DomainData.map(({ id, domain }) => (
      <div key={id} className="flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700">
        <Checkbox 
          id={domain} 
          checked={domainValue === domain} 
          onCheckedChange={() => updateDomainValue(domain)}
          className="border-gray-300 text-emerald-600 focus:ring-emerald-500 dark:border-gray-600 dark:text-emerald-400 dark:focus:ring-emerald-400"
        />
        <label
          htmlFor={domain}
          className="text-sm font-medium text-gray-700 dark:text-gray-200 cursor-pointer select-none"
        >
          {domain}
        </label>
      </div>
    ))}
  </div>
  );
};

export default CheckList;
