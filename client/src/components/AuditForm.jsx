import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
  Stepper,
  Step,
  StepLabel,
  Alert,
  CircularProgress,
  Fade,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import API from '../services/api';

const availableTools = [
  { name: 'Cursor', plans: ['Hobby', 'Pro', 'Business', 'Enterprise'] },
  { name: 'GitHub Copilot', plans: ['Individual', 'Business', 'Enterprise'] },
  { name: 'Claude', plans: ['Free', 'Pro', 'Max', 'Team', 'Enterprise', 'API direct'] },
  { name: 'ChatGPT', plans: ['Plus', 'Team', 'Enterprise', 'API direct'] },
  { name: 'Anthropic API', plans: ['API direct'] },
  { name: 'OpenAI API', plans: ['API direct'] },
  { name: 'Gemini', plans: ['Pro', 'Ultra', 'API'] },
  { name: 'Windsurf', plans: ['Free', 'Pro', 'Enterprise'] },
];

const useCases = ['coding', 'writing', 'data', 'research', 'mixed'];



const AuditForm = ({ onAuditComplete }) => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pricingData, setPricingData] = useState(null);
  const [formData, setFormData] = useState({
    teamSize: 1,
    useCase: 'coding',
    tools: [],
  });
  const [selectedTool, setSelectedTool] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('');
  const [monthlySpend, setMonthlySpend] = useState('');
  const [seats, setSeats] = useState(1);

  const getSeatOptions = (tool, plan) => {
  const toolName = tool?.toLowerCase().replace(/\s+/g, '');
  const planName = plan?.toLowerCase();

  if (toolName === 'chatgpt' && planName === 'team') {
    return [1, 2];
  }

  if (toolName === 'claude' && planName === 'team') {
    return [1, 2, 3];
  }

  if (toolName === 'cursor' && planName === 'business') {
    return [1, 2, 3, 4, 5];
  }

  if (toolName === 'githubcopilot' && planName === 'business') {
    return [1, 2, 3];
  }

  return [1, 2, 3, 5, 10, 20];
};

  // Load pricing data on mount
  useEffect(() => {
    const loadPricingData = async () => {
      try {
        const data = await API.audit.getPricingData();
        setPricingData(data);
      } catch (error) {
        console.error('Failed to load pricing data:', error);
      }
    };
    loadPricingData();
  }, []);

  // Load saved state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('auditFormState');
    if (saved) {
      const parsed = JSON.parse(saved);
      setFormData(parsed);
      if (parsed.tools?.length > 0) {
        setActiveStep(1);
      }
    }
  }, []);

  // Save state to localStorage
  useEffect(() => {
    localStorage.setItem('auditFormState', JSON.stringify(formData));
  }, [formData]);

  const handleAddTool = () => {
    if (!selectedTool || !selectedPlan || !monthlySpend) {
      toast.error('Please fill all tool fields');
      return;
    }

    const newTool = {
      id: Date.now(),
      name: selectedTool,
      plan: selectedPlan,
      monthlySpend: parseFloat(monthlySpend),
      seats: parseInt(seats),
    };

    setFormData({
      ...formData,
      tools: [...formData.tools, newTool],
    });

    // Reset form
    setSelectedTool('');
    setSelectedPlan('');
    setMonthlySpend('');
    setSeats(1);
    toast.success(`${selectedTool} added successfully`);
  };

  const handleRemoveTool = (id) => {
    setFormData({
      ...formData,
      tools: formData.tools.filter(tool => tool.id !== id),
    });
    toast.success('Tool removed');
  };

  const handleSubmit = async () => {
    if (formData.tools.length === 0) {
      toast.error('Please add at least one AI tool');
      return;
    }

    setLoading(true);
    const loadingToast = toast.loading('Analyzing your AI spend...');
    
    try {
      // Calculate audit
      const auditResult = await API.audit.calculateAudit({
        teamSize: formData.teamSize,
        useCase: formData.useCase,
        tools: formData.tools.map(tool => ({
          toolName: tool.name,
          currentPlan: tool.plan,
          monthlySpend: tool.monthlySpend,
          seats: tool.seats,
          useCase: formData.useCase,
        })),
      });

      const completeResult = {
        ...auditResult.data,
        teamSize: formData.teamSize,
        useCase: formData.useCase,
      };

      if (onAuditComplete) {
        onAuditComplete(completeResult);
      }
      
      toast.dismiss(loadingToast);
      toast.success('Audit complete! Check your savings below.');
      navigate('/results', { state: { result: completeResult } });
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(error.message || 'Failed to calculate audit. Please try again.');
      console.error('Audit error:', error);
    } finally {
      setLoading(false);
    }
  };

  const steps = ['Team Info', 'Add Tools', 'Review'];

  return (
    <Container maxWidth="lg" sx={{ py: 12, mt: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h2"
            gutterBottom
            sx={{
              fontSize: { xs: '2rem', md: '3rem' },
              fontWeight: 800,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
          >
            AI Spend Audit
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Discover where you're overpaying and how much you can save
          </Typography>
        </Box>

        <Stepper activeStep={activeStep} sx={{ mb: 6 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <AnimatePresence mode="wait">
          {activeStep === 0 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <Card elevation={0}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h5" gutterBottom fontWeight={600}>
                    Tell us about your team
                  </Typography>
                  <Grid container spacing={4} sx={{ mt: 2 }}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Team Size"
                        type="number"
                        value={formData.teamSize}
                        onChange={(e) => setFormData({ ...formData, teamSize: parseInt(e.target.value) || 0 })}
                        InputProps={{ inputProps: { min: 1 } }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <InputLabel>Primary Use Case</InputLabel>
                        <Select
                          sx={{paddingRight:5}}
                          value={formData.useCase}
                          onChange={(e) => setFormData({ ...formData, useCase: e.target.value })}
                          label="Primary Use Case"
                        >
                          {useCases.map((useCase) => (
                            <MenuItem key={useCase} value={useCase}>{useCase}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                      variant="contained"
                      onClick={() => setActiveStep(1)}
                      sx={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      Next: Add Tools
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeStep === 1 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <Card elevation={0}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h5" gutterBottom fontWeight={600}>
                    Add your AI tools
                  </Typography>
                  
                  <Box sx={{ mb: 4, p: 3, background: 'rgba(99, 102, 241, 0.05)', borderRadius: 3 }}>
                    <Grid container spacing={2} >
                      <Grid item xs={12} md={3} >
                        <FormControl  fullWidth >
                          <InputLabel >Tool</InputLabel>
                          <Select
                          sx={{paddingRight:5}}
                            value={selectedTool}
                            onChange={(e) => setSelectedTool(e.target.value)}
                            label="Tool"
                            
                          >
                            {availableTools.map((tool) => (
                              <MenuItem key={tool.name} value={tool.name}>{tool.name}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <FormControl fullWidth>
                          <InputLabel>Plan</InputLabel>
                          <Select
                           sx={{paddingRight:5}}
                            value={selectedPlan}
                            onChange={(e) => setSelectedPlan(e.target.value)}
                            label="Plan"
                            disabled={!selectedTool}
                          >
                            {selectedTool && availableTools
                              .find(t => t.name === selectedTool)
                              ?.plans.map((plan) => (
                                <MenuItem key={plan} value={plan}>{plan}</MenuItem>
                              ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <TextField
                          fullWidth
                          label="Monthly Spend ($)"
                          type="number"
                          value={monthlySpend}
                          onChange={(e) => setMonthlySpend(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} md={2}>
                        <FormControl fullWidth>
  <InputLabel>Seats</InputLabel>

  <Select
    sx={{paddingRight:5}}
    value={seats}
    onChange={(e) => setSeats(Number(e.target.value))}
    label="Seats"
  >
    {getSeatOptions(selectedTool, selectedPlan).map((seat) => (
      <MenuItem key={seat} value={seat}>
        {seat}
      </MenuItem>
    ))}
  </Select>
</FormControl>
                      </Grid>
                      <Grid item xs={12} md={1}>
                        <IconButton
                          onClick={handleAddTool}
                          sx={{
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white',
                            '&:hover': { transform: 'scale(1.05)' },
                            transition: 'transform 0.2s',
                            width: 56,
                            height: 56,
                          }}
                        >
                          <AddIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Box>

                  {formData.tools.length > 0 && (
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        Your Tools ({formData.tools.length})
                      </Typography>
                      <Grid container spacing={2}>
                        {formData.tools.map((tool) => (
                          <Grid item xs={12} key={tool.id}>
                            <Card sx={{ background: 'rgba(99, 102, 241, 0.1)' }}>
                              <CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                  <Box>
                                    <Typography variant="h6">{tool.name}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                      {tool.plan} • {tool.seats} seat{tool.seats !== 1 ? 's' : ''}
                                    </Typography>
                                    <Typography variant="h6" color="primary">
                                      ${tool.monthlySpend}/month
                                    </Typography>
                                  </Box>
                                  <IconButton onClick={() => handleRemoveTool(tool.id)} color="error">
                                    <DeleteIcon />
                                  </IconButton>
                                </Box>
                              </CardContent>
                            </Card>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  )}

                  <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
                    <Button onClick={() => setActiveStep(0)}>
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => setActiveStep(2)}
                      disabled={formData.tools.length === 0}
                      sx={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      }}
                    >
                      Next: Review
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeStep === 2 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <Card elevation={0}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h5" gutterBottom fontWeight={600}>
                    Review Your Audit
                  </Typography>
                  
                  <Box sx={{ mt: 3 }}>
                    <Alert severity="info" sx={{ mb: 3 }}>
                      Team Size: {formData.teamSize} • Primary Use Case: {formData.useCase}
                    </Alert>
                    
                    <Typography variant="h6" gutterBottom>
                      Tools being audited:
                    </Typography>
                    {formData.tools.map((tool) => (
                      <Box key={tool.id} sx={{ mb: 2, p: 2, background: 'rgba(99, 102, 241, 0.05)', borderRadius: 2 }}>
                        <Typography>
                          <strong>{tool.name}</strong> - {tool.plan} ({tool.seats} seats) - ${tool.monthlySpend}/month
                        </Typography>
                      </Box>
                    ))}
                  </Box>

                  <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
                    <Button onClick={() => setActiveStep(1)}>
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      onClick={handleSubmit}
                      disabled={loading}
                      sx={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      }}
                    >
                      {loading ? <CircularProgress size={24} color="inherit" /> : 'Run Audit'}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Container>
  );
};

export default AuditForm;