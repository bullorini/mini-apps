import React, { useMemo, useState } from "react";
import Panel from "../components/ui/Panel";
import PrimaryButton from "../components/ui/PrimaryButton";
import SecondaryButton from "../components/ui/SecondaryButton";
import ProgressBar from "../components/ui/ProgressBar";
import { triviaData } from "../data/triviaData";
import { shuffleArray } from "../utils/shuffleArray";

export default function TriviaPage() {
  const [gameKey, setGameKey] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);

  const questions = useMemo(() => {
    return shuffleArray(triviaData).map((question) => ({
      ...question,
      options: shuffleArray(question.options),
    }));
  }, [gameKey]);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const isFinished = currentQuestionIndex >= questions.length;
  const progress = (currentQuestionIndex / questions.length) * 100;

  const handleSelectAnswer = (option) => {
    if (showFeedback) return;

    const isCorrect = option === currentQuestion.correctAnswer;
    setSelectedAnswer(option);
    setShowFeedback(true);

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setAnswers((prev) => [
      ...prev,
      {
        question: currentQuestion.question,
        selected: option,
        correct: currentQuestion.correctAnswer,
        isCorrect,
      },
    ]);
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      setCurrentQuestionIndex(questions.length);
      return;
    }

    setCurrentQuestionIndex((prev) => prev + 1);
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  const handleRestart = () => {
    setGameKey((prev) => prev + 1);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setScore(0);
    setAnswers([]);
  };

  return (
    <div className="space-y-6">
      {!isFinished && (
        <div className="grid gap-4 md:grid-cols-3">
          <Panel className="rounded-2xl">
            <div className="p-4">
              <p className="text-sm text-slate-500">Pregunta</p>
              <p className="mt-1 text-xl font-semibold">
                {currentQuestionIndex + 1} / {questions.length}
              </p>
            </div>
          </Panel>

          <Panel className="rounded-2xl">
            <div className="p-4">
              <p className="text-sm text-slate-500">Puntaje</p>
              <p className="mt-1 text-xl font-semibold">{score}</p>
            </div>
          </Panel>

          <Panel className="rounded-2xl">
            <div className="p-4">
              <p className="mb-2 text-sm text-slate-500">Progreso</p>
              <ProgressBar value={progress} />
            </div>
          </Panel>
        </div>
      )}

      {!isFinished ? (
        <Panel className="border-0 shadow-lg">
          <div className="p-6 pb-0 md:p-8 md:pb-0">
            <h2 className="text-xl font-semibold leading-snug md:text-2xl">
              {currentQuestion.question}
            </h2>
          </div>

          <div className="space-y-3 p-6 md:p-8">
            {currentQuestion.options.map((option) => {
              const isSelected = selectedAnswer === option;
              const isCorrect = currentQuestion.correctAnswer === option;

              let stateClasses = "border-slate-200 hover:border-slate-400 hover:bg-slate-50";

              if (showFeedback && isCorrect) {
                stateClasses = "border-emerald-500 bg-emerald-50";
              } else if (showFeedback && isSelected && !isCorrect) {
                stateClasses = "border-red-500 bg-red-50";
              }

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleSelectAnswer(option)}
                  className={`w-full rounded-2xl border p-4 text-left transition ${stateClasses}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-medium">{option}</span>

                    {showFeedback && isCorrect && <span className="text-emerald-600">✓</span>}
                    {showFeedback && isSelected && !isCorrect && (
                      <span className="text-red-600">✕</span>
                    )}
                  </div>
                </button>
              );
            })}

            {showFeedback && (
              <div className="mt-4 rounded-2xl bg-slate-50 p-4">
                <p className="text-sm text-slate-600">
                  {selectedAnswer === currentQuestion.correctAnswer
                    ? "¡Correcto!"
                    : `Incorrecto. La respuesta correcta es ${currentQuestion.correctAnswer}.`}
                </p>

                <div className="mt-4 flex justify-end">
                  <PrimaryButton onClick={handleNextQuestion}>
                    {isLastQuestion ? "Ver resultado" : "Siguiente"}
                  </PrimaryButton>
                </div>
              </div>
            )}
          </div>
        </Panel>
      ) : (
        <Panel className="border-0 shadow-lg">
          <div className="p-6 md:p-8">
            <div className="mb-6 flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-slate-100 p-4">
                <span className="text-3xl">🏆</span>
              </div>
              <h2 className="text-3xl font-bold">Resultado final</h2>
              <p className="mt-2 text-slate-600">
                Obtuviste <span className="font-semibold">{score}</span> de{" "}
                <span className="font-semibold">{questions.length}</span> respuestas correctas.
              </p>
            </div>

            <div className="space-y-3">
              {answers.map((answer, index) => (
                <div
                  key={`${answer.question}-${index}`}
                  className="rounded-2xl border border-slate-200 p-4"
                >
                  <p className="font-semibold">{answer.question}</p>
                  <p className="mt-2 text-sm text-slate-600">
                    Tu respuesta: <span className="font-medium">{answer.selected}</span>
                  </p>
                  <p className="text-sm text-slate-600">
                    Correcta: <span className="font-medium">{answer.correct}</span>
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-center">
              <SecondaryButton onClick={handleRestart}>↻ Jugar otra vez</SecondaryButton>
            </div>
          </div>
        </Panel>
      )}
    </div>
  );
}