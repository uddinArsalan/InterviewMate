"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Description from "./Description";
import Code from "./Code";
import { Button } from "@/components/ui/button";
import { ChevronRight } from 'lucide-react';
import { startInterviewAudio } from "@/lib/audioFunctions";

const SolutionTabs = () => {
  return (
    <>
    <div className="w-full max-w-5xl mx-auto space-y-6">
      <Tabs defaultValue="description" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        <TabsContent value="description">
          <Description />
        </TabsContent>
        <TabsContent value="code">
          <Code />
        </TabsContent>
      </Tabs>
      <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3">
        Submit <ChevronRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
    </>
  );
};

export default SolutionTabs;
