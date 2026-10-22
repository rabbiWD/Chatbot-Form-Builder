# Chatbot Form Builder 🤖📝

> A modern, conversational form builder platform where users can design interactive multi-step forms, preview them live, embed a floating chatbot widget on any website, and collect and manage responses in real-time through an intuitive dashboard.

---

## 🌟 Key Features

- **🎨 Visual Form Builder Studio**
  - Add & customize questions: Short Text, Email, Multiple Choice, and Yes/No buttons.
  - Reorder, edit, and toggle required validation on the fly.
  - Customize bot welcome text, thank you message, and theme colors.
  - Live interactive preview simulating the chat interface on desktop and mobile.

- **💬 Conversational Chatbot Widget**
  - One question at a time conversational UX.
  - Real-time client-side validation (e.g. Email format check).
  - Quick option chips for Multiple Choice and Yes/No questions.
  - Typing indicator and smooth message transitions.

- **🌐 Zero-Code Website Embedding & Sharing**
  - **Direct Public URL**: Shareable link (`/f/[formId]`) for standalone full-page forms.
  - **Floating Widget Script**: Single lightweight `<script>` tag to inject a floating chat bubble launcher on any website.
  - **Responsive Iframe**: Embed anywhere in blogs or CMS pages.

- **📊 Response Management & Dashboard**
  - Overview metrics: Total forms created, responses collected, and active forms.
  - Detailed submission inspector with timestamps and individual user answers.
  - Instant publish / unpublish toggle for forms.
  - Export responses to CSV.

- **🚀 Modern Landing Page**
  - High-converting hero section with direct call to action.
  - Live interactive demo widget right on the home page.
  - Features overview and step-by-step "How It Works" guide.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Server Actions, Route Handlers)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Database & ORM**: [Prisma ORM](https://www.prisma.io/) with PostgreSQL / Supabase
- **Version Control**: Git & GitHub

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/rabbiWD/Chatbot-Form-Builder.git
cd Chatbot-Form-Builder
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory:
```env
DATABASE_URL="your-postgresql-or-supabase-connection-string"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4. Database Setup & Migrations
```bash
npx prisma db push
```

### 5. Start the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Project Structure

```
├── docs/                       # Specifications and implementation plans
├── public/                     # Static assets and widget.js embed bundle
├── src/
│   ├── app/                    # Next.js App Router (Landing, Dashboard, Public Form, API)
│   │   ├── api/                # API routes (Form submission, CRUD)
│   │   ├── dashboard/          # Form management and responses dashboard
│   │   ├── f/[formId]/         # Standalone public conversational form
│   │   ├── embed/[formId]/     # Embeddable widget view
│   │   ├── layout.tsx
│   │   └── page.tsx            # Modern Landing Page
│   ├── components/             # Reusable UI, Builder, Chatbot, and Dashboard components
│   └── lib/                    # Prisma client, utilities, and validation helpers
├── prisma/                     # Prisma schema and seed data
└── README.md
```

---

## 📄 License
MIT License. Created by [rabbiWD](https://github.com/rabbiWD).
