import React from 'react';
import {
  Box,
  TextField,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  Switch,
  Slider,
  Autocomplete,
  useTheme,
  useMediaQuery,
  Typography,
} from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';

interface FormField {
  name: string;
  label: string;
  type:
    | 'text'
    | 'email'
    | 'password'
    | 'number'
    | 'tel'
    | 'url'
    | 'textarea'
    | 'select'
    | 'checkbox'
    | 'radio'
    | 'switch'
    | 'slider'
    | 'autocomplete'
    | 'multiselect';
  required?: boolean;
  placeholder?: string;
  helperText?: string;
  options?: Array<{ value: string | number; label: string }>;
  validation?: any;
  disabled?: boolean;
  fullWidth?: boolean;
  multiline?: boolean;
  rows?: number;
  min?: number;
  max?: number;
  step?: number;
  marks?: boolean;
  valueLabelDisplay?: 'auto' | 'on' | 'off';
  multiple?: boolean;
  freeSolo?: boolean;
  getOptionLabel?: (option: any) => string;
  isOptionEqualToValue?: (option: any, value: any) => boolean;
  renderOption?: (props: any, option: any) => React.ReactNode;
  renderInput?: (params: any) => React.ReactNode;
  sx?: any;
}

interface ResponsiveFormProps {
  fields: FormField[];
  onSubmit: (data: any) => void;
  submitLabel?: string;
  loading?: boolean;
  layout?: 'vertical' | 'horizontal' | 'grid';
  columns?: number;
  spacing?: number;
  showLabels?: boolean;
  showHelperText?: boolean;
  disabled?: boolean;
  sx?: any;
}

