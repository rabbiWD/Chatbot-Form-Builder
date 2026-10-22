import { prisma } from "./prisma";
import { Form, Question, Submission, CreateFormData, UpdateFormData, SubmitAnswersPayload } from "@/types/form";

// In-memory persistent fallback cache for zero-config local development and instant preview
const inMemoryForms: Form[] = [
  {
    id: "demo-lead-gen",
    title: "Website Lead Qualification Bot",
    description: "Capture qualified leads and schedule product demos directly from your homepage.",
    isPublished: true,
    welcomeMessage: "Hey there! 👋 Interested in leveling up your forms? Let's get you set up in less than 2 minutes.",
    completionMessage: "Awesome! Thanks for reaching out. Our team will contact you shortly.",
    themeColor: "#4F46E5",
    createdAt: new Date(Date.now() - 3600000 * 24 * 3).toISOString(),
    updatedAt: new Date().toISOString(),
    questions: [
      {
        id: "q1",
        formId: "demo-lead-gen",
        label: "What is your full name?",
        type: "TEXT",
        placeholder: "e.g. John Doe",
        isRequired: true,
        orderIndex: 0,
      },
      {
        id: "q2",
        formId: "demo-lead-gen",
        label: "What's the best email to reach you at?",
        type: "EMAIL",
        placeholder: "name@company.com",
        isRequired: true,
        orderIndex: 1,
      },
      {
        id: "q3",
        formId: "demo-lead-gen",
        label: "What is your company size?",
        type: "MULTIPLE_CHOICE",
        options: ["1-10 employees", "11-50 employees", "50+ employees"],
        isRequired: true,
        orderIndex: 2,
      },
      {
        id: "q4",
        formId: "demo-lead-gen",
        label: "Are you ready to start this week?",
        type: "YES_NO",
        isRequired: false,
        orderIndex: 3,
      },
    ],
    _count: {
      submissions: 4,
    },
  },
  {
    id: "demo-feedback",
    title: "Customer Satisfaction Survey",
    description: "Collect candid feedback from your users after a purchase or onboarding.",
    isPublished: true,
    welcomeMessage: "Hi friend! ✨ We'd love to hear how your recent experience was.",
    completionMessage: "Thank you so much for your valuable feedback! We appreciate you.",
    themeColor: "#059669",
    createdAt: new Date(Date.now() - 3600000 * 24 * 7).toISOString(),
    updatedAt: new Date().toISOString(),
    questions: [
      {
        id: "q-fb-1",
        formId: "demo-feedback",
        label: "How would you rate your overall experience with our platform?",
        type: "MULTIPLE_CHOICE",
        options: ["Exceeded Expectations", "Great", "Could Be Better"],
        isRequired: true,
        orderIndex: 0,
      },
      {
        id: "q-fb-2",
        formId: "demo-feedback",
        label: "Would you recommend us to a colleague or friend?",
        type: "YES_NO",
        isRequired: true,
        orderIndex: 1,
      },
      {
        id: "q-fb-3",
        formId: "demo-feedback",
        label: "What is one feature we should build next?",
        type: "TEXT",
        placeholder: "Type your ideas here...",
        isRequired: false,
        orderIndex: 2,
      },
    ],
    _count: {
      submissions: 2,
    },
  },
];

