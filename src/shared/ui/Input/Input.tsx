import React, { forwardRef } from 'react';
import './Input.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.FC<{ size?: number; className?: string }>;
  className?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  icon: Icon,
  placeholder,
  type = 'text',
  disabled = false,
  required = false,
  className = '',
  name,
  id,
  ...rest
}, ref) => {
  const inputId = id || name;
  const inputClasses = [
    'input-field',
    error ? 'input-field--error' : '',
    Icon ? 'input-field--with-icon' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={`input-wrapper ${className}`}>
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label}
          {required && <span className="input-required">*</span>}
        </label>
      )}
      <div className="input-container">
        {Icon && (
          <span className="input-icon">
            <Icon size={18} />
          </span>
        )}
        <input
          ref={ref}
          className={inputClasses}
          disabled={disabled}
          id={inputId}
          name={name}
          placeholder={placeholder}
          required={required}
          type={type}
          {...rest}
        />
      </div>
      {error && <p className="input-error">{error}</p>}
    </div>
  );
});

Input.displayName = 'Input';
