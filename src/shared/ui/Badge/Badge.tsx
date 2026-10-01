import React from 'react';
import './Badge.css';

interface BadgeProps {
  tone?: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ tone = 'neutral', children, className = '' }) => {
  return (
    <span className={`badge badge--${tone} ${className}`}>{children}</span>
  );
};
