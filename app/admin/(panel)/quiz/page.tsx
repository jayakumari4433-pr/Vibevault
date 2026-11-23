"use client";

import { useState } from "react";
import { quizQuestions } from "@/lib/quiz";
import { PageHeader } from "@/components/admin/ui";
import { Icon } from "@/components/icons";
import type { QuizQuestion } from "@/lib/types";

export default function AdminQuizPage() {
  const [questions, setQuestions] = useState<QuizQuestion[]>(JSON.parse(JSON.stringify(quizQuestions)));
  const [saved, setSaved] = useState(false);

  function updateQuestion(qi: number, value: string) {
    setQuestions((prev) => prev.map((q, i) => (i === qi ? { ...q, question: value } : q)));
  }
  function updateOption(qi: number, oi: number, value: string) {
    setQuestions((prev) =>
      prev.map((q, i) =>
        i === qi ? { ...q, options: q.options.map((o, j) => (j === oi ? { ...o, label: value } : o)) } : q,
      ),
    );
  }
  function addOption(qi: number) {
    setQuestions((prev) =>
      prev.map((q, i) =>
        i === qi ? { ...q, options: [...q.options, { id: `new-${q.options.length + 1}`, label: "New option", emoji: "✨" }] } : q,
      ),
    );
  }
  function removeOption(qi: number, oi: number) {
    setQuestions((prev) => prev.map((q, i) => (i === qi ? { ...q, options: q.options.filter((_, j) => j !== oi) } : q)));
  }
  function save() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div>
      <PageHeader
        title="Quiz Builder"
        sub="Edit the quiz questions and options yourself — no code."
        action={
          <button onClick={save} className="btn btn-accent h-10 px-4 text-sm">
            {saved ? (<><Icon.check width={16} height={16} /> Saved</>) : "Save quiz"}
          </button>
        }
      />

      <div className="rounded-xl border border-line bg-cream p-4 text-sm text-stone">
        <span className="font-semibold text-ink">Note:</span> Step 1 is always the vibe picker, then colour and an optional note. This is the quick &quot;what are you in the mood for&quot; tap. Changes here are local in the demo.
      </div>

      <div className="mt-6 space-y-5">
        {questions.map((q, qi) => (
          <div key={q.id} className="card p-6">
            <div className="text-xs font-semibold uppercase tracking-wide text-mute">Question {qi + 1}</div>
            <input
              value={q.question}
              onChange={(e) => updateQuestion(qi, e.target.value)}
              className="field mt-2 text-lg font-semibold"
            />
            {q.helper && <p className="mt-2 text-sm text-mute">{q.helper}</p>}

            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {q.options.map((o, oi) => (
                <div key={oi} className="flex items-center gap-2 rounded-xl border border-line bg-cream px-3 py-2">
                  <span className="text-lg">{o.emoji ?? "•"}</span>
                  <input value={o.label} onChange={(e) => updateOption(qi, oi, e.target.value)} className="flex-1 bg-transparent text-sm text-ink outline-none" />
                  <button onClick={() => removeOption(qi, oi)} className="text-mute hover:text-clay" aria-label="Remove option">
                    <Icon.trash width={15} height={15} />
                  </button>
                </div>
              ))}
            </div>
            <button onClick={() => addOption(qi)} className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-clay hover:underline">+ Add option</button>
          </div>
        ))}
      </div>
    </div>
  );
}
