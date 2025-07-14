import React, { useState } from 'react';
import * as FiIcons from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';

const { FiChevronDown, FiChevronUp, FiCheck } = FiIcons;

const ModelSelector = ({ currentModel, setCurrentModel }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const models = [
    { id: 'gpt-4', name: 'GPT-4', description: 'Most capable model, best for complex tasks' },
    { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', description: 'Fast and efficient for most tasks' },
    { id: 'claude-3', name: 'Claude 3', description: 'Balanced model with strong reasoning' },
    { id: 'llama-3', name: 'Llama 3', description: 'Open source model for various tasks' },
  ];
  
  const toggleDropdown = () => setIsOpen(!isOpen);
  
  const handleSelectModel = (modelId) => {
    setCurrentModel(modelId);
    setIsOpen(false);
  };
  
  const currentModelData = models.find(model => model.id === currentModel) || models[0];
  
  return (
    <div className="model-selector">
      <button 
        className="model-selector-button"
        onClick={toggleDropdown}
      >
        <div className="model-info">
          <span className="model-name">{currentModelData.name}</span>
          <span className="model-description">{currentModelData.description}</span>
        </div>
        <SafeIcon icon={isOpen ? FiChevronUp : FiChevronDown} />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="model-dropdown"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {models.map(model => (
              <button
                key={model.id}
                className={`model-option ${model.id === currentModel ? 'active' : ''}`}
                onClick={() => handleSelectModel(model.id)}
              >
                <div className="model-option-info">
                  <span className="model-option-name">{model.name}</span>
                  <span className="model-option-description">{model.description}</span>
                </div>
                
                {model.id === currentModel && (
                  <SafeIcon icon={FiCheck} className="model-selected-icon" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ModelSelector;