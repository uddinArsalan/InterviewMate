import {
  UserInterviewInfoType,
  ReportJSONFormat,
  domainTypes
} from "@/interfaces";
import { createBrowserClient } from "@supabase/ssr";
import { User } from "@supabase/supabase-js";
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
import { Database, Json } from "../../interfaces/supabase";
import { DomainMap } from "@/data/DomainMapping";

const supabase = createBrowserClient<Database>(SUPABASE_URL, SUPABASE_KEY);

export async function getCurrentUser(): Promise<{
  user: User | null;
  userId: string | undefined;
}> {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) throw error;
  return { user, userId: user?.id };
}

export async function getExistingUser(
  userId: string
): Promise<Database["public"]["Tables"]["users"]["Row"] | null> {
  const { data, error } = await supabase
    .from("users")
    .select()
    .eq("id", userId)
    .single();

  if (error && error.code !== "PGRST116") throw error;
  return data;
}

export async function getDomainId(domainName: domainTypes): Promise<number> {
  const { data, error } = await supabase
    .from("domains")
    .select("domain_id")
    .eq("domain_name", domainName)
    .single();

  if (error) throw error;
  return data.domain_id;
}

export async function getUserQuestions(
  questionId: number
): Promise<string | null> {
  const { data, error } = await supabase
    .from("questions")
    .select("question_text")
    .eq("question_id", questionId)
    .single();

  if (error) throw error;
  return data?.question_text ?? null;
}

export async function storeUserQuestions(
  userId: string | undefined,
  interviewId: number,
  question: string
): Promise<number> {
  if (!userId) throw new Error("UserId not defined");

  const { data, error } = await supabase
    .from("questions")
    .insert({
      question_text: question,
      interview_id: interviewId,
      created_at: new Date().toISOString(),
      user_id: userId,
    })
    .select()
    .single();

  if (error) throw error;
  return data.question_id;
}

export async function startInterviewSession(
  userId: string,
  domainName: domainTypes
): Promise<number> {
  const domainId = await getDomainId(domainName);
  // const domainId = DomainMap[domainName]

  const { data, error } = await supabase
    .from("interviews")
    .insert({
      user_id: userId,
      domain_id: domainId,
      start_time: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) throw error;
  return data.id;
}

export async function storeUserAnswers(
  userId: string | undefined,
  interviewId: number,
  questionId: number,
  answerText: string
): Promise<void> {
  if (!userId) throw new Error("UserId not defined");

  const { error } = await supabase.from("answers").insert({
    user_id: userId,
    interview_id: interviewId,
    question_id: questionId,
    answer_text: answerText,
    timestamp: new Date().toISOString(),
  });

  if (error) throw error;
}

export async function stopInterviewSession(interviewId: number): Promise<void> {
  const { error } = await supabase
    .from("interviews")
    .update({ end_time: new Date().toISOString() })
    .eq("id", interviewId);

  if (error) throw error;
}

// export async function getUserInterviewQuestions(interviewId: number): Promise<Database['public']['Tables']['questions']['Row'][]> {
//   const { data, error } = await supabase
//     .from('questions')
//     .select('question_id, question_text')
//     .eq('interview_id', interviewId);

//   if (error) throw error;
//   return data;
// }

// export async function getUserInterviewAnswers(interviewId: number): Promise<Database['public']['Tables']['answers']['Row'][]> {
//   const { data, error } = await supabase
//     .from('answers')
//     .select('question_id, answer_text')
//     .eq('interview_id', interviewId);

//   if (error) throw error;
//   return data;
// }

export async function getUserInterviewQuesAndAns(
  userId: string | undefined,
  interviewId: number
): Promise<UserInterviewInfoType[]> {
  if (!userId) throw new Error("User not signed up");

  const { data, error } = await supabase
    .from("questions")
    .select(
      `
      question_id,
      question_text,
      answers (answer_text)
    `
    )
    .eq("interview_id", interviewId)
    .eq("user_id", userId)
    .order("question_id");

  if (error) throw error;

  return (
    data?.map((item) => ({
      question: item.question_text ?? "",
      answer:
        item.answers && item.answers.length > 0
          ? item.answers[0].answer_text ?? ""
          : "",
    })) || []
  );
}

export async function getUserAllInterviewsInfo(
  userId: string | undefined
): Promise<Database["public"]["Tables"]["interviews"]["Row"][] | null> {
  if (!userId) return null;

  const { data, error } = await supabase
    .from("interviews")
    .select("*")
    .eq("user_id", userId);

  if (error) throw error;
  return data;
}

export async function getUserInterviewReport(
  userId: string | undefined,
  interviewId: number
) {
  if (!userId) return null;
  const { data, error } = await supabase
    .from("results")
    .select("report")
    .eq("user_id", userId)
    .eq("interview_id", interviewId)
    .single();
    // console.log(data?.report);
  return data?.report;
}

export async function storeUserInterviewReport(
  userId: string | undefined,
  interviewId: number,
  report: ReportJSONFormat
): Promise<void> {
  if (!userId) throw new Error("UserId not defined");
  const { error } = await supabase.from("results").insert({
    interview_id: interviewId,
    report: report,
    created_at: new Date().toISOString(),
    user_id: userId,
  });

  if (error) throw error;
}

export async function updateInterviewReportStatus(
  userId: string | undefined,
  interviewId: number
) {
  if (!userId) throw new Error("UserId not defined");
  const { error } = await supabase
    .from("interviews")
    .update({ report_status: true })
    .eq("id", interviewId)
    .eq("user_id", userId);
  if (error) throw error;
}
