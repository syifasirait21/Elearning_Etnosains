import React from 'react';
import { PageId, User } from '../../types';
import { getStudentProgress } from '../../lib/storage';
import { LEARNING_PAGES } from '../../data/learningData';
import { isPageUnlocked, getLockedReason } from '../../lib/progression';
import { 
  GraduationCap, 
  Award, 
  CheckCircle2, 
  Clock, 
  BookOpen, 
  FileText, 
  Printer, 
  RotateCcw, 
  ArrowRight,
  TrendingUp,
  User as UserIcon,
  Sparkles,
  HelpCircle,
  Lock
} from 'lucide-react';

interface DashboardSiswaPageProps {
  onNavigate: (page: PageId) => void;
  currentUser: User;
  onOpenAuth: () => void;
}

export const DashboardSiswaPage: React.FC<DashboardSiswaPageProps> = ({
  onNavigate,
  currentUser,
  onOpenAuth,
}) => {
  const progress = getStudentProgress(currentUser.id);
  const completedPages = progress?.completedPages || ['beranda'];
  const coreSteps = LEARNING_PAGES.filter(p => p.id !== 'beranda' && p.category !== 'Manajemen');
  const completedCount = completedPages.filter(p => p !== 'beranda' && p !== 'dashboard-siswa' && p !== 'dashboard-guru').length;
  const progressPercent = Math.min(100, Math.round((completedCount / 12) * 100));

  return (
    <div className="space-y-8 pb-12 animate-fade-in w-full max-w-7xl mx-auto">
      {/* Header Profile Card */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-950 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-400 text-emerald-950 flex items-center justify-center font-black text-2xl shadow-md shrink-0">
              {currentUser.nama.charAt(0).toUpperCase()}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[11px] font-bold uppercase tracking-wider">
                  Peserta Didik SMA
                </span>
                <span className="text-xs text-emerald-300">ID: {currentUser.id}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white">
                {currentUser.nama}
              </h1>
              <p className="text-xs sm:text-sm text-emerald-200">
                {currentUser.sekolah || 'SMA Negeri 1 Langkat'} • Kelas: <span className="font-semibold text-white">{currentUser.kelas || 'Fase F (Kelas XI / XII)'}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenAuth}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-white transition-colors"
            >
              Ubah Identitas
            </button>
            <button
              onClick={() => window.print()}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-emerald-950 font-bold text-xs shadow-md transition-colors flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak Portofolio</span>
            </button>
          </div>
        </div>

        {/* Big Metric Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="bg-white/10 backdrop-blur-xs p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-emerald-200 font-bold">Progres Belajar E-Learning</div>
            <div className="text-3xl font-black text-amber-300 mt-1">{progressPercent}%</div>
            <div className="text-[11px] text-emerald-300 mt-0.5">{completedCount} dari 12 Modul Tuntas</div>
          </div>

          <div className="bg-white/10 backdrop-blur-xs p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-emerald-200 font-bold">Nilai Kuis Formatif</div>
            <div className="text-3xl font-black text-white mt-1">
              {progress?.quizResult ? `${progress.quizResult.score}` : '—'}
            </div>
            <div className="text-[11px] text-emerald-300 mt-0.5">
              {progress?.quizResult ? `${progress.quizResult.correctCount}/10 Benar` : 'Belum Dikerjakan'}
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xs p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-emerald-200 font-bold">Nilai Evaluasi Akhir (Post-Test)</div>
            <div className="text-3xl font-black text-amber-300 mt-1">
              {progress?.evaluationResult ? `${progress.evaluationResult.score}` : '—'}
            </div>
            <div className="text-[11px] text-emerald-300 mt-0.5 truncate">
              {progress?.evaluationResult?.literacyCategory || 'Belum Dikerjakan'}
            </div>
          </div>
        </div>
      </div>

      {/* Checklist Status Belajar Semua Modul */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-700" />
              Peta Capaian Modul Belajar
            </h2>
            <p className="text-xs text-slate-500">
              Klik pada judul materi untuk langsung membuka modul yang diinginkan.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {coreSteps.map((step, idx) => {
            const isDone = completedPages.includes(step.id);
            const isUnlocked = isPageUnlocked(step.id, completedPages, currentUser);
            const stepNumber = idx + 1;

            return (
              <button
                key={step.id}
                onClick={() => {
                  if (isUnlocked) onNavigate(step.id);
                }}
                disabled={!isUnlocked}
                title={!isUnlocked ? getLockedReason(step.id) : step.title}
                className={`p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between gap-2 ${
                  !isUnlocked
                    ? 'bg-slate-100/70 border-dashed border-slate-200 text-slate-400 cursor-not-allowed opacity-75'
                    : isDone
                    ? 'bg-emerald-50/70 border-emerald-300 text-slate-800 hover:bg-emerald-100/70 cursor-pointer'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer shadow-2xs'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                    !isUnlocked
                      ? 'bg-slate-200 text-slate-400'
                      : isDone 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {!isUnlocked ? <Lock className="w-3 h-3" /> : stepNumber}
                  </span>
                  <span className="text-xs font-bold truncate">{step.shortTitle}</span>
                </div>

                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : !isUnlocked ? (
                  <span className="text-[10px] font-bold text-slate-400 flex items-center gap-0.5 shrink-0">
                    <Lock className="w-2.5 h-2.5" /> Terkunci
                  </span>
                ) : (
                  <span className="text-[10px] font-semibold text-emerald-700 shrink-0">Buka →</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Portofolio Jawaban Analisis Kasus Siswa */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <FileText className="w-5 h-5 text-emerald-700" />
          Portofolio Analisis & Investigasi Lingkungan Siswa
        </h2>

        {/* Refleksi Orientasi */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              1. Catatan Refleksi Orientasi Masalah
            </h3>
            {progress?.orientasiAnswers?.submittedAt && (
              <span className="text-[11px] font-bold text-emerald-700">Tersimpan</span>
            )}
          </div>
          {progress?.orientasiAnswers?.submittedAt ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-700">
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="font-bold text-slate-900">Pengamatan:</span> {progress.orientasiAnswers.q1}
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="font-bold text-slate-900">Penyebab:</span> {progress.orientasiAnswers.q2}
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="font-bold text-slate-900">Dampak Biologis:</span> {progress.orientasiAnswers.q3}
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="font-bold text-slate-900">Gagasan Solusi:</span> {progress.orientasiAnswers.q4}
              </div>
            </div>
          ) : (
            <div className="text-xs text-slate-500 italic">
              Belum mengisi form refleksi di halaman Orientasi Masalah.{' '}
              <button onClick={() => onNavigate('orientasi')} className="text-emerald-700 font-bold underline">
                Buka Form Orientasi
              </button>
            </div>
          )}
        </div>

        {/* Analisis Kasus Penebangan */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-600" />
              2. Analisis Kasus Penebangan Hutan DAS
            </h3>
            {progress?.caseAnswers?.['penebangan-hutan'] && (
              <span className="text-[11px] font-bold text-emerald-700">Tersimpan</span>
            )}
          </div>
          {progress?.caseAnswers?.['penebangan-hutan'] ? (
            <div className="text-xs text-slate-700 space-y-2">
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <strong>Masalah:</strong> {progress.caseAnswers['penebangan-hutan'].masalah}
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <strong>Solusi Saintifik:</strong> {progress.caseAnswers['penebangan-hutan'].solusi}
              </div>
            </div>
          ) : (
            <div className="text-xs text-slate-500 italic">
              Belum mengisi analisis kasus di halaman Penebangan Hutan.{' '}
              <button onClick={() => onNavigate('materi-penebangan')} className="text-emerald-700 font-bold underline">
                Buka Kasus Penebangan
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
        <button
          onClick={() => onNavigate('beranda')}
          className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs sm:text-sm hover:bg-slate-50 transition-colors"
        >
          ← Kembali ke Beranda
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('kuis')}
            className="px-5 py-3 rounded-xl border border-emerald-600 text-emerald-800 font-bold text-xs sm:text-sm hover:bg-emerald-50 transition-colors"
          >
            Buka Kuis
          </button>
          <button
            onClick={() => onNavigate('evaluasi')}
            className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-colors"
          >
            Buka Evaluasi Akhir
          </button>
        </div>
      </div>
    </div>
  );
};
