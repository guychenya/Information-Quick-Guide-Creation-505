import React, { useState, useRef, useEffect } from 'react';
import * as FiIcons from 'react-icons/fi';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import MessageList from './MessageList';
import PromptInput from './PromptInput';
import ModelBadge from './ModelBadge';

const { FiSend, FiChevronDown } = FiIcons;

const ChatContainer = ({ currentModel, activeConversation }) => {
  const [messages, setMessages] = useState([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your AI assistant. How can I help you today?',
      timestamp: new Date().toISOString()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const endOfMessagesRef = useRef(null);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date().toISOString()
    };
    
    setMessages([...messages, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      const responseOptions = [
        "I understand what you're asking. Let me think about that...",
        "That's an interesting question. Based on my knowledge, I would say...",
        "Thanks for your query. Here's what I know about that topic...",
        "I can help with that. Here's some information that might be useful..."
      ];
      
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseOptions[Math.floor(Math.random() * responseOptions.length)],
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h1>{activeConversation?.title || 'New conversation'}</h1>
        <ModelBadge model={currentModel} />
      </div>
      
      <MessageList 
        messages={messages} 
        isTyping={isTyping} 
        endOfMessagesRef={endOfMessagesRef}
      />
      
      <PromptInput
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onSend={handleSendMessage}
        placeholder="Message the AI..."
        disabled={isTyping}
      />
      
      <div className="chat-footer">
        <p className="disclaimer">
          AI responses may not always be accurate. Verify important information.
        </p>
      </div>
    </div>
  );
};

export default ChatContainer;