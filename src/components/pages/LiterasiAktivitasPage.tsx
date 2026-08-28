import React, { useState } from 'react';
import { PageId, User } from '../../types';
import { 
  BookOpenCheck, 
  CheckCircle2, 
  HelpCircle, 
  ArrowRight, 
  ArrowLeft,
  Sparkles, 
  Send, 
  Flame,
  AlertCircle
} from 'lucide-react';

interface LiterasiAktivitasPageProps {
  onNavigate: (page: PageId) => void;
  currentUser: User;
}

export const LiterasiAktivitasPage: React.FC<LiterasiAktivitasPageProps> = ({
  onNavigate,
  currentUser,
}) => {
  // Interactive state for 4 diverse activities
  // Activity 1: Analisis Data Infografis Tutupan Hutan & Erosi
  const [act1Answer, setAct1Answer] = useState<string>('');
  const [act1Feedback, setAct1Feedback] = useState<boolean>(false);

  // Activity 2: Evaluasi Tindakan Benar / Salah dengan Alasan
  const [act2Answers, setAct2Answers] = useState<Record<string, string>>({});
  const [act2Checked, setAct2Checked] = useState<boolean>(false);

  // Activity 3: Mencocokkan Masalah dengan Solusi Berkelanjutan
  const [act3Matches, setAct3Matches] = useState<Record<string, string>>({});
  const [act3Score, setAct3Score] = useState<number | null>(null);

  // Activity 4: Pertanyaan Terbuka Pemecahan Masalah Sekitar
  const [act4Text, setAct4Text] = useState<string>('');
  const [act4Saved, setAct4Saved] = useState<boolean>(false);

  const checkAct3 = () => {
    let score = 0;
    if (act3Matches['prob1'] === 'sol2') score++; // Eutrofikasi -> IPAL & Biofiltrasi
    if (act3Matches['prob2'] === 'sol3') score++; // Panas Rumah -> Atap Rumbia & Kisi Selembayung
    if (act3Matches['prob3'] === 'sol1') score++; // Longsor Tebing -> Reboisasi Riparian Bambu & Damar
    setAct3Score(score);
  };

  return (
    <div className="space-y-8 pb-12 animate-fade-in w-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700">
          <BookOpenCheck className="w-4 h-4 text-emerald-600" />
          Halaman 9 • Aktivitas Belajar
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Latihan Analisis Data & Penyelidikan Lingkungan
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Kerjakan rangkaian latihan interaktif berikut untuk mengasah kemampuan menafsirkan data ilmiah, mengevaluasi fenomena ekologis, dan merancang solusi lingkungan berkelanjutan.
        </p>
      </div>

      {/* Aktivitas 1: Analisis Grafik Data Ilmiah */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-800">
          <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-900 flex items-center justify-center font-bold">1</span>
          Aktivitas 1: Analisis Data Tutupan Hutan & Laju Erosi DAS
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
          <div className="font-bold text-slate-800 text-xs sm:text-sm">
            Tabel Data Pengamatan Kualitas Daerah Aliran Sungai (Periode 2020 – 2024):
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs bg-white rounded-xl border border-slate-200">
              <thead className="bg-emerald-800 text-white font-bold">
                <tr>
                  <th className="p-2.5">Tahun</th>
                  <th className="p-2.5">Tutupan Hutan Primer (%)</th>
                  <th className="p-2.5">Laju Erosi Tanah (Ton/Ha/Tahun)</th>
                  <th className="p-2.5">Kadar Oksigen Terlarut (DO) Sungai</th>
                  <th className="p-2.5">Frekuensi Banjir Musiman</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr>
                  <td className="p-2.5 font-bold">2020</td>
                  <td className="p-2.5">85%</td>
                  <td className="p-2.5">12 Ton</td>
                  <td className="p-2.5 font-semibold text-emerald-700">7.2 mg/L (Sangat Baik)</td>
                  <td className="p-2.5">0 Kali</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">2022</td>
                  <td className="p-2.5">55%</td>
                  <td className="p-2.5">48 Ton</td>
                  <td className="p-2.5 font-semibold text-amber-700">4.8 mg/L (Sedang)</td>
                  <td className="p-2.5">2 Kali</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">2024</td>
                  <td className="p-2.5">28%</td>
                  <td className="p-2.5">115 Ton</td>
                  <td className="p-2.5 font-semibold text-rose-700">2.1 mg/L (Kritis)</td>
                  <td className="p-2.5 font-bold text-rose-700">7 Kali</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="text-xs text-slate-600 italic">
            *Pertanyaan Analisis: Berdasarkan data di atas, apa kesimpulan ilmiah yang paling valid mengenai hubungan antara tutupan vegetasi hutan dengan stabilitas ekosistem DAS?
          </div>
        </div>

        <div className="space-y-2">
          {[
            { id: 'A', text: 'Penurunan tutupan hutan tidak memiliki kaitan nyata dengan erosi dan frekuensi banjir' },
            { id: 'B', text: 'Penurunan tutupan hutan primer berbanding lurus dengan peningkatan laju erosi tanah dan frekuensi banjir, serta berbanding terbalik dengan kualitas oksigen terlarut (DO) sungai' },
            { id: 'C', text: 'Semakin gundul hutan, kadar oksigen perairan sungai akan meningkat karena penetrasi sinar matahari' }
          ].map(opt => (
            <button
              key={opt.id}
              onClick={() => {
                setAct1Answer(opt.id);
                setAct1Feedback(true);
              }}
              className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm font-medium transition-all ${
                act1Answer === opt.id
                  ? opt.id === 'B'
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold'
                    : 'bg-rose-50 border-rose-400 text-rose-950 font-bold'
                  : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
              }`}
            >
              <span className="font-bold mr-2">{opt.id}.</span> {opt.text}
            </button>
          ))}
        </div>

        {act1Feedback && (
          <div className={`p-4 rounded-xl text-xs leading-relaxed ${
            act1Answer === 'B'
              ? 'bg-emerald-100 text-emerald-950 font-medium border border-emerald-300'
              : 'bg-rose-100 text-rose-950 border border-rose-300'
          }`}>
            {act1Answer === 'B' ? (
              <span>✅ <strong>Benar!</strong> Penafsiran data Anda sangat akurat. Data menunjukkan penurunan tajuk hutan secara signifikan memicu percepatan erosi dan pendangkalan yang menurunkan mutu perairan.</span>
            ) : (
              <span>❌ <strong>Kurang tepat.</strong> Pilihan <strong>B</strong> adalah korelasi data yang paling tepat.</span>
            )}
          </div>
        )}
      </div>

      {/* Aktivitas 2: Evaluasi Kasus Benar / Salah */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800">
          <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center font-bold">2</span>
          Aktivitas 2: Evaluasi Tindakan & Pernyataan Ilmiah
        </div>

        <div className="space-y-3 text-xs sm:text-sm">
          {/* Statement 1 */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
            <p className="text-slate-800 font-semibold">
              a. Membakar tumpukan sampah plastik di pekarangan rumah adalah metode yang aman karena langsung melenyapkan sampah padat dari pandangan.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setAct2Answers({ ...act2Answers, s1: 'salah' })}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  act2Answers['s1'] === 'salah' ? 'bg-emerald-700 text-white' : 'bg-white border border-slate-300 text-slate-700'
                }`}
              >
                SALAH (Tidak Tepat)
              </button>
              <button
                onClick={() => setAct2Answers({ ...act2Answers, s1: 'benar' })}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  act2Answers['s1'] === 'benar' ? 'bg-rose-700 text-white' : 'bg-white border border-slate-300 text-slate-700'
                }`}
              >
                BENAR
              </button>
            </div>
            {act2Answers['s1'] === 'salah' && (
              <div className="text-[11px] text-emerald-800 font-medium">
                ✅ <em>Alasan Ilmiah:</em> Pembakaran plastik melepaskan gas beracun dioksin dan furan yang karsinogenik serta partikulat jelaga berbahaya bagi paru-paru.
              </div>
            )}
          </div>

          {/* Statement 2 */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
            <p className="text-slate-800 font-semibold">
              b. Penggunaan sistem panggung Rumah Melayu Langkat menjaga area resapan air di bawah kolong rumah tetap bekerja maksimal sehingga mengurangi volume genangan banjir.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setAct2Answers({ ...act2Answers, s2: 'benar' })}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  act2Answers['s2'] === 'benar' ? 'bg-emerald-700 text-white' : 'bg-white border border-slate-300 text-slate-700'
                }`}
              >
                BENAR (Tepat)
              </button>
              <button
                onClick={() => setAct2Answers({ ...act2Answers, s2: 'salah' })}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  act2Answers['s2'] === 'salah' ? 'bg-rose-700 text-white' : 'bg-white border border-slate-300 text-slate-700'
                }`}
              >
                SALAH
              </button>
            </div>
            {act2Answers['s2'] === 'benar' && (
              <div className="text-[11px] text-emerald-800 font-medium">
                ✅ <em>Alasan Ilmiah:</em> Tiang panggung kayu tidak menutup pori-pori tanah dengan semen masif, memungkinkan infiltrasi alami 100%.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Aktivitas 3: Mencocokkan Masalah dengan Solusi Berkelanjutan */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-800">
          <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-900 flex items-center justify-center font-bold">3</span>
          Aktivitas 3: Pasangkan Permasalahan dengan Solusi Berkelanjutan
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Prob 1 */}
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="text-xs font-bold text-slate-800">
                1. Masalah: Eutrofikasi & Ledakan Eceng Gondok Sungai
              </div>
              <select
                value={act3Matches['prob1'] || ''}
                onChange={(e) => setAct3Matches({ ...act3Matches, prob1: e.target.value })}
                className="w-full p-2 bg-white rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">-- Pilih Solusi --</option>
                <option value="sol1">Penanaman vegetasi riparian sempadan sungai</option>
                <option value="sol2">Pembuatan IPAL limbah deterjen & panen eceng gondok untuk kompos</option>
                <option value="sol3">Pemasangan kisi-kisi ventilasi silang kayu</option>
              </select>
            </div>

            {/* Prob 2 */}
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="text-xs font-bold text-slate-800">
                2. Masalah: Rumah Panas Tropis & Boros Listrik Pendingin
              </div>
              <select
                value={act3Matches['prob2'] || ''}
                onChange={(e) => setAct3Matches({ ...act3Matches, prob2: e.target.value })}
                className="w-full p-2 bg-white rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">-- Pilih Solusi --</option>
                <option value="sol1">Penanaman vegetasi riparian sempadan sungai</option>
                <option value="sol2">Pembuatan IPAL limbah deterjen & panen eceng gondok</option>
                <option value="sol3">Adopsi atap rumbia isolator termal & ventilasi silang alami</option>
              </select>
            </div>

            {/* Prob 3 */}
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="text-xs font-bold text-slate-800">
                3. Masalah: Longsor Tebing & Sedimentasi Aliran Sungai
              </div>
              <select
                value={act3Matches['prob3'] || ''}
                onChange={(e) => setAct3Matches({ ...act3Matches, prob3: e.target.value })}
                className="w-full p-2 bg-white rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">-- Pilih Solusi --</option>
                <option value="sol1">Penanaman vegetasi riparian pengikat tanah (Bambu, Asam Gelugur)</option>
                <option value="sol2">Pembuatan IPAL limbah deterjen & panen eceng gondok</option>
                <option value="sol3">Adopsi atap rumbia isolator termal & ventilasi silang alami</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={checkAct3}
              className="px-4 py-2 bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-bold rounded-xl transition-colors"
            >
              Periksa Pasangan Solusi
            </button>
            {act3Score !== null && (
              <span className="text-xs font-bold text-emerald-800">
                {act3Score === 3 ? '🎉 Sempurna! Semua solusi tepat (3/3).' : `Hasil: ${act3Score}/3 Benar.`}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Aktivitas 4: Pertanyaan Terbuka Aksi Nyata */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800">
          <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold">4</span>
          Aktivitas 4: Rencana Aksi Solutif di Lingkungan Sekitarmu
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          Amati kondisi lingkungan tempat tinggalmu atau sekolahmu. Tuliskan <strong>1 (satu) permasalahan lingkungan nyata</strong> yang paling mendesak, serta rancanglah <strong>3 langkah aksi solutif berbasis sains & kearifan lokal</strong> yang dapat kamu lakukan bersama teman-temanmu!
        </p>

        <textarea
          rows={4}
          value={act4Text}
          onChange={(e) => setAct4Text(e.target.value)}
          placeholder="Tuliskan masalah dan 3 langkah solusimu di sini (Contoh: Masalah sampah plastik kantin sekolah -> Solusi: Pembuatan biopori, audit sampah, pembuatan wadah guna ulang...)"
          className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 text-xs sm:text-sm"
        />

        <div className="flex items-center justify-between pt-1">
          <button
            onClick={() => {
              if (!act4Text.trim()) {
                alert('Silakan tuliskan gagasan solusimu terlebih dahulu.');
                return;
              }
              setAct4Saved(true);
            }}
            className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs sm:text-sm shadow-xs transition-colors flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>Simpan Rencana Aksi</span>
          </button>

          {act4Saved && (
            <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              Tersimpan di Portofolio
            </span>
          )}
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
        <button
          onClick={() => onNavigate('materi-pencemaran')}
          className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs sm:text-sm hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Pencemaran</span>
        </button>

        <button
          id="btn-literasi-ke-studi-kasus"
          onClick={() => onNavigate('studi-kasus')}
          className="w-full sm:w-auto px-6 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-xs sm:text-sm"
        >
          <span>Lanjut ke Studi Kasus Lingkungan</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
