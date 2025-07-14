import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiCpu } = FiIcons;

const TypingIndicator = () => {
  return (
    <div className="typing-indicator-wrapper assistant-message">
      <div className="message">
        <div className="message-avatar">
          <div className="avatar assistant-avatar">
            <SafeIcon icon={FiCpu} />
          </div>
        </div>
        
        <div className="typing-indicator">
          <motion.div 
            className="dot"
            animate={{ 
              y: [0, -8, 0] 
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
              delay: 0,
            }}
          />
          <motion.div 
            className="dot"
            animate={{ 
              y: [0, -8, 0] 
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
              delay: 0.2,
            }}
          />
          <motion.div 
            className="dot"
            animate={{ 
              y: [0, -8, 0] 
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
              delay: 0.4,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;