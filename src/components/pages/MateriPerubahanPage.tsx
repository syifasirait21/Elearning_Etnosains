import React, { useState } from 'react';
import { PageId, User } from '../../types';
import { 
  Globe, 
  Trees, 
  Factory, 
  Flame, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2, 
  HelpCircle, 
  Layers,
  Sparkles,
  Info
} from 'lucide-react';

interface MateriPerubahanPageProps {
  onNavigate: (page: PageId) => void;
  currentUser: User;
}

export const MateriPerubahanPage: React.FC<MateriPerubahanPageProps> = ({
  onNavigate,
  currentUser,
}) => {
  const [activeFaktorTab, setActiveFaktorTab] = useState<'alami' | 'manusia'>('manusia');
  const [quickCheckAnswer, setQuickCheckAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  return (
    <div className="space-y-8 pb-12 animate-fade-in w-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700">
          <Globe className="w-4 h-4 text-emerald-600" />
          Halaman 6 • Materi Inti 1
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Konsep Dasar Perubahan Lingkungan & Keseimbangan Ekosistem
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Lingkungan hidup bersifat dinamis dan senantiasa mengalami perubahan. Memahami faktor pendorong perubahan dan batas kemampuan ekosistem dalam mempertahankan homeostasis merupakan fondasi utama literasi lingkungan.
        </p>
      </div>

      {/* Definition & Core Concepts Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-gradient-to-br from-emerald-900 to-teal-950 text-white rounded-3xl p-6 sm:p-7 shadow-md space-y-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-amber-300">
            <Globe className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-white">
            Apa itu Perubahan Lingkungan?
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
            Perubahan lingkungan adalah berubahnya tatanan lingkungan hidup oleh proses alamiah atau akibat ulah aktivitas manusia sehingga kualitas lingkungan turun sampai ke tingkat tertentu yang menyebabkan lingkungan tidak dapat berfungsi sesuai dengan peruntukannya.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
            <Layers className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-800">
            Keseimbangan Ekosistem (Homeostasis)
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Ekosistem dikatakan seimbang apabila komponen biotik dan abiotik berada dalam proporsi yang dinamis serta siklus materi dan aliran energi berlangsung lancar tanpa pemutusan rantai makanan yang fatal.
          </p>
        </div>
      </div>

      {/* 2 Key Biological Limits */}
      <div className="bg-amber-50/70 border border-amber-200/80 rounded-3xl p-6 sm:p-8 space-y-4">
        <h2 className="text-lg font-bold text-amber-950 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-amber-700" />
          Dua Parameter Kritis Kemampuan Ekosistem
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-xs space-y-2">
            <div className="font-bold text-emerald-800 text-base">
              1. Daya Dukung Lingkungan (Carrying Capacity)
            </div>
            <p className="text-slate-600 leading-relaxed text-xs">
              Kemampuan lingkungan hidup untuk mendukung perikehidupan manusia dan makhluk hidup lain serta keseimbangan antarkeduanya tanpa merusak integritas ekosistem secara permanen.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-xs space-y-2">
            <div className="font-bold text-emerald-800 text-base">
              2. Daya Lenting Lingkungan (Environmental Resilience)
            </div>
            <p className="text-slate-600 leading-relaxed text-xs">
              Kemampuan lingkungan untuk pulih kembali menuju kondisi seimbang setelah mengalami gangguan, tekanan, atau kerusakan akibat faktor alam maupun aktivitas antropogenik.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Tabs: Faktor Alami vs Antropogenik */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              Faktor Penyebab Perubahan Lingkungan
            </h2>
            <p className="text-xs text-slate-500">
              Pilihlah kategori faktor untuk melihat klasifikasi dan contoh mekanismenya.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveFaktorTab('manusia')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeFaktorTab === 'manusia'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Factory className="w-3.5 h-3.5" />
              Faktor Manusia (Antropogenik)
            </button>
            <button
              onClick={() => setActiveFaktorTab('alami')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeFaktorTab === 'alami'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              Faktor Alami
            </button>
          </div>
        </div>

        {/* Tab Contents */}
        {activeFaktorTab === 'manusia' ? (
          <div className="space-y-4 animate-fade-in">
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 leading-relaxed font-medium">
              Faktor antropogenik merupakan pemicu perubahan lingkungan terbesar di era modern akibat eksploitasi sumber daya tanpa batas.
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5">
                <div className="font-bold text-slate-800 text-xs sm:text-sm text-emerald-800">
                  Alih Fungsi Lahan Hutan
                </div>
                <p className="text-xs text-slate-600">
                  Pembabatan hutan untuk perkebunan sawit monokultur, pertambangan, dan pemukiman yang merusak koridor habitat satwa.
                </p>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5">
                <div className="font-bold text-slate-800 text-xs sm:text-sm text-emerald-800">
                  Pencemaran Limbah Masif
                </div>
                <p className="text-xs text-slate-600">
                  Pembuangan limbah kimia industri, deterjen domestik ke sungai, dan pelepasan gas rumah kaca (CO2, CFC, SOx, NOx).
                </p>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5">
                <div className="font-bold text-slate-800 text-xs sm:text-sm text-emerald-800">
                  Eksploitasi Berlebih
                </div>
                <p className="text-xs text-slate-600">
                  Penangkapan ikan berlebihan (overfishing), perburuan satwa langka, dan pemanfaatan air tanah tanpa kendali resapan.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4 animate-fade-in">
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed font-medium">
              Faktor alami terjadi karena dinamika geologis dan astronomis bumi tanpa campur tangan langsung manusia.
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5">
                <div className="font-bold text-slate-800 text-xs sm:text-sm text-amber-800">
                  Erupsi Gunung Berapi
                </div>
                <p className="text-xs text-slate-600">
                  Material lava dan debu vulkanik merusak ekosistem sekitar dalam jangka pendek, namun menyuburkan tanah dalam jangka panjang.
                </p>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5">
                <div className="font-bold text-slate-800 text-xs sm:text-sm text-amber-800">
                  Gempa Bumi & Tsunami
                </div>
                <p className="text-xs text-slate-600">
                  Pergeseran lempeng tektonik yang merusak bentang alam pesisir dan terumbu karang secara mendadak.
                </p>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5">
                <div className="font-bold text-slate-800 text-xs sm:text-sm text-amber-800">
                  Anomali Iklim Global (El Nino/La Nina)
                </div>
                <p className="text-xs text-slate-600">
                  Kekeringan panjang memicu kebakaran hutan alami atau curah hujan ekstrem yang memicu banjir bandang.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Check Mini Form */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-700">
          <Sparkles className="w-4 h-4" />
          Cek Pemahaman Cepat
        </div>
        <h3 className="font-bold text-slate-800 text-sm sm:text-base">
          Jika suatu ekosistem hutan hujan tropis mengalami penebangan yang melampaui daya lentingnya (*exceeding resilience threshold*), apa konsekuensi biologis yang terjadi?
        </h3>

        <div className="space-y-2">
          {[
            { id: 'A', text: 'Ekosistem akan langsung kembali pulih seperti sedia kala dalam hitungan minggu' },
            { id: 'B', text: 'Terjadi degradasi permanen (suksesi terhambat, hilangnya humus tanah, dan kepunahan spesies lokal)' },
            { id: 'C', text: 'Jumlah fotosintesis hutan akan bertambah dua kali lipat' }
          ].map(opt => (
            <button
              key={opt.id}
              onClick={() => {
                setQuickCheckAnswer(opt.id);
                setShowExplanation(true);
              }}
              className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition-all ${
                quickCheckAnswer === opt.id
                  ? opt.id === 'B'
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold'
                    : 'bg-rose-50 border-rose-400 text-rose-950 font-bold'
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
              }`}
            >
              <span className="font-bold mr-2">{opt.id}.</span> {opt.text}
            </button>
          ))}
        </div>

        {showExplanation && (
          <div className={`p-4 rounded-xl text-xs leading-relaxed animate-fade-in ${
            quickCheckAnswer === 'B'
              ? 'bg-emerald-100 text-emerald-950 font-medium border border-emerald-300'
              : 'bg-rose-100 text-rose-950 border border-rose-300'
          }`}>
            {quickCheckAnswer === 'B' ? (
              <span>✅ <strong>Tepat sekali!</strong> Ketika ambang batas daya lenting terlampaui, ekosistem tidak mampu lagi pulih secara mandiri dan masuk ke fase degradasi permanen.</span>
            ) : (
              <span>❌ <strong>Kurang tepat.</strong> Jawaban yang benar adalah <strong>B</strong>. Kerusakan yang melampaui daya lenting mengakibatkan hilangnya kapasitas pemulihan mandiri ekosistem.</span>
            )}
          </div>
        )}
      </div>

      {/* Navigation Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
        <button
          onClick={() => onNavigate('etnosains')}
          className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs sm:text-sm hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Etnosains Langkat</span>
        </button>

        <button
          id="btn-materi-perubahan-ke-penebangan"
          onClick={() => onNavigate('materi-penebangan')}
          className="w-full sm:w-auto px-6 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-xs sm:text-sm"
        >
          <span>Lanjut ke Materi Penebangan Hutan</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
