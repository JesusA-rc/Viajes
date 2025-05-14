import { TextField } from '@mui/material';
import React from 'react';
import { useController } from 'react-hook-form';

const TextInput = ({ control, name, label, rules = {}, ...props }) => {
  const {
    field,
    fieldState: { error }
  } = useController({
    name,
    control,
    rules
  });

  return (
    <TextField
      {...field}
      {...props}
      label={label}
      fullWidth
      variant="outlined"
      error={!!error}
      helperText={error?.message}
      margin="normal"
    />
  );
};

export default TextInput;