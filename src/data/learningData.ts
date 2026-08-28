import { PageId, QuizQuestion, EvaluationQuestion, StudentProgress } from '../types';

export interface PageMenuItem {
  id: PageId;
  number: number;
  title: string;
  shortTitle: string;
  category: 'Pengantar' | 'Eksplorasi' | 'Materi Inti' | 'Aktivitas' | 'Evaluasi' | 'Manajemen';
  description: string;
  iconName: string;
}

export const LEARNING_PAGES: PageMenuItem[] = [
  {
    id: 'beranda',
    number: 1,
    title: 'Beranda',
    shortTitle: 'Beranda',
    category: 'Pengantar',
    description: 'Halaman utama media e-learning biologi etnosains Rumah Melayu Langkat.',
    iconName: 'Home'
  },
  {
    id: 'petunjuk',
    number: 2,
    title: 'Petunjuk Pembelajaran',
    shortTitle: 'Petunjuk',
    category: 'Pengantar',
    description: 'Alur kegiatan belajar, navigasi sistem, dan pelacak capaian progress.',
    iconName: 'Compass'
  },
  {
    id: 'tujuan',
    number: 3,
    title: 'Tujuan Pembelajaran',
    shortTitle: 'Tujuan Belajar',
    category: 'Pengantar',
    description: 'Capaian kompetensi dan aspek literasi lingkungan yang dilatihkan.',
    iconName: 'Target'
  },
  {
    id: 'orientasi',
    number: 4,
    title: 'Orientasi Permasalahan Lingkungan',
    shortTitle: 'Orientasi Masalah',
    category: 'Eksplorasi',
    description: 'Pengamatan fenomena faktual lingkungan dan perumusan pertanyaan kritis.',
    iconName: 'AlertTriangle'
  },
  {
    id: 'etnosains',
    number: 5,
    title: 'Eksplorasi Etnosains Rumah Melayu Langkat',
    shortTitle: 'Etnosains Melayu',
    category: 'Eksplorasi',
    description: 'Integrasi kearifan lokal arsitektur tradisional Melayu Langkat dengan sains biologi.',
    iconName: 'Landmark'
  },
  {
    id: 'materi-perubahan',
    number: 6,
    title: 'Materi Perubahan Lingkungan',
    shortTitle: 'Perubahan Lingkungan',
    category: 'Materi Inti',
    description: 'Konsep dasar, faktor alami & antropogenik, daya dukung serta daya lenting ekosistem.',
    iconName: 'Globe'
  },
  {
    id: 'materi-penebangan',
    number: 7,
    title: 'Materi Penebangan Hutan',
    shortTitle: 'Penebangan Hutan',
    category: 'Materi Inti',
    description: 'Deforestasi, daur hidrologi, erosi tanah, banjir, dan degradasi keanekaragaman hayati.',
    iconName: 'Trees'
  },
  {
    id: 'materi-pencemaran',
    number: 8,
    title: 'Materi Pencemaran Lingkungan',
    shortTitle: 'Pencemaran Lingkungan',
    category: 'Materi Inti',
    description: 'Pencemaran air, udara, tanah, parameter kualitas lingkungan, dan bioakumulasi.',
    iconName: 'Droplets'
  },
  {
    id: 'aktivitas-literasi',
    number: 9,
    title: 'Aktivitas Latihan Literasi Lingkungan',
    shortTitle: 'Latihan Literasi',
    category: 'Aktivitas',
    description: 'Latihan analitis, penafsiran data, identifikasi sebab-akibat, dan evaluasi solusi.',
    iconName: 'BookOpenCheck'
  },
  {
    id: 'studi-kasus',
    number: 10,
    title: 'Studi Kasus Lingkungan',
    shortTitle: 'Studi Kasus',
    category: 'Aktivitas',
    description: 'Penyelidikan kasus nyata kontekstual Daerah Aliran Sungai (DAS) Langkat & Solusi.',
    iconName: 'FileSearch'
  },
  {
    id: 'kuis',
    number: 11,
    title: 'Kuis Interaktif',
    shortTitle: 'Kuis Formatif',
    category: 'Evaluasi',
    description: 'Uji pemahaman komprehensif 4 topik dengan umpan balik langsung.',
    iconName: 'Award'
  },
  {
    id: 'evaluasi',
    number: 12,
    title: 'Evaluasi Akhir Pembelajaran',
    shortTitle: 'Evaluasi Akhir',
    category: 'Evaluasi',
    description: 'Post-test pengukuran literasi lingkungan peserta didik SMA.',
    iconName: 'ClipboardCheck'
  },
  {
    id: 'rangkuman',
    number: 13,
    title: 'Rangkuman & Refleksi Belajar',
    shortTitle: 'Rangkuman & Refleksi',
    category: 'Evaluasi',
    description: 'Sintesis materi biologi etnosains dan lembar komitmen aksi pelestarian lingkungan.',
    iconName: 'BookOpenCheck'
  },
  {
    id: 'dashboard-siswa',
    number: 14,
    title: 'Dashboard Peserta Didik',
    shortTitle: 'Dashboard Siswa',
    category: 'Manajemen',
    description: 'Rekap progress belajar, skor kuis, skor evaluasi, dan unduh laporan.',
    iconName: 'UserCheck'
  },
  {
    id: 'dashboard-guru',
    number: 15,
    title: 'Dashboard Guru',
    shortTitle: 'Dashboard Guru',
    category: 'Manajemen',
    description: 'Rekap data penelitian, analisis capaian kelas, rincian jawaban & ekspor data.',
    iconName: 'LayoutDashboard'
  }
];

