import React, { useState } from 'react';
import { cn } from '../../lib/utils';
import { Button } from './button';
import {
  getNewsletterPlaceholder,
  getNewsletterButtonText,
  getNewsletterLoadingText,
  getNewsletterSuccessMessage,
  getNewsletterErrorMessage,
  getNewsletterInvalidEmailMessage,
} from '../../constants/newsletter';

interface NewsletterSubscribeProps {
  variant?: 'dark' | 'light';
  className?: string;
}

type SubscribeStatus = 'idle' | 'loading' | 'success' | 'error';

export function NewsletterSubscribe({
  variant = 'dark',
  className
}: NewsletterSubscribeProps): React.ReactNode {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<SubscribeStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const placeholder = getNewsletterPlaceholder();
  const buttonText = getNewsletterButtonText();
  const loadingText = getNewsletterLoadingText();
  const successMessage = getNewsletterSuccessMessage();
  const defaultErrorMessage = getNewsletterErrorMessage();
  const invalidEmailMessage = getNewsletterInvalidEmailMessage();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email
    if (!email.trim()) {
      setStatus('error');
      setErrorMessage(invalidEmailMessage);
      return;
    }

    if (!validateEmail(email)) {
      setStatus('error');
      setErrorMessage(invalidEmailMessage);
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/subscribe-newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await response.json();

      // Debug: log full response to console
      console.log('[Newsletter] API Response:', JSON.stringify(data, null, 2));

      if (response.ok && data.success) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
        setErrorMessage(data.error || defaultErrorMessage);
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage(defaultErrorMessage);
    }
  };

  const isDark = variant === 'dark';

  return (
    <div className={cn('w-full max-w-md mx-auto', className)}>
      {status === 'success' ? (
        <div
          className={cn(
            'p-4 rounded-lg text-center',
            isDark
              ? 'bg-primary-foreground/10 text-primary-foreground'
              : 'bg-green-50 text-green-800'
          )}
        >
          <svg
            className={cn(
              'w-6 h-6 mx-auto mb-2',
              isDark ? 'text-primary-foreground' : 'text-green-500'
            )}
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
          <p className="text-sm">{successMessage}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === 'error') {
                  setStatus('idle');
                  setErrorMessage('');
                }
              }}
              placeholder={placeholder}
              disabled={status === 'loading'}
              className={cn(
                'flex-1 px-4 py-2.5 rounded-md text-sm transition-colors',
                'focus:outline-none focus:ring-2',
                isDark
                  ? 'bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/50 border border-primary-foreground/20 focus:ring-primary-foreground/30 focus:border-primary-foreground/40'
                  : 'bg-white text-foreground placeholder:text-muted-foreground border border-input focus:ring-primary/30 focus:border-primary',
                status === 'loading' && 'opacity-50 cursor-not-allowed'
              )}
              aria-label={placeholder}
            />
            <Button
              type="submit"
              disabled={status === 'loading'}
              className={cn(
                'whitespace-nowrap',
                isDark
                  ? 'bg-primary-foreground text-primary hover:bg-primary-foreground/90'
                  : 'bg-primary text-primary-foreground hover:bg-primary-dark'
              )}
            >
              {status === 'loading' ? loadingText : buttonText}
            </Button>
          </div>

          {status === 'error' && errorMessage && (
            <p
              className={cn(
                'text-sm text-center',
                isDark ? 'text-red-300' : 'text-red-500'
              )}
            >
              {errorMessage}
            </p>
          )}
        </form>
      )}
    </div>
  );
}
