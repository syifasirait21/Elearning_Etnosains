import React, { useState } from 'react';
import { User } from '../types';
import { 
  DEFAULT_STUDENT_USER, 
  DEFAULT_TEACHER_USER, 
  setCurrentUser, 
  getAllStudentsProgress 
} from '../lib/storage';
import { 
  X, 
  User as UserIcon, 
  GraduationCap, 
  ShieldCheck, 
  Lock, 
  Check, 
  UserPlus, 
  LogIn,
  KeyRound,
  Sparkles
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  onUserChanged: (user: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onUserChanged,
}) => {
  const [activeTab, setActiveTab] = useState<'siswa' | 'guru'>(currentUser.role);
  
  // Student form state
  const [siswaNama, setSiswaNama] = useState('');
  const [siswaKelas, setSiswaKelas] = useState('XI MIPA 1');
  const [siswaPassword, setSiswaPassword] = useState('');
  
  // Teacher form state
  const [guruEmail, setGuruEmail] = useState('');
  const [guruPassword, setGuruPassword] = useState('');

  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  if (!isOpen) return null;

  const handleSiswaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!siswaNama.trim()) {
      setNotification({ type: 'error', message: 'Silakan masukkan nama lengkap peserta didik.' });
      return;
    }
    if (!siswaPassword) {
      setNotification({ type: 'error', message: 'Silakan masukkan kata sandi / PIN.' });
      return;
    }

    const newUser: User = {
      id: `siswa-${Date.now()}`,
      role: 'siswa',
      nama: siswaNama.trim(),
      kelas: siswaKelas,
      nisn: `008${Math.floor(1000000 + Math.random() * 9000000)}`
    };

    setCurrentUser(newUser);
    onUserChanged(newUser);
    setNotification({ type: 'success', message: `Berhasil masuk sebagai ${newUser.nama} (${newUser.kelas})` });
    setTimeout(() => {
      setNotification(null);
      onClose();
    }, 900);
  };

  const handleGuruSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guruEmail.trim()) {
      setNotification({ type: 'error', message: 'Silakan masukkan email guru.' });
      return;
    }
    if (!guruPassword) {
      setNotification({ type: 'error', message: 'Silakan masukkan kata sandi guru.' });
      return;
    }

    const newUser: User = {
      id: 'guru-auth',
      role: 'guru',
      nama: guruEmail.includes('@') ? `Guru Biologi (${guruEmail.split('@')[0]})` : 'Guru Biologi Langkat',
      email: guruEmail.trim()
    };

    setCurrentUser(newUser);
    onUserChanged(newUser);
    setNotification({ type: 'success', message: `Berhasil masuk sebagai Guru (${newUser.email})` });
    setTimeout(() => {
      setNotification(null);
      onClose();
    }, 900);
  };

  const selectQuickDemo = (type: 'siswa-1' | 'siswa-2' | 'guru') => {
    let selected: User;
    if (type === 'guru') {
      selected = DEFAULT_TEACHER_USER;
    } else if (type === 'siswa-1') {
      selected = DEFAULT_STUDENT_USER;
    } else {
      selected = {
        id: 'siswa-2',
        role: 'siswa',
        nama: 'Siti Nurhaliza Siregar',
        kelas: 'XI MIPA 1',
        nisn: '0079451234'
      };
    }
    setCurrentUser(selected);
    onUserChanged(selected);
    setNotification({ type: 'success', message: `Aktif sebagai ${selected.nama}` });
    setTimeout(() => {
      setNotification(null);
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <KeyRound className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">Sistem Akses Masuk Pembelajaran</h3>
              <p className="text-xs text-emerald-200">E-Learning Biologi Etnosains Rumah Melayu Langkat</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="grid grid-cols-2 p-2 bg-slate-100 border-b border-slate-200 gap-2">
          <button
            id="tab-auth-siswa"
            onClick={() => {
              setActiveTab('siswa');
              setNotification(null);
            }}
            className={`py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
              activeTab === 'siswa'
                ? 'bg-white text-emerald-900 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <GraduationCap className={`w-4 h-4 ${activeTab === 'siswa' ? 'text-emerald-700' : 'text-slate-400'}`} />
            Peserta Didik (Siswa)
          </button>
          <button
            id="tab-auth-guru"
            onClick={() => {
              setActiveTab('guru');
              setNotification(null);
            }}
            className={`py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
              activeTab === 'guru'
                ? 'bg-white text-amber-900 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className={`w-4 h-4 ${activeTab === 'guru' ? 'text-amber-600' : 'text-slate-400'}`} />
            Pendidik (Guru)
          </button>
        </div>

        {/* Notification banner if any */}
        {notification && (
          <div className={`p-3 text-xs font-semibold text-center ${
            notification.type === 'success' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
          }`}>
            {notification.message}
          </div>
        )}

        <div className="p-6">
          {/* Quick Demo Accounts for effortless evaluation & testing */}
          <div className="mb-6 bg-amber-50/80 border border-amber-200/80 rounded-xl p-3.5">
            <div className="text-[11px] font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Akses Cepat (Uji Coba Penelitian & Praktik)
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => selectQuickDemo('siswa-1')}
                className="text-left px-2.5 py-2 rounded-lg bg-white border border-amber-200 text-xs hover:border-emerald-500 hover:bg-emerald-50/50 transition-colors"
              >
                <div className="font-bold text-slate-800 truncate">Rizky Fauzi</div>
                <div className="text-[10px] text-slate-500">Siswa • XI MIPA 1</div>
              </button>
              <button
                type="button"
                onClick={() => selectQuickDemo('siswa-2')}
                className="text-left px-2.5 py-2 rounded-lg bg-white border border-amber-200 text-xs hover:border-emerald-500 hover:bg-emerald-50/50 transition-colors"
              >
                <div className="font-bold text-slate-800 truncate">Siti Nurhaliza</div>
                <div className="text-[10px] text-slate-500">Siswa • XI MIPA 1</div>
              </button>
              <button
                type="button"
                onClick={() => selectQuickDemo('guru')}
                className="text-left px-2.5 py-2 rounded-lg bg-white border border-amber-300 text-xs hover:border-amber-500 hover:bg-amber-100/50 transition-colors"
              >
                <div className="font-bold text-amber-900 truncate">Ibu Nurmasyithah</div>
                <div className="text-[10px] text-amber-700">Guru Biologi</div>
              </button>
            </div>
          </div>

          {/* Form: Peserta Didik */}
          {activeTab === 'siswa' && (
            <form onSubmit={handleSiswaSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nama Lengkap Peserta Didik *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Muhammad Rizky Fauzi"
                  value={siswaNama}
                  onChange={(e) => setSiswaNama(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Kelas SMA *
                  </label>
                  <select
                    value={siswaKelas}
                    onChange={(e) => setSiswaKelas(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-white text-sm"
                  >
                    <option value="X-1">X-1 (Fase E)</option>
                    <option value="X-2">X-2 (Fase E)</option>
                    <option value="XI MIPA 1">XI MIPA 1 (Fase F)</option>
                    <option value="XI MIPA 2">XI MIPA 2 (Fase F)</option>
                    <option value="XII MIPA 1">XII MIPA 1</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Kata Sandi / PIN Siswa *
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Masukkan sandi/PIN"
                    value={siswaPassword}
                    onChange={(e) => setSiswaPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                id="btn-submit-login-siswa"
                className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 text-sm mt-2"
              >
                <LogIn className="w-4 h-4" />
                Masuk / Daftarkan Sebagai Siswa
              </button>
            </form>
          )}

          {/* Form: Guru */}
          {activeTab === 'guru' && (
            <form onSubmit={handleGuruSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email atau Username Guru *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: guru.biologi atau nurmasyithah@sman1langkat.sch.id"
                  value={guruEmail}
                  onChange={(e) => setGuruEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Kata Sandi Guru *
                </label>
                <input
                  type="password"
                  required
                  placeholder="Masukkan kata sandi guru"
                  value={guruPassword}
                  onChange={(e) => setGuruPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-amber-500 text-sm"
                />
              </div>

              <button
                type="submit"
                id="btn-submit-login-guru"
                className="w-full py-3 bg-amber-700 hover:bg-amber-800 text-white font-bold rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 text-sm mt-2"
              >
                <ShieldCheck className="w-4 h-4" />
                Masuk ke Dashboard Guru
              </button>
            </form>
          )}

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Status Saat Ini:</span>
            <span className="font-semibold text-slate-800">
              {currentUser.nama} ({currentUser.role === 'guru' ? 'Guru' : currentUser.kelas})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