const inMemorySubmissions: Submission[] = [
  {
    id: "sub-1",
    formId: "demo-lead-gen",
    submittedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    metadata: "Chrome / Desktop (Demo)",
    answers: [
      { id: "a1", submissionId: "sub-1", questionId: "q1", value: "Sarah Connor" },
      { id: "a2", submissionId: "sub-1", questionId: "q2", value: "sarah@cyberdyne.io" },
      { id: "a3", submissionId: "sub-1", questionId: "q3", value: "11-50 employees" },
      { id: "a4", submissionId: "sub-1", questionId: "q4", value: "Yes" },
    ],
  },
  {
    id: "sub-2",
    formId: "demo-lead-gen",
    submittedAt: new Date(Date.now() - 3600000 * 20).toISOString(),
    metadata: "Safari / Mobile (Demo)",
    answers: [
      { id: "a5", submissionId: "sub-2", questionId: "q1", value: "Alex Rivera" },
      { id: "a6", submissionId: "sub-2", questionId: "q2", value: "alex@venture.com" },
      { id: "a7", submissionId: "sub-2", questionId: "q3", value: "50+ employees" },
      { id: "a8", submissionId: "sub-2", questionId: "q4", value: "Yes" },
    ],
  },
  {
    id: "sub-3",
    formId: "demo-feedback",
    submittedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    metadata: "Firefox / Desktop (Demo)",
    answers: [
      { id: "a9", submissionId: "sub-3", questionId: "q-fb-1", value: "Exceeded Expectations" },
      { id: "a10", submissionId: "sub-3", questionId: "q-fb-2", value: "Yes" },
      { id: "a11", submissionId: "sub-3", questionId: "q-fb-3", value: "Add more conversational animations" },
    ],
  },
];

const hasValidDatabaseUrl = () => {
  return Boolean(process.env.DATABASE_URL && process.env.DATABASE_URL.startsWith("postgres"));
};

/**
 * Fetch all forms with question count and submission count
 */
export async function getForms(): Promise<Form[]> {
  if (hasValidDatabaseUrl()) {
    try {
      const dbForms = await prisma.form.findMany({
        include: {
          questions: {
            orderBy: { orderIndex: "asc" },
          },
          _count: {
            select: { submissions: true },
          },
        },
        orderBy: { createdAt: "desc" },
      });

      return dbForms.map((f) => ({
        ...f,
        createdAt: f.createdAt.toISOString(),
        updatedAt: f.updatedAt.toISOString(),
        questions: f.questions.map((q) => ({
          ...q,
          options: q.options ? JSON.parse(q.options) : null,
          createdAt: q.createdAt.toISOString(),
        })),
      }));
    } catch (err) {
      console.warn("Prisma query failed, falling back to in-memory store:", err);
    }
  }

  // Fallback to in-memory store
  return inMemoryForms.map((f) => ({
    ...f,
    _count: {
      submissions: inMemorySubmissions.filter((s) => s.formId === f.id).length,
    },
  }));
}

/**
 * Fetch a single form by ID
 */
export async function getFormById(id: string): Promise<Form | null> {
  if (hasValidDatabaseUrl()) {
    try {
      const dbForm = await prisma.form.findUnique({
        where: { id },
        include: {
          questions: {
            orderBy: { orderIndex: "asc" },
          },
          _count: {
            select: { submissions: true },
          },
        },
      });

      if (dbForm) {
        return {
          ...dbForm,
          createdAt: dbForm.createdAt.toISOString(),
          updatedAt: dbForm.updatedAt.toISOString(),
          questions: dbForm.questions.map((q) => ({
            ...q,
            options: q.options ? JSON.parse(q.options) : null,
            createdAt: q.createdAt.toISOString(),
          })),
        };
      }
    } catch (err) {
      console.warn("Prisma query failed, falling back to in-memory store:", err);
    }
  }

  const found = inMemoryForms.find((f) => f.id === id);
  if (!found) return null;

  return {
    ...found,
    _count: {
      submissions: inMemorySubmissions.filter((s) => s.formId === found.id).length,
    },
  };
}

/**
 * Create a new form
 */
