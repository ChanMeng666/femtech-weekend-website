import React, { useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import { useLocation } from '@docusaurus/router';
import {
  getConfirmationTitle,
  getConfirmationDescription,
  getConfirmationSuccessTitle,
  getConfirmationSuccessMessage,
  getConfirmationErrorTitle,
  getConfirmationErrorMessage,
  getConfirmationLoadingMessage,
  getConfirmationBackToHome,
} from '../constants/confirm-subscription';

type ConfirmationStatus = 'loading' | 'success' | 'error';

export default function ConfirmSubscriptionPage(): React.ReactNode {
  const [status, setStatus] = useState<ConfirmationStatus>('loading');
  const [errorMessage, setErrorMessage] = useState('');
  const location = useLocation();

  const title = getConfirmationTitle();
  const description = getConfirmationDescription();
  const successTitle = getConfirmationSuccessTitle();
  const successMessage = getConfirmationSuccessMessage();
  const errorTitle = getConfirmationErrorTitle();
  const defaultErrorMessage = getConfirmationErrorMessage();
  const loadingMessage = getConfirmationLoadingMessage();
  const backToHome = getConfirmationBackToHome();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    if (!token) {
      setStatus('error');
      setErrorMessage('Missing confirmation token');
      return;
    }

    // Call the confirmation API
    fetch(`/api/confirm-subscription?token=${encodeURIComponent(token)}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setStatus('success');
        } else {
          setStatus('error');
          setErrorMessage(data.error || defaultErrorMessage);
        }
      })
      .catch(() => {
        setStatus('error');
        setErrorMessage(defaultErrorMessage);
      });
  }, [location.search, defaultErrorMessage]);

  return (
    <Layout title={title} description={description}>
      <div className="min-h-[70vh] flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
          {status === 'loading' && (
            <>
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-300">{loadingMessage}</p>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-500 dark:text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {successTitle}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {successMessage}
              </p>
              <a
                href="/"
                className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors font-medium"
              >
                {backToHome}
              </a>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-red-500 dark:text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {errorTitle}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {errorMessage}
              </p>
              <a
                href="/"
                className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors font-medium"
              >
                {backToHome}
              </a>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
