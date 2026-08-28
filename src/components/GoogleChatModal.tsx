import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  MessageSquare, 
  Send, 
  RefreshCw, 
  Plus, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  LogOut, 
  ExternalLink, 
  Hash, 
  Key, 
  HelpCircle,
  Share2,
  ChevronRight,
  UserCheck
} from 'lucide-react';
import { 
  GoogleChatService, 
  ChatSpace, 
  ChatMessage, 
  GoogleUser 
} from '../lib/googleChat';
import { User, PageId } from '../types';
import { LEARNING_PAGES } from '../data/learningData';

interface GoogleChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  currentPage: PageId;
}

export const GoogleChatModal: React.FC<GoogleChatModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  currentPage,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [googleUser, setGoogleUser] = useState<GoogleUser | null>(null);
  const [clientIdInput, setClientIdInput] = useState<string>('');
  const [showConfigClientId, setShowConfigClientId] = useState<boolean>(false);

  // Spaces & Messages State
  const [spaces, setSpaces] = useState<ChatSpace[]>([]);
  const [selectedSpace, setSelectedSpace] = useState<ChatSpace | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState<string>('');

  // UI Loading & Error States
  const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(false);
  const [isLoadingSpaces, setIsLoadingSpaces] = useState<boolean>(false);
  const [isLoadingMessages, setIsLoadingMessages] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // New Space Creation Modal State
  const [isCreatingSpace, setIsCreatingSpace] = useState<boolean>(false);
  const [newSpaceName, setNewSpaceName] = useState<string>('');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Current learning page title
  const currentLearningPage = LEARNING_PAGES.find(p => p.id === currentPage);

  // Check saved token on mount
  useEffect(() => {
    if (isOpen) {
      const savedToken = GoogleChatService.getSavedToken();
      const savedUser = GoogleChatService.getSavedUser();
      if (savedToken) {
        setToken(savedToken);
        setGoogleUser(savedUser);
        loadSpaces(savedToken);
      }
    }
  }, [isOpen]);

  // Scroll to bottom of message list
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle Connect to Google Chat
  const handleConnectGoogle = async () => {
    setIsLoadingAuth(true);
    setErrorMessage(null);
    try {
      const res = await GoogleChatService.requestToken(clientIdInput || undefined);
      setToken(res.token);
      setGoogleUser(res.user || null);
      setSuccessMessage('Berhasil terhubung dengan akun Google Chat!');
      setTimeout(() => setSuccessMessage(null), 3000);
      await loadSpaces(res.token);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(
        err.message || 'Gagal menghubungkan akun Google. Pastikan Client ID telah dikonfigurasi dan browser mengizinkan popup autentikasi.'
      );
      if (!clientIdInput && !((import.meta as any).env?.VITE_GOOGLE_CLIENT_ID)) {
        setShowConfigClientId(true);
      }
    } finally {
      setIsLoadingAuth(false);
    }
  };

  // Handle Disconnect
  const handleDisconnect = () => {
    GoogleChatService.clearAuth();
    setToken(null);
    setGoogleUser(null);
    setSpaces([]);
    setSelectedSpace(null);
    setMessages([]);
    setSuccessMessage('Koneksi Google Chat telah diputus.');
    setTimeout(() => setSuccessMessage(null), 2500);
  };

  // Load Spaces from Google Chat API
  const loadSpaces = async (authToken: string) => {
    setIsLoadingSpaces(true);
    setErrorMessage(null);
    try {
      const fetchedSpaces = await GoogleChatService.listSpaces(authToken);
      setSpaces(fetchedSpaces);
      if (fetchedSpaces.length > 0 && !selectedSpace) {
        setSelectedSpace(fetchedSpaces[0]);
        loadMessages(authToken, fetchedSpaces[0].name);
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Gagal memuat ruang obrolan (Spaces).');
    } finally {
      setIsLoadingSpaces(false);
    }
  };

  // Load Messages from a Space
  const loadMessages = async (authToken: string, spaceName: string) => {
    setIsLoadingMessages(true);
    setErrorMessage(null);
    try {
      const fetchedMsgs = await GoogleChatService.listMessages(authToken, spaceName);
      setMessages(fetchedMsgs);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Gagal memuat pesan diskusi.');
    } finally {
      setIsLoadingMessages(false);
    }
  };

  // Handle Send Message
  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || !token || !selectedSpace) return;

    setIsSending(true);
    setErrorMessage(null);
    try {
      await GoogleChatService.sendMessage(token, selectedSpace.name, text.trim());
      setInputText('');
      // Reload messages to get latest
      await loadMessages(token, selectedSpace.name);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Gagal mengirim pesan.');
    } finally {
      setIsSending(false);
    }
  };

  // Handle Create New Space
  const handleCreateSpace = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSpaceName.trim() || !token) return;

    setIsLoadingSpaces(true);
    setErrorMessage(null);
    try {
      const created = await GoogleChatService.createSpace(token, newSpaceName.trim(), 'SPACE');
      setSuccessMessage(`Ruang diskusi "${newSpaceName}" berhasil dibuat di Google Chat!`);
      setTimeout(() => setSuccessMessage(null), 3000);
      setNewSpaceName('');
      setIsCreatingSpace(false);
      await loadSpaces(token);
      setSelectedSpace(created);
      await loadMessages(token, created.name);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Gagal membuat ruang diskusi baru.');
    } finally {
      setIsLoadingSpaces(false);
    }
  };

  // Quick Discussion Templates
  const handleInsertTemplate = (templateType: string) => {
    let msg = '';
    const pageName = currentLearningPage?.title || 'Materi E-Learning Biologi';
    const userName = currentUser?.nama || 'Peserta Didik';
    const roleLabel = currentUser?.role === 'guru' ? 'Guru Biologi' : `Siswa (${currentUser?.kelas || 'XI'})`;

    if (templateType === 'ask-topic') {
      msg = `Halo teman-teman & Guru, saya ${userName} (${roleLabel}) ingin berdiskusi mengenai materi "${pageName}". Bagaimana kaitan kearifan lokal Rumah Melayu Langkat dengan adaptasi lingkungan terhadap banjir?`;
    } else if (templateType === 'share-activity') {
      msg = `[Diskusi Kelompok Etnosains Langkat] Saya ${userName} baru saja mempelajari "${pageName}". Mari kita diskusikan solusi pencegahan sedimentasi Sungai Wampu di ruang chat ini!`;
    } else if (templateType === 'share-summary') {
      msg = `[Catatan Belajar Biologi] Ringkasan materi ${pageName}: Penggunaan tiang panggung kayu nibung/ulin membuktikan kearifan arsitektur Melayu Langkat menjaga kesimbangan ekosistem tanpa merusak tanah rawa.`;
    }

    setInputText(msg);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-fade-in">
      <div 
        className="bg-white rounded-3xl shadow-2xl border border-emerald-100 w-full max-w-5xl h-[90vh] max-h-[850px] flex flex-col overflow-hidden animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-950 via-teal-900 to-emerald-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 shadow-inner">
              <MessageSquare className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white">
                  Google Chat • Forum Diskusi Pembelajaran
                </h2>
                <span className="bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Workspace API
                </span>
              </div>
              <p className="text-xs text-emerald-200/90 mt-0.5">
                Kolaborasi diskusi real-time guru & peserta didik via Google Workspace Chat
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {token && googleUser && (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-xs text-emerald-100">
                {googleUser.picture ? (
                  <img 
                    src={googleUser.picture} 
                    alt={googleUser.name} 
                    className="w-5 h-5 rounded-full object-cover" 
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold">
                    {googleUser.name?.charAt(0) || 'G'}
                  </div>
                )}
                <span className="font-semibold truncate max-w-[130px]">{googleUser.name}</span>
                <button
                  onClick={handleDisconnect}
                  className="ml-1 text-red-300 hover:text-red-100 hover:bg-white/10 p-1 rounded-full transition-colors"
                  title="Putus Sambungan Google"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-emerald-200 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Tutup Dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notifications / Error Bar */}
        {errorMessage && (
          <div className="px-5 py-2.5 bg-rose-50 border-b border-rose-200 text-rose-800 text-xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
            <button 
              onClick={() => setErrorMessage(null)} 
              className="text-rose-600 hover:text-rose-800 text-xs font-bold"
            >
              Tutup
            </button>
          </div>
        )}

        {successMessage && (
          <div className="px-5 py-2.5 bg-emerald-50 border-b border-emerald-200 text-emerald-800 text-xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successMessage}</span>
            </div>
            <button 
              onClick={() => setSuccessMessage(null)} 
              className="text-emerald-600 hover:text-emerald-800 text-xs font-bold"
            >
              Tutup
            </button>
          </div>
        )}

        {/* Main Content Area */}
        {!token ? (
          /* Unauthenticated State: Connection Banner & Instructions */
          <div className="flex-1 overflow-y-auto p-6 sm:p-10 flex flex-col items-center justify-center text-center max-w-2xl mx-auto space-y-6">
            <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-800 flex items-center justify-center shadow-lg shadow-emerald-900/10">
              <MessageSquare className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                Sambungkan dengan Google Chat
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Gunakan akun Google Anda untuk berdiskusi langsung di ruang kelas Google Chat (Spaces) terkait materi Biologi Etnosains Rumah Melayu Langkat.
              </p>
            </div>

            {/* Quick Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left w-full max-w-lg">
              <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100 flex items-start gap-3">
                <Users className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-emerald-950">Ruang Kolaborasi Kelas</div>
                  <div className="text-[11px] text-slate-600">Terhubung langsung ke Space kelas & kelompok belajar.</div>
                </div>
              </div>
              <div className="p-3.5 rounded-2xl bg-teal-50/70 border border-teal-100 flex items-start gap-3">
                <Share2 className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-teal-950">Bagikan Pertanyaan Modul</div>
                  <div className="text-[11px] text-slate-600">Kirim pertanyaan materi etnosains & LKPD ke Google Chat 1-klik.</div>
                </div>
              </div>
            </div>

            {/* OAuth Connection Actions */}
            <div className="w-full max-w-sm space-y-3 pt-2">
              <button
                id="btn-gchat-oauth-connect"
                onClick={handleConnectGoogle}
                disabled={isLoadingAuth}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-700 to-teal-800 hover:from-emerald-800 hover:to-teal-900 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2.5 disabled:opacity-50"
              >
                {isLoadingAuth ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Menghubungkan Akun Google...
                  </>
                ) : (
                  <>
                    <MessageSquare className="w-4 h-4" />
                    Masuk dengan Akun Google
                  </>
                )}
              </button>

              <button
                onClick={() => setShowConfigClientId(!showConfigClientId)}
                className="text-xs text-slate-500 hover:text-emerald-700 underline font-medium flex items-center justify-center gap-1 mx-auto"
              >
                <Key className="w-3 h-3" />
                {showConfigClientId ? 'Sembunyikan Pengaturan Client ID' : 'Atur Google Client ID Mandiri'}
              </button>

              {showConfigClientId && (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-2 animate-fade-in">
                  <label className="text-xs font-bold text-slate-700 block">
                    Google OAuth Client ID (Opsional)
                  </label>
                  <input
                    type="text"
                    value={clientIdInput}
                    onChange={(e) => setClientIdInput(e.target.value)}
                    placeholder="contoh: 123456789-xyz.apps.googleusercontent.com"
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-white"
                  />
                  <p className="text-[10px] text-slate-500">
                    Bisa dikosongkan jika <code>VITE_GOOGLE_CLIENT_ID</code> sudah terpasang pada konfigurasi proyek.
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Authenticated State: Two-Column Chat Interface (Spaces & Message Thread) */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Left Column: Spaces List (30% width on desktop) */}
            <div className="w-full md:w-80 border-r border-slate-200 bg-slate-50/70 flex flex-col shrink-0">
              {/* Spaces Header & Action */}
              <div className="p-3.5 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Hash className="w-4 h-4 text-emerald-700" />
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Ruang Chat ({spaces.length})
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => token && loadSpaces(token)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-700 hover:bg-white transition-colors"
                    title="Segarkan Ruang Chat"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isLoadingSpaces ? 'animate-spin' : ''}`} />
                  </button>
                  <button
                    onClick={() => setIsCreatingSpace(!isCreatingSpace)}
                    className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 transition-colors shadow-xs"
                    title="Buat Space Baru"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span className="text-[11px] hidden sm:inline">Baru</span>
                  </button>
                </div>
              </div>

              {/* Create Space Form Toggle */}
              {isCreatingSpace && (
                <form onSubmit={handleCreateSpace} className="p-3 bg-emerald-50 border-b border-emerald-200 space-y-2 animate-fade-in">
                  <div className="text-xs font-bold text-emerald-950">Nama Ruang Diskusi Baru:</div>
                  <input
                    type="text"
                    value={newSpaceName}
                    onChange={(e) => setNewSpaceName(e.target.value)}
                    placeholder="Contoh: Diskusi Etnosains Kelompok 1"
                    className="w-full text-xs p-2 rounded-lg border border-emerald-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 bg-white"
                    required
                  />
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsCreatingSpace(false)}
                      className="px-2.5 py-1 text-xs text-slate-600 hover:text-slate-800"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      disabled={isLoadingSpaces}
                      className="px-3 py-1 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg disabled:opacity-50"
                    >
                      Buat Ruang
                    </button>
                  </div>
                </form>
              )}

              {/* Spaces List */}
              <div className="flex-1 overflow-y-auto no-scrollbar p-2 space-y-1">
                {isLoadingSpaces && spaces.length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-500 space-y-2">
                    <RefreshCw className="w-5 h-5 animate-spin mx-auto text-emerald-600" />
                    <span>Memuat daftar ruang Google Chat...</span>
                  </div>
                ) : spaces.length === 0 ? (
                  <div className="p-5 text-center text-xs text-slate-500 space-y-3">
                    <p>Belum ada Google Chat Space yang ditemukan pada akun Anda.</p>
                    <button
                      onClick={() => setIsCreatingSpace(true)}
                      className="px-3 py-1.5 bg-emerald-700 text-white rounded-xl font-bold text-xs hover:bg-emerald-800"
                    >
                      + Buat Ruang Diskusi Sekarang
                    </button>
                  </div>
                ) : (
                  spaces.map((space) => {
                    const isSelected = selectedSpace?.name === space.name;
                    return (
                      <button
                        key={space.name}
                        onClick={() => {
                          setSelectedSpace(space);
                          if (token) loadMessages(token, space.name);
                        }}
                        className={`w-full text-left p-3 rounded-2xl transition-all flex items-center gap-3 border ${
                          isSelected
                            ? 'bg-emerald-800 text-white border-emerald-900 shadow-sm'
                            : 'bg-white text-slate-800 border-slate-200/80 hover:bg-emerald-50/60 hover:border-emerald-200'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                          isSelected ? 'bg-white/20 text-amber-300' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          <Hash className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className={`text-xs font-bold truncate ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                            {space.displayName || 'Ruang Percakapan'}
                          </div>
                          <div className={`text-[10px] truncate ${isSelected ? 'text-emerald-200' : 'text-slate-500'}`}>
                            {space.spaceType === 'SPACE' ? 'Ruang Terbuka' : 'Grup Obrolan'}
                          </div>
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            </div>

            {/* Right Column: Chat Messages & Active Input Box (70% width) */}
            <div className="flex-1 flex flex-col bg-white overflow-hidden">
              {/* Selected Space Top Bar */}
              <div className="p-3 sm:px-5 sm:py-3.5 border-b border-slate-200 bg-white flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                      {selectedSpace?.displayName || 'Pilih Ruang Obrolan'}
                    </div>
                    <div className="text-[10px] text-slate-500 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Terhubung ke Google Chat Workspace
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => token && selectedSpace && loadMessages(token, selectedSpace.name)}
                    className="p-2 rounded-xl text-slate-600 hover:text-emerald-700 hover:bg-slate-100 transition-colors"
                    title="Segarkan Pesan"
                  >
                    <RefreshCw className={`w-4 h-4 ${isLoadingMessages ? 'animate-spin' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Quick Template Prompts Bar */}
              <div className="px-4 py-2 bg-emerald-50/80 border-b border-emerald-100 flex items-center gap-2 overflow-x-auto no-scrollbar text-[11px] shrink-0">
                <span className="text-emerald-950 font-bold flex items-center gap-1 shrink-0">
                  <Sparkles className="w-3 h-3 text-amber-600" />
                  Template Cepat:
                </span>
                <button
                  onClick={() => handleInsertTemplate('ask-topic')}
                  className="px-2.5 py-1 rounded-full bg-white hover:bg-emerald-100 border border-emerald-200 text-emerald-900 font-medium whitespace-nowrap transition-colors"
                >
                  ❓ Tanya Topik "{currentLearningPage?.shortTitle || 'Materi'}"
                </button>
                <button
                  onClick={() => handleInsertTemplate('share-activity')}
                  className="px-2.5 py-1 rounded-full bg-white hover:bg-emerald-100 border border-emerald-200 text-emerald-900 font-medium whitespace-nowrap transition-colors"
                >
                  💬 Ajak Diskusi LKPD
                </button>
                <button
                  onClick={() => handleInsertTemplate('share-summary')}
                  className="px-2.5 py-1 rounded-full bg-white hover:bg-emerald-100 border border-emerald-200 text-emerald-900 font-medium whitespace-nowrap transition-colors"
                >
                  📝 Bagikan Catatan Etnosains
                </button>
              </div>

              {/* Messages Thread Container */}
              <div className="flex-1 overflow-y-auto no-scrollbar p-4 sm:p-6 space-y-4 bg-slate-50/40">
                {isLoadingMessages ? (
                  <div className="py-12 text-center text-xs text-slate-500 space-y-2">
                    <RefreshCw className="w-6 h-6 animate-spin mx-auto text-emerald-600" />
                    <p>Memuat riwayat pesan Google Chat...</p>
                  </div>
                ) : messages.length === 0 ? (
                  <div className="py-12 text-center text-slate-500 space-y-3 max-w-sm mx-auto">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                      <MessageSquare className="w-6 h-6" />
                    </div>
                    <div className="text-sm font-bold text-slate-800">Belum ada percakapan di ruang ini</div>
                    <p className="text-xs text-slate-500">
                      Mulai diskusi dengan mengirimkan pertanyaan atau tanggapan terkait materi Biologi Etnosains Melayu Langkat!
                    </p>
                  </div>
                ) : (
                  messages.map((msg, idx) => {
                    const isSelf = googleUser && msg.sender?.displayName === googleUser.name;
                    const formattedTime = msg.createTime
                      ? new Date(msg.createTime).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
                      : '';

                    return (
                      <div
                        key={msg.name || idx}
                        className={`flex gap-3 items-start ${isSelf ? 'flex-row-reverse' : 'flex-row'}`}
                      >
                        {/* Avatar */}
                        {msg.sender?.avatarUrl ? (
                          <img
                            src={msg.sender.avatarUrl}
                            alt={msg.sender.displayName || 'Pengguna'}
                            className="w-8 h-8 rounded-xl object-cover shrink-0 shadow-2xs"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-bold shrink-0 ${
                            isSelf ? 'bg-emerald-700' : 'bg-slate-700'
                          }`}>
                            {msg.sender?.displayName?.charAt(0) || 'U'}
                          </div>
                        )}

                        {/* Bubble */}
                        <div className={`max-w-[80%] space-y-1 ${isSelf ? 'items-end' : 'items-start'}`}>
                          <div className={`flex items-center gap-2 text-[11px] ${isSelf ? 'justify-end' : 'justify-start'}`}>
                            <span className="font-bold text-slate-800">
                              {msg.sender?.displayName || 'Pengguna'}
                            </span>
                            <span className="text-slate-400 text-[10px]">{formattedTime}</span>
                          </div>

                          <div className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                            isSelf
                              ? 'bg-emerald-800 text-white rounded-tr-xs shadow-xs'
                              : 'bg-white text-slate-800 border border-slate-200/90 rounded-tl-xs shadow-2xs'
                          }`}>
                            {msg.text}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input Box Form */}
              <div className="p-3 sm:p-4 bg-white border-t border-slate-200 shrink-0">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-end gap-2"
                >
                  <div className="flex-1 relative">
                    <textarea
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      placeholder={
                        selectedSpace
                          ? `Tulis pesan diskusi di ${selectedSpace.displayName || 'Google Chat'}... (Enter untuk kirim)`
                          : 'Pilih ruang diskusi terlebih dahulu...'
                      }
                      disabled={!selectedSpace || isSending}
                      rows={2}
                      className="w-full text-xs sm:text-sm p-3 rounded-2xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 resize-none bg-slate-50/50 disabled:bg-slate-100"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={!inputText.trim() || !selectedSpace || isSending}
                    className="p-3.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold transition-all shadow-md disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center shrink-0"
                    title="Kirim Pesan ke Google Chat"
                  >
                    {isSending ? (
                      <RefreshCw className="w-5 h-5 animate-spin" />
                    ) : (
                      <Send className="w-5 h-5" />
                    )}
                  </button>
                </form>
                <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-400">
                  <span>Tekan Shift + Enter untuk baris baru</span>
                  <span>Terintegrasi via Google Chat API</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
