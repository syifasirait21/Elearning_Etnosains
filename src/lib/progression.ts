import { PageId, User } from '../types';
import { LEARNING_PAGES } from '../data/learningData';

/**
 * The sequential progression of the learning path.
 * Learning begins at 'petunjuk' (Beranda is the main portal/hub outside the progression track).
 * Students complete each stage one by one to unlock the next.
 */
export const LEARNING_FLOW_SEQUENCE: PageId[] = [
  'petunjuk',
  'tujuan',
  'orientasi',
  'etnosains',
  'materi-perubahan',
  'materi-penebangan',
  'materi-pencemaran',
  'aktivitas-literasi',
  'studi-kasus',
  'kuis',
  'evaluasi',
  'rangkuman',
  'dashboard-siswa'
];

/**
 * Checks if a specific page is unlocked.
 * - Teachers (role === 'guru') have unrestricted access to all modules.
 * - 'beranda' is the home portal, always freely accessible at any time.
 * - 'petunjuk' is the 1st step in the learning sequence, always unlocked by default.
 * - Any subsequent step is unlocked only when the immediately preceding step is completed.
 */
export function isPageUnlocked(
  pageId: PageId,
  completedPages: PageId[] = [],
  currentUser?: User | null
): boolean {
  // Teachers have unrestricted access
  if (currentUser?.role === 'guru') return true;

  // Teacher dashboard is only for teachers
  if (pageId === 'dashboard-guru') return false;

  // Beranda is the main home portal - always unlocked & not constrained by progression
  if (pageId === 'beranda') return true;

  // Petunjuk is the first step in learning sequence - always unlocked
  if (pageId === 'petunjuk') return true;

  const completedSet = new Set(completedPages || []);
  
  // If the page itself is already marked completed, it is unlocked for review
  if (completedSet.has(pageId)) return true;

  const pageIndex = LEARNING_FLOW_SEQUENCE.indexOf(pageId);
  
  // If not found in sequential flow, allow access
  if (pageIndex <= 0) return true;

  // The immediately preceding step in LEARNING_FLOW_SEQUENCE must be completed
  const previousPageId = LEARNING_FLOW_SEQUENCE[pageIndex - 1];
  return completedSet.has(previousPageId);
}

/**
 * Returns the latest unlocked step for a student so they can resume learning smoothly.
 */
export function getLatestUnlockedPage(
  completedPages: PageId[] = [],
  currentUser?: User | null
): PageId {
  if (currentUser?.role === 'guru') return 'petunjuk';
  
  const completedSet = new Set(completedPages || []);
  
  for (const pageId of LEARNING_FLOW_SEQUENCE) {
    if (!completedSet.has(pageId)) {
      return pageId;
    }
  }

  // If all completed, return dashboard
  return 'dashboard-siswa';
}

/**
 * Returns a human-friendly message why a page is locked and what needs to be done.
 */
export function getLockedReason(pageId: PageId): string {
  const pageIndex = LEARNING_FLOW_SEQUENCE.indexOf(pageId);
  if (pageIndex <= 0) return '';
  const prevId = LEARNING_FLOW_SEQUENCE[pageIndex - 1];
  const prevPage = LEARNING_PAGES.find(p => p.id === prevId);
  const targetPage = LEARNING_PAGES.find(p => p.id === pageId);
  
  return `Tahap "${targetPage?.title || pageId}" masih terkunci. Silakan selesaikan tahap "${prevPage?.title || prevId}" terlebih dahulu.`;
}
