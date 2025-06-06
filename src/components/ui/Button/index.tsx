import React from 'react';
import { Button as MuiButton } from '@mui/material';

import { type ButtonProps as MuiButtonProps } from '@mui/material';

interface ButtonProps extends MuiButtonProps {
  children?: React.ReactNode;
  variant?: 'text' | 'outlined' | 'contained';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'contained', ...props }) => {
  return (
    <MuiButton variant={variant} {...props}>
      {children}
    </MuiButton>
  );
};

export default Button;
