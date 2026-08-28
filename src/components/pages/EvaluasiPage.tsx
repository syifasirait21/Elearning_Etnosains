import React, { useState, useEffect } from 'react';
import { PageId, User, EvaluationResult } from '../../types';
import { EVALUATION_QUESTIONS } from '../../data/learningData';
import { getStudentProgress, saveEvaluationResult } from '../../lib/storage';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  ArrowLeft,
  Clock, 
  Sparkles, 
  BookOpen, 
  RotateCcw, 
  Send,
  AlertCircle,
  FileCheck,
  ShieldCheck
} from 'lucide-react';

interface EvaluasiPageProps {
  onNavigate: (page: PageId) => void;
  currentUser: User;
}

export const EvaluasiPage: React.FC<EvaluasiPageProps> = ({
  onNavigate,
  currentUser,
}) => {
  const [isStarted, setIsStarted] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [evalResult, setEvalResult] = useState<EvaluationResult | null>(null);
  const [timerSeconds, setTimerSeconds] = useState(1800); // 30 minutes
  const [showReview, setShowReview] = useState(false);

  useEffect(() => {
    const prog = getStudentProgress(currentUser.id);
    if (prog && prog.evaluationResult) {
      setEvalResult(prog.evaluationResult);
      setSelectedAnswers(prog.evaluationResult.answers);
      setIsFinished(true);
      setIsStarted(true);
    }
  }, [currentUser.id]);

  useEffect(() => {
    let interval: any;
    if (isStarted && !isFinished && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            finishEvaluation();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isStarted, isFinished, timerSeconds]);

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelect = (optionId: string) => {
    if (isFinished) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [EVALUATION_QUESTIONS[currentIdx].id]: optionId
    }));
  };

  const finishEvaluation = () => {
    let correct = 0;
    EVALUATION_QUESTIONS.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });

    const score = Math.round((correct / EVALUATION_QUESTIONS.length) * 100);
    let cat = 'Cukup';
    if (score >= 85) cat = 'Sangat Baik (Sangat Literat)';
    else if (score >= 70) cat = 'Baik (Literat)';
    else if (score >= 55) cat = 'Cukup (Cukup Literat)';
    else cat = 'Perlu Bimbingan Tambahan';

    const result: EvaluationResult = {
      score,
      totalQuestions: EVALUATION_QUESTIONS.length,
      correctCount: correct,
      answers: selectedAnswers,
      completedAt: new Date().toISOString(),
      literacyCategory: cat
    };

    setEvalResult(result);
    setIsFinished(true);
    saveEvaluationResult(currentUser.id, result);
  };

  const currentQ = EVALUATION_QUESTIONS[currentIdx];
  const answeredCount = Object.keys(selectedAnswers).length;

  return (
    <div className="space-y-8 pb-12 animate-fade-in w-full max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700">
          <Award className="w-4 h-4 text-emerald-600" />
          Halaman 12 • Evaluasi Akhir Pembelajaran
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Evaluasi Post-Test Literasi Lingkungan
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Evaluasi ini mengukur penguasaan konsep perubahan lingkungan, analisis sebab-akibat kerusakan alam, pemahaman etnosains Rumah Melayu Langkat, serta kemampuan merumuskan alternatif solusi ilmiah.
        </p>
      </div>

      {/* Screen 1: Start Instructions */}
      {!isStarted && !isFinished && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-emerald-950 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-700" />
              Petunjuk Pengerjaan Evaluasi
            </h2>
            <ul className="text-xs sm:text-sm text-emerald-900 space-y-2 list-disc list-inside leading-relaxed">
              <li>Evaluasi terdiri dari <strong>15 butir soal pilihan ganda HOTS</strong>.</li>
              <li>Waktu alokasi pengerjaan: <strong>30 menit</strong>.</li>
              <li>Pilihlah salah satu jawaban (A, B, C, atau D) yang paling tepat.</li>
              <li>Pastikan identitas nama: <strong>{currentUser.nama}</strong> ({currentUser.kelas || 'Peserta Didik'}).</li>
              <li>Hasil evaluasi akan otomatis terekam ke Dashboard Guru & Siswa.</li>
            </ul>
          </div>

          <div className="text-center pt-2">
            <button
              id="btn-start-evaluation"
              onClick={() => setIsStarted(true)}
              className="px-8 py-4 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-sm sm:text-base rounded-2xl shadow-lg hover:shadow-emerald-700/30 transition-all flex items-center justify-center gap-2 mx-auto"
            >
              <span>Mulai Pengerjaan Evaluasi Sekarang</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Screen 2: Active Test Container */}
      {isStarted && !isFinished && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          {/* Top Bar with Timer & Status */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500">Soal {currentIdx + 1} dari {EVALUATION_QUESTIONS.length}</span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                {answeredCount} Terjawab
              </span>
            </div>

            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-100 text-amber-900 font-mono font-bold text-xs sm:text-sm">
              <Clock className="w-4 h-4 text-amber-700" />
              <span>Sisa Waktu: {formatTimer(timerSeconds)}</span>
            </div>
          </div>

          {/* Question Number Quick Grid Selector */}
          <div className="flex flex-wrap gap-1.5 p-3 rounded-2xl bg-slate-100">
            {EVALUATION_QUESTIONS.map((q, idx) => {
              const isAns = !!selectedAnswers[q.id];
              const isCurr = currentIdx === idx;
              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentIdx(idx)}
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition-all flex items-center justify-center ${
                    isCurr
                      ? 'bg-emerald-700 text-white ring-2 ring-emerald-400'
                      : isAns
                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          {/* Current Question */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              Butir Soal No. {currentIdx + 1}
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
              {currentQ.question}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((opt) => {
              const isSelected = selectedAnswers[currentQ.id] === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelect(opt.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all text-xs sm:text-sm flex items-start gap-3 ${
                    isSelected
                      ? 'bg-emerald-50 border-emerald-600 text-emerald-950 font-bold shadow-xs'
                      : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    {opt.id}
                  </span>
                  <span className="flex-1">{opt.text}</span>
                </button>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
            <button
              onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
              disabled={currentIdx === 0}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs sm:text-sm font-semibold disabled:opacity-30 hover:bg-slate-50"
            >
              ← Soal Sebelumnya
            </button>

            {currentIdx < EVALUATION_QUESTIONS.length - 1 ? (
              <button
                onClick={() => setCurrentIdx(prev => Math.min(EVALUATION_QUESTIONS.length - 1, prev + 1))}
                className="px-5 py-2.5 bg-slate-800 text-white font-bold rounded-xl text-xs sm:text-sm hover:bg-slate-900 transition-colors"
              >
                Soal Berikutnya →
              </button>
            ) : (
              <button
                id="btn-finish-evaluation"
                onClick={finishEvaluation}
                className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-colors flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Kumpulkan Seluruh Jawaban</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Screen 3: Completed Results & Detailed Review */}
      {isFinished && evalResult && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-200 shadow-lg text-center space-y-6 animate-fade-in">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white mx-auto flex items-center justify-center shadow-lg">
              <FileCheck className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Laporan Capaian Evaluasi Pembelajaran
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Data evaluasi milik <strong>{currentUser.nama}</strong> ({currentUser.kelas || 'Peserta Didik'}) telah berhasil disimpan permanen.
              </p>
            </div>

            {/* Score Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                <div className="text-xs text-slate-500 font-bold uppercase">Nilai Akhir</div>
                <div className="text-4xl font-black text-emerald-800 mt-1">{evalResult.score}</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="text-xs text-slate-500 font-bold uppercase">Jawaban Benar</div>
                <div className="text-4xl font-black text-slate-800 mt-1">
                  {evalResult.correctCount} <span className="text-base font-normal text-slate-500">/ 15</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
                <div className="text-xs text-slate-500 font-bold uppercase">Tingkat Literasi</div>
                <div className="text-xs font-bold text-amber-950 mt-2 px-2 py-1 bg-amber-200/60 rounded-lg">
                  {evalResult.literacyCategory}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setShowReview(!showReview)}
                className="px-5 py-3 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs sm:text-sm hover:bg-slate-50 transition-colors flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                <span>{showReview ? 'Tutup Pembahasan' : 'Lihat Pembahasan Lengkap'}</span>
              </button>

              <button
                onClick={() => onNavigate('dashboard-siswa')}
                className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-colors"
              >
                Buka Dashboard Siswa
              </button>

              <button
                onClick={() => onNavigate('rangkuman')}
                className="px-6 py-3 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-colors"
              >
                Lanjut ke Rangkuman & Glosarium →
              </button>
            </div>
          </div>

          {/* Full Review Section */}
          {showReview && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 animate-fade-in">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-emerald-700" />
                Kunci Jawaban & Pembahasan Ilmiah Soal Evaluasi
              </h3>

              <div className="space-y-4">
                {EVALUATION_QUESTIONS.map((q, idx) => {
                  const userAns = evalResult.answers[q.id];
                  const isCorrect = userAns === q.correctAnswer;
                  return (
                    <div
                      key={q.id}
                      className={`p-5 rounded-2xl border space-y-3 ${
                        isCorrect
                          ? 'bg-emerald-50/50 border-emerald-200'
                          : 'bg-rose-50/50 border-rose-200'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="font-bold text-slate-900 text-xs sm:text-sm">
                          {idx + 1}. {q.question}
                        </div>
                        {isCorrect ? (
                          <span className="px-2.5 py-1 rounded-md bg-emerald-200 text-emerald-950 font-bold text-xs shrink-0 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                            Benar
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-md bg-rose-200 text-rose-950 font-bold text-xs shrink-0 flex items-center gap-1">
                            <XCircle className="w-3.5 h-3.5 text-rose-700" />
                            Salah
                          </span>
                        )}
                      </div>

                      <div className="text-xs text-slate-700 space-y-1">
                        <div>
                          Jawaban Anda: <strong className={isCorrect ? 'text-emerald-800' : 'text-rose-800'}>{userAns || 'Tidak Dijawab'}</strong>
                        </div>
                        <div>
                          Kunci Benar: <strong className="text-emerald-900">{q.correctAnswer}</strong>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-white/80 border border-slate-200/80 text-xs text-slate-700 leading-relaxed">
                        <strong className="text-slate-900">Pembahasan:</strong> {q.explanation}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Navigation Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
        <button
          onClick={() => onNavigate('kuis')}
          className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs sm:text-sm hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Kuis Formatif</span>
        </button>

        <button
          onClick={() => onNavigate('rangkuman')}
          className="w-full sm:w-auto px-6 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-xs sm:text-sm"
        >
          <span>Lanjut ke Rangkuman & Glosarium</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
