// import {  } from "@supabase/supabase-js";
import { createBrowserClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser,getDomainId } from "@/lib/db";
import { formatDate } from "@/utils";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function POST(req: NextRequest) {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error("Supabase credentials are missing");
    return NextResponse.json({ error: "API_KEYS not found" }, { status: 400 });
  }

  const supabase = createBrowserClient(SUPABASE_URL, SUPABASE_KEY);
  
  try {
    const { domainValue, questions_text } = await req.json();
    const user = await getCurrentUser();
    console.log("Domain Value:", domainValue);
    console.log("Questions Text:", questions_text);
    console.log("User Id:", user?.id);

    if(!user){
      return;
    }

    const domainId = await getDomainId(domainValue);

    // if (domainError) {
    //   console.error("Error querying domain:", domainError);
    //   return NextResponse.json({ error: "Failed to query domain" }, { status: 500 });
    // }

    if (!domainId) {
      console.error("Domain not found:", domainValue);
      return NextResponse.json({ error: "Domain not found" }, { status: 404 });
    }

    console.log("Domain Id:", domainId);

    const { data: questionData, error: questionError } = await supabase
      .from("questions")
      .insert([{ domain_id: domainId, question_text: questions_text ,user_id : user.id,created_at : formatDate(new Date()) }]);

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