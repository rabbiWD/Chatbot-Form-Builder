export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <div className="max-w-2xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          Chatbot Form Builder
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent">
          Conversational Forms Reimagined
        </h1>
        <p className="text-slate-400 text-lg">
          Scaffolding initialized successfully with Next.js, TypeScript, and Tailwind CSS.
        </p>
      </div>
    </main>
  );
}
