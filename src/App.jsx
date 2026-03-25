import React, { useMemo, useState } from "react";
import { NavLink, Navigate, Route, Routes } from "react-router-dom";
import GamesPage from "./pages/GamesPage";
import EventPage from "./pages/EventPage";
import Panel from "./components/ui/Panel";
import PrimaryButton from "./components/ui/PrimaryButton";
import SecondaryButton from "./components/ui/SecondaryButton";
import ProgressBar from "./components/ui/ProgressBar";
import TriviaPage from "./pages/TriviaPage";
import "./App.css";

function AppShell({ children }) {
  const navLinkClassName = ({ isActive }) => {
    const baseClassName =
      "rounded-full px-4 py-2 text-sm font-medium transition border";

    return isActive
      ? `${baseClassName} border-slate-900 bg-slate-900 text-white`
      : `${baseClassName} border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 text-center">
          <span className="mb-4 inline-block rounded-full border border-slate-300 bg-white px-4 py-1 text-sm font-medium text-slate-700 shadow-sm">
            MiniApps
          </span>
          <h1 className="text-3xl font-bold tracking-tight md:text-5xl">MiniApps Event Hub</h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600 md:text-base">
            Navegá entre la información del evento, la trivia y los juegos disponibles.
          </p>
        </div>

        <nav className="mb-6 flex flex-wrap justify-center gap-3">
          <NavLink to="/evento" className={navLinkClassName}>
            Evento
          </NavLink>
          <NavLink to="/trivia" className={navLinkClassName}>
            Trivia
          </NavLink>
          <NavLink to="/juegos" className={navLinkClassName}>
            Juegos
          </NavLink>
        </nav>

        {children}
      </div>
    </div>
  );
}

export default function App() {
  return (
      <AppShell>
        <Routes>
          <Route path="/" element={<Navigate to="/evento" replace />} />
          <Route path="/evento" element={<EventPage />} />
          <Route path="/trivia" element={<TriviaPage />} />
          <Route path="/juegos" element={<GamesPage />} />
        </Routes>
      </AppShell>
  );
}
