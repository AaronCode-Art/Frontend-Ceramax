import React from 'react';
import { Input } from '../../ui/Input';
import { Select } from '../../ui/Select';
import { Textarea } from '../../ui/Textarea';
import './FormField.css';

interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'select' | 'textarea' | 'date';
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  name?: string;
  id?: string;
  rows?: number;
  options?: { value: string; label: string }[];
  icon?: React.FC<{ size?: number; className?: string }>;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  required = false,
  type = 'text',
  value,
  onChange,
  placeholder,
  disabled = false,
  name,
  id,
  rows = 4,
  options = [],
  icon,
  className = '',
}) => {
  const fieldId = id || name;

  if (type === 'select') {
    return (
      <Select
        className={className}
        disabled={disabled}
        error={error}
        id={fieldId}
        label={label}
        name={name}
        onChange={onChange}
        options={options}
        placeholder={placeholder}
        required={required}
        value={value}
      />
    );
  }

  if (type === 'textarea') {
    return (
      <Textarea
        className={className}
        disabled={disabled}
        error={error}
        id={fieldId}
        label={label}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={rows}
        value={value}
      />
    );
  }

  return (
    <Input
      className={className}
      disabled={disabled}
      error={error}
      icon={icon}
      id={fieldId}
      label={label}
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      type={type}
      value={value}
    />
  );
};
