import React from 'react';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            出错了！Something went wrong!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            抱歉，应用程序遇到了一个错误。Sorry, the application encountered an error.
          </p>
          {error && (
            <details className="mb-4 text-left">
              <summary className="cursor-pointer text-sm text-gray-500 dark:text-gray-400">
                错误详情 / Error Details
              </summary>
              <pre className="mt-2 text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-2 rounded overflow-auto">
                {error.message}
              </pre>
            </details>
          )}
          <button
            onClick={resetErrorBoundary}
            className="btn-primary"
          >
            重试 / Retry
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorFallback; 