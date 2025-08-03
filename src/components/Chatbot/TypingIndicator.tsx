import React from 'react';
import styles from './styles.module.css';

export const TypingIndicator: React.FC = () => {
  return (
    <div className={styles.typingIndicator}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};