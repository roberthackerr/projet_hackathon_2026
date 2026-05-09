// components/developer/developer-ai-list.tsx

import DeveloperAICard from "./developer-ai-card";

const fakeAIs = [
  {
    name: "EduBot MG",

    domain: "Education",

    users: "12K+",

    rating: 4.9,
  },

  {
    name: "TradukMG",

    domain: "Translation",

    users: "20K+",

    rating: 5.0,
  },

  {
    name: "AgriConseil MG",

    domain: "Agriculture",

    users: "8K+",

    rating: 4.8,
  },
];

export default function DeveloperAIList() {
  return (
    <div>

      <div className="mb-8 flex items-center justify-between">

        <h2 className="text-3xl font-bold">
          Mes IA
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

        {fakeAIs.map((ai) => (
          <DeveloperAICard
            key={ai.name}
            ai={ai}
          />
        ))}
      </div>
    </div>
  );
}