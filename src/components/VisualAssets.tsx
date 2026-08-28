import React from 'react';

export const RumahMelayuIllustration: React.FC<{ className?: string }> = ({ className = 'w-full h-auto' }) => {
  return (
    <svg viewBox="0 0 800 480" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ecfdf5" />
          <stop offset="60%" stopColor="#d1fae5" />
          <stop offset="100%" stopColor="#a7f3d0" />
        </linearGradient>
        <linearGradient id="roofGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#78350f" />
          <stop offset="50%" stopColor="#92400e" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
        <linearGradient id="woodGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#854d0e" />
          <stop offset="100%" stopColor="#713f12" />
        </linearGradient>
        <linearGradient id="riverGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0284c7" />
          <stop offset="50%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0ea5e9" />
        </linearGradient>
        <linearGradient id="soilGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#84cc16" />
          <stop offset="30%" stopColor="#65a30d" />
          <stop offset="100%" stopColor="#4d7c0f" />
        </linearGradient>
      </defs>

      {/* Sky & Distant Canopy */}
      <rect width="800" height="480" fill="url(#skyGrad)" rx="12" />

      {/* Distant Hills / Rain Forest Canopy (TNGL Langkat) */}
      <path d="M0 240 Q160 180 340 210 T700 190 Q760 210 800 230 L800 480 L0 480 Z" fill="#047857" opacity="0.3" />
      <path d="M0 260 Q200 220 400 250 T800 240 L800 480 L0 480 Z" fill="#065f46" opacity="0.4" />

      {/* River Batang Serangan (Sempadan Sungai Alami) */}
      <path d="M0 380 Q250 350 480 390 T800 370 L800 480 L0 480 Z" fill="url(#riverGrad)" opacity="0.85" />
      <path d="M50 420 Q200 400 350 430 Q500 410 750 440" stroke="#bae6fd" strokeWidth="3" strokeLinecap="round" strokeDasharray="12 16" />

      {/* Riparian Vegetation & Riverbank Soil */}
      <path d="M0 340 Q220 310 450 330 T800 320 L800 480 L0 480 Z" fill="url(#soilGrad)" />

      {/* Trees & Biodiversity surrounding the House (Agroekosistem Pekarangan) */}
      {/* Palm / Coconut Tree */}
      <path d="M720 340 Q710 240 730 160" stroke="#713f12" strokeWidth="10" strokeLinecap="round" />
      <path d="M730 160 Q660 140 640 170" stroke="#15803d" strokeWidth="6" strokeLinecap="round" />
      <path d="M730 160 Q680 110 650 120" stroke="#16a34a" strokeWidth="6" strokeLinecap="round" />
      <path d="M730 160 Q760 100 800 130" stroke="#15803d" strokeWidth="6" strokeLinecap="round" />
      <path d="M730 160 Q780 150 790 190" stroke="#16a34a" strokeWidth="6" strokeLinecap="round" />
      <circle cx="725" cy="165" r="7" fill="#854d0e" />
      <circle cx="735" cy="168" r="6" fill="#a16207" />

      {/* Native Herbal Shrubs & Mangrove roots */}
      <path d="M60 360 C50 320 100 310 110 350 C130 310 180 320 170 360 Z" fill="#15803d" />
      <path d="M670 360 C660 330 700 320 720 350 C740 330 770 340 760 370 Z" fill="#166534" />

      {/* ======================================================== */}
      {/* RUMAH PANGGUNG TRADISIONAL MELAYU LANGKAT */}
      {/* ======================================================== */}

      {/* Stilt Pillars (Tiang Kayu Cengal - Bebas Pondasi Masif, Resapan Air 100%) */}
      {/* Back Pillars */}
      <g stroke="#542e0c" strokeWidth="10" strokeLinecap="round">
        <line x1="230" y1="260" x2="230" y2="350" />
        <line x1="320" y1="260" x2="320" y2="350" />
        <line x1="410" y1="260" x2="410" y2="350" />
        <line x1="500" y1="260" x2="500" y2="350" />
        <line x1="580" y1="260" x2="580" y2="350" />
      </g>

      {/* Permeable Soil Zone Under House (Kolong Resapan Air Alami) */}
      <ellipse cx="400" cy="350" rx="220" ry="18" fill="#4d7c0f" opacity="0.6" />
      <text x="400" y="365" textAnchor="middle" fill="#fef08a" fontSize="11" fontWeight="bold" fontFamily="sans-serif">
        Zona Resapan Air & Sirkulasi Angin Kolong (Infiltrasi 100%)
      </text>

      {/* Front Pillars */}
      <g stroke="#713f12" strokeWidth="12" strokeLinecap="round">
        <line x1="210" y1="270" x2="210" y2="355" />
        <line x1="290" y1="270" x2="290" y2="355" />
        <line x1="380" y1="270" x2="380" y2="355" />
        <line x1="470" y1="270" x2="470" y2="355" />
        <line x1="560" y1="270" x2="560" y2="355" />
      </g>

      {/* Stone / Timber Plinths for Pillars (Umpak Kayu) */}
      <g fill="#475569">
        <rect x="202" y="348" width="16" height="10" rx="2" />
        <rect x="282" y="348" width="16" height="10" rx="2" />
        <rect x="372" y="348" width="16" height="10" rx="2" />
        <rect x="462" y="348" width="16" height="10" rx="2" />
        <rect x="552" y="348" width="16" height="10" rx="2" />
      </g>

      {/* Main Floor Platform (Lantai Panggung Kayu) */}
      <rect x="180" y="260" width="410" height="16" fill="#854d0e" rx="3" stroke="#542e0c" strokeWidth="2" />

      {/* House Body (Dinding Papan Kayu Ulin / Merbau Alami) */}
      <rect x="200" y="160" width="370" height="102" fill="url(#woodGrad)" rx="2" />

      {/* Horizontal Wood Planks Lines */}
      <g stroke="#542e0c" strokeWidth="1.5" opacity="0.6">
        <line x1="200" y1="180" x2="570" y2="180" />
        <line x1="200" y1="200" x2="570" y2="200" />
        <line x1="200" y1="220" x2="570" y2="220" />
        <line x1="200" y1="240" x2="570" y2="240" />
      </g>

      {/* Traditional Windows with Carved Ventilation Grilles (Kisi-kisi Ventilasi Silang) */}
      {/* Window 1 */}
      <rect x="230" y="180" width="44" height="60" fill="#fef3c7" stroke="#78350f" strokeWidth="3" rx="2" />
      <path d="M230 195 L274 195 M252 180 L252 240" stroke="#78350f" strokeWidth="2" />
      <rect x="230" y="172" width="44" height="8" fill="#ca8a04" rx="1" />

      {/* Window 2 */}
      <rect x="310" y="180" width="44" height="60" fill="#fef3c7" stroke="#78350f" strokeWidth="3" rx="2" />
      <path d="M310 195 L354 195 M332 180 L332 240" stroke="#78350f" strokeWidth="2" />
      <rect x="310" y="172" width="44" height="8" fill="#ca8a04" rx="1" />

      {/* Main Traditional Door (Pintu Kayu Jalusi) */}
      <rect x="390" y="180" width="50" height="80" fill="#451a03" stroke="#ca8a04" strokeWidth="2" rx="2" />
      <circle cx="430" cy="225" r="3" fill="#eab308" />

      {/* Window 3 */}
      <rect x="475" y="180" width="44" height="60" fill="#fef3c7" stroke="#78350f" strokeWidth="3" rx="2" />
      <path d="M475 195 L519 195 M497 180 L497 240" stroke="#78350f" strokeWidth="2" />
      <rect x="475" y="172" width="44" height="8" fill="#ca8a04" rx="1" />

      {/* Front Entrance Staircase (Tangga Masuk Kayu) */}
      <path d="M395 262 L370 350 L425 350 L440 262 Z" fill="#713f12" stroke="#542e0c" strokeWidth="2" />
      <line x1="390" y1="285" x2="435" y2="285" stroke="#ca8a04" strokeWidth="3" />
      <line x1="384" y1="305" x2="430" y2="305" stroke="#ca8a04" strokeWidth="3" />
      <line x1="378" y1="325" x2="428" y2="325" stroke="#ca8a04" strokeWidth="3" />

      {/* Traditional Rumbia/Limpas Thatch Roof (Atap Lipat Kajang / Bubungan Melayu Langkat) */}
      <path d="M140 165 L385 45 L630 165 L590 172 L385 70 L180 172 Z" fill="url(#roofGrad)" stroke="#542e0c" strokeWidth="2" />
      
      {/* Roof Texture (Anyaman Daun Rumbia Berpori Termal) */}
      <g stroke="#fde68a" strokeWidth="1" opacity="0.4">
        <line x1="200" y1="150" x2="385" y2="60" />
        <line x1="230" y1="140" x2="385" y2="60" />
        <line x1="270" y1="130" x2="385" y2="60" />
        <line x1="310" y1="110" x2="385" y2="60" />
        <line x1="570" y1="150" x2="385" y2="60" />
        <line x1="540" y1="140" x2="385" y2="60" />
        <line x1="500" y1="130" x2="385" y2="60" />
        <line x1="460" y1="110" x2="385" y2="60" />
      </g>

      {/* Ornamen Puncak Tradisional Melayu (Selembayung / Lebah Bergantung) */}
      <path d="M385 45 Q365 25 350 35 Q375 40 385 48 Q395 40 420 35 Q405 25 385 45 Z" fill="#eab308" stroke="#ca8a04" strokeWidth="1.5" />
      <circle cx="385" cy="25" r="4" fill="#fef08a" />

      {/* Badges / Callouts */}
      <g transform="translate(18, 20)">
        <rect width="210" height="54" rx="8" fill="#ffffff" fillOpacity="0.92" stroke="#10b981" strokeWidth="1.5" />
        <text x="12" y="22" fill="#065f46" fontSize="12" fontWeight="bold" fontFamily="sans-serif">Rumah Melayu Langkat</text>
        <text x="12" y="38" fill="#047857" fontSize="10" fontFamily="sans-serif">Arsitektur Ekologis & Berkelanjutan</text>
      </g>

      <g transform="translate(560, 20)">
        <rect width="220" height="54" rx="8" fill="#ffffff" fillOpacity="0.92" stroke="#d97706" strokeWidth="1.5" />
        <text x="12" y="22" fill="#92400e" fontSize="12" fontWeight="bold" fontFamily="sans-serif">Etnosains Biologi</text>
        <text x="12" y="38" fill="#78350f" fontSize="10" fontFamily="sans-serif">Adaptasi Banjir & Isolator Termal</text>
      </g>
    </svg>
  );
};

