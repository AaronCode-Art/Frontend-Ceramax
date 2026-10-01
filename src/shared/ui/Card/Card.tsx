import React from 'react';
import './Card.css';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  footer?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, children, className = '', footer }) => {
  return (
    <div className={`card ${className}`}>
      {title && (
        <div className="card__header">
          <h3 className="card__title">{title}</h3>
        </div>
      )}
      <div className="card__body">{children}</div>
      {footer && <div className="card__footer">{footer}</div>}
    </div>
  );
};
