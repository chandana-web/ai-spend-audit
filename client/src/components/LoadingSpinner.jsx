// import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const LoadingSpinner = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
      }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      >
        <CircularProgress
          size={60}
          thickness={4}
          sx={{
            color: 'transparent',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '50%',
          }}
        />
      </motion.div>
      <Typography variant="h6" sx={{ mt: 3, color: 'text.secondary' }}>
        Analyzing your AI spend...
      </Typography>
    </Box>
  );
};

export default LoadingSpinner;