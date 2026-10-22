export type QuestionType = "TEXT" | "EMAIL" | "MULTIPLE_CHOICE" | "YES_NO";

export interface Question {
  id: string;
  formId: string;
  label: string;
  type: QuestionType;
  placeholder?: string | null;
  options?: string[] | null; // Stored as parsed array for convenient frontend use
  isRequired: boolean;
  orderIndex: number;
  createdAt?: string;
}

export interface Form {
  id: string;
  title: string;
  description?: string | null;
  isPublished: boolean;
  welcomeMessage: string;
  completionMessage: string;
  themeColor: string;
  createdAt: string;
  updatedAt: string;
  questions: Question[];
  _count?: {
    submissions: number;
  };
}

export interface Answer {
  id: string;
  submissionId: string;
  questionId: string;
  value: string;
  question?: Question;
}

export interface Submission {
  id: string;
  formId: string;
  submittedAt: string;
  metadata?: string | null;
  answers: Answer[];
}

export interface CreateFormData {
  title: string;
  description?: string;
  welcomeMessage?: string;
  completionMessage?: string;
  themeColor?: string;
}

export interface UpdateFormData {
  title?: string;
  description?: string;
  welcomeMessage?: string;
  completionMessage?: string;
  themeColor?: string;
  isPublished?: boolean;
  questions?: Omit<Question, "id" | "formId">[];
}

export interface SubmitAnswersPayload {
  answers: {
    questionId: string;
    value: string;
  }[];
  metadata?: Record<string, any>;
}
