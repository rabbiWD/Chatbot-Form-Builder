# 🤖 Chatbot Form Builder

> A modern, conversational form builder platform built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **Prisma ORM**. Transform static traditional forms into engaging, interactive chatbot conversations that can be embedded on any website or shared publicly.

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5.22-2D3748?style=flat&logo=prisma)](https://www.prisma.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 🌟 Key Capabilities & Features

### 1. 🎨 Interactive Form Studio (`/dashboard/forms/[id]/edit`)
- **4 Rich Question Types**:
  - **Short Text**: Single-line text input with custom placeholder.
  - **Email Address**: Automated client-side & server-side regex validation.
  - **Multiple Choice**: Dynamic choice manager with clickable option pill buttons.
  - **Yes / No**: Quick-tap binary decision cards.
- **Reorder & Management**: Move questions up/down, delete with confirmation, and toggle `isRequired` validation.
- **Customization**: Custom bot greetings, completion thank-you messages, and theme color pickers.
- **Real-Time Live Preview**: Split-screen device simulator (desktop and mobile viewports) syncing instantly as you edit.

### 2. 💬 Conversational Chatbot Widget Engine
- **One question at a time** conversational flow.
- Authentic **animated typing indicators** simulating a real chatbot assistant.
- Real-time client-side input validation (e.g., email format check, required field check).
- Option to restart or answer again upon completion.

### 3. 🌐 Zero-Code Website Embedding & Distribution
- **Direct Public URL**: Clean standalone card page (`/f/[formId]`) with custom theme glows.
- **1-Line Floating JavaScript Widget**:
  ```html
  <script src="https://your-domain.com/widget.js" data-form-id="YOUR_FORM_ID" data-theme="#4F46E5" async></script>
  ```
  Injects a lightweight floating bubble button that expands into an isolated modal window on desktop and mobile.
- **Responsive Iframe Embed**:
  ```html
  <iframe src="https://your-domain.com/embed/YOUR_FORM_ID" width="100%" height="650" frameborder="0"></iframe>
  ```
- **Live Test Page**: Test external embedding directly at `/embed-test.html`.

### 4. 📊 Submissions & Responses Dashboard (`/dashboard/forms/[id]/submissions`)
- Chronological list of submissions with timestamps and device/metadata tracking.
- **Submission Detail Inspector**: Full question-and-answer transcripts in a modal dialog.
- **1-Click CSV Export**: Cleanly structured spreadsheet download with all question headers and respondent answers.
- **Publish / Unpublish Controls**: Instant toggle to open or close form submissions.

### 5. 🚀 High-Converting Landing Page (`/`)
- Responsive hero section with clear headline and call-to-actions.
- **Live Interactive Demo**: Test sample chatbot forms directly on the home page without logging in.
- Detailed features breakdown and 3-step "How It Works" workflow.
- Clean footer with navigation and GitHub links.

---

## 🏗️ Architecture & Folder Structure

```
├── public/
│   ├── widget.js                  # Standalone floating embed launcher script
│   └── embed-test.html            # Third-party website embed test playground
├── prisma/
│   └── schema.prisma              # Database schema (Form, Question, Submission, Answer)
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── forms/             # List & Create forms API (POST, GET)
│   │   │   ├── forms/[id]/        # Form single CRUD API (GET, PATCH, DELETE)
│   │   │   └── forms/[id]/submit/ # Validated submission ingestion (POST)
│   │   ├── dashboard/             # Main metrics and forms management
│   │   ├── dashboard/forms/[id]/edit/        # Visual Form Builder Studio
│   │   ├── dashboard/forms/[id]/submissions/ # Responses viewer & CSV export
│   │   ├── f/[id]/                # Public standalone form URL
│   │   ├── embed/[id]/            # Seamless iframe route
│   │   ├── layout.tsx
│   │   └── page.tsx               # Modern Landing Page with Live Demo
│   ├── components/
│   │   ├── builder/               # FormBuilder, QuestionEditor, LivePreviewPanel
│   │   ├── dashboard/             # FormList, MetricCards, SubmissionsTable
│   │   ├── landing/               # Hero, LiveDemo, Features, HowItWorks, Footer
│   │   ├── modals/                # CreateFormModal, EmbedShareModal, SubmissionDetailModal
│   │   └── widget/                # ChatWidgetRunner, ChatBubble, QuestionInput
│   ├── lib/
│   │   ├── data-store.ts          # Unified data layer with Prisma + persistent fallback
│   │   ├── prisma.ts              # Singleton Prisma client instance
│   │   ├── export-csv.ts          # Client-side CSV generator
│   │   └── utils.ts               # Tailwind class merger
│   └── types/
│       └── form.ts                # TypeScript interfaces and types
```

---

## ⚡ Getting Started

### 1. Prerequisites
- Node.js 18+ (tested on Node 24)
- npm or yarn

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/rabbiWD/Chatbot-Form-Builder.git
cd Chatbot-Form-Builder

# Install dependencies
npm install
```

### 3. Environment Setup (Optional)
The application includes a resilient data store with pre-seeded starter templates ("Website Lead Gen", "Customer Feedback") so it runs immediately out of the box even without setting up a database.

To connect to your PostgreSQL or Supabase database:
```env
# .env
DATABASE_URL="postgresql://postgres:[PASSWORD]@[HOST]:[PORT]/[DATABASE]"
```

Push Prisma schema to your database:
```bash
npx prisma db push
```

### 4. Running Locally
```bash
# Start development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

- **Landing Page**: [http://localhost:3000](http://localhost:3000)
- **User Dashboard**: [http://localhost:3000/dashboard](http://localhost:3000/dashboard)
- **Website Embed Test**: [http://localhost:3000/embed-test.html](http://localhost:3000/embed-test.html)

### 5. Production Build
```bash
npm run build
npm run start
```

---

## 🧪 End-to-End Verification Flow

1. Open `/dashboard` to view overall metrics and existing forms.
2. Click **Create Form** to generate a new form with custom questions and colors.
3. Open the **Studio Editor** (`/dashboard/forms/[id]/edit`) to customize questions, reorder steps, and test answers in the **Live Preview Panel**.
4. Click **Publish Form** to make the form active.
5. Click **Share & Embed** to copy the Direct Public Link (`/f/[id]`) or floating `<script>` tag.
6. Open `/embed-test.html` to see the floating chat bubble widget live on a simulated external website.
7. Fill out the conversational questions and click submit.
8. Navigate to `/dashboard/forms/[id]/submissions` to verify the submission, inspect individual answers, and click **Export to CSV**.

---

## 📄 License
This project is open-source under the [MIT License](LICENSE).
Built with passion by [rabbiWD](https://github.com/rabbiWD).
