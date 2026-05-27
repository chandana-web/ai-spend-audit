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
  // Create audit based on user inputs
  // Required data: { tools: [...], teamSize, useCase }
  createAudit: (data) => apiClient.post('/audit', data),
  
  // Calculate audit (alias for createAudit for consistency)
  calculateAudit: (data) => apiClient.post('/audit', data),
  
  // Get audit by share ID (for public share links)
  // Returns publicly shared audit data
  getSharedAudit: (shareId) => apiClient.get(`/audit/${shareId}`),
  
  // Get pricing data for tools
  getPricingData: () => apiClient.get('/audit/pricing/data'),
};

// AI Summary API endpoints
export const aiAPI = {
  // Generate AI summary for audit results
  generateSummary: (data) => apiClient.post('/ai/summary', data),
};

// Lead capture API endpoints
export const leadAPI = {
  // Capture lead with email and audit details
  // Required data: { email, companyName, role, teamSize, auditResult }
  captureLead: (data) => apiClient.post('/leads', data),
};

// Export all APIs as a single object for convenience
const API = {
  audit: auditAPI,
  ai: aiAPI,
  lead: leadAPI,
};

export default API;