import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const BlogPage = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            博客 / Blog
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            电影制作技巧和行业资讯 / Filmmaking tips and industry news
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              电影制作技巧
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              学习专业的电影制作技巧和最佳实践，提升您的创作能力。
            </p>
            <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
              阅读更多
            </button>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              行业动态
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              了解最新的电影行业动态和技术发展趋势。
            </p>
            <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
              阅读更多
            </button>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              成功案例
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              查看我们学生的成功作品和项目案例分享。
            </p>
            <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
              阅读更多
            </button>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            更多精彩内容即将推出... / More exciting content coming soon...
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogPage; 