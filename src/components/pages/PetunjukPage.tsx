import React from 'react';
import { PageId, User } from '../../types';
import { LEARNING_PAGES } from '../../data/learningData';
import { isPageUnlocked, getLockedReason } from '../../lib/progression';
import { 
  Compass, 
  CheckCircle2, 
  Circle, 
  ArrowRight, 
  BookOpen, 
  FileText, 
  HelpCircle, 
  Award, 
  Lock, 
  LogIn,
  ClipboardList,
  Sparkles
} from 'lucide-react';

interface PetunjukPageProps {
  onNavigate: (page: PageId) => void;
  currentUser: User;
  completedPages: PageId[];
  onOpenAuth: () => void;
}

export const PetunjukPage: React.FC<PetunjukPageProps> = ({
  onNavigate,
  currentUser,
  completedPages,
  onOpenAuth
}) => {
  // Core learning path modules from Petunjuk to Rangkuman (12 sequential learning stages)
  const coreSteps = LEARNING_PAGES.filter(p => p.id !== 'beranda' && p.category !== 'Manajemen');
  const completedCount = completedPages.filter(p => p !== 'beranda' && p !== 'dashboard-siswa' && p !== 'dashboard-guru').length;
  const progressPercent = Math.min(100, Math.round((completedCount / 12) * 100));

  return (
    <div className="space-y-8 pb-12 animate-fade-in w-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700">
          <Compass className="w-4 h-4 text-emerald-600" />
          Halaman 2 • Petunjuk Pembelajaran
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Panduan Penggunaan Media E-Learning
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Media E-Learning Biologi Etnosains Rumah Melayu Langkat dirancang secara sistematis untuk memandu peserta didik SMA memahami materi perubahan lingkungan melalui integrasi sains dan kearifan lokal. Ikuti tahapan belajar secara berurutan.
        </p>
      </div>

      {/* Progress Matrix Overview Card */}
      <div className="bg-gradient-to-br from-emerald-900 to-teal-950 text-white rounded-3xl p-6 sm:p-8 shadow-lg border border-emerald-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Pelacak Kemajuan Belajar Siswa
            </div>
            <div className="text-lg font-bold text-white mt-0.5">
              Status: {currentUser.nama} ({currentUser.kelas || 'Peserta Didik'})
            </div>
          </div>
          <div className="bg-emerald-800/80 px-4 py-2 rounded-xl border border-emerald-600/60 text-right">
            <div className="text-xs text-emerald-200">Total Capaian:</div>
            <div className="text-2xl font-black text-amber-300">{progressPercent}%</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="w-full bg-emerald-950 rounded-full h-3.5 overflow-hidden p-0.5 border border-emerald-700">
            <div 
              className="bg-gradient-to-r from-amber-400 via-emerald-400 to-teal-300 h-full rounded-full transition-all duration-700 ease-out" 
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-emerald-200 font-medium">
            <span>{completedCount} dari 12 Modul Selesai Dipelajari</span>
            <span>{12 - completedCount} Modul Tersisa</span>
          </div>
        </div>

        {/* Module Status Checklist Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
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
                className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between gap-2 ${
                  !isUnlocked
                    ? 'bg-emerald-950/20 border-emerald-900/30 text-emerald-500/50 cursor-not-allowed opacity-60'
                    : isDone 
                    ? 'bg-emerald-800/70 border-emerald-500/70 text-white hover:bg-emerald-800 cursor-pointer shadow-xs' 
                    : 'bg-emerald-900/50 border-emerald-700/60 text-emerald-200 hover:bg-emerald-850 cursor-pointer'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 ${
                    !isUnlocked 
                      ? 'bg-emerald-950 text-emerald-600'
                      : isDone 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-white/10 text-amber-300'
                  }`}>
                    {!isUnlocked ? <Lock className="w-3 h-3" /> : stepNumber}
                  </span>
                  <span className="text-xs font-semibold truncate">{step.shortTitle}</span>
                </div>
                {isDone ? (
                  <span className="flex items-center gap-1 text-[11px] font-bold text-amber-300 shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Selesai
                  </span>
                ) : !isUnlocked ? (
                  <span className="flex items-center gap-1 text-[11px] text-emerald-500/60 shrink-0">
                    <Lock className="w-3 h-3" />
                    Terkunci
                  </span>
                ) : (
                  <span className="text-[11px] text-amber-300/80 font-medium shrink-0">
                    Terbuka
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 6 Step Interactive Guidelines */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800">
          6 Petunjuk Utama Aktivitas Pembelajaran
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Step 1 */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-2.5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
                1
              </div>
              <h3 className="font-bold text-slate-800 text-sm sm:text-base">
                Masuk ke Pembelajaran
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Pastikan Anda telah memasukkan Nama Lengkap dan Kelas pada tombol profil di pojok kanan atas. Identitas Anda akan digunakan untuk menyimpan catatan investigasi, refleksi orientasi, dan skor evaluasi.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-2.5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
                2
              </div>
              <h3 className="font-bold text-slate-800 text-sm sm:text-base">
                Urutan Kegiatan Belajar
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Ikuti alur pembelajaran berurutan: <span className="font-semibold text-emerald-800">Orientasi Masalah → Etnosains Langkat → Materi Perubahan → Penebangan Hutan → Pencemaran → Latihan Literasi → Studi Kasus → Kuis → Evaluasi</span>.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-2.5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
                3
              </div>
              <h3 className="font-bold text-slate-800 text-sm sm:text-base">
                Mengakses & Menjelajahi Materi
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Pelajari konsep biologi melalui teks ringkas, gambar infografis, diagram hidrologi, dan kotak <strong>“Tahukah Kamu?”</strong> serta <strong>“Hubungkan dengan Sains”</strong> yang menghubungkan materi dengan Rumah Melayu Langkat.
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-2.5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
                4
              </div>
              <h3 className="font-bold text-slate-800 text-sm sm:text-base">
                Mengerjakan Aktivitas Analisis & Literasi
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Pada halaman Orientasi Masalah, Aktivitas Literasi, dan Studi Kasus DAS, ketikkan analisis Anda pada form yang disediakan lalu tekan tombol <strong>“Kirim Jawaban”</strong> untuk melihat umpan balik saintifik langsung.
            </p>
          </div>

          {/* Step 5 */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-2.5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
                5
              </div>
              <h3 className="font-bold text-slate-800 text-sm sm:text-base">
                Mengerjakan Kuis Interaktif
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Kuis formatif berisi 10 butir soal pilihan ganda, benar/salah, dan sebab-akibat. Uji pemahaman Anda dan cermati pembahasan lengkap setelah memilih jawaban.
            </p>
          </div>

          {/* Step 6 */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-2.5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
                6
              </div>
              <h3 className="font-bold text-slate-800 text-sm sm:text-base">
                Mengerjakan Evaluasi Akhir (Post-Test)
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Evaluasi akhir mengukur capaian literasi lingkungan Anda. Kerjakan seluruh 15 butir soal HOTS secara mandiri. Skor dan status ketuntasan Anda akan otomatis terekam ke Dashboard Guru.
            </p>
          </div>
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

        <button
          id="btn-petunjuk-ke-tujuan"
          onClick={() => onNavigate('tujuan')}
          className="w-full sm:w-auto px-6 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-xs sm:text-sm"
        >
          <span>Lanjut ke Tujuan Pembelajaran</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