export const DeforestationIllustration: React.FC<{ className?: string }> = ({ className = 'w-full h-auto' }) => {
  return (
    <svg viewBox="0 0 800 420" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="healthySky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dcfce7" />
          <stop offset="100%" stopColor="#bbf7d0" />
        </linearGradient>
        <linearGradient id="degradedSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffedd5" />
          <stop offset="100%" stopColor="#fed7aa" />
        </linearGradient>
      </defs>

      {/* Split Comparison Background */}
      {/* Left: Healthy Forest (Hutan Lestari Alami) */}
      <rect x="0" y="0" width="395" height="420" fill="url(#healthySky)" rx="10" />
      {/* Right: Deforested Hill (Lahan Terdegradasi & Erosi) */}
      <rect x="405" y="0" width="395" height="420" fill="url(#degradedSky)" rx="10" />

      {/* Divider */}
      <line x1="400" y1="10" x2="400" y2="410" stroke="#94a3b8" strokeWidth="3" strokeDasharray="6 6" />

      {/* LEFT SIDE: HUTAN HUJAN TROPIS LESTARI */}
      <text x="20" y="35" fill="#166534" fontSize="16" fontWeight="bold">1. Hutan Hujan Lestari (DAS Hulu)</text>
      <text x="20" y="55" fill="#15803d" fontSize="12">Infiltrasi tinggi • Erosi rendah • Biodiversitas terlindungi</text>

      {/* Mountain Slope Left */}
      <path d="M0 200 Q180 180 395 240 L395 420 L0 420 Z" fill="#15803d" />
      <path d="M0 260 Q200 230 395 290 L395 420 L0 420 Z" fill="#14532d" />

      {/* Lush Trees */}
      <g fill="#16a34a">
        <circle cx="60" cy="180" r="28" />
        <circle cx="110" cy="160" r="34" />
        <circle cx="160" cy="185" r="30" />
        <circle cx="210" cy="170" r="36" />
        <circle cx="270" cy="190" r="32" />
        <circle cx="330" cy="205" r="28" />
      </g>
      <g stroke="#713f12" strokeWidth="8" strokeLinecap="round">
        <line x1="60" y1="208" x2="60" y2="250" />
        <line x1="110" y1="194" x2="110" y2="250" />
        <line x1="160" y1="215" x2="160" y2="270" />
        <line x1="210" y1="206" x2="210" y2="270" />
        <line x1="270" y1="222" x2="270" y2="290" />
      </g>

      {/* Clear River Stream */}
      <path d="M0 360 Q180 330 395 360 L395 420 L0 420 Z" fill="#0284c7" />
      <text x="20" y="395" fill="#ffffff" fontSize="12" fontWeight="bold">Air Sungai Jernih & Stabil</text>

      {/* Infiltration Arrows */}
      <path d="M120 280 L120 310 M120 310 L115 303 M120 310 L125 303" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
      <path d="M220 290 L220 320 M220 320 L215 313 M220 320 L225 313" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
      <text x="80" y="335" fill="#f0fdf4" fontSize="11" fontWeight="bold">Infiltrasi Air Optimal (85%)</text>

      {/* RIGHT SIDE: PENEBANGAN HUTAN & EROSI */}
      <text x="425" y="35" fill="#9a3412" fontSize="16" fontWeight="bold">2. Hutan Gundul / Deforestasi</text>
      <text x="425" y="55" fill="#c2410c" fontSize="12">Limpasan tinggi • Erosi parah • Sedimentasi & Banjir hilir</text>

      {/* Barren Mountain Slope Right */}
      <path d="M405 240 Q600 200 800 220 L800 420 L405 420 Z" fill="#b45309" />
      <path d="M405 290 Q620 260 800 280 L800 420 L405 420 Z" fill="#78350f" />

      {/* Tree Stumps (Tunggul Pohon Ditebang) */}
      <g fill="#451a03" stroke="#ca8a04" strokeWidth="2">
        <rect x="470" y="245" width="22" height="16" rx="2" />
        <rect x="550" y="235" width="26" height="18" rx="2" />
        <rect x="640" y="250" width="24" height="16" rx="2" />
        <rect x="720" y="240" width="22" height="15" rx="2" />
      </g>

      {/* Muddy River Siltation (Sedimentasi & Keruh) */}
      <path d="M405 350 Q600 330 800 350 L800 420 L405 420 Z" fill="#92400e" />
      <text x="425" y="395" fill="#fef08a" fontSize="12" fontWeight="bold">Sungai Dangkal, Keruh & Rawan Banjir Bandang</text>

      {/* Surface Runoff & Erosion Arrows */}
      <path d="M480 270 L530 330 M530 330 L520 325 M530 330 L526 318" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
      <path d="M620 275 L670 335 M670 335 L660 330 M670 335 L666 323" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
      <text x="545" y="300" fill="#fef2f2" fontSize="11" fontWeight="bold">Limpasan Permukaan (Runoff 90%)</text>
    </svg>
  );
};

