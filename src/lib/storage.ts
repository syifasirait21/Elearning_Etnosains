import { User, StudentProgress, PageId, OrientasiAnswer, CaseStudyAnswer, QuizResult, EvaluationResult } from '../types';
import { INITIAL_STUDENTS_DATA } from '../data/learningData';

const CURRENT_USER_KEY = 'elearning_langkat_current_user';
const STUDENTS_DATA_KEY = 'elearning_langkat_students_data';

export const DEFAULT_STUDENT_USER: User = {
  id: 'siswa-default',
  role: 'siswa',
  nama: 'Muhammad Rizky Fauzi',
  kelas: 'XI MIPA 1',
  sekolah: 'SMA Negeri 1 Langkat',
  nisn: '0078921453'
};

export const DEFAULT_TEACHER_USER: User = {
  id: 'guru-1',
  role: 'guru',
  nama: 'Dra. Hj. Nurmasyithah, M.Pd.',
  sekolah: 'SMA Negeri 1 Langkat',
  email: 'guru.biologi@sman1langkat.sch.id'
};

export function initStorage() {
  const existingStudents = localStorage.getItem(STUDENTS_DATA_KEY);
  if (!existingStudents) {
    localStorage.setItem(STUDENTS_DATA_KEY, JSON.stringify(INITIAL_STUDENTS_DATA));
  }

  const existingUser = localStorage.getItem(CURRENT_USER_KEY);
  if (!existingUser) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(DEFAULT_STUDENT_USER));
  }
}

export function getCurrentUser(): User {
  try {
    const raw = localStorage.getItem(CURRENT_USER_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error(e);
  }
  return DEFAULT_STUDENT_USER;
}

export function setCurrentUser(user: User): void {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  
  // Also make sure student progress record exists
  if (user.role === 'siswa') {
    const all = getAllStudentsProgress();
    const found = all.find(s => s.userId === user.id);
    if (!found) {
      const newRecord: StudentProgress = {
        userId: user.id,
        user: { ...user },
        completedPages: ['beranda'],
        lastActive: new Date().toISOString()
      };
      all.push(newRecord);
      saveAllStudentsProgress(all);
    } else {
      found.user = { ...user };
      saveAllStudentsProgress(all);
    }
  }
}

export function getAllStudentsProgress(): StudentProgress[] {
  try {
    const raw = localStorage.getItem(STUDENTS_DATA_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error(e);
  }
  return INITIAL_STUDENTS_DATA;
}

export function saveAllStudentsProgress(students: StudentProgress[]): void {
  localStorage.setItem(STUDENTS_DATA_KEY, JSON.stringify(students));
}

export function getStudentProgress(userId: string): StudentProgress {
  const all = getAllStudentsProgress();
  const current = all.find(s => s.userId === userId);
  if (current) return current;

  const user = getCurrentUser();
  const newProg: StudentProgress = {
    userId,
    user: user.id === userId ? user : {
      id: userId,
      role: 'siswa',
      nama: 'Peserta Didik',
      kelas: 'XI MIPA 1',
      sekolah: 'SMA Negeri 1 Langkat'
    },
    completedPages: ['beranda'],
    lastActive: new Date().toISOString()
  };
  all.push(newProg);
  saveAllStudentsProgress(all);
  return newProg;
}

export function markPageCompleted(userId: string, pageId: PageId): StudentProgress {
  const all = getAllStudentsProgress();
  const index = all.findIndex(s => s.userId === userId);
  
  if (index !== -1) {
    const pages = new Set(all[index].completedPages || []);
    pages.add(pageId);
    all[index].completedPages = Array.from(pages);
    all[index].lastActive = new Date().toISOString();
    saveAllStudentsProgress(all);
    return all[index];
  } else {
    const user = getCurrentUser();
    const newProg: StudentProgress = {
      userId,
      user: { ...user },
      completedPages: ['beranda', pageId],
      lastActive: new Date().toISOString()
    };
    all.push(newProg);
    saveAllStudentsProgress(all);
    return newProg;
  }
}

export function saveOrientasiAnswers(userId: string, answers: OrientasiAnswer): void {
  const all = getAllStudentsProgress();
  const index = all.findIndex(s => s.userId === userId);
  if (index !== -1) {
    all[index].orientasiAnswers = {
      ...answers,
      submittedAt: new Date().toISOString()
    };
    const pages = new Set(all[index].completedPages || []);
    pages.add('orientasi');
    all[index].completedPages = Array.from(pages);
    all[index].lastActive = new Date().toISOString();
    saveAllStudentsProgress(all);
  }
}

export function saveCaseStudyAnswer(userId: string, answer: CaseStudyAnswer): void {
  const all = getAllStudentsProgress();
  const index = all.findIndex(s => s.userId === userId);
  if (index !== -1) {
    all[index].caseAnswers = {
      ...(all[index].caseAnswers || {}),
      [answer.caseId]: {
        ...answer,
        submittedAt: new Date().toISOString()
      }
    };
    all[index].lastActive = new Date().toISOString();
    saveAllStudentsProgress(all);
  }
}

export function saveQuizResult(userId: string, result: QuizResult): void {
  const all = getAllStudentsProgress();
  const index = all.findIndex(s => s.userId === userId);
  if (index !== -1) {
    all[index].quizResult = result;
    const pages = new Set(all[index].completedPages || []);
    pages.add('kuis');
    all[index].completedPages = Array.from(pages);
    all[index].lastActive = new Date().toISOString();
    saveAllStudentsProgress(all);
  }
}

export function saveEvaluationResult(userId: string, result: EvaluationResult): void {
  const all = getAllStudentsProgress();
  const index = all.findIndex(s => s.userId === userId);
  if (index !== -1) {
    all[index].evaluationResult = result;
    const pages = new Set(all[index].completedPages || []);
    pages.add('evaluasi');
    all[index].completedPages = Array.from(pages);
    all[index].lastActive = new Date().toISOString();
    saveAllStudentsProgress(all);
  }
}
