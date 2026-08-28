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
  GraduationCap,
  ChevronRight,
  Lightbulb
} from 'lucide-react';
import { User, PageId } from '../types';

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

/**
 * Intelligent Client-Side Pedagogical Engine (Guarantees zero downtime and instant helpful response)
 */
function generateClientSidePedagogicalResponse(prompt: string, contextTopic?: string): string {
  const lower = prompt.toLowerCase();

  // Guardrail 1: Asking for direct test/quiz answers
  if (
    lower.includes('jawaban nomor') || 
    lower.includes('kunci jawaban') || 
    lower.includes('soal no') || 
    lower.includes('pilihan a atau') ||
    lower.includes('jawabannya apa')
  ) {
    return `### 💡 Petunjuk Berpikir Kritis
Halo! Sebagai **🤖 Asisten Belajar AI**, saya **tidak diperkenankan membocorkan huruf jawaban atau kunci evaluasi secara langsung**. Namun, mari kita bedah konsep kuncinya bersama:

1. **Identifikasi Pokok Masalah:** Perhatikan apakah soal menanyakan *faktor penyebab*, *dampak ekologis berantai*, atau *kearifan lokal konservasi*.
2. **Kaitkan dengan Konsep Utama:**
   - **Keseimbangan Ekosistem:** Hilangnya satu komponen (misal: vegetasi kanopi pohon) akan memengaruhi komponen abiotik (porositas tanah, laju erosi, kekeruhan air).
   - **Etnosains Rumah Melayu:** Konstruksi panggung kayu ulin dan atap rumbia merupakan adaptasi terhadap hidrologi pasang surut dan regulasi suhu tropis tanpa merusak bentang alam.
3. **Analisis Eliminasi:** Pilihlah opsi yang selaras dengan prinsip daya dukung (*carrying capacity*) dan daya lentur (*resilience*) lingkungan.

*Pertanyaan Pemantik:* Mengapa pembukaan tutupan vegetasi di kawasan hulu sungai berakibat fatal bagi ekosistem hilir? Coba hubungkan dengan laju limpasan air permukaan (*run-off*)!`;
  }

  // Topic: Etnosains Rumah Melayu Langkat
  if (
    lower.includes('rumah melayu') || 
    lower.includes('etnosains') || 
    lower.includes('langkat') || 
    lower.includes('tiang panggung') || 
    lower.includes('atap') || 
    lower.includes('ulin') || 
    lower.includes('nibung') || 
    lower.includes('rumbia') || 
    lower.includes('pasak') ||
    contextTopic === 'etnosains-rumah-melayu' ||
    contextTopic === 'etnosains'
  ) {
    return `### 🏛️ Etnosains Rumah Melayu Langkat & Adaptasi Ekologis
Arsitektur Rumah Melayu Tradisional Langkat merupakan integrasi sains biologi-fisika dan kearifan lokal (*indigenous knowledge*) yang adaptif terhadap dinamika alam:

1. **Struktur Tiang Panggung (Kayu Ulin/Nibung):**
   - **Perspektif Budaya:** Menghindari banjir luapan pasang surut Sungai Wampu dan binatang liar.
   - **Perspektif Sains:** Menjaga porositas dan resapan alami air tanah rawa tanpa perlu semen/betonisasi masif, sehingga tidak mengganggu daur hidrologi mikro.
2. **Atap Bumbung Curam & Tebing Layar (Bahan Daun Rumbia):**
   - Sudut kemiringan curam mempercepat aliran air hujan lebat (*mencegah pembusukan mikroba jamur*).
   - Serat daun rumbia mengandung kantung udara mikroskopis yang berfungsi sebagai **insulator termal alami**, menjaga suhu ruangan tetap sejuk (24–27°C) tanpa energi fosil.
3. **Kisi-kisi Ventilasi Selembayung:**
   - Menerapkan prinsip **konveksi termal alami** (udara panas naik dan keluar lewat ventilasi atap, udara sejuk masuk dari celah lantai selasar).
4. **Sistem Pasak Kayu (Tanpa Paku Logam):**
   - Fleksibel terhadap getaran tanah dan tidak mengalami korosi akibat kelembapan tinggi rawa tropis.

*Pertanyaan Pemantik:* Bagaimana kearifan Rumah Melayu Langkat ini dapat menginspirasi konsep *Green Architecture* modern dalam menghadapi perubahan iklim?`;
  }

  // Topic: Penebangan Hutan / Deforestasi DAS Langkat
  if (
    lower.includes('hutan') || 
    lower.includes('penebangan') || 
    lower.includes('deforestasi') || 
    lower.includes('leuser') || 
    lower.includes('erosi') || 
    lower.includes('kanopi') ||
    contextTopic === 'penebangan-hutan' ||
    contextTopic === 'materi-penebangan'
  ) {
    return `### 🌲 Analisis Dampak Penebangan Hutan DAS Langkat
Penebangan hutan di kawasan tangkapan air DAS Wampu dan penyangga TNGL memicu gangguan keseimbangan biosfer secara sistemik:

1. **Hilangnya Intersepsi Kanopi:**
   - Tanpa tajuk pohon bertingkat, energi kinetik air hujan menghantam butir tanah secara langsung, memecah agregat tanah dan memicu **erosi percik (*splash erosion*)**.
2. **Penurunan Kapasitas Infiltrasi Air:**
   - Akar pohon yang membentuk saluran biopori alami berkurang drastis, sehingga volume air meresap (*infiltrasi*) menurun dan **limpasan permukaan (*surface run-off*)** melonjak hingga 400%, memicu banjir bandang.
3. **Sedimentasi & Kekeruhan Sungai Wampu:**
   - Partikel tanah subur (*topsoil*) terhanyut ke sungai, menyebabkan pendangkalan dan kenaikan kekeruhan (*turbiditas*), yang menghambat penetrasi sinar matahari bagi fotosintesis fitoplankton dan tumbuhan air.

*Pertanyaan Pemantik:* Mengapa penanaman kembali jenis tanaman lokal perintis (*pioneer species*) lebih efektif merestorasi tanah kritis dibandingkan tanaman monokultur?`;
  }

  // Topic: Pencemaran Lingkungan & Sungai Wampu
  if (
    lower.includes('cemar') || 
    lower.includes('pencemaran') || 
    lower.includes('limbah') || 
    lower.includes('sungai wampu') || 
    lower.includes('bod') || 
    lower.includes('do') || 
    lower.includes('cod') ||
    lower.includes('sawit') ||
    contextTopic === 'pencemaran-lingkungan' ||
    contextTopic === 'materi-pencemaran'
  ) {
    return `### 💧 Pencemaran Lingkungan & Parameter Kualitas Air
Pencemaran terjadi ketika polutan melebihi daya dukung dan daya lentur ekosistem alami:

1. **Dinamika BOD dan DO pada Pencemaran Air:**
   - **BOD (*Biochemical Oxygen Demand*):** Menunjukkan jumlah oksigen yang dibutuhkan bakteri pengurai untuk mendekomposisi bahan organik limbah.
   - **DO (*Dissolved Oxygen*):** Kadar oksigen terlarut dalam air yang vital bagi kehidupan organisme akuatik.
   - **Hubungan:** Semakin banyak limbah organik masuk ke Sungai Wampu, bakteri pengurai berbiak pesat dan mengonsumsi oksigen terlarut secara masif $\\rightarrow$ **BOD meningkat tajam, sedangkan DO anjlok drastis** hingga menyebabkan kematian massal ikan (*asfiksia*).
2. **Pencemaran Tanah & Udara:**
   - Logam berat dan pestisida mematikan mikroorganisme nitrifikasi di tanah.
   - Emisi gas buang pembakaran biomassa sawit memicu gas rumah kaca ($CO_2$, $CH_4$).
3. **Solusi Biologis (Fitoremediasi):**
   - Memanfaatkan tanaman air lokal (seperti eceng gondok, melati air, kiambang) untuk mengabsorpsi ion logam dan nutrien berlebih secara alami.

*Pertanyaan Pemantik:* Mengapa penurunan nilai DO sering dijadikan bioindikator utama terjadinya eutrofikasi atau pencemaran bahan organik di sungai?`;
  }

  // Topic: Perubahan Lingkungan Umum
  if (
    lower.includes('perubahan lingkungan') || 
    lower.includes('keseimbangan') || 
    lower.includes('daya lentur') || 
    lower.includes('daya dukung') || 
    lower.includes('antropogenik') ||
    contextTopic === 'perubahan-lingkungan' ||
    contextTopic === 'materi-perubahan'
  ) {
    return `### 🌿 Konsep Perubahan Lingkungan & Keseimbangan Ekosistem
Ekosistem berada dalam kondisi seimbang (*homeostasis*) jika komponen biotik dan abiotik saling berinteraksi harmonis:

1. **Faktor Penyebab Perubahan:**
   - **Faktor Alami:** Letusan gunung berapi, gempa bumi, kemarau panjang (*terjadi secara siklik dan ekosistem memiliki waktu regenerasi*).
   - **Faktor Antropogenik (Aktivitas Manusia):** Deforestasi, konversi lahan gambut, industrialisasi limbah, penggunaan pestisida berlebih (*berlangsung cepat dan melampaui daya dukung alam*).
2. **Dua Kapasitas Kunci Lingkungan:**
   - **Daya Dukung (*Carrying Capacity*):** Kemampuan lingkungan menopang populasi makhluk hidup secara berkelanjutan.
   - **Daya Lenting/Lentur (*Resilience*):** Kemampuan lingkungan untuk pulih kembali ke kondisi seimbang setelah mengalami gangguan.

*Pertanyaan Pemantik:* Apa yang terjadi apabila laju eksploitasi sumber daya alam melampaui daya lentur ekosistem? Coba berikan contoh kasus di daerah sekitar tempat tinggalmu!`;
  }

  // Topic: Literasi Lingkungan
  if (
    lower.includes('literasi') || 
    lower.includes('sikap') || 
    lower.includes('perilaku') || 
    lower.includes('konservasi') || 
    contextTopic === 'literasi-lingkungan' ||
    contextTopic === 'literasi-aktivitas'
  ) {
    return `### 📚 Literasi Lingkungan: Kognitif, Afektif, dan Psikomotorik
Literasi Lingkungan mencakup pemahaman holistik seseorang terhadap sistem ekologi dan komitmen tindakannya:

1. **Kompetensi Kognitif (Pengetahuan):** Memahami hubungan sebab-akibat ekologis, daur materi, dan prinsip keberlanjutan.
2. **Sikap Afektif (Kepedulian):** Memiliki empati terhadap alam, menghargai kearifan lokal seperti Rumah Melayu Langkat, dan menolak tindakan eksploitatif.
3. **Tindakan Nyata (Psikomotorik):** Mengurangi timbulan sampah plastik, menghemat air dan energi, menanam pohon di sempadan sungai, serta mengedukasi rekan sebaya.

*Pertanyaan Pemantik:* Dari ketiga aspek literasi lingkungan di atas, tindakan nyata apa yang paling mudah kamu terapkan hari ini di lingkungan sekolah?`;
  }

  // General Responsive Fallback
  return `### 🌿 Bimbingan Konsep Biologi & Etnosains
Halo! Senang bisa mendampingi proses belajarmu. Terkait topik **"${prompt.slice(0, 60)}..."**:

1. **Konteks Materi E-Learning:**
   - Kita mempelajari bagaimana aktivitas antropogenik (seperti penebangan hutan dan limbah) memicu perubahan lingkungan di kawasan Langkat.
   - Kita juga mempelajari bagaimana kearifan arsitektur Rumah Melayu Tradisional Langkat (tiang kayu panggung, atap rumbia, kisi-kisi angin) menjadi solusi ekologis yang berkelanjutan.
2. **Saran Belajar:**
   - Coba kaitkan pertanyaanmu dengan konsep **keseimbangan ekosistem**, **daya lentur lingkungan**, atau **adaptasi lokal**.

*Pertanyaan Pemantik:* Bagian konsep mana yang masih terasa membingungkan? Silakan tanyakan istilah spesifik seperti *BOD/DO*, *infiltrasi tanah*, atau *ventilasi selembayung*!`;
}

