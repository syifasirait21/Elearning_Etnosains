import React, { useState } from 'react';
import { PageId, User } from '../../types';
import { 
  FileSearch, 
  Trees, 
  Droplets, 
  Landmark, 
  Send, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  Sparkles,
  HelpCircle
} from 'lucide-react';

interface StudiKasusPageProps {
  onNavigate: (page: PageId) => void;
  currentUser: User;
}

export const StudiKasusPage: React.FC<StudiKasusPageProps> = ({
  onNavigate,
  currentUser,
}) => {
  const [activeCaseTab, setActiveCaseTab] = useState<'kasus1' | 'kasus2' | 'kasus3'>('kasus1');

  // Case 1 state
  const [k1, setK1] = useState({ q1: '', q2: '', q3: '', q4: '', q5: '' });
  const [k1Submitted, setK1Submitted] = useState(false);

  // Case 2 state
  const [k2, setK2] = useState({ q1: '', q2: '', q3: '', q4: '' });
  const [k2Submitted, setK2Submitted] = useState(false);

  // Case 3 state
  const [k3, setK3] = useState({ q1: '', q2: '', q3: '' });
  const [k3Submitted, setK3Submitted] = useState(false);

  return (
    <div className="space-y-8 pb-12 animate-fade-in w-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700">
          <FileSearch className="w-4 h-4 text-emerald-600" />
          Halaman 10 • Investigasi Studi Kasus
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Studi Kasus Lingkungan Kontekstual & Umpan Balik
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Pilihlah studi kasus kontekstual di bawah ini. Analisislah akar masalah, mekanisme biologis yang terlibat, serta rumuskan rekomendasi solusi berbasis sains dan kearifan lokal.
        </p>
      </div>

      {/* Case Navigation Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          onClick={() => setActiveCaseTab('kasus1')}
          className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3 ${
            activeCaseTab === 'kasus1'
              ? 'bg-emerald-800 text-white border-emerald-900 shadow-md'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <div className={`p-2 rounded-xl shrink-0 ${activeCaseTab === 'kasus1' ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'}`}>
            <Trees className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-bold uppercase text-amber-300">Studi Kasus 1</div>
            <div className="text-sm font-bold truncate">Penebangan & Banjir</div>
          </div>
        </button>

        <button
          onClick={() => setActiveCaseTab('kasus2')}
          className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3 ${
            activeCaseTab === 'kasus2'
              ? 'bg-sky-800 text-white border-sky-900 shadow-md'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <div className={`p-2 rounded-xl shrink-0 ${activeCaseTab === 'kasus2' ? 'bg-white/20 text-white' : 'bg-sky-100 text-sky-800'}`}>
            <Droplets className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-bold uppercase text-amber-300">Studi Kasus 2</div>
            <div className="text-sm font-bold truncate">Pencemaran Sungai</div>
          </div>
        </button>

        <button
          onClick={() => setActiveCaseTab('kasus3')}
          className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3 ${
            activeCaseTab === 'kasus3'
              ? 'bg-amber-800 text-white border-amber-900 shadow-md'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <div className={`p-2 rounded-xl shrink-0 ${activeCaseTab === 'kasus3' ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-800'}`}>
            <Landmark className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-bold uppercase text-amber-300">Studi Kasus 3</div>
            <div className="text-sm font-bold truncate">Etnosains vs Modern</div>
          </div>
        </button>
      </div>

      {/* Case 1: Penebangan Hutan & Banjir */}
      {activeCaseTab === 'kasus1' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 animate-fade-in">
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              KASUS 1 — PENEBANGAN HUTAN & BANJIR BANDANG
            </div>
            <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
              Sebuah wilayah perbukitan di hulu DAS mengalami penebangan pohon secara berlebihan untuk alih fungsi lahan tanpa memperhatikan kemiringan lereng. Setelah beberapa bulan berjalan, terjadi peningkatan erosi tanah secara masif dan desa di kawasan hilir diterjang banjir luapan sungai yang berlumpur.
            </div>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); setK1Submitted(true); }} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                a. Apa masalah yang terjadi pada wilayah tersebut? *
              </label>
              <input
                type="text"
                required
                value={k1.q1}
                onChange={(e) => setK1({ ...k1, q1: e.target.value })}
                placeholder="Tuliskan masalah utama..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                b. Menurutmu, apa faktor penyebab langsung terjadinya peristiwa itu? *
              </label>
              <input
                type="text"
                required
                value={k1.q2}
                onChange={(e) => setK1({ ...k1, q2: e.target.value })}
                placeholder="Tuliskan penyebab..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                c. Bagaimana hubungan sains antara penebangan hutan dengan terjadinya banjir? *
              </label>
              <textarea
                required
                rows={2}
                value={k1.q3}
                onChange={(e) => setK1({ ...k1, q3: e.target.value })}
                placeholder="Jelaskan mekanisme infiltrasi, perakaran penahan air, dan limpasan permukaan..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                d. Apa dampak jangka pendek dan jangka panjang bagi ekosistem dan masyarakat? *
              </label>
              <textarea
                required
                rows={2}
                value={k1.q4}
                onChange={(e) => setK1({ ...k1, q4: e.target.value })}
                placeholder="Uraikan dampak kerusakan..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                e. Apa solusi yang dapat dilakukan untuk memulihkan dan mencegah bencana serupa? *
              </label>
              <textarea
                required
                rows={2}
                value={k1.q5}
                onChange={(e) => setK1({ ...k1, q5: e.target.value })}
                placeholder="Tuliskan alternatif solusi komprehensif..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-md transition-colors text-xs sm:text-sm flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Kirim Analisis Kasus 1</span>
            </button>
          </form>

          {k1Submitted && (
            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-2 animate-fade-in text-xs sm:text-sm">
              <div className="font-bold text-emerald-900 flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                Umpan Balik Saintifik Guru & Peneliti:
              </div>
              <p className="text-slate-700 leading-relaxed">
                <strong>Analisis Sains:</strong> Penebangan pohon menghilangkan kanopi dan perakaran yang menjaga porositas tanah. Air hujan yang jatuh tidak sempat berinfiltrasi menjadi air tanah, melainkan 90% berubah menjadi <em>surface runoff</em> yang mengikis lapisan tanah atas (*topsoil*) dan membawanya sebagai sedimen lumpur ke dasar sungai, memicu banjir luapan dan kekeringan air tanah.
              </p>
              <p className="text-slate-700 leading-relaxed font-semibold">
                <strong>Rekomendasi Solusi:</strong> Reforestasi lereng dengan vegetasi berakar dalam (Cengal, Merbau, Bambu), pembuatan teras gulud/rorak resapan, dan penegakan hukum tata ruang sempadan sungai.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Case 2: Pencemaran Sungai */}
      {activeCaseTab === 'kasus2' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 animate-fade-in">
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-sky-800">
              KASUS 2 — PENCEMARAN SUNGAI PEMUKIMAN
            </div>
            <div className="p-4 rounded-2xl bg-sky-50/80 border border-sky-200 text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
              Limbah cair rumah tangga yang mengandung deterjen berkadar fosfat tinggi dan sisa minyak dapur dibuang langsung ke aliran sungai yang melintasi pemukiman warga. Air sungai menjadi keruh, berbau tak sedap, dan permukaan tertutup rapat oleh tumbuhan eceng gondok.
            </div>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); setK2Submitted(true); }} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                a. Apa jenis pencemaran yang terjadi pada kasus di atas? *
              </label>
              <input
                type="text"
                required
                value={k2.q1}
                onChange={(e) => setK2({ ...k2, q1: e.target.value })}
                placeholder="Tuliskan jenis pencemarannya..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                b. Apa saja sumber pencemar utamanya? *
              </label>
              <input
                type="text"
                required
                value={k2.q2}
                onChange={(e) => setK2({ ...k2, q2: e.target.value })}
                placeholder="Tuliskan sumber-sumber polutan..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                c. Apa dampaknya terhadap kelangsungan hidup organisme perairan dan kesehatan manusia? *
              </label>
              <textarea
                required
                rows={2}
                value={k2.q3}
                onChange={(e) => setK2({ ...k2, q3: e.target.value })}
                placeholder="Jelaskan eutrofikasi, penurunan DO, peningkatan BOD, dan patogen penyakit..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                d. Bagaimana solusi terpadu yang dapat dilakukan bersama masyarakat? *
              </label>
              <textarea
                required
                rows={2}
                value={k2.q4}
                onChange={(e) => setK2({ ...k2, q4: e.target.value })}
                placeholder="Tuliskan solusi praktis dan sistematis..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3 bg-sky-700 hover:bg-sky-800 text-white font-bold rounded-xl shadow-md transition-colors text-xs sm:text-sm flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Kirim Analisis Kasus 2</span>
            </button>
          </form>

          {k2Submitted && (
            <div className="p-5 rounded-2xl bg-sky-50 border border-sky-200 text-sky-950 space-y-2 animate-fade-in text-xs sm:text-sm">
              <div className="font-bold text-sky-900 flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-5 h-5 text-sky-600" />
                Umpan Balik Saintifik Guru & Peneliti:
              </div>
              <p className="text-slate-700 leading-relaxed">
                <strong>Mekanisme Biologis:</strong> Kandungan fosfat dan nitrat dari deterjen menjadi pupuk bagi tanaman air (Eutrofikasi). Saat tanaman mati, pembusukan oleh bakteri aerob menghabiskan pasokan oksigen terlarut (*Dissolved Oxygen*), menyebabkan kondisi anoksik/hipoksia sehingga ikan mati dan air berbau gas hidrogen sulfida (H2S).
              </p>
            </div>
          )}
        </div>
      )}

      {/* Case 3: Etnosains Rumah Melayu vs Rumah Modern */}
      {activeCaseTab === 'kasus3' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 animate-fade-in">
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-800">
              KASUS 3 — ETNOSAINS RUMAH PANGGUNG MELAYU VS PEMUKIMAN BETON TANPA RESAPAN
            </div>
            <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
              Sebuah kompleks perumahan baru di Langkat membangun rumah tipe tapak rapat dengan mengecor semen seluruh pekarangan, menebang semua pohon peneduh, dan memakai atap seng tipis tanpa ventilasi silang. Akibatnya, suhu dalam rumah terasa sangat menyengat (panas) dan halaman tergenang air saat hujan deras. Bandingkan dengan kearifan Rumah Melayu Langkat tradisional.
            </div>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); setK3Submitted(true); }} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                a. Mengapa pekarangan yang dicor semen menyebabkan genangan air lebih cepat dibandingkan kolong rumah panggung Melayu? *
              </label>
              <textarea
                required
                rows={2}
                value={k3.q1}
                onChange={(e) => setK3({ ...k3, q1: e.target.value })}
                placeholder="Hubungkan dengan laju infiltrasi dan porositas tanah..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                b. Mengapa atap rumbia Rumah Melayu jauh lebih sejuk dibandingkan atap seng modern? *
              </label>
              <textarea
                required
                rows={2}
                value={k3.q2}
                onChange={(e) => setK3({ ...k3, q2: e.target.value })}
                placeholder="Hubungkan dengan sifat konduktivitas termal serat selulosa alami..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                c. Apa rekomendasi arsitektur hijau yang memadukan teknologi modern dengan etnosains Melayu Langkat? *
              </label>
              <textarea
                required
                rows={2}
                value={k3.q3}
                onChange={(e) => setK3({ ...k3, q3: e.target.value })}
                placeholder="Contoh: Pembuatan biopori, mempertahankan pohon peneduh, ventilasi silang..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3 bg-amber-700 hover:bg-amber-800 text-white font-bold rounded-xl shadow-md transition-colors text-xs sm:text-sm flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Kirim Analisis Kasus 3</span>
            </button>
          </form>

          {k3Submitted && (
            <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 space-y-2 animate-fade-in text-xs sm:text-sm">
              <div className="font-bold text-amber-900 flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-5 h-5 text-amber-600" />
                Umpan Balik Saintifik Guru & Peneliti:
              </div>
              <p className="text-slate-700 leading-relaxed">
                <strong>Sains Termal & Hidrologi:</strong> Semen memiliki impermeabilitas 100% yang menolak infiltrasi air ke tanah, memicu genangan kilat (*flash flood*). Sebaliknya, kolong Rumah Melayu menjaga porositas tanah tetap hidup. Daun rumbia (*Metroxylon sagu*) merupakan insulator alami berpori mikro yang menahan radiasi infra merah matahari, menjaga mikroklimat sejuk tanpa emisi freon/listrik.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Navigation Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
        <button
          onClick={() => onNavigate('aktivitas-literasi')}
          className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs sm:text-sm hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Aktivitas Literasi</span>
        </button>

        <button
          id="btn-studi-kasus-ke-kuis"
          onClick={() => onNavigate('kuis')}
          className="w-full sm:w-auto px-6 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-xs sm:text-sm"
        >
          <span>Lanjut ke Kuis Interaktif</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
