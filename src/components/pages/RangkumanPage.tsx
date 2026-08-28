import React, { useState } from 'react';
import { PageId, User } from '../../types';
import { GLOSSARY_ITEMS } from '../../data/learningData';
import { 
  BookMarked, 
  Search, 
  ArrowRight, 
  ArrowLeft,
  Sparkles, 
  Landmark, 
  Trees, 
  Droplets, 
  Globe,
  Printer,
  CheckCircle2
} from 'lucide-react';

interface RangkumanPageProps {
  onNavigate: (page: PageId) => void;
  currentUser: User;
}

export const RangkumanPage: React.FC<RangkumanPageProps> = ({
  onNavigate,
  currentUser,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<'semua' | 'sains' | 'etnosains'>('semua');

  const filteredGlossary = GLOSSARY_ITEMS.filter(item => {
    const matchesSearch = item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.definition.toLowerCase().includes(searchTerm.toLowerCase());
    if (activeCategory === 'semua') return matchesSearch;
    return matchesSearch && item.category === activeCategory;
  });

  return (
    <div className="space-y-8 pb-12 animate-fade-in w-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-sm space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700">
            <BookMarked className="w-4 h-4 text-emerald-600" />
            Halaman 13 • Sintesis & Glosarium
          </div>
          <button
            onClick={() => window.print()}
            className="px-3.5 py-1.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Cetak Rangkuman</span>
          </button>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Rangkuman Materi & Glosarium Etnosains-Biologi
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Kilas balik poin-poin esensial pembelajaran dan kamus istilah ilmiah serta kearifan lokal Melayu Langkat untuk memperkuat pemahaman konsep.
        </p>
      </div>

      {/* 4 Core Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card 1 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-2.5">
          <div className="flex items-center gap-2 font-bold text-emerald-900 text-sm sm:text-base">
            <Globe className="w-5 h-5 text-emerald-700" />
            1. Perubahan Lingkungan & Keseimbangan
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Perubahan lingkungan terjadi akibat faktor alamiah dan antropogenik. Keseimbangan ekosistem (homeostasis) dijaga oleh <strong>daya dukung</strong> (*carrying capacity*) dan <strong>daya lenting</strong> (*resilience*). Gangguan berlebih yang melampaui ambang lenting akan memicu degradasi permanen.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-2.5">
          <div className="flex items-center gap-2 font-bold text-amber-900 text-sm sm:text-base">
            <Trees className="w-5 h-5 text-amber-700" />
            2. Penebangan Hutan & Daur Hidrologi
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Deforestasi di hulu DAS Langkat memicu anjloknya kapasitas infiltrasi air hujan, meningkatkan limpasan permukaan (*surface runoff*), erosi lapisan humus, sedimentasi lumpur di sungai, serta kepunahan satwa langka endemik.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-2.5">
          <div className="flex items-center gap-2 font-bold text-sky-900 text-sm sm:text-base">
            <Droplets className="w-5 h-5 text-sky-700" />
            3. Pencemaran Lingkungan & Bioindikator
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Pencemaran air akibat deterjen domestik memicu eutrofikasi yang menurunkan kadar oksigen terlarut (DO) dan menaikkan BOD. Pencemaran udara melepaskan gas rumah kaca dan penyebab hujan asam (SOx, NOx), sementara sampah plastik merusak aerasi tanah.
          </p>
        </div>

        {/* Card 4 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-2.5">
          <div className="flex items-center gap-2 font-bold text-amber-950 text-sm sm:text-base">
            <Landmark className="w-5 h-5 text-amber-700" />
            4. Etnosains Rumah Melayu Langkat
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Arsitektur panggung bebas semen menjaga resapan air 100%, atap daun rumbia memberikan isolasi termal alami, kisi-kisi selembayung mengoptimalkan ventilasi silang, dan etika rimba larangan masyarakat adat Melayu membuktikan sains berkelanjutan ramah lingkungan.
          </p>
        </div>
      </div>

      {/* Interactive Glossary Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <Search className="w-5 h-5 text-emerald-600" />
              Glosarium Istilah Ilmiah & Etnosains Melayu
            </h2>
            <p className="text-xs text-slate-500">
              Cari dan pelajari definisi istilah biologi dan budaya lokal.
            </p>
          </div>

          {/* Filter pills */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveCategory('semua')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeCategory === 'semua' ? 'bg-white text-emerald-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              Semua ({GLOSSARY_ITEMS.length})
            </button>
            <button
              onClick={() => setActiveCategory('sains')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeCategory === 'sains' ? 'bg-white text-emerald-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              Biologi / Sains
            </button>
            <button
              onClick={() => setActiveCategory('etnosains')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeCategory === 'etnosains' ? 'bg-white text-amber-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              Etnosains Melayu
            </button>
          </div>
        </div>

        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Ketik nama istilah (misal: Eutrofikasi, Rumbia, DO, Infiltrasi, Homeostasis)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Glossary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {filteredGlossary.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-emerald-300 transition-all space-y-1.5"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-bold text-slate-900 text-xs sm:text-sm">{item.term}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                  item.category === 'etnosains' 
                    ? 'bg-amber-100 text-amber-900 border border-amber-300' 
                    : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                }`}>
                  {item.category === 'etnosains' ? 'Etnosains Melayu' : 'Biologi'}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {item.definition}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
        <button
          onClick={() => onNavigate('evaluasi')}
          className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs sm:text-sm hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Evaluasi</span>
        </button>

        <button
          id="btn-rangkuman-ke-dashboard-siswa"
          onClick={() => onNavigate('dashboard-siswa')}
          className="w-full sm:w-auto px-6 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-xs sm:text-sm"
        >
          <span>Buka Dashboard Capaian Belajar Siswa</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
