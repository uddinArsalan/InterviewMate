import imgUrl from "../../public/undraw_interview_re_e5jn.svg";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle,
  User,
  Briefcase,
  Bot,
  FileText,
  Repeat,
} from "lucide-react";

const HowTo = () => {
  const steps = [
    {
      icon: <User className="w-8 h-8" />,
      title: "Sign Up & Login",
      description: "Create your account and log in to get started",
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: "Choose Your Domain",
      description: "Select from various professional fields",
    },
    {
      icon: <Bot className="w-8 h-8" />,
      title: "Meet Your AI Interviewer",
      description: "Interact with our 3D AI interviewer",
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Complete the Interview",
      description: "Answer questions and showcase your skills",
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Receive Feedback",
      description: "Get detailed insights on your performance",
    },
    {
      icon: <Repeat className="w-8 h-8" />,
      title: "Practice More",
      description: "Try different domains to broaden your skills",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400">
            Start Your Interview Journey
          </span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16 ">
          <p className="text-xl text-gray-700 dark:text-gray-300">
            InterviewMate uses cutting-edge AI technology to provide a realistic
            interview experience. Our 3D AI interviewer adapts to your
            responses, creating a dynamic and challenging session tailored to
            your chosen domain.
          </p>
          {/* <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white">
              Get Started Now
            </Button> */}
          <div className="relative h-64 md:h-80">
            <Image
              src={imgUrl}
              alt="AI Interview Illustration"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>

        <h3 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
          How It Works
        </h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow duration-300"
            >
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full mr-4">
                    {step.icon}
                  </div>
                  <h4 className="text-xl font-semibold text-gray-800 dark:text-white">
                    {step.title}
                  </h4>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
            Ready to Excel in Your Interviews?
          </h3>
          <Link href="/signup">
            <Button
              size="lg"
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              Start Practicing Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HowTo;
// Classic Dark Mode:
// Background: #1E1E1E
// Text: #FFFFFF
// Accent: #4CAF50 or #1976D2
// Secondary Text: #A9A9A9
// Monochrome Dark Mode:
// Background: #222222
// Text: #DDDDDD
// Accent: #6B8E23 or #FFA500
// Secondary Text: #888888
// Blue Tones Dark Mode:
// Background: #0E1621
// Text: #F5F5F5
// Accent: #3498DB or #4A90E2
// Secondary Text: #BDC3C7
// Subdued Dark Mode:
// Background: #333333
// Text: #CCCCCC
// Accent: #8E44AD or #E74C3C
// Secondary Text: #AAAAAA
// Ocean Dark Mode:
// Background: #1A2533
// Text: #E0E6F1
// Accent: #00BCD4 or #03A9F4
// Secondary Text: #90A4AE
