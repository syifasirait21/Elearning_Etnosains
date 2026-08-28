import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  MessageSquare, 
  Send, 
  Plus, 
  Users, 
  Sparkles, 
  Heart,
  MessageCircle,
  ShieldCheck,
  GraduationCap,
  Trees,
  Mountain,
  Droplets,
  Home,
  CheckCircle2
} from 'lucide-react';
import { User, PageId } from '../types';
import { 
  FORUM_TOPICS, 
  ForumPost, 
  ForumTopic, 
  getForumPosts, 
  addForumPost, 
  addForumReply, 
  toggleLikePost 
} from '../lib/forumData';

interface ForumDiskusiModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  currentPage: PageId;
}

export const ForumDiskusiModal: React.FC<ForumDiskusiModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  currentPage,
}) => {
  const [topics] = useState<ForumTopic[]>(FORUM_TOPICS);
  const [selectedTopicId, setSelectedTopicId] = useState<string>('umum');
  const [posts, setPosts] = useState<ForumPost[]>([]);
  
  // New Post Form
  const [isCreatingPost, setIsCreatingPost] = useState<boolean>(false);
  const [newPostContent, setNewPostContent] = useState<string>('');
  
  // Replying Form State
  const [activeReplyingPostId, setActiveReplyingPostId] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState<string>('');

  const [notification, setNotification] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load posts on open or changes
  useEffect(() => {
    if (isOpen) {
      setPosts(getForumPosts());
    }
  }, [isOpen]);

  const activeTopic = topics.find(t => t.id === selectedTopicId) || topics[0];
  const filteredPosts = posts.filter(p => p.topicId === selectedTopicId);

  const getTopicIcon = (iconName: string) => {
    switch (iconName) {
      case 'Trees': return <Trees className="w-4 h-4 text-emerald-600" />;
      case 'Mountain': return <Mountain className="w-4 h-4 text-amber-600" />;
      case 'Droplets': return <Droplets className="w-4 h-4 text-sky-600" />;
      case 'Home': return <Home className="w-4 h-4 text-teal-600" />;
      default: return <MessageSquare className="w-4 h-4 text-emerald-600" />;
    }
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    addForumPost(currentUser, selectedTopicId, newPostContent);
    setPosts(getForumPosts());
    setNewPostContent('');
    setIsCreatingPost(false);
    showNotice('Pertanyaan/topik diskusi berhasil dikirim!');
  };

  const handleSendReply = (postId: string) => {
    if (!replyContent.trim()) return;

    addForumReply(currentUser, postId, replyContent);
    setPosts(getForumPosts());
    setReplyContent('');
    setActiveReplyingPostId(null);
    showNotice('Tanggapan berhasil dikirim!');
  };

  const handleLike = (postId: string) => {
    toggleLikePost(currentUser, postId);
    setPosts(getForumPosts());
  };

  const showNotice = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 2500);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 lg:p-6"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-5xl h-[92vh] md:h-[86vh] max-h-[880px] flex flex-col md:flex-row overflow-hidden animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Sidebar: Topics & Channels */}
        <div className="w-full md:w-80 bg-slate-50 border-r border-slate-200 flex flex-col shrink-0">
          {/* Header Left */}
          <div className="p-4 bg-gradient-to-r from-emerald-900 to-teal-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-amber-300">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-white">Forum Diskusi Kelas</h3>
                <p className="text-[10px] text-emerald-200">E-Learning Biologi Etnosains</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="md:hidden text-white/80 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Active User Badge in Forum */}
          <div className="p-3 bg-emerald-50/80 border-b border-emerald-100 flex items-center gap-2.5">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
              currentUser.role === 'guru' ? 'bg-amber-600 text-white' : 'bg-emerald-700 text-white'
            }`}>
              {currentUser.nama.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-slate-800 truncate">{currentUser.nama}</div>
              <div className="text-[10px] text-slate-500 flex items-center gap-1">
                {currentUser.role === 'guru' ? (
                  <span className="text-amber-700 font-semibold flex items-center gap-0.5">
                    <ShieldCheck className="w-3 h-3" /> Pendidik Biologi
                  </span>
                ) : (
                  <span className="text-emerald-700 font-semibold flex items-center gap-0.5">
                    <GraduationCap className="w-3 h-3" /> {currentUser.kelas || 'Peserta Didik'}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Channel list */}
          <div className="p-3 font-bold text-[11px] text-slate-500 uppercase tracking-wider">
            Kategori Pembahasan
          </div>
          <div className="flex-1 overflow-y-auto px-2 pb-3 space-y-1">
            {topics.map((t) => {
              const isActive = t.id === selectedTopicId;
              const count = posts.filter(p => p.topicId === t.id).length;
              return (
                <button
                  key={t.id}
                  onClick={() => {
                    setSelectedTopicId(t.id);
                    setIsCreatingPost(false);
                    setActiveReplyingPostId(null);
                  }}
                  className={`w-full text-left p-2.5 rounded-xl text-xs font-medium transition-all flex items-start gap-2.5 ${
                    isActive 
                      ? 'bg-emerald-700 text-white font-bold shadow-xs' 
                      : 'hover:bg-slate-200/70 text-slate-700'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {getTopicIcon(t.iconName)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`truncate ${isActive ? 'text-white' : 'text-slate-800'}`}>
                      {t.title.replace(/^[^a-zA-Z0-9]+/, '')}
                    </div>
                    <div className={`text-[10px] truncate ${isActive ? 'text-emerald-100' : 'text-slate-400'}`}>
                      {count} kiriman diskusi
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Main Content: Feed & Discussion Area */}
        <div className="flex-1 flex flex-col bg-white min-w-0">
          {/* Top Bar on Right */}
          <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
            <div className="min-w-0">
              <h4 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2 truncate">
                <span>{activeTopic.title}</span>
              </h4>
              <p className="text-xs text-slate-500 truncate mt-0.5">{activeTopic.description}</p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                id="btn-tulis-diskusi"
                onClick={() => setIsCreatingPost(!isCreatingPost)}
                className="px-3 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Tanya / Tulis Topik</span>
              </button>
              <button
                onClick={onClose}
                className="hidden md:flex p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors"
                title="Tutup Forum"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Toast Notification */}
          {notification && (
            <div className="bg-emerald-100 text-emerald-800 px-4 py-2 text-xs font-bold text-center flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
              {notification}
            </div>
          )}

          {/* New Post Form Drawer */}
          {isCreatingPost && (
            <form onSubmit={handleCreatePost} className="p-4 bg-emerald-50/60 border-b border-emerald-100 animate-slide-in">
              <div className="text-xs font-bold text-emerald-950 mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                Kirim Pertanyaan atau Analisis Diskusi Baru:
              </div>
              <textarea
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                placeholder="Tuliskan pertanyaan konsep, sanggahan, atau ide kearifan lokal terkait topik ini..."
                rows={3}
                required
                className="w-full p-3 text-xs sm:text-sm bg-white rounded-xl border border-emerald-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 resize-none"
              />
              <div className="flex items-center justify-end gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setIsCreatingPost(false)}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-100 text-xs font-medium"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  Kirim ke Forum
                </button>
              </div>
            </form>
          )}

          {/* Posts Feed */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/30">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-12 px-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto mb-3">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <h5 className="font-bold text-slate-800 text-sm">Belum ada diskusi di kategori ini</h5>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Jadilah yang pertama mengajukan pertanyaan atau membagikan pemikiran tentang topik ini!
                </p>
                <button
                  onClick={() => setIsCreatingPost(true)}
                  className="mt-3 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl inline-flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" /> Mulai Diskusi
                </button>
              </div>
            ) : (
              filteredPosts.map((post) => {
                const isLikedByMe = post.likedBy.includes(currentUser.id);
                return (
                  <div 
                    key={post.id} 
                    className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 sm:p-5 space-y-3"
                  >
                    {/* Post Author Info */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs ${
                          post.authorRole === 'guru' 
                            ? 'bg-amber-100 text-amber-900 border border-amber-300' 
                            : 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                        }`}>
                          {post.authorName.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-1.5">
                            <span>{post.authorName}</span>
                            {post.authorRole === 'guru' && (
                              <span className="bg-amber-100 text-amber-800 text-[9px] px-1.5 py-0.2 rounded font-extrabold border border-amber-200">
                                PENDIDIK
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-slate-500">
                            {post.authorSubtitle} • {post.createdAt}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Post Content */}
                    <div className="text-xs sm:text-sm text-slate-800 leading-relaxed pl-1">
                      {post.content}
                    </div>

                    {/* Post Actions */}
                    <div className="flex items-center gap-3 pt-2 border-t border-slate-100 text-xs text-slate-600">
                      <button
                        onClick={() => handleLike(post.id)}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-colors ${
                          isLikedByMe 
                            ? 'text-rose-600 bg-rose-50 font-bold' 
                            : 'hover:bg-slate-100 text-slate-600'
                        }`}
                      >
                        <Heart className={`w-3.5 h-3.5 ${isLikedByMe ? 'fill-rose-600 text-rose-600' : ''}`} />
                        <span>{post.likes} Apresiasi</span>
                      </button>

                      <button
                        onClick={() => setActiveReplyingPostId(activeReplyingPostId === post.id ? null : post.id)}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg hover:bg-slate-100 transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-700" />
                        <span>{post.replies.length} Tanggapan</span>
                      </button>
                    </div>

                    {/* Replies Thread */}
                    {post.replies.length > 0 && (
                      <div className="mt-3 pl-3 sm:pl-4 space-y-2 border-l-2 border-emerald-200 bg-slate-50/50 p-2.5 rounded-r-xl">
                        {post.replies.map((rep) => (
                          <div key={rep.id} className="text-xs space-y-1">
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-slate-800 text-[11px]">{rep.authorName}</span>
                              {rep.authorRole === 'guru' && (
                                <span className="bg-amber-100 text-amber-800 text-[8px] px-1 py-0.2 rounded font-extrabold">
                                  GURU
                                </span>
                              )}
                              <span className="text-[10px] text-slate-400">• {rep.createdAt}</span>
                            </div>
                            <p className="text-slate-700 text-xs leading-relaxed">{rep.content}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Reply Input Form */}
                    {activeReplyingPostId === post.id && (
                      <div className="mt-3 pt-2 border-t border-slate-100 flex items-center gap-2">
                        <input
                          type="text"
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleSendReply(post.id);
                            }
                          }}
                          placeholder={`Tanggapi sebagai ${currentUser.nama}...`}
                          className="flex-1 px-3 py-2 text-xs bg-slate-50 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                        />
                        <button
                          onClick={() => handleSendReply(post.id)}
                          disabled={!replyContent.trim()}
                          className="p-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl disabled:opacity-40 transition-colors"
                          title="Kirim Balasan"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>
    </div>
  );
};
