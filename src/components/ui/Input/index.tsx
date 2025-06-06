import React from 'react';
import { TextField } from '@mui/material';

import { type TextFieldProps } from '@mui/material/TextField';

interface InputProps extends Omit<TextFieldProps, 'variant'> {
  label?: string;
  type?: string;
  value?: any;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  helperText?: React.ReactNode;
  error?: boolean;
  multiline?: boolean;
  rows?: number;
}

const Input: React.FC<InputProps> = ({
  label,
  type = 'text',
  value,
  onChange,
  helperText,
  error,
  multiline = false,
  rows,
  ...props
}) => {
  return (
    <TextField
      fullWidth
      label={label}
      type={type}
      value={value}
      onChange={onChange}
      helperText={helperText}
      error={error}
      multiline={multiline}
      rows={rows}
      {...props}
    />
  );
};

export default Input;
