import React from 'react';
import { Box, Typography, Grid, Link } from '@mui/material';

const Footer = () => {
    return (
        <Box
            sx={{
                backgroundColor: '#0d1117', 
                color: 'white',
                padding: '20px 0', 
                textAlign: 'center', 
            }}
        >
            <Typography variant="body1">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat ipsum voluptas voluptatum iure dolor. Eveniet 
                    est minus voluptatem dolore optio earum explicabo, a modi, aut, officia doloribus dolores. Molestiae, totam.
            </Typography>

            <Box sx={{ my: 2 }}>
                <Link href="#" sx={{ mr: 2 }}>X</Link>
                <Link href="#" sx={{ mr: 2 }}>Instagram</Link>
                <Link href="#">LinkedIn</Link>
            </Box>

            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} md={3}>
                    <Box sx={{display:'flex', flexDirection: 'column', gap:2}}>
                        <Typography variant="subtitle1">Product</Typography>
                        <Link href="#">Scrap Marketplace</Link>
                        <Link href="#">Services</Link>
                        <Link href="#">Renting Equipment</Link>
                    </Box>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Box sx={{display:'flex', flexDirection:'column',gap:2}}>
                        <Typography variant="subtitle1">Company</Typography>
                        <Link href="#">About</Link>
                        <Link href="#">Blog</Link>
                        <Link href="#">Contact</Link>
                    </Box>
                </Grid>
            </Grid>

            <Box sx={{ mt: 2 }}>
                <Typography variant="caption">
                    12th Street, first Industrial City, Damman 30345, Saudi Arabia | VAT: 134279506345000
                </Typography>
                <Typography variant="caption">
                    Powered By{' '}
                    <img src="https://via.placeholder.com/50" alt="Logo" style={{ marginLeft: '8px' }} />
                </Typography>
            </Box>
        </Box>
    );
};

export default Footer;