import { domainTypes } from "@/interfaces";
import { createBrowserClient } from "@supabase/ssr";
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
import { formatDate } from "@/utils";

const supabase = createBrowserClient(SUPABASE_URL, SUPABASE_KEY);

export async function getCurrentUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) throw error;
  if (!user) return { user: null, userId: undefined };
  const { data: userId, error: userIdError } = await supabase.rpc(
    "uuid_to_bigint",
    { uuid: user.id }
  );
  if (userIdError) throw userIdError;
  await supabase.rpc("set_app_user_id", { p_user_id: userId });
  return { user, userId };
}

export async function getExistingUser(userId: number) {
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
  // finally {
  //   await supabase.rpc("clear_app_user_id");
  // }
}

export async function storeUserQuestions(
  userId: number | undefined,
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
  // finally {
  //   await supabase.rpc("clear_app_user_id");
  // }
}

export async function startInterviewSession(
  userId: number | undefined,
  domainName: domainTypes
): Promise<number> {
  try {
    if (!userId) {
      console.log("UserId not defined");
    }
    const domainId = await getDomainId(domainName);

    const insertData = {
      domain_id: domainId,
      user_id: userId,
      start_time: formatDate(new Date()),
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
    if(answersError) throw answersError;
    return userAnswers;
}
