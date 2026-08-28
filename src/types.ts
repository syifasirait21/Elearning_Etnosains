export type PageId =
  | 'beranda'
  | 'petunjuk'
  | 'tujuan'
  | 'orientasi'
  | 'etnosains'
  | 'materi-perubahan'
  | 'materi-penebangan'
  | 'materi-pencemaran'
  | 'aktivitas-literasi'
  | 'studi-kasus'
  | 'kuis'
  | 'evaluasi'
  | 'rangkuman'
  | 'dashboard-siswa'
  | 'dashboard-guru';

export interface User {
  id: string;
  role: 'siswa' | 'guru';
  nama: string;
  kelas?: string;
  sekolah?: string;
  nisn?: string;
  email?: string;
  avatar?: string;
}

export interface OrientasiAnswer {
  q1: string; // Apa yang terjadi
  q2: string; // Apa penyebabnya
  q3: string; // Dampak bagi makhluk hidup
  q4: string; // Upaya pemecahan
  submittedAt?: string;
}

export interface CaseStudyAnswer {
  caseId: string;
  masalah: string;
  penyebab: string;
  dampak: string;
  hubunganSebabAkibat?: string;
  solusi: string;
  submittedAt?: string;
}

export interface QuizResult {
  quizId?: string;
  score: number;
  totalQuestions: number;
  correctCount: number;
  answers: Record<number, string>;
  completedAt: string;
}

export interface EvaluationResult {
  score: number;
  totalQuestions: number;
  correctCount: number;
  answers: Record<number, string>;
  completedAt: string;
  literacyCategory: string;
}

export interface StudentProgress {
  userId: string;
  user: User;
  completedPages: PageId[];
  orientasiAnswers?: OrientasiAnswer;
  caseAnswers?: Record<string, CaseStudyAnswer>;
  literasiAnswers?: Record<string, any>;
  quizResult?: QuizResult;
  evaluationResult?: EvaluationResult;
  lastActive: string;
}


export interface QuizQuestion {
  id: number;
  topic: 'perubahan' | 'penebangan' | 'pencemaran' | 'etnosains';
  type: 'multiple-choice' | 'true-false' | 'cause-effect' | 'case-analysis';
  question: string;
  context?: string;
  options: {
    id: string;
    text: string;
  }[];
  correctAnswer: string;
  explanation: string;
}

export interface EvaluationQuestion {
  id: number;
  indicator: string; // Aspek literasi lingkungan
  question: string;
  context: string;
  options: {
    id: string;
    text: string;
  }[];
  correctAnswer: string;
  explanation: string;
}
