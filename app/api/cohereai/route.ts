import { CohereClient } from 'cohere-ai';
import { NextRequest, NextResponse } from 'next/server';

const API_KEY = process.env.TRIAL_KEY;
// interface MyRequestBody {
//   domain: string;
//   // Add other properties if necessary
// }


export async function POST(req : NextRequest) {
  if (API_KEY) {
    const cohere = new CohereClient({
      token: API_KEY,
    });

    try {
      const {domain} = await req.json()
      const generate = await cohere.generate({
        prompt: `Generate interview questions for a ${domain} position. Start with a greeting and introductory section, then move on to technical questions related to the ${domain}. Ensure that the questions cover various aspects, such as the candidate's experience, problem-solving skills, and knowledge of relevant technologies. Focus solely on the questions, and exclude any additional information or introductory paragraphs. Use placeholders like Arsalan where needed. The output should be a structured set of questions resembling a real interview experience.
        `,
      });

      const generatedText = generate.generations[0].text;
      
      // Send the generated text back to the client side
      // const body = JSON.parse(req.body)
      
      return NextResponse.json( generatedText , { status: 200 }); 

    } catch (error) {
      console.error('Error generating data:', error);
      return NextResponse.json({ error: 'Failed to generate data' }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: 'API_KEY not found' }, { status: 400 });
  }
}
