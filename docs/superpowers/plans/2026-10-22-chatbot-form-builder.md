# Chatbot Form Builder Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete, responsive Next.js web application enabling users to create interactive conversational forms, embed a floating chatbot widget on any website, collect validated submissions, and manage responses via a sleek dashboard.

**Architecture:** Next.js App Router with TypeScript and Tailwind CSS. Prisma ORM with PostgreSQL / Supabase (with portable local dev fallback). Visual form studio with real-time live preview, conversational step-by-step chat runtime, standalone public share route (`/f/[id]`), embed iframe route (`/embed/[id]`), standalone external launcher script (`/public/widget.js`), and response analytics with CSV export.

**Tech Stack:** Next.js 14/15, React 18/19, TypeScript, Tailwind CSS, Lucide React, Prisma ORM.

**Spec:** `docs/superpowers/specs/2026-10-22-chatbot-form-builder-design.md`

## Global Constraints
- Target Framework: Next.js App Router (`src/app`) with TypeScript.
- UI Styling: Tailwind CSS, responsive on mobile and desktop, modern sleek design.
- Database: Prisma ORM with models `Form`, `Question`, `Submission`, `Answer`.
- Version Control: Commit after completing each individual phase/task and push to `origin main`.
- Verification: End-to-end user flow must be completely functional: Create Form -> Publish -> Embed -> Submit -> View in Dashboard.

---

### Phase 1: Project Scaffolding & Foundation Architecture

