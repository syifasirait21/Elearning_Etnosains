import React, { useState } from 'react';
import { PageId, User } from '../../types';
import { ETHNOSCIENCE_FACTS } from '../../data/learningData';
import { RumahMelayuIllustration } from '../VisualAssets';
import { 
  Landmark, 
  Sparkles, 
  Sun, 
  Wind, 
  Shield, 
  Leaf, 
  HeartHandshake, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2, 
  HelpCircle,
  BookOpen,
  Info,
  Camera,
  Bot,
  Scan,
  Layers
} from 'lucide-react';

interface EtnosainsPageProps {
  onNavigate: (page: PageId) => void;
  currentUser: User;
  onOpenArExploration?: () => void;
  onOpenAiAssistant?: () => void;
}

export const EtnosainsPage: React.FC<EtnosainsPageProps> = ({
  onNavigate,
  currentUser,
  onOpenArExploration,
  onOpenAiAssistant,
}) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [interactiveMatches, setInteractiveMatches] = useState<Record<string, string>>({});
  const [matchScore, setMatchScore] = useState<number | null>(null);

  const MATCHING_ITEMS = [
    {
      id: 'm1',
      feature: 'Tiang Panggung Kayu Tanpa Cor Semen Masif',
      correctScience: 'Menjaga 100% kapasitas infiltrasi air tanah dan adaptasi banjir musiman',
      options: [
        'Meningkatkan konsumsi listrik untuk pendingin',
        'Menjaga 100% kapasitas infiltrasi air tanah dan adaptasi banjir musiman',
        'Menghambat regenerasi mikroba dekomposer'
      ]
    },
    {
      id: 'm2',
      feature: 'Atap Anyaman Daun Rumbia (Metroxylon sagu)',
      correctScience: 'Konduktivitas termal rendah (isolator alami) menurunkan suhu ruangan',
      options: [
        'Mempercepat pelapukan batu pondasi',
        'Konduktivitas termal rendah (isolator alami) menurunkan suhu ruangan',
        'Menghasilkan emisi sulfur dioksida ke udara'
      ]
    },
    {
      id: 'm3',
      feature: 'Kisi-kisi Ukiran Ventilasi Selembayung',
      correctScience: 'Cross-ventilation kontinu mencegah kelembaban jamur patogen',
      options: [
        'Cross-ventilation kontinu mencegah kelembaban jamur patogen',
        'Menghilangkan seluruh oksigen dalam ruangan',
        'Menaikkan titik didih air di dalam rumah'
      ]
    }
  ];

  const handleMatchSelect = (itemId: string, choice: string) => {
    setInteractiveMatches(prev => ({ ...prev, [itemId]: choice }));
  };

  const checkMatching = () => {
    let correct = 0;
    MATCHING_ITEMS.forEach(item => {
      if (interactiveMatches[item.id] === item.correctScience) {
        correct++;
      }
    });
    setMatchScore(correct);
  };

  return (
    <div className="space-y-8 pb-12 animate-fade-in w-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-100 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700">
          <Landmark className="w-4 h-4 text-amber-600" />
          Halaman 5 • Eksplorasi Etnosains
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Etnosains Rumah Melayu Langkat & Konservasi Lingkungan
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Etnosains adalah perpaduan antara pengetahuan lokal (kearifan tradisional masyarakat) dengan konsep sains ilmiah. Di Kabupaten Langkat, Sumatera Utara, arsitektur Rumah Melayu tradisional bukan sekadar estetika budaya, melainkan bentuk kecerdasan ekologis dalam menjaga keseimbangan alam dan beradaptasi terhadap dinamika lingkungan.
        </p>
      </div>

      {/* Hero Visual Card */}
      <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-amber-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-amber-700/50 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold uppercase tracking-wider">
              Kearifan Lokal Tepian Sungai & Pesisir Langkat
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug">
              Harmoni Manusia, Arsitektur, dan Ekosistem Alam
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
              Masyarakat Melayu Langkat hidup berdampingan dengan bentang alam Daerah Aliran Sungai (DAS) Batang Serangan, Sungai Wampu, dan hutan mangrove pesisir Selat Malaka. Pola permukiman panggung dan pemanfaatan biomaterial alami mencerminkan etika mendalam: meminimalisir jejak ekologis dan menjaga daur hidrologi.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                <div className="text-amber-300 font-bold text-xs">Pemanfaatan Berkelanjutan</div>
                <div className="text-[11px] text-emerald-200 mt-0.5">Kayu keras pilihan & daun rumbia tanpa deforestasi masif</div>
              </div>
              <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                <div className="text-amber-300 font-bold text-xs">Adaptasi Iklim Mikro</div>
                <div className="text-[11px] text-emerald-200 mt-0.5">Sirkulasi udara alami dan pengendalian suhu tropis</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-emerald-950/90 rounded-2xl p-2 border border-amber-500/40 shadow-inner">
              <RumahMelayuIllustration className="w-full h-auto rounded-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* FEATURE: AUGMENTED REALITY (AR) EXPLORATION BANNER */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white border-2 border-emerald-500/40 shadow-xl space-y-5">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5 text-emerald-400" />
                Fitur Unggulan Interaktif
              </span>
              <span className="bg-amber-400/20 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                AR Marker-Based 3D
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug">
              🏛️ Eksplorasi AR Rumah Melayu Langkat
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Eksplorasi struktur Rumah Melayu Langkat secara imersif menggunakan Augmented Reality (AR) berbasis kamera. Arahkan kamera ke marker untuk memunculkan model 3D interaktif dan gunakan tombol <strong>“Hubungkan dengan Sains”</strong> guna mengungkap adaptasi hidrologi pasang surut Sungai Wampu serta termoregulasi alami.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-emerald-200">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                5 Komponen Arsitektur
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Matriks Analisis Sains Biologi
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Mode Kamera & Virtual 3D
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 w-full md:w-auto shrink-0">
            {onOpenArExploration && (
              <button
                id="btn-launch-ar-etnosains"
                onClick={onOpenArExploration}
                className="w-full px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-extrabold text-xs sm:text-sm shadow-lg transition-all flex items-center justify-center gap-2 hover:scale-[1.02]"
              >
                <Camera className="w-5 h-5 text-slate-950" />
                <span>Buka Eksplorasi AR</span>
              </button>
            )}

            {onOpenAiAssistant && (
              <button
                id="btn-ask-ai-etnosains"
                onClick={onOpenAiAssistant}
                className="w-full px-5 py-2.5 rounded-2xl bg-emerald-900/80 hover:bg-emerald-800 text-emerald-200 border border-emerald-700/60 font-bold text-xs transition-all flex items-center justify-center gap-2"
              >
                <Bot className="w-4 h-4 text-amber-300" />
                <span>Tanya Asisten AI</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Section: TAHUKAH KAMU? (Interactive Facts Accordion / Tabs) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700">
          <Sparkles className="w-4 h-4 text-amber-600" />
          Fakta Menarik Etnosains
        </div>
        <h2 className="text-xl font-bold text-slate-900">
          TAHUKAH KAMU? 5 Unsur Ekologis Rumah Melayu Langkat
        </h2>

        {/* Tab Buttons */}
        <div className="flex flex-wrap gap-2">
          {ETHNOSCIENCE_FACTS.map((fact, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === idx
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span>{idx + 1}.</span>
              <span className="truncate max-w-[140px] sm:max-w-none">{fact.title.split('(')[0]}</span>
            </button>
          ))}
        </div>

        {/* Active Fact Detail Card */}
        <div className="bg-amber-50/60 rounded-2xl p-5 sm:p-6 border border-amber-200 space-y-5 animate-fade-in">
          <div className="space-y-1">
            <h3 className="font-bold text-amber-950 text-base sm:text-lg">
              {ETHNOSCIENCE_FACTS[activeTab].title}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Local Wisdom Box */}
            <div className="bg-white p-4 rounded-xl border border-amber-200/80 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase text-amber-800">
                <Landmark className="w-4 h-4 text-amber-600" />
                Pengetahuan Lokal Tradisional Melayu
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {ETHNOSCIENCE_FACTS[activeTab].localWisdom}
              </p>
            </div>

            {/* Science Connection Box */}
            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase text-emerald-800">
                <BookOpen className="w-4 h-4 text-emerald-600" />
                Hubungan dengan Konsep Biologi & Sains
              </div>
              <p className="text-xs sm:text-sm text-emerald-950 leading-relaxed font-medium">
                {ETHNOSCIENCE_FACTS[activeTab].scienceConnection}
              </p>
            </div>
          </div>

          {onOpenArExploration && (
            <div className="pt-2 flex justify-end">
              <button
                id={`btn-explore-ar-tab-${activeTab}`}
                onClick={onOpenArExploration}
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-xs hover:shadow-md"
              >
                <Camera className="w-4 h-4 text-amber-200" />
                <span>🏛️ Eksplorasi Struktur Ini di AR 3D</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Section: HUBUNGKAN DENGAN SAINS (Comparative Table) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="space-y-1">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" />
            Integrasi Konseptual
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            Hubungkan dengan Sains Biologi
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Matriks keterkaitan kearifan arsitektur Melayu Langkat dengan konsep-konsep biologis modern.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-emerald-900 text-white font-bold uppercase text-[11px]">
              <tr>
                <th className="p-3.5 border-b border-emerald-800">Unsur Budaya / Etnosains</th>
                <th className="p-3.5 border-b border-emerald-800">Konsep Biologi & Lingkungan</th>
                <th className="p-3.5 border-b border-emerald-800">Manfaat Ekologis Berkelanjutan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-bold text-slate-800">Tiang Panggung Bebas Semen Masif</td>
                <td className="p-3.5 text-slate-700">Daur Hidrologi & Laju Infiltrasi Air Tanah</td>
                <td className="p-3.5 text-emerald-800 font-medium">Mengurangi koefisien limpasan (runoff) banjir & mengisi akuifer air tanah</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-bold text-slate-800">Atap Daun Rumbia (Nypa/Sagu)</td>
                <td className="p-3.5 text-slate-700">Termoregulasi & Isolasi Termal Selulosa</td>
                <td className="p-3.5 text-emerald-800 font-medium">Mengurangi konsumsi energi listrik pendingin buatan (hemat karbon)</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-bold text-slate-800">Kisi-Kisi Ventilasi Ukir Kayu</td>
                <td className="p-3.5 text-slate-700">Cross-Ventilation & Mikrobiologi Lingkungan</td>
                <td className="p-3.5 text-emerald-800 font-medium">Mengatur kelembaban udara sehingga menekan pertumbuhan jamur patogen</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-bold text-slate-800">Zonasi Rimba Larangan & Pohon Sialang</td>
                <td className="p-3.5 text-slate-700">Konservasi Polinator (*Apis dorsata*) & Plasma Nutfah</td>
                <td className="p-3.5 text-emerald-800 font-medium">Menjaga kelangsungan penyerbukan alami flora hutan tropis Langkat</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Mini Interactive Activity: Matching Exercise */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="space-y-1">
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-700 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            Aktivitas Interaktif Mandiri
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            Uji Pemahaman: Pasangkan Elemen Budaya dengan Penjelasan Sainsnya
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Pilihlah penjelasan sains yang paling tepat untuk masing-masing fitur arsitektur Rumah Melayu Langkat.
          </p>
        </div>

        <div className="space-y-4">
          {MATCHING_ITEMS.map((item, idx) => (
            <div key={item.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2.5">
              <div className="text-xs font-bold text-slate-800 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] flex items-center justify-center font-bold">
                  {idx + 1}
                </span>
                <span>{item.feature}</span>
              </div>

              <select
                value={interactiveMatches[item.id] || ''}
                onChange={(e) => handleMatchSelect(item.id, e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">-- Pilih Penjelasan Sains yang Sesuai --</option>
                {item.options.map((opt, oIdx) => (
                  <option key={oIdx} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          ))}

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={checkMatching}
              className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-colors"
            >
              Cek Jawaban Pencocokan
            </button>

            {matchScore !== null && (
              <div className={`text-xs font-bold px-4 py-2 rounded-xl border ${
                matchScore === 3
                  ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                  : 'bg-amber-100 text-amber-900 border-amber-300'
              }`}>
                {matchScore === 3 ? '🎉 Luar Biasa! Semua Pasangan Benar (3/3)' : `Skor: ${matchScore}/3 Benar. Coba periksa kembali pilihan Anda.`}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
        <button
          onClick={() => onNavigate('orientasi')}
          className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs sm:text-sm hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Orientasi Masalah</span>
        </button>

        <button
          id="btn-etnosains-ke-materi-perubahan"
          onClick={() => onNavigate('materi-perubahan')}
          className="w-full sm:w-auto px-6 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-xs sm:text-sm"
        >
          <span>Lanjut ke Materi Perubahan Lingkungan</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
