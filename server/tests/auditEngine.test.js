const {
  generateAudit,
} = require("../services/auditEngine.service");

describe("Audit Engine", () => {
  test("should recommend Cursor Pro for small teams on Business plan", () => {
    const tools = [
      {
        toolName: "cursor",
        currentPlan: "business",
        monthlySpend: 200,
        seats: 4,
        useCase: "coding",
      },
    ];

    const result = generateAudit(tools);

    expect(
      result.recommendations[0].recommendedPlan
    ).toBe("pro");
  });

  test("should calculate monthly savings correctly", () => {
    const tools = [
      {
        toolName: "chatgpt",
        currentPlan: "team",
        monthlySpend: 60,
        seats: 2,
        useCase: "research",
      },
    ];

    const result = generateAudit(tools);

    expect(result.totalMonthlySavings).toBe(20);
  });

  test("should mark high savings leads correctly", () => {
    const tools = [
      {
        toolName: "openaiApi",
        currentPlan: "direct",
        monthlySpend: 5000,
        seats: 1,
        useCase: "mixed",
      },
    ];

    const result = generateAudit(tools);

    expect(result.isHighSavingsLead).toBe(true);
  });

  test("should return annual savings correctly", () => {
    const tools = [
      {
        toolName: "openaiApi",
        currentPlan: "direct",
        monthlySpend: 1000,
        seats: 1,
        useCase: "research",
      },
    ];

    const result = generateAudit(tools);

    expect(result.totalAnnualSavings).toBe(
      result.totalMonthlySavings * 12
    );
  });

  test("should not recommend changes for already optimized plans", () => {
    const tools = [
      {
        toolName: "cursor",
        currentPlan: "pro",
        monthlySpend: 20,
        seats: 1,
        useCase: "coding",
      },
    ];

    const result = generateAudit(tools);

    expect(
      result.recommendations[0].monthlySavings
    ).toBe(0);
  });
});