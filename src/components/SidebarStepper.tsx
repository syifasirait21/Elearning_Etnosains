import React from 'react';
import { PageId, User } from '../types';
import { LEARNING_PAGES } from '../data/learningData';
import { isPageUnlocked, getLockedReason } from '../lib/progression';
import { 
  CheckCircle2, 
  Circle, 
  X, 
  Home, 
  Compass, 
  Target, 
  AlertTriangle, 
  Landmark, 
  Globe, 
  Trees, 
  Droplets, 
  BookOpenCheck, 
  FileSearch, 
  Award, 
  ClipboardCheck, 
  UserCheck, 
  LayoutDashboard,
  Sparkles,
  ChevronRight,
  Bot,
  Camera,
  MessageSquare,
  Lock
} from 'lucide-react';

interface SidebarStepperProps {
  isOpen?: boolean;
  onClose?: () => void;
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  completedPages: PageId[];
  currentUser: User;
  isInline?: boolean;
  onOpenAiAssistant?: () => void;
  onOpenArExploration?: () => void;
  onOpenForumChat?: () => void;
  onLockedAttempt?: (pageId: PageId, reason: string) => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Home,
  Compass,
  Target,
  AlertTriangle,
  Landmark,
  Globe,
  Trees,
  Droplets,
  BookOpenCheck,
  FileSearch,
  Award,
  ClipboardCheck,
  UserCheck,
  LayoutDashboard
};

