import React from 'react';
import { Button } from '../../ui/Button';
import './FormActions.css';

interface FormActionsProps {
  submitLabel?: string;
  cancelLabel?: string;
  onCancel?: () => void;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}

export const FormActions: React.FC<FormActionsProps> = ({
  submitLabel = 'Guardar',
  cancelLabel = 'Cancelar',
  onCancel,
  loading = false,
  disabled = false,
  className = '',
}) => {
  return (
    <div className={`form-actions ${className}`}>
      {onCancel && (
        <Button
          disabled={loading}
          onClick={onCancel}
          type="button"
          variant="ghost"
        >
          {cancelLabel}
        </Button>
      )}
      <Button
        disabled={disabled || loading}
        loading={loading}
        type="submit"
        variant="primary"
      >
        {submitLabel}
      </Button>
    </div>
  );
};
