// import { createClient} from "@supabase/supabase-js";
import { domainTypes } from "@/interfaces";
import { createBrowserClient } from "@supabase/ssr";
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
import { formatDate } from "@/utils";
import { User } from "@supabase/supabase-js";

const supabase = createBrowserClient(SUPABASE_URL, SUPABASE_KEY);

export async function getCurrentUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) throw error;
  return user;
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

    // console.log(
    //   "Retrieved domain ID for domain name:",
    //   domainName,
    //   ":",
    //   data.domain_id
    // );

    return data.domain_id as number;
  } catch (err) {
    // console.error(
    //   "Error retrieving domain ID for domain name:",
    //   domainName,
    //   ":",
    //   err
    // );
    throw err;
  }
}

export async function getUserQuestions(user: User, questionId: number) {
  try {
    if (!user) {
      console.log("No current user found");
      return null;
    }

    const { data: userId, error: userIdError } = await supabase.rpc(
      "uuid_to_bigint",
      { uuid: user.id }
    );

    if (userIdError) {
      // console.error("Error converting UUID to bigint:", userIdError);
      throw userIdError;
    }

    // console.log("user_id:", userId, "questionId:", questionId);

    await supabase.rpc("set_app_user_id", { p_user_id: userId });

    const { data: questions, error } = await supabase
      .from("questions")
      .select("*")
      .eq("question_id", questionId);

    // console.log("Supabase response status:", status, statusText);
    // console.log("Raw response data:", questions);

    if (error) {
      console.error("Supabase error:", error);
      throw error;
    }

    if (!questions || questions.length === 0) {
      console.log("No questions found for the given domain");
      return null;
    }

    // console.log("Fetched question:", questions[0]);
    return questions[0].question_text;
  } catch (error) {
    console.error("Error getting user questions data:", error);
    throw error;
  } finally {
    await supabase.rpc("clear_app_user_id");
  }
}

export async function storeUserQuestions(
  user: User,
  interviewId: number,
  question: string
): Promise<number> {
  try {
    const { data: userId, error: userIdError } = await supabase.rpc(
      "uuid_to_bigint",
      { uuid: user.id }
    );
    if (userIdError) throw userIdError;

    await supabase.rpc("set_app_user_id", { p_user_id: userId });

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
  } finally {
    await supabase.rpc("clear_app_user_id");
  }
}

export async function startInterviewSession(
  user: User,
  domainName: domainTypes
): Promise<number> {
  try {
    // console.log(
    //   "Starting interview session for user:",
    //   user.id,
    //   "in domain:",
    //   domainName
    // );

    const domainId = await getDomainId(domainName);
    // console.log("Retrieved domain ID:", domainId);

    const { data: userId, error: userIdError } = await supabase.rpc(
      "uuid_to_bigint",
      { uuid: user.id }
    );

    if (userIdError) throw userIdError;
    if (!userId || isNaN(userId)) {
      throw new Error(`Invalid userId returned by uuid_to_bigint: ${userId}`);
    }
    // console.log("Converted user ID to bigint:", userId);

    await supabase.rpc("set_app_user_id", { p_user_id: userId });
    // console.log("Set application user ID:", userId);

    const insertData = {
      domain_id: domainId,
      user_id: userId,
      start_time: formatDate(new Date()),
    };
    // console.log("Prepared insert data:", insertData);

    const { data, error: interviewError } = await supabase
      .from("interviews")
      .insert([insertData])
      .select()
      .single();

    if (interviewError) throw interviewError;

    // console.log("Inserted interview record:", data);

    return data?.id;
  } catch (err) {
    console.error("Error inserting user data:", err);
    throw err;
  } finally {
    await supabase.rpc("clear_app_user_id");
    // console.log("Cleared application user ID");
  }
}

export async function storeUserAnswers(
  user: User,
  interviewId: number,
  questionId: number,
  asnswerText: string
) {
  try {
    const { data: userId, error: userIdError } = await supabase.rpc(
      "uuid_to_bigint",
      { uuid: user.id }
    );
    if (userIdError) throw userIdError;

    await supabase.rpc("set_app_user_id", { p_user_id: userId });

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
  } finally {
    await supabase.rpc("clear_app_user_id");
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
