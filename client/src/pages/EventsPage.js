import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import api from '../config/api';
import toast from 'react-hot-toast';
import { Plus, Edit, Trash2, Eye, Calendar, User, MapPin, Clock, Users, DollarSign, Star } from 'lucide-react';

const EventsPage = () => {
  const { t } = useLanguage();
  const { user, isAdmin, isTeacher } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedType, setSelectedType] = useState('all');
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    type: 'workshop',
    category: 'directing',
    language: 'zh',
    startDate: '',
    endDate: '',
    location: {
      type: 'online',
      address: '',
      city: '',
      country: '',
      venue: '',
      onlinePlatform: '',
      meetingUrl: ''
    },
    banner: '',
    pricing: {
      earlyBird: { price: 0, currency: 'CNY', availableUntil: '' },
      regular: { price: 0, currency: 'CNY' },
      isFree: true
    },
    capacity: { total: 50, reserved: 0 },
    registrationDeadline: '',
    status: 'draft'
  });

  const eventTypes = [
    { value: 'all', label: '全部 / All' },
    { value: 'workshop', label: '工作坊 / Workshop' },
    { value: 'masterclass', label: '大师课 / Masterclass' },
    { value: 'competition', label: '比赛 / Competition' },
    { value: 'festival', label: '电影节 / Festival' },
    { value: 'screening', label: '放映 / Screening' },
    { value: 'networking', label: '交流 / Networking' },
    { value: 'conference', label: '会议 / Conference' },
    { value: 'project-showcase', label: '项目展示 / Project Showcase' }
  ];

  const categories = [
    { value: 'directing', label: '导演 / Directing' },
    { value: 'cinematography', label: '摄影 / Cinematography' },
    { value: 'editing', label: '剪辑 / Editing' },
    { value: 'screenwriting', label: '编剧 / Screenwriting' },
    { value: 'sound-design', label: '音效设计 / Sound Design' },
    { value: 'production-design', label: '美术设计 / Production Design' },
    { value: 'acting', label: '表演 / Acting' },
    { value: 'documentary', label: '纪录片 / Documentary' },
    { value: 'commercial', label: '广告 / Commercial' },
    { value: 'music-video', label: '音乐视频 / Music Video' },
    { value: 'short-film', label: '短片 / Short Film' },
    { value: 'feature-film', label: '长片 / Feature Film' }
  ];

  const statuses = [
    { value: 'draft', label: '草稿 / Draft' },
    { value: 'published', label: '已发布 / Published' },
    { value: 'registration-open', label: '开放报名 / Registration Open' },
    { value: 'completed', label: '已完成 / Completed' },
    { value: 'cancelled', label: '已取消 / Cancelled' }
  ];

  useEffect(() => {
    fetchEvents();
  }, [selectedType]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/api/events${selectedType !== 'all' ? `?type=${selectedType}` : ''}`);
      setEvents(response.data.events || []);
    } catch (error) {
      console.error('Error fetching events:', error);
      toast.error('获取活动失败 / Failed to fetch events');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/events', newEvent);
      toast.success('活动创建成功！ / Event created successfully!');
      setShowCreateForm(false);
      setNewEvent({
        title: '',
        description: '',
        type: 'workshop',
        category: 'directing',
        language: 'zh',
        startDate: '',
        endDate: '',
        location: {
          type: 'online',
          address: '',
          city: '',
          country: '',
          venue: '',
          onlinePlatform: '',
          meetingUrl: ''
        },
        banner: '',
        pricing: {
          earlyBird: { price: 0, currency: 'CNY', availableUntil: '' },
          regular: { price: 0, currency: 'CNY' },
          isFree: true
        },
        capacity: { total: 50, reserved: 0 },
        registrationDeadline: '',
        status: 'draft'
      });
      fetchEvents();
    } catch (error) {
      console.error('Error creating event:', error);
      toast.error(error.response?.data?.message || '创建活动失败 / Failed to create event');
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (!window.confirm('确定要删除这个活动吗？ / Are you sure you want to delete this event?')) {
      return;
    }
    try {
      await api.delete(`/api/events/${eventId}`);
      toast.success('活动删除成功！ / Event deleted successfully!');
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
      toast.error('删除活动失败 / Failed to delete event');
    }
  };

  const handlePublishEvent = async (eventId) => {
    try {
      await api.put(`/api/events/${eventId}`, { status: 'published' });
      toast.success('活动发布成功！ / Event published successfully!');
      fetchEvents();
    } catch (error) {
      console.error('Error publishing event:', error);
      toast.error('发布活动失败 / Failed to publish event');
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

  const isUpcoming = (startDate) => {
    return new Date(startDate) > new Date();
  };

  const isOngoing = (startDate, endDate) => {
    const now = new Date();
    return now >= new Date(startDate) && now <= new Date(endDate);
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
          {t('events.title')}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          即将举行的活动和项目 / Upcoming events and projects
        </p>
      </div>

      {/* Type Filter */}
      <div className="mb-6">
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
        >
          {eventTypes.map(type => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      {/* Create Event Button */}
      {(user && (isAdmin() || isTeacher())) && (
        <div className="mb-6">
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus size={20} />
            {showCreateForm ? '取消 / Cancel' : '创建新活动 / Create New Event'}
          </button>
        </div>
      )}

      {/* Create Event Form */}
      {showCreateForm && (
        <div className="mb-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4">创建新活动 / Create New Event</h3>
          <form onSubmit={handleCreateEvent}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-2">活动标题 / Event Title</label>
                <input
                  type="text"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">活动类型 / Event Type</label>
                <select
                  value={newEvent.type}
                  onChange={(e) => setNewEvent({...newEvent, type: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                >
                  {eventTypes.slice(1).map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-2">分类 / Category</label>
                <select
                  value={newEvent.category}
                  onChange={(e) => setNewEvent({...newEvent, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                >
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">开始日期 / Start Date</label>
                <input
                  type="datetime-local"
                  value={newEvent.startDate}
                  onChange={(e) => setNewEvent({...newEvent, startDate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">结束日期 / End Date</label>
                <input
                  type="datetime-local"
                  value={newEvent.endDate}
                  onChange={(e) => setNewEvent({...newEvent, endDate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-2">容量 / Capacity</label>
                <input
                  type="number"
                  value={newEvent.capacity.total}
                  onChange={(e) => setNewEvent({
                    ...newEvent, 
                    capacity: {...newEvent.capacity, total: parseInt(e.target.value)}
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  min="1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">状态 / Status</label>
                <select
                  value={newEvent.status}
                  onChange={(e) => setNewEvent({...newEvent, status: e.target.value})}
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
              <label className="block text-sm font-medium mb-2">活动描述 / Event Description</label>
              <textarea
                value={newEvent.description}
                onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">横幅图片URL / Banner Image URL</label>
              <input
                type="url"
                value={newEvent.banner}
                onChange={(e) => setNewEvent({...newEvent, banner: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                placeholder="https://example.com/banner.jpg"
              />
            </div>

            <div className="flex gap-2">
              <button type="submit" className="btn-primary">
                创建活动 / Create Event
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

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              暂无活动 / No events yet
            </p>
          </div>
        ) : (
          events.map(event => (
            <div key={event._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              {event.banner && (
                <img 
                  src={event.banner} 
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {event.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
                      <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                        {event.type}
                      </span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        {event.category}
                      </span>
                    </div>
                  </div>
                  {(isAdmin() || (user && user._id === event.organizer?._id)) && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDeleteEvent(event._id)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                        title="删除 / Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                      {event.status === 'draft' && (
                        <button
                          onClick={() => handlePublishEvent(event._id)}
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
                  {event.description}
                </p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Calendar size={14} />
                    <span>{formatDate(event.startDate)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <MapPin size={14} />
                    <span>{event.location.type === 'online' ? '在线 / Online' : event.location.venue || event.location.city}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Users size={14} />
                    <span>{event.registrationCount || 0} / {event.capacity.total} 已报名 / Registered</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <DollarSign size={14} />
                    <span>
                      {event.pricing.isFree ? '免费 / Free' : 
                        `${event.pricing.regular.price} ${event.pricing.regular.currency}`}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      event.status === 'published' ? 'bg-green-100 text-green-800' :
                      event.status === 'registration-open' ? 'bg-blue-100 text-blue-800' :
                      event.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {event.status}
                    </span>
                    {isUpcoming(event.startDate) && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                        即将开始 / Upcoming
                      </span>
                    )}
                    {isOngoing(event.startDate, event.endDate) && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        进行中 / Ongoing
                      </span>
                    )}
                  </div>
                  
                  {event.featured && (
                    <Star size={16} className="text-yellow-500" />
                  )}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button className="btn-primary w-full text-sm">
                    查看详情 / View Details
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EventsPage; 