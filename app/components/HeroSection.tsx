import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle, PlayCircle } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white min-h-screen">
      <div className="container mx-auto px-4 py-8 sm:py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center mb-12 lg:mb-20">
          <div className="space-y-6 lg:w-1/2">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400">
                Interview
              </span>
              <span className="text-gray-900 dark:text-white">Mate</span>
              <span className="ml-2">⚡</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-200 font-medium">
              Master Your Interviews, Unleash Your Potential
            </p>
            <p className="text-base text-gray-600 dark:text-gray-300">
              AI-powered practice, personalized feedback, and industry-specific insights to ace your next interview.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/signUp" className="w-full sm:w-auto">
                <Button size="lg" className="w-full bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 text-base sm:text-lg">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-400 dark:hover:text-gray-900 px-6 py-3 text-base sm:text-lg">
                Watch Demo <PlayCircle className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
          <div className="w-full lg:w-1/2 aspect-[4/3] lg:aspect-[16/9] rounded-lg overflow-hidden shadow-2xl mt-8 lg:mt-0">
            <div className="relative w-full h-full">
              <Image
                priority
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?fit=crop&w=1600&h=900&q=80"
                fill
                style={{objectFit: "cover"}}
                alt="A person confidently preparing for an interview with a laptop and notes"
                className="rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-4 sm:p-6">
                <p className="text-white text-base sm:text-lg font-semibold">Ready to ace your interview?</p>
                <p className="text-gray-200 text-sm sm:text-base">Start practicing now!</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 sm:mt-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-gray-900 dark:text-white">
            Why Choose Interview Mate?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-300">
                <CardContent className="p-4 sm:p-6 flex flex-col h-full">
                  <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600 dark:text-purple-400 mb-3 sm:mb-4" />
                  <h3 className="text-base sm:text-lg font-semibold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm flex-grow">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const features = [
  {
    title: "AI-Powered Interviews",
    description: "Tailored questions based on your profile and job preferences for a challenging practice session."
  },
  {
    title: "Real-time Feedback",
    description: "Instant, constructive critiques to refine your answers and presentation skills."
  },
  {
    title: "Industry-Specific",
    description: "Questions crafted for diverse job roles and industries, mirroring real-world scenarios."
  },
  {
    title: "Interactive Interface",
    description: "User-friendly platform for engaging and seamless interview preparation."
  }
];

export default HeroSection;