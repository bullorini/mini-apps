import React from "react";
import Panel from "../components/ui/Panel";

const eventInfo = {
  badge: "Evento en vivo",
  title: "MiniApps Trivia Night",
  description:
    "Participá de la trivia del evento, respondé las preguntas y descubrí tu puntaje final.",
  date: "12 de abril · 20:00 hs",
  location: "Centro de Convenciones · Buenos Aires",
  organizer: "Organiza MiniApps",
};

export default function EventPage() {
  return (
    <Panel className="overflow-hidden border-0 shadow-lg">
      <div className="bg-slate-900 p-6 text-white md:p-8">
        <span className="inline-block rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-100">
          {eventInfo.badge}
        </span>

        <h2 className="mt-4 text-2xl font-bold md:text-4xl">
          {eventInfo.title}
        </h2>

        <p className="mt-3 max-w-2xl text-sm text-slate-300 md:text-base">
          {eventInfo.description}
        </p>
      </div>

      <div className="grid gap-4 p-6 md:grid-cols-3 md:p-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Fecha
          </p>
          <p className="mt-2 text-sm font-medium text-slate-800 md:text-base">
            {eventInfo.date}
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Lugar
          </p>
          <p className="mt-2 text-sm font-medium text-slate-800 md:text-base">
            {eventInfo.location}
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Organiza
          </p>
          <p className="mt-2 text-sm font-medium text-slate-800 md:text-base">
            {eventInfo.organizer}
          </p>
        </div>
      </div>
    </Panel>
  );
}