export const ETHNOSCIENCE_FACTS = [
  {
    title: 'Arsitektur Rumah Panggung Kayu (Tiang Bebas Pondasi Masif)',
    localWisdom: 'Masyarakat Melayu Langkat membangun rumah panggung dengan ketinggian 1,5 hingga 2,5 meter di atas tanah menggunakan kayu keras tahan air seperti Cengal dan Merbau.',
    scienceConnection: 'Adaptasi ekologis terhadap fluktuasi pasang surut Sungai Batang Serangan dan banjir musiman. Kolong panggung mempertahankan daerah resapan air (infiltrasi tanah tetap 100%) dan tidak merusak struktur tanah penopang.',
    icon: 'Shield'
  },
  {
    title: 'Atap Rumbia / Daun Nipah Berpori Alami',
    localWisdom: 'Atap dibuat dari anyaman daun rumbia (Metroxylon sagu) atau daun nipah (Nypa fruticans) yang dipanen secara lestari dari rawa pesisir Langkat.',
    scienceConnection: 'Daun rumbia memiliki konduktivitas termal yang sangat rendah (isolator termal alami). Panas radiasi matahari diserap dan dilepaskan ke udara secara perlahan, menciptakan mikroklimat sejuk di dalam rumah tanpa konsumsi energi listrik tambahan.',
    icon: 'Sun'
  },
  {
    title: 'Ventilasi Ukir Selembayung & Kisi-kisi Silang',
    localWisdom: 'Dinding atas dan kusen dilengkapi kisi-kisi kayu berukir motif flora (Selembayung, Pucuk Rebung, Lebah Bergantung).',
    scienceConnection: 'Menerapkan prinsip ventilasi silang (cross-ventilation). Aliran udara konvektif yang kontinu menurunkan kelembaban relatif di dalam rumah sehingga menghambat perkembangbiakan spora jamur patogen dan bakteri pembusuk kayu.',
    icon: 'Wind'
  },
  {
    title: 'Pekarangan Agroekosistem & Tanaman Obat (Toga)',
    localWisdom: 'Pekarangan rumah Melayu ditanami tanaman peneduh (Kelapa, Asam Gelugur) dan tanaman rimpang obat di sekeliling batas tanah.',
    scienceConnection: 'Membentuk kanopi multi-strata yang memecah energi kinetik tetesan air hujan, mengurangi erosi percik (splash erosion), serta menjaga siklus biogeokimia tanah dan keanekaragaman mikroorganisme dekomposer.',
    icon: 'Leaf'
  },
  {
    title: 'Filosofi Adat: "Tahu Memelihara Rimba, Tahu Menjaga Sungai"',
    localWisdom: 'Adat Melayu Langkat melarang keras menebang pohon muda (anak kayu), pohon penopang sarang lebah (pohon sialang), dan membersihkan sempadan sungai.',
    scienceConnection: 'Konsep konservasi zona penyangga (riparian zone) dan pelestarian pohon induk untuk menjaga regenerasi suksesi alami hutan tropis serta menjaga kestabilan tebing sungai dari longsor.',
    icon: 'HeartHandshake'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    topic: 'perubahan',
    type: 'multiple-choice',
    question: 'Suatu ekosistem hutan mengalami gangguan akibat pembangunan jalan raya. Keseimbangan ekosistem dikatakan tetap terjaga apabila...',
    context: 'Konsep Daya Lenting (Resilience) Ekosistem',
    options: [
      { id: 'A', text: 'Semua populasi hewan berpindah ke ekosistem buatan' },
      { id: 'B', text: 'Ekosistem mampu pulih kembali ke kondisi seimbang baru melalui proses suksesi ekologis' },
      { id: 'C', text: 'Komponen abiotik digantikan sepenuhnya oleh material sintetis manusia' },
      { id: 'D', text: 'Jumlah konsumen primer meningkat tanpa batas untuk mengimbangi produsen' }
    ],
    correctAnswer: 'B',
    explanation: 'Daya lenting (resilience) adalah kemampuan ekosistem untuk pulih dan menyeimbangkan kembali struktur serta fungsinya setelah menerima gangguan dari luar.'
  },
  {
    id: 2,
    topic: 'penebangan',
    type: 'cause-effect',
    question: 'Penebangan pohon secara masif di daerah hulu Daerah Aliran Sungai (DAS) Langkat secara langsung menyebabkan banjir bandang di kawasan hilir. Urutan mekanisme sains yang paling tepat adalah...',
    context: 'Daur Hidrologi & Erosi',
    options: [
      { id: 'A', text: 'Penebangan pohon → Kanopi hilang → Infiltrasi air meningkat → Tanah mengembang → Banjir' },
      { id: 'B', text: 'Penebangan pohon → Transpirasi naik drastis → Hujan buatan terbentuk di hilir' },
      { id: 'C', text: 'Penebangan pohon → Hilangnya perakaran penahan air → Laju infiltrasi menurun & limpasan permukaan (runoff) meningkat drastis → Erosi membawa lumpur ke sungai → Pendangkalan dasar sungai → Luapan air memicu banjir' },
      { id: 'D', text: 'Penebangan pohon → Kecepatan angin sungai meningkat → Aliran air berbalik arah menuju hulu' }
    ],
    correctAnswer: 'C',
    explanation: 'Akar pohon berfungsi menjaga porositas tanah untuk infiltrasi air hujan. Tanpa vegetasi, air hujan langsung menjadi limpasan permukaan (surface runoff) dan mengikis lapisan tanah atas, menyebabkan sedimentasi dan pendangkalan sungai sehingga memicu banjir.'
  },
  {
    id: 3,
    topic: 'pencemaran',
    type: 'case-analysis',
    question: 'Sebuah sungai dekat pemukiman padat mengalami ledakan populasi eceng gondok (algal bloom/eutrofikasi) secara masif hingga permukaan air tertutup rapat. Dampak biologis berantai yang terjadi di dalam perairan adalah...',
    context: 'Parameter BOD dan DO pada Perairan',
    options: [
      { id: 'A', text: 'Kadar Dissolved Oxygen (DO) meningkat drastis dan populasi ikan bertambah' },
      { id: 'B', text: 'Cahaya matahari terhalang → Fotosintesis fitoplankton dasar terhenti → Tumbuhan air mati membusuk → Bakteri dekomposer aerob mengonsumsi oksigen terlarut → Kadar DO anjlok dan kadar BOD meningkat → Kematian massal organisme air' },
      { id: 'C', text: 'Suhu air sungai menjadi dingin beku dan pH berubah sangat asam' },
      { id: 'D', text: 'Logam berat merkuri langsung terbentuk secara spontan dari daun eceng gondok' }
    ],
    correctAnswer: 'B',
    explanation: 'Eutrofikasi akibat limbah fosfat deterjen/pupuk memicu blooming. Saat tumbuhan mati, dekomposisi oleh bakteri aerobik menghabiskan oksigen terlarut (DO turun drastis, BOD naik), menyebabkan kondisi anoksik dan kematian ikan.'
  },
  {
    id: 4,
    topic: 'etnosains',
    type: 'multiple-choice',
    question: 'Masyarakat Melayu Langkat secara turun-temurun menggunakan bahan daun Rumbia (Nypa fruticans / Metroxylon sagu) sebagai atap rumah. Dilihat dari sudut pandang Biologi Lingkungan dan Sains Termal, keuntungan utama pemilihan bahan ini adalah...',
    context: 'Etnosains Bahan Alami Rumah Tradisional',
    options: [
      { id: 'A', text: 'Mengandung zat kimia sintetis yang memantulkan 100% gelombang radio' },
      { id: 'B', text: 'Struktur serat selulosa alami memiliki konduktivitas termal rendah sehingga menjadi isolator panas alami yang hemat energi dan ramah lingkungan' },
      { id: 'C', text: 'Dapat menarik petir untuk dimanfaatkan sebagai sumber listrik rumah tangga' },
      { id: 'D', text: 'Mempercepat penguapan air di dalam rumah agar suhu ruangan menjadi sangat lembab' }
    ],
    correctAnswer: 'B',
    explanation: 'Serat selulosa pada daun rumbia memiliki rongga mikroskopis udara yang membuatnya berfungsi sebagai insulator panas yang sangat baik, menjaga ruangan tetap sejuk tanpa AC.'
  },
  {
    id: 5,
    topic: 'etnosains',
    type: 'true-false',
    question: 'Konstruksi rumah panggung Melayu Langkat dengan tiang kayu tanpa mengecor seluruh permukaan tanah di bawahnya merupakan bentuk mitigasi bencana banjir sekaligus menjaga fungsi hidrologis tanah.',
    context: 'Resapan Air & Mitigasi Bencana',
    options: [
      { id: 'true', text: 'BENAR — Karena kolong panggung menjaga permukaan tanah tetap terbuka untuk meresapkan air hujan (infiltrasi) dan menghindari genangan banjir mencapai ruang hunian.' },
      { id: 'false', text: 'SALAH — Karena tanah di bawah rumah panggung tidak memiliki manfaat sama sekali bagi siklus air tanah.' }
    ],
    correctAnswer: 'true',
    explanation: 'Rumah panggung menjaga pori-pori tanah tetap terbuka untuk infiltrasi air hujan, mengurangi koefisien limpasan (runoff) serta meninggikan lantai hunian dari luapan pasang surut sungai.'
  },
  {
    id: 6,
    topic: 'pencemaran',
    type: 'multiple-choice',
    question: 'Pencemaran tanah oleh limbah plastik non-biodegradable menimbulkan ancaman serius bagi kelangsungan ekosistem tanah karena...',
    context: 'Dekomposer & Porositas Tanah',
    options: [
      { id: 'A', text: 'Plastik memancarkan radiasi elektromagnetik frekuensi tinggi ke akar tanaman' },
      { id: 'B', text: 'Plastik menghalangi sirkulasi oksigen dan peresapan air ke lapisan dalam tanah serta mengganggu aktivitas cacing tanah dan mikroba dekomposer' },
      { id: 'C', text: 'Plastik secara instan mengubah semua partikel tanah menjadi batu bara' },
      { id: 'D', text: 'Plastik meningkatkan populasi bakteri fiksasi nitrogen secara tak terkendali' }
    ],
    correctAnswer: 'B',
    explanation: 'Plastik yang tidak dapat terurai membentuk penghalang fisik yang merusak agregat tanah, menghambat aerasi oksigen dan pergerakan air tanah, serta meracuni mikroorganisme dekomposer.'
  },
  {
    id: 7,
    topic: 'penebangan',
    type: 'multiple-choice',
    question: 'Konversi hutan primer menjadi perkebunan monokultur secara luas di kawasan penyangga Langkat menyebabkan hilangnya keanekaragaman hayati karena...',
    context: 'Stabilitas Rantai Makanan Hutan Hujan',
    options: [
      { id: 'A', text: 'Hutan monokultur memiliki struktur tajuk seragam dan rantai makanan yang sangat sederhana sehingga rentan terhadap ledakan hama dan kehilangan relung ekologis spesies asli' },
      { id: 'B', text: 'Semua hewan karnivora akan langsung berubah menjadi herbivora pemakan sawit' },
      { id: 'C', text: 'Kelembaban udara di perkebunan monokultur selalu mencapai 100%' },
      { id: 'D', text: 'Fotosintesis tanaman monokultur tidak menghasilkan oksigen' }
    ],
    correctAnswer: 'A',
    explanation: 'Hutan primer memiliki keanekaragaman hayati tinggi dengan jaring-jaring makanan yang rumit dan stabil. Monokultur mereduksi relung ekologis (niche), memicu kerentanan ekologis dan hilangnya spesies endemik seperti Orangutan Sumatera.'
  },
  {
    id: 8,
    topic: 'etnosains',
    type: 'case-analysis',
    question: 'Adat Melayu Langkat menerapkan aturan "Rimba Larangan" dan larangan menebang Pohon Sialang (pohon tempat lebah bersarang). Keterkaitan aturan kearifan lokal ini dengan sains ekologi adalah...',
    context: 'Konservasi Keanekaragaman Hayati & Polinasi',
    options: [
      { id: 'A', text: 'Hanya bersifat takhayul tanpa nilai sains konservasi' },
      { id: 'B', text: 'Melindungi populasi lebah hutan (Apis dorsata) sebagai polinator utama keanekaragaman flora hutan dan menjaga plasma nutfah tumbuhan asli' },
      { id: 'C', text: 'Mencegah pohon tumbuh terlalu tinggi agar tidak menyentuh awan' },
      { id: 'D', text: 'Membuat kayu pohon menjadi tidak laku di pasar kayu komersial' }
    ],
    correctAnswer: 'B',
    explanation: 'Pohon Sialang menjadi habitat sarang lebah madu raksasa (Apis dorsata). Menjaga pohon ini berarti melestarikan agen penyerbuk (polinator) vital bagi regenerasi ribuan spesies pohon hutan tropis Langkat.'
  },
  {
    id: 9,
    topic: 'pencemaran',
    type: 'multiple-choice',
    question: 'Gas buang kendaraan bermotor dan industri berupa sulfur dioksida (SO2) dan nitrogen oksida (NOx) yang bereaksi dengan uap air di atmosfer akan menghasilkan...',
    context: 'Pencemaran Udara Kimiawi',
    options: [
      { id: 'A', text: 'Hujan asam (asam sulfat dan asam nitrat) yang dapat menurunkan pH tanah dan merusak kutikula daun tanaman' },
      { id: 'B', text: 'Lapisan ozon buatan yang mendinginkan suhu kutub bumi' },
      { id: 'C', text: 'Kristal gula alami yang menyuburkan seluruh tanaman' },
      { id: 'D', text: 'Gas oksigen murni berkadar 99%' }
    ],
    correctAnswer: 'A',
    explanation: 'SO2 dan NOx bereaksi dengan uap air membentuk H2SO4 dan HNO3 yang jatuh sebagai hujan asam (pH < 5.6), melarutkan unsur hara penting tanah dan merusak jaringan tumbuhan.'
  },
  {
    id: 10,
    topic: 'perubahan',
    type: 'multiple-choice',
    question: 'Sebagai seorang peserta didik yang memiliki literasi lingkungan tinggi, tindakan paling tepat dan berkelanjutan dalam merespons permasalahan tumpukan sampah plastik di lingkungan sekitar adalah...',
    context: 'Aksi Solutif Berkelanjutan',
    options: [
      { id: 'A', text: 'Membakar seluruh sampah plastik setiap sore hari di halaman terbuka' },
      { id: 'B', text: 'Membuang sampah ke sungai saat arus air sedang deras' },
      { id: 'C', text: 'Menerapkan prinsip 5R (Refuse, Reduce, Reuse, Repurpose, Recycle), membuat pemilahan sampah organik untuk kompos, dan mengedukasi warga sekitar' },
      { id: 'D', text: 'Menimbun semua plastik ke dalam sumur resapan air tanah' }
    ],
    correctAnswer: 'C',
    explanation: 'Membakar plastik menghasilkan dioksin karsinogenik; membuang ke sungai memicu banjir dan mikroplastik. Pendekatan 5R dan edukasi berbasis sains merupakan tindakan solutif yang tepat.'
  }
];

