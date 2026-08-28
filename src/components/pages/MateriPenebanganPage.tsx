import React, { useState, useEffect } from 'react';
import { PageId, User, CaseStudyAnswer } from '../../types';
import { getStudentProgress, saveCaseStudyAnswer } from '../../lib/storage';
import { DeforestationIllustration } from '../VisualAssets';
import { 
  Trees, 
  AlertTriangle, 
  Send, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  Sparkles, 
  Layers, 
  Droplets,
  ShieldCheck,
  FileText
} from 'lucide-react';

interface MateriPenebanganPageProps {
  onNavigate: (page: PageId) => void;
  currentUser: User;
}

export const MateriPenebanganPage: React.FC<MateriPenebanganPageProps> = ({
  onNavigate,
  currentUser,
}) => {
  const [caseForm, setCaseForm] = useState<CaseStudyAnswer>({
    caseId: 'penebangan-hutan',
    masalah: '',
    penyebab: '',
    dampak: '',
    hubunganSebabAkibat: '',
    solusi: ''
  });
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const prog = getStudentProgress(currentUser.id);
    if (prog && prog.caseAnswers && prog.caseAnswers['penebangan-hutan']) {
      setCaseForm(prog.caseAnswers['penebangan-hutan']);
      setIsSaved(true);
    }
  }, [currentUser.id]);

  const handleSaveCase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!caseForm.masalah || !caseForm.penyebab || !caseForm.dampak || !caseForm.solusi) {
      alert('Silakan isi seluruh kolom analisis kasus penebangan hutan.');
      return;
    }

    saveCaseStudyAnswer(currentUser.id, caseForm);
    setIsSaved(true);
  };

  return (
    <div className="space-y-8 pb-12 animate-fade-in w-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700">
          <Trees className="w-4 h-4 text-emerald-600" />
          Halaman 7 • Materi Inti 2
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Materi Penebangan Hutan, Daur Hidrologi, & Degradasi Tanah
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Hutan tropis berfungsi sebagai spons penyerap air hujan raksasa, penyedia oksigen, pengikat agregat tanah, dan benteng keanekaragaman hayati. Hilangnya tutupan vegetasi hutan di kawasan Daerah Aliran Sungai (DAS) Langkat berdampak langsung pada rantai bencana ekologis.
        </p>
      </div>

      {/* Visual Infographic Diagram */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Layers className="w-5 h-5 text-emerald-700" />
          Komparasi Bio-Fisik: Hutan Lestari vs Lahan Terdeforestasi
        </h2>
        <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 p-2 sm:p-4">
          <DeforestationIllustration className="w-full h-auto rounded-xl shadow-xs" />
        </div>
      </div>

      {/* 4 Deep Ecological Impacts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center gap-2 font-bold text-amber-900 text-sm sm:text-base">
            <Trees className="w-5 h-5 text-amber-700" />
            1. Hilangnya Keanekaragaman Hayati
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Fragmentasi habitat merusak rumah alami satwa endemik Sumatera seperti Orangutan Sumatera (*Pongo abelii*), Harimau Sumatera, dan Gajah Sumatera di kawasan penyangga TNGL Langkat, memutus jalur migrasi dan memicu kepunahan lokal.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center gap-2 font-bold text-emerald-900 text-sm sm:text-base">
            <Droplets className="w-5 h-5 text-emerald-700" />
            2. Gangguan Daur Hidrologi & Erosi
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Tanpa tajuk kanopi dan perakaran pohon, energi kinetik hujan menghancurkan pori-pori tanah. Laju infiltrasi anjlok drastis, sehingga 85-90% air hujan berubah menjadi limpasan permukaan (*surface runoff*) yang mengangkut lapisan tanah atas (humus).
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center gap-2 font-bold text-rose-900 text-sm sm:text-base">
            <AlertTriangle className="w-5 h-5 text-rose-700" />
            3. Sedimentasi & Bencana Banjir Hilir
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Lumpur hasil erosi terbawa aliran air menuju badan Sungai Batang Serangan dan Wampu, menyebabkan pendangkalan dasar sungai secara cepat. Saat musim penghujan, sungai tidak mampu menampung volume air sehingga memicu banjir bandang di pemukiman hilir.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center gap-2 font-bold text-teal-900 text-sm sm:text-base">
            <ShieldCheck className="w-5 h-5 text-teal-700" />
            4. Upaya Pencegahan & Restorasi Berkelanjutan
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Penerapan silvikultur tebang pilih tanam, reboisasi tanaman endemik berakar dalam (Merbau, Cengal, Damar Laut), penegakan hukum anti-illegal logging, serta adopsi zonasi rimba larangan masyarakat adat Melayu Langkat.
          </p>
        </div>
      </div>

      {/* Structured Case Analysis Activity Form */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-200 shadow-md space-y-6">
        <div className="space-y-1">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-emerald-600" />
            Aktivitas Analisis Kasus
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            Analisis Kasus 1: Penebangan Hutan di Hulu Daerah Aliran Sungai (DAS)
          </h2>
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 leading-relaxed mt-2">
            <span className="font-bold">Deskripsi Kasus Nyata:</span> Di sebuah kawasan perbukitan hulu Kabupaten Langkat, terjadi pembukaan lahan hutan primer seluas 200 hektar tanpa pembuatan terasering dan tanpa perlindungan sempadan sungai. Enam bulan kemudian, masyarakat di desa hilir mengalami banjir lumpur setinggi 1,5 meter saat curah hujan tinggi serta kekeringan air sumur saat musim kemarau.
          </div>
        </div>

        <form onSubmit={handleSaveCase} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              1. Identifikasi Masalah: Apa masalah utama yang terjadi pada kasus di atas? *
            </label>
            <input
              type="text"
              required
              value={caseForm.masalah}
              onChange={(e) => setCaseForm({ ...caseForm, masalah: e.target.value })}
              placeholder="Contoh: Terjadinya banjir lumpur dan kekeringan air tanah akibat hilangnya tutupan hutan..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 text-xs sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              2. Menentukan Penyebab: Apa faktor penyebab langsung dan tidak langsungnya? *
            </label>
            <input
              type="text"
              required
              value={caseForm.penyebab}
              onChange={(e) => setCaseForm({ ...caseForm, penyebab: e.target.value })}
              placeholder="Contoh: Penebangan hutan skala besar tanpa konservasi tanah di kawasan hulu..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 text-xs sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              3. Menjelaskan Dampak: Jelaskan dampak biologis dan fisik yang ditimbulkan bagi lingkungan & warga! *
            </label>
            <textarea
              required
              rows={2}
              value={caseForm.dampak}
              onChange={(e) => setCaseForm({ ...caseForm, dampak: e.target.value })}
              placeholder="Contoh: Hilangnya habitat satwa, penurunan laju infiltrasi, erosi tanah atas, dan kerugian ekonomi warga..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 text-xs sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              4. Hubungan Sebab-Akibat: Bagaimana kaitan ilmiah antara penebangan pohon dengan terjadinya banjir & kekeringan?
            </label>
            <textarea
              rows={2}
              value={caseForm.hubunganSebabAkibat}
              onChange={(e) => setCaseForm({ ...caseForm, hubunganSebabAkibat: e.target.value })}
              placeholder="Uraikan mekanisme infiltrasi, limpasan permukaan (runoff), sedimentasi sungai, dan pengisian air tanah..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 text-xs sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              5. Menentukan Solusi Terpadu: Apa alternatif solusi saintifik & kearifan lokal yang tepat untuk mengatasi kasus ini? *
            </label>
            <textarea
              required
              rows={2}
              value={caseForm.solusi}
              onChange={(e) => setCaseForm({ ...caseForm, solusi: e.target.value })}
              placeholder="Contoh: Reforestasi pohon endemik pengikat air, pembuatan sabodam penahan sedimen, penegakan zonasi rimba lindung..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 text-xs sm:text-sm"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              id="btn-save-case-penebangan"
              className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-md transition-all flex items-center gap-2 text-xs sm:text-sm"
            >
              <Send className="w-4 h-4" />
              <span>Simpan Analisis Kasus Penebangan Hutan</span>
            </button>
          </div>
        </form>

        {isSaved && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-2 animate-fade-in">
            <div className="flex items-center gap-2 font-bold text-sm text-emerald-950">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              Analisis Kasus Berhasil Disimpan ke Portofolio Siswa!
            </div>
            <p className="text-xs text-emerald-800 leading-relaxed">
              Analisis Anda telah membuktikan pemahaman logis mengenai siklus hidrologi dan erosi. Selanjutnya, mari kita pelajari bagaimana pencemaran air, udara, dan tanah mempengaruhi keseimbangan biosfer!
            </p>
          </div>
        )}
      </div>

      {/* Navigation Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
        <button
          onClick={() => onNavigate('materi-perubahan')}
          className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs sm:text-sm hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Materi Perubahan</span>
        </button>

        <button
          id="btn-materi-penebangan-ke-pencemaran"
          onClick={() => onNavigate('materi-pencemaran')}
          className="w-full sm:w-auto px-6 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-xs sm:text-sm"
        >
          <span>Lanjut ke Materi Pencemaran Lingkungan</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
