import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const EventsPage = () => {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {t('events.title')}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          即将举行的活动和项目 / Upcoming events and projects
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="card p-6">
          <h3 className="text-xl font-semibold mb-2">电影制作工作坊</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            参加我们的电影制作工作坊，提升您的技能。
          </p>
          <button className="btn-primary">报名参加</button>
        </div>
      </div>
    </div>
  );
};

export default EventsPage; 