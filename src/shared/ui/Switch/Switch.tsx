import React from 'react';
import './Switch.css';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  id?: string;
}

export const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
  id,
}) => {
  const switchId = id || (label ? `switch-${label.replace(/\s/g, '-')}` : undefined);

  return (
    <label className={`switch-wrapper ${disabled ? 'switch-wrapper--disabled' : ''}`} htmlFor={switchId}>
      <button
        id={switchId}
        className={`switch ${checked ? 'switch--checked' : ''}`}
        onClick={() => !disabled && onChange(!checked)}
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        type="button"
      >
        <span className="switch__thumb" />
      </button>
      {label && <span className="switch__label">{label}</span>}
    </label>
  );
};
