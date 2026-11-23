import type { QuizQuestion } from "./types";

// Step 1 is the vibe picker, step 3 is colour, step 4 is an optional note —
// all handled in the quiz UI. This is the one quick "what are you in the mood
// for" tap, which points at a box type. Zero irritation, maximum feeling.
export const quizQuestions: QuizQuestion[] = [
  {
    id: "mood",
    question: "What are you in the mood for?",
    helper: "No wrong answer — it just points us at the right little surprise.",
    options: [
      { id: "ring", label: "A ring", emoji: "💫", sub: "something for your hands", box: "ring" },
      { id: "pendant", label: "Something at the heart", emoji: "🫧", sub: "a pendant to wear close", box: "pendant" },
      { id: "mix", label: "A little mix", emoji: "🎀", sub: "our most-loved box", box: "jewellery" },
      { id: "spoil", label: "Spoil me", emoji: "✨", sub: "the full feeling", box: "jewellery" },
      { id: "custom", label: "My own thing", emoji: "🎁", sub: "I'll set it up (from ₹70)", box: "customize" },
    ],
  },
];
