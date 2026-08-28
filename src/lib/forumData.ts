// Storage & Data service for Classroom Discussion Forum (Forum Diskusi E-Learning)
import { User } from '../types';

export interface ForumPost {
  id: string;
  topicId: string;
  authorId: string;
  authorName: string;
  authorRole: 'siswa' | 'guru';
  authorSubtitle: string; // e.g. "XI MIPA 1" or "Pendidik Biologi"
  content: string;
  createdAt: string;
  likes: number;
  likedBy: string[]; // user IDs
  replies: ForumReply[];
}

export interface ForumReply {
  id: string;
  authorId: string;
  authorName: string;
  authorRole: 'siswa' | 'guru';
  authorSubtitle: string;
  content: string;
  createdAt: string;
}

export interface ForumTopic {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export const FORUM_TOPICS: ForumTopic[] = [
  {
    id: 'umum',
    title: '💬 Diskusi Umum & Pengantar',
    description: 'Ruang tanya jawab umum seputar pembelajaran e-learning dan orientasi masalah.',
    iconName: 'MessageSquare'
  },
  {
    id: 'perubahan-lingkungan',
    title: '🌿 Perubahan Lingkungan & Keseimbangan Ekosistem',
    description: 'Diskusi daya dukung, daya lentur, dan dampak ketidakseimbangan biosfer.',
    iconName: 'Trees'
  },
  {
    id: 'penebangan-hutan',
    title: '🌲 Deforestasi & Daerah Aliran Sungai Langkat',
    description: 'Analisis erosi lereng, hilangnya kanopi pohon, dan banjir luapan DAS Wampu.',
    iconName: 'Mountain'
  },
  {
    id: 'pencemaran-wampu',
    title: '💧 Pencemaran Air & Limbah Industri Sawit',
    description: 'Kajian parameter BOD, DO, kekeruhan, dan solusi fitoremediasi biologis.',
    iconName: 'Droplets'
  },
  {
    id: 'etnosains-rumah-melayu',
    title: '🏛️ Etnosains Rumah Melayu Langkat',
    description: 'Bedah sains tiang panggung kayu ulin, atap rumbia, dan konveksi termal alami.',
    iconName: 'Home'
  }
];

const FORUM_STORAGE_KEY = 'elearning_langkat_forum_posts_v1';

export const INITIAL_FORUM_POSTS: ForumPost[] = [
  {
    id: 'post-1',
    topicId: 'etnosains-rumah-melayu',
    authorId: 'siswa-default',
    authorName: 'Muhammad Rizky Fauzi',
    authorRole: 'siswa',
    authorSubtitle: 'Siswa • XI MIPA 1',
    content: 'Teman-teman dan Ibu Guru, apakah serat daun rumbia pada atap Rumah Melayu memiliki rongga sel khusus yang membuatnya tahan terhadap radiasi panas matahari siang hari di pesisir Langkat?',
    createdAt: 'Kemarin, 09:30',
    likes: 4,
    likedBy: ['guru-1', 'siswa-2'],
    replies: [
      {
        id: 'rep-1',
        authorId: 'guru-1',
        authorName: 'Dra. Hj. Nurmasyithah, M.Pd.',
        authorRole: 'guru',
        authorSubtitle: 'Pendidik Biologi SMA Negeri 1 Langkat',
        content: 'Pertanyaan sangat cerdas, Rizky! Secara mikroskopis, sel-sel parenkim spons pada daun rumbia yang dikeringkan membentuk rongga udara tertutup mikroskopis. Udara yang terperangkap ini merupakan konduktor panas yang sangat buruk, sehingga bertindak sebagai isolator termal alami yang efektif.',
        createdAt: 'Kemarin, 10:15'
      }
    ]
  },
  {
    id: 'post-2',
    topicId: 'pencemaran-wampu',
    authorId: 'siswa-2',
    authorName: 'Siti Nurhaliza Siregar',
    authorRole: 'siswa',
    authorSubtitle: 'Siswa • XI MIPA 1',
    content: 'Mengapa ketika limbah cair organik masuk ke Sungai Wampu, nilai BOD justru melonjak tinggi sementara kadar DO anjlok drastis sampai ikan-ikan lemas kekurangan oksigen?',
    createdAt: 'Hari ini, 08:10',
    likes: 3,
    likedBy: ['siswa-default'],
    replies: [
      {
        id: 'rep-2',
        authorId: 'guru-1',
        authorName: 'Dra. Hj. Nurmasyithah, M.Pd.',
        authorRole: 'guru',
        authorSubtitle: 'Pendidik Biologi SMA Negeri 1 Langkat',
        content: 'Bagus sekali Nurhaliza! Bakteri aerob pengurai membutuhkan oksigen terlarut (DO) dalam jumlah besar untuk menguraikan biomassa limbah organik tersebut. Karena aktivitas dekomposisi meningkat pesat, kebutuhan oksigen biokimia (BOD) naik, dan cadangan DO di badan air tersedot habis.',
        createdAt: 'Hari ini, 08:45'
      }
    ]
  },
  {
    id: 'post-3',
    topicId: 'penebangan-hutan',
    authorId: 'siswa-3',
    authorName: 'Ahmad Faisal',
    authorRole: 'siswa',
    authorSubtitle: 'Siswa • XI MIPA 2',
    content: 'Bagaimana peran kanopi hutan bertingkat di hulu Sungai Wampu dalam memecah energi kinetik tetesan air hujan lebat?',
    createdAt: 'Hari ini, 11:20',
    likes: 2,
    likedBy: ['guru-1'],
    replies: []
  }
];

export function getForumPosts(): ForumPost[] {
  try {
    const raw = localStorage.getItem(FORUM_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Error loading forum posts', e);
  }
  localStorage.setItem(FORUM_STORAGE_KEY, JSON.stringify(INITIAL_FORUM_POSTS));
  return INITIAL_FORUM_POSTS;
}

export function saveForumPosts(posts: ForumPost[]): void {
  try {
    localStorage.setItem(FORUM_STORAGE_KEY, JSON.stringify(posts));
  } catch (e) {
    console.error('Error saving forum posts', e);
  }
}

export function addForumPost(user: User, topicId: string, content: string): ForumPost {
  const posts = getForumPosts();
  const newPost: ForumPost = {
    id: `post-${Date.now()}`,
    topicId,
    authorId: user.id,
    authorName: user.nama,
    authorRole: user.role,
    authorSubtitle: user.role === 'guru' ? 'Pendidik Biologi' : `Siswa • ${user.kelas || 'XI MIPA'}`,
    content: content.trim(),
    createdAt: 'Baru saja',
    likes: 0,
    likedBy: [],
    replies: []
  };
  posts.unshift(newPost);
  saveForumPosts(posts);
  return newPost;
}

export function addForumReply(user: User, postId: string, content: string): ForumReply | null {
  const posts = getForumPosts();
  const post = posts.find(p => p.id === postId);
  if (!post) return null;

  const newReply: ForumReply = {
    id: `rep-${Date.now()}`,
    authorId: user.id,
    authorName: user.nama,
    authorRole: user.role,
    authorSubtitle: user.role === 'guru' ? 'Pendidik Biologi' : `Siswa • ${user.kelas || 'XI MIPA'}`,
    content: content.trim(),
    createdAt: 'Baru saja'
  };

  post.replies.push(newReply);
  saveForumPosts(posts);
  return newReply;
}

export function toggleLikePost(user: User, postId: string): { likes: number; isLiked: boolean } {
  const posts = getForumPosts();
  const post = posts.find(p => p.id === postId);
  if (!post) return { likes: 0, isLiked: false };

  const index = post.likedBy.indexOf(user.id);
  let isLiked = false;
  if (index === -1) {
    post.likedBy.push(user.id);
    post.likes = post.likedBy.length;
    isLiked = true;
  } else {
    post.likedBy.splice(index, 1);
    post.likes = post.likedBy.length;
    isLiked = false;
  }

  saveForumPosts(posts);
  return { likes: post.likes, isLiked };
}
