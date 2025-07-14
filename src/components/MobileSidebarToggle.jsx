import React from 'react';
import * as FiIcons from 'react-icons/fi';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';

const { FiMenu, FiX } = FiIcons;

const MobileSidebarToggle = ({ isOpen, toggleSidebar }) => {
  return (
    <motion.button
      className="mobile-sidebar-toggle"
      onClick={toggleSidebar}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <SafeIcon icon={isOpen ? FiX : FiMenu} />
    </motion.button>
  );
};

export default MobileSidebarToggle;