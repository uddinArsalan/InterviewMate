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
    
    const {domain,user} = await req.json()
    if(!user){
      throw new Error("User Not found ,please SignUp or login first")
    }
    try {
      const generate = await cohere.generate({
        prompt: `
      Generate interview questions for a ${domain} position. Include:
      
      1. A brief greeting using ${user.user_metadata.first_name}
      2. 2-3 introductory questions about the candidate's background
      3. 5-7 technical questions specific to ${domain}, covering:
         - Experience
         - Problem-solving skills
         - Knowledge of relevant technologies
      4. 1-2 closing questions about career goals or culture fit
      
      Format as a numbered list. Exclude any explanations or additional text.
      `
      });

      const generatedText = generate.generations[0].text;
      
      return NextResponse.json( generatedText , { status: 200 }); 

    } catch (error) {
      console.error('Error generating data:', error);
      return NextResponse.json({ error: 'Failed to generate data' }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: 'API_KEY not found' }, { status: 400 });
  }
}
