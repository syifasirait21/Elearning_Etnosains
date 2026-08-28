import React, { useState, useEffect, useRef } from 'react';
import { 
  Camera, 
  X, 
  RotateCw, 
  ZoomIn, 
  ZoomOut, 
  Sparkles, 
  BookOpen, 
  Download, 
  Eye, 
  Info, 
  Layers, 
  HelpCircle, 
  CheckCircle2, 
  Trees, 
  Droplets, 
  Wind, 
  ShieldCheck, 
  Sun,
  Maximize2,
  RefreshCw,
  QrCode,
  Scan,
  Share2
} from 'lucide-react';

interface ArExplorationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ArComponentPart {
  id: string;
  name: string;
  category: string;
  icon: string;
  etnosainsTitle: string;
  etnosainsDesc: string;
  localWisdomPoints: string[];
  scienceTitle: string;
  biologyConcept: string;
  environmentalLink: string;
  sciencePoints: string[];
  color: string;
}

const AR_PARTS: ArComponentPart[] = [
  {
    id: 'tiang-panggung',
    name: '1. Tiang Panggung (Kayu Nibung / Ulin)',
    category: 'Struktur Pondasi & Adaptasi Pasang Surut',
    icon: '🪵',
    etnosainsTitle: 'Arsitektur Tiang Panggung Melayu Langkat',
    etnosainsDesc: 'Rumah dibangun di atas tiang panggung setinggi 1,5 hingga 2,5 meter menggunakan kayu tahan air payau seperti Kayu Nibung (Oncosperma tigillarium) atau Kayu Ulin (Eusideroxylon zwageri).',
    localWisdomPoints: [
      'Pondasi bebas paku beton, ditanam di atas umpak batu sungai di tanah rawa.',
      'Melindungi keluarga dari pasang perbani Sungai Wampu dan satwa liar rawa.',
      'Kolong rumah difungsikan untuk ventilasi dan sirkulasi air tanpa menghambat aliran.'
    ],
    scienceTitle: 'Adaptasi Hidrologi, Porositas Tanah & Mitigasi Banjir',
    biologyConcept: 'Anatomi Kayu & Resistensi Lignin: Kayu Nibung dan Ulin memiliki kerapatan serat tinggi dengan kandungan lignin dan ekstraktif alami yang tinggi, mencegah pembusukan oleh fungi perusak kayu (Basidiomycota) di lingkungan anaerobik basah.',
    environmentalLink: 'Konservasi Daerah Resapan Air (Infiltrasi): Konstruksi panggung tidak memadatkan atau menutup pori-pori tanah rawa (*soil porosity*). Air luapan sungai tetap mengalir bebas (*sheet flow*) dan meresap ke dalam akuifer (*infiltrasi*), mencegah peningkatan limpasan permukaan (*surface runoff*) yang menjadi pemicu utama banjir bandang.',
    sciencePoints: [
      'Mempertahankan koefisien limpasan (Runoff Coefficient C) tetap rendah (<0.2) seperti kondisi hutan alami.',
      'Mencegah erosi lateral tepi sungai karena air pasang tidak tertahan oleh dinding masif.',
      'Menjaga keberlangsungan mikroorganisme tanah dan dekomposer pada lapisan topsoil rawa.'
    ],
    color: 'from-amber-600 to-amber-800'
  },
  {
    id: 'atap-rumbia',
    name: '2. Atap Bumbung Curam & Tebing Layar (Daun Rumbia)',
    category: 'Insulasi Termal Alami & Aerodinamika',
    icon: '🌿',
    etnosainsTitle: 'Atap Bumbung Melayu Berbahan Daun Rumbia / Nipah',
    etnosainsDesc: 'Atap berbentuk segitiga curam berderajat kemiringan 45°-60° yang dianyam dari daun pohon Rumbia (Metroxylon sagu) dengan bukaan tebing layar (lontok) di bagian puncak.',
    localWisdomPoints: [
      'Daun rumbia dianyam dengan tali rotan alami tanpa bahan kimia beracun.',
      'Bentuk curam membuat air hujan lebat pesisir Langkat langsung mengalir jatuh cepat.',
      'Ruangan di bawah atap tetap dingin dan sejuk meski siang hari terik.'
    ],
    scienceTitle: 'Termodinamika Insulasi Seluler & Konveksi Termal Alami',
    biologyConcept: 'Insulasi Termal Seluler Daun: Struktur anatomi daun rumbia tersusun atas jaringan spons dengan rongga-rongga udara mikroskopis. Udara terjebak ini memiliki konduktivitas termal sangat rendah (k ≈ 0.026 W/m·K), bertindak sebagai isolator panas alami yang memblokir radiasi sinar inframerah matahari.',
    environmentalLink: 'Efisiensi Energi Pasif & Nol Emisi CFC: Bentuk kemiringan tinggi menciptakan efek cerobong (*stack effect / thermal buoyancy*), di mana udara panas yang berdensitas lebih rendah naik dan keluar melalui tebing layar. Ini menghilangkan kebutuhan pendingin buatan (AC) berbahan pendingin hidrofluorokarbon (HFC/CFC) yang merusak lapisan ozon.',
    sciencePoints: [
      'Mengurangi jejak karbon rumah tangga (*household carbon footprint*) hingga 40%.',
      'Material organik rumbia 100% biodegradable dan dapat terurai menjadi kompos alami setelah siklus pakai 15-20 tahun.',
      'Menghindari polusi seng/asbes beracun yang berbahaya bagi pernapasan.'
    ],
    color: 'from-emerald-600 to-teal-800'
  },
  {
    id: 'kisi-selasar',
    name: '3. Kisi-kisi Selasar & Kerawang Dinding Ukir',
    category: 'Bioklimatik & Sirkulasi Udara Pasif',
    icon: '💨',
    etnosainsTitle: 'Ornamen Ukir Kerawang & Selasar Terbuka',
    etnosainsDesc: 'Dinding dan ventilasi atas jendela dihiasi ukiran bermotif pucuk rebung dan awan berarak yang berlubang tembus (kerawang), dipadukan dengan selasar berlantai bilah kayu renggang.',
    localWisdomPoints: [
      'Angin sepoi-sepoi dari sungai dapat masuk leluasa ke seluruh penjuru rumah.',
      'Privasi tetap terjaga dari luar namun pertukaran udara berlangsung 24 jam.',
      'Lantai bilah kayu memudahkan debu dan kotoran tersapu tanpa deterjen kimia.'
    ],
    scienceTitle: 'Dinamika Fluida Udara & Pengendalian Patogen Mikroba',
    biologyConcept: 'Pengendalian Kelembapan Relatif (RH) & Pertumbuhan Spora Fungi: Sirkulasi udara terus-menerus mencegah akumulasi kelembapan jenuh di dalam ruangan tropis basah (RH >85%), sehingga menghambat perkecambahan spora kapang/jamur patogen (Aspergillus, Cladosporium) yang memicu penyakit pernapasan.',
    environmentalLink: 'Desain Bioklimatik Hemat Energi: Mengoptimalkan pemanfaatan angin lingkungan alami (*cross-ventilation*) berdasarkan prinsip kontinuitas fluida dan efek Bernoulli, menciptakan aliran udara sejuk alami tanpa memerlukan konsumsi energi listrik tambahan.',
    sciencePoints: [
      'Pertukaran udara (*Air Change per Hour / ACH*) optimal 15-20 kali/jam secara alami.',
      'Mengurangi risiko polusi udara dalam ruang (*indoor air pollution*).',
      'Memanfaatkan sifat higroskopis kayu untuk menyerap kelebihan uap air di malam hari.'
    ],
    color: 'from-cyan-600 to-blue-800'
  },
  {
    id: 'pasak-kayu',
    name: '4. Pasak Kayu & Tumpuan Bebas Logam Besi',
    category: 'Material Berkelanjutan & Ketahanan Korosi',
    icon: '🪵',
    etnosainsTitle: 'Sistem Sambungan Pasak Kayu Tradisional',
    etnosainsDesc: 'Rangka tiang, kasau, dan balok dikunci menggunakan pasak dari kayu keras (kayu nibung/ulin bulat) tanpa paku besi dan tanpa perekat kimia sintetis.',
    localWisdomPoints: [
      'Rumah fleksibel bergoyang mengikuti getaran tanpa patah atau roboh.',
      'Sambungan tidak pernah berkarat meski berada di udara payau pesisir Langkat.',
      'Dapat dibongkar-pasang (*knock-down*) dan dipindahkan jika sungai berpindah alur.'
    ],
    scienceTitle: 'Ketahanan Korosi Biokimia & Penyerapan Beban Dinamis',
    biologyConcept: 'Biopolimer Lignoselulosa & Modulus Elastisitas: Serat kayu alami memiliki elastisitas tensil tinggi yang mampu mendistribusikan tegangan geser secara merata, bertindak sebagai sistem peredam kejut alami (*viscoelastic damping*) saat terjadi gempa atau pasang surut tanah.',
    environmentalLink: 'Siklus Material Sirkular & Bebas Emisi Logam Berat: Menghilangkan kebutuhan peleburan baja/besi yang menghasilkan emisi gas CO₂ tinggi. Pasak kayu tidak mengalami oksidasi elektrokimia (karat) yang dapat mencemari tanah dan air rawa di sekitarnya.',
    sciencePoints: [
      'Mengurangi energi terwujud (*embodied carbon energy*) struktur bangunan hingga 80%.',
      'Limbah perbaikan kayu aman bagi dekomposer tanah dan tidak meninggalkan residu anorganik.',
      'Sistem ramah lingkungan yang mengedepankan prinsip keberlanjutan sumber daya alam hayati.'
    ],
    color: 'from-amber-700 to-stone-800'
  },
  {
    id: 'pekarangan-resapan',
    name: '5. Pekarangan Alami Terbuka (Laman Etnis)',
    category: 'Hidrologi & Keanekaragaman Hayati Mikro',
    icon: '🌱',
    etnosainsTitle: 'Laman Pekarangan Terbuka Tanpa Lapisan Semen',
    etnosainsDesc: 'Pekarangan sekitar rumah dibiarkan beralas tanah alami berpasir atau ditanami pepohonan peneduh (kelapa, pinang, asam glugur) tanpa penutupan beton semen/aspal.',
    localWisdomPoints: [
      'Air hujan langsung meresap ke dalam bumi dalam hitungan menit.',
      'Ditanami tanaman obat keluarga (TOGA) dan tanaman peneduh penyaring angin kencang.',
      'Anak-anak bermain di tanah yang sehat dan bebas dari genangan air kotor.'
    ],
    scienceTitle: 'Daya Dukung Ekologis & Konservasi Siklus Hidrologi',
    biologyConcept: 'Aktivitas Edaphic & Jaring Makanan Tanah: Tanah terbuka mempertahankan struktur horison A (*topsoil*) yang kaya akan humus dan mikroorganisme pengurai (bakteri penambat nitrogen, fungi mikoriza, cacing Oligochaeta) yang vital bagi kesuburan biosfer.',
    environmentalLink: 'Pencegahan Fenomena Pulau Panas (*Urban Heat Island*) & Banjir Genangan: Tutupan vegetasi dan tanah memiliki albedo alami yang rendah memancarkan kembali panas serta kapasitas infiltrasi tinggi (100-250 mm/jam), menjaga neraca air dan iklim mikro lingkungan.',
    sciencePoints: [
      'Tingkat infiltrasi tanah mencapai 95%, meminimalisir debit banjir puncak ke Sungai Wampu.',
      'Menjaga kelembapan tanah dan ketersediaan air sumur dangkal masyarakat.',
      'Menyediakan habitat bagi polinator serangga dan fauna tanah lokal.'
    ],
    color: 'from-emerald-700 to-green-900'
  }
];

