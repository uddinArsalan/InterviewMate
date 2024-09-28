import { User } from "@supabase/supabase-js";
import { CohereClient, CohereTimeoutError, CohereError } from "cohere-ai";
import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.TRIAL_KEY;

interface RequestType {
  domain: string;
  user: User;
  interviewId: number;
  userResponse?: string;
  currentQuestionNumber?: number;
}

export async function POST(req: NextRequest) {
  if (!API_KEY) {
    return NextResponse.json(
      { status: "error", message: "API_KEY not found" },
      { status: 400 }
    );
  }

  const cohere = new CohereClient({
    token: API_KEY,
  });

  try {
    const { domain, user, interviewId, userResponse, currentQuestionNumber }: RequestType = await req.json();

    if (!user) {
      return NextResponse.json(
        { status: "error", message: "User not found, please SignUp or login first" },
        { status: 400 }
      );
    }

    let message: string;
    if (!currentQuestionNumber || currentQuestionNumber === 0) {
      message = `
        You are an AI interviewer conducting an interview for a ${domain} position. 
        The candidate's name is ${user.user_metadata.full_name}.
        Start the interview with a brief greeting and ask the first question.
        The question should be about the candidate's background or experience in ${domain}.
        Phrase your response as if you're directly speaking to the candidate.
      `;
    } else {
      message = `
        You are an AI interviewer conducting an interview for a ${domain} position. 
        The candidate's name is ${user.user_metadata.full_name}.
        This is question number ${currentQuestionNumber}.
        The candidate's response to the previous question was: "${userResponse}"
        Based on this response, ask a follow-up question that delves deeper into their knowledge or experience in ${domain}.
        If appropriate, move on to a new topic within ${domain}.
        Ensure your question is relevant to the candidate's previous answer and the ${domain} field.
        Phrase your response as if you're directly speaking to the candidate.
      `;
    }

    const response = await cohere.chat({
      message,
      conversationId: interviewId + "",
      preamble: `You are an expert interviewer in the field of ${domain}. Your goal is to assess the candidate's skills and experience through a natural, conversational interview.`,
    });

    console.log("Generated response from Cohere AI:", response.text);

    return NextResponse.json(
      {
        status: "success",
        message: "Question generated successfully",
        data: {
          question: response.text,
          questionNumber: (currentQuestionNumber || 0) + 1,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error generating data:", error);

    if (error instanceof CohereTimeoutError) {
      console.log("Request timed out", error);
      return NextResponse.json(
        { status: "error", message: "Request timed out, please try again later." },
        { status: 504 }
      );
    } else if (error instanceof CohereError) {
      console.log(`Cohere Error: ${error.statusCode}, ${error.message}`);
      return NextResponse.json(
        { status: "error", message: "Cohere API error, please try again later." },
        { status: error.statusCode || 500 }
      );
    }

    return NextResponse.json(
      { status: "error", message: "Failed to generate data" },
      { status: 500 }
    );
  }
}
