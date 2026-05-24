import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token if needed
apiClient.interceptors.request.use(
  (config) => {
    // You can add auth token here if needed
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || error.message || 'An error occurred';
    return Promise.reject({ message, status: error.response?.status });
  }
);

// Audit API endpoints
export const auditAPI = {
  // Calculate audit based on user inputs
  calculateAudit: (data) => apiClient.post('/audit/calculate', data),
  
  // Get audit by share ID (for public share links)
  getSharedAudit: (shareId) => apiClient.get(`/audit/share/${shareId}`),
  
  // Generate shareable link for audit results
  createShareLink: (auditData) => apiClient.post('/audit/share', auditData),
  
  // Get pricing data for all tools
  getPricingData: () => apiClient.get('/audit/pricing'),
  
  // Get alternative tool suggestions
  getAlternatives: (toolName, useCase) => apiClient.get('/audit/alternatives', {
    params: { toolName, useCase }
  }),
};

// Lead capture API endpoints
export const leadAPI = {
  // Capture lead with email
  captureLead: (data) => apiClient.post('/leads/capture', data),
  
  // Send audit report to email
  sendReport: (data) => apiClient.post('/leads/send-report', data),
  
  // Subscribe to notifications
  subscribe: (data) => apiClient.post('/leads/subscribe', data),
  
  // Verify email (for double opt-in)
  verifyEmail: (token) => apiClient.get(`/leads/verify/${token}`),
  
  // Unsubscribe from notifications
  unsubscribe: (email) => apiClient.delete('/leads/unsubscribe', { data: { email } }),
};

// AI Summary API endpoints
export const aiAPI = {
  // Generate AI summary for audit results
  generateSummary: (auditData) => apiClient.post('/ai/summary', auditData),
  
  // Get personalized recommendations
  getRecommendations: (auditData) => apiClient.post('/ai/recommendations', auditData),
  
  // Generate benchmark comparison
  getBenchmark: (teamSize, useCase) => apiClient.get('/ai/benchmark', {
    params: { teamSize, useCase }
  }),
};

// Export all APIs as a single object for convenience
const API = {
  audit: auditAPI,
  lead: leadAPI,
  ai: aiAPI,
};

export default API;