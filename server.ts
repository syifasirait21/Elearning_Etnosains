import express, { Request, Response } from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const SYSTEM_PROMPT = `Anda adalah "🤖 Asisten Belajar Biologi Etnosains", tutor pendidikan AI yang ramah, komunikatif, dan memotivasi peserta didik SMA dalam media E-Learning Biologi bermuatan Etnosains Rumah Melayu Langkat pada materi Perubahan Lingkungan.

TUGAS DAN FUNGSI UTAMA:
1. Membantu peserta didik memahami materi dengan bahasa yang lugas, terstruktur, dan mudah dipahami tingkat SMA.
2. Menjawab pertanyaan terkait materi pembelajaran e-learning:
   - Perubahan Lingkungan (keseimbangan ekosistem, faktor alami dan antropogenik, daya lentur dan daya dukung lingkungan).
   - Penebangan Hutan (deforestasi di wilayah Langkat & Taman Nasional Gunung Leuser, hilangnya tutupan kanopi, erosi lereng, sedimentasi sungai, banjir bandang).
   - Pencemaran Lingkungan (pencemaran air Sungai Wampu akibat limbah cair industri sawit dan domestik, pencemaran udara, dan pencemaran tanah).
   - Etnosains Rumah Melayu Langkat (arsitektur panggung kayu nibung/ulin adaptasi pasang surut banjir Sungai Wampu, atap bumbung rumbia dengan kisi-kisi ventilasi termal alami, sistem pasak kayu non-korosif, pelestarian resapan tanah).
   - Literasi Lingkungan (kompetensi kognitif ekologi, sikap afektif peduli lingkungan, dan tindakan nyata pelestarian alam).
3. Memberikan penjelasan sederhana dengan analogi ilmiah sehari-hari.
4. Memberikan petunjuk (hints / scaffolding) bertahap ketika peserta didik mengalami kesulitan belajar atau menganalisis studi kasus.
5. Memberikan 1-2 pertanyaan pemantik reflektif di akhir penjelasan untuk memicu rasa ingin tahu peserta didik.

ATURAN KETAT PEDAGOGIS:
- ATURAN 1 (DILARANG MEMBERIKAN JAWABAN LANGSUNG SOAL EVALUASI): Jika peserta didik menanyakan jawaban langsung untuk soal kuis, evaluasi pilihan ganda, atau tugas asesmen (seperti "apa jawaban nomor 2?", "pilihan mana yang benar?", "jawabannya A atau C?"), ANDA DILARANG KERAS memberikan huruf pilihan atau jawaban langsung! Berikan petunjuk konsep, kata kunci analisis, atau pertanyaan penuntun agar peserta didik menemukan jawabannya sendiri secara mandiri.
- ATURAN 2 (PENGALIHAN DI LUAR MATERI): Jika peserta didik bertanya hal di luar topik biologi, lingkungan, atau etnosains Langkat (misal game, teknologi umum tak terkait, gosip, dsb.), jawablah dengan sopan dan ramah lalu arahkan kembali ke materi pembelajaran e-learning ini.
- ATURAN 3 (FORMAT JAWABAN): Gunakan format Markdown yang rapi dengan poin-poin (bullet points), tebalkan istilah kunci (bold), dan gunakan sapaan ramah seperti "Halo Sahabat Biologi!" atau "Pertanyaan yang sangat bagus!".`;

