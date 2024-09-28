import { domainTypes,UserInterviewsDataType } from "@/interfaces";
import { createBrowserClient } from "@supabase/ssr";
import { QueryData } from "@supabase/supabase-js";
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
import { formatDate } from "@/utils";
import {Database} from "../../interfaces/supabase"

const supabase = createBrowserClient<Database>(SUPABASE_URL, SUPABASE_KEY);

export async function getCurrentUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) throw error;
  if (!user) return { user: null, userId: undefined };
  // const { data: userId, error: userIdError } = await supabase.rpc(
  //   "uuid_to_bigint",
  //   { uuid: user.id }
  // );
  // if (userIdError) throw userIdError;
  // await supabase.rpc("set_app_user_id", { p_user_id: userId });
  return { user, userId : user.id };
}

export async function getExistingUser(userId: string) {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .limit(1)
      .single();

    if (error && error.code !== "PGRST116") throw error;
    return data || null;
  } catch (error) {
    console.error("Error in getExistingUser:", error);
    throw error;
  }
}

export async function getDomainId(domainName: domainTypes): Promise<number> {
  try {
    const { data, error } = await supabase
      .from("domains")
      .select("domain_id")
      .eq("domain_name", domainName)
      .single();

    if (error) throw error;

    return data.domain_id as number;
  } catch (err) {
    throw err;
  }
}

export async function getUserQuestions(questionId: number) {
  try {
    const { data: questions, error } = await supabase
      .from("questions")
      .select("*")
      .eq("question_id", questionId);

    if (error) {
      console.error("Supabase error:", error);
      throw error;
    }

    if (!questions || questions.length === 0) {
      console.log("No questions found for the given domain");
      return null;
    }

    return questions[0].question_text;
  } catch (error) {
    console.error("Error getting user questions data:", error);
    throw error;
  }
}

export async function storeUserQuestions(
  userId: string | undefined,
  interviewId: number,
  question: string
): Promise<number> {
  try {
    if (!userId) {
      console.log("UserId not defined");
    }
    const { data, error } = await supabase
      .from("questions")
      .insert([
        {
          question_text: question,
          interview_id: interviewId,
          created_at: formatDate(new Date()),
          user_id: userId,
        },
      ])
      .select()
      .single();
    if (error) throw error;
    return data.question_id;
  } catch (error) {
    console.error("Error inserting user data:", error);
    throw error;
  }
}

export async function startInterviewSession(
  userId: string,
  domainName: domainTypes
): Promise<number> {
  try {
    const domainId = await getDomainId(domainName);

    const insertData = {
      user_id: userId,
      domain_id: domainId,
      start_time: formatDate(new Date()),
      end_time : null
    };

    const { data, error: interviewError } = await supabase
      .from("interviews")
      .insert([insertData])
      .select()
      .single();

    if (interviewError) throw interviewError;

    return data?.id;
  } catch (err) {
    console.error("Error inserting user data:", err);
    throw err;
  }
}

export async function storeUserAnswers(
  interviewId: number,
  questionId: number,
  asnswerText: string
) {
  try {
    const { data, error } = await supabase.from("answers").insert([
      {
        interview_id: interviewId,
        question_id: questionId,
        answer_text: asnswerText,
        timestamp: formatDate(new Date()),
      },
    ]);
    if (error) throw error;

    console.log("User Answers Inserted successfully ", data);
  } catch (error) {
    console.error("Error inserting user data:", error);
    throw error;
  }
}

export async function stopInterviewSession(interviewId: number) {
  try {
    const { data, error } = await supabase
      .from("interviews")
      .update({ end_time: formatDate(new Date()) })
      .eq("id", interviewId);
    console.log("Interview Session Completed ", data);
    if (error) throw error;
  } catch (error) {
    console.log("Error updating end time", error);
  }
}

export async function getUserInterviewQuestions(interviewId: number) {
  const { data: userQuestions, error } = await supabase
    .from("questions")
    .select("question_id, question_text")
    .eq("interview_id", interviewId);
  if (error) throw error;
  return userQuestions;
}

export async function getUserInterviewAnswers(interviewId: number) {
  const { data: userAnswers, error: answersError } = await supabase
    .from("answers")
    .select("question_id, answer_text")
    .eq("interview_id", interviewId);
  if (answersError) throw answersError;
  return userAnswers;
}

export async function getUserInterviewQuesAndAns(interviewId: number) {
  const { data, error } = await supabase
    .from("questions")
    .select(`question_text, answers (answer_text)`)
    .eq("interview_id", interviewId);
  if (error) throw error;
  console.log("Error ", error, "Data", data);
  return (
    data?.map((item) => ({
      question: item.question_text,
      answer: item.answers[0]?.answer_text || "",
    })) || []
  );
}

export const getUserAllInterviewsInfo = async (userId : string | undefined) =>{
  if(!userId) return null;
  const interviewsDataQuery = supabase
  .from('interviews')
  .select("*")
  .eq('user_id', userId);
  type UserInterviewsType = QueryData<typeof interviewsDataQuery>
  let { data, error } = await interviewsDataQuery;
  if(error) throw error
  const interviews : UserInterviewsType | null = data
  return interviews
}
