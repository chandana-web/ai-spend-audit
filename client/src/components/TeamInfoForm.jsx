import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
  Typography,
} from '@mui/material';

const useCases = ['Coding', 'Writing', 'Data Analysis', 'Research', 'Mixed', 'Design', 'Marketing'];

const TeamInfoForm = ({ data, onNext }) => {
  const [formData, setFormData] = useState({
    teamSize: data.teamSize || 1,
    useCase: data.useCase || 'Coding',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(formData);
  };

  return (
    <Card elevation={0}>
      <CardContent sx={{ p: 4 }}>
        <form onSubmit={handleSubmit}>
          <Typography variant="h5" gutterBottom fontWeight={600}>
            Tell us about your team
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
            This helps us provide accurate recommendations
          </Typography>
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Team Size"
                type="number"
                value={formData.teamSize}
                onChange={(e) => setFormData({ ...formData, teamSize: parseInt(e.target.value) || 1 })}
                InputProps={{ inputProps: { min: 1 } }}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Primary Use Case</InputLabel>
                <Select
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
              type="submit"
              variant="contained"
              size="large"
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)',
                },
              }}
            >
              Next: Add Tools →
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
};

export default TeamInfoForm;