function getLocalAiFallback(prompt: string, contextTopic?: string): string {
  const lower = prompt.toLowerCase();

  // Guardrail for evaluation direct answer
  if (lower.includes('jawaban nomor') || lower.includes('kunci jawaban') || lower.includes('soal no') || lower.includes('pilihan a atau')) {
    return `### 💡 Petunjuk Berpikir Kritis
Halo! Sebagai Asisten Belajar, saya **tidak dapat memberikan jawaban langsung** untuk soal evaluasi atau kuis. Namun, mari kita telusuri konsep kuncinya bersama:

1. **Pahami Kata Kunci Soal:** Perhatikan apakah soal menanyakan *faktor penyebab*, *dampak ekologis*, atau *solusi kearifan lokal*.
2. **Kaitkan dengan Materi:**
   - Jika terkait banjir DAS Wampu: Ingat peran vegetasi hutan hulu dalam menyerap air (*infiltrasi*) vs limpasan permukaan (*runoff*).
   - Jika terkait Rumah Melayu Langkat: Ingat fungsi struktur tiang panggung (*kayu nibung/ulin*) dan ventilasi atap rumbia dalam adaptasi iklim tropis basah.
3. **Analisis Opsi:** Eliminasi pilihan yang bertentangan dengan prinsip keseimbangan ekosistem.

*Pertanyaan Pemantik:* Menurut analisismu, apa akibat utama jika daerah resapan air di hulu sungai dialihfungsikan? Coba hubungkan dengan laju erosi tanah!`;
  }

  // Topic: Etnosains Rumah Melayu Langkat
  if (lower.includes('rumah melayu') || lower.includes('etnosains') || lower.includes('langkat') || lower.includes('tiang panggung') || lower.includes('atap') || contextTopic === 'etnosains') {
    return `### 🏛️ Etnosains Rumah Melayu Langkat & Adaptasi Lingkungan
Rumah Melayu Tradisional Langkat adalah bukti nyata kearifan lokal masyarakat pesisir dan tepian Sungai Wampu dalam beradaptasi dengan dinamika alam tropis basah:

1. **Struktur Tiang Panggung (Kayu Ulin/Nibung):**
   - **Masyarakat Lokal:** Menghindari banjir luapan pasang surut Sungai Wampu dan binatang buas.
   - **Sains Biologi/Fisika:** Meminimalkan kontak langsung air dengan lantai hunian, menjaga porositas tanah rawa tanpa perlu memadatkan/merusak ekosistem tanah bawah.
2. **Atap Bumbung Curam & Tebing Layar (Bahan Rumbia):**
   - Mengalirkan air hujan lebat secara cepat (*mencegah genangan dan pelapukan mikroba*).
   - Serat daun rumbia memiliki rongga udara mikroskopis (*insulasi termal alami*) sehingga suhu dalam rumah tetap sejuk tanpa AC.
3. **Ventilasi Kisi-kisi Ukir Melayu:**
   - Memanfaatkan prinsip *konveksi udara alami* (udara panas naik keluar melalui ventilasi atas, udara sejuk masuk dari bawah selasar).

*Pertanyaan Pemantik:* Mengapa penggunaan pasak kayu alami lebih ramah lingkungan dibandingkan paku logam di lingkungan rawa berkelembapan tinggi?`;
  }

  // Topic: Penebangan Hutan
  if (lower.includes('hutan') || lower.includes('penebangan') || lower.includes('deforestasi') || lower.includes('leuser') || contextTopic === 'penebangan') {
    return `### 🌲 Dampak Penebangan Hutan terhadap Ekosistem
Penebangan hutan, khususnya di kawasan tangkapan air DAS Langkat dan penyangga TNGL, memicu efek berantai pada biosfer:

1. **Hilangnya Kanopi Pohon:** Tetesan air hujan menghantam tanah secara langsung tanpa tertahan tajuk pohon (*kekuatan kinetik tinggi*), memecah agregat tanah.
2. **Penurunan Infiltrasi:** Akal perakaran pohon yang biasanya membentuk pori-pori tanah makro lenyap, sehingga air tidak meresap ke akuifer melainkan menjadi **limpasan permukaan (run-off)** penyebab banjir bandang.
3. **Erosi dan Sedimentasi:** Lapisan *topsoil* subur terbawa menuju Sungai Wampu, menyebabkan pendangkalan sungai dan kekeruhan air (*turbiditas tinggi*), yang menghambat fotosintesis produsen akuatik.

*Pertanyaan Pemantik:* Bagaimana restorasi tanaman lokal perintis (*pioneer species*) dapat mempercepat pemulihan struktur tanah bekas tebangan?`;
  }

  // Topic: Pencemaran Lingkungan
  if (lower.includes('cemar') || lower.includes('pencemaran') || lower.includes('limbah') || lower.includes('sungai wampu') || lower.includes('bod') || lower.includes('cod') || contextTopic === 'pencemaran') {
    return `### 🧪 Analisis Pencemaran Lingkungan
Pencemaran lingkungan terjadi ketika zat pencemar (*polutan*) melebihi nilai ambang batas toleransi ekosistem:

- **Pencemaran Air (Sungai Wampu):**
  - Masuknya limbah organik meningkatkan aktivitas bakteri pengurai aerobik, menyebabkan parameter **BOD (Biochemical Oxygen Demand)** melonjak dan **DO (Dissolved Oxygen)** anjlok. Akibatnya, organisme air seperti ikan mengalami asfiksia (kekurangan oksigen).
- **Pencemaran Tanah:**
  - Akumulasi zat kimia sintetis mematikan dekomposer (cacing tanah, mikoriza), merusak daur biogeokimia hara.
- **Pencemaran Udara:**
  - Emisi gas CO₂, SO₂, dan partikulat debu mengubah kualitas udara dan berkontribusi terhadap pemanasan mikro wilayah perkebunan.

*Pertanyaan Pemantik:* Dari sudut pandang biologi, mengapa pemanfaatan tanaman eceng gondok atau kiambang (*fitoremediasi*) efektif menurunkan beban cemaran air limbah?`;
  }

  // Off-topic redirection
  if (lower.includes('game') || lower.includes('sepak bola') || lower.includes('film') || lower.includes('resep') || lower.includes('harga')) {
    return `Halo! Topik yang kamu tanyakan sangat menarik, namun sebagai **🤖 Asisten Belajar Biologi Etnosains**, fokus saya adalah mendampingi belajarmu pada materi:
- 🌿 **Perubahan Lingkungan & Keseimbangan Ekosistem**
- 🌲 **Penebangan Hutan & Daerah Aliran Sungai Langkat**
- 💧 **Pencemaran Air, Udara, dan Tanah**
- 🏛️ **Etnosains Rumah Melayu Tradisional Langkat**
- 📚 **Literasi & Aksi Konservasi Lingkungan**

Yuk, ada bagian dari materi pembelajaran ini yang ingin kita diskusikan bersama?`;
  }

  // General default response
  return `### 🌿 Pemahaman Konsep Biologi Lingkungan
Halo! Senang bisa mendampingi proses belajarmu. Dalam pembelajaran biologi lingkungan berbasis etnosains Rumah Melayu Langkat, kita mempelajari bagaimana manusia berinteraksi selaras dengan alam:

1. **Keseimbangan Ekosistem:** Setiap perubahan pada komponen biotik (seperti tutupan pohon) akan mempengaruhi komponen abiotik (kualitas air, suhu tanah, laju erosi).
2. **Kearifan Lokal sebagai Solusi Ekologis:** Nenek moyang masyarakat Melayu Langkat telah menerapkan sains modern secara intuitif melalui arsitektur panggung kayu ulin dan atap rumbia yang adaptif terhadap pasang surut air dan suhu tropis tanpa merusak alam.

*Pertanyaan Pemantik:* Konsep materi mana yang sedang ingin kamu perdalam saat ini? Jangan ragu bertanya, mari kita diskusikan!`;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Server-side Gemini AI client initialization with aistudio-build telemetry
  let geminiAi: GoogleGenAI | null = null;
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey) {
    geminiAi = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }

  // Health check endpoint
  app.get("/api/health", (req: Request, res: Response) => {
    res.json({ status: "ok", aiEnabled: Boolean(apiKey) });
  });

  // AI Chat endpoint for "🤖 Asisten Belajar"
  app.post("/api/ai-chat", async (req: Request, res: Response) => {
    try {
      const { message, history, currentTopic } = req.body;

      if (!message || typeof message !== 'string') {
        res.status(400).json({ error: 'Pesan pertanyaan tidak boleh kosong.' });
        return;
      }

      // If Gemini AI client is configured with API key
      if (geminiAi) {
        try {
          const contents: any[] = [];

          // Add previous conversation history if provided (up to last 6 turns)
          if (Array.isArray(history)) {
            const recentHistory = history.slice(-6);
            for (const h of recentHistory) {
              if (h.role && h.text) {
                contents.push({
                  role: h.role === 'user' ? 'user' : 'model',
                  parts: [{ text: h.text }],
                });
              }
            }
          }

          // Append current user message with context hint
          const userPrompt = currentTopic
            ? `[Konteks Materi E-Learning: ${currentTopic}]\nPertanyaan Siswa: ${message}`
            : message;

          contents.push({
            role: 'user',
            parts: [{ text: userPrompt }],
          });

          const response = await geminiAi.models.generateContent({
            model: "gemini-3.7-flash",
            contents: contents as any,
            config: {
              systemInstruction: SYSTEM_PROMPT,
              temperature: 0.7,
              topP: 0.95,
            },
          });

          const aiText = response.text || getLocalAiFallback(message, currentTopic);
          res.json({ reply: aiText, source: 'gemini' });
          return;
        } catch (geminiError: any) {
          console.warn("Gemini API error, falling back to local pedagogical logic:", geminiError?.message || geminiError);
          const fallbackReply = getLocalAiFallback(message, currentTopic);
          res.json({ reply: fallbackReply, source: 'fallback' });
          return;
        }
      }

      // If no API key configured, use comprehensive local educational reasoning
      const localReply = getLocalAiFallback(message, currentTopic);
      res.json({ reply: localReply, source: 'local' });
    } catch (err: any) {
      console.error("AI Chat handler error:", err);
      res.status(500).json({
        error: 'Terjadi kendala pada layanan Asisten Belajar.',
        details: err?.message || String(err),
      });
    }
  });

  // Vite development vs production middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
