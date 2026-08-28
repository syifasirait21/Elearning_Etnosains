import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  Send, 
  X, 
  Trash2, 
  Sparkles, 
  HelpCircle, 
  BookOpen, 
  AlertCircle, 
  RefreshCw, 
  Check, 
  Copy, 
  Compass, 
  ShieldAlert,
  GraduationCap
} from 'lucide-react';
import { User, PageId } from '../types';
import { LEARNING_PAGES } from '../data/learningData';

export interface ChatMessageItem {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
  topic?: string;
}

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser?: User;
  currentPage: PageId;
}

const STARTER_PROMPTS = [
  {
    topic: 'etnosains',
    label: '🏛️ Etnosains Melayu',
    prompt: 'Bagaimana struktur tiang panggung kayu nibung/ulin pada Rumah Melayu Langkat beradaptasi terhadap dinamika pasang surut air Sungai Wampu?',
  },
  {
    topic: 'pencemaran',
    label: '💧 Pencemaran Air',
    prompt: 'Beri saya petunjuk memahami hubungan antara penurunan DO (oksigen terlarut) dengan kenaikan BOD di Sungai Wampu!',
  },
  {
    topic: 'penebangan',
    label: '🌲 Penebangan Hutan',
    prompt: 'Mengapa hilangnya tutupan kanopi pohon di hulu DAS Langkat dapat mempercepat laju erosi tanah dan sedimentasi?',
  },
  {
    topic: 'perubahan',
    label: '🌿 Perubahan Lingkungan',
    prompt: 'Apa perbedaan antara faktor alami dan faktor antropogenik dalam memicu ketidakseimbangan ekosistem?',
  },
  {
    topic: 'evaluasi',
    label: '💡 Petunjuk Mengerjakan Soal',
    prompt: 'Saya sedang kesulitan menganalisis dampak pembukaan lahan sawit terhadap kualitas air sungai, tolong berikan petunjuk konsepnya!',
  },
];

