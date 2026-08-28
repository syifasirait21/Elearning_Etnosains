import React, { useState, useEffect } from 'react';
import { PageId, User, CaseStudyAnswer } from '../../types';
import { getStudentProgress, saveCaseStudyAnswer } from '../../lib/storage';
import { WaterPollutionIllustration } from '../VisualAssets';
import { 
  Droplets, 
  Wind, 
  Layers, 
  Send, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  AlertTriangle, 
  Sparkles, 
  FileText,
  ShieldCheck
} from 'lucide-react';

interface MateriPencemaranPageProps {
  onNavigate: (page: PageId) => void;
  currentUser: User;
}

export const MateriPencemaranPage: React.FC<MateriPencemaranPageProps> = ({
  onNavigate,
  currentUser,
}) => {
  const [activePollutionTab, setActivePollutionTab] = useState<'air' | 'udara' | 'tanah'>('air');
  const [caseForm, setCaseForm] = useState<CaseStudyAnswer>({
    caseId: 'pencemaran-sungai',
    masalah: '',
    penyebab: '',
    dampak: '',
    solusi: ''
  });
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const prog = getStudentProgress(currentUser.id);
    if (prog && prog.caseAnswers && prog.caseAnswers['pencemaran-sungai']) {
      setCaseForm(prog.caseAnswers['pencemaran-sungai']);
      setIsSaved(true);
    }
  }, [currentUser.id]);

  const handleSaveCase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!caseForm.masalah || !caseForm.penyebab || !caseForm.dampak || !caseForm.solusi) {
      alert('Silakan isi seluruh formulir analisis kasus pencemaran.');
      return;
    }

    saveCaseStudyAnswer(currentUser.id, caseForm);
    setIsSaved(true);
  };

  return (
    <div className="space-y-8 pb-12 animate-fade-in w-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-700">
          <Droplets className="w-4 h-4 text-sky-600" />
          Halaman 8 • Materi Inti 3
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Materi Pencemaran Lingkungan: Air, Udara, & Tanah
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Pencemaran lingkungan (*environmental pollution*) terjadi ketika zat pencemar (polutan) masuk ke dalam biosfer dalam jumlah yang melebihi ambang batas baku mutu lingkungan, sehingga menurunkan kualitas ekologis secara signifikan.
        </p>
      </div>

      {/* Visual Diagram Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Droplets className="w-5 h-5 text-sky-700" />
          Mekanisme Biologis Eutrofikasi & Pencemaran Air Sungai
        </h2>
        <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 p-2 sm:p-4">
          <WaterPollutionIllustration className="w-full h-auto rounded-xl shadow-xs" />
        </div>
      </div>

      {/* Interactive 3 Pollution Types Tabs */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              Klasifikasi Jenis Pencemaran Lingkungan
            </h2>
            <p className="text-xs text-slate-500">
              Pelajari sumber, parameter kimiawi/biologis, dan dampaknya.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setActivePollutionTab('air')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activePollutionTab === 'air'
                  ? 'bg-sky-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Droplets className="w-3.5 h-3.5" />
              1. Air
            </button>
            <button
              onClick={() => setActivePollutionTab('udara')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activePollutionTab === 'udara'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Wind className="w-3.5 h-3.5" />
              2. Udara
            </button>
            <button
              onClick={() => setActivePollutionTab('tanah')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activePollutionTab === 'tanah'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              3. Tanah
            </button>
          </div>
        </div>

        {/* Tab 1: Pencemaran Air */}
        {activePollutionTab === 'air' && (
          <div className="space-y-4 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 space-y-1.5">
                <div className="font-bold text-sky-950 text-xs sm:text-sm">Sumber Pencemar Air</div>
                <p className="text-xs text-sky-900 leading-relaxed">
                  Limbah cair rumah tangga (deterjen fosfat), limbah industri pabrik kelapa sawit (POME), pestisida pertanian, dan sampah plastik domestik.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 space-y-1.5">
                <div className="font-bold text-sky-950 text-xs sm:text-sm">Parameter Uji Kualitas</div>
                <p className="text-xs text-sky-900 leading-relaxed">
                  <strong>DO (Dissolved Oxygen):</strong> Oksigen terlarut anjlok (&lt;2 mg/L).<br/>
                  <strong>BOD (Biological Oxygen Demand):</strong> Melonjak tinggi karena konsumsi oksigen mikroba pengurai.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 space-y-1.5">
                <div className="font-bold text-sky-950 text-xs sm:text-sm">Dampak & Solusi</div>
                <p className="text-xs text-sky-900 leading-relaxed">
                  Kematian massal ikan akibat hipoksia. Solusi: Pembangunan IPAL komunal, biofiltrasi tanaman air, dan larangan membuang limbah langsung ke sungai.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Pencemaran Udara */}
        {activePollutionTab === 'udara' && (
          <div className="space-y-4 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-1.5">
                <div className="font-bold text-amber-950 text-xs sm:text-sm">Sumber Gas Pencemar</div>
                <p className="text-xs text-amber-900 leading-relaxed">
                  Gas buang kendaraan bermotor (CO, NOx), pembakaran sampah/lahan gambut (karbon dioksida & jelaga PM2.5), emisi pabrik (SOx).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-1.5">
                <div className="font-bold text-amber-950 text-xs sm:text-sm">Mekanisme Hujan Asam</div>
                <p className="text-xs text-amber-900 leading-relaxed">
                  SO2 dan NOx bereaksi dengan uap air membentuk asam sulfat (H2SO4) dan asam nitrat (HNO3), menurunkan pH air hujan hingga &lt; 5.6 yang merusak kutikula daun.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-1.5">
                <div className="font-bold text-amber-950 text-xs sm:text-sm">Dampak & Solusi</div>
                <p className="text-xs text-amber-900 leading-relaxed">
                  ISPA dan gangguan respirasi manusia. Solusi: Penanaman pohon peneduh penyerap polutan di pekarangan dan peralihan ke transportasi ramah lingkungan.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Pencemaran Tanah */}
        {activePollutionTab === 'tanah' && (
          <div className="space-y-4 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1.5">
                <div className="font-bold text-emerald-950 text-xs sm:text-sm">Sumber Polutan Tanah</div>
                <p className="text-xs text-emerald-900 leading-relaxed">
                  Limbah plastik sekali pakai yang tidak terurai (*non-biodegradable*), residu insektisida kimia, dan limbah logam berat (Pb, Cd).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1.5">
                <div className="font-bold text-emerald-950 text-xs sm:text-sm">Dampak terhadap Dekomposer</div>
                <p className="text-xs text-emerald-900 leading-relaxed">
                  Merusak struktur aerasi tanah, membunuh mikroorganisme dekomposer (bakteri nitrifikasi & jamur mikoriza), serta mereduksi cacing tanah.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1.5">
                <div className="font-bold text-emerald-950 text-xs sm:text-sm">Solusi Bioremediasi</div>
                <p className="text-xs text-emerald-900 leading-relaxed">
                  Penerapan biopori, pengomposan sampah organik, pemilahan 5R, dan bioremediasi fitoremediasi menggunakan tanaman lokal pengikat racun tanah.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Structured Case Activity Form */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sky-200 shadow-md space-y-6">
        <div className="space-y-1">
          <div className="text-xs font-bold uppercase tracking-wider text-sky-800 flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-sky-600" />
            Aktivitas Analisis Kasus Pencemaran
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            Analisis Kasus 2: Pembuangan Limbah Domestik di Sungai Pemukiman
          </h2>
          <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 text-xs text-sky-950 leading-relaxed mt-2">
            <span className="font-bold">Kasus Faktual:</span> Di salah satu anak sungai DAS Langkat yang mengalir melewati kawasan padat penduduk, warga membuang air cucian deterjen dan sampah dapur langsung ke sungai tanpa penyaringan. Dalam beberapa bulan, air sungai berubah warna menjadi keruh kehitaman, berbau menyengat, permukaan air dipenuhi eceng gondok tebal, dan ikan nila lokal mati mengapung.
          </div>
        </div>

        <form onSubmit={handleSaveCase} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              1. Identifikasi Jenis Pencemaran: Jenis pencemaran apa yang terjadi pada kasus di atas? *
            </label>
            <input
              type="text"
              required
              value={caseForm.masalah}
              onChange={(e) => setCaseForm({ ...caseForm, masalah: e.target.value })}
              placeholder="Contoh: Pencemaran air sungai akibat limbah organik & deterjen fosfat..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 text-xs sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              2. Menentukan Sumber Pencemar: Dari mana saja sumber bahan pencemar tersebut berasal? *
            </label>
            <input
              type="text"
              required
              value={caseForm.penyebab}
              onChange={(e) => setCaseForm({ ...caseForm, penyebab: e.target.value })}
              placeholder="Contoh: Air limbah deterjen rumah tangga, sisa makanan dapur, saluran septic tank bocor..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 text-xs sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              3. Menganalisis Dampak Biologis: Mengapa ledakan eceng gondok memicu kematian ikan secara massal? *
            </label>
            <textarea
              required
              rows={2}
              value={caseForm.dampak}
              onChange={(e) => setCaseForm({ ...caseForm, dampak: e.target.value })}
              placeholder="Uraikan proses eutrofikasi, terhalangnya sinar matahari, pembusukan tumbuhan, dan anjloknya kadar oksigen terlarut (DO)..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 text-xs sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              4. Menentukan Solusi Konkret: Apa solusi teknis dan partisipatif warga yang tepat untuk merehabilitasi sungai tersebut? *
            </label>
            <textarea
              required
              rows={2}
              value={caseForm.solusi}
              onChange={(e) => setCaseForm({ ...caseForm, solusi: e.target.value })}
              placeholder="Contoh: Pembuatan instalasi pengolah limbah komunal, ecobrick/pemilahan sampah, pembersihan eceng gondok berkala..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 text-xs sm:text-sm"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              id="btn-save-case-pencemaran"
              className="px-6 py-3 bg-sky-700 hover:bg-sky-800 text-white font-bold rounded-xl shadow-md transition-all flex items-center gap-2 text-xs sm:text-sm"
            >
              <Send className="w-4 h-4" />
              <span>Simpan Analisis Kasus Pencemaran</span>
            </button>
          </div>
        </form>

        {isSaved && (
          <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 text-sky-900 space-y-2 animate-fade-in">
            <div className="flex items-center gap-2 font-bold text-sm text-sky-950">
              <CheckCircle2 className="w-5 h-5 text-sky-600" />
              Hasil Analisis Pencemaran Tersimpan!
            </div>
            <p className="text-xs text-sky-800 leading-relaxed">
              Pemahaman Anda tentang parameter BOD, DO, dan eutrofikasi telah teruji dengan baik. Mari kita asah keterampilan literasi lingkungan Anda melalui beragam aktivitas terpadu di halaman berikutnya!
            </p>
          </div>
        )}
      </div>

      {/* Navigation Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
        <button
          onClick={() => onNavigate('materi-penebangan')}
          className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs sm:text-sm hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Penebangan Hutan</span>
        </button>

        <button
          id="btn-materi-pencemaran-ke-literasi"
          onClick={() => onNavigate('aktivitas-literasi')}
          className="w-full sm:w-auto px-6 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-xs sm:text-sm"
        >
          <span>Lanjut ke Aktivitas Latihan Literasi</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
