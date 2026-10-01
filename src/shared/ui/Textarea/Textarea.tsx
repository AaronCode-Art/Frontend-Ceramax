import React, { forwardRef } from 'react';
import './Textarea.css';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  className?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
  label,
  error,
  rows = 4,
  placeholder,
  disabled = false,
  required = false,
  name,
  id,
  className = '',
  ...rest
}, ref) => {
  const textareaId = id || name;
  const textareaClasses = [
    'textarea-field',
    error ? 'textarea-field--error' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={`textarea-wrapper ${className}`}>
      {label && (
        <label htmlFor={textareaId} className="textarea-label">
          {label}
          {required && <span className="textarea-required">*</span>}
        </label>
      )}
      <textarea
        ref={ref}
        className={textareaClasses}
        disabled={disabled}
        id={textareaId}
        name={name}
        placeholder={placeholder}
        required={required}
        rows={rows}
        {...rest}
      />
      {error && <p className="textarea-error">{error}</p>}
    </div>
  );
});

Textarea.displayName = 'Textarea';
