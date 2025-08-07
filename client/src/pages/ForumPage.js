import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const ForumPage = () => {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {t('forum.title')}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          与其他电影制作人交流讨论 / Discuss with other filmmakers
        </p>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <div className="card p-6 mb-6">
          <h3 className="text-xl font-semibold mb-2">电影制作讨论</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            分享您的想法和经验，与其他学习者交流。
          </p>
          <button className="btn-primary">参与讨论</button>
        </div>
      </div>
    </div>
  );
};

export default ForumPage; 