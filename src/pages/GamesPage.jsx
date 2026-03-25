import React from "react";
import Panel from "../components/ui/Panel";
const gamesData = [
  {
    id: 1,
    title: "Trivia en vivo",
    description: "Respondé preguntas y sumá puntos en tiempo real.",
    status: "Disponible",
  },
  {
    id: 2,
    title: "Memotest de marcas",
    description: "Encontrá las parejas correctas y desbloqueá premios.",
    status: "Próximamente",
  },
  {
    id: 3,
    title: "Ruleta interactiva",
    description: "Girás, participás y obtenés una recompensa instantánea.",
    status: "Próximamente",
  },
];
export default function GamesPage() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {gamesData.map((game) => (
        <Panel key={game.id} className="border-0 shadow-lg">
          <div className="p-6">
            <span className="inline-block rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
              {game.status}
            </span>
            <h2 className="mt-4 text-xl font-bold text-slate-900">{game.title}</h2>
            <p className="mt-3 text-sm text-slate-600">{game.description}</p>
          </div>
        </Panel>
      ))}
    </div>
  );
}