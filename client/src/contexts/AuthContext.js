import React, { createContext, useContext, useReducer, useEffect } from 'react';
import api from '../config/api';
import toast from 'react-hot-toast';

const AuthContext = createContext();

// Action types
const AUTH_ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_USER: 'SET_USER',
  SET_TOKEN: 'SET_TOKEN',
  LOGOUT: 'LOGOUT',
  UPDATE_USER: 'UPDATE_USER',
  CLEAR_ERROR: 'CLEAR_ERROR',
  SET_ERROR: 'SET_ERROR'
};

// Initial state
const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  loading: true,
  error: null
};

// Reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };
    
    case AUTH_ACTIONS.SET_USER:
      return { 
        ...state, 
        user: action.payload.user, 
        token: action.payload.token,
        loading: false,
        error: null 
      };
    
    case AUTH_ACTIONS.SET_TOKEN:
      return { ...state, token: action.payload };
    
    case AUTH_ACTIONS.UPDATE_USER:
      return { ...state, user: { ...state.user, ...action.payload } };
    
    case AUTH_ACTIONS.LOGOUT:
      return { 
        ...state, 
        user: null, 
        token: null, 
        loading: false,
        error: null 
      };
    
    case AUTH_ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    
    case AUTH_ACTIONS.CLEAR_ERROR:
      return { ...state, error: null };
    
    default:
      return state;
  }
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Set up api defaults
  useEffect(() => {
    if (state.token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;
    } else {
      delete api.defaults.headers.common['Authorization'];
    }
  }, [state.token]);

  // Check if user is authenticated on mount
  useEffect(() => {
    const checkAuth = async () => {
      if (state.token) {
        try {
          const response = await api.get('/api/auth/me');
          dispatch({
            type: AUTH_ACTIONS.SET_USER,
            payload: { user: response.data.user, token: state.token }
          });
        } catch (error) {
          console.error('Auth check failed:', error);
          logout();
        }
      } else {
        dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });
      
      const response = await api.post('/api/auth/login', {
        email,
        password
      });

      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      dispatch({
        type: AUTH_ACTIONS.SET_USER,
        payload: { user, token }
      });

      toast.success('登录成功！');
      
      // Redirect to appropriate dashboard based on user role
      if (user.role === 'admin') {
        window.location.href = '/dashboard';
      } else if (user.role === 'teacher') {
        window.location.href = '/dashboard';
      } else if (user.role === 'student') {
        window.location.href = '/dashboard';
      }
      
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || '登录失败，请重试';
      dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: message });
      toast.error(message);
      return { success: false, error: message };
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });
      
      const response = await api.post('/api/auth/register', userData);
      
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      dispatch({
        type: AUTH_ACTIONS.SET_USER,
        payload: { user, token }
      });

      toast.success('注册成功！');
      
      // Redirect to dashboard after successful registration
      window.location.href = '/dashboard';
      
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || '注册失败，请重试';
      dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: message });
      toast.error(message);
      return { success: false, error: message };
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    dispatch({ type: AUTH_ACTIONS.LOGOUT });
    toast.success('已退出登录');
  };

  // Update user profile
  const updateProfile = async (userData) => {
    try {
      const response = await api.put('/api/users/profile', userData);
      dispatch({
        type: AUTH_ACTIONS.UPDATE_USER,
        payload: response.data.user
      });
      toast.success('个人资料更新成功！');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || '更新失败，请重试';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  // Refresh token
  const refreshToken = async () => {
    try {
      const response = await api.post('/api/auth/refresh');
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      dispatch({
        type: AUTH_ACTIONS.SET_USER,
        payload: { user, token }
      });
      
      return { success: true };
    } catch (error) {
      console.error('Token refresh failed:', error);
      logout();
      return { success: false };
    }
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
  };

  // Check if user has specific role
  const hasRole = (role) => {
    return state.user?.role === role;
  };

  // Check if user has any of the specified roles
  const hasAnyRole = (roles) => {
    return roles.includes(state.user?.role);
  };

  // Check if user is admin
  const isAdmin = () => hasRole('admin');

  // Check if user is teacher
  const isTeacher = () => hasRole('teacher') || hasRole('admin');

  // Check if user is student
  const isStudent = () => hasRole('student') || hasRole('teacher') || hasRole('admin');

  const value = {
    // State
    user: state.user,
    token: state.token,
    loading: state.loading,
    error: state.error,
    isAuthenticated: !!state.user,
    
    // Actions
    login,
    register,
    logout,
    updateProfile,
    refreshToken,
    clearError,
    
    // Role checks
    hasRole,
    hasAnyRole,
    isAdmin,
    isTeacher,
    isStudent
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext; 