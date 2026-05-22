const pricingData = require("../utils/pricingData");

const generateAudit = (tools = []) => {
  const recommendations = [];

  let totalMonthlySpend = 0;
  let totalMonthlySavings = 0;

  tools.forEach((tool) => {
    const {
      toolName,
      currentPlan,
      monthlySpend,
      seats,
      useCase,
    } = tool;

    totalMonthlySpend += monthlySpend;

    let recommendation = {
      toolName,
      currentPlan,
      recommendedPlan: currentPlan,
      monthlySavings: 0,
      annualSavings: 0,
      reason: "Current plan appears cost-efficient.",
    };

    // =========================
    // Cursor Logic
    // =========================
    if (toolName === "cursor") {
      if (currentPlan === "business" && seats <= 5) {
        const recommendedCost =
          pricingData.cursor.plans.pro.monthlyPricePerSeat *
          seats;

        const savings = monthlySpend - recommendedCost;

        if (savings > 0) {
          recommendation = {
            toolName,
            currentPlan,
            recommendedPlan: "pro",
            monthlySavings: savings,
            annualSavings: savings * 12,
            reason:
              "Cursor Business may be unnecessary for smaller engineering teams.",
          };
        }
      }
    }

    // =========================
    // ChatGPT Logic
    // =========================
    if (toolName === "chatgpt") {
      if (currentPlan === "team" && seats <= 2) {
        const recommendedCost =
          pricingData.chatgpt.plans.plus.monthlyPricePerSeat *
          seats;

        const savings = monthlySpend - recommendedCost;

        if (savings > 0) {
          recommendation = {
            toolName,
            currentPlan,
            recommendedPlan: "plus",
            monthlySavings: savings,
            annualSavings: savings * 12,
            reason:
              "ChatGPT Team features may not justify the additional cost for very small teams.",
          };
        }
      }
    }

    // =========================
    // Claude Logic
    // =========================
    if (toolName === "claude") {
      if (currentPlan === "team" && seats <= 3) {
        const recommendedCost =
          pricingData.claude.plans.pro.monthlyPricePerSeat *
          seats;

        const savings = monthlySpend - recommendedCost;

        if (savings > 0) {
          recommendation = {
            toolName,
            currentPlan,
            recommendedPlan: "pro",
            monthlySavings: savings,
            annualSavings: savings * 12,
            reason:
              "Claude Team is often unnecessary unless collaboration features are actively used.",
          };
        }
      }
    }

    // =========================
    // API Overspend Logic
    // =========================
    if (
      toolName === "openaiApi" ||
      toolName === "anthropicApi"
    ) {
      if (monthlySpend > 500) {
        const savings = Math.round(monthlySpend * 0.15);

        recommendation = {
          toolName,
          currentPlan,
          recommendedPlan: "credits-based billing",
          monthlySavings: savings,
          annualSavings: savings * 12,
          reason:
            "High API usage may qualify for discounted infrastructure credits through resellers like Credex.",
        };
      }
    }

    // =========================
    // Mixed Tool Optimization
    // =========================
    if (
      useCase === "coding" &&
      toolName === "chatgpt" &&
      monthlySpend > 40
    ) {
      recommendation.reason +=
        " Engineering-focused tools like Cursor or Windsurf may provide better coding ROI.";
    }

    totalMonthlySavings += recommendation.monthlySavings;

    recommendations.push(recommendation);
  });

  const totalAnnualSavings = totalMonthlySavings * 12;

  const isHighSavingsLead = totalMonthlySavings >= 500;

  return {
    recommendations,
    totalMonthlySpend,
    totalMonthlySavings,
    totalAnnualSavings,
    isHighSavingsLead,
  };
};

module.exports = {
  generateAudit,
};