const TOPIC_FILTERS = [
  { id: 'all', label: 'Semua Materi' },
  { id: 'perubahan-lingkungan', label: 'Perubahan Lingkungan' },
  { id: 'penebangan-hutan', label: 'Penebangan Hutan' },
  { id: 'pencemaran-lingkungan', label: 'Pencemaran Lingkungan' },
  { id: 'etnosains-rumah-melayu', label: 'Etnosains Melayu Langkat' },
  { id: 'literasi-lingkungan', label: 'Literasi Lingkungan' },
];

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  currentPage,
}) => {
  const activeUser = currentUser || {
    id: 'siswa-default',
    nama: 'Peserta Didik',
    role: 'siswa' as const,
    kelas: 'Kelas X Biologi',
    sekolah: 'SMA Negeri 1 Stabat, Langkat',
  };

  const [messages, setMessages] = useState<ChatMessageItem[]>(() => {
    try {
      const userId = currentUser?.id || 'siswa-default';
      const userName = currentUser?.nama || 'Peserta Didik';
      const saved = localStorage.getItem(`ai_assistant_history_${userId}`);
      if (saved) return JSON.parse(saved);
      return [
        {
          id: 'welcome-msg',
          role: 'assistant',
          text: `Halo **${userName}**! 🌿\n\nSaya adalah **🤖 Asisten Belajar Biologi Etnosains**. Saya siap mendampingi kamu memahami materi:
- **Perubahan Lingkungan & Keseimbangan Ekosistem**
- **Penebangan Hutan & Daerah Aliran Sungai Langkat**
- **Pencemaran Air, Udara, dan Tanah**
- **Etnosains Rumah Melayu Tradisional Langkat**
- **Literasi & Aksi Konservasi Lingkungan**

*Catatan:* Saya siap memberikan petunjuk, penjelasan konsep sederhana, dan pertanyaan pemantik untuk membantumu berpikir kritis (tanpa membocorkan kunci jawaban evaluasi secara langsung). Ada materi yang ingin kamu tanyakan sekarang?`,
          timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        },
      ];
    } catch (e) {
      console.warn('Error reading saved AI messages', e);
      return [
        {
          id: 'welcome-msg',
          role: 'assistant',
          text: `Halo! 🌿 Saya adalah **🤖 Asisten Belajar Biologi Etnosains**. Ada materi yang ingin kamu tanyakan sekarang?`,
          timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        },
      ];
    }
  });

  const [inputQuery, setInputQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Save history on changes
  useEffect(() => {
    try {
      localStorage.setItem(`ai_assistant_history_${activeUser.id}`, JSON.stringify(messages));
    } catch (e) {
      console.warn('Error saving AI history', e);
    }
  }, [messages, activeUser.id]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Auto focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputQuery).trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessageItem = {
      id: `user-${Date.now()}`,
      role: 'user',
      text,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      topic: selectedTopic,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text,
          history: messages.map((m) => ({ role: m.role, text: m.text })),
          currentTopic: selectedTopic === 'all' ? currentPage : selectedTopic,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const data = await response.json();
      const assistantMessage: ChatMessageItem = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        text: data.reply || 'Maaf, saya tidak dapat merespons saat ini. Silakan coba kembali.',
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      console.error('Error fetching AI response:', err);
      // Fallback message
      const errorMessage: ChatMessageItem = {
        id: `ai-err-${Date.now()}`,
        role: 'assistant',
        text: `### 💡 Petunjuk Pembelajaran
Maaf, terjadi kendala saat menghubungkan ke server AI. Namun, terkait topik yang kamu tanyakan mengenai **Biologi Lingkungan & Etnosains Langkat**:

- Coba ingat kembali keterkaitan antara tutupan kanopi hutan di Langkat dengan laju erosi tanah dan sedimentasi Sungai Wampu.
- Pada Rumah Melayu Langkat, tiang panggung dan atap rumbia merupakan adaptasi kearifan lokal terhadap banjir dan termoregulasi panas tropis.
- Periksa kembali catatan materi di modul e-learning untuk informasi lebih lengkap!`,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    if (window.confirm('Hapus seluruh riwayat percakapan dengan Asisten Belajar?')) {
      const initial: ChatMessageItem = {
        id: `welcome-${Date.now()}`,
        role: 'assistant',
        text: `Riwayat percakapan telah dibersihkan. Halo **${activeUser.nama}**, ada topik materi biologi atau etnosains Langkat yang ingin kamu tanyakan?`,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([initial]);
      localStorage.removeItem(`ai_assistant_history_${activeUser.id}`);
    }
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-fade-in">
      <div 
        className="bg-white rounded-3xl shadow-2xl border border-emerald-100 w-full max-w-4xl h-[90vh] max-h-[850px] flex flex-col overflow-hidden animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-950 via-teal-900 to-emerald-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-300 shadow-inner">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  🤖 Asisten Belajar
                </h2>
                <span className="bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  AI Tutor Biologi Etnosains
                </span>
              </div>
              <p className="text-xs text-emerald-200/90 mt-0.5">
                Bantuan konsep, petunjuk belajar, dan pertanyaan pemantik berpikir kritis
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleClearHistory}
              className="p-2 rounded-xl text-emerald-200 hover:text-white hover:bg-white/10 transition-colors"
              title="Bersihkan Riwayat Percakapan"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-emerald-200 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Tutup Dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Pedagogical Notice Banner */}
        <div className="px-4 py-2 bg-amber-50 border-b border-amber-200/70 text-amber-950 text-xs flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
            <span>
              <strong>Prinsip Belajar:</strong> Asisten Belajar membantu memahami konsep dan memberikan petunjuk terarah, bukan membocorkan jawaban langsung evaluasi.
            </span>
          </div>
        </div>

        {/* Topic Filter Pills */}
        <div className="px-4 py-2 bg-slate-50 border-b border-slate-200 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-[11px] shrink-0">
          <span className="text-slate-600 font-bold flex items-center gap-1 shrink-0">
            <Compass className="w-3.5 h-3.5 text-emerald-700" />
            Fokus Topik:
          </span>
          {TOPIC_FILTERS.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedTopic(t.id)}
              className={`px-3 py-1 rounded-full whitespace-nowrap font-medium transition-all ${
                selectedTopic === t.id
                  ? 'bg-emerald-800 text-white font-bold shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-emerald-50 border border-slate-200'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-4 sm:p-6 space-y-4 bg-slate-50/50">
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 items-start ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 shadow-2xs ${
                    isUser
                      ? 'bg-emerald-800 text-white'
                      : 'bg-gradient-to-br from-amber-500 to-emerald-700 text-white'
                  }`}
                >
                  {isUser ? activeUser.nama.charAt(0) : <Bot className="w-4 h-4" />}
                </div>

                {/* Bubble */}
                <div className={`max-w-[85%] sm:max-w-[78%] space-y-1 ${isUser ? 'items-end' : 'items-start'}`}>
                  <div className={`flex items-center gap-2 text-[11px] ${isUser ? 'justify-end text-slate-500' : 'justify-start text-slate-600'}`}>
                    <span className="font-bold">{isUser ? activeUser.nama : '🤖 Asisten Belajar'}</span>
                    <span className="text-[10px] text-slate-400">{msg.timestamp}</span>
                  </div>

                  <div
                    className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                      isUser
                        ? 'bg-emerald-800 text-white rounded-tr-xs shadow-xs'
                        : 'bg-white text-slate-800 border border-slate-200/90 rounded-tl-xs shadow-xs'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Message Tools */}
                  {!isUser && (
                    <div className="flex items-center gap-2 pt-0.5">
                      <button
                        onClick={() => handleCopyText(msg.id, msg.text)}
                        className="text-[10px] text-slate-400 hover:text-emerald-700 flex items-center gap-1 px-1.5 py-0.5 rounded-md hover:bg-slate-100 transition-colors"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span className="text-emerald-600">Disalin</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Salin</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex gap-3 items-start">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-emerald-700 text-white flex items-center justify-center text-xs shrink-0 shadow-2xs">
                <Bot className="w-4 h-4 animate-pulse" />
              </div>
              <div className="bg-white border border-slate-200/90 rounded-2xl rounded-tl-xs p-4 text-xs text-slate-600 shadow-xs flex items-center gap-2.5">
                <RefreshCw className="w-4 h-4 animate-spin text-emerald-600" />
                <span>Asisten Belajar sedang menganalisis materi dan menyusun petunjuk...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Starter Prompts Bar */}
        <div className="px-4 py-2.5 bg-emerald-50/70 border-t border-emerald-100 overflow-x-auto flex items-center gap-2 shrink-0">
          <div className="text-[11px] font-bold text-emerald-950 flex items-center gap-1 shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Pertanyaan Pemantik:
          </div>
          {STARTER_PROMPTS.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(item.prompt)}
              disabled={isLoading}
              className="px-3 py-1 rounded-full bg-white hover:bg-emerald-100 text-emerald-900 border border-emerald-200 text-[11px] font-medium whitespace-nowrap transition-colors disabled:opacity-50"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Input Form */}
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
                ref={inputRef}
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Tanyakan konsep materi, minta penjelasan sederhana, atau petunjuk belajar..."
                disabled={isLoading}
                rows={2}
                className="w-full text-xs sm:text-sm p-3 rounded-2xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 resize-none bg-slate-50/50"
              />
            </div>

            <button
              type="submit"
              disabled={!inputQuery.trim() || isLoading}
              className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-700 to-teal-800 hover:from-emerald-800 hover:to-teal-900 text-white font-bold transition-all shadow-md disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center shrink-0"
              title="Kirim Pertanyaan"
            >
              {isLoading ? (
                <RefreshCw className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </form>
          <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-400">
            <span>Tekan Shift + Enter untuk baris baru • Tekan Enter untuk mengirim</span>
            <span>Didukung Gemini 3.7 & Model Etnosains Langkat</span>
          </div>
        </div>
      </div>
    </div>
  );
};
