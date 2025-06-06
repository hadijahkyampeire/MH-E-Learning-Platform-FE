import React from 'react';
import { Autocomplete, TextField } from '@mui/material';

interface DropdownProps {
  label: string;
  value: any;
  onChange: (value: any) => void;
  options?: any[];
  multiple?: boolean;
  getOptionLabel?: (opt: any) => string;
  disableClearable?: boolean;
  [key: string]: any;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  value,
  onChange,
  options = [],
  multiple = false,
  getOptionLabel = (opt) => opt.label || opt,
  disableClearable = false,
  ...props
}) => {
  return (
    <Autocomplete
      multiple={multiple}
      options={options}
      value={value}
      onChange={(event, newValue) => onChange(newValue)}
      getOptionLabel={getOptionLabel}
      disableClearable={disableClearable}
      renderInput={(params) => <TextField {...params} label={label} />}
      {...props}
    />
  );
};

export default Dropdown;
