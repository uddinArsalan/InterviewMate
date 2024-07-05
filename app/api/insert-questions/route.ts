import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function POST(req: NextRequest) {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error("Supabase credentials are missing");
    return NextResponse.json({ error: "API_KEYS not found" }, { status: 400 });
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
  
  try {
    const { domainValue, questions_text } = await req.json();
    console.log("Domain Value:", domainValue);
    console.log("Questions Text:", questions_text);

    const { data: domainData, error: domainError } = await supabase
      .from("domains")
      .select("domain_id")
      .eq("domain", domainValue)
      .single();

    if (domainError) {
      console.error("Error querying domain:", domainError);
      return NextResponse.json({ error: "Failed to query domain" }, { status: 500 });
    }

    if (!domainData) {
      console.error("Domain not found:", domainValue);
      return NextResponse.json({ error: "Domain not found" }, { status: 404 });
    }

    console.log("Domain Data:", domainData);

    const { data: questionData, error: questionError } = await supabase
      .from("questions")
      .insert([{ domain_id: domainData.domain_id, question_text: questions_text }]);

    if (questionError) {
      console.error("Error inserting questions:", questionError);
      return NextResponse.json({ error: "Failed to insert questions" }, { status: 500 });
    }

    console.log("Questions inserted successfully");
    return NextResponse.json({ message: "Questions inserted successfully" }, { status: 200 });

  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}