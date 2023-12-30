"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Description from "./Description";
import Code from "./Code";
import { Button } from "@/components/ui/button";

const SolutionTabs = () => {
  return (
    <>
    <Tabs defaultValue="description" className="w-full">
      <TabsList className="w-full">
        <TabsTrigger value="description" className="w-1/2">
          Description
        </TabsTrigger>
        <TabsTrigger value="code" className="w-1/2">
          Code
        </TabsTrigger>
      </TabsList>
      <TabsContent value="description">
        <Description />
      </TabsContent>
      <TabsContent value="code"><Code /></TabsContent>
    </Tabs>
    <Button className="bg-green-700 dark:text-black font-bold text-white">Submit</Button>
    </>
  );
};

export default SolutionTabs;
