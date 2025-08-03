import React from 'react';
import { Message } from './types';
import styles from './styles.module.css';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';
  
  return (
    <div className={`${styles.chatMessage} ${isUser ? styles.userMessage : styles.assistantMessage}`}>
      <div className={styles.messageContent}>
        <p style={{ margin: 0 }}>{message.content}</p>
      </div>
    </div>
  );
};