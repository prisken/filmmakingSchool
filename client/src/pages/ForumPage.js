import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import api from '../config/api';
import toast from 'react-hot-toast';
import { Plus, MessageSquare, ThumbsUp, ThumbsDown, Edit, Trash2, Eye, Calendar, User } from 'lucide-react';

const ForumPage = () => {
  const { t } = useLanguage();
  const { user, isAdmin, isTeacher } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: 'general',
    type: 'discussion',
    tags: []
  });

  const categories = [
    { value: 'all', label: '全部 / All' },
    { value: 'general', label: '一般讨论 / General' },
    { value: 'directing', label: '导演 / Directing' },
    { value: 'cinematography', label: '摄影 / Cinematography' },
    { value: 'editing', label: '剪辑 / Editing' },
    { value: 'screenwriting', label: '编剧 / Screenwriting' },
    { value: 'project-pitch', label: '项目提案 / Project Pitch' },
    { value: 'collaboration', label: '合作机会 / Collaboration' }
  ];

  const postTypes = [
    { value: 'discussion', label: '讨论 / Discussion' },
    { value: 'question', label: '问题 / Question' },
    { value: 'project-pitch', label: '项目提案 / Project Pitch' },
    { value: 'collaboration', label: '合作 / Collaboration' },
    { value: 'announcement', label: '公告 / Announcement' }
  ];

  useEffect(() => {
    fetchPosts();
  }, [selectedCategory]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/api/forum${selectedCategory !== 'all' ? `?category=${selectedCategory}` : ''}`);
      setPosts(response.data.posts || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast.error('获取帖子失败 / Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/forum', newPost);
      toast.success('帖子创建成功！ / Post created successfully!');
      setShowCreateForm(false);
      setNewPost({ title: '', content: '', category: 'general', type: 'discussion', tags: [] });
      fetchPosts();
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error(error.response?.data?.message || '创建帖子失败 / Failed to create post');
    }
  };

  const handleDeletePost = async (postId) => {
    if (!window.confirm('确定要删除这个帖子吗？ / Are you sure you want to delete this post?')) {
      return;
    }
    try {
      await api.delete(`/api/forum/${postId}`);
      toast.success('帖子删除成功！ / Post deleted successfully!');
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error('删除帖子失败 / Failed to delete post');
    }
  };

  const handleLike = async (postId) => {
    try {
      await api.post(`/api/forum/${postId}/like`);
      fetchPosts();
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">加载中... / Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {t('forum.title')}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          与其他电影制作人交流讨论 / Discuss with other filmmakers
        </p>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
        >
          {categories.map(category => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
      </div>

      {/* Create Post Button */}
      {(user && (isAdmin() || isTeacher())) && (
        <div className="mb-6">
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus size={20} />
            {showCreateForm ? '取消 / Cancel' : '创建新帖子 / Create New Post'}
          </button>
        </div>
      )}

      {/* Create Post Form */}
      {showCreateForm && (
        <div className="mb-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4">创建新帖子 / Create New Post</h3>
          <form onSubmit={handleCreatePost}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-2">标题 / Title</label>
                <input
                  type="text"
                  value={newPost.title}
                  onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">类型 / Type</label>
                <select
                  value={newPost.type}
                  onChange={(e) => setNewPost({...newPost, type: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                >
                  {postTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">分类 / Category</label>
              <select
                value={newPost.category}
                onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
              >
                {categories.slice(1).map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">内容 / Content</label>
              <textarea
                value={newPost.content}
                onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                required
              />
            </div>
            <div className="flex gap-2">
              <button type="submit" className="btn-primary">
                发布帖子 / Publish Post
              </button>
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="btn-secondary"
              >
                取消 / Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Posts List */}
      <div className="space-y-6">
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <MessageSquare size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              暂无帖子 / No posts yet
            </p>
          </div>
        ) : (
          posts.map(post => (
            <div key={post._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <User size={16} />
                      {post.author?.name || 'Unknown'}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={16} />
                      {formatDate(post.createdAt)}
                    </span>
                    <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                      {post.type}
                    </span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                      {post.category}
                    </span>
                  </div>
                </div>
                {(isAdmin() || (user && user._id === post.author?._id)) && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDeletePost(post._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      title="删除 / Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
                {post.content}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleLike(post._id)}
                    className="flex items-center gap-1 text-gray-600 hover:text-red-600"
                  >
                    <ThumbsUp size={16} />
                    <span>{post.likes?.length || 0}</span>
                  </button>
                  <span className="flex items-center gap-1 text-gray-600">
                    <MessageSquare size={16} />
                    <span>{post.comments?.length || 0}</span>
                  </span>
                </div>
                
                <button className="btn-primary text-sm">
                  查看详情 / View Details
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ForumPage; 