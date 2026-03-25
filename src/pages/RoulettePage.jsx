import React, { useState } from "react";
import Panel from "../components/ui/Panel";
import PrimaryButton from "../components/ui/PrimaryButton";

const roulettePrizes = [
  "10% OFF",
  "Sticker Pack",
  "2x1 en juego",
  "Gift Card",
  "Intento extra",
  "Premio sorpresa",
];

export default function RoulettePage() {
  const [selectedPrize, setSelectedPrize] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);

  const handleSpin = () => {
    if (isSpinning) return;

    const randomIndex = Math.floor(Math.random() * roulettePrizes.length);
    const extraTurns = 5 * 360;
    const segmentAngle = 360 / roulettePrizes.length;
    const targetAngle = randomIndex * segmentAngle + segmentAngle / 2;
    const finalRotation = rotation + extraTurns + (360 - targetAngle);

    setIsSpinning(true);
    setSelectedPrize(null);
    setRotation(finalRotation);

    window.setTimeout(() => {
      setSelectedPrize(roulettePrizes[randomIndex]);
      setIsSpinning(false);
    }, 3200);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <Panel className="border-0 shadow-lg">
        <div className="p-6 md:p-8">
          <div className="mb-6">
            <span className="inline-block rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
              Juego interactivo
            </span>

            <h2 className="mt-4 text-2xl font-bold text-slate-900 md:text-4xl">
              Ruleta interactiva
            </h2>

            <p className="mt-3 max-w-2xl text-sm text-slate-600 md:text-base">
              Girá la ruleta para obtener un premio, beneficio o sorpresa durante el evento.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="relative flex items-center justify-center">
              <div className="absolute -top-4 z-10 h-0 w-0 border-l-[18px] border-r-[18px] border-b-[28px] border-l-transparent border-r-transparent border-b-slate-900" />

              <div
                className="relative h-72 w-72 rounded-full border-[10px] border-slate-900 shadow-lg md:h-80 md:w-80"
                style={{
                  background: `conic-gradient(
                    #0f172a 0deg 60deg,
                    #334155 60deg 120deg,
                    #475569 120deg 180deg,
                    #64748b 180deg 240deg,
                    #94a3b8 240deg 300deg,
                    #cbd5e1 300deg 360deg
                  )`,
                  transform: `rotate(${rotation}deg)`,
                  transition: isSpinning
                    ? "transform 3.2s cubic-bezier(0.2, 0.8, 0.2, 1)"
                    : "none",
                }}
              >
                <div className="absolute inset-0 rounded-full">
                  {roulettePrizes.map((prize, index) => {
                    const angle = index * (360 / roulettePrizes.length);

                    return (
                      <div
                        key={prize}
                        className="absolute left-1/2 top-1/2 origin-center"
                        style={{
                          transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-112px)`,
                        }}
                      >
                        <span
                          className="block rounded-full bg-white/85 px-2 py-1 text-[10px] font-semibold text-slate-900 shadow-sm md:text-xs"
                          style={{ transform: `rotate(${-angle - rotation}deg)` }}
                        >
                          {prize}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white bg-slate-900 shadow-md" />
              </div>
            </div>

            <div className="mt-8 flex flex-col items-center gap-4 text-center">
              <PrimaryButton
                onClick={handleSpin}
                className="px-6 py-3"
                disabled={isSpinning}
              >
                {isSpinning ? "Girando..." : "Girar ruleta"}
              </PrimaryButton>

              <p className="min-h-6 text-sm font-medium text-slate-600">
                {selectedPrize
                  ? `Te tocó: ${selectedPrize}`
                  : "Presioná el botón para jugar."}
              </p>
            </div>
          </div>
        </div>
      </Panel>

      <div className="space-y-6">
        <Panel className="border-0 shadow-lg">
          <div className="p-6">
            <h3 className="text-lg font-bold text-slate-900">Premios posibles</h3>

            <div className="mt-4 grid gap-3">
              {roulettePrizes.map((prize) => (
                <div
                  key={prize}
                  className="rounded-2xl border border-slate-200 p-3 text-sm font-medium text-slate-700"
                >
                  {prize}
                </div>
              ))}
            </div>
          </div>
        </Panel>

        <Panel className="border-0 shadow-lg">
          <div className="p-6">
            <h3 className="text-lg font-bold text-slate-900">Cómo usarla</h3>

            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <p>• Podés dispararla en una activación de marca o en un evento en vivo.</p>
              <p>• Los premios pueden venir desde una API o desde una configuración manual.</p>
              <p>• También se puede bloquear para un único intento por usuario.</p>
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}