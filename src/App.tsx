import React, { useState, useEffect } from 'react';
import { PageId, User } from './types';
import { getCurrentUser, setCurrentUser, getStudentProgress, markPageCompleted } from './lib/storage';
import { isPageUnlocked, getLockedReason, getLatestUnlockedPage } from './lib/progression';
import { Header } from './components/Header';
import { SidebarStepper } from './components/SidebarStepper';
import { AuthModal } from './components/AuthModal';
import { GoogleChatModal } from './components/GoogleChatModal';
import { AiAssistantModal } from './components/AiAssistantModal';
import { ArExplorationModal } from './components/ArExplorationModal';
import { LEARNING_PAGES } from './data/learningData';
import { 
  BookOpen,
  Bot,
  Lock,
  AlertCircle,
  X
} from 'lucide-react';

// Pages
import { BerandaPage } from './components/pages/BerandaPage';
import { PetunjukPage } from './components/pages/PetunjukPage';
import { TujuanPage } from './components/pages/TujuanPage';
import { OrientasiPage } from './components/pages/OrientasiPage';
import { EtnosainsPage } from './components/pages/EtnosainsPage';
import { MateriPerubahanPage } from './components/pages/MateriPerubahanPage';
import { MateriPenebanganPage } from './components/pages/MateriPenebanganPage';
import { MateriPencemaranPage } from './components/pages/MateriPencemaranPage';
import { LiterasiAktivitasPage } from './components/pages/LiterasiAktivitasPage';
import { StudiKasusPage } from './components/pages/StudiKasusPage';
import { KuisPage } from './components/pages/KuisPage';
import { EvaluasiPage } from './components/pages/EvaluasiPage';
import { RangkumanPage } from './components/pages/RangkumanPage';
import { DashboardSiswaPage } from './components/pages/DashboardSiswaPage';
import { DashboardGuruPage } from './components/pages/DashboardGuruPage';

