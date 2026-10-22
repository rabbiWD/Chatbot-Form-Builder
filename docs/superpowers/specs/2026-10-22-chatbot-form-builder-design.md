# Chatbot Form Builder — System Design Specification

- **Date:** 2026-10-22
- **Topic:** Interactive Chatbot Form Builder, Widget Embed, & Response Management
- **Status:** Approved
- **Repository:** `chatbot-form-builder`

---

## 1. Executive Summary & Goals

The Chatbot Form Builder is a modern, responsive web application enabling users to:
1. Design multi-step conversational forms through an intuitive visual builder.
2. Preview changes in real-time.
3. Publish forms to unique shareable URLs and embed them onto external websites via a lightweight script or iframe widget.
4. Collect submissions conversationally (one question at a time) with validation.
5. Manage forms, track submissions, and analyze responses through an interactive user dashboard.
6. Present a polished, high-converting landing page with a live interactive chatbot demo.

---

## 2. Technology Stack & Architecture

- **Framework:** Next.js 14/15 (App Router, Server Actions, Route Handlers)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, PostCSS, Lucide React (Icons)
- **Database / ORM:** Prisma ORM with PostgreSQL / Supabase connection (with SQLite fallback for zero-setup local dev if database credentials are not immediately provided)
- **State & UI Interaction:** React Server Components (RSC) + Client Components with optimistic state updates for drag/reorder and live preview.
- **Embed Engine:** Standalone JavaScript embedder bundle (`/public/widget.js`) + responsive widget iframe renderer (`/embed/[formId]`).

---

## 3. Data Model & Database Schema

```prisma
datasource db {
  provider = "postgresql" // or "sqlite" for portable local dev
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Form {
  id                String       @id @default(cuid())
  title             String
  description       String?
  isPublished       Boolean      @default(false)
  welcomeMessage    String       @default("Hello! Welcome to our form.")
  completionMessage String       @default("Thank you! Your response has been recorded.")
  themeColor        String       @default("#4F46E5") // Indigo default
  createdAt         DateTime     @default(now())
  updatedAt         DateTime     @updatedAt

  questions         Question[]
  submissions       Submission[]
}

enum QuestionType {
  TEXT
  EMAIL
  MULTIPLE_CHOICE
  YES_NO
}

model Question {
  id          String       @id @default(cuid())
  formId      String
  form        Form         @relation(fields: [formId], references: [id], onDelete: Cascade)
  label       String
  type        QuestionType @default(TEXT)
  placeholder String?
  options     String?      // Stored as JSON string or comma-separated for MULTIPLE_CHOICE
  isRequired  Boolean      @default(true)
  orderIndex  Int          @default(0)
  createdAt   DateTime     @default(now())

  answers     Answer[]
}

model Submission {
  id          String   @id @default(cuid())
  formId      String
  form        Form     @relation(fields: [formId], references: [id], onDelete: Cascade)
  submittedAt DateTime @default(now())
  metadata    String?  // User agent, referrer, etc.

  answers     Answer[]
}

model Answer {
  id           String     @id @default(cuid())
  submissionId String
  submission   Submission @relation(fields: [submissionId], references: [id], onDelete: Cascade)
  questionId   String
  question     Question   @relation(fields: [questionId], references: [id], onDelete: Cascade)
  value        String
}
```

---

## 4. Subsystems Breakdown

### 4.1 Landing Page (`/`)
- **Hero Section:** Clear headline, high-impact subtitle, primary CTA ("Create a Free Form"), and secondary CTA ("View Live Demo").
- **Live Chatbot Demo:** Embedded interactive chatbot directly on the landing page for immediate hands-on experience without signing in.
- **Features Grid:** Visual Form Studio, Conversational Experience, 1-Click Embed Snippet, Real-Time Response Analytics.
- **How It Works:** 3-step visual workflow (Design Questions -> Grab Embed Snippet -> Collect Responses).
- **Footer:** Navigation, social/contact links, copyright.

