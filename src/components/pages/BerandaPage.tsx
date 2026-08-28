import React from 'react';
import { PageId, User } from '../../types';
import { RumahMelayuIllustration } from '../VisualAssets';
import { isPageUnlocked, getLatestUnlockedPage, getLockedReason } from '../../lib/progression';
import { LEARNING_PAGES } from '../../data/learningData';
import { 
  ArrowRight, 
  BookOpen, 
  Sparkles, 
  Compass, 
  Landmark, 
  Leaf, 
  ShieldCheck, 
  Trees, 
  Droplets, 
  CheckCircle2, 
  GraduationCap,
  MessageSquare,
  Users,
  Bot,
  Camera,
  Lock,
  PlayCircle
} from 'lucide-react';

interface BerandaPageProps {
  onNavigate: (page: PageId) => void;
  currentUser: User;
  onOpenAuth: () => void;
  completedPages?: PageId[];
  onOpenForumChat?: () => void;
  onOpenAiAssistant?: () => void;
  onOpenArExploration?: () => void;
}

export const BerandaPage: React.FC<BerandaPageProps> = ({
  onNavigate,
  currentUser,
  onOpenAuth,
  completedPages = ['beranda' as PageId],
  onOpenForumChat,
  onOpenAiAssistant,
  onOpenArExploration,
}) => {
  const latestUnlockedPageId = getLatestUnlockedPage(completedPages, currentUser);
  const latestUnlockedInfo = LEARNING_PAGES.find(p => p.id === latestUnlockedPageId);
  const isStarted = completedPages.some(p => p !== 'beranda');
  return (
    <div className="space-y-10 pb-12 animate-fade-in">
      {/* Hero Section with Warm Natural Malay Palette */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-950 text-white shadow-xl border border-emerald-800/60">
        {/* Subtle decorative background pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:20px_20px]" />

        <div className="relative p-6 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-semibold tracking-wide">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Media Pembelajaran Biologi SMA Berbasis Etnosains
              </div>

              <div className="space-y-3">
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                  Perubahan Lingkungan
                </h1>
                <p className="text-lg sm:text-xl font-medium text-amber-300 leading-relaxed">
                  Belajar Biologi melalui Sains, Lingkungan, dan Budaya Lokal
                </p>
                <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed max-w-2xl">
                  Selamat datang di media E-Learning Biologi interaktif yang memadukan konsep perubahan lingkungan, analisis masalah deforestasi dan pencemaran, dengan kearifan lokal arsitektur ekologis <span className="font-semibold text-white">Rumah Melayu Langkat</span>.
                </p>
              </div>

              {/* Research Title Card */}
              <div className="p-4 rounded-2xl bg-emerald-900/60 border border-emerald-700/60 backdrop-blur-xs text-xs space-y-1.5 text-emerald-200">
                <div className="font-bold text-amber-300 uppercase tracking-wider text-[11px]">
                  Fokus Penelitian & Pengembangan:
                </div>
                <div className="italic text-white font-medium">
                  “Pengembangan E-Learning Biologi Bermuatan Etnosains Rumah Melayu Langkat pada Materi Perubahan Lingkungan untuk Meningkatkan Literasi Lingkungan Peserta Didik SMA.”
                </div>
                <div className="text-[11px] text-emerald-300 pt-1 flex items-center gap-2">
                  <span className="font-semibold text-white">Pengembang:</span> Peneliti Pendidikan Biologi (Syifa Sirait & Tim Pengembang)
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <button
                  id="btn-mulai-belajar"
                  onClick={() => onNavigate(isStarted ? latestUnlockedPageId : 'petunjuk')}
                  className="px-6 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold rounded-xl shadow-lg shadow-amber-900/30 transition-all transform hover:-translate-y-0.5 flex items-center gap-2.5 text-sm sm:text-base"
                >
                  <PlayCircle className="w-5 h-5 text-slate-950" />
                  <span>{isStarted ? `Lanjutkan: ${latestUnlockedInfo?.shortTitle || latestUnlockedInfo?.title || 'Belajar'}` : 'Mulai Belajar'}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  id="btn-lihat-petunjuk"
                  onClick={() => onNavigate('petunjuk')}
                  className="px-5 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-xl backdrop-blur-xs transition-colors flex items-center gap-2 text-sm sm:text-base"
                >
                  <Compass className="w-4 h-4 text-emerald-300" />
                  <span>Petunjuk Pembelajaran</span>
                </button>
              </div>
            </div>

            {/* Right: Architectural Illustration */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="w-full rounded-2xl overflow-hidden shadow-2xl border-2 border-emerald-600/60 bg-emerald-950/80 p-2">
                <RumahMelayuIllustration className="w-full h-auto rounded-xl" />
              </div>
              <p className="text-[11px] text-center text-emerald-300 mt-2 italic">
                Visualisasi Arsitektur Adaptif Rumah Panggung Tradisional Melayu Langkat
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Core Pillars Section */}
      <section className="space-y-4">
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
            Tiga Pilar Pembelajaran Sains Terintegrasi
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Mengembangkan kompetensi literasi lingkungan melalui keterhubungan konsep ilmiah dan kearifan lokal
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Pillar 1 */}
          <div className="bg-white rounded-2xl p-6 border border-emerald-100 shadow-sm hover:shadow-md transition-shadow space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <Trees className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-800 text-base">
              1. Sains & Ekologi Lingkungan
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Memahami dinamika perubahan lingkungan, faktor alamiah vs aktivitas manusia (antropogenik), dampak deforestasi terhadap daur hidrologi, serta parameter pencemaran air, udara, dan tanah.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="bg-white rounded-2xl p-6 border border-amber-100 shadow-sm hover:shadow-md transition-shadow space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <Landmark className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-800 text-base">
              2. Etnosains Rumah Melayu Langkat
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Menggali kearifan lokal arsitektur tradisional panggung, atap rumbia isolator termal, kisi-kisi ventilasi silang, hingga etika adat menjaga rimba dan sempadan sungai Batang Serangan.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="bg-white rounded-2xl p-6 border border-teal-100 shadow-sm hover:shadow-md transition-shadow space-y-3">
            <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-800 text-base">
              3. Penguatan Literasi Lingkungan
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Melatih kemampuan investigasi masalah nyata, analisis sebab-akibat, evaluasi dampak ekologis, penentuan alternatif solusi ilmiah, dan pembentukan karakter peduli lingkungan hidup.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Step-by-Step Pathway Preview */}
      <section className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              Alur Pembelajaran Terstruktur (Dimulai dari Petunjuk)
            </h2>
            <p className="text-xs text-slate-500">
              Peserta didik diarahkan mengikuti alur terurut mulai dari petunjuk belajar hingga evaluasi & rangkuman
            </p>
          </div>
          <button
            onClick={() => onNavigate('petunjuk')}
            className="self-start sm:self-auto text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
          >
            <span>Buka Petunjuk Lengkap</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {[
            { step: 1, title: 'Petunjuk', id: 'petunjuk' as PageId },
            { step: 2, title: 'Tujuan', id: 'tujuan' as PageId },
            { step: 3, title: 'Orientasi Masalah', id: 'orientasi' as PageId },
            { step: 4, title: 'Etnosains Langkat', id: 'etnosains' as PageId },
            { step: 5, title: 'Perubahan Lingkungan', id: 'materi-perubahan' as PageId },
            { step: 6, title: 'Penebangan Hutan', id: 'materi-penebangan' as PageId },
            { step: 7, title: 'Pencemaran Lingkungan', id: 'materi-pencemaran' as PageId },
            { step: 8, title: 'Latihan Literasi', id: 'aktivitas-literasi' as PageId },
            { step: 9, title: 'Studi Kasus DAS', id: 'studi-kasus' as PageId },
            { step: 10, title: 'Kuis Formatif', id: 'kuis' as PageId },
            { step: 11, title: 'Evaluasi Akhir', id: 'evaluasi' as PageId },
            { step: 12, title: 'Rangkuman & Refleksi', id: 'rangkuman' as PageId },
          ].map((item) => {
            const isUnlocked = isPageUnlocked(item.id, completedPages, currentUser);
            const isCompleted = completedPages.includes(item.id);

            return (
              <button
                key={item.id}
                id={`beranda-step-card-${item.id}`}
                onClick={() => {
                  if (isUnlocked) {
                    onNavigate(item.id);
                  }
                }}
                disabled={!isUnlocked}
                title={!isUnlocked ? getLockedReason(item.id) : item.title}
                className={`p-3 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                  !isUnlocked
                    ? 'bg-slate-100/80 text-slate-400 border-dashed border-slate-200 cursor-not-allowed opacity-75'
                    : isCompleted
                    ? 'bg-emerald-50/70 border-emerald-200 hover:bg-emerald-100/80 text-slate-800'
                    : 'bg-white border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 text-slate-800'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div className={`w-6 h-6 rounded-full text-[11px] font-bold flex items-center justify-center ${
                    !isUnlocked
                      ? 'bg-slate-200 text-slate-400'
                      : isCompleted
                      ? 'bg-emerald-600 text-white'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {!isUnlocked ? <Lock className="w-3 h-3" /> : item.step}
                  </div>
                  {isCompleted && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  )}
                </div>

                <div className="mt-2.5">
                  <div className={`font-semibold text-xs line-clamp-1 ${
                    !isUnlocked ? 'text-slate-500' : 'text-slate-800'
                  }`}>
                    {item.title}
                  </div>
                  <div className="text-[10px] font-medium text-slate-400 mt-0.5">
                    {!isUnlocked ? '🔒 Terkunci' : isCompleted ? '✅ Selesai' : '🔓 Terbuka'}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* User Welcome Footer Card */}
      <section className="p-6 rounded-2xl bg-gradient-to-r from-emerald-800 to-teal-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-amber-300">
            <GraduationCap className="w-7 h-7" />
          </div>
          <div>
            <div className="text-xs text-emerald-200">Sedang Masuk Sebagai:</div>
            <div className="font-bold text-base text-white">{currentUser.nama} ({currentUser.role === 'guru' ? 'Guru' : currentUser.kelas})</div>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={onOpenAuth}
            className="flex-1 sm:flex-none px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-lg border border-white/20 transition-colors"
          >
            Ganti Pengguna
          </button>
          <button
            onClick={() => onNavigate(isStarted ? latestUnlockedPageId : 'petunjuk')}
            className="flex-1 sm:flex-none px-5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-1.5"
          >
            <span>{isStarted ? `Lanjut: ${latestUnlockedInfo?.shortTitle || 'Belajar'}` : 'Mulai Petunjuk'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
