import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router';

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));

export default function ButtonBackImage({images = []}) {
  return (
    <Box sx={{ 
        display: 'flex',
        flexWrap: 'wrap',
        minWidth: 300,
        width: '100%',
        gap: 4,
        alignItems:'center',
        justifyContent:'center',
        backgroundImage: 'radial-gradient(circle, #EDDD53, #00B8D9)',
        height: '15rem'
        }}>
            {Array.isArray(images) && images.length > 0 ? (
        images.map((image) => (
          <ImageButton
            focusRipple
            key={image.id}
            style={{
              width: image.width,
            }}
            component={Link}
            to={image.path}
          >
            <ImageSrc style={{ backgroundImage: `url(${image.url})` }} sx={{ borderRadius: '15px' }} />
            <ImageBackdrop className="MuiImageBackdrop-root" sx={{ borderRadius: '15px' }} />
            <Image>
              <Typography
                component="span"
                variant="subtitle1"
                color="inherit"
                sx={(theme) => ({
                  position: 'relative',
                  p: 4,
                  pt: 2,
                  pb: `calc(${theme.spacing(1)} + 6px)`,
                })}
              >
                {image.title}
                <ImageMarked className="MuiImageMarked-root" />
              </Typography>
            </Image>
          </ImageButton>

        ))
      ) : (
        <Typography variant="body1" align="center">
          No hay imágenes disponibles.
        </Typography>
      )}
    </Box>
  );
}
