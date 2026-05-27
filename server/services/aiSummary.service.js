const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateAISummary = async ({
  recommendations,
  totalMonthlySavings,
  totalAnnualSavings,
}) => {
  try {
    const prompt = `
You are an AI infrastructure cost optimization consultant.

Generate a concise and professional audit summary for a startup.

Audit Findings:
- Monthly Savings: $${totalMonthlySavings}
- Annual Savings: $${totalAnnualSavings}

Recommendations:
${recommendations
  .map(
    (rec) =>
      `- ${rec.toolName}: switch from ${rec.currentPlan} to ${rec.recommendedPlan}. Reason: ${rec.reason}`
  )
  .join("\n")}

Requirements:
- Maximum 100 words
- Professional tone
- Mention whether spending is efficient or inefficient
- Mention major optimization opportunities
- Encourage smarter AI infrastructure decisions
`;

    const response =
      await client.chat.completions.create({
        model: "gpt-4o-mini",

        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],

        temperature: 0.7,

        max_tokens: 150,
      });

    return response.choices[0].message.content;
  } catch (error) {
    console.error(
      "AI Summary Generation Error:",
      error.message
    );

    // graceful fallback
    return `
Your AI tooling stack shows an estimated monthly savings opportunity of $${totalMonthlySavings}, equivalent to approximately $${totalAnnualSavings} annually. Several optimization opportunities were identified across your current subscriptions and usage patterns.
`;
  }
};

module.exports = {
  generateAISummary,
};