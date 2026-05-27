# Reflection

## Challenges Faced

### AI API Quota Limits

During development, OpenAI quota limitations caused intermittent summary generation failures.

To improve resilience, graceful fallback summaries were implemented to ensure uninterrupted audit functionality.

---

### Shareable Public Routes

Careful filtering was required to avoid exposing sensitive lead information in public audit pages.

Only audit recommendations and savings metrics are exposed publicly.

---

### Deployment Coordination

Coordinating frontend deployment on Vercel with backend deployment on Render required environment variable synchronization and CORS configuration.

---

## What I Would Improve

If given more time, I would add:

- Dynamic Open Graph image generation
- Email delivery analytics
- More advanced audit recommendation logic
- Admin dashboard for lead management
- Automated CI/CD testing pipeline