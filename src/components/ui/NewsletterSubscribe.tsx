import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../lib/utils';
import { Button } from './button';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {
  getNewsletterPlaceholder,
  getNewsletterButtonText,
  getNewsletterLoadingText,
  getNewsletterSuccessMessage,
  getNewsletterErrorMessage,
  getNewsletterInvalidEmailMessage,
} from '../../constants/newsletter';

// Turnstile types
declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: {
        sitekey: string;
        theme?: 'light' | 'dark' | 'auto';
        callback?: (token: string) => void;
        'expired-callback'?: () => void;
        'error-callback'?: () => void;
      }) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

interface NewsletterSubscribeProps {
  variant?: 'dark' | 'light';
  className?: string;
}

type SubscribeStatus = 'idle' | 'loading' | 'success' | 'error';

export function NewsletterSubscribe({
  variant = 'dark',
  className
}: NewsletterSubscribeProps): React.ReactNode {
  const { siteConfig } = useDocusaurusContext();
  const turnstileSiteKey = (siteConfig.customFields?.turnstileSiteKey as string) || '';

  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState(''); // Hidden field for bot detection
  const [status, setStatus] = useState<SubscribeStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  // Turnstile refs
  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  const placeholder = getNewsletterPlaceholder();
  const buttonText = getNewsletterButtonText();
  const loadingText = getNewsletterLoadingText();
  const successMessage = getNewsletterSuccessMessage();
  const defaultErrorMessage = getNewsletterErrorMessage();
  const invalidEmailMessage = getNewsletterInvalidEmailMessage();

  // Initialize Turnstile when site key is available
  useEffect(() => {
    if (!turnstileSiteKey || !turnstileRef.current) return;

    // Load Turnstile script if not already loaded
    const loadScript = () => {
      return new Promise<void>((resolve) => {
        if (window.turnstile) {
          resolve();
          return;
        }

        const script = document.createElement('script');
        script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
        script.async = true;
        script.onload = () => resolve();
        document.head.appendChild(script);
      });
    };

    loadScript().then(() => {
      if (window.turnstile && turnstileRef.current && !widgetIdRef.current) {
        widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
          sitekey: turnstileSiteKey,
          theme: variant === 'dark' ? 'dark' : 'light',
          callback: (token: string) => setTurnstileToken(token),
          'expired-callback': () => setTurnstileToken(null),
          'error-callback': () => setTurnstileToken(null),
        });
      }
    });

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [turnstileSiteKey, variant]);

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

    // Check Turnstile if configured
    if (turnstileSiteKey && !turnstileToken) {
      setStatus('error');
      setErrorMessage('Please complete the security verification');
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
        body: JSON.stringify({
          email: email.trim(),
          website: honeypot, // Honeypot field - bots will fill this
          turnstileToken: turnstileToken, // Turnstile verification token
        }),
      });

      const data = await response.json();

      // Debug: log full response to console
      console.log('[Newsletter] API Response:', JSON.stringify(data, null, 2));

      if (response.ok && data.success) {
        setStatus('success');
        setEmail('');
        // Reset Turnstile widget
        if (widgetIdRef.current && window.turnstile) {
          window.turnstile.reset(widgetIdRef.current);
          setTurnstileToken(null);
        }
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
          {/* Honeypot field - hidden from users, bots will fill it */}
          <input
            type="text"
            name="website"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            style={{
              position: 'absolute',
              left: '-9999px',
              width: '1px',
              height: '1px',
              opacity: 0,
              pointerEvents: 'none',
            }}
            aria-hidden="true"
          />
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

          {/* Turnstile widget - only shown when configured */}
          {turnstileSiteKey && (
            <div
              ref={turnstileRef}
              className="flex justify-center mt-2"
            />
          )}

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
