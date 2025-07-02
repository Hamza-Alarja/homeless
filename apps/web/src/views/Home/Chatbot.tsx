import styles from './style.module.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Message {
  type: 'visitor' | 'operator';
  text: string;
}

const Chatbot: React.FC = () => {
  const [isChatOpen, setChatOpen] = useState(true); // Set to true by default to always show chat
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [connectionError, setConnectionError] = useState('');

  // Initial greeting when component mounts
  useEffect(() => {
    setMessages([{ 
      type: 'operator', 
      text: 'Hi! My name is Sam. How can I help you today?' 
    }]);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
    if (connectionError) setConnectionError('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      sendMessage();
    }
  };

  const sendMessage = async () => {
    const trimmedInput = userInput.trim();
    if (!trimmedInput || isLoading) return;

    // Add user message immediately
    const userMessage = { type: 'visitor' as const, text: trimmedInput };
    setMessages(prev => [...prev, userMessage]);
    setUserInput('');
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/predict', {
        message: trimmedInput,
      }, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 5000
      });

      if (response.data?.answer) {
        setMessages(prev => [...prev, { 
          type: 'operator', 
          text: response.data.answer 
        }]);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('API Error:', error);
      
      let errorMessage = 'Sorry, I encountered an error. Please try again.';
      
      if (axios.isAxiosError(error)) {
        if (error.response) {
          errorMessage = `Server error: ${error.response.status}`;
        } else if (error.request) {
          errorMessage = 'Cannot connect to the server. Is your backend running?';
          setConnectionError('Cannot connect to backend server');
        } else {
          errorMessage = error.message;
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      setMessages(prev => [...prev, { 
        type: 'operator', 
        text: errorMessage 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.chatbox}>
        {/* Always show chat - removed toggle condition */}
        <div className={`${styles.chatbox__support} ${styles['chatbox--active']}`}>
          <div className={styles.chatbox__header}>
            <div className={styles['chatbox__image--header']}>
              <img 
                src="https://img.icons8.com/color/48/000000/circled-user-female-skin-type-5--v1.png" 
                alt="Chatbot avatar" 
              />
            </div>
            <div className={styles['chatbox__content--header']}>
              <h4 className={styles['chatbox__heading--header']}>Chat support</h4>
              <p className={styles['chatbox__description--header']}>
                {connectionError || 'Hi! How can I help you today?'}
              </p>
            </div>
          </div>

          <div className={styles['chatbox__messages']}>
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`${styles['messages__item']} ${styles[`messages__item--${message.type}`]}`}
              >
                {message.text}
                {message.type === 'operator' && index === messages.length - 1 && isLoading && (
                  <span className={styles.typing_indicator}>...</span>
                )}
              </div>
            ))}
          </div>

          <div className={styles['chatbox__footer']}>
            <input
              type="text"
              placeholder="Type your message..."
              value={userInput}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
            />
            <button
              className={`${styles['chatbox__send--footer']} ${styles['send__button']}`}
              onClick={sendMessage}
              disabled={isLoading || !userInput.trim()}
            >
              {isLoading ? 'Sending...' : 'Send'}
            </button>
          </div>
        </div>

        {/* Removed the chat toggle button completely */}
      </div>
    </div>
  );
};

export default Chatbot;