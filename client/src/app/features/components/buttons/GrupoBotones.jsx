import React from 'react';
import { Box } from '@mui/material';
import RoundedButton from './RoundedButton';

const GrupoBotones= ({ buttons, activeButton, setActiveButton }) => {
  return (
    <Box sx={{
      display: 'flex',
      bgcolor: '#393e46',
      padding: 0.2,
      borderRadius: '12px',
      overflow: 'hidden',
      gap:1
    }}>
      {buttons.map((button) => (
        <RoundedButton
          key={button.value}
          active={activeButton === button.value}
          onClick={() => setActiveButton(button.value)}
        >
          {button.label}
        </RoundedButton>
      ))}
    </Box>
  );
};

export default GrupoBotones;