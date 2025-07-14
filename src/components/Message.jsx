import React, { useState } from 'react';
import * as FiIcons from 'react-icons/fi';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import { formatDistanceToNow } from 'date-fns';

const { FiCopy, FiCheck, FiUser, FiCpu } = FiIcons;

const Message = ({ message }) => {
  const [isCopied, setIsCopied] = useState(false);
  const isUser = message.role === 'user';
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.content);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };
  
  const formattedTime = message.timestamp 
    ? formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })
    : '';
  
  return (
    <div className={`message-wrapper ${isUser ? 'user-message' : 'assistant-message'}`}>
      <div className="message">
        <div className="message-avatar">
          <div className={`avatar ${isUser ? 'user-avatar' : 'assistant-avatar'}`}>
            <SafeIcon icon={isUser ? FiUser : FiCpu} />
          </div>
        </div>
        
        <div className="message-content">
          <div className="message-header">
            <span className="message-sender">{isUser ? 'You' : 'AI Assistant'}</span>
            <span className="message-time">{formattedTime}</span>
          </div>
          
          <div className="message-text">
            {message.content}
          </div>
          
          {!isUser && (
            <div className="message-actions">
              <motion.button 
                className="action-button"
                onClick={copyToClipboard}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <SafeIcon icon={isCopied ? FiCheck : FiCopy} />
                <span>{isCopied ? 'Copied!' : 'Copy'}</span>
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;