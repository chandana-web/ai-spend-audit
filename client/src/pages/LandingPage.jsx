import React from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Avatar,
  Stack,
  Chip,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SavingsIcon from '@mui/icons-material/Savings';
import SpeedIcon from '@mui/icons-material/Speed';
import SecurityIcon from '@mui/icons-material/Security';
import AnimatedSection from '../components/AnimatedSection';
import GradientButton from '../components/GradientButton';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
      title: 'Real Savings Analysis',
      description: 'Get instant breakdown of where you\'re overpaying and how much you can save monthly and annually.',
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 40 }} />,
      title: '30-Second Audit',
      description: 'Just add your AI tools and get actionable recommendations in seconds, not hours.',
    },
    {
      icon: <SavingsIcon sx={{ fontSize: 40 }} />,
      title: 'Alternative Suggestions',
      description: 'Discover cheaper alternatives that match your exact use case and team size.',
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40 }} />,
      title: 'Shareable Reports',
      description: 'Generate public links to share your savings breakdown with your team.',
    },
  ];

  const tools = [
    'Cursor', 'GitHub Copilot', 'Claude', 'ChatGPT',
    'Anthropic API', 'OpenAI API', 'Gemini', 'Windsurf'
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          minHeight: '90vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Animated Background */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 20% 50%, rgba(102, 126, 234, 0.15) 0%, transparent 50%)',
            animation: 'pulse 4s ease-in-out infinite',
          }}
        />
        
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Chip
                  label="Free Audit Tool"
                  sx={{
                    mb: 3,
                    background: 'linear-gradient(135deg, #667eea20 0%, #764ba220 100%)',
                    color: '#667eea',
                    border: '1px solid rgba(102, 126, 234, 0.3)',
                  }}
                />
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    fontWeight: 800,
                    mb: 2,
                  }}
                >
                  Stop Overpaying for{' '}
                  <Box component="span" className="gradient-text">
                    AI Tools
                  </Box>
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
                  Most companies waste 30-40% on AI subscriptions. Get your free audit and discover hidden savings today.
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <GradientButton onClick={() => navigate('/audit')}>
                    Start Free Audit →
                  </GradientButton>
                  <Button variant="outlined" size="large">
                    Watch Demo
                  </Button>
                </Stack>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
                  ✅ No credit card required • ✅ 2 minutes • ✅ Instant results
                </Typography>
              </motion.div>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card
                  sx={{
                    background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                    border: '1px solid rgba(102, 126, 234, 0.3)',
                    transform: 'rotate(2deg)',
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      Example Savings
                    </Typography>
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="body2" color="text.secondary">
                        Current Monthly Spend: $1,247
                      </Typography>
                      <Typography variant="h4" color="success.main" fontWeight={700}>
                        Save $412/month
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        That's $4,944/year back in your pocket
                      </Typography>
                    </Box>
                    <Box sx={{ height: 8, bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 4, overflow: 'hidden' }}>
                      <Box sx={{ width: '67%', height: '100%', background: 'linear-gradient(90deg, #667eea, #764ba2)' }} />
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Tools Section */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" textAlign="center" fontWeight={700} gutterBottom>
          We Audit All Major AI Tools
        </Typography>
        <Typography variant="body1" textAlign="center" color="text.secondary" sx={{ mb: 6 }}>
          Including but not limited to:
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
          {tools.map((tool, index) => (
            <motion.div
              key={tool}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <Chip
                label={tool}
                sx={{
                  fontSize: '1rem',
                  py: 3,
                  px: 2,
                  background: 'rgba(102, 126, 234, 0.1)',
                  border: '1px solid rgba(102, 126, 234, 0.2)',
                  '&:hover': {
                    background: 'rgba(102, 126, 234, 0.2)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              />
            </motion.div>
          ))}
        </Box>
      </Container>

      {/* Features Section */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" textAlign="center" fontWeight={700} gutterBottom>
          How It Works
        </Typography>
        <Typography variant="body1" textAlign="center" color="text.secondary" sx={{ mb: 6, maxWidth: 600, mx: 'auto' }}>
          Three simple steps to uncover hidden savings in your AI stack
        </Typography>
        
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={3} key={index}>
              <AnimatedSection delay={index * 0.1}>
                <Card sx={{ height: '100%', textAlign: 'center', p: 3 }}>
                  <Box sx={{ color: '#667eea', mb: 2 }}>{feature.icon}</Box>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </Card>
              </AnimatedSection>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box sx={{ py: 12, textAlign: 'center' }}>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Typography variant="h3" fontWeight={800} gutterBottom>
              Ready to Stop Overpaying?
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
              Join thousands of companies saving 30-50% on their AI tools
            </Typography>
            <GradientButton size="large" onClick={() => navigate('/audit')}>
              Start Your Free Audit Now
            </GradientButton>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;