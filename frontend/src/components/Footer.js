'use client';

import { Box, Typography, Link } from '@mui/material';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'grey.900',
        color: 'grey.100',
        py: 2,
        textAlign: 'center',
        mt: 'auto',
      }}
    >
      <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
        © {new Date().getFullYear()} - Seu Projeto |{' '}
        <Link href="#" underline="hover" color="inherit" sx={{ fontWeight: 'bold' }}>
          Link 1
        </Link>{' '}
        |{' '}
        <Link href="#" underline="hover" color="inherit" sx={{ fontWeight: 'bold' }}>
          Link 2
        </Link>
      </Typography>
    </Box>
  );
}
