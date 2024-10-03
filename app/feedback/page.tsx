"use client";
import React, { useEffect, useState } from "react";
import { useApp } from "@/context/AppProvider";
import {
  getUserAllInterviewsInfo,
  getUserInterviewQuesAndAns,
  storeUserInterviewReport,
  updateInterviewReportStatus,
} from "@/lib/db";
import { domainTypes, UserInterviewsDataType } from "@/interfaces";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, FileText, BarChart2 } from "lucide-react";
import { DomainMap } from "@/data/DomainMapping";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function FeedbackPage() {
  const { currentUserId, startLoader, completeLoader } = useApp();
  const [load,setLoad] = useState<boolean>(false);
  const router = useRouter();
  const [userInterviews, setUserInterviews] = useState<
    UserInterviewsDataType[] | null
  >(null);

  useEffect(() => {
    const getUserInterviewsInfo = async () => {
      const loaderId = startLoader();
      try {
        const userInterviewsInfo = await getUserAllInterviewsInfo(
          currentUserId
        );
        setUserInterviews(userInterviewsInfo);
        toast.success("User Interviews Fetched successfully");
      } catch (error: any) {
        console.error("Failed to fetch interviews:", error);
        toast.error("Failed to load interviews. Please try again later.");
      } finally {
        completeLoader(loaderId);
      }
    };
    getUserInterviewsInfo();
  }, [currentUserId,load]);

  const handleGenerateReport = async (
    interviewId: number,
    domainValue: domainTypes
  ) => {
    try {
      console.log(`Generating report for interview ${interviewId}`);
      const userInterviewSpecificQuestionAnswer =
        await getUserInterviewQuesAndAns(currentUserId, interviewId);
      const res = await toast.promise(
        fetch(`/api/evaluate-interview`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            domainValue,
            userInterviewSpecificQuestionAnswer,
          }),
        }),
        {
          loading: "Generating report...",
          success: "Report generated successfully 👌",
          error: "Failed to generate report 🤯",
        }
      );

      if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message || "Failed to generate report");
      }

      const { data } = await res.json();
      const { report } = data;
      console.log(report);
      if(report){ 
        await storeUserInterviewReport(currentUserId,interviewId,report);
        await updateInterviewReportStatus(currentUserId,interviewId);
        setLoad(true);
      }
      return report;
    } catch (error: any) {
      console.error("Error:", error.message);
      toast.error(`Error: ${error.message}`);
      throw error;
    }
  };

  function handleViewReport(interviewId: number): void {
    router.push(`feedback/${interviewId}`)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">
          Interview Feedback Dashboard
        </h1>

        {/* Summary Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Interviews
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {userInterviews?.length || 0}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userInterviews &&
            userInterviews.map((userInterview) => (
              <Card
                key={userInterview.id}
                className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors"
              >
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl font-semibold">
                      Interview #{userInterview.id}
                    </CardTitle>
                    <Badge variant="secondary">
                      {DomainMap[
                        userInterview.domain_id as keyof typeof DomainMap
                      ] || "Unknown"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <Calendar className="mr-2 h-4 w-4 text-blue-400" />
                      <span>
                        Start:{" "}
                        {userInterview.start_time &&
                          new Date(userInterview.start_time).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="mr-2 h-4 w-4 text-green-400" />
                      <span>
                        End:{" "}
                        {userInterview.end_time &&
                          new Date(userInterview.end_time).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <BarChart2 className="mr-2 h-4 w-4 text-yellow-400" />
                      <span>
                        Duration:{" "}
                        {userInterview.start_time && userInterview.end_time
                          ? `${Math.round(
                              (new Date(userInterview.end_time).getTime() -
                                new Date(userInterview.start_time).getTime()) /
                                60000
                            )} mins`
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  {userInterview.report_status ? (
                    <Button
                      onClick={() => handleViewReport(userInterview.id)}
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                    >
                      View Report
                    </Button>
                  ) : (
                    <Button
                      onClick={() =>
                        handleGenerateReport(
                          userInterview.id,
                          DomainMap[
                            userInterview.domain_id as keyof typeof DomainMap
                          ]
                        )
                      }
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Generate Report
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
}

export default FeedbackPage;
