import React, { useState, useEffect } from 'react';
import { ChatWindow } from './ChatWindow';
import styles from './styles.module.css';

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);

  // Keyboard shortcut to open/close chatbot (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setHasNewMessage(false);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={handleToggle}
        className={`${styles.chatbotTrigger} ${isOpen ? styles.active : ''}`}
        aria-label="Open chat assistant"
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L2.5 21.5l4.5-.838A9.955 9.955 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"></path>
            <circle cx="8.5" cy="12" r="1" fill="currentColor"></circle>
            <circle cx="12" cy="12" r="1" fill="currentColor"></circle>
            <circle cx="15.5" cy="12" r="1" fill="currentColor"></circle>
          </svg>
        )}
        {hasNewMessage && !isOpen && <span className={styles.notificationDot} />}
      </button>

      {/* Chat Window */}
      <ChatWindow isOpen={isOpen} onClose={() => setIsOpen(false)} />

      {/* Tooltip */}
      {!isOpen && (
        <div className={styles.chatbotTooltip}>
          <span>Chat with AI Assistant</span>
          <kbd>⌘K</kbd>
        </div>
      )}

    </>
  );
};