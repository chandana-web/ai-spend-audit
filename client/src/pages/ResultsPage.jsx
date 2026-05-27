import React, { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import AuditResults from '../components/AuditResults';
import LoadingSpinner from '../components/LoadingSpinner';

const ResultsPage = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Try to get result from location state first
    if (location.state?.result) {
      setResult(location.state.result);
      setLoading(false);
    } else {
      // Fallback to localStorage
      const savedResult = localStorage.getItem('auditResult');
      if (savedResult) {
        setResult(JSON.parse(savedResult));
      }
      setLoading(false);
    }
  }, [location]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <AuditResults result={result} />
    </motion.div>
  );
};

export default ResultsPage;