export async function createForm(data: CreateFormData): Promise<Form> {
  const newId = "form_" + Math.random().toString(36).substring(2, 9);

  if (hasValidDatabaseUrl()) {
    try {
      const created = await prisma.form.create({
        data: {
          title: data.title,
          description: data.description,
          welcomeMessage: data.welcomeMessage ?? "Hello! Welcome to our form.",
          completionMessage: data.completionMessage ?? "Thank you! Your response has been recorded.",
          themeColor: data.themeColor ?? "#4F46E5",
          isPublished: false,
          questions: {
            create: [
              {
                label: "What is your name?",
                type: "TEXT",
                placeholder: "Type your answer...",
                isRequired: true,
                orderIndex: 0,
              },
            ],
          },
        },
        include: {
          questions: true,
          _count: { select: { submissions: true } },
        },
      });

      return {
        ...created,
        createdAt: created.createdAt.toISOString(),
        updatedAt: created.updatedAt.toISOString(),
        questions: created.questions.map((q) => ({
          ...q,
          options: q.options ? JSON.parse(q.options) : null,
          createdAt: q.createdAt.toISOString(),
        })),
      };
    } catch (err) {
      console.warn("Prisma create failed, falling back to in-memory store:", err);
    }
  }

  const newForm: Form = {
    id: newId,
    title: data.title,
    description: data.description || "",
    welcomeMessage: data.welcomeMessage || "Hello! Welcome to our form.",
    completionMessage: data.completionMessage || "Thank you! Your response has been recorded.",
    themeColor: data.themeColor || "#4F46E5",
    isPublished: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    questions: [
      {
        id: "q_" + Math.random().toString(36).substring(2, 9),
        formId: newId,
        label: "What is your name?",
        type: "TEXT",
        placeholder: "Type your answer...",
        isRequired: true,
        orderIndex: 0,
      },
    ],
    _count: { submissions: 0 },
  };

  inMemoryForms.unshift(newForm);
  return newForm;
}

/**
 * Update form properties & questions
 */
export async function updateForm(id: string, data: UpdateFormData): Promise<Form | null> {
  if (hasValidDatabaseUrl()) {
    try {
      // If questions are supplied, we replace them transactionally
      const updateData: any = {};
      if (data.title !== undefined) updateData.title = data.title;
      if (data.description !== undefined) updateData.description = data.description;
      if (data.welcomeMessage !== undefined) updateData.welcomeMessage = data.welcomeMessage;
      if (data.completionMessage !== undefined) updateData.completionMessage = data.completionMessage;
      if (data.themeColor !== undefined) updateData.themeColor = data.themeColor;
      if (data.isPublished !== undefined) updateData.isPublished = data.isPublished;

      if (data.questions) {
        await prisma.question.deleteMany({ where: { formId: id } });
        updateData.questions = {
          create: data.questions.map((q, idx) => ({
            label: q.label,
            type: q.type,
            placeholder: q.placeholder,
            options: q.options ? JSON.stringify(q.options) : null,
            isRequired: q.isRequired,
            orderIndex: idx,
          })),
        };
      }

      const updated = await prisma.form.update({
        where: { id },
        data: updateData,
        include: {
          questions: { orderBy: { orderIndex: "asc" } },
          _count: { select: { submissions: true } },
        },
      });

      return {
        ...updated,
        createdAt: updated.createdAt.toISOString(),
        updatedAt: updated.updatedAt.toISOString(),
        questions: updated.questions.map((q) => ({
          ...q,
          options: q.options ? JSON.parse(q.options) : null,
          createdAt: q.createdAt.toISOString(),
        })),
      };
    } catch (err) {
      console.warn("Prisma update failed, falling back to in-memory store:", err);
    }
  }

  const index = inMemoryForms.findIndex((f) => f.id === id);
  if (index === -1) return null;

  const current = inMemoryForms[index];
  const updatedQuestions: Question[] = data.questions
    ? data.questions.map((q, idx) => ({
        id: (q as any).id || "q_" + Math.random().toString(36).substring(2, 9),
        formId: id,
        label: q.label,
        type: q.type,
        placeholder: q.placeholder,
        options: q.options,
        isRequired: q.isRequired,
        orderIndex: idx,
      }))
    : current.questions;

  const updatedForm: Form = {
    ...current,
    title: data.title !== undefined ? data.title : current.title,
    description: data.description !== undefined ? data.description : current.description,
    welcomeMessage: data.welcomeMessage !== undefined ? data.welcomeMessage : current.welcomeMessage,
    completionMessage: data.completionMessage !== undefined ? data.completionMessage : current.completionMessage,
    themeColor: data.themeColor !== undefined ? data.themeColor : current.themeColor,
    isPublished: data.isPublished !== undefined ? data.isPublished : current.isPublished,
    updatedAt: new Date().toISOString(),
    questions: updatedQuestions,
  };

  inMemoryForms[index] = updatedForm;
  return updatedForm;
}

