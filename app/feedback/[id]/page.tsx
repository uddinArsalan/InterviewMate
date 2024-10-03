"use client";
import { useEffect, useState, useCallback } from "react";
import { useApp } from "@/context/AppProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUserInterviewReport } from "@/lib/db";
import toast from "react-hot-toast";
import { ReportJSONFormat } from "@/interfaces";

export default function ReportPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const { startLoader, completeLoader, currentUserId } = useApp();
  const [report, setReport] = useState<ReportJSONFormat>();

  const getUserInterviewsReportInfo = useCallback(async () => {
    const interviewId = parseInt(id);
    const loaderId = startLoader();
    try {
      const userReport = await getUserInterviewReport(
        currentUserId,
        interviewId
      );
      if (userReport) {
        console.log(typeof JSON.parse(JSON.parse(JSON.stringify(userReport))))
        setReport(JSON.parse(JSON.parse(JSON.stringify(userReport))));
        toast.success("User Report Fetched successfully");
      } else {
        console.warn("Received null or undefined report data");
        toast.error("No report data available. Please try again later.");
      }
    } catch (error: any) {
      console.error("Failed to fetch interview report:", error);
      toast.error(
        "Failed to load user interview report. Please try again later."
      );
    } finally {
      completeLoader(loaderId);
    }
  }, [id, currentUserId]);

  useEffect(() => {
    getUserInterviewsReportInfo();
  }, [getUserInterviewsReportInfo]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-gray-800 border border-gray-700 shadow-lg rounded-lg">
          <CardHeader className="border-b border-gray-700 p-4">
            <CardTitle className="text-3xl font-bold text-gray-100">
              Interview Report : {report?.domain}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-8">
              {/* Overall Quality Section */}
              <section>
                <h2 className="text-2xl font-semibold mb-2 text-gray-200">
                  Overall Quality
                </h2>
                {report?.overallQuality ? (
                  <p className="text-lg text-gray-400">
                    {report.overallQuality}
                  </p>
                ) : (
                  <p className="text-lg text-gray-500">
                    Overall quality information is not available.
                  </p>
                )}
              </section>

              {/* Key Insights Section */}
              <section>
                <h2 className="text-2xl font-semibold mb-2 text-gray-200">
                  Key Insights
                </h2>
                {report && report?.keyInsights?.length > 0 ? (
                  <ul className="list-disc pl-5 space-y-1 text-gray-400">
                    {report?.keyInsights.map((insight, index) => (
                      <li key={index} className="text-lg">
                        {insight}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-lg text-gray-500">
                    No key insights available.
                  </p>
                )}
              </section>

              {/* Strengths Section */}
              <section>
                <h2 className="text-2xl font-semibold mb-2 text-gray-200">
                  Strengths
                </h2>
                {report && report?.strengths?.length > 0 ? (
                  <ul className="list-disc pl-5 space-y-1 text-gray-400">
                    {report.strengths.map((strength, index) => (
                      <li key={index} className="text-lg">
                        {strength}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-lg text-gray-500">
                    No strengths mentioned.
                  </p>
                )}
              </section>

              {/* Areas for Improvement Section */}
              <section>
                <h2 className="text-2xl font-semibold mb-2 text-gray-200">
                  Areas for Improvement
                </h2>
                {report && report?.areasForImprovement?.length > 0 ? (
                  <ul className="list-disc pl-5 space-y-1 text-gray-400">
                    {report.areasForImprovement.map((area, index) => (
                      <li key={index} className="text-lg">
                        {area}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-lg text-gray-500">
                    No areas for improvement listed.
                  </p>
                )}
              </section>

              {/* Question Evaluations Section */}
              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-200">
                  Question Evaluations
                </h2>
                {report && report?.questionEvaluations?.length > 0 ? (
                  <div className="space-y-6">
                    {report.questionEvaluations.map((evaluation, index) => (
                      <div
                        key={index}
                        className="p-6 bg-gray-700 rounded-lg shadow-sm"
                      >
                        <h3 className="text-lg font-semibold text-gray-100 mb-2">
                          Question {evaluation.questionNumber}
                        </h3>
                        <p className="text-gray-300">
                          <strong>Q:</strong> {evaluation.question}
                        </p>
                        <p className="text-gray-300">
                          <strong>A:</strong>{" "}
                          {evaluation.answer || "No answer provided"}
                        </p>
                        <p className="text-gray-300">
                          <strong>Score:</strong> {evaluation.score}
                        </p>
                        <p className="text-gray-300">
                          <strong>Feedback:</strong> {evaluation.feedback}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-lg text-gray-500">
                    No question evaluations available.
                  </p>
                )}
              </section>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
