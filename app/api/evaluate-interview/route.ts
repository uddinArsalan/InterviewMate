import { NextRequest, NextResponse } from "next/server";
import { CohereClient, CohereTimeoutError, CohereError } from "cohere-ai";

const API_KEY = process.env.TRIAL_KEY;

interface RequestBodyType {
  userInterviewSpecificQuestionAnswer: [
    {
      question: string;
      answer: string;
    }
  ];
}

export async function POST(req: NextRequest) {
  if (!API_KEY) {
    return NextResponse.json({ error: "API_KEY not found" }, { status: 400 });
  }
  const cohere = new CohereClient({
    token: API_KEY,
  });
  try {
    const { userInterviewSpecificQuestionAnswer }: RequestBodyType =
      await req.json();

    const prompt = `${userInterviewSpecificQuestionAnswer.map(
      (questionAnswers) => `Question: ${questionAnswers.question}
            Answer: "${questionAnswers.answer}"
            
            Evaluate the answer based on the following criteria:
            1. Relevance to the question
            2. Completeness of the response
            3. Accuracy of information provided
            
            Provide a score from 0 to 100 and brief feedback.
            
            Score:
            Feedback:
            `
    )}
    `;
    const response = await cohere.chat({
      message: prompt,
    });
    // const evaluation = await evaluateWithCohere(question, answer);
    const result = response.text.trim();
    return NextResponse.json({});
  } catch (error) {
    console.error("Error in evaluate-answer:", error);
    return NextResponse.json(
      { error: "Failed to evaluate answer" },
      { status: 500 }
    );
  }
}
