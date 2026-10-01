import React from 'react';
import './EmptyState.css';

interface EmptyStateProps {
  message: string;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ message, icon }) => {
  return (
    <div className="empty-state">
      {icon && <div className="empty-state__icon">{icon}</div>}
      <p className="empty-state__message">{message}</p>
    </div>
  );
};
