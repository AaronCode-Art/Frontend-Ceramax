import React from 'react';
import { Button } from '../Button';
import './ErrorState.css';

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry }) => {
  return (
    <div className="error-state">
      <div className="error-state__icon">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="22" stroke="#dc2626" strokeWidth="2" />
          <path d="M24 14V28" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="24" cy="34" r="1.5" fill="#dc2626" />
        </svg>
      </div>
      <p className="error-state__message">{message}</p>
      {onRetry && (
        <Button variant="secondary" size="sm" onClick={onRetry}>
          Reintentar
        </Button>
      )}
    </div>
  );
};
