import React from 'react';
import './Spinner.css';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ size = 'md', className = '' }) => {
  return (
    <div
      className={`spinner spinner--${size} ${className}`}
      role="status"
      aria-label="Cargando"
    >
      <span className="spinner__sr-only">Cargando...</span>
    </div>
  );
};
