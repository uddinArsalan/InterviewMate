import { NextRequest, NextResponse } from "next/server";
import { CohereClient, CohereTimeoutError, CohereError } from "cohere-ai";
import { getUserInterviewQuesAndAns } from "@/lib/db";
import { domainTypes } from "@/interfaces";

const API_KEY = process.env.TRIAL_KEY;

interface RequestBodyType {
  domainValue: domainTypes;
  interviewId: number;
}

export async function POST(req: NextRequest) {
  if (!API_KEY) {
    return NextResponse.json({ error: "API_KEY not found" }, { status: 400 });
  }

  const cohere = new CohereClient({
    token: API_KEY,
  });

  try {
    const { domainValue, interviewId }: RequestBodyType = await req.json();
    const userInterviewSpecificQuestionAnswer =
      await getUserInterviewQuesAndAns(interviewId);
    console.log(`User Ques and Answers`, userInterviewSpecificQuestionAnswer);

    if (userInterviewSpecificQuestionAnswer.length == 0) {
      return NextResponse.json(
        {
          status: "error",
          message: "No User Questions and Answers available for this interview",
        },
        { status: 404 }
      );
    }

    const prompt = `Based on the following user interview for the ${domainValue} domain, generate a comprehensive report:

${userInterviewSpecificQuestionAnswer
  .map(
    (qa, index) => `
Question ${index + 1}: ${qa.question}
Answer ${index + 1}: "${qa.answer}"

Evaluate the answer based on the following criteria:
1. Relevance to the question
2. Completeness of the response
3. Accuracy of information provided (considering the ${domainValue} domain)

Provide a score from 0 to 100 and brief feedback.

Score:
Feedback:
`
  )
  .join("\n")}

Now, synthesize all the information above into a cohesive report that summarizes:
1. The overall quality of the responses in the context of the ${domainValue} domain
2. Key insights from the interview related to ${domainValue} skills and knowledge
3. Areas where the interviewee showed strength in ${domainValue}
4. Areas where the interviewee could improve their ${domainValue} skills or knowledge
5. Any notable patterns or themes across the responses specific to ${domainValue}

Report:
`;

    const response = await cohere.chat({
      message: prompt,
    });

    const result = response.text.trim();
    return NextResponse.json(
      {
        status: "success",
        message: "Report generated",
        data: { report: result },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error generating report:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to generate report",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
