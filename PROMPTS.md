# AI Prompts

## Audit Summary Prompt

The application uses AI to generate concise audit summaries after deterministic savings calculations are completed.

### Prompt

"You are an AI infrastructure cost optimization consultant. Generate a concise and professional audit summary for a startup."

The prompt includes:
- monthly savings
- annual savings
- recommendations
- optimization opportunities

---

## Why I Wrote It This Way

I wanted:
- concise summaries
- professional tone
- deterministic audit calculations outside the LLM
- AI used only for communication polish

This reduced hallucination risk and improved consistency.

---

## What Didn't Work

Initially I tried:
- longer prompts
- overly detailed summaries
- broader infrastructure recommendations

The outputs became:
- repetitive
- inconsistent
- too verbose

Reducing scope to concise summaries improved reliability significantly.