#### Task 1: Initialize Next.js Project with Tailwind CSS & Core Utilities
**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.js`, `tailwind.config.ts`, `postcss.config.js`
- Create: `src/app/layout.tsx`, `src/app/globals.css`, `src/lib/utils.ts`

**Interfaces:**
- Consumes: Node.js / npm environment
- Produces: Base running Next.js application, responsive layout container, and `cn()` class utility.

- [ ] **Step 1: Scaffold Next.js project with TypeScript, Tailwind CSS, and App Router**
- [ ] **Step 2: Install dependencies (`lucide-react`, `clsx`, `tailwind-merge`, `@prisma/client`, `prisma`)**
- [ ] **Step 3: Setup `src/lib/utils.ts` with class merging helper**
- [ ] **Step 4: Configure `src/app/globals.css` with sleek color tokens and typography**
- [ ] **Step 5: Verify dev server builds cleanly (`npm run build` or `npm run dev`)**
- [ ] **Step 6: Commit and push**
```bash
git add .
git commit -m "chore: initialize Next.js project with Tailwind and core dependencies"
git push origin main
```

---

### Phase 2: Database Schema & Data Access Layer

#### Task 2: Configure Prisma ORM and Data Repository Layer
**Files:**
- Create: `prisma/schema.prisma`
- Create: `src/lib/prisma.ts`
- Create: `src/lib/data-store.ts` (Robust Prisma operations + in-memory/seed demo fallback to guarantee zero-crash execution)
- Create: `src/types/form.ts`

**Interfaces:**
- Consumes: `Form`, `Question`, `Submission`, `Answer` data types
- Produces: Type-safe CRUD methods (`getForms`, `getFormById`, `createForm`, `updateForm`, `deleteForm`, `saveSubmission`, `getSubmissionsByFormId`)

- [ ] **Step 1: Define Prisma Schema with models `Form`, `Question`, `Submission`, `Answer`**
- [ ] **Step 2: Generate Prisma Client (`npx prisma generate`)**
- [ ] **Step 3: Create singleton Prisma client in `src/lib/prisma.ts`**
- [ ] **Step 4: Create type definitions in `src/types/form.ts` and CRUD operations in `src/lib/data-store.ts`**
- [ ] **Step 5: Seed default starter template forms (e.g., "Customer Feedback", "Lead Generation")**
- [ ] **Step 6: Verify data operations with a test script or node execution**
- [ ] **Step 7: Commit and push**
```bash
git add prisma src/lib src/types
git commit -m "feat(db): setup Prisma schema and core data access layer"
git push origin main
```

---

### Phase 3: Interactive Form Builder Studio

#### Task 3: Implement Visual Form Builder Studio with Real-Time Preview
**Files:**
- Create: `src/app/dashboard/forms/[id]/edit/page.tsx`
- Create: `src/components/builder/FormBuilder.tsx`
- Create: `src/components/builder/QuestionEditor.tsx`
- Create: `src/components/builder/GeneralSettings.tsx`
- Create: `src/components/builder/LivePreviewPanel.tsx`
- Create: `src/app/api/forms/[id]/route.ts`

**Interfaces:**
- Consumes: `Form` with `Question[]` from data layer
- Produces: Full visual form studio allowing add, edit, reorder, delete questions, customize bot messages & theme, with live preview.

- [ ] **Step 1: Build `QuestionEditor` supporting TEXT, EMAIL, MULTIPLE_CHOICE, YES_NO with dynamic options**
- [ ] **Step 2: Build `GeneralSettings` for Title, Welcome Message, Completion Message, and Theme Color**
- [ ] **Step 3: Build `LivePreviewPanel` displaying instant real-time conversational chat preview**
- [ ] **Step 4: Wire up `FormBuilder` state management (optimistic reordering up/down, add, delete, save, publish toggle)**
- [ ] **Step 5: Create API Route `PATCH /api/forms/[id]` to persist form edits and publish state**
- [ ] **Step 6: Test builder interface: add questions of all 4 types, edit options, reorder, and save**
- [ ] **Step 7: Commit and push**
```bash
git add src/app/dashboard/forms/[id]/edit src/components/builder src/app/api/forms/[id]
git commit -m "feat(builder): implement visual form builder with live preview"
git push origin main
```

---

### Phase 4: Conversational Chatbot Widget Runtime Engine

#### Task 4: Build Conversational Chat Runner with Validation
**Files:**
- Create: `src/components/widget/ChatWidgetRunner.tsx`
- Create: `src/components/widget/ChatBubble.tsx`
- Create: `src/components/widget/QuestionInput.tsx`

**Interfaces:**
- Consumes: Form configuration (`welcomeMessage`, `completionMessage`, `themeColor`, `questions[]`)
- Produces: Interactive step-by-step chat experience with typing indicator, answer validation, and submission callback.

- [ ] **Step 1: Build `ChatBubble` component with user/bot avatars and message bubbles**
- [ ] **Step 2: Build `QuestionInput` supporting text input, email with regex validation, multiple-choice pill buttons, and yes/no cards**
- [ ] **Step 3: Implement `ChatWidgetRunner` logic: one question at a time, simulated typing delay, progress indicator, and answer review**
- [ ] **Step 4: Implement completion screen with custom thank-you message**
- [ ] **Step 5: Test all question types and validation behaviors**
- [ ] **Step 6: Commit and push**
```bash
git add src/components/widget
git commit -m "feat(widget): implement conversational chatbot runtime with question validation"
git push origin main
```

---

### Phase 5: Public URLs, Website Embedding & Standalone Test Page

#### Task 5: Build Public Form Route, Iframe Route, and External Widget Embed Script
**Files:**
- Create: `src/app/f/[id]/page.tsx`
- Create: `src/app/embed/[id]/page.tsx`
- Create: `public/widget.js`
- Create: `public/embed-test.html`
- Create: `src/components/modals/EmbedShareModal.tsx`

**Interfaces:**
- Consumes: Published form ID
- Produces: Standalone public URL (`/f/[id]`), embeddable iframe (`/embed/[id]`), portable floating widget script (`widget.js`), and test playground.

- [ ] **Step 1: Create `/f/[id]` standalone public page with sleek centered conversational card**
- [ ] **Step 2: Create `/embed/[id]` responsive embeddable view tailored for iframe integration**
- [ ] **Step 3: Build `public/widget.js` script injecting floating chat launcher bubble and responsive modal/iframe overlay**
- [ ] **Step 4: Create `public/embed-test.html` simulating an external third-party company website loading the widget**
- [ ] **Step 5: Create `EmbedShareModal` in dashboard displaying Direct Link, Iframe Snippet, and Script Tag with copy-to-clipboard**
- [ ] **Step 6: Test opening `embed-test.html` to verify the widget opens, chats, and submits**
- [ ] **Step 7: Commit and push**
```bash
git add src/app/f src/app/embed public/widget.js public/embed-test.html src/components/modals
git commit -m "feat(embed): add public form URLs, iframe route, floating embed script and test page"
git push origin main
```

---

### Phase 6: Response Collection & Submissions Dashboard

#### Task 6: Implement Response Ingestion Endpoint and Submissions Viewer
**Files:**
- Create: `src/app/api/forms/[id]/submit/route.ts`
- Create: `src/app/dashboard/forms/[id]/submissions/page.tsx`
- Create: `src/components/dashboard/SubmissionsTable.tsx`
- Create: `src/components/dashboard/SubmissionDetailModal.tsx`
- Create: `src/lib/export-csv.ts`

**Interfaces:**
- Consumes: User answers payload `{ answers: { questionId: string, value: string }[] }`
- Produces: Database submission record, responses view with individual answer cards, timestamps, and CSV export.

- [ ] **Step 1: Build `POST /api/forms/[id]/submit` validating inputs and saving Submission & Answers**
- [ ] **Step 2: Build `SubmissionsTable` showing submission timestamp, preview of answers, and detail view action**
- [ ] **Step 3: Build `SubmissionDetailModal` showing full transcript of questions and submitted answers**
- [ ] **Step 4: Implement `export-csv.ts` allowing one-click download of all form submissions as a `.csv` file**
- [ ] **Step 5: Verify submitting from chatbot correctly records in database and appears in dashboard table**
- [ ] **Step 6: Commit and push**
```bash
git add src/app/api/forms/[id]/submit src/app/dashboard/forms/[id]/submissions src/components/dashboard src/lib/export-csv.ts
git commit -m "feat(responses): implement submission ingestion, responses viewer and CSV export"
git push origin main
```

---

### Phase 7: User Dashboard & Form Management

#### Task 7: Build User Dashboard Overview and Management System
**Files:**
- Create: `src/app/dashboard/page.tsx`
- Create: `src/components/dashboard/DashboardHeader.tsx`
- Create: `src/components/dashboard/MetricCards.tsx`
- Create: `src/components/dashboard/FormList.tsx`
- Create: `src/components/modals/CreateFormModal.tsx`
- Create: `src/app/api/forms/route.ts`

**Interfaces:**
- Consumes: All user forms and submissions
- Produces: Dashboard showing aggregate statistics (Total Forms, Responses, Active Forms), Form List with quick actions (Edit, Publish/Unpublish, Delete, Share), and New Form creation.

- [ ] **Step 1: Build `MetricCards` calculating Total Forms, Total Submissions, Active Forms, and Average Responses**
- [ ] **Step 2: Build `FormList` displaying forms with status badges, response counts, created dates, and action controls**
- [ ] **Step 3: Build `CreateFormModal` with quick start options (Blank Form or Pre-built Template)**
- [ ] **Step 4: Create API Route `POST /api/forms` and `DELETE /api/forms/[id]`**
- [ ] **Step 5: Test creating a new form, toggling publish state, and deleting a form**
- [ ] **Step 6: Commit and push**
```bash
git add src/app/dashboard src/components/dashboard src/components/modals src/app/api/forms
git commit -m "feat(dashboard): implement metrics overview and form management dashboard"
git push origin main
```

---

### Phase 8: Modern Landing Page with Live Interactive Demo

#### Task 8: Build High-Converting Landing Page with Live Demo
**Files:**
- Create: `src/app/page.tsx`
- Create: `src/components/landing/Navbar.tsx`
- Create: `src/components/landing/HeroSection.tsx`
- Create: `src/components/landing/LiveDemoSection.tsx`
- Create: `src/components/landing/FeaturesSection.tsx`
- Create: `src/components/landing/HowItWorksSection.tsx`
- Create: `src/components/landing/Footer.tsx`

**Interfaces:**
- Consumes: Interactive demo form data
- Produces: Modern responsive landing page showcasing product capabilities with live interactive chatbot experience.

- [ ] **Step 1: Build `Navbar` with brand logo, feature links, and "Go to Dashboard" CTA**
- [ ] **Step 2: Build `HeroSection` with headline, description, primary CTA ("Create a Form"), and secondary CTA ("Try Demo")**
- [ ] **Step 3: Build `LiveDemoSection` featuring an embedded interactive chatbot visitors can test immediately**
- [ ] **Step 4: Build `FeaturesSection` highlighting Visual Builder, Conversational UX, 1-Click Embed, and Analytics**
- [ ] **Step 5: Build `HowItWorksSection` illustrating the 3-step flow (1. Build, 2. Embed, 3. Collect)**
- [ ] **Step 6: Build `Footer` with navigation, social links, and copyright**
- [ ] **Step 7: Test landing page responsiveness across desktop and mobile screens**
- [ ] **Step 8: Commit and push**
```bash
git add src/app/page.tsx src/components/landing
git commit -m "feat(landing): build responsive landing page with live interactive chatbot demo"
git push origin main
```

---

### Phase 9: End-to-End Verification & Documentation

#### Task 9: Complete Full E2E Verification and Final Documentation
**Files:**
- Modify: `README.md`
- Test: Full user journey verification

- [ ] **Step 1: Test end-to-end journey:**
  1. Open Dashboard (`/dashboard`)
  2. Create a new form with text, email, multiple-choice, and yes/no questions
  3. Customize theme color and welcome message in Form Builder
  4. Preview interaction in the live preview panel
  5. Publish the form
  6. Open public share URL (`/f/[id]`) and complete submission
  7. Open `embed-test.html` to verify external website floating widget embed
  8. Return to dashboard, open submissions page, verify answers and export CSV
- [ ] **Step 2: Finalize `README.md` with complete setup instructions, screenshots guide, and architecture details**
- [ ] **Step 3: Final commit and push to GitHub**
```bash
git add README.md
git commit -m "docs: finalize setup guide, project architecture, and deployment instructions"
git push origin main
```
