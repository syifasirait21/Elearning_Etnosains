import React, { useState } from 'react';
import { PageId, User, StudentProgress } from '../../types';
import { getAllStudentsProgress, getStudentProgress } from '../../lib/storage';
import { 
  Users, 
  BarChart3, 
  Search, 
  Download, 
  Printer, 
  CheckCircle2, 
  Eye, 
  FileText, 
  Award, 
  TrendingUp, 
  X,
  BookOpen,
  Sparkles,
  ArrowLeft
} from 'lucide-react';

interface DashboardGuruPageProps {
  onNavigate: (page: PageId) => void;
  currentUser: User;
  onOpenAuth: () => void;
}

export const DashboardGuruPage: React.FC<DashboardGuruPageProps> = ({
  onNavigate,
  currentUser,
  onOpenAuth,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [activeStudentDetail, setActiveStudentDetail] = useState<StudentProgress | null>(null);

  const allProgressList = getAllStudentsProgress();

  // Filter students
  const filteredList = allProgressList.filter(s => {
    const matchesSearch = s.user.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.user.sekolah.toLowerCase().includes(searchTerm.toLowerCase());
    if (selectedClass === 'all') return matchesSearch;
    return matchesSearch && s.user.kelas === selectedClass;
  });

  // Unique classes for filter
  const classesList = Array.from(new Set(allProgressList.map(s => s.user.kelas || 'Fase F'))).filter(Boolean);

  // Statistics calculation
  const totalStudents = allProgressList.length;
  const completedEvalStudents = allProgressList.filter(s => s.evaluationResult !== undefined);
  const avgQuiz = Math.round(
    allProgressList.reduce((acc, s) => acc + (s.quizResult?.score || 0), 0) / (totalStudents || 1)
  );
  const avgEval = Math.round(
    completedEvalStudents.reduce((acc, s) => acc + (s.evaluationResult?.score || 0), 0) / (completedEvalStudents.length || 1)
  );
  const tuntasCount = completedEvalStudents.filter(s => (s.evaluationResult?.score || 0) >= 70).length;
  const tuntasPercent = completedEvalStudents.length > 0
    ? Math.round((tuntasCount / completedEvalStudents.length) * 100)
    : 0;

  // Export CSV function
  const handleExportCSV = () => {
    const headers = ['ID,Nama,Kelas,Sekolah,Progres_Modul,Nilai_Kuis,Nilai_Evaluasi,Kategori_Literasi,Tanggal_Selesai\n'];
    const rows = allProgressList.map(s => {
      const progModul = `${Math.min(100, Math.round((s.completedPages.length / 12) * 100))}%`;
      const quiz = s.quizResult?.score ?? '-';
      const ev = s.evaluationResult?.score ?? '-';
      const cat = s.evaluationResult?.literacyCategory ?? 'Belum Selesai';
      const date = s.evaluationResult?.completedAt ? new Date(s.evaluationResult.completedAt).toLocaleDateString('id-ID') : '-';
      return `"${s.user.id}","${s.user.nama}","${s.user.kelas}","${s.user.sekolah}","${progModul}","${quiz}","${ev}","${cat}","${date}"\n`;
    });

    const blob = new Blob([...headers, ...rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `rekap_literasi_lingkungan_langkat_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 pb-12 animate-fade-in w-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800">
              <Users className="w-4 h-4 text-emerald-600" />
              Halaman 14 • Panel Guru & Peneliti Pendidikan
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Rekapitulasi Nilai & Portofolio Literasi Lingkungan
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              Guru / Peneliti: <strong className="text-slate-900">{currentUser.nama}</strong> ({currentUser.sekolah})
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-sm transition-colors flex items-center gap-1.5"
            >
              <Download className="w-4 h-4" />
              <span>Ekspor CSV</span>
            </button>
            <button
              onClick={() => window.print()}
              className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Rekap</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Research Metrics Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
            <span>Total Siswa Terdaftar</span>
            <Users className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-slate-900">{totalStudents}</div>
          <div className="text-[11px] text-emerald-700 font-semibold">
            {completedEvalStudents.length} Siswa Sudah Evaluasi Akhir
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
            <span>Rata-Rata Kuis Formatif</span>
            <BookOpen className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-3xl font-black text-teal-800">{avgQuiz}</div>
          <div className="text-[11px] text-slate-500">Skala 0 - 100 (Formatif)</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
            <span>Rata-Rata Post-Test</span>
            <Award className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-3xl font-black text-amber-600">{avgEval || 0}</div>
          <div className="text-[11px] text-slate-500">Hasil Evaluasi 15 Soal HOTS</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
            <span>Ketuntasan Klasikal</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-emerald-700">{tuntasPercent}%</div>
          <div className="text-[11px] text-emerald-800 font-semibold">
            {tuntasCount} dari {completedEvalStudents.length} Siswa Tuntas (KKM 70)
          </div>
        </div>
      </div>

      {/* Student Progress Table Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-lg font-bold text-slate-900">
            Daftar Portofolio & Capaian Belajar Peserta Didik
          </h2>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari nama siswa..."
                className="pl-9 pr-4 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">Semua Kelas</option>
              {classesList.map((cls, idx) => (
                <option key={idx} value={cls}>{cls}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-800 text-white uppercase text-[11px] font-bold">
              <tr>
                <th className="p-3">Nama Siswa</th>
                <th className="p-3">Kelas</th>
                <th className="p-3">Progres Modul</th>
                <th className="p-3">Nilai Kuis</th>
                <th className="p-3">Nilai Evaluasi</th>
                <th className="p-3">Capaian Literasi</th>
                <th className="p-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {filteredList.map((st) => {
                const progModul = Math.min(100, Math.round((st.completedPages.length / 12) * 100));
                const evScore = st.evaluationResult?.score;
                const isPassed = (evScore ?? 0) >= 70;

                return (
                  <tr key={st.user.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3 font-bold text-slate-800">
                      <div>{st.user.nama}</div>
                      <div className="text-[10px] text-slate-400 font-normal">{st.user.sekolah}</div>
                    </td>
                    <td className="p-3 text-slate-600 font-medium">{st.user.kelas || '-'}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-slate-100 rounded-full h-2 overflow-hidden">
                          <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${progModul}%` }} />
                        </div>
                        <span className="font-bold text-slate-700">{progModul}%</span>
                      </div>
                    </td>
                    <td className="p-3 font-semibold text-teal-800">
                      {st.quizResult ? st.quizResult.score : <span className="text-slate-400 font-normal">—</span>}
                    </td>
                    <td className="p-3">
                      {evScore !== undefined ? (
                        <span className={`font-bold px-2 py-0.5 rounded-md ${
                          isPassed ? 'bg-emerald-100 text-emerald-900' : 'bg-rose-100 text-rose-900'
                        }`}>
                          {evScore} {isPassed ? '(Tuntas)' : '(Remedial)'}
                        </span>
                      ) : (
                        <span className="text-slate-400">Belum Ujian</span>
                      )}
                    </td>
                    <td className="p-3 text-slate-700">
                      {st.evaluationResult?.literacyCategory || <span className="text-slate-400">Belum Terdata</span>}
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => setActiveStudentDetail(st)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-bold text-[11px] transition-colors flex items-center gap-1 mx-auto"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Detail</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {activeStudentDetail && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider">
                  Detail Portofolio Siswa
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-1">
                  {activeStudentDetail.user.nama}
                </h3>
                <p className="text-xs text-slate-500">
                  {activeStudentDetail.user.sekolah} • Kelas: {activeStudentDetail.user.kelas}
                </p>
              </div>
              <button
                onClick={() => setActiveStudentDetail(null)}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Test Summary Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="text-xs text-slate-500 font-bold uppercase">Kuis Formatif</div>
                <div className="text-2xl font-black text-teal-800">
                  {activeStudentDetail.quizResult ? `${activeStudentDetail.quizResult.score} / 100` : 'Belum Dikerjakan'}
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="text-xs text-slate-500 font-bold uppercase">Evaluasi Akhir (Post-Test)</div>
                <div className="text-2xl font-black text-amber-700">
                  {activeStudentDetail.evaluationResult ? `${activeStudentDetail.evaluationResult.score} / 100` : 'Belum Dikerjakan'}
                </div>
                <div className="text-[11px] font-semibold text-emerald-700">
                  {activeStudentDetail.evaluationResult?.literacyCategory}
                </div>
              </div>
            </div>

            {/* Answers breakdown */}
            <div className="space-y-3">
              <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-600" />
                Catatan Refleksi & Jawaban Analisis Kasus
              </h4>

              {activeStudentDetail.orientasiAnswers?.submittedAt ? (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                  <div className="font-bold text-slate-900">Orientasi Masalah:</div>
                  <div><strong>1. Pengamatan:</strong> {activeStudentDetail.orientasiAnswers.q1}</div>
                  <div><strong>2. Penyebab:</strong> {activeStudentDetail.orientasiAnswers.q2}</div>
                  <div><strong>3. Dampak:</strong> {activeStudentDetail.orientasiAnswers.q3}</div>
                  <div><strong>4. Solusi:</strong> {activeStudentDetail.orientasiAnswers.q4}</div>
                </div>
              ) : (
                <div className="text-xs text-slate-400 italic">Belum ada jawaban orientasi masalah.</div>
              )}

              {activeStudentDetail.caseAnswers?.['penebangan-hutan'] && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                  <div className="font-bold text-slate-900">Kasus Penebangan Hutan:</div>
                  <div><strong>Masalah:</strong> {activeStudentDetail.caseAnswers['penebangan-hutan'].masalah}</div>
                  <div><strong>Solusi:</strong> {activeStudentDetail.caseAnswers['penebangan-hutan'].solusi}</div>
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setActiveStudentDetail(null)}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <button
          onClick={() => onNavigate('beranda')}
          className="px-5 py-3 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs sm:text-sm hover:bg-slate-50 transition-colors"
        >
          ← Kembali ke Beranda
        </button>

        <button
          onClick={() => onNavigate('dashboard-siswa')}
          className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-colors"
        >
          Buka Tampilan Siswa →
        </button>
      </div>
    </div>
  );
};
