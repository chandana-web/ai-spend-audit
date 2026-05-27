import React from 'react';
import { Button } from '@mui/material';
import { motion } from 'framer-motion';

const GradientButton = ({ children, onClick, size = 'large', fullWidth = false, ...props }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{ display: fullWidth ? 'block' : 'inline-block', width: fullWidth ? '100%' : 'auto' }}
    >
      <Button
        onClick={onClick}
        size={size}
        fullWidth={fullWidth}
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          fontWeight: 600,
          '&:hover': {
            background: 'linear-gradient(135deg, #5a67d8 0%, #6b46a0 100%)',
            boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)',
          },
          transition: 'all 0.3s ease',
          ...props.sx,
        }}
        {...props}
      >
        {children}
      </Button>
    </motion.div>
  );
};

export default GradientButton;