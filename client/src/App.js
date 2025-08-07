import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';
import { ErrorBoundary } from 'react-error-boundary';

// Components
import Layout from './components/Layout/Layout';
import LoadingSpinner from './components/UI/LoadingSpinner';
import ErrorFallback from './components/UI/ErrorFallback';

// Pages
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import DashboardPage from './pages/DashboardPage';
import ForumPage from './pages/ForumPage';
import BlogPage from './pages/BlogPage';
import EventsPage from './pages/EventsPage';
import NotFoundPage from './pages/NotFoundPage';

// Contexts
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';

// Hooks
import useAuth from './hooks/useAuth';

// Styles
import './styles/globals.css';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <LoginPage />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <NotFoundPage />;
  }

  return children;
};

// Admin Route Component
const AdminRoute = ({ children }) => (
  <ProtectedRoute allowedRoles={['admin']}>
    {children}
  </ProtectedRoute>
);

// Teacher Route Component
const TeacherRoute = ({ children }) => (
  <ProtectedRoute allowedRoles={['teacher', 'admin']}>
    {children}
  </ProtectedRoute>
);

// Simple Test Component
const TestComponent = () => (
  <div className="min-h-screen bg-red-500 flex items-center justify-center">
    <div className="text-white text-4xl font-bold">
      🎬 测试页面 - 路由工作正常 / Test Page - Routing Works!
    </div>
  </div>
);

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <LanguageProvider>
              <AuthProvider>
                <Router>
                  <div className="App min-h-screen bg-gray-50 dark:bg-gray-900">
                    <Suspense fallback={<LoadingSpinner />}>
                      <Routes>
                        {/* Test Route - Direct rendering */}
                        <Route path="/test" element={<TestComponent />} />
                        
                        {/* All other routes with Layout */}
                        <Route path="/" element={<Layout />}>
                          <Route index element={<HomePage />} />
                          <Route path="courses" element={<CoursesPage />} />
                          <Route path="courses/:slug" element={<CourseDetailPage />} />
                          <Route path="forum" element={<ForumPage />} />
                          <Route path="blog" element={<BlogPage />} />
                          <Route path="events" element={<EventsPage />} />
                          <Route path="login" element={<LoginPage />} />
                          <Route path="register" element={<RegisterPage />} />
                          
                          {/* Protected Routes */}
                          <Route 
                            path="dashboard" 
                            element={
                              <ProtectedRoute>
                                <DashboardPage />
                              </ProtectedRoute>
                            } 
                          />
                          <Route 
                            path="profile" 
                            element={
                              <ProtectedRoute>
                                <ProfilePage />
                              </ProtectedRoute>
                            } 
                          />
                          
                          {/* Admin Routes */}
                          <Route 
                            path="admin/*" 
                            element={
                              <AdminRoute>
                                <DashboardPage />
                              </AdminRoute>
                            } 
                          />
                          
                          {/* Teacher Routes */}
                          <Route 
                            path="teacher/*" 
                            element={
                              <TeacherRoute>
                                <div>Teacher Dashboard (Coming Soon)</div>
                              </TeacherRoute>
                            } 
                          />
                          
                          {/* 404 Route */}
                          <Route path="*" element={<NotFoundPage />} />
                        </Route>
                      </Routes>
                    </Suspense>
                    
                    {/* Toast Notifications */}
                    <Toaster
                      position="top-right"
                      toastOptions={{
                        duration: 4000,
                        style: {
                          background: '#363636',
                          color: '#fff',
                        },
                        success: {
                          duration: 3000,
                          iconTheme: {
                            primary: '#10B981',
                            secondary: '#fff',
                          },
                        },
                        error: {
                          duration: 5000,
                          iconTheme: {
                            primary: '#EF4444',
                            secondary: '#fff',
                          },
                        },
                      }}
                    />
                  </div>
                </Router>
              </AuthProvider>
            </LanguageProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App; 