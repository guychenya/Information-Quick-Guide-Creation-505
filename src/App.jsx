import React, { useState, useRef, useEffect } from 'react';
import * as FiIcons from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from './common/SafeIcon';
import ChatContainer from './components/ChatContainer';
import Sidebar from './components/Sidebar';
import MobileSidebarToggle from './components/MobileSidebarToggle';
import './App.css';

const { FiPlusCircle, FiSettings, FiUser } = FiIcons;

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);
  const [conversations, setConversations] = useState([
    { id: '1', title: 'Getting started with AI', date: '2 hours ago', active: true },
    { id: '2', title: 'Brainstorming project ideas', date: 'Yesterday', active: false },
    { id: '3', title: 'Solving algorithm problems', date: '3 days ago', active: false },
  ]);
  
  const [currentModel, setCurrentModel] = useState('gpt-4');
  const [theme, setTheme] = useState('light');
  const mainContentRef = useRef(null);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const startNewConversation = () => {
    const newId = (parseInt(conversations[0]?.id || '0') + 1).toString();
    const newConversation = {
      id: newId,
      title: 'New conversation',
      date: 'Just now',
      active: true
    };
    
    setConversations(
      [newConversation, ...conversations.map(conv => ({ ...conv, active: false }))]
    );
  };

  const selectConversation = (id) => {
    setConversations(
      conversations.map(conv => ({
        ...conv,
        active: conv.id === id
      }))
    );
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, []);

  return (
    <div className="app">
      <MobileSidebarToggle isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      <Sidebar 
        isOpen={isSidebarOpen}
        conversations={conversations}
        onSelectConversation={selectConversation}
        onNewConversation={startNewConversation}
        currentModel={currentModel}
        setCurrentModel={setCurrentModel}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      
      <AnimatePresence>
        <motion.div 
          className="main-content"
          ref={mainContentRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          style={{ 
            marginLeft: isSidebarOpen ? (window.innerWidth >= 768 ? '280px' : '0') : '0',
            width: isSidebarOpen && window.innerWidth >= 768 ? 'calc(100% - 280px)' : '100%'
          }}
        >
          <ChatContainer 
            currentModel={currentModel}
            activeConversation={conversations.find(conv => conv.active)}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default App;