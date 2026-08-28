import React, { useState, useEffect } from 'react';
import { PageId, User, OrientasiAnswer } from '../../types';
import { getStudentProgress, saveOrientasiAnswers } from '../../lib/storage';
import { DeforestationIllustration, WaterPollutionIllustration } from '../VisualAssets';
import { 
  AlertTriangle, 
  Send, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  Sparkles, 
  Trees, 
  Droplets, 
  HelpCircle,
  MessageSquare
} from 'lucide-react';

interface OrientasiPageProps {
  onNavigate: (page: PageId) => void;
  currentUser: User;
}

export const OrientasiPage: React.FC<OrientasiPageProps> = ({
  onNavigate,
  currentUser,
}) => {
  const [answers, setAnswers] = useState<OrientasiAnswer>({
    q1: '',
    q2: '',
    q3: '',
    q4: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeTabVisual, setActiveTabVisual] = useState<'forest' | 'water'>('forest');

  useEffect(() => {
    const prog = getStudentProgress(currentUser.id);
    if (prog && prog.orientasiAnswers) {
      setAnswers(prog.orientasiAnswers);
      if (prog.orientasiAnswers.submittedAt) {
        setIsSubmitted(true);
      }
    }
  }, [currentUser.id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!answers.q1 || !answers.q2 || !answers.q3 || !answers.q4) {
      alert('Silakan lengkapi seluruh pertanyaan pemantik sebelum mengirimkan jawaban.');
      return;
    }

    saveOrientasiAnswers(currentUser.id, answers);
    setIsSubmitted(true);
  };

  return (
    <div className="space-y-8 pb-12 animate-fade-in w-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700">
          <AlertTriangle className="w-4 h-4 text-amber-600" />
          Halaman 4 • Orientasi Permasalahan Lingkungan
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Orientasi Masalah: Fenomena Kerusakan Lingkungan
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Sebelum mendalami konsep biologi dan kearifan lokal etnosains, amatilah fenomena nyata kondisi lingkungan di bawah ini. Cermati perubahan yang terjadi pada ekosistem hutan dan perairan sungai di sekitar kita.
        </p>
      </div>

      {/* Visual Investigation Tabs */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
            <h2 className="font-bold text-slate-800 text-base">
              Amati Fenomena Faktual Lingkungan
            </h2>
          </div>

          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveTabVisual('forest')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTabVisual === 'forest'
                  ? 'bg-white text-emerald-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Trees className="w-3.5 h-3.5 text-emerald-700" />
              Kasus 1: Deforestasi & Erosi
            </button>
            <button
              onClick={() => setActiveTabVisual('water')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTabVisual === 'water'
                  ? 'bg-white text-sky-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Droplets className="w-3.5 h-3.5 text-sky-700" />
              Kasus 2: Pencemaran Sungai
            </button>
          </div>
        </div>

        {/* Visual Display */}
        <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 p-2 sm:p-4">
          {activeTabVisual === 'forest' ? (
            <div className="space-y-3">
              <DeforestationIllustration className="w-full h-auto rounded-xl shadow-xs" />
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 leading-relaxed">
                <span className="font-bold text-emerald-950">Catatan Pengamatan:</span> Kawasan hulu yang ditebang mengalami kehilangan vegetasi penahan tanah, memicu tingginya limpasan air hujan (runoff) dan erosi lapisan humus yang membawa sedimentasi lumpur menuju aliran sungai di hilir.
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <WaterPollutionIllustration className="w-full h-auto rounded-xl shadow-xs" />
              <div className="p-4 bg-sky-50 rounded-xl border border-sky-200 text-xs text-sky-900 leading-relaxed">
                <span className="font-bold text-sky-950">Catatan Pengamatan:</span> Pembuangan limbah deterjen fosfat dan sampah domestik memicu ledakan populasi tanaman air (eutrofikasi), menghalangi sinar matahari, menurunkan kadar oksigen terlarut (DO), dan mengancam kehidupan biota perairan.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 4 Interactive Prompt Questions Form */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="space-y-1">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1.5">
            <MessageSquare className="w-4 h-4" />
            Refleksi Awal Peserta Didik
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            Jawab Pertanyaan Pemantik Berikut
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Tuliskan pemikiran awal Anda sebelum mempelajari teori materi. Jawaban Anda akan tersimpan sebagai bekal analisis kritis.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Q1 */}
          <div className="space-y-2">
            <label className="block text-xs sm:text-sm font-bold text-slate-800">
              1. Apa yang terjadi pada lingkungan tersebut berdasarkan pengamatanmu? *
            </label>
            <textarea
              required
              rows={3}
              value={answers.q1}
              onChange={(e) => setAnswers({ ...answers, q1: e.target.value })}
              placeholder="Jelaskan kondisi perubahan fisik, visual, dan kondisi alam yang kamu amati..."
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-xs sm:text-sm"
            />
          </div>

          {/* Q2 */}
          <div className="space-y-2">
            <label className="block text-xs sm:text-sm font-bold text-slate-800">
              2. Menurutmu, apa faktor utama penyebab terjadinya peristiwa tersebut? *
            </label>
            <textarea
              required
              rows={3}
              value={answers.q2}
              onChange={(e) => setAnswers({ ...answers, q2: e.target.value })}
              placeholder="Apakah karena faktor alamiah atau akibat aktivitas manusia (antropogenik)? Jelaskan..."
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-xs sm:text-sm"
            />
          </div>

          {/* Q3 */}
          <div className="space-y-2">
            <label className="block text-xs sm:text-sm font-bold text-slate-800">
              3. Bagaimana dampaknya bagi kelangsungan hidup makhluk hidup (hewan, tumbuhan, manusia)? *
            </label>
            <textarea
              required
              rows={3}
              value={answers.q3}
              onChange={(e) => setAnswers({ ...answers, q3: e.target.value })}
              placeholder="Uraikan dampak biologis terhadap rantai makanan, habitat, dan kesehatan manusia..."
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-xs sm:text-sm"
            />
          </div>

          {/* Q4 */}
          <div className="space-y-2">
            <label className="block text-xs sm:text-sm font-bold text-slate-800">
              4. Menurut gagasanmu, apa yang dapat dilakukan untuk mengatasi permasalahan tersebut? *
            </label>
            <textarea
              required
              rows={3}
              value={answers.q4}
              onChange={(e) => setAnswers({ ...answers, q4: e.target.value })}
              placeholder="Tuliskan ide solusi atau tindakan nyata yang dapat diterapkan secara berkelanjutan..."
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-xs sm:text-sm"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              id="btn-submit-orientasi"
              className="px-6 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-md transition-all flex items-center gap-2 text-xs sm:text-sm"
            >
              <Send className="w-4 h-4" />
              <span>Simpan & Kirim Jawaban Refleksi</span>
            </button>
          </div>
        </form>

        {/* Feedback / Saved Banner */}
        {isSubmitted && (
          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-2 animate-fade-in">
            <div className="flex items-center gap-2 font-bold text-sm text-emerald-950">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              Jawaban Orientasi Masalah Berhasil Tersimpan!
            </div>
            <p className="text-xs text-emerald-800 leading-relaxed">
              Pemikiran awal Anda telah terekam. Selanjutnya, mari kita telusuri bagaimana masyarakat Melayu Langkat secara turun-temurun mengintegrasikan sains dan kearifan lokal dalam arsitektur Rumah Melayu untuk mencegah kerusakan lingkungan dan beradaptasi terhadap banjir!
            </p>
          </div>
        )}
      </div>

      {/* Navigation Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
        <button
          onClick={() => onNavigate('tujuan')}
          className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs sm:text-sm hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Tujuan</span>
        </button>

        <button
          id="btn-orientasi-ke-etnosains"
          onClick={() => onNavigate('etnosains')}
          className="w-full sm:w-auto px-6 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-xs sm:text-sm"
        >
          <span>Lanjut ke Eksplorasi Etnosains Rumah Melayu</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
