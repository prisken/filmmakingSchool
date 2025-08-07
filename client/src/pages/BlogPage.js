import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import api from '../config/api';
import toast from 'react-hot-toast';
import { Plus, Edit, Trash2, Eye, Calendar, User, Tag, BookOpen, ThumbsUp, Share2 } from 'lucide-react';

const BlogPage = () => {
  const { t } = useLanguage();
  const { user, isAdmin, isTeacher } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [newPost, setNewPost] = useState({
    title: '',
    subtitle: '',
    content: '',
    excerpt: '',
    category: 'filmmaking-basics',
    language: 'zh',
    featuredImage: '',
    tags: [],
    status: 'draft'
  });

  const categories = [
    { value: 'all', label: '全部 / All' },
    { value: 'filmmaking-basics', label: '电影制作基础 / Filmmaking Basics' },
    { value: 'directing', label: '导演 / Directing' },
    { value: 'cinematography', label: '摄影 / Cinematography' },
    { value: 'editing', label: '剪辑 / Editing' },
    { value: 'screenwriting', label: '编剧 / Screenwriting' },
    { value: 'industry-news', label: '行业动态 / Industry News' },
    { value: 'tutorials', label: '教程 / Tutorials' },
    { value: 'case-studies', label: '案例研究 / Case Studies' }
  ];

  const statuses = [
    { value: 'draft', label: '草稿 / Draft' },
    { value: 'published', label: '已发布 / Published' },
    { value: 'scheduled', label: '已安排 / Scheduled' }
  ];

  useEffect(() => {
    fetchPosts();
  }, [selectedCategory]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/api/blog${selectedCategory !== 'all' ? `?category=${selectedCategory}` : ''}`);
      setPosts(response.data.posts || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast.error('获取博客文章失败 / Failed to fetch blog posts');
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/blog', newPost);
      toast.success('博客文章创建成功！ / Blog post created successfully!');
      setShowCreateForm(false);
      setNewPost({
        title: '',
        subtitle: '',
        content: '',
        excerpt: '',
        category: 'filmmaking-basics',
        language: 'zh',
        featuredImage: '',
        tags: [],
        status: 'draft'
      });
      fetchPosts();
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error(error.response?.data?.message || '创建博客文章失败 / Failed to create blog post');
    }
  };

  const handleDeletePost = async (postId) => {
    if (!window.confirm('确定要删除这篇文章吗？ / Are you sure you want to delete this post?')) {
      return;
    }
    try {
      await api.delete(`/api/blog/${postId}`);
      toast.success('博客文章删除成功！ / Blog post deleted successfully!');
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error('删除博客文章失败 / Failed to delete blog post');
    }
  };

  const handlePublishPost = async (postId) => {
    try {
      await api.put(`/api/blog/${postId}`, { status: 'published' });
      toast.success('博客文章发布成功！ / Blog post published successfully!');
      fetchPosts();
    } catch (error) {
      console.error('Error publishing post:', error);
      toast.error('发布博客文章失败 / Failed to publish blog post');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getReadingTime = (content) => {
    const wordsPerMinute = 200;
    const words = content.split(' ').length;
    return Math.ceil(words / wordsPerMinute);
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
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            博客 / Blog
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            电影制作技巧和行业资讯 / Filmmaking tips and industry news
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
              {showCreateForm ? '取消 / Cancel' : '创建新文章 / Create New Post'}
            </button>
          </div>
        )}

        {/* Create Post Form */}
        {showCreateForm && (
          <div className="mb-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">创建新博客文章 / Create New Blog Post</h3>
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
                  <label className="block text-sm font-medium mb-2">副标题 / Subtitle</label>
                  <input
                    type="text"
                    value={newPost.subtitle}
                    onChange={(e) => setNewPost({...newPost, subtitle: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
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
                <div>
                  <label className="block text-sm font-medium mb-2">语言 / Language</label>
                  <select
                    value={newPost.language}
                    onChange={(e) => setNewPost({...newPost, language: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  >
                    <option value="zh">中文 / Chinese</option>
                    <option value="en">English</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">状态 / Status</label>
                  <select
                    value={newPost.status}
                    onChange={(e) => setNewPost({...newPost, status: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  >
                    {statuses.map(status => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">特色图片URL / Featured Image URL</label>
                <input
                  type="url"
                  value={newPost.featuredImage}
                  onChange={(e) => setNewPost({...newPost, featuredImage: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">摘要 / Excerpt</label>
                <textarea
                  value={newPost.excerpt}
                  onChange={(e) => setNewPost({...newPost, excerpt: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  placeholder="文章摘要..."
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">内容 / Content</label>
                <textarea
                  value={newPost.content}
                  onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                  rows={10}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>

              <div className="flex gap-2">
                <button type="submit" className="btn-primary">
                  创建文章 / Create Post
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

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 dark:text-gray-400">
                暂无博客文章 / No blog posts yet
              </p>
            </div>
          ) : (
            posts.map(post => (
              <div key={post._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                {post.featuredImage && (
                  <img 
                    src={post.featuredImage} 
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                        {post.title}
                      </h3>
                      {post.subtitle && (
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                          {post.subtitle}
                        </p>
                      )}
                    </div>
                    {(isAdmin() || (user && user._id === post.author?._id)) && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDeletePost(post._id)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded"
                          title="删除 / Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                        {post.status === 'draft' && (
                          <button
                            onClick={() => handlePublishPost(post._id)}
                            className="p-1 text-green-600 hover:bg-green-50 rounded"
                            title="发布 / Publish"
                          >
                            <Eye size={16} />
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
                    {post.excerpt || post.content.substring(0, 150)}...
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <User size={14} />
                        {post.author?.name || 'Unknown'}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {formatDate(post.createdAt)}
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen size={14} />
                        {getReadingTime(post.content)} min read
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1 text-gray-600">
                        <Eye size={14} />
                        {post.views || 0}
                      </span>
                      <span className="flex items-center gap-1 text-gray-600">
                        <ThumbsUp size={14} />
                        {post.likes?.length || 0}
                      </span>
                    </div>
                    
                    <div className="flex gap-2">
                      <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                        {post.status}
                      </span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button className="btn-primary w-full text-sm">
                      阅读全文 / Read More
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPage; 