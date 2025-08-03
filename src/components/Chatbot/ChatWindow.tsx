import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from './ChatMessage';
import { TypingIndicator } from './TypingIndicator';
import { QuickActions } from './QuickActions';
import { Message } from './types';
import { presetQuestions } from './presetQuestions';
import styles from './styles.module.css';

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Welcome to FemTech Weekend! 👋 I'm here to help you learn about China's first women's health technology innovation platform. How can I assist you today?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when window opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Load messages from localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem('femtech-chatbot-messages');
    if (savedMessages) {
      try {
        const parsed = JSON.parse(savedMessages);
        setMessages(parsed.map((m: any) => ({
          ...m,
          timestamp: new Date(m.timestamp)
        })));
      } catch (e) {
        console.error('Failed to load chat history:', e);
      }
    }
  }, []);

  // Save messages to localStorage
  useEffect(() => {
    if (messages.length > 1) {
      const toSave = messages.slice(-50); // Keep only last 50 messages
      localStorage.setItem('femtech-chatbot-messages', JSON.stringify(toSave));
    }
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setError(null);

    // Check if it's a preset question
    const preset = presetQuestions.find(q => q.question === content.trim());
    if (preset && preset.answer) {
      setTimeout(() => {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: preset.answer,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, assistantMessage]);
      }, 500);
      return;
    }

    // Call API for non-preset questions
    setIsLoading(true);
    
    try {
      console.log('[Chat] Sending request to API...');
      
      // Filter out the welcome message before sending to API
      const messagesToSend = [...messages, userMessage].filter((m, index) => {
        // Skip the welcome message (first assistant message)
        if (index === 0 && m.role === 'assistant') {
          return false;
        }
        return true;
      });
      
      const requestBody = {
        messages: messagesToSend.map(m => ({
          role: m.role,
          content: m.content
        })),
        stream: true
      };
      console.log('[Chat] Request body:', requestBody);
      
      const response = await fetch('/api/chat-stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      console.log('[Chat] Response status:', response.status);
      console.log('[Chat] Response headers:', response.headers);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('[Chat] Error response:', errorData);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message || 'Unknown error'}`);
      }

      // Handle streaming response
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      
      let assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      
      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          const chunk = decoder.decode(value);
          const lines = chunk.split('\n');
          
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const data = JSON.parse(line.slice(6));
                if (data.type === 'chunk' && data.content) {
                  assistantMessage.content += data.content;
                  setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1] = { ...assistantMessage };
                    return newMessages;
                  });
                }
              } catch (e) {
                // Ignore parsing errors for incomplete chunks
              }
            }
          }
        }
      }
    } catch (err) {
      console.error('Chat error:', err);
      setError('Failed to get response. Please try again.');
      
      // Remove the empty assistant message if error occurred
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputValue);
    }
  };

  const clearHistory = () => {
    const welcomeMessage = messages[0];
    setMessages([welcomeMessage]);
    localStorage.removeItem('femtech-chatbot-messages');
  };

  if (!isOpen) return null;

  return (
    <div className={styles.chatWindow}>
      {/* Header */}
      <div className={styles.chatHeader}>
        <div className={styles.headerContent}>
          <h3 className={styles.headerTitle}>FemTech Weekend Assistant</h3>
          <p className={styles.headerSubtitle}>Your guide to women's health innovation</p>
        </div>
        <div className={styles.headerActions}>
          <button onClick={clearHistory} className={styles.clearButton} title="Clear chat history">
            🗑️
          </button>
          <button onClick={onClose} className={styles.closeButton} title="Close chat">
            ✕
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className={styles.chatMessages}>
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {isLoading && <TypingIndicator />}
        {error && (
          <div className={styles.errorMessage}>
            <p>{error}</p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      {messages.length === 1 && (
        <QuickActions 
          onQuestionClick={handleSendMessage}
          disabled={isLoading}
        />
      )}

      {/* Input */}
      <div className={styles.chatInputContainer}>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask about FemTech Weekend..."
          disabled={isLoading}
          className={styles.chatInput}
        />
        <button
          onClick={() => handleSendMessage(inputValue)}
          disabled={!inputValue.trim() || isLoading}
          className={styles.sendButton}
        >
          Send
        </button>
      </div>
    </div>
  );
};