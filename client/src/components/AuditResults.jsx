import  { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
  Alert,
  Chip,
  Divider,
  IconButton,
  Tooltip,
} from '@mui/material';
import { motion } from 'framer-motion';
import SavingsIcon from '@mui/icons-material/Savings';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import ShareIcon from '@mui/icons-material/Share';
import DownloadIcon from '@mui/icons-material/Download';
import EmailIcon from '@mui/icons-material/Email';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import API from '../services/api';
import toast from 'react-hot-toast';

const AuditResults = ({ result, onShare }) => {
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [capturing, setCapturing] = useState(false);
  const [shared, setShared] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [website, setWebsite] = useState('');

  if (!result) {
    return (
      <Container sx={{ py: 12, textAlign: 'center' }}>
        <Typography variant="h5">No audit data available. Please complete the form first.</Typography>
        <Button href="/audit" variant="contained" sx={{ mt: 3 }}>
          Start Audit
        </Button>
      </Container>
    );
  }

  // Transform result data to match template expectations
  const audResult = {
    monthlySavings: result.totalMonthlySavings || 0,
    annualSavings: result.totalAnnualSavings || 0,
    monthlySpend: result.totalMonthlySpend || 0,
    savingsPercentage: result.totalMonthlySpend > 0 
      ? (result.totalMonthlySavings / result.totalMonthlySpend) * 100 
      : 0,
  };
  console.log(result);

  const isHighSavings = result.isHighSavingsLead || false;

  const handleCaptureLead = async () => {
  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    toast.error('Please enter a valid email');
    return;
  }

  // Honeypot spam protection
  if (website) {
    return;
  }

  setCapturing(true);

  const loadingToast = toast.loading(
    'Sending report to your email...'
  );

  try {
    await API.lead.captureLead({
      email,
      companyName: company,
      role,
      auditId: result._id,
    });

    toast.dismiss(loadingToast);

    toast.success(
      'Report sent to your email!'
    );

    setEmailDialogOpen(false);

    setEmail('');
    setCompany('');
    setRole('');
  } catch (error) {
    toast.dismiss(loadingToast);

    toast.error(
      error.message ||
        'Failed to send report.'
    );
  } finally {
    setCapturing(false);
  }
};

  const handleShare = async () => {
    if (shared) return;
    setShared(true);
    const loadingToast = toast.loading('Creating shareable link...');
    
    try {
      const url = `${window.location.origin}/share/${result.publicShareId}`;
      setShareUrl(url);
      await navigator.clipboard.writeText(url);
      
      toast.dismiss(loadingToast);
      toast.success('Share link copied to clipboard!');
      onShare?.(result.publicShareId);
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error('Failed to copy share link');
    } finally {
      setShared(false);
    }
  };

  const handleDownloadPDF = async () => {
    toast.loading('Preparing PDF download...', { id: 'pdf' });
    
    try {
      // This would call a PDF generation endpoint
      // For now, we'll simulate
      setTimeout(() => {
        toast.success('PDF export ready!', { id: 'pdf' });
      }, 1500);
    } catch (error) {
      toast.error('Failed to generate PDF', { id: 'pdf' });
    }
  };

  const copyShareUrl = () => {
    if (shareUrl) {
      navigator.clipboard.writeText(shareUrl);
      toast.success('Link copied again!');
    } else {
      handleShare();
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 12, mt: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Hero Savings Section */}
        <Card
          sx={{
            mb: 6,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <CardContent sx={{ p: 6, textAlign: 'center' }}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
            >
              <SavingsIcon sx={{ fontSize: 80, mb: 2 }} />
            </motion.div>
            <Typography variant="h3" gutterBottom fontWeight={800}>
              You could save up to ${audResult.monthlySavings}/month
            </Typography>
            <Typography variant="h5" gutterBottom>
              ${audResult.annualSavings}/year
            </Typography>
            <Typography variant="body1" sx={{ mt: 2, opacity: 0.9 }}>
              {audResult.savingsPercentage.toFixed(1)}% potential reduction in AI spend
            </Typography>
            
            {isHighSavings && (
              <Alert 
                severity="warning" 
                sx={{ 
                  mt: 3, 
                  maxWidth: 500, 
                  mx: 'auto',
                  background: 'rgba(0,0,0,0.8)',
                  color: 'white',
                }}
              >
                🚀 You're eligible for Credex discounted credits! Book a consultation to save even more.
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* AI Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom fontWeight={600}>
                AI-Powered Summary
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {result.aiSummary || "Based on your AI tool stack, we've identified several optimization opportunities. Your current spending pattern suggests you could benefit from plan adjustments and alternative tools that better match your usage patterns."}
              </Typography>
            </CardContent>
          </Card>
        </motion.div>

        {/* Per-Tool Breakdown */}
        <Typography variant="h4" gutterBottom fontWeight={700} sx={{ mb: 3 }}>
          Detailed Breakdown
        </Typography>
        
        <Grid container spacing={3}>
          {result.recommendations?.map((rec, index) => (
            <Grid item xs={12} key={index}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                      <Box>
                        <Typography variant="h6" gutterBottom>
                          {rec.toolName}
                        </Typography>
                        <Chip 
                          label={`Current: ${rec.currentPlan}`} 
                          size="small" 
                          sx={{ mr: 1, mb: 1 }}
                        />
                        <Chip 
                          label={`→ ${rec.recommendedPlan}`} 
                          size="small" 
                          color="success"
                          sx={{ mb: 1 }}
                        />
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                          {rec.reason}
                        </Typography>
                      </Box>
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography variant="body2" color="text.secondary">
                          Current: ${rec.monthlySpend || rec.currentMonthlySpend || 0}/month
                        </Typography>
                        <Typography variant="h6" color="success.main">
                          Save: ${rec.monthlySavings || rec.savings || 0}/month
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Call to Action */}
        <Card sx={{ mt: 6, textAlign: 'center' }}>
          <CardContent sx={{ p: 5 }}>
            <Typography variant="h5" gutterBottom fontWeight={600}>
              Want to capture these savings?
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Get your full report via email with detailed action items and personalized recommendations.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                startIcon={<EmailIcon />}
                onClick={() => setEmailDialogOpen(true)}
                sx={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                }}
              >
                Get Full Report
              </Button>
              <Button
                variant="outlined"
                startIcon={<ShareIcon />}
                onClick={handleShare}
                disabled={shared}
              >
                {shared ? 'Creating...' : 'Share Results'}
              </Button>
              <Button
                variant="outlined"
                startIcon={<DownloadIcon />}
                onClick={handleDownloadPDF}
              >
                Download PDF
              </Button>
            </Box>
            {shareUrl && (
              <Box sx={{ mt: 2 }}>
                <Alert 
                  severity="success" 
                  action={
                    <IconButton size="small" onClick={copyShareUrl}>
                      <ContentCopyIcon fontSize="small" />
                    </IconButton>
                  }
                >
                  Share link: {shareUrl.substring(0, 50)}...
                </Alert>
              </Box>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Email Capture Dialog */}
      <Dialog open={emailDialogOpen} onClose={() => setEmailDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Typography variant="h5" fontWeight={600}>
            Get Your Full Audit Report
          </Typography>
          <Typography variant="body2" color="text.secondary">
            We'll send you a detailed breakdown with action items
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Company Name (Optional)"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
            <TextField
              fullWidth
              label="Your Role (Optional)"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
            <TextField
  sx={{ display: 'none' }}
  value={website}
  onChange={(e) => setWebsite(e.target.value)}
/>
            <Alert severity="info">
              We'll never share your email. Unsubscribe at any time.
            </Alert>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setEmailDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleCaptureLead}
            disabled={capturing}
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            }}
          >
            {capturing ? <LinearProgress sx={{ width: 100 }} /> : 'Send Report'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AuditResults;