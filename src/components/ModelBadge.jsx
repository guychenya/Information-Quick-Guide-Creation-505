import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiCpu } = FiIcons;

const ModelBadge = ({ model }) => {
  // Map model IDs to display names
  const modelNames = {
    'gpt-4': 'GPT-4',
    'gpt-3.5-turbo': 'GPT-3.5',
    'claude-3': 'Claude 3',
    'llama-3': 'Llama 3'
  };
  
  const displayName = modelNames[model] || model;
  
  return (
    <div className="model-badge">
      <SafeIcon icon={FiCpu} className="model-icon" />
      <span className="model-name">{displayName}</span>
    </div>
  );
};

export default ModelBadge;