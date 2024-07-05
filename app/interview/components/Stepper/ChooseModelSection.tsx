'use client'
import React, { useState } from "react";
import { AvailableModelsTypes } from "@/app/interfaces";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { charatersData } from "@/data/Characters";
import { ChevronLeft,ChevronRight } from "lucide-react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useApp } from "@/app/context/AppProvider";
import { useModel } from "@/app/context/ModelContextProvider";

const ChooseModelSection = () => {
  const [character, setCharacter] = useState<AvailableModelsTypes>("Pluto");
  const { setStep } = useModel();
  const {toggleDomainSelectionDialogBox} = useApp();
  const handleCharacterSelection = () => {
    setStep((prev) => ({ ...prev, isCharacterSelected: true }));
    toggleDomainSelectionDialogBox();
  };
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col justify-center items-center p-8">
    <h1 className="text-gray-800 dark:text-gray-200 font-bold text-4xl mb-12 text-center">
      Choose Your AI Companion
    </h1>
    
    <div className="w-full max-w-5xl">
      <Carousel className="w-full">
        <CarouselContent>
          {charatersData.map(({ name, url, id }) => (
            <CarouselItem key={id} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-3">
                <Card 
                  className="bg-white dark:bg-gray-800 overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
                >
                  <CardContent 
                    className="p-4 cursor-pointer"
                    onClick={() => setCharacter(name)}
                  >
                    <div className="relative w-full h-48 mb-4">
                      <Image
                        alt={`ai_character-${id}`}
                        src={url}
                        layout="fill"
                        objectFit="contain"
                        className="rounded-md"
                        priority
                      />
                    </div>
                    <h3 className="text-gray-800 dark:text-gray-200 font-semibold text-xl text-center">{name}</h3>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex -left-12 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300" />
        <CarouselNext className="hidden md:flex -right-12 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300" />
      </Carousel>
    </div>
    
    <div className="mt-12">
      <Button 
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md transition-colors duration-300"
        onClick={handleCharacterSelection}
      >
        Continue with {character || 'selected character'}
      </Button>
    </div>
  </div>
  );
};

export default ChooseModelSection;