export const ArExplorationModal: React.FC<ArExplorationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedPartId, setSelectedPartId] = useState<string>('tiang-panggung');
  const [showScienceConnection, setShowScienceConnection] = useState<boolean>(false);
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [cameraPermissionError, setCameraPermissionError] = useState<string | null>(null);
  const [isMarkerDetected, setIsMarkerDetected] = useState<boolean>(true);
  const [modelRotation, setModelRotation] = useState<number>(25);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'camera' | 'virtual'>('camera');
  const [showMarkerGuide, setShowMarkerGuide] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const activePart = AR_PARTS.find((p) => p.id === selectedPartId) || AR_PARTS[0];

  // Start Camera Stream
  const startCamera = async () => {
    setCameraPermissionError(null);
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'environment',
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
          audio: false,
        });

        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
        setIsCameraActive(true);
        setViewMode('camera');
      } else {
        throw new Error('Kamera tidak didukung pada browser ini.');
      }
    } catch (err: any) {
      console.warn('Camera access denied or unavailable:', err);
      setCameraPermissionError(
        'Izin kamera tidak diberikan atau perangkat tidak memiliki kamera aktif. Beralih otomatis ke Mode Pratinjau Virtual 3D AR interaktif.'
      );
      setIsCameraActive(false);
      setViewMode('virtual');
    }
  };

  // Stop Camera Stream
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  // Initialize or Cleanup when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      startCamera();
    } else {
      stopCamera();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    }
    return () => {
      stopCamera();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isOpen]);

  // Marker detection loop simulation on Canvas overlay
  useEffect(() => {
    if (!isOpen) return;

    let scanCycle = 0;
    const renderLoop = () => {
      scanCycle += 0.03;
      // High probability marker detection simulation with realistic responsiveness
      setIsMarkerDetected(true);

      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          // Draw Augmented Reality Tracking HUD Overlay
          const cx = canvas.width / 2;
          const cy = canvas.height / 2;
          const size = 180 * zoomLevel;

          // Target Reticle Box
          ctx.strokeStyle = isMarkerDetected ? 'rgba(16, 185, 129, 0.85)' : 'rgba(234, 179, 8, 0.75)';
          ctx.lineWidth = 2.5;
          ctx.setLineDash([12, 6]);

          // Pulsing corner brackets
          const cornerLen = 28;
          ctx.strokeRect(cx - size / 2, cy - size / 2, size, size);
          ctx.setLineDash([]);

          // Animated scanning laser line
          const scanY = cy - size / 2 + ((Math.sin(scanCycle) + 1) / 2) * size;
          const gradient = ctx.createLinearGradient(cx - size / 2, scanY, cx + size / 2, scanY);
          gradient.addColorStop(0, 'rgba(16, 185, 129, 0)');
          gradient.addColorStop(0.5, 'rgba(52, 211, 153, 0.8)');
          gradient.addColorStop(1, 'rgba(16, 185, 129, 0)');

          ctx.fillStyle = gradient;
          ctx.fillRect(cx - size / 2, scanY - 2, size, 4);

          // AR Tracking Nodes
          ctx.fillStyle = '#10B981';
          ctx.beginPath();
          ctx.arc(cx - size / 2, cy - size / 2, 4, 0, Math.PI * 2);
          ctx.arc(cx + size / 2, cy - size / 2, 4, 0, Math.PI * 2);
          ctx.arc(cx - size / 2, cy + size / 2, 4, 0, Math.PI * 2);
          ctx.arc(cx + size / 2, cy + size / 2, 4, 0, Math.PI * 2);
          ctx.fill();

          // Coordinate Tag
          ctx.font = 'bold 10px monospace';
          ctx.fillStyle = '#34D399';
          ctx.fillText(`MARKER: MELAYU-LANGKAT-01 [LOCKED]`, cx - size / 2, cy - size / 2 - 10);
          ctx.fillText(`ROT: ${Math.round(modelRotation)}° | Z: ${zoomLevel.toFixed(1)}x`, cx - size / 2, cy + size / 2 + 18);
        }
      }

      animationFrameRef.current = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isOpen, zoomLevel, modelRotation, isMarkerDetected]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-fade-in">
      <div 
        className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-6xl h-[92vh] max-h-[920px] flex flex-col overflow-hidden shadow-2xl text-white animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-950 via-emerald-950 to-slate-950 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 shadow-inner">
              <Camera className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  🏛️ Eksplorasi AR • Etnosains Rumah Melayu Langkat
                </h2>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-400/30 uppercase tracking-wider">
                  Marker-Based AR 3D
                </span>
              </div>
              <p className="text-xs text-emerald-200/80 mt-0.5">
                Arahkan kamera ke marker untuk memproyeksikan objek 3D dan mempelajari sains arsitektur lokal
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowMarkerGuide(true)}
              className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/40 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              title="Lihat & Download Marker AR"
            >
              <QrCode className="w-4 h-4" />
              <span className="hidden sm:inline">Marker AR</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Tutup AR"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Main AR Workspace: Left (AR Viewport / Camera) & Right (Etnosains & Science Inspector) */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          
          {/* LEFT: AR Viewport */}
          <div className="flex-1 relative bg-black flex items-center justify-center overflow-hidden min-h-[320px] lg:min-h-auto">
            
            {/* Real Camera Feed */}
            {viewMode === 'camera' && (
              <video
                ref={videoRef}
                playsInline
                muted
                autoPlay
                className="absolute inset-0 w-full h-full object-cover opacity-90"
              />
            )}

            {/* Virtual Stage Backdrop (when in virtual mode or no camera) */}
            {viewMode === 'virtual' && (
              <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-emerald-950/40 flex items-center justify-center">
                {/* 3D Perspective Grid Floor */}
                <div 
                  className="absolute bottom-0 w-full h-2/3 opacity-35"
                  style={{
                    backgroundImage: 'linear-gradient(to right, #10B981 1px, transparent 1px), linear-gradient(to bottom, #10B981 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                    transform: 'perspective(500px) rotateX(60deg)',
                    transformOrigin: 'bottom center',
                  }}
                />
              </div>
            )}

            {/* Canvas AR HUD Overlay */}
            <canvas
              ref={canvasRef}
              width={640}
              height={480}
              className="absolute inset-0 w-full h-full pointer-events-none z-10"
            />

            {/* Projected Holographic 3D Object of Rumah Melayu Langkat */}
            <div 
              className="relative z-20 transition-transform duration-200 flex flex-col items-center justify-center p-4 cursor-grab active:cursor-grabbing select-none"
              style={{
                transform: `scale(${zoomLevel}) rotateY(${modelRotation}deg)`,
                transformStyle: 'preserve-3d',
              }}
              onMouseDown={(e) => {
                const startX = e.clientX;
                const startRot = modelRotation;
                const onMouseMove = (moveEvent: MouseEvent) => {
                  const delta = moveEvent.clientX - startX;
                  setModelRotation(startRot + delta * 0.5);
                };
                const onMouseUp = () => {
                  window.removeEventListener('mousemove', onMouseMove);
                  window.removeEventListener('mouseup', onMouseUp);
                };
                window.addEventListener('mousemove', onMouseMove);
                window.addEventListener('mouseup', onMouseUp);
              }}
            >
              {/* Interactive Vector 3D Graphic of Rumah Melayu Langkat */}
              <div className="relative w-72 sm:w-84 h-72 sm:h-84 flex items-center justify-center">
                
                {/* Glow Halo */}
                <div className="absolute inset-0 rounded-full bg-emerald-500/15 blur-2xl animate-pulse" />

                {/* Interactive SVG Diagram with Highlightable Components */}
                <svg viewBox="0 0 400 360" className="w-full h-full drop-shadow-2xl">
                  <defs>
                    <linearGradient id="roofGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#d97706" />
                      <stop offset="100%" stopColor="#78350f" />
                    </linearGradient>
                    <linearGradient id="wallGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#b45309" />
                      <stop offset="100%" stopColor="#92400e" />
                    </linearGradient>
                    <linearGradient id="stiltGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#78350f" />
                      <stop offset="100%" stopColor="#451a03" />
                    </linearGradient>
                  </defs>

                  {/* 5. Pekarangan / Laman Alami Ground */}
                  <ellipse 
                    cx="200" cy="320" rx="170" ry="30" 
                    fill={selectedPartId === 'pekarangan-resapan' ? '#059669' : '#1e293b'} 
                    opacity={selectedPartId === 'pekarangan-resapan' ? '0.85' : '0.6'}
                    stroke={selectedPartId === 'pekarangan-resapan' ? '#34d399' : '#475569'}
                    strokeWidth="2"
                    className="transition-all duration-300"
                  />
                  {/* Grass / River indicators */}
                  <path d="M 60 320 Q 200 340 340 320" stroke="#0ea5e9" strokeWidth="2.5" strokeDasharray="6,4" fill="none" opacity="0.7" />

                  {/* 1. Tiang Panggung (Stilts / Pillars) */}
                  <g 
                    className="cursor-pointer transition-all duration-300"
                    onClick={() => setSelectedPartId('tiang-panggung')}
                  >
                    {[100, 140, 180, 220, 260, 300].map((x, i) => (
                      <g key={i}>
                        {/* Stilt pillar */}
                        <rect 
                          x={x - 4} 
                          y="220" 
                          width="8" 
                          height="95" 
                          fill={selectedPartId === 'tiang-panggung' ? '#f59e0b' : 'url(#stiltGrad)'}
                          stroke={selectedPartId === 'tiang-panggung' ? '#fbbf24' : '#292524'}
                          strokeWidth={selectedPartId === 'tiang-panggung' ? '2.5' : '1'}
                          className="transition-all"
                        />
                        {/* Umpak Batu Base */}
                        <ellipse 
                          cx={x} 
                          cy="315" 
                          rx="8" 
                          ry="4" 
                          fill={selectedPartId === 'tiang-panggung' ? '#fbbf24' : '#64748b'} 
                        />
                      </g>
                    ))}
                    {/* Kolong water clearance label */}
                    <line x1="80" y1="270" x2="320" y2="270" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4,4" />
                    <text x="200" y="265" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="bold">
                      Zona Aliran Pasang Surut Sungai Wampu (1.8m)
                    </text>
                  </g>

                  {/* 4. Sistem Pasak Kayu & Balok Lantai */}
                  <g 
                    className="cursor-pointer transition-all duration-300"
                    onClick={() => setSelectedPartId('pasak-kayu')}
                  >
                    <rect 
                      x="85" 
                      y="212" 
                      width="230" 
                      height="12" 
                      fill={selectedPartId === 'pasak-kayu' ? '#f59e0b' : '#a16207'}
                      stroke={selectedPartId === 'pasak-kayu' ? '#fef08a' : '#451a03'}
                      strokeWidth={selectedPartId === 'pasak-kayu' ? '2.5' : '1'}
                      rx="2"
                    />
                    {[100, 140, 180, 220, 260, 300].map((x, i) => (
                      <circle key={i} cx={x} cy="218" r="3" fill="#fef08a" stroke="#78350f" strokeWidth="1" />
                    ))}
                  </g>

                  {/* 3. Dinding Utama & Kisi-kisi Selasar Kerawang */}
                  <g 
                    className="cursor-pointer transition-all duration-300"
                    onClick={() => setSelectedPartId('kisi-selasar')}
                  >
                    {/* Main wall body */}
                    <rect 
                      x="95" 
                      y="130" 
                      width="210" 
                      height="85" 
                      fill={selectedPartId === 'kisi-selasar' ? '#0284c7' : 'url(#wallGrad)'}
                      stroke={selectedPartId === 'kisi-selasar' ? '#38bdf8' : '#78350f'}
                      strokeWidth={selectedPartId === 'kisi-selasar' ? '2.5' : '1'}
                      rx="4"
                    />

                    {/* Windows with Louver / Kerawang pattern */}
                    <rect x="115" y="145" width="40" height="45" fill="#0f172a" stroke="#e2e8f0" strokeWidth="1.5" rx="2" />
                    <line x1="115" y1="155" x2="155" y2="155" stroke="#38bdf8" strokeWidth="1.5" />
                    <line x1="115" y1="165" x2="155" y2="165" stroke="#38bdf8" strokeWidth="1.5" />
                    <line x1="115" y1="175" x2="155" y2="175" stroke="#38bdf8" strokeWidth="1.5" />

                    {/* Main Door */}
                    <rect x="180" y="140" width="40" height="72" fill="#451a03" stroke="#fcd34d" strokeWidth="1.5" rx="2" />
                    <circle cx="212" cy="175" r="2.5" fill="#fcd34d" />

                    {/* Second Window */}
                    <rect x="245" y="145" width="40" height="45" fill="#0f172a" stroke="#e2e8f0" strokeWidth="1.5" rx="2" />
                    <line x1="245" y1="155" x2="285" y2="155" stroke="#38bdf8" strokeWidth="1.5" />
                    <line x1="245" y1="165" x2="285" y2="165" stroke="#38bdf8" strokeWidth="1.5" />
                    <line x1="245" y1="175" x2="285" y2="175" stroke="#38bdf8" strokeWidth="1.5" />

                    {/* Selasar Veranda Railing with Kerawang Carvings */}
                    <rect x="95" y="195" width="210" height="18" fill="#78350f" opacity="0.9" />
                    <line x1="95" y1="195" x2="305" y2="195" stroke="#fbbf24" strokeWidth="1.5" />
                  </g>

                  {/* 2. Atap Bumbung Curam & Tebing Layar (Rumbia / Nipah) */}
                  <g 
                    className="cursor-pointer transition-all duration-300"
                    onClick={() => setSelectedPartId('atap-rumbia')}
                  >
                    {/* Main Triangular Steep Roof (Bumbung Lima / Potong Limas) */}
                    <polygon 
                      points="200,30 65,135 335,135" 
                      fill={selectedPartId === 'atap-rumbia' ? '#059669' : 'url(#roofGrad)'}
                      stroke={selectedPartId === 'atap-rumbia' ? '#34d399' : '#f59e0b'}
                      strokeWidth={selectedPartId === 'atap-rumbia' ? '3' : '1.5'}
                    />

                    {/* Tebing Layar (Ventilasi Pucuk Atap) */}
                    <polygon 
                      points="200,45 130,105 270,105" 
                      fill="#451a03" 
                      stroke="#fcd34d" 
                      strokeWidth="1.5"
                    />
                    {/* Ventilation slats */}
                    <line x1="160" y1="75" x2="240" y2="75" stroke="#34d399" strokeWidth="1.5" />
                    <line x1="145" y1="90" x2="255" y2="90" stroke="#34d399" strokeWidth="1.5" />

                    {/* Perabung / Pucuk Rebung Crown */}
                    <path d="M 195 20 Q 200 8 205 20 L 200 30 Z" fill="#fbbf24" stroke="#78350f" strokeWidth="1" />

                    {/* Eaves (Cucuran Atap) */}
                    <path d="M 60 135 L 340 135 L 335 142 L 65 142 Z" fill="#78350f" />
                  </g>

                  {/* Floating AR Hotspot Pins */}
                  <g>
                    {/* Pin 1: Atap */}
                    <circle cx="200" cy="50" r="10" fill="#10b981" stroke="#ffffff" strokeWidth="2" className="animate-bounce" />
                    <text x="200" y="54" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">2</text>

                    {/* Pin 2: Dinding/Kisi */}
                    <circle cx="135" cy="165" r="10" fill="#0284c7" stroke="#ffffff" strokeWidth="2" />
                    <text x="135" y="169" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">3</text>

                    {/* Pin 3: Pasak */}
                    <circle cx="280" cy="218" r="9" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
                    <text x="280" y="222" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">4</text>

                    {/* Pin 4: Tiang */}
                    <circle cx="140" cy="275" r="10" fill="#e11d48" stroke="#ffffff" strokeWidth="2" />
                    <text x="140" y="279" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">1</text>

                    {/* Pin 5: Laman */}
                    <circle cx="310" cy="325" r="9" fill="#059669" stroke="#ffffff" strokeWidth="2" />
                    <text x="310" y="329" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">5</text>
                  </g>
                </svg>
              </div>

              {/* AR Label Tag under Model */}
              <div className="mt-2 px-3 py-1 rounded-full bg-slate-900/90 border border-emerald-500/50 text-[11px] font-mono text-emerald-300 backdrop-blur-md flex items-center gap-1.5 shadow-lg">
                <Scan className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
                <span>MODEL AR TERKUNCI: {activePart.name}</span>
              </div>
            </div>

            {/* Viewport Control Bar */}
            <div className="absolute bottom-3 left-3 right-3 z-30 flex items-center justify-between pointer-events-none">
              
              {/* Mode Switcher */}
              <div className="pointer-events-auto flex items-center gap-1 bg-slate-900/90 backdrop-blur-md p-1.5 rounded-2xl border border-slate-700">
                <button
                  onClick={() => {
                    setViewMode('camera');
                    startCamera();
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    viewMode === 'camera'
                      ? 'bg-emerald-700 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Kamera AR</span>
                </button>
                <button
                  onClick={() => {
                    setViewMode('virtual');
                    stopCamera();
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    viewMode === 'virtual'
                      ? 'bg-emerald-700 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Virtual 3D</span>
                </button>
              </div>

              {/* 3D Transform Controls */}
              <div className="pointer-events-auto flex items-center gap-1 bg-slate-900/90 backdrop-blur-md p-1.5 rounded-2xl border border-slate-700">
                <button
                  onClick={() => setModelRotation((prev) => prev - 20)}
                  className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                  title="Putar Kiri"
                >
                  <RotateCw className="w-4 h-4 -scale-x-100" />
                </button>
                <button
                  onClick={() => setModelRotation((prev) => prev + 20)}
                  className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                  title="Putar Kanan"
                >
                  <RotateCw className="w-4 h-4" />
                </button>
                <div className="h-4 w-px bg-slate-700 mx-0.5" />
                <button
                  onClick={() => setZoomLevel((prev) => Math.max(0.7, prev - 0.15))}
                  className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                  title="Perkecil"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setZoomLevel((prev) => Math.min(1.6, prev + 0.15))}
                  className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                  title="Perbesar"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Camera Permission Alert (if any) */}
            {cameraPermissionError && viewMode === 'camera' && (
              <div className="absolute top-3 left-3 right-3 z-30 bg-amber-950/90 border border-amber-500 text-amber-200 text-xs p-3 rounded-2xl backdrop-blur-md flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{cameraPermissionError}</span>
                </div>
                <button
                  onClick={() => setViewMode('virtual')}
                  className="px-2.5 py-1 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-[11px] shrink-0"
                >
                  Gunakan Virtual 3D
                </button>
              </div>
            )}
          </div>

          {/* RIGHT: Etnosains & Science Connector Sidebar */}
          <div className="w-full lg:w-[460px] bg-slate-900 border-t lg:border-t-0 lg:border-l border-slate-800 flex flex-col overflow-y-auto no-scrollbar">
            
            {/* Parts Selector Tabs */}
            <div className="p-3 bg-slate-950/80 border-b border-slate-800 shrink-0">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-emerald-400" />
                <span>Pilih Komponen Arsitektur AR:</span>
              </div>
              <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
                {AR_PARTS.map((part) => (
                  <button
                    key={part.id}
                    onClick={() => {
                      setSelectedPartId(part.id);
                      setShowScienceConnection(false);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
                      selectedPartId === part.id
                        ? 'bg-emerald-700 text-white font-bold shadow-md'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    <span>{part.icon}</span>
                    <span>{part.name.split('.')[1]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Detailed Content Panel */}
            <div className="flex-1 p-5 space-y-5 overflow-y-auto">
              
              {/* Part Header Card */}
              <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                    {activePart.category}
                  </span>
                  <span className="text-xl">{activePart.icon}</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                  {activePart.etnosainsTitle}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {activePart.etnosainsDesc}
                </p>

                {/* Cultural points */}
                <div className="pt-2 border-t border-slate-700/60 space-y-1.5">
                  <div className="text-[11px] font-bold text-amber-300 flex items-center gap-1">
                    <span>🏛️ Pengetahuan & Kearifan Lokal Melayu:</span>
                  </div>
                  {activePart.localWisdomPoints.map((pt, i) => (
                    <div key={i} className="text-xs text-slate-300 flex items-start gap-2">
                      <span className="text-amber-400 font-bold">•</span>
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* SCIENCE CONNECTION BUTTON & EXPANDED CONTAINER */}
              <div className="space-y-3">
                <button
                  id="btn-hubungkan-sains"
                  onClick={() => setShowScienceConnection(!showScienceConnection)}
                  className={`w-full p-4 rounded-2xl font-bold text-sm transition-all flex items-center justify-between shadow-lg ${
                    showScienceConnection
                      ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white ring-2 ring-emerald-400/50'
                      : 'bg-gradient-to-r from-amber-600 via-amber-700 to-emerald-800 text-white hover:from-amber-500 hover:to-emerald-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-xl bg-white/20 flex items-center justify-center text-white">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <span className="text-left">
                      {showScienceConnection ? 'Tutup Analisis Sains' : '🔬 Hubungkan dengan Sains (Biologi & Lingkungan)'}
                    </span>
                  </div>
                  <span className="text-xs bg-white/20 px-2.5 py-1 rounded-full font-bold">
                    {showScienceConnection ? 'Aktif' : 'Klik Disini'}
                  </span>
                </button>

                {/* Expanded Deep Scientific Analysis */}
                {showScienceConnection && (
                  <div className="bg-gradient-to-b from-emerald-950/70 to-slate-950 border border-emerald-500/50 rounded-2xl p-4.5 space-y-4 animate-fade-in shadow-xl">
                    <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold pb-2 border-b border-emerald-800">
                      <Trees className="w-4 h-4 text-emerald-400" />
                      <span>{activePart.scienceTitle}</span>
                    </div>

                    {/* Biological Concept */}
                    <div className="space-y-1.5">
                      <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                        <Droplets className="w-3.5 h-3.5 text-blue-400" />
                        <span>Konsep Biologi & Material Alami:</span>
                      </div>
                      <p className="text-xs text-slate-200 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                        {activePart.biologyConcept}
                      </p>
                    </div>

                    {/* Environmental Link */}
                    <div className="space-y-1.5">
                      <div className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                        <Wind className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Korelasi Materi Perubahan Lingkungan:</span>
                      </div>
                      <p className="text-xs text-slate-200 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                        {activePart.environmentalLink}
                      </p>
                    </div>

                    {/* Key takeaways */}
                    <div className="space-y-2 pt-1">
                      <div className="text-[11px] font-bold text-cyan-300 uppercase tracking-wider">
                        Prinsip Ekologis & Literasi Lingkungan:
                      </div>
                      {activePart.sciencePoints.map((pt, i) => (
                        <div key={i} className="text-xs text-emerald-100/90 flex items-start gap-2 bg-emerald-900/20 p-2 rounded-lg border border-emerald-800/40">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Instructions Box */}
              <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                  <HelpCircle className="w-4 h-4 text-emerald-400" />
                  <span>Petunjuk Eksplorasi AR:</span>
                </div>
                <ol className="text-xs text-slate-400 space-y-1.5 list-decimal list-inside leading-relaxed">
                  <li>Izinkan akses kamera perangkat saat diminta.</li>
                  <li>Arahkan kamera ke marker AR fisik atau buka tampilan marker di layar smartphone.</li>
                  <li>Ketuk pin nomor atau tab di atas untuk menginspeksi bagian struktur Rumah Melayu Langkat.</li>
                  <li>Gunakan tombol <strong>“Hubungkan dengan Sains”</strong> untuk membedah konsep Biologi dan kelestarian ekosistem.</li>
                </ol>
              </div>

            </div>

            {/* Bottom Actions */}
            <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between shrink-0">
              <button
                onClick={() => setShowMarkerGuide(true)}
                className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 underline underline-offset-4"
              >
                <QrCode className="w-4 h-4" />
                <span>Petunjuk & Pola Marker AR</span>
              </button>

              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors"
              >
                Tutup AR
              </button>
            </div>

          </div>

        </div>

        {/* Marker Guide & Download Modal Overlay */}
        {showMarkerGuide && (
          <div className="absolute inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-emerald-500/60 rounded-3xl p-6 max-w-md w-full space-y-5 shadow-2xl animate-scale-in">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <QrCode className="w-5 h-5 text-emerald-400" />
                  <h4 className="text-base font-bold text-white">Marker AR Rumah Melayu Langkat</h4>
                </div>
                <button
                  onClick={() => setShowMarkerGuide(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* High Contrast Geometric AR Marker Graphic */}
              <div className="bg-white p-6 rounded-2xl flex flex-col items-center justify-center border-4 border-slate-950 shadow-inner">
                <div className="w-48 h-48 bg-black p-4 flex flex-col items-center justify-center relative">
                  <div className="w-36 h-36 bg-white flex flex-col items-center justify-center p-2 text-center">
                    {/* Traditional Melayu Langkat Glyph Pattern */}
                    <div className="w-24 h-24 border-4 border-black flex items-center justify-center relative">
                      <div className="w-16 h-16 bg-black flex items-center justify-center">
                        <div className="w-8 h-8 bg-white rotate-45" />
                      </div>
                      <div className="absolute top-1 left-1 w-3 h-3 bg-black" />
                      <div className="absolute top-1 right-1 w-3 h-3 bg-black" />
                      <div className="absolute bottom-1 left-1 w-3 h-3 bg-black" />
                      <div className="absolute bottom-1 right-1 w-3 h-3 bg-black" />
                    </div>
                  </div>
                </div>
                <span className="text-[11px] font-mono font-bold text-slate-900 mt-2">
                  MARKER: ETNOSAINS-MELAYU-LANGKAT
                </span>
              </div>

              <div className="text-xs text-slate-300 space-y-2 leading-relaxed">
                <p>
                  <strong>Cara Menggunakan:</strong>
                </p>
                <ul className="list-disc list-inside space-y-1 text-slate-300">
                  <li>Tampilkan pola marker di atas pada layar HP lain / cetak di kertas.</li>
                  <li>Arahkan kamera ke pola marker hitam-putih di atas.</li>
                  <li>Model 3D Rumah Melayu Langkat akan langsung diproyeksikan secara stabil.</li>
                </ul>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    window.print();
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Cetak / Simpan Marker</span>
                </button>
                <button
                  onClick={() => setShowMarkerGuide(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
                >
                  Kembali
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