export const WaterPollutionIllustration: React.FC<{ className?: string }> = ({ className = 'w-full h-auto' }) => {
  return (
    <svg viewBox="0 0 800 380" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cleanWater" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="pollutedWater" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#84cc16" />
          <stop offset="30%" stopColor="#4d7c0f" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>
      </defs>

      {/* Clean Zone Left */}
      <rect x="0" y="0" width="395" height="380" fill="#f0fdf4" rx="10" stroke="#bbf7d0" strokeWidth="2" />
      <text x="20" y="35" fill="#166534" fontSize="16" fontWeight="bold">Air Bersih (Alami Seimbang)</text>
      <text x="20" y="55" fill="#15803d" fontSize="12">DO Tinggi (&gt;6 mg/L) • BOD Rendah • Biodiversitas Sehat</text>
      
      {/* Clean River */}
      <rect x="20" y="80" width="355" height="270" rx="8" fill="url(#cleanWater)" />
      
      {/* Healthy Fishes & Aquatic plants */}
      <g fill="#ffffff">
        {/* Fish 1 */}
        <path d="M80 150 Q110 140 130 150 Q110 160 80 150 Z M70 145 L80 150 L70 155 Z" />
        {/* Fish 2 */}
        <path d="M220 200 Q250 190 270 200 Q250 210 220 200 Z M210 195 L220 200 L210 205 Z" />
        {/* Fish 3 */}
        <path d="M150 260 Q180 250 200 260 Q180 270 150 260 Z M140 255 L150 260 L140 265 Z" />
      </g>

      <g fill="#22c55e">
        <path d="M50 330 Q40 250 60 220 Q70 270 50 330 Z" />
        <path d="M90 330 Q80 240 100 200 Q110 260 90 330 Z" />
        <path d="M300 330 Q290 230 320 190 Q330 250 300 330 Z" />
      </g>
      <text x="40" y="330" fill="#f0fdf4" fontSize="12" fontWeight="bold">Rantai Makanan Perairan Stabil</text>

      {/* Polluted Zone Right */}
      <rect x="405" y="0" width="395" height="380" fill="#fef2f2" rx="10" stroke="#fecaca" strokeWidth="2" />
      <text x="425" y="35" fill="#991b1b" fontSize="16" fontWeight="bold">Pencemaran Air & Eutrofikasi</text>
      <text x="425" y="55" fill="#b91c1c" fontSize="12">Limbah Deterjen/POME • Algal Bloom • DO Anjlok (&lt;2 mg/L)</text>

      {/* Polluted River */}
      <rect x="425" y="80" width="355" height="270" rx="8" fill="url(#pollutedWater)" />
      
      {/* Algal Bloom Mat at Surface */}
      <rect x="425" y="80" width="355" height="35" fill="#65a30d" />
      <text x="440" y="102" fill="#fef08a" fontSize="11" fontWeight="bold">Lapisan Algal Bloom / Eceng Gondok</text>

      {/* Hypoxia & Dead Fish */}
      <g fill="#fca5a5">
        {/* Dead Fish 1 (Floated belly up) */}
        <path d="M500 135 Q530 145 550 135 Q530 125 500 135 Z M490 140 L500 135 L490 130 Z" transform="rotate(180 520 135)" />
        <text x="560" y="140" fill="#fca5a5" fontSize="11">Ikan mati (hipoksia)</text>
      </g>

      {/* Toxic / Waste Inflow */}
      <path d="M720 70 L720 120" stroke="#451a03" strokeWidth="16" strokeLinecap="round" />
      <path d="M710 120 Q700 180 660 220" stroke="#78350f" strokeWidth="10" opacity="0.8" />
      <text x="610" y="115" fill="#fef08a" fontSize="10" fontWeight="bold">Saluran Limbah</text>

      <g fill="#94a3b8">
        {/* Sunken Plastic Bottles */}
        <rect x="520" y="280" width="25" height="12" rx="3" fill="#cbd5e1" />
        <rect x="620" y="290" width="30" height="14" rx="4" fill="#cbd5e1" />
        <circle cx="580" cy="310" r="10" fill="#94a3b8" />
      </g>
      <text x="440" y="330" fill="#fecaca" fontSize="12" fontWeight="bold">Akumulasi Sampah & Mikroplastik</text>
    </svg>
  );
};
