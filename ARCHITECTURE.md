# Architecture Decisions

## Backend Architecture

The backend follows a layered architecture:

- Routes handle endpoint registration
- Controllers manage request/response flow
- Services contain reusable business logic
- Models define MongoDB schemas
- Middleware handles validation, rate limiting, and errors

This separation improves maintainability and scalability.

---

## AI Integration

AI summaries are generated separately from audit calculations.

The audit engine itself does not rely on AI, ensuring deterministic recommendations and predictable outputs.

Graceful fallback summaries are returned if AI APIs fail.

---

## Abuse Protection

Implemented:
- Express rate limiting
- Honeypot hidden form field

Chosen because:
- lightweight
- no user friction
- sufficient for MVP stage

---

## Public Share URLs

Public audit pages intentionally exclude:
- email
- company name
- lead information

Only recommendations and savings metrics are exposed publicly.

---

## Deployment Choices

- Vercel for frontend deployment
- Render for backend APIs
- MongoDB Atlas for managed cloud database

These platforms provided fast deployment and free-tier scalability for MVP development.