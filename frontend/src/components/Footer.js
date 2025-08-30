'use client';

import { Box, Typography, Link } from '@mui/material';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        bgcolor: 'grey.900',
        color: 'grey.100',
        py: 2,
        textAlign: 'center',
        boxShadow: '0 -2px 6px rgba(0,0,0,0.2)',
        zIndex: 1201,
      }}
    >
      <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
        © {new Date().getFullYear()} - Projeto Full Stack System |{' '}
        <Link
          href="https://github.com/AndUrban/task-manager-fullstack"
          underline="hover"
          color="inherit"
          sx={{ fontWeight: 'bold' }}
        >
          Github
        </Link>{' '}
        |{' '}
        <Link
          href="www.linkedin.com/in/andurban"
          underline="hover"
          color="inherit"
          sx={{ fontWeight: 'bold' }}
        >
          Linkedin
        </Link>
      </Typography>
    </Box>
  );
}
