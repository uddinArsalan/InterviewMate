export type AvailableModelsTypes = "Conan" | "Jamie" | "Casey" | "Pluto";

export type domainTypes =
  | "Frontend Web Development"
  | "Backend Web Development"
  | "Mobile App Development"
  | "Data Science"
  | "Machine Learning Engineering"
  | "DevOps"
  | "Cloud Computing"
  | "Cybersecurity"
  | "UI/UX Design"
  | "Blockchain Development"
  | "Full Stack Development"
  | "Quality Assurance";

export interface CharactersType {
  id: number;
  name: AvailableModelsTypes;
  url: string;
  voice: string;
}

export interface stepsType {
  isInterviewStarted: boolean;
  isCharacterSelected: boolean;
  isDomainSelected: boolean;
}

export interface QuestionsDataType {
  question_id: string;
  question_text: string;
}
export interface AnswersDataType {
  question_id: string;
  answer_text: string;
}

export interface UserInterviewsDataType {
  domain_id: number | null;
  end_time: string | null;
  id: number;
  start_time: string | null;
  user_id: string | null;
}
