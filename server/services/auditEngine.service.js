const pricingData = require("../utils/pricingData");

const generateAudit = (tools = []) => {
  const recommendations = [];

  let totalMonthlySpend = 0;
  let totalMonthlySavings = 0;

  tools.forEach((tool) => {
    const toolName =
      tool.toolName
        ?.toLowerCase()
        .trim()
        .replace(/\s+/g, "");

    const currentPlan =
      tool.currentPlan
        ?.toLowerCase()
        .trim();

    const useCase =
      tool.useCase
        ?.toLowerCase()
        .trim();

    const monthlySpend =
      Number(tool.monthlySpend);

    const seats =
      Number(tool.seats);

    totalMonthlySpend += monthlySpend;

    let recommendation = {
      toolName: tool.toolName,
      currentPlan: tool.currentPlan,
      recommendedPlan: tool.currentPlan,
      monthlySpend,
      monthlySavings: 0,
      annualSavings: 0,
      reason: "Current plan appears cost-efficient.",
    };

    // =========================
    // Get Tool Config
    // =========================

    const toolConfig = pricingData[toolName];

    if (!toolConfig) {
      recommendations.push(recommendation);
      return;
    }

    const currentPlanData =
      toolConfig.plans[currentPlan];

    if (!currentPlanData) {
      recommendations.push(recommendation);
      return;
    }

    // Skip API-style plans
    if (
      currentPlanData.monthlyPricePerSeat === null
    ) {
      // API overspend logic
      if (monthlySpend > 500) {
        const savings = Math.round(
          monthlySpend * 0.15
        );

        recommendation = {
          toolName: tool.toolName,
          currentPlan: tool.currentPlan,
          recommendedPlan:
            "Credits-Based Billing",
          monthlySpend,
          monthlySavings: savings,
          annualSavings: savings * 12,
          reason:
            "High API usage may qualify for discounted infrastructure credits through resellers like Credex.",
        };
      }

      totalMonthlySavings +=
        recommendation.monthlySavings;

      recommendations.push(recommendation);

      return;
    }

    // =========================
    // Find Cheaper Plans
    // =========================

    const cheaperPlans = Object.entries(
      toolConfig.plans
    ).filter(([planKey, plan]) => {
      return (
        plan.monthlyPricePerSeat !== null &&
        plan.monthlyPricePerSeat <
          currentPlanData.monthlyPricePerSeat
      );
    });

    // =========================
    // Recommend Cheapest Plan
    // =========================

    if (cheaperPlans.length > 0) {
      const cheapestPlan = cheaperPlans.sort(
        (a, b) =>
          a[1].monthlyPricePerSeat -
          b[1].monthlyPricePerSeat
      )[0];

      const recommendedPlanData =
        cheapestPlan[1];

      const recommendedCost =
        recommendedPlanData.monthlyPricePerSeat *
        seats;

      const savings =
        monthlySpend - recommendedCost;

      if (savings > 0) {
        recommendation = {
          toolName: tool.toolName,

          currentPlan: tool.currentPlan,

          recommendedPlan:
            recommendedPlanData.name,

          monthlySpend,

          monthlySavings:
            Math.round(savings),

          annualSavings:
            Math.round(savings * 12),

          reason:
            `${tool.toolName} ${tool.currentPlan} may be more expensive than necessary for your current usage.`,
        };
      }
    }

    // =========================
    // Coding Recommendation
    // =========================

    if (
      useCase === "coding" &&
      toolName === "chatgpt" &&
      monthlySpend > 40
    ) {
      recommendation.reason +=
        " Engineering-focused tools like Cursor or Windsurf may provide better coding ROI.";
    }

    totalMonthlySavings +=
      recommendation.monthlySavings;

    recommendations.push(recommendation);
  });

  const totalAnnualSavings =
    totalMonthlySavings * 12;

  const isHighSavingsLead =
    totalMonthlySavings >= 500;

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