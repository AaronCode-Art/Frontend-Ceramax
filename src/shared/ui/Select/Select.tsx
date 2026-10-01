import React, { forwardRef } from 'react';
import './Select.css';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  label,
  error,
  options,
  placeholder,
  disabled = false,
  name,
  id,
  required = false,
  className = '',
  ...rest
}, ref) => {
  const selectId = id || name;
  const selectClasses = [
    'select-field',
    error ? 'select-field--error' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={`select-wrapper ${className}`}>
      {label && (
        <label htmlFor={selectId} className="select-label">
          {label}
          {required && <span className="select-required">*</span>}
        </label>
      )}
      <div className="select-container">
        <select
          ref={ref}
          className={selectClasses}
          disabled={disabled}
          id={selectId}
          name={name}
          required={required}
          {...rest}
        >
          {placeholder && (
            <option disabled value="">
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <span className="select-chevron" aria-hidden="true">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
      {error && <p className="select-error">{error}</p>}
    </div>
  );
});

Select.displayName = 'Select';
