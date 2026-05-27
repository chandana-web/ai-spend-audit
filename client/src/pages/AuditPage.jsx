import React, { useState } from 'react';
import { Container, Box, Typography, Stepper, Step, StepLabel } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import AuditForm from '../components/AuditForm';
import TeamInfoForm from '../components/TeamInfoForm';
import ReviewForm from '../components/ReviewForm';
import API from '../services/api';

const steps = ['Team Details', 'Add Tools', 'Review & Audit'];

const AuditPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    teamSize: 1,
    useCase: 'coding',
    tools: [],
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleNext = (data) => {
    setFormData({ ...formData, ...data });
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

const handleAudit = async () => {
  setLoading(true);

  try {
   const payload = {
  teamSize: Number(formData.teamSize),

  useCase: formData.useCase.toLowerCase(),

  tools: formData.tools.map((tool) => ({
    toolName: tool.name,

    currentPlan: tool.plan,

    monthlySpend: Number(tool.monthlySpend),

    seats: Number(tool.seats),

    useCase: String(formData.useCase).toLowerCase().trim(),
  })),
};

console.log(payload);
    const result = await API.audit.calculateAudit(payload);

    localStorage.setItem(
      "auditResult",
      JSON.stringify(result)
    );

    navigate("/results");

  } catch (error) {
    console.error("Audit failed:", error);
  } finally {
    setLoading(false);
  }
};

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
            Let's find out how much you can save
          </Typography>
        </Box>

        <Stepper activeStep={activeStep} sx={{ mb: 6 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStep === 0 && (
          <TeamInfoForm data={formData} onNext={handleNext} />
        )}
        {activeStep === 1 && (
          <AuditForm data={formData} onNext={handleNext} onBack={handleBack} />
        )}
        {activeStep === 2 && (
          <ReviewForm data={formData} onBack={handleBack} onAudit={handleAudit} loading={loading} />
        )}
      </motion.div>
    </Container>
  );
};

export default AuditPage;