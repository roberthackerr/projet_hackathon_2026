// app/developer/edit-ai/[id]/page.tsx

import EditAIForm from "@/components/developer/edit-ai-form";

export default function EditAIPage() {
  return (
    <main className="min-h-screen bg-[#081018] px-6 py-10 text-white">

      <div className="mx-auto max-w-4xl">

        <div className="mb-10">

          <h1 className="text-5xl font-bold">
            Modifier IA
          </h1>

          <p className="mt-4 text-slate-400">
            Modifiez votre intelligence artificielle.
          </p>
        </div>

        <EditAIForm />
      </div>
    </main>
  );
}