export const EVALUATION_QUESTIONS: EvaluationQuestion[] = [
  {
    id: 1,
    indicator: 'Memahami Konsep Dasar Perubahan Lingkungan',
    question: 'Perubahan lingkungan dapat dipicu oleh faktor alamiah dan faktor antropogenik. Pernyataan berikut yang paling tepat menggambarkan perubahan lingkungan akibat faktor antropogenik adalah...',
    context: 'Dampak Aktivitas Manusia terhadap Biosfer',
    options: [
      { id: 'A', text: 'Peningkatan kadar gas rumah kaca dan fragmentasi habitat akibat alih fungsi hutan menjadi lahan monokultur' },
      { id: 'B', text: 'Erupsi gunung berapi yang mengeluarkan material piroklastik dan abu vulkanik' },
      { id: 'C', text: 'Pergeseran lempeng tektonik yang memicu gempa bumi dasar laut' },
      { id: 'D', text: 'Perubahan musim kemarau dan penghujan yang teratur setiap tahun' }
    ],
    correctAnswer: 'A',
    explanation: 'Faktor antropogenik adalah perubahan lingkungan yang disebabkan secara langsung oleh aktivitas manusia, seperti deforestasi, industrialisasi, dan alih fungsi lahan.'
  },
  {
    id: 2,
    indicator: 'Mengidentifikasi Masalah Ekologis',
    question: 'Di wilayah pesisir Langkat, terjadi abrasi pantai yang parah dan intrusi air laut ke sumur-sumur air tawar warga setelah hutan mangrove dibabat untuk tambak intensif. Masalah ekologis utama yang teridentifikasi adalah...',
    context: 'Degradasi Ekosistem Mangrove Pesisir',
    options: [
      { id: 'A', text: 'Peningkatan keanekaragaman fitoplankton air tawar di sumur penduduk' },
      { id: 'B', text: 'Hilangnya zona penyangga pelindung garis pantai dan rusaknya fungsi ekologis akar mangrove sebagai penyaring alami air serta penahan gelombang' },
      { id: 'C', text: 'Terbentuknya pulau karang baru yang terlalu luas di lepas pantai' },
      { id: 'D', text: 'Penurunan suhu air laut secara drastis' }
    ],
    correctAnswer: 'B',
    explanation: 'Akar napas dan tunjang mangrove berfungsi sebagai pemecah gelombang alami dan penahan intrusi air asin. Pembabatan mangrove merusak fungsi ekologis esensial tersebut.'
  },
  {
    id: 3,
    indicator: 'Menganalisis Hubungan Sebab-Akibat',
    question: 'Perhatikan rantai kejadian berikut: [Penebangan Hutan Hulu DAS] → [X] → [Peningkatan Sedimentasi Sungai] → [Pendangkalan Muara & Banjir]. Variabel X yang tepat mengisi mekanisme hidrologis tersebut adalah...',
    context: 'Mekanisme Hidrologis Erosi Daerah Aliran Sungai',
    options: [
      { id: 'A', text: 'Penurunan laju transpirasi dan peningkatan kadar oksigen tanah' },
      { id: 'B', text: 'Hilangnya daya ikat akar tanah sehingga partikel tanah tererosi oleh air limpasan hujan' },
      { id: 'C', text: 'Peningkatan populasi cacing tanah yang menggemburkan tanah secara berlebihan' },
      { id: 'D', text: 'Penurunan curah hujan tahunan hingga mendekati nol' }
    ],
    correctAnswer: 'B',
    explanation: 'Akar pohon mengikat partikel agregat tanah. Saat pohon ditebang, tetesan hujan langsung membentur tanah dan aliran permukaan membawa partikel tanah lapisan atas menuju aliran sungai (erosi tanah).'
  },
  {
    id: 4,
    indicator: 'Integrasi Etnosains & Ekologi',
    question: 'Rumah Melayu Langkat tradisional didirikan dengan sistem panggung beralaskan tiang-tiang kayu tanpa pondasi cor semen masif di seluruh tapak. Dari kacamata konservasi air tanah, arsitektur ini unggul karena...',
    context: 'Konservasi Daerah Resapan Air (Infiltrasi)',
    options: [
      { id: 'A', text: 'Menghalangi sinar matahari agar lumut tidak tumbuh di seluruh halaman' },
      { id: 'B', text: 'Mempertahankan luas permukaan tanah terbuka sehingga kapasitas infiltrasi air hujan ke dalam akuifer air tanah tetap terjaga optimal' },
      { id: 'C', text: 'Membuat air hujan langsung mengalir cepat ke jalan raya tanpa meresap' },
      { id: 'D', text: 'Menyimpan air hujan di dalam rongga kayu tiang rumah hingga mengkristal' }
    ],
    correctAnswer: 'B',
    explanation: 'Pondasi tiang panggung memungkinkan hampir 100% permukaan tanah di bawah dan sekitar rumah tetap menjadi daerah resapan alami air hujan, mencegah limpasan banjir.'
  },
  {
    id: 5,
    indicator: 'Menganalisis Dampak Pencemaran',
    question: 'Limbah cair organik dari pabrik kelapa sawit yang langsung dibuang ke badan sungai tanpa pengolahan IPAL (Instalasi Pengolahan Air Limbah) akan memicu lonjakan parameter BOD (Biological Oxygen Demand). Hal ini bermakna bahwa...',
    context: 'Parameter Kualitas Air',
    options: [
      { id: 'A', text: 'Air sungai menjadi sangat jernih dan kaya akan oksigen terlarut' },
      { id: 'B', text: 'Bakteri pengurai memerlukan jumlah oksigen yang sangat tinggi untuk menguraikan materi organik tersebut sehingga menguras habis oksigen terlarut bagi ikan' },
      { id: 'C', text: 'Jumlah zat beracun merkuri meningkat tanpa adanya aktivitas bakteri' },
      { id: 'D', text: 'Populasi ikan sungai bermutasi menjadi organisme fotosintetik' }
    ],
    correctAnswer: 'B',
    explanation: 'BOD tinggi menunjukkan banyaknya bahan organik yang memerlukan oksigen terlarut untuk diuraikan oleh mikroba, yang berakibat pada hipoksia/anoksia bagi biota air.'
  },
  {
    id: 6,
    indicator: 'Mengevaluasi Tindakan Manusia',
    question: 'Sebuah kelompok masyarakat berinisiatif mengganti seluruh atap rumah mereka dengan seng logam gelombang tipis dan membabat pohon peneduh di pekarangan dengan alasan kepraktisan. Evaluasi dampak mikroklimat lingkungan yang terjadi adalah...',
    context: 'Efisiensi Energi & Mikroklimat',
    options: [
      { id: 'A', text: 'Suhu dalam rumah menjadi sangat sejuk dan kebutuhan energi listrik pendingin turun drastis' },
      { id: 'B', text: 'Konduktivitas termal seng yang tinggi meningkatkan suhu ruangan secara drastis, memicu ketergantungan pada pendingin ruangan elektrik (konsumsi energi fosil naik), dan hilangnya kanopi peneduh meningkatkan radiasi termal lingkungan' },
      { id: 'C', text: 'Kadar kelembaban udara menjadi 0% dan tidak ada serangga yang bisa hidup' },
      { id: 'D', text: 'Terjadi peningkatan penyerapan karbon dioksida di sekitar pekarangan' }
    ],
    correctAnswer: 'B',
    explanation: 'Seng memiliki konduktivitas panas tinggi (kebalikan dari rumbia tradisional). Hilangnya pohon pekarangan menghilangkan efek pendinginan evapotranspirasi alami.'
  },
  {
    id: 7,
    indicator: 'Menentukan Solusi Lingkungan',
    question: 'Untuk mengatasi permasalahan erosi tebing sungai dan penurunan kualitas air di kawasan pemukiman bantaran Sungai Batang Serangan Langkat, solusi berbasis kearifan lokal Melayu yang selaras dengan sains restorasi ekologis adalah...',
    context: 'Restorasi Zona Riparian Terpadu',
    options: [
      { id: 'A', text: 'Mengecor seluruh tebing sungai dengan beton semen dan menebang semua vegetasi liar' },
      { id: 'B', text: 'Membuat zona sempadan sungai (riparian buffer) dengan menanam vegetasi pengikat tanah lokal seperti bambu, asam gelugur, dan bintaro, serta menghentikan pembuangan limbah domestik mentah' },
      { id: 'C', text: 'Membuang limbah plastik padat ke tebing sungai sebagai penahan longsor' },
      { id: 'D', text: 'Mengeruk seluruh pasir sungai hingga ke dasar batuan keras' }
    ],
    correctAnswer: 'B',
    explanation: 'Penetapan zona penyangga riparian dengan vegetasi lokal berakar dalam menstabilkan tanggul tanah secara alami, menyaring polutan permukaan, dan menjaga habitat keanekaragaman hayati sungai.'
  },
  {
    id: 8,
    indicator: 'Menganalisis Bioakumulasi & Rantai Makanan',
    question: 'Penyemprotan pestisida organoklorin secara berlebihan di area pertanian dekat danau menyebabkan fenomena biomagnifikasi (bioakumulasi sepanjang rantai makanan). Organisme yang akan mengakumulasi konsentrasi racun tertinggi dalam tubuhnya adalah...',
    context: 'Aliran Energi & Toksikologi Lingkungan',
    options: [
      { id: 'A', text: 'Fitoplankton (produsen)' },
      { id: 'B', text: 'Zooplankton (konsumen I)' },
      { id: 'C', text: 'Ikan kecil pemakan zooplankton (konsumen II)' },
      { id: 'D', text: 'Burung elang pemakan ikan besar (konsumen puncak/tertier)' }
    ],
    correctAnswer: 'D',
    explanation: 'Biomagnifikasi menyebabkan zat racun non-biodegradable yang larut lemak terakumulasi dengan konsentrasi berlipat ganda pada tingkat trofik tertinggi (konsumen puncak).'
  },
  {
    id: 9,
    indicator: 'Integrasi Nilai Adat & Pelestarian Alam',
    question: 'Pepatah Melayu Langkat berbunyi: "Tahu makan tahu menyimpan, tahu menebang tahu menanam". Makna biologis mendalam dari nilai kearifan lokal ini dalam pengelolaan hutan adalah...',
    context: 'Prinsip Keberlanjutan (Sustainability)',
    options: [
      { id: 'A', text: 'Eksploitasi sumber daya hutan harus menerapkan prinsip tebang pilih tanam dan silvikultur berkelanjutan agar laju regenerasi suksesi pohon seimbang dengan pemanfaatan' },
      { id: 'B', text: 'Menebang semua pohon tua sekaligus untuk kemudian menanam bibit tanaman import' },
      { id: 'C', text: 'Menyimpan batang kayu di dalam hutan sampai membusuk menjadi tanah' },
      { id: 'D', text: 'Hanya boleh menanam tumbuhan yang bisa dimakan buahnya secara langsung' }
    ],
    correctAnswer: 'A',
    explanation: 'Prinsip "tahu menebang tahu menanam" adalah dasar dari kelestarian hasil hutan (sustainable yield management) dan restorasi aktif regenerasi ekosistem.'
  },
  {
    id: 10,
    indicator: 'Menganalisis Pencemaran Udara',
    question: 'Fenomena kabut asap (smog) akibat kebakaran lahan gambut di Sumatera mengandung gas Karbon Monoksida (CO) dan partikulat halus PM2.5. Bahaya fisiologis gas Karbon Monoksida (CO) bagi sistem pernapasan manusia adalah...',
    context: 'Fisiologi Respirasi & Toksikologi Udara',
    options: [
      { id: 'A', text: 'Membekukan cairan alveolus paru-paru secara spontan' },
      { id: 'B', text: 'Memiliki afinitas ikatan dengan hemoglobin (Hb) sekitar 200–250 kali lebih kuat dibandingkan oksigen, sehingga memicu hipoksia jaringan tubuh' },
      { id: 'C', text: 'Meningkatkan produksi sel darah merah hingga darah mengental seperti gel' },
      { id: 'D', text: 'Mengubah warna kulit menjadi hijau kebiruan akibat fotosintesis' }
    ],
    correctAnswer: 'B',
    explanation: 'CO membentuk ikatan kuat HbCO (karboksihemoglobin), menghambat pengangkutan oksigen (O2) ke seluruh sel tubuh, menyebabkan pusing, asfiksia, bahkan kematian.'
  },
  {
    id: 11,
    indicator: 'Mengevaluasi Solusi Sanitasi Lingkungan',
    question: 'Desain toilet cemplung langsung ke badan sungai di pemukiman padat mempercepat penyebaran bakteri patogen *Escherichia coli* dan *Vibrio cholerae*. Upaya perbaikan sanitasi yang ramah lingkungan dan tepat guna adalah...',
    context: 'Sanitasi Lingkungan & Siklus Patogen',
    options: [
      { id: 'A', text: 'Mengalirkan air sungai langsung ke dalam sumur gali warga tanpa filter' },
      { id: 'B', text: 'Membangun tangki septik (septic tank) biofilter kedap air dengan sumur resapan berjarak minimal 10–11 meter dari sumber air bersih' },
      { id: 'C', text: 'Menuangkan kaporit bubuk ke seluruh aliran sungai setiap minggu' },
      { id: 'D', text: 'Memindahkan toilet ke atap rumah' }
    ],
    correctAnswer: 'B',
    explanation: 'Septic tank biofilter dengan pengolahan anaerobik/aerobik dan jarak aman minimal 10 meter dari sumur mencegah kontaminasi bakteri fekal ke air tanah konsumsi.'
  },
  {
    id: 12,
    indicator: 'Menganalisis Perubahan Keanekaragaman Hayati',
    question: 'Taman Nasional Gunung Leuser (TNGL) di Kabupaten Langkat merupakan salah satu benteng terakhir keanekaragaman hayati dunia. Jika fragmentasi hutan koridor satwa terus berlanjut, dampak genetik jangka panjang bagi populasi Orangutan Sumatera (*Pongo abelii*) adalah...',
    context: 'Genetika Populasi & Konservasi Satwa',
    options: [
      { id: 'A', text: 'Peningkatan laju mutasi yang langsung menciptakan spesies primata super baru' },
      { id: 'B', text: 'Terisolasinya sub-populasi kecil, memicu perkawinan sekerabat (inbreeding depression), penurunan variasi genetik, dan meningkatnya kerentanan terhadap kepunahan' },
      { id: 'C', text: 'Orangutan akan beradaptasi hidup di dalam air sungai' },
      { id: 'D', text: 'Jumlah keturunan bertambah hingga sepuluh kali lipat per tahun' }
    ],
    correctAnswer: 'B',
    explanation: 'Fragmentasi habitat memisahkan kelompok satwa, membatasi aliran gen (gene flow), menyebabkan inbreeding yang memunculkan alel resesif merugikan dan menurunkan daya tahan populasi.'
  },
  {
    id: 13,
    indicator: 'Menilai Daya Lenting Ekosistem',
    question: 'Pernyataan yang tepat mengenai konsep "Daya Dukung Lingkungan (Carrying Capacity)" adalah...',
    context: 'Kapasitas Beban Maksimum Biosfer',
    options: [
      { id: 'A', text: 'Kemampuan manusia untuk meratakan seluruh gunung menjadi pemukiman' },
      { id: 'B', text: 'Batas maksimum populasi atau beban aktivitas suatu spesies yang dapat ditopang oleh sumber daya lingkungan tanpa merusak kelestarian ekosistem tersebut secara permanen' },
      { id: 'C', text: 'Kecepatan aliran sungai dalam membawa sampah menuju lautan' },
      { id: 'D', text: 'Jumlah pohon yang dapat ditebang dalam kurun waktu satu hari' }
    ],
    correctAnswer: 'B',
    explanation: 'Daya dukung adalah batas kapasitas biosfer/lingkungan dalam menyediakan materi dan energi serta menyerap limbah tanpa mengalami degradasi struktural.'
  },
  {
    id: 14,
    indicator: 'Merancang Aksi Nyata Literasi Lingkungan',
    question: 'Sebagai generasi muda terdidik, rancangan program sekolah hijau (Adiwiyata) yang paling efektif mengintegrasikan etnosains Langkat dan biologi konservasi adalah...',
    context: 'Implementasi Proyek Lingkungan Sekolah',
    options: [
      { id: 'A', text: 'Mewajibkan semua murid membawa tanaman plastik untuk dipajang di kelas' },
      { id: 'B', text: 'Pembuatan taman toga tanaman lokal Langkat, sumur resapan / biopori di pekarangan sekolah, pengomposan daun gugur, dan audit pengurangan sampah plastik sekali pakai' },
      { id: 'C', text: 'Mengecat dinding sekolah dengan warna hijau tua tanpa ada tanaman hidup' },
      { id: 'D', text: 'Membakar sampah di halaman belakang sekolah setiap hari Sabtu' }
    ],
    correctAnswer: 'B',
    explanation: 'Taman toga, biopori, komposting, dan audit sampah merupakan aksi nyata holistik yang menerapkan konsep daur biogeokimia dan konservasi air secara nyata.'
  },
  {
    id: 15,
    indicator: 'Evaluasi Komprehensif Masalah Lingkungan',
    question: 'Kesimpulan paling komprehensif mengenai hubungan antara kearifan lokal etnosains Rumah Melayu Langkat dengan upaya mitigasi perubahan lingkungan global adalah...',
    context: 'Sintesis Pengetahuan Tradisional dan Sains Modern',
    options: [
      { id: 'A', text: 'Kearifan lokal Melayu Langkat sudah kuno dan harus digantikan sepenuhnya oleh material beton modern tanpa pohon' },
      { id: 'B', text: 'Etnosains Rumah Melayu Langkat menyediakan bukti empiris bahwa desain arsitektur adaptif, pemilihan biomaterial lokal, zonasi vegetasi pekarangan, dan etika pelestarian rimba selaras dengan prinsip ilmiah keberlanjutan ekosistem modern' },
      { id: 'C', text: 'Perubahan lingkungan global hanya dapat diatasi dengan teknologi roket luar angkasa' },
      { id: 'D', text: 'Masyarakat masa kini tidak memerlukan pengetahuan tentang siklus air dan hutan' }
    ],
    correctAnswer: 'B',
    explanation: 'Etnosains merupakan jembatan pengetahuan lokal yang kaya akan prinsip-prinsip sains ekologi, biologi termal, dan hidrologi yang relevan untuk menghadapi tantangan krisis lingkungan modern.'
  }
];

