import React from 'react';
import { presetQuestions } from './presetQuestions';
import styles from './styles.module.css';

interface QuickActionsProps {
  onQuestionClick: (question: string) => void;
  disabled?: boolean;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ onQuestionClick, disabled = false }) => {
  // Show only first 4 questions as quick actions
  const quickQuestions = presetQuestions.slice(0, 4);
  
  return (
    <div className={styles.quickActionsContainer}>
      <p className={styles.quickActionsTitle}>Quick Questions:</p>
      <div className={styles.quickActionsGrid}>
        {quickQuestions.map((q) => (
          <button
            key={q.id}
            onClick={() => onQuestionClick(q.question)}
            disabled={disabled}
            className={styles.quickActionButton}
            type="button"
          >
            {q.question}
          </button>
        ))}
      </div>
    </div>
  );
};