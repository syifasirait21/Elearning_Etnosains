import React from 'react';
import { PageId, User } from '../types';
import { LEARNING_PAGES } from '../data/learningData';
import { 
  BookOpen, 
  CheckCircle2, 
  Menu, 
  User as UserIcon, 
  LogOut, 
  GraduationCap, 
  ShieldCheck,
  ChevronRight,
  Sparkles,
  Bot,
  MessageSquare
} from 'lucide-react';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  currentUser: User;
  completedPages: PageId[];
  onOpenAuth: () => void;
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  isWideMode: boolean;
  onToggleWideMode: () => void;
  fontSize: 'normal' | 'large' | 'xlarge';
  onChangeFontSize: (size: 'normal' | 'large' | 'xlarge') => void;
  onOpenForumChat?: () => void;
  onOpenAiAssistant?: () => void;
  onOpenArExploration?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  currentUser,
  completedPages,
  onOpenAuth,
  onToggleSidebar,
  isSidebarOpen,
  isFullscreen,
  onToggleFullscreen,
  isWideMode,
  onToggleWideMode,
  fontSize,
  onChangeFontSize,
  onOpenForumChat,
  onOpenAiAssistant,
  onOpenArExploration,
}) => {
  const currentIdx = LEARNING_PAGES.findIndex(p => p.id === currentPage);
  const currentMeta = LEARNING_PAGES[currentIdx] || LEARNING_PAGES[0];
  
  // Calculate progress % based on the 12 core learning stages (starting from petunjuk)
  const coreLearned = completedPages.filter(p => p !== 'beranda' && p !== 'dashboard-siswa' && p !== 'dashboard-guru').length;
  const progressPercent = Math.min(100, Math.round((coreLearned / 12) * 100));

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 text-white px-4 sm:px-6 py-2 text-xs md:text-sm font-medium flex items-center justify-between">
        <div className="flex items-center gap-2 truncate">
          <span className="bg-amber-400/20 text-amber-300 border border-amber-400/40 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider shrink-0">
            Etnosains Melayu Langkat
          </span>
          <span className="hidden sm:inline text-emerald-100 truncate text-xs">
            E-Learning Biologi • Materi Perubahan Lingkungan SMA
          </span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-1.5 text-emerald-200 text-xs">
            <span className="hidden md:inline text-emerald-300 font-medium">Progress Belajar:</span>
            <span className="font-extrabold text-amber-300">{progressPercent}%</span>
          </div>
          <div className="w-20 md:w-28 bg-emerald-950/80 rounded-full h-2.5 overflow-hidden border border-emerald-700/50">
            <div 
              className="bg-gradient-to-r from-amber-400 to-emerald-400 h-full rounded-full transition-all duration-500 ease-out" 
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="w-full mx-auto px-3 sm:px-6 lg:px-10 xl:px-12 h-16 flex items-center justify-between gap-3 sm:gap-4">
        {/* Left: Brand & Mobile Sidebar Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            id="btn-toggle-sidebar-header"
            onClick={onToggleSidebar}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors xl:hidden shrink-0 flex items-center justify-center"
            title="Buka Daftar Modul"
            aria-label="Buka Daftar Modul"
          >
            <Menu className="w-5 h-5 text-emerald-800" />
          </button>

          <div 
            onClick={() => onNavigate('beranda')}
            className="cursor-pointer flex items-center gap-2.5 group"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-md shadow-emerald-900/10 group-hover:scale-105 transition-transform shrink-0">
              <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="font-extrabold text-slate-900 text-xs sm:text-sm lg:text-base leading-tight group-hover:text-emerald-700 transition-colors">
                Bio-Etnosains Langkat
              </div>
              <div className="text-[10px] sm:text-[11px] text-slate-500 font-medium">
                SMA • Perubahan Lingkungan
              </div>
            </div>
          </div>
        </div>

        {/* Middle: Active Stage Badge */}
        <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50/90 border border-emerald-200 text-xs text-emerald-950 font-medium max-w-sm lg:max-w-md truncate shadow-2xs">
          <span className="bg-emerald-700 text-white w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0">
            {currentMeta.number}
          </span>
          <span className="truncate font-semibold">{currentMeta.shortTitle || currentMeta.title}</span>
          <ChevronRight className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
          <span className="text-slate-500 text-[11px] shrink-0">{currentMeta.category}</span>
        </div>

        {/* Right: Asisten AI, Forum Chat, Fullscreen, Font Zoom & Profile Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Dedicated 🤖 Tanya Asisten AI Button */}
          {onOpenAiAssistant && (
            <button
              id="btn-header-open-ai"
              onClick={onOpenAiAssistant}
              className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-700 to-teal-800 hover:from-emerald-800 hover:to-teal-900 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all hover:scale-105 active:scale-95 shrink-0"
              title="Buka 🤖 Asisten Belajar AI (Tutor Biologi Etnosains)"
            >
              <Bot className="w-4 h-4 text-amber-300" />
              <span className="text-[11px] sm:text-xs">Tanya AI</span>
            </button>
          )}

          {/* Dedicated 💬 Forum Diskusi Button */}
          {onOpenForumChat && (
            <button
              id="btn-header-open-chat"
              onClick={onOpenForumChat}
              className="hidden sm:flex px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-xs font-bold items-center gap-1.5 transition-all shrink-0"
              title="Buka Forum Diskusi Kelas"
            >
              <MessageSquare className="w-4 h-4 text-emerald-700" />
              <span className="hidden md:inline text-[11px]">Forum Diskusi</span>
            </button>
          )}

          {/* Role Dashboard Button */}
          {currentUser.role === 'guru' ? (
            <button
              id="btn-nav-guru-dashboard"
              onClick={() => onNavigate('dashboard-guru')}
              className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                currentPage === 'dashboard-guru'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
              <span className="hidden sm:inline">Panel Guru</span>
            </button>
          ) : (
            <button
              id="btn-nav-siswa-dashboard"
              onClick={() => onNavigate('dashboard-siswa')}
              className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                currentPage === 'dashboard-siswa'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-emerald-50 text-emerald-900 border border-emerald-200 hover:bg-emerald-100'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
              <span className="hidden sm:inline">Portofolio</span>
            </button>
          )}

          {/* User Profile Pill & Login Switcher */}
          <div className="flex items-center pl-1.5 sm:pl-2 border-l border-slate-200">
            <button
              id="btn-open-auth-modal"
              onClick={onOpenAuth}
              className="flex items-center gap-2 p-1 sm:px-2.5 sm:py-1.5 rounded-xl bg-slate-100/80 hover:bg-slate-200/80 text-slate-700 transition-colors text-xs font-medium"
            >
              <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-white text-[11px] font-bold ${
                currentUser?.role === 'guru' ? 'bg-amber-600' : 'bg-emerald-600'
              }`}>
                {currentUser?.nama ? currentUser.nama.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="hidden 2xl:block text-left max-w-[120px] truncate">
                <div className="font-bold text-slate-800 text-xs truncate">{currentUser?.nama || 'Pengguna'}</div>
                <div className="text-[10px] text-slate-500 truncate">
                  {currentUser?.role === 'guru' ? 'Guru' : currentUser?.kelas || 'Siswa'}
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