export const INITIAL_STUDENTS_DATA: StudentProgress[] = [
  {
    userId: 'siswa-1',
    user: {
      id: 'siswa-1',
      role: 'siswa',
      nama: 'Ahmad Fadhil Al-Banjari',
      kelas: 'XI MIPA 1',
      sekolah: 'SMA Negeri 1 Langkat',
      nisn: '0067812901'
    },
    completedPages: ['beranda', 'petunjuk', 'tujuan', 'orientasi', 'etnosains', 'materi-perubahan', 'materi-penebangan', 'materi-pencemaran', 'aktivitas-literasi', 'studi-kasus', 'kuis', 'evaluasi', 'dashboard-siswa'] as PageId[],
    quizResult: {
      quizId: 'kuis-1',
      score: 90,
      totalQuestions: 10,
      correctCount: 9,
      answers: { 1: 'B', 2: 'C', 3: 'B', 4: 'B', 5: 'true', 6: 'B', 7: 'A', 8: 'B', 9: 'A', 10: 'C' },
      completedAt: '2026-08-25T14:30:00Z'
    },
    evaluationResult: {
      score: 93,
      totalQuestions: 15,
      correctCount: 14,
      answers: { 1: 'A', 2: 'B', 3: 'B', 4: 'B', 5: 'B', 6: 'B', 7: 'B', 8: 'D', 9: 'A', 10: 'B', 11: 'B', 12: 'B', 13: 'B', 14: 'B', 15: 'B' },
      completedAt: '2026-08-26T10:15:00Z',
      literacyCategory: 'Sangat Baik (Sangat Literat)'
    },
    lastActive: '2026-08-26T10:15:00Z'
  },
  {
    userId: 'siswa-2',
    user: {
      id: 'siswa-2',
      role: 'siswa',
      nama: 'Siti Nurhaliza Siregar',
      kelas: 'XI MIPA 1',
      sekolah: 'SMA Negeri 1 Langkat',
      nisn: '0067812902'
    },
    completedPages: ['beranda', 'petunjuk', 'tujuan', 'orientasi', 'etnosains', 'materi-perubahan', 'materi-penebangan', 'materi-pencemaran', 'aktivitas-literasi', 'studi-kasus', 'kuis'] as PageId[],
    quizResult: {
      quizId: 'kuis-1',
      score: 80,
      totalQuestions: 10,
      correctCount: 8,
      answers: { 1: 'B', 2: 'C', 3: 'B', 4: 'B', 5: 'true', 6: 'B', 7: 'A', 8: 'B', 9: 'C', 10: 'C' },
      completedAt: '2026-08-26T09:20:00Z'
    },
    lastActive: '2026-08-26T09:40:00Z'
  },
  {
    userId: 'siswa-3',
    user: {
      id: 'siswa-3',
      role: 'siswa',
      nama: 'Rian Pratama Langkat',
      kelas: 'XI MIPA 2',
      sekolah: 'SMA Negeri 1 Langkat',
      nisn: '0067812903'
    },
    completedPages: ['beranda', 'petunjuk', 'tujuan', 'orientasi', 'etnosains', 'materi-perubahan'] as PageId[],
    lastActive: '2026-08-27T08:10:00Z'
  },
  {
    userId: 'siswa-4',
    user: {
      id: 'siswa-4',
      role: 'siswa',
      nama: 'Dinda Ayu Maharani',
      kelas: 'XI MIPA 2',
      sekolah: 'SMA Negeri 1 Langkat',
      nisn: '0067812904'
    },
    completedPages: ['beranda', 'petunjuk', 'tujuan', 'orientasi', 'etnosains', 'materi-perubahan', 'materi-penebangan', 'materi-pencemaran', 'aktivitas-literasi', 'studi-kasus', 'kuis', 'evaluasi', 'dashboard-siswa'] as PageId[],
    quizResult: {
      quizId: 'kuis-1',
      score: 100,
      totalQuestions: 10,
      correctCount: 10,
      answers: { 1: 'B', 2: 'C', 3: 'B', 4: 'B', 5: 'true', 6: 'B', 7: 'A', 8: 'B', 9: 'A', 10: 'C' },
      completedAt: '2026-08-27T11:00:00Z'
    },
    evaluationResult: {
      score: 87,
      totalQuestions: 15,
      correctCount: 13,
      answers: { 1: 'A', 2: 'B', 3: 'B', 4: 'B', 5: 'B', 6: 'B', 7: 'B', 8: 'D', 9: 'A', 10: 'B', 11: 'B', 12: 'B', 13: 'B', 14: 'B', 15: 'B' },
      completedAt: '2026-08-27T11:45:00Z',
      literacyCategory: 'Sangat Baik (Sangat Literat)'
    },
    lastActive: '2026-08-27T11:45:00Z'
  }
];

