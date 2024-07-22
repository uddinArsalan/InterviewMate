import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Footer from "./Footer";
import Link from "next/link";
import { Rocket, ArrowRight } from "lucide-react";

const LastSection = () => {
  return (
    <>
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 py-24">
        <Card className="max-w-4xl mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg">
          <CardContent className="flex flex-col items-center p-12 gap-8 text-center">
            <Rocket className="w-16 h-16 text-purple-600 dark:text-purple-400" />
            <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">
              Elevate Your Interview Skills
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
              Join Interview-Mate now and unlock a quick, effective way to prepare for your next career-defining moment.
            </p>
            <Link href="/interview">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white dark:bg-purple-500 dark:hover:bg-purple-600 transition-colors duration-300 group">
                Start Practicing
                <ArrowRight className="ml-2 h-5 w-5 group-hover:transform group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </>
  );
};

export default LastSection;
