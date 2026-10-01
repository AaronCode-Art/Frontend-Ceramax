import React from 'react';
import './Stat.css';

interface StatProps {
  label: string;
  value: string | number;
  hint?: string;
  icon?: string;
  className?: string;
}

export const Stat: React.FC<StatProps> = ({ label, value, hint, icon, className = '' }) => {
  return (
    <div className={`stat ${className}`}>
      {icon && (
        <div className="stat__icon" dangerouslySetInnerHTML={{ __html: icon }} />
      )}
      <div className="stat__content">
        <span className="stat__value">{value}</span>
        <span className="stat__label">{label}</span>
        {hint && <span className="stat__hint">{hint}</span>}
      </div>
    </div>
  );
};