export interface GlossaryItem {
  term: string;
  category: 'sains' | 'etnosains';
  definition: string;
}

export const GLOSSARY_ITEMS: GlossaryItem[] = [
  {
    term: 'Daya Dukung Lingkungan (Carrying Capacity)',
    category: 'sains',
    definition: 'Kemampuan lingkungan hidup untuk mendukung perikehidupan manusia dan makhluk hidup lain serta keseimbangan antarkeduanya tanpa merusak integritas ekosistem.'
  },
  {
    term: 'Daya Lenting Lingkungan (Environmental Resilience)',
    category: 'sains',
    definition: 'Kemampuan ekosistem untuk pulih kembali menuju kondisi seimbang setelah mengalami gangguan, tekanan, atau bencana.'
  },
  {
    term: 'Eutrofikasi (Eutrophication)',
    category: 'sains',
    definition: 'Proses pengayaan nutrisi (khususnya fosfat dan nitrat) pada perairan yang memicu ledakan populasi alga/tanaman air serta menurunkan oksigen terlarut.'
  },
  {
    term: 'Dissolved Oxygen (DO)',
    category: 'sains',
    definition: 'Jumlah gas oksigen terlarut dalam air (mg/L) yang esensial bagi respirasi organisme akuatik (ikan, udang, mikroorganisme).'
  },
  {
    term: 'Biological Oxygen Demand (BOD)',
    category: 'sains',
    definition: 'Jumlah oksigen terlarut yang dibutuhkan mikroorganisme untuk menguraikan bahan organik dalam air pada kondisi aerobik.'
  },
  {
    term: 'Infiltrasi Air Tanah',
    category: 'sains',
    definition: 'Proses meresapnya air hujan dari permukaan tanah ke dalam lapisan pori-pori tanah membentuk cadangan air tanah (akuifer).'
  },
  {
    term: 'Limpasan Permukaan (Surface Runoff)',
    category: 'sains',
    definition: 'Aliran air hujan di atas permukaan tanah yang tidak sempat meresap, menjadi pemicu utama erosi tanah dan banjir jika tutupan vegetasi hilang.'
  },
  {
    term: 'Homeostasis Ekosistem',
    category: 'sains',
    definition: 'Kondisi keseimbangan internal dinamis suatu ekosistem dalam mempertahankan struktur dan fungsi jaring-jaring kehidupannya.'
  },
  {
    term: 'Bioakumulasi',
    category: 'sains',
    definition: 'Penumpukan zat polutan berbahaya (seperti logam berat atau pestisida) dalam jaringan tubuh organisme melalui rantai makanan.'
  },
  {
    term: 'Rumah Panggung Melayu',
    category: 'etnosains',
    definition: 'Arsitektur hunian bertiang kayu tradisional Melayu Langkat yang membiarkan tanah terbuka 100% untuk resapan air dan memitigasi banjir luapan pasang surut.'
  },
  {
    term: 'Atap Daun Rumbia (Metroxylon sagu / Nypa)',
    category: 'etnosains',
    definition: 'Bahan atap alami berbasis serat selulosa berongga mikro yang memiliki konduktivitas termal sangat rendah sebagai isolator panas alami.'
  },
  {
    term: 'Ventilasi Selembayung',
    category: 'etnosains',
    definition: 'Kisi-kisi kayu berukir pada bagian atas dinding/atap Rumah Melayu yang memfasilitasi sirkulasi udara silang (cross-ventilation) kontinu.'
  },
  {
    term: 'Pohon Sialang (Koompassia excelsa)',
    category: 'etnosains',
    definition: 'Pohon tualang raksasa yang dilindungi secara adat oleh masyarakat Melayu Langkat sebagai sarang lebah madu hutan (Apis dorsata) dan penjaga kanopi.'
  },
  {
    term: 'Rimba Larangan & Rimba Kepungan Sialang',
    category: 'etnosains',
    definition: 'Kawasan hutan lindung adat Melayu yang terlarang ditebang demi menjaga sumber mata air, sempadan sungai, dan plasma nutfah flora-fauna.'
  },
  {
    term: 'Tebang Pilih Tanam Tradisional',
    category: 'etnosains',
    definition: 'Prinsip kearifan lokal Melayu yang hanya menebang pohon berusia tua dengan diameter tertentu serta menanam kembali bibit pohon pengganti.'
  }
];

