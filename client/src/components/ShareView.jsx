// src/components/ShareView.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  CircularProgress,
  Chip,
} from '@mui/material';
import { motion } from 'framer-motion';
import SavingsIcon from '@mui/icons-material/Savings';
import API from '../services/api';

const ShareView = () => {
  const { id } = useParams();
  const [audit, setAudit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadSharedAudit = async () => {
      try {
        const data = await API.audit.getSharedAudit(id);
        setAudit(data);
      } catch (err) {
        setError(err.message || 'Failed to load shared audit');
      } finally {
        setLoading(false);
      }
    };
    loadSharedAudit();
  }, [id]);

  if (loading) {
    return (
      <Container sx={{ py: 12, textAlign: 'center' }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Loading audit results...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 12, textAlign: 'center' }}>
        <Typography variant="h5" color="error">{error}</Typography>
        <Button href="/audit" variant="contained" sx={{ mt: 3 }}>
          Run Your Own Audit
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 12, mt: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card
          sx={{
            mb: 6,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
          }}
        >
          <CardContent sx={{ p: 6, textAlign: 'center' }}>
            <SavingsIcon sx={{ fontSize: 80, mb: 2 }} />
            <Typography variant="h4" gutterBottom fontWeight={800}>
              Shared Audit Results
            </Typography>
            <Typography variant="h5">
              Potential savings: ${audit?.summary?.monthlySavings || 0}/month
            </Typography>
            <Button
              href="/audit"
              variant="contained"
              sx={{
                mt: 4,
                background: 'white',
                color: '#667eea',
                '&:hover': { background: '#f0f0f0' },
              }}
            >
              Run Your Free Audit
            </Button>
          </CardContent>
        </Card>

        <Typography variant="h4" gutterBottom fontWeight={700}>
          Savings Breakdown
        </Typography>
        
        <Grid container spacing={3}>
          {audit?.recommendations?.map((rec, index) => (
            <Grid item xs={12} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{rec.toolName}</Typography>
                  <Chip label={rec.action} size="small" color="success" sx={{ my: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    {rec.reason}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </motion.div>
    </Container>
  );
};

export default ShareView;