### 4.2 User Dashboard (`/dashboard`)
- **Metric Cards:** Total Forms, Total Submissions, Active/Published Forms, Completion Rate.
- **Form Management Table / Grid:**
  - Form Title, Created Date, Status Badge (Published / Draft).
  - Total Submissions counter.
  - Action Dropdown: Edit, Preview, Toggle Publish/Unpublish, Share & Embed Modal, Delete.
- **Quick Create Form Modal / Button.**

### 4.3 Form Builder (`/dashboard/forms/[id]/edit`)
- **Editor Panel (Left):**
  - Form General Settings: Title, Description, Theme Color Picker, Welcome Message, Thank You Message.
  - Question List:
    - Add Question button with type picker: Text, Email, Multiple Choice, Yes/No.
    - Edit Question label, placeholder, required toggle.
    - Options manager for Multiple Choice (add/delete choices).
    - Reorder questions (Move Up / Down buttons).
    - Delete question.
- **Live Preview Panel (Right):**
  - Interactive device preview simulating the real chatbot experience in real-time.
  - Test responding to questions directly within the builder.
- **Header Actions:**
  - Save Changes button.
  - Publish / Unpublish Toggle.
  - Share / Embed Code modal trigger.

### 4.4 Chatbot Widget Engine
- **Conversational Runtime:**
  - Step-by-step chat flow: Welcome Message -> Question 1 -> Question 2 -> ... -> Completion Message.
  - Typing indicator simulation for natural conversational feel.
  - Input controls tailored to question type:
    - `TEXT`: Input field with Send icon and Enter shortcut.
    - `EMAIL`: Email input with email regex validation before proceeding.
    - `MULTIPLE_CHOICE`: Clickable badge buttons + optional custom text.
    - `YES_NO`: Quick "Yes" / "No" decision buttons.
  - Back / Edit previous answer option.
  - Submission payload sent to `/api/forms/[id]/submit`.

### 4.5 Share & Embed Distribution
- **Standalone Public URL:** `/f/[id]` — clean, full-screen or centered conversational card for direct sharing on social media or emails.
- **Embed Modal in Dashboard:**
  - Direct Link: `https://yourdomain.com/f/[id]`
  - Iframe Embed: `<iframe src="https://yourdomain.com/embed/[id]" width="100%" height="600" frameborder="0"></iframe>`
  - Floating Widget Snippet:
    ```html
    <script src="https://yourdomain.com/widget.js" data-form-id="[id]" data-theme="[color]" async></script>
    ```
- **External Widget Script (`/public/widget.js`):**
  - Injects a floating bubble button at the bottom-right of host website.
  - Opens a clean responsive modal/iframe overlay when clicked.
  - Supports mobile full-screen and desktop card popup.

### 4.6 Submissions & Analytics (`/dashboard/forms/[id]/submissions`)
- Table view of all submissions ordered by timestamp (descending).
- Detailed submission modal showing all question-answer pairs for that session.
- Export to CSV functionality.
- Form status management (Publish / Unpublish toggle).

---

## 5. Security, Validation & Error Handling

- **Input Validation:**
  - Required field validation prevents users from skipping mandatory questions.
  - Email format validation using standard regex.
  - Server-side validation on `/api/forms/[id]/submit` ensuring answers match published form schema.
- **State Handling:**
  - Unsaved changes indicator in Form Builder.
  - Toast notifications for actions (Save, Publish, Copy Embed Code, Delete).
  - Graceful handling when a form is unpublished (displays "This form is currently not accepting responses").

---

## 6. Implementation Deliverables

1. Complete Next.js application codebase with clean folder architecture.
2. Fully responsive Landing Page, Dashboard, Form Builder, Chatbot Runtime, and Submissions view.
3. Standalone embed test file (`embed-test.html`) verifying third-party website embed functionality.
4. Comprehensive `README.md` with step-by-step setup, database configuration, and deployment guidelines.
