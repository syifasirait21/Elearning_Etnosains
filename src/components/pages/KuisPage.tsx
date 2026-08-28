import React, { useState, useEffect } from 'react';
import { PageId, User, QuizResult } from '../../types';
import { QUIZ_QUESTIONS } from '../../data/learningData';
import { getStudentProgress, saveQuizResult } from '../../lib/storage';
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ArrowRight, 
  ArrowLeft,
  Award, 
  Sparkles, 
  BookOpen, 
  Info,
  Clock
} from 'lucide-react';

interface KuisPageProps {
  onNavigate: (page: PageId) => void;
  currentUser: User;
}

export const KuisPage: React.FC<KuisPageProps> = ({
  onNavigate,
  currentUser,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);

  useEffect(() => {
    const prog = getStudentProgress(currentUser.id);
    if (prog && prog.quizResult) {
      setQuizScore(prog.quizResult.score);
      setCorrectCount(prog.quizResult.correctCount);
      setUserAnswers(prog.quizResult.answers);
      // We don't auto-set isCompleted so user can review or re-take
    }
  }, [currentUser.id]);

  const currentQ = QUIZ_QUESTIONS[currentIdx];
  const selectedAnswer = userAnswers[currentQ.id];

  const handleSelectOption = (optId: string) => {
    if (showExplanation && isCompleted) return;
    setUserAnswers(prev => ({ ...prev, [currentQ.id]: optId }));
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setShowExplanation(!!userAnswers[QUIZ_QUESTIONS[currentIdx + 1].id]);
    } else {
      // Calculate final score
      let correct = 0;
      QUIZ_QUESTIONS.forEach(q => {
        if (userAnswers[q.id] === q.correctAnswer) {
          correct++;
        }
      });
      const finalScore = Math.round((correct / QUIZ_QUESTIONS.length) * 100);
      setCorrectCount(correct);
      setQuizScore(finalScore);
      setIsCompleted(true);

      const resultData: QuizResult = {
        quizId: 'kuis-formatif-1',
        score: finalScore,
        totalQuestions: QUIZ_QUESTIONS.length,
        correctCount: correct,
        answers: userAnswers,
        completedAt: new Date().toISOString()
      };
      saveQuizResult(currentUser.id, resultData);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
      setShowExplanation(!!userAnswers[QUIZ_QUESTIONS[currentIdx - 1].id]);
    }
  };

  const handleReset = () => {
    setUserAnswers({});
    setCurrentIdx(0);
    setShowExplanation(false);
    setIsCompleted(false);
    setQuizScore(0);
    setCorrectCount(0);
  };

  const isCurrentCorrect = selectedAnswer === currentQ.correctAnswer;

  return (
    <div className="space-y-8 pb-12 animate-fade-in w-full max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-sm space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700">
            <HelpCircle className="w-4 h-4 text-emerald-600" />
            Halaman 11 • Kuis Formatif
          </div>
          <div className="text-xs font-bold text-slate-500">
            {QUIZ_QUESTIONS.length} Butir Soal Interaktif
          </div>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Kuis Interaktif: Konsep, Dampak, & Etnosains
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Ujilah pemahaman Anda secara mandiri. Setiap soal dilengkapi pembahasan ilmiah langsung setelah Anda memilih jawaban.
        </p>
      </div>

      {/* Main Quiz Container */}
      {!isCompleted ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          {/* Progress Indicator */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-slate-600">
              <span>Soal Nomor {currentIdx + 1} dari {QUIZ_QUESTIONS.length}</span>
              <span className="text-emerald-700">{Math.round(((currentIdx + 1) / QUIZ_QUESTIONS.length) * 100)}% Berjalan</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div
                className="bg-emerald-600 h-full transition-all duration-300"
                style={{ width: `${((currentIdx + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Box */}
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <span className="px-3 py-1 rounded-md bg-emerald-100 text-emerald-800 text-[11px] font-bold uppercase tracking-wider">
              {currentQ.type.replace('-', ' ').toUpperCase()}
            </span>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
              {currentQ.question}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((opt) => {
              const isSelected = selectedAnswer === opt.id;
              const isCorrectOpt = opt.id === currentQ.correctAnswer;
              
              let optStyle = 'bg-white border-slate-200 hover:bg-slate-50 text-slate-800';
              if (showExplanation) {
                if (isCorrectOpt) {
                  optStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold';
                } else if (isSelected && !isCorrectOpt) {
                  optStyle = 'bg-rose-50 border-rose-400 text-rose-950 font-bold';
                }
              } else if (isSelected) {
                optStyle = 'bg-emerald-50 border-emerald-600 text-emerald-900 font-semibold';
              }

              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.id)}
                  disabled={showExplanation && !!selectedAnswer}
                  className={`w-full text-left p-4 rounded-xl border transition-all text-xs sm:text-sm flex items-start gap-3 ${optStyle}`}
                >
                  <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    {opt.id}
                  </span>
                  <span className="flex-1">{opt.text}</span>
                  {showExplanation && isCorrectOpt && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  )}
                  {showExplanation && isSelected && !isCorrectOpt && (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Box */}
          {showExplanation && selectedAnswer && (
            <div className={`p-5 rounded-2xl border text-xs sm:text-sm space-y-2 animate-fade-in ${
              isCurrentCorrect
                ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                : 'bg-rose-50 border-rose-200 text-rose-950'
            }`}>
              <div className="font-bold flex items-center gap-2">
                {isCurrentCorrect ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>Jawaban Anda Benar!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-rose-600" />
                    <span>Jawaban Anda Kurang Tepat (Kunci: {currentQ.correctAnswer})</span>
                  </>
                )}
              </div>
              <p className="text-slate-700 leading-relaxed pt-1">
                <strong>Pembahasan Ilmiah:</strong> {currentQ.explanation}
              </p>
            </div>
          )}

          {/* Action Bar */}
          <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-100">
            <button
              onClick={handlePrev}
              disabled={currentIdx === 0}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs sm:text-sm font-semibold disabled:opacity-30 hover:bg-slate-50 transition-colors"
            >
              ← Soal Sebelumnya
            </button>

            <button
              onClick={handleNext}
              disabled={!selectedAnswer}
              className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-40 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-all flex items-center gap-2"
            >
              <span>{currentIdx === QUIZ_QUESTIONS.length - 1 ? 'Selesaikan & Lihat Skor' : 'Soal Berikutnya →'}</span>
            </button>
          </div>
        </div>
      ) : (
        /* Results Screen */
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-200 shadow-lg text-center space-y-6 animate-fade-in">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-400 to-amber-200 text-amber-900 mx-auto flex items-center justify-center shadow-lg">
            <Award className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Hasil Kuis Formatif
            </h2>
            <p className="text-sm text-slate-600">
              Selamat! Anda telah menyelesaikan seluruh butir kuis dengan baik.
            </p>
          </div>

          <div className="max-w-xs mx-auto p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Skor Perolehan
            </div>
            <div className="text-5xl font-black text-emerald-700">
              {quizScore}
            </div>
            <div className="text-xs text-slate-600 font-medium">
              {correctCount} dari {QUIZ_QUESTIONS.length} Soal Dijawab Benar
            </div>
          </div>

          <div className="p-4 rounded-xl max-w-md mx-auto text-xs leading-relaxed font-medium bg-emerald-50 border border-emerald-200 text-emerald-950">
            {quizScore >= 75 ? (
              <span>🌟 <strong>Luar Biasa!</strong> Pemahaman Anda mengenai materi dan etnosains Rumah Melayu Langkat sudah sangat matang. Siap untuk melangkah ke Evaluasi Akhir!</span>
            ) : (
              <span>💡 <strong>Bagus!</strong> Anda dapat mengulangi kuis ini untuk memperdalam pemahaman sebelum mengerjakan Evaluasi Akhir.</span>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={handleReset}
              className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs sm:text-sm hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Coba Ulangi Kuis</span>
            </button>

            <button
              id="btn-kuis-ke-evaluasi"
              onClick={() => onNavigate('evaluasi')}
              className="w-full sm:w-auto px-6 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-xs sm:text-sm"
            >
              <span>Lanjut ke Evaluasi Akhir (Post-Test)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Navigation Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
        <button
          onClick={() => onNavigate('studi-kasus')}
          className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs sm:text-sm hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Studi Kasus</span>
        </button>

        <button
          onClick={() => onNavigate('evaluasi')}
          className="w-full sm:w-auto px-6 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-xs sm:text-sm"
        >
          <span>Lanjut ke Evaluasi Pembelajaran</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
