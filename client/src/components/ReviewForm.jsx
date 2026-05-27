import React from 'react';
import {
  Card,
  CardContent,
  Button,
  Box,
  Typography,
  Alert,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
  CircularProgress,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const ReviewForm = ({ data, onBack, onAudit, loading }) => {
  const totalMonthlySpend = data.tools.reduce((sum, tool) => sum + tool.monthlySpend, 0);

  return (
    <Card elevation={0}>
      <CardContent sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom fontWeight={600}>
          Review Your Information
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          Please verify everything is correct before running the audit
        </Typography>

        <Alert severity="info" sx={{ mb: 3 }}>
          <strong>Team Size:</strong> {data.teamSize} • <strong>Primary Use Case:</strong> {data.useCase}
        </Alert>

        <Typography variant="h6" gutterBottom>
          AI Tools ({data.tools.length})
        </Typography>
        
        <List>
          {data.tools.map((tool, index) => (
            <React.Fragment key={tool.id}>
              <ListItem>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                      <strong>{tool.name}</strong>
                      <Chip label={tool.plan} size="small" />
                      <Chip label={`${tool.seats} seats`} size="small" variant="outlined" />
                    </Box>
                  }
                  secondary={`$${tool.monthlySpend}/month`}
                  secondaryTypographyProps={{ sx: { color: 'success.main', fontWeight: 600 } }}
                />
              </ListItem>
              {index < data.tools.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>

        <Alert severity="success" sx={{ mt: 2 }}>
          Total Monthly Spend: <strong>${totalMonthlySpend}</strong>
        </Alert>

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
          <Button onClick={onBack} disabled={loading}>
            Back
          </Button>
          <Button
            variant="contained"
            onClick={onAudit}
            disabled={loading}
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              minWidth: 150,
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Run Audit →'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ReviewForm;