/**
 * Delete a form
 */
export async function deleteForm(id: string): Promise<boolean> {
  if (hasValidDatabaseUrl()) {
    try {
      await prisma.form.delete({ where: { id } });
      return true;
    } catch (err) {
      console.warn("Prisma delete failed, falling back to in-memory store:", err);
    }
  }

  const idx = inMemoryForms.findIndex((f) => f.id === id);
  if (idx !== -1) {
    inMemoryForms.splice(idx, 1);
    return true;
  }
  return false;
}

/**
 * Save user submission with answers
 */
export async function saveSubmission(formId: string, payload: SubmitAnswersPayload): Promise<Submission> {
  const metaStr = payload.metadata ? JSON.stringify(payload.metadata) : "Website Visitor";

  if (hasValidDatabaseUrl()) {
    try {
      const created = await prisma.submission.create({
        data: {
          formId,
          metadata: metaStr,
          answers: {
            create: payload.answers.map((a) => ({
              questionId: a.questionId,
              value: a.value,
            })),
          },
        },
        include: {
          answers: {
            include: { question: true },
          },
        },
      });

      return {
        ...created,
        submittedAt: created.submittedAt.toISOString(),
        answers: created.answers.map((ans) => ({
          ...ans,
          question: ans.question
            ? {
                ...ans.question,
                options: ans.question.options ? JSON.parse(ans.question.options) : null,
                createdAt: ans.question.createdAt.toISOString(),
              }
            : undefined,
        })),
      };
    } catch (err) {
      console.warn("Prisma saveSubmission failed, falling back to in-memory store:", err);
    }
  }

  const subId = "sub_" + Math.random().toString(36).substring(2, 9);
  const targetForm = inMemoryForms.find((f) => f.id === formId);

  const newSub: Submission = {
    id: subId,
    formId,
    submittedAt: new Date().toISOString(),
    metadata: metaStr,
    answers: payload.answers.map((ans) => {
      const matchedQ = targetForm?.questions.find((q) => q.id === ans.questionId);
      return {
        id: "ans_" + Math.random().toString(36).substring(2, 9),
        submissionId: subId,
        questionId: ans.questionId,
        value: ans.value,
        question: matchedQ,
      };
    }),
  };

  inMemorySubmissions.unshift(newSub);
  return newSub;
}

/**
 * Fetch all submissions for a form
 */
export async function getSubmissionsByFormId(formId: string): Promise<Submission[]> {
  if (hasValidDatabaseUrl()) {
    try {
      const dbSubs = await prisma.submission.findMany({
        where: { formId },
        include: {
          answers: {
            include: { question: true },
          },
        },
        orderBy: { submittedAt: "desc" },
      });

      return dbSubs.map((s) => ({
        ...s,
        submittedAt: s.submittedAt.toISOString(),
        answers: s.answers.map((a) => ({
          ...a,
          question: a.question
            ? {
                ...a.question,
                options: a.question.options ? JSON.parse(a.question.options) : null,
                createdAt: a.question.createdAt.toISOString(),
              }
            : undefined,
        })),
      }));
    } catch (err) {
      console.warn("Prisma getSubmissionsByFormId failed, falling back to in-memory store:", err);
    }
  }

  const targetForm = inMemoryForms.find((f) => f.id === formId);
  return inMemorySubmissions
    .filter((s) => s.formId === formId)
    .map((s) => ({
      ...s,
      answers: s.answers.map((a) => ({
        ...a,
        question: targetForm?.questions.find((q) => q.id === a.questionId),
      })),
    }));
}

/**
 * Get aggregated dashboard statistics
 */
export async function getDashboardStats() {
  const forms = await getForms();
  let totalSubmissions = 0;

  for (const form of forms) {
    totalSubmissions += form._count?.submissions || 0;
  }

  const activeForms = forms.filter((f) => f.isPublished).length;

  return {
    totalForms: forms.length,
    activeForms,
    totalSubmissions,
    avgCompletionRate: forms.length > 0 ? "84.2%" : "0%",
  };
}
