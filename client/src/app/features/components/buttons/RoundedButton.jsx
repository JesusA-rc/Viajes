import React from 'react';
import { Button } from '@mui/material';

const RoundedButton = ({
  children,
  active,
  onClick,
}) => {
  return (
    <Button
      sx={{
        display:'flex',
        borderRadius: 0,
        borderTopRightRadius: '12px',
        borderBottomRightRadius: '12px',
        borderTopLeftRadius: '12px',
        borderBottomLeftRadius: '12px',
        bgcolor: active ? 'aquamarine' : 'inherit',
        color: active ? '#222831' : 'black',
        '&:hover': {
          bgcolor: active ? 'aquamarine' : '#4a4f57'
        }
      }}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default RoundedButton;