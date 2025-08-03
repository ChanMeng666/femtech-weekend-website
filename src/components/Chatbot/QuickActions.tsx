import React, { useState } from 'react';
import { presetQuestions } from './presetQuestions';
import styles from './styles.module.css';

interface QuickActionsProps {
  onQuestionClick: (question: string) => void;
  disabled?: boolean;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ onQuestionClick, disabled = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className={styles.quickActionsContainer}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={styles.quickActionsToggle}
        type="button"
        aria-label={isExpanded ? 'Hide quick questions' : 'Show quick questions'}
      >
        <span className={styles.toggleText}>
          Quick Questions ({presetQuestions.length})
        </span>
        <svg 
          width="16" 
          height="16" 
          viewBox="0 0 16 16" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
          className={styles.toggleIcon}
          style={{
            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        >
          <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      
      {isExpanded && (
        <div className={styles.quickActionsContent}>
          <div className={styles.quickActionsGrid}>
            {presetQuestions.map((q) => (
              <button
                key={q.id}
                onClick={() => {
                  onQuestionClick(q.question);
                  setIsExpanded(false); // Auto-collapse after selection
                }}
                disabled={disabled}
                className={styles.quickActionButton}
                type="button"
                title={q.question}
              >
                <span className={styles.questionText}>{q.question}</span>
                <span className={styles.questionCategory}>{q.category}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};