const ResponsiveForm: React.FC<ResponsiveFormProps> = ({
  fields,
  onSubmit,
  submitLabel = 'Submit',
  loading = false,
  layout = 'vertical',
  columns = 1,
  spacing = 2,
  showLabels = true,
  showHelperText = true,
  disabled = false,
  sx = {},
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useFormContext();

  const renderField = (field: FormField) => {
    const error = errors[field.name];
    const hasError = !!error;

    const commonProps = {
      fullWidth: field.fullWidth ?? true,
      disabled: field.disabled ?? disabled,
      error: hasError,
      helperText:
        showHelperText && hasError
          ? String(error?.message || '')
          : field.helperText,
      sx: {
        ...field.sx,
        ...(isSmallScreen && { fontSize: '0.875rem' }),
      },
    };

    switch (field.type) {
      case 'textarea':
        return (
          <Controller
            name={field.name}
            control={control}
            rules={field.validation}
            render={({ field: { onChange, value } }) => (
              <TextField
                {...commonProps}
                label={showLabels ? field.label : undefined}
                placeholder={field.placeholder}
                multiline
                rows={field.rows || 4}
                value={value || ''}
                onChange={onChange}
                aria-label={!showLabels ? field.label : undefined}
              />
            )}
          />
        );

      case 'select':
        return (
          <Controller
            name={field.name}
            control={control}
            rules={field.validation}
            render={({ field: { onChange, value } }) => (
              <FormControl {...commonProps}>
                {showLabels && <InputLabel>{field.label}</InputLabel>}
                <Select
                  value={value || ''}
                  onChange={onChange}
                  label={showLabels ? field.label : undefined}
                  aria-label={!showLabels ? field.label : undefined}
                >
                  {field.options?.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                {showHelperText && (hasError || field.helperText) && (
                  <FormHelperText error={hasError}>
                    {hasError ? String(error?.message || '') : field.helperText}
                  </FormHelperText>
                )}
              </FormControl>
            )}
          />
        );

      case 'checkbox':
        return (
          <Controller
            name={field.name}
            control={control}
            rules={field.validation}
            render={({ field: { onChange, value } }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={value || false}
                    onChange={(e) => onChange(e.target.checked)}
                    disabled={commonProps.disabled}
                  />
                }
                label={field.label}
                sx={commonProps.sx}
              />
            )}
          />
        );

      case 'radio':
        return (
          <Controller
            name={field.name}
            control={control}
            rules={field.validation}
            render={({ field: { onChange, value } }) => (
              <FormControl {...commonProps}>
                {showLabels && <FormLabel>{field.label}</FormLabel>}
                <RadioGroup
                  value={value || ''}
                  onChange={(e) => onChange(e.target.value)}
                  aria-label={!showLabels ? field.label : undefined}
                >
                  {field.options?.map((option) => (
                    <FormControlLabel
                      key={option.value}
                      value={option.value}
                      control={<Radio />}
                      label={option.label}
                    />
                  ))}
                </RadioGroup>
                {showHelperText && (hasError || field.helperText) && (
                  <FormHelperText error={hasError}>
                    {hasError ? String(error?.message || '') : field.helperText}
                  </FormHelperText>
                )}
              </FormControl>
            )}
          />
        );

      case 'switch':
        return (
          <Controller
            name={field.name}
            control={control}
            rules={field.validation}
            render={({ field: { onChange, value } }) => (
              <FormControlLabel
                control={
                  <Switch
                    checked={value || false}
                    onChange={(e) => onChange(e.target.checked)}
                    disabled={commonProps.disabled}
                  />
                }
                label={field.label}
                sx={commonProps.sx}
              />
            )}
          />
        );

      case 'slider':
        return (
          <Controller
            name={field.name}
            control={control}
            rules={field.validation}
            render={({ field: { onChange, value } }) => (
              <Box>
                {showLabels && (
                  <Typography variant="body2" gutterBottom>
                    {field.label}
                  </Typography>
                )}
                <Slider
                  value={value || field.min || 0}
                  onChange={(_, newValue) => onChange(newValue)}
                  min={field.min}
                  max={field.max}
                  step={field.step}
                  marks={field.marks}
                  valueLabelDisplay={field.valueLabelDisplay || 'auto'}
                  disabled={commonProps.disabled}
                  aria-label={!showLabels ? field.label : undefined}
                />
                {showHelperText && (hasError || field.helperText) && (
                  <FormHelperText error={hasError}>
                    {hasError ? String(error?.message || '') : field.helperText}
                  </FormHelperText>
                )}
              </Box>
            )}
          />
        );

      case 'autocomplete':
        return (
          <Controller
            name={field.name}
            control={control}
            rules={field.validation}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                options={field.options || []}
                value={value || (field.multiple ? [] : null)}
                onChange={(_, newValue) => onChange(newValue)}
                getOptionLabel={
                  field.getOptionLabel || ((option) => option.label || option)
                }
                isOptionEqualToValue={
                  field.isOptionEqualToValue ||
                  ((option, value) => option.value === value.value)
                }
                renderOption={field.renderOption}
                renderInput={
                  field.renderInput ||
                  ((params) => (
                    <TextField
                      {...params}
                      label={showLabels ? field.label : undefined}
                      placeholder={field.placeholder}
                      error={hasError}
                      helperText={
                        showHelperText && hasError
                          ? String(error?.message || '')
                          : field.helperText
                      }
                      aria-label={!showLabels ? field.label : undefined}
                    />
                  ))
                }
                multiple={field.multiple}
                freeSolo={field.freeSolo}
                disabled={commonProps.disabled}
                sx={commonProps.sx}
              />
            )}
          />
        );

      default:
        return (
          <Controller
            name={field.name}
            control={control}
            rules={field.validation}
            render={({ field: { onChange, value } }) => (
              <TextField
                {...commonProps}
                type={field.type}
                label={showLabels ? field.label : undefined}
                placeholder={field.placeholder}
                value={value || ''}
                onChange={onChange}
                aria-label={!showLabels ? field.label : undefined}
                required={field.required}
              />
            )}
          />
        );
    }
  };

  const getLayoutSx = () => {
    switch (layout) {
      case 'horizontal':
        return {
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: spacing,
          alignItems: isMobile ? 'stretch' : 'flex-end',
        };
      case 'grid':
        return {
          display: 'grid',
          gridTemplateColumns: isMobile
            ? '1fr'
            : isSmallScreen
            ? `repeat(${Math.min(columns, 2)}, 1fr)`
            : `repeat(${columns}, 1fr)`,
          gap: spacing,
        };
      default:
        return {
          display: 'flex',
          flexDirection: 'column',
          gap: spacing,
        };
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        ...getLayoutSx(),
        ...sx,
      }}
    >
      {fields.map((field) => (
        <Box key={field.name}>{renderField(field)}</Box>
      ))}

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 2,
          mt: 3,
          pt: 2,
          borderTop: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Button
          type="submit"
          variant="contained"
          disabled={loading || disabled}
          sx={{
            minWidth: isSmallScreen ? '120px' : '140px',
            minHeight: isSmallScreen ? '40px' : '44px',
          }}
        >
          {loading ? 'Submitting...' : submitLabel}
        </Button>
      </Box>
    </Box>
  );
};

export default ResponsiveForm;