export const SidebarStepper: React.FC<SidebarStepperProps> = ({
  isOpen = true,
  onClose,
  currentPage,
  onNavigate,
  completedPages,
  currentUser,
  isInline = false,
  onOpenAiAssistant,
  onOpenArExploration,
  onOpenGoogleChat,
  onLockedAttempt,
}) => {
  // Categorize pages
  const categories = [
    { name: 'Pengantar', pages: LEARNING_PAGES.filter(p => p.category === 'Pengantar') },
    { name: 'Eksplorasi & Fenomena', pages: LEARNING_PAGES.filter(p => p.category === 'Eksplorasi') },
    { name: 'Materi Inti Biologi', pages: LEARNING_PAGES.filter(p => p.category === 'Materi Inti') },
    { name: 'Aktivitas & Investigasi', pages: LEARNING_PAGES.filter(p => p.category === 'Aktivitas') },
    { name: 'Kuis & Evaluasi', pages: LEARNING_PAGES.filter(p => p.category === 'Evaluasi') },
    { name: 'Manajemen & Laporan', pages: LEARNING_PAGES.filter(p => p.category === 'Manajemen') },
  ];

  const content = (
    <div className={`bg-white flex flex-col ${isInline ? 'rounded-2xl border border-slate-200 shadow-sm overflow-hidden' : 'h-full'}`}>
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-emerald-800 to-teal-900 text-white flex items-center justify-between">
        <div>
          <div className="text-[10px] font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Alur Pembelajaran
          </div>
          <h2 className="text-sm sm:text-base font-bold text-white mt-0.5">Daftar Modul & Aktivitas</h2>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Tutup Menu"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* User Status Bar inside sidebar */}
      <div className="px-4 py-2.5 bg-emerald-50/80 border-b border-emerald-100 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 truncate">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
          <span className="font-bold text-emerald-950 truncate text-[11px]">{currentUser?.nama || 'Peserta Didik'}</span>
        </div>
        <div className="text-emerald-800 font-extrabold text-[11px] shrink-0">
          {completedPages.filter(p => p !== 'beranda' && p !== 'dashboard-siswa' && p !== 'dashboard-guru').length}/12 Tahap Selesai
        </div>
      </div>

      {/* Smart Tools Quick Access in Sidebar */}
      <div className="p-3 bg-slate-50 border-b border-slate-200 space-y-1.5">
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1">
          Fitur Unggulan Interaktif
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {onOpenAiAssistant && (
            <button
              onClick={() => {
                onOpenAiAssistant();
                if (onClose) onClose();
              }}
              className="p-2 rounded-xl bg-gradient-to-br from-emerald-700 to-teal-800 text-white text-left shadow-xs hover:from-emerald-800 hover:to-teal-900 transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <Bot className="w-4 h-4 text-amber-300" />
                <span className="text-[9px] bg-white/20 px-1 rounded font-bold">AI</span>
              </div>
              <div className="font-bold text-[11px] mt-1.5 leading-tight">🤖 Asisten Belajar</div>
            </button>
          )}

          {onOpenArExploration && (
            <button
              onClick={() => {
                onOpenArExploration();
                if (onClose) onClose();
              }}
              className="p-2 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 text-slate-950 text-left shadow-xs hover:from-amber-400 hover:to-amber-500 transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <Camera className="w-4 h-4 text-slate-950" />
                <span className="text-[9px] bg-black/15 px-1 rounded font-bold">3D AR</span>
              </div>
              <div className="font-bold text-[11px] mt-1.5 leading-tight">🏛️ Eksplorasi AR</div>
            </button>
          )}
        </div>
      </div>

      {/* Module List with categories */}
      <div className={`flex-1 overflow-y-auto no-scrollbar p-3 space-y-4 ${isInline ? 'max-h-[calc(100vh-220px)]' : ''}`}>
        {categories.map((cat, catIdx) => (
          <div key={catIdx} className="space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 py-0.5">
              {cat.name}
            </div>
            <div className="space-y-1">
              {cat.pages.map((item) => {
                const isCurrent = item.id === currentPage;
                const isCompleted = completedPages.includes(item.id);
                const isUnlocked = isPageUnlocked(item.id, completedPages, currentUser);
                const IconComponent = ICON_MAP[item.iconName] || Circle;

                return (
                  <button
                    key={item.id}
                    id={`sidebar-item-${item.id}`}
                    onClick={() => {
                      if (!isUnlocked) {
                        const reason = getLockedReason(item.id);
                        if (onLockedAttempt) {
                          onLockedAttempt(item.id, reason);
                        }
                        return;
                      }
                      onNavigate(item.id);
                      if (onClose) onClose();
                    }}
                    title={!isUnlocked ? getLockedReason(item.id) : (item.shortTitle || item.title)}
                    className={`w-full text-left p-2.5 rounded-xl transition-all flex items-center gap-2.5 border ${
                      isCurrent
                        ? 'bg-emerald-700 text-white border-emerald-800 shadow-sm'
                        : !isUnlocked
                        ? 'bg-slate-100/70 text-slate-400 border-dashed border-slate-200 cursor-not-allowed opacity-75 hover:bg-slate-100 hover:border-slate-300'
                        : isCompleted
                        ? 'bg-emerald-50/60 text-slate-800 border-emerald-100 hover:bg-emerald-100/70'
                        : 'bg-white text-slate-700 border-transparent hover:bg-slate-50 hover:border-slate-200'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
                      isCurrent
                        ? 'bg-white/20 text-white'
                        : !isUnlocked
                        ? 'bg-slate-200 text-slate-400'
                        : isCompleted
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 text-slate-500'
                    }`}>
                      {!isUnlocked ? (
                        <Lock className="w-3.5 h-3.5 text-slate-400" />
                      ) : (
                        <IconComponent className="w-3.5 h-3.5" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className={`text-[10px] font-bold ${
                          isCurrent ? 'text-amber-300' : !isUnlocked ? 'text-slate-400' : 'text-emerald-700'
                        }`}>
                          Hal. {item.number}
                        </span>
                        {isCompleted ? (
                          <CheckCircle2 className={`w-3 h-3 ${isCurrent ? 'text-amber-300' : 'text-emerald-600'}`} />
                        ) : !isUnlocked ? (
                          <span className="text-[9px] font-bold text-slate-400 bg-slate-200/80 px-1 py-0.2 rounded flex items-center gap-0.5">
                            <Lock className="w-2.5 h-2.5" /> Terkunci
                          </span>
                        ) : null}
                      </div>
                      <div className={`text-xs font-semibold truncate ${
                        isCurrent ? 'text-white' : !isUnlocked ? 'text-slate-500' : 'text-slate-800'
                      }`}>
                        {item.shortTitle || item.title}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer inside sidebar */}
      <div className="p-3 bg-slate-50 border-t border-slate-200 text-center">
        <p className="text-[10px] text-slate-500 font-medium">
          Biologi Etnosains Melayu Langkat
        </p>
      </div>
    </div>
  );

  if (isInline) {
    return content;
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-fade-in"
      />

      {/* Sidebar Panel */}
      <div className="absolute inset-y-0 left-0 max-w-full flex">
        <div className="w-screen max-w-sm bg-white shadow-2xl flex flex-col border-r border-slate-200 animate-slide-in-right">
          {content}
        </div>
      </div>
    </div>
  );
};
