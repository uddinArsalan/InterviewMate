const { createClient } = require("@supabase/supabase-js");
import { NextRequest, NextResponse } from "next/server";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function POST(req: NextRequest) {
  if (SUPABASE_URL && SUPABASE_KEY) {
    // console.log(SUPABASE_URL, SUPABASE_KEY);
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
    const { domainValue, questions_text } = await req.json();
    console.log(domainValue)
    try {
      if (supabase != null) {
        const { data } = await supabase
          .from("domains")
          .select("domain_id")
          .eq("domain", domainValue);
        console.log(data)
        const { domain_id } = data[0];
        // setDomainId(domain_id)
        console.log(domain_id, data);
        const { error } = await supabase
          .from("questions")
          .insert({ domain_id: domain_id, question_text: questions_text });
        // .select();

        console.log(error);
        return NextResponse.json("Questions inserted", { status: 200 });
      }
    } catch (error) {
      console.error("Error inserting data:", error);
      return NextResponse.json(
        { error: "Failed to insert data" },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json({ error: "API_KEYS not found" }, { status: 400 });
  }
}
