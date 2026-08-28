import React from 'react';
import { PageId, User } from '../../types';
import { 
  Target, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  Sparkles, 
  BookOpen, 
  Globe, 
  ShieldCheck,
  Trees,
  Droplets,
  Heart,
  Landmark
} from 'lucide-react';

interface TujuanPageProps {
  onNavigate: (page: PageId) => void;
  currentUser: User;
}

export const TujuanPage: React.FC<TujuanPageProps> = ({
  onNavigate,
  currentUser,
}) => {
  const TUJUAN_LIST = [
    {
      num: 1,
      title: 'Menjelaskan Konsep Perubahan Lingkungan',
      desc: 'Peserta didik mampu menjelaskan konsep perubahan lingkungan, keseimbangan ekosistem, daya dukung (carrying capacity), dan daya lenting (resilience) lingkungan secara ilmiah.',
      icon: Globe,
      color: 'bg-emerald-100 text-emerald-800'
    },
    {
      num: 2,
      title: 'Mengidentifikasi Penyebab Perubahan Lingkungan',
      desc: 'Peserta didik mampu membedakan faktor penyebab alami (bencana vulkanik, iklim) dan faktor aktivitas manusia (antropogenik) dalam dinamika lingkungan hidup.',
      icon: Target,
      color: 'bg-teal-100 text-teal-800'
    },
    {
      num: 3,
      title: 'Menganalisis Dampak Penebangan Hutan',
      desc: 'Peserta didik mampu menganalisis dampak penebangan hutan terhadap degradasi struktur tanah, daur hidrologi DAS Langkat, erosi, sedimentasi banjir, dan ancaman keanekaragaman hayati.',
      icon: Trees,
      color: 'bg-amber-100 text-amber-800'
    },
    {
      num: 4,
      title: 'Menganalisis Pencemaran Lingkungan',
      desc: 'Peserta didik mampu menganalisis berbagai jenis pencemaran (air, udara, dan tanah), parameter kualitas lingkungan (DO, BOD, pH, PM2.5), serta proses bioakumulasi dalam rantai makanan.',
      icon: Droplets,
      color: 'bg-sky-100 text-sky-800'
    },
    {
      num: 5,
      title: 'Menghubungkan Aktivitas Manusia dengan Perubahan Lingkungan',
      desc: 'Peserta didik mampu menghubungkan gaya hidup modern dan eksploitasi sumber daya dengan gangguan daur biogeokimia dan ketidakseimbangan biosfer.',
      icon: BookOpen,
      color: 'bg-indigo-100 text-indigo-800'
    },
    {
      num: 6,
      title: 'Mengintegrasikan Etnosains Rumah Melayu Langkat',
      desc: 'Peserta didik mampu menganalisis nilai sains dalam kearifan lokal arsitektur tradisional Melayu Langkat (rumah panggung, atap rumbia, ventilasi silang, dan etika adat rimba) sebagai wujud adaptasi ekologis berkelanjutan.',
      icon: Landmark,
      color: 'bg-amber-100 text-amber-900'
    },
    {
      num: 7,
      title: 'Menganalisis Masalah Sekitar & Menentukan Solusi',
      desc: 'Peserta didik mampu mengidentifikasi permasalahan lingkungan kontekstual di sekitar tempat tinggal dan merumuskan alternatif solusi ilmiah yang aplikatif.',
      icon: ShieldCheck,
      color: 'bg-emerald-100 text-emerald-900'
    },
    {
      num: 8,
      title: 'Menunjukkan Sikap Peduli terhadap Lingkungan',
      desc: 'Peserta didik mampu menunjukkan komitmen, etika lingkungan, dan tindakan nyata dalam pelestarian alam demi keberlanjutan generasi masa depan.',
      icon: Heart,
      color: 'bg-rose-100 text-rose-800'
    }
  ];

  return (
    <div className="space-y-8 pb-12 animate-fade-in w-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700">
          <Target className="w-4 h-4 text-emerald-600" />
          Halaman 3 • Tujuan Pembelajaran
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Tujuan Pembelajaran & Penguatan Literasi Lingkungan
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Setelah menyelesaikan rangkaian modul pembelajaran ini, peserta didik diharapkan mencapai delapan tujuan pembelajaran yang dirancang untuk mengasah pemahaman sains dan keterampilan literasi lingkungan.
        </p>
      </div>

      {/* 8 Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {TUJUAN_LIST.map((item) => {
          const IconC = item.icon;
          return (
            <div 
              key={item.num}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all flex items-start gap-4"
            >
              <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center shrink-0 font-bold text-base mt-0.5`}>
                {item.num}
              </div>
              <div className="space-y-1.5 flex-1">
                <h3 className="font-bold text-slate-800 text-sm sm:text-base leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Focus Indicator Card */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 rounded-3xl p-6 sm:p-8 text-white space-y-4 shadow-lg">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          Dimensi Penguatan Literasi Lingkungan
        </div>
        <h2 className="text-lg sm:text-xl font-bold">
          Apa yang Dilatihkan dalam E-Learning Ini?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="bg-white/10 p-4 rounded-xl backdrop-blur-xs space-y-1 border border-white/10">
            <div className="font-bold text-amber-300">1. Pengetahuan Ekologis</div>
            <p className="text-emerald-100">
              Memahami keterkaitan sistem abiotik-biotik, siklus alam, dan kearifan lokal Melayu Langkat.
            </p>
          </div>
          <div className="bg-white/10 p-4 rounded-xl backdrop-blur-xs space-y-1 border border-white/10">
            <div className="font-bold text-amber-300">2. Keterampilan Analisis</div>
            <p className="text-emerald-100">
              Mampu menganalisis data kerusakan lingkungan, mengurai hubungan sebab-akibat, dan mengevaluasi kasus.
            </p>
          </div>
          <div className="bg-white/10 p-4 rounded-xl backdrop-blur-xs space-y-1 border border-white/10">
            <div className="font-bold text-amber-300">3. Solusi & Aksi Nyata</div>
            <p className="text-emerald-100">
              Mampu menentukan alternatif pemecahan masalah dan membangun sikap kepedulian lingkungan hidup.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
        <button
          onClick={() => onNavigate('petunjuk')}
          className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs sm:text-sm hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Petunjuk</span>
        </button>

        <button
          id="btn-tujuan-ke-orientasi"
          onClick={() => onNavigate('orientasi')}
          className="w-full sm:w-auto px-6 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-xs sm:text-sm"
        >
          <span>Lanjut ke Orientasi Permasalahan Lingkungan</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