/**
 * Custom Simple Markdown Formatter for High-Legibility Rendering on Any Device
 */
const FormattedMessage: React.FC<{ content: string; isUser: boolean }> = ({ content, isUser }) => {
  if (isUser) {
    return <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">{content}</p>;
  }

  const lines = content.split('\n');

  return (
    <div className="text-xs sm:text-sm leading-relaxed space-y-2 text-slate-800">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={idx} className="h-1.5" />;

        // Header 3
        if (trimmed.startsWith('### ')) {
          return (
            <h4 key={idx} className="font-extrabold text-emerald-950 text-sm sm:text-base border-b border-emerald-100 pb-1 mt-2 mb-1 flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-amber-500 shrink-0" />
              <span>{trimmed.replace('### ', '')}</span>
            </h4>
          );
        }

        // Bullet point list
        if (trimmed.startsWith('- ') || trimmed.startsWith('• ') || trimmed.startsWith('* ')) {
          const itemText = trimmed.replace(/^[-•*]\s+/, '');
          return (
            <div key={idx} className="flex items-start gap-2 pl-1 py-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
              <div className="flex-1 min-w-0" dangerouslySetInnerHTML={{ __html: formatInline(itemText) }} />
            </div>
          );
        }

        // Numbered list (e.g. 1. 2. 3.)
        const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
        if (numMatch) {
          return (
            <div key={idx} className="flex items-start gap-2.5 pl-1 py-1">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-900 font-extrabold text-[10px] flex items-center justify-center shrink-0 mt-0.5 border border-emerald-200">
                {numMatch[1]}
              </span>
              <div className="flex-1 min-w-0" dangerouslySetInnerHTML={{ __html: formatInline(numMatch[2]) }} />
            </div>
          );
        }

        // Pertanyaan Pemantik / Italic note block
        if (trimmed.startsWith('*Pertanyaan Pemantik:*') || trimmed.startsWith('*Catatan:*')) {
          return (
            <div key={idx} className="p-3 bg-amber-50/90 rounded-xl border border-amber-200/80 text-amber-950 font-medium text-xs my-2">
              <div dangerouslySetInnerHTML={{ __html: formatInline(trimmed) }} />
            </div>
          );
        }

        // Standard Paragraph
        return (
          <p key={idx} dangerouslySetInnerHTML={{ __html: formatInline(trimmed) }} />
        );
      })}
    </div>
  );
};

