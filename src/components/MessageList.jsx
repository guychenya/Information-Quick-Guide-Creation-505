import React from 'react';
import { motion } from 'framer-motion';
import Message from './Message';
import TypingIndicator from './TypingIndicator';

const MessageList = ({ messages, isTyping, endOfMessagesRef }) => {
  return (
    <div className="message-list">
      <div className="messages-container">
        {messages.map((message, index) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.3, 
              delay: index === messages.length - 1 ? 0 : 0 
            }}
          >
            <Message message={message} />
          </motion.div>
        ))}
        
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <TypingIndicator />
          </motion.div>
        )}
        
        <div ref={endOfMessagesRef} />
      </div>
    </div>
  );
};

export default MessageList;