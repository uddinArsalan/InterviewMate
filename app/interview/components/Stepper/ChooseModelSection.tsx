"use client";
import React, { useState } from "react";
import { AvailableModelsTypes } from "@/interfaces";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { charactersData } from "@/data/Characters";
import Image from "next/image";
import { useApp } from "@/context/AppProvider";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useModel } from "@/context/ModelContextProvider";

const ChooseModelSection = () => {
  const [character, setCharacter] = useState<AvailableModelsTypes>("Pluto");
  const { setStep } = useModel();
  const { updateCharacterVoice } = useApp();
  const handleCharacterSelection = () => {
    const characterVoice = charactersData.find(
      (characters) => characters.name == character
    )?.voice;
    console.log(characterVoice);
    if (characterVoice) updateCharacterVoice(characterVoice);
    setStep((prev) => ({ ...prev, isCharacterSelected: true }));
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 flex flex-col justify-center items-center p-4 sm:p-8">
      <h1 className="text-gray-800 dark:text-gray-200 font-bold text-3xl sm:text-4xl mb-8 sm:mb-12 text-center">
        Choose Your AI Companion
      </h1>
      
      <div className="w-full max-w-5xl">
        <Carousel className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            {charactersData.map(({ name, url, id }) => (
              <CarouselItem key={id} className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                <div className="p-1">
                  <Card 
                    className={`bg-white dark:bg-gray-800 overflow-hidden rounded-lg transition-all duration-300 ease-in-out ${
                      character === name 
                        ? 'ring-2 ring-blue-500 shadow-lg' 
                        : 'shadow-md hover:shadow-xl'
                    }`}
                  >
                    <CardContent
                      className="p-3 cursor-pointer"
                      onClick={() => setCharacter(name)}
                    >
                      <div className="relative w-full pt-[133%] mb-3 overflow-hidden rounded-md">
                        <Image
                          alt={`ai_character-${id}`}
                          src={url}
                          fill
                          style={{ objectFit: "cover" }}
                          className="rounded-md transition-transform duration-300 hover:scale-105"
                          priority
                        />
                      </div>
                      <h3 className="text-gray-800 dark:text-gray-200 font-semibold text-lg text-center">
                        {name}
                      </h3>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex -left-4 lg:-left-12 bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300" />
          <CarouselNext className="hidden sm:flex -right-4 lg:-right-12 bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300" />
        </Carousel>
      </div>
      
      <div className="mt-8 sm:mt-12">
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-base sm:text-lg text-white font-semibold py-4 sm:py-6 px-6 sm:px-8 rounded-xl transition-colors duration-300"
          onClick={handleCharacterSelection}
          disabled={!character}
        >
          {character ? `Continue with ${character}` : 'Select a character'}
        </Button>
      </div>
    </div>
  );
};

export default ChooseModelSection;