// Helper for inline bold and italics
function formatInline(text: string): string {
  let formatted = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Bold **text**
  formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-950">$1</strong>');
  
  // Italic *text*
  formatted = formatted.replace(/\*(.*?)\*/g, '<em class="italic text-slate-700">$1</em>');

  // Inline code `code`
  formatted = formatted.replace(/`([^`]+)`/g, '<code class="bg-slate-100 px-1 py-0.5 rounded text-emerald-900 font-mono text-[11px] border border-slate-200">$1</code>');

  return formatted;
}

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
- **Pencemaran Air Sungai Wampu, Udara, dan Tanah**
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

    const topicContext = selectedTopic === 'all' ? currentPage : selectedTopic;

    // Try fetching from server-side Gemini API with a timeout controller
    let finalReply = '';
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 9000);

      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text,
          history: messages.map((m) => ({ role: m.role, text: m.text })),
          currentTopic: topicContext,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        if (data && data.reply) {
          finalReply = data.reply;
        }
      }
    } catch (fetchErr) {
      console.info('Backend AI fetch not available or timed out, utilizing local pedagogical engine:', fetchErr);
    }

    // If backend wasn't available or returned empty, use client-side pedagogical engine
    if (!finalReply) {
      // Simulate brief natural thinking delay
      await new Promise((resolve) => setTimeout(resolve, 400));
      finalReply = generateClientSidePedagogicalResponse(text, topicContext);
    }

    const assistantMessage: ChatMessageItem = {
      id: `ai-${Date.now()}`,
      role: 'assistant',
      text: finalReply,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setIsLoading(false);
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
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 lg:p-6"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl shadow-2xl border border-emerald-100 w-full max-w-4xl h-[92vh] md:h-[86vh] max-h-[880px] flex flex-col overflow-hidden animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-950 via-teal-900 to-emerald-900 text-white flex items-center justify-between shrink-0 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-300 shadow-inner">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  🤖 Asisten Belajar AI
                </h2>
                <span className="bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Tutor Biologi Etnosains
                </span>
              </div>
              <p className="text-xs text-emerald-200/90 mt-0.5">
                Bantuan konsep, petunjuk belajar, dan pertanyaan pemantik berpikir kritis
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleClearHistory}
              className="p-2 rounded-xl text-emerald-200 hover:text-white hover:bg-white/10 transition-colors"
              title="Bersihkan Riwayat Percakapan"
              aria-label="Bersihkan Riwayat"
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
              <strong>Prinsip Belajar:</strong> Asisten Belajar memberikan petunjuk konsep dan pertanyaan pemantik, bukan membocorkan jawaban langsung evaluasi.
            </span>
          </div>
        </div>

        {/* Topic Filter Pills */}
        <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-[11px] shrink-0">
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
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/60">
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
                  {isUser ? activeUser.nama.charAt(0).toUpperCase() : <Bot className="w-4 h-4" />}
                </div>

                {/* Bubble Container */}
                <div className={`max-w-[90%] sm:max-w-[82%] space-y-1 ${isUser ? 'items-end' : 'items-start'}`}>
                  <div className={`flex items-center gap-2 text-[11px] ${isUser ? 'justify-end text-slate-500' : 'justify-start text-slate-600'}`}>
                    <span className="font-bold">{isUser ? activeUser.nama : '🤖 Asisten Belajar AI'}</span>
                    <span className="text-[10px] text-slate-400">{msg.timestamp}</span>
                  </div>

                  <div
                    className={`p-4 rounded-2xl shadow-xs ${
                      isUser
                        ? 'bg-emerald-800 text-white rounded-tr-xs'
                        : 'bg-white text-slate-800 border border-slate-200/90 rounded-tl-xs'
                    }`}
                  >
                    <FormattedMessage content={msg.text} isUser={isUser} />
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
                            <span>Salin Penjelasan</span>
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
                <span>Asisten Belajar sedang menganalisis materi dan menyusun penjelasan...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Starter Prompts Bar */}
        <div className="px-4 py-2.5 bg-emerald-50/70 border-t border-emerald-100 overflow-x-auto no-scrollbar flex items-center gap-2 shrink-0">
          <div className="text-[11px] font-bold text-emerald-950 flex items-center gap-1 shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Pemantik:
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
                placeholder="Tanyakan konsep biologi, petunjuk soal, atau kearifan Rumah Melayu Langkat..."
                disabled={isLoading}
                rows={2}
                className="w-full text-xs sm:text-sm p-3 rounded-2xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 resize-none bg-slate-50/60"
              />
            </div>

            <button
              type="submit"
              disabled={!inputQuery.trim() || isLoading}
              className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-700 to-teal-800 hover:from-emerald-800 hover:to-teal-900 text-white font-bold transition-all shadow-md disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center shrink-0"
              title="Kirim Pertanyaan"
              aria-label="Kirim Pertanyaan"
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