export function App() {
  const [currentUser, setCurrentUserState] = useState<User>(getCurrentUser());
  const [currentPage, setCurrentPage] = useState<PageId>('beranda');
  const [completedPages, setCompletedPages] = useState<PageId[]>([]);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [isGoogleChatOpen, setIsGoogleChatOpen] = useState<boolean>(false);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState<boolean>(false);
  const [isArExplorationOpen, setIsArExplorationOpen] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isWideMode, setIsWideMode] = useState<boolean>(true); // Default to wide full-width reading
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [lockedToast, setLockedToast] = useState<{ message: string; targetPageTitle?: string } | null>(null);

  // Sync user and progress on mount & user change
  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUserState(user);
    const progress = getStudentProgress(user.id);
    if (progress) {
      setCompletedPages(progress.completedPages || ['beranda']);
    }
  }, []);

  // Listen for fullscreen change events from browser
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Toggle browser fullscreen
  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {
        // Fallback if iframe restriction or browser policy
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  };

  // When navigating or pressing Lanjut, mark the current stage completed and validate sequential access
  const handleNavigate = (page: PageId) => {
    let updatedCompleted = completedPages;

    // If the student is on an active learning stage, mark it as completed immediately
    if (currentUser.role === 'siswa' && currentPage !== 'dashboard-siswa' && currentPage !== 'dashboard-guru') {
      const updated = markPageCompleted(currentUser.id, currentPage);
      updatedCompleted = updated.completedPages;
      setCompletedPages(updatedCompleted);
    }

    // Check if target page is unlocked for current student with the updated completion state
    const unlocked = isPageUnlocked(page, updatedCompleted, currentUser);
    if (!unlocked) {
      const reason = getLockedReason(page);
      const targetPageItem = LEARNING_PAGES.find(p => p.id === page);
      setLockedToast({
        message: reason,
        targetPageTitle: targetPageItem?.shortTitle || targetPageItem?.title || page
      });
      setTimeout(() => {
        setLockedToast((prev) => (prev?.message === reason ? null : prev));
      }, 4500);
      return;
    }

    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsSidebarOpen(false);
  };

  const handleSwitchUser = (user: User) => {
    setCurrentUser(user);
    setCurrentUserState(user);
    const prog = getStudentProgress(user.id);
    const userCompleted = prog?.completedPages || ['beranda'];
    setCompletedPages(userCompleted);

    // If current page is locked for the switched student, bring them to latest unlocked step
    if (!isPageUnlocked(currentPage, userCompleted, user)) {
      const latest = getLatestUnlockedPage(userCompleted, user);
      setCurrentPage(latest);
    }
  };

  const handleLockedAttempt = (pageId: PageId, reason: string) => {
    const targetPageItem = LEARNING_PAGES.find(p => p.id === pageId);
    setLockedToast({
      message: reason,
      targetPageTitle: targetPageItem?.shortTitle || targetPageItem?.title || pageId
    });
    setTimeout(() => {
      setLockedToast((prev) => (prev?.message === reason ? null : prev));
    }, 4500);
  };

  // Find prev/next navigation items
  const currentIndex = LEARNING_PAGES.findIndex(p => p.id === currentPage);
  const prevPage = currentIndex > 0 ? LEARNING_PAGES[currentIndex - 1] : null;
  const nextPage = currentIndex < LEARNING_PAGES.length - 1 ? LEARNING_PAGES[currentIndex + 1] : null;

  // Font size styling class
  const fontSizeClasses = {
    normal: 'text-base leading-relaxed',
    large: 'text-lg leading-loose [&_p]:text-lg [&_li]:text-lg [&_h2]:text-2xl [&_h3]:text-xl',
    xlarge: 'text-xl leading-loose [&_p]:text-xl [&_li]:text-xl [&_h2]:text-3xl [&_h3]:text-2xl'
  }[fontSize];

  return (
    <div className={`min-h-screen bg-slate-100/70 text-slate-800 flex flex-col font-sans antialiased selection:bg-emerald-200 selection:text-emerald-900 ${fontSizeClasses}`}>
      {/* Top Navigation Header */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        currentUser={currentUser}
        completedPages={completedPages}
        onOpenAuth={() => setIsAuthOpen(true)}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
        isFullscreen={isFullscreen}
        onToggleFullscreen={handleToggleFullscreen}
        isWideMode={isWideMode}
        onToggleWideMode={() => setIsWideMode(!isWideMode)}
        fontSize={fontSize}
        onChangeFontSize={setFontSize}
        onOpenGoogleChat={() => setIsGoogleChatOpen(true)}
        onOpenAiAssistant={() => setIsAiAssistantOpen(true)}
        onOpenArExploration={() => setIsArExplorationOpen(true)}
      />

      {/* Main App Body with Fluid Spacious Full-Screen Container */}
      <div className="flex-1 w-full mx-auto px-3 sm:px-6 lg:px-10 xl:px-12 py-5 flex gap-6 items-start">
        {/* Desktop Pinned Sidebar (Shown in standard view mode) */}
        {!isWideMode && (
          <aside className="hidden xl:block w-80 shrink-0 sticky top-20">
            <SidebarStepper
              isOpen={true}
              currentPage={currentPage}
              onNavigate={handleNavigate}
              completedPages={completedPages}
              currentUser={currentUser}
              isInline={true}
              onOpenAiAssistant={() => setIsAiAssistantOpen(true)}
              onOpenArExploration={() => setIsArExplorationOpen(true)}
              onOpenGoogleChat={() => setIsGoogleChatOpen(true)}
              onLockedAttempt={handleLockedAttempt}
            />
          </aside>
        )}

        {/* Dynamic Page Content View (Wide Full-Screen Canvas) */}
        <main className="flex-1 min-w-0 w-full transition-all duration-300">
          {currentPage === 'beranda' && (
            <BerandaPage
              onNavigate={handleNavigate}
              currentUser={currentUser}
              completedPages={completedPages}
              onOpenAuth={() => setIsAuthOpen(true)}
              onOpenGoogleChat={() => setIsGoogleChatOpen(true)}
              onOpenAiAssistant={() => setIsAiAssistantOpen(true)}
              onOpenArExploration={() => setIsArExplorationOpen(true)}
            />
          )}

          {currentPage === 'petunjuk' && (
            <PetunjukPage
              onNavigate={handleNavigate}
              currentUser={currentUser}
              completedPages={completedPages}
              onOpenAuth={() => setIsAuthOpen(true)}
            />
          )}

          {currentPage === 'tujuan' && (
            <TujuanPage
              onNavigate={handleNavigate}
              currentUser={currentUser}
            />
          )}

          {currentPage === 'orientasi' && (
            <OrientasiPage
              onNavigate={handleNavigate}
              currentUser={currentUser}
            />
          )}

          {currentPage === 'etnosains' && (
            <EtnosainsPage
              onNavigate={handleNavigate}
              currentUser={currentUser}
              onOpenArExploration={() => setIsArExplorationOpen(true)}
              onOpenAiAssistant={() => setIsAiAssistantOpen(true)}
            />
          )}

          {currentPage === 'materi-perubahan' && (
            <MateriPerubahanPage
              onNavigate={handleNavigate}
              currentUser={currentUser}
            />
          )}

          {currentPage === 'materi-penebangan' && (
            <MateriPenebanganPage
              onNavigate={handleNavigate}
              currentUser={currentUser}
            />
          )}

          {currentPage === 'materi-pencemaran' && (
            <MateriPencemaranPage
              onNavigate={handleNavigate}
              currentUser={currentUser}
            />
          )}

          {currentPage === 'aktivitas-literasi' && (
            <LiterasiAktivitasPage
              onNavigate={handleNavigate}
              currentUser={currentUser}
            />
          )}

          {currentPage === 'studi-kasus' && (
            <StudiKasusPage
              onNavigate={handleNavigate}
              currentUser={currentUser}
            />
          )}

          {currentPage === 'kuis' && (
            <KuisPage
              onNavigate={handleNavigate}
              currentUser={currentUser}
            />
          )}

          {currentPage === 'evaluasi' && (
            <EvaluasiPage
              onNavigate={handleNavigate}
              currentUser={currentUser}
            />
          )}

          {currentPage === 'rangkuman' && (
            <RangkumanPage
              onNavigate={handleNavigate}
              currentUser={currentUser}
            />
          )}

          {currentPage === 'dashboard-siswa' && (
            <DashboardSiswaPage
              onNavigate={handleNavigate}
              currentUser={currentUser}
              onOpenAuth={() => setIsAuthOpen(true)}
            />
          )}

          {currentPage === 'dashboard-guru' && (
            <DashboardGuruPage
              onNavigate={handleNavigate}
              currentUser={currentUser}
              onOpenAuth={() => setIsAuthOpen(true)}
            />
          )}
        </main>
      </div>

      {/* Slide-out Drawer Sidebar Stepper for all screen sizes */}
      <SidebarStepper
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentPage={currentPage}
        onNavigate={handleNavigate}
        completedPages={completedPages}
        currentUser={currentUser}
        onOpenAiAssistant={() => setIsAiAssistantOpen(true)}
        onOpenArExploration={() => setIsArExplorationOpen(true)}
        onOpenGoogleChat={() => setIsGoogleChatOpen(true)}
        onLockedAttempt={handleLockedAttempt}
      />

      {/* Floating Locked Step Toast Notification */}
      {lockedToast && (
        <div 
          id="locked-step-toast"
          className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-[92%] sm:w-auto bg-slate-950 text-white px-4 py-3.5 rounded-2xl shadow-2xl border-2 border-amber-400/80 flex items-center gap-3 animate-bounce-short backdrop-blur-md"
        >
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-400/40 flex items-center justify-center shrink-0">
            <Lock className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0 pr-1">
            <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
              <span>Tahap Masih Terkunci</span>
              <span className="text-[10px] bg-amber-400/20 text-amber-200 px-1.5 py-0.2 rounded font-semibold">Alur Berurutan</span>
            </div>
            <div className="text-xs text-slate-200 mt-0.5 leading-snug">
              {lockedToast.message}
            </div>
          </div>
          <button
            onClick={() => setLockedToast(null)}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            title="Tutup Notifikasi"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Floating Icon-Only AI Assistant Button */}
      <button
        id="floating-ai-assistant-btn"
        onClick={() => setIsAiAssistantOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-2xl bg-gradient-to-tr from-teal-800 via-emerald-600 to-teal-500 text-white shadow-xl shadow-emerald-950/40 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center border-2 border-emerald-300/40 focus:outline-hidden focus:ring-4 focus:ring-emerald-400/40 group"
        title="Buka 🤖 Asisten Belajar AI"
        aria-label="Buka Asisten Belajar AI"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-amber-400 border border-slate-900"></span>
        </span>
        <Bot className="w-7 h-7 text-amber-200 group-hover:rotate-6 transition-transform" />
      </button>

      {/* Footer */}
      <footer className="bg-slate-900 text-white border-t border-slate-800 py-8 px-4 sm:px-8 xl:px-12 mt-16">
        <div className="w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="space-y-1 text-center md:text-left">
            <div className="font-bold text-slate-200 text-sm">
              Media Pembelajaran E-Learning Biologi Etnosains Rumah Melayu Langkat
            </div>
            <div>
              Penelitian Pendidikan: Peningkatan Literasi Lingkungan Peserta Didik SMA
            </div>
          </div>
          <div className="text-center md:text-right text-slate-400">
            Materi Perubahan Lingkungan • Pendekatan Student-Centered Learning
          </div>
        </div>
      </footer>

      {/* Auth / Role Switcher Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        currentUser={currentUser}
        onSwitchUser={handleSwitchUser}
      />

      {/* Google Chat Discussion Forum Modal */}
      <GoogleChatModal
        isOpen={isGoogleChatOpen}
        onClose={() => setIsGoogleChatOpen(false)}
        currentUser={currentUser}
        currentPage={currentPage}
      />

      {/* 🤖 Asisten Belajar AI Modal */}
      <AiAssistantModal
        isOpen={isAiAssistantOpen}
        onClose={() => setIsAiAssistantOpen(false)}
        currentUser={currentUser}
        currentPage={currentPage}
      />

      {/* 🏛️ Eksplorasi AR Rumah Melayu Modal */}
      <ArExplorationModal
        isOpen={isArExplorationOpen}
        onClose={() => setIsArExplorationOpen(false)}
      />
    </div>
  );
}

export default App;
