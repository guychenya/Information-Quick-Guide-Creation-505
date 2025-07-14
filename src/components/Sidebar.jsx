import React from 'react';
import * as FiIcons from 'react-icons/fi';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import ModelSelector from './ModelSelector';

const { FiPlusCircle, FiSettings, FiMoon, FiSun, FiX } = FiIcons;

const Sidebar = ({ 
  isOpen, 
  conversations, 
  onSelectConversation, 
  onNewConversation,
  currentModel,
  setCurrentModel,
  theme,
  toggleTheme
}) => {
  const sidebarVariants = {
    open: { 
      x: 0,
      transition: { type: 'tween' }
    },
    closed: { 
      x: '-100%',
      transition: { type: 'tween' }
    }
  };

  return (
    <motion.div 
      className={`sidebar ${isOpen ? 'open' : 'closed'}`}
      variants={sidebarVariants}
      initial={isOpen ? 'open' : 'closed'}
      animate={isOpen ? 'open' : 'closed'}
    >
      <div className="sidebar-header">
        <h2>AI Assistant</h2>
      </div>
      
      <button 
        className="new-chat-button"
        onClick={onNewConversation}
      >
        <SafeIcon icon={FiPlusCircle} />
        <span>New chat</span>
      </button>
      
      <div className="sidebar-section">
        <h3 className="sidebar-section-title">Model</h3>
        <ModelSelector 
          currentModel={currentModel}
          setCurrentModel={setCurrentModel}
        />
      </div>
      
      <div className="sidebar-section">
        <h3 className="sidebar-section-title">Recent chats</h3>
        <div className="conversations-list">
          {conversations.map(conversation => (
            <div 
              key={conversation.id}
              className={`conversation-item ${conversation.active ? 'active' : ''}`}
              onClick={() => onSelectConversation(conversation.id)}
            >
              <div className="conversation-info">
                <span className="conversation-title">{conversation.title}</span>
                <span className="conversation-date">{conversation.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="sidebar-footer">
        <button className="sidebar-footer-button" onClick={toggleTheme}>
          <SafeIcon icon={theme === 'light' ? FiMoon : FiSun} />
          <span>{theme === 'light' ? 'Dark mode' : 'Light mode'}</span>
        </button>
        
        <button className="sidebar-footer-button">
          <SafeIcon icon={FiSettings} />
          <span>Settings</span>
        </button>
      </div>
    </motion.div>
  );
};

export default Sidebar;