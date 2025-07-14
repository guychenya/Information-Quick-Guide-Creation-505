import React, { useState, useRef, useEffect } from 'react';
import * as FiIcons from 'react-icons/fi';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';

const { FiSend, FiPlus } = FiIcons;

const PromptInput = ({ value, onChange, onKeyDown, onSend, placeholder, disabled }) => {
  const textareaRef = useRef(null);
  
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  }, [value]);
  
  return (
    <div className="prompt-input-container">
      <div className="prompt-input-wrapper">
        <textarea
          ref={textareaRef}
          className="prompt-input"
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          rows={1}
        />
        
        <motion.button
          className={`send-button ${(!value.trim() || disabled) ? 'disabled' : ''}`}
          onClick={onSend}
          disabled={!value.trim() || disabled}
          whileHover={{ scale: value.trim() && !disabled ? 1.1 : 1 }}
          whileTap={{ scale: value.trim() && !disabled ? 0.95 : 1 }}
        >
          <SafeIcon icon={FiSend} />
        </motion.button>
      </div>
      
      <div className="prompt-footer">
        <span className="prompt-info">
          Shift + Enter for new line
        </span>
      </div>
    </div>
  );
};

export default PromptInput;