const crypto = require("crypto");
const {
  generateAISummary,
} = require("../services/aiSummary.service");

const Audit = require("../models/Audit");

const asyncHandler = require("../utils/asyncHandler");

const pricingData = require("../utils/pricingData");

const {
  generateAudit,
} = require("../services/auditEngine.service");

const createAudit = asyncHandler(async (req, res) => {
  const { tools, teamSize, useCase } = req.body;

  const auditResult = generateAudit(tools);

  const aiSummary =
  await generateAISummary({
    recommendations:
      auditResult.recommendations,

    totalMonthlySavings:
      auditResult.totalMonthlySavings,

    totalAnnualSavings:
      auditResult.totalAnnualSavings,
  });

  const publicShareId = crypto
    .randomBytes(8)
    .toString("hex");

  const audit = await Audit.create({
    tools,
    teamSize,
    useCase,
    recommendations:
      auditResult.recommendations,

    totalMonthlySpend:
      auditResult.totalMonthlySpend,

    totalMonthlySavings:
      auditResult.totalMonthlySavings,

    totalAnnualSavings:
      auditResult.totalAnnualSavings,

    isHighSavingsLead:
      auditResult.isHighSavingsLead,

    publicShareId,
    aiSummary,
  });

  res.status(201).json({
    success: true,

    message: "Audit generated successfully",

    data: audit,
  });
});

const getPublicAudit = asyncHandler(
  async (req, res) => {
    const { shareId } = req.params;

    const audit = await Audit.findOne({
      publicShareId: shareId,
    });

    if (!audit) {
      const error = new Error("Audit not found");

      error.statusCode = 404;

      throw error;
    }

    res.status(200).json({
      success: true,
      data: audit,
    });
  }
);

const getPricingData = asyncHandler(
  async (req, res) => {
    // Transform pricing data to match frontend format
    const transformedData = {};
    
    Object.entries(pricingData).forEach(([key, toolData]) => {
      transformedData[toolData.displayName] = {
        plans: Object.values(toolData.plans).map(plan => plan.name)
      };
    });

    res.status(200).json({
      success: true,
      data: transformedData,
    });
  }
);

module.exports = {
  createAudit,
  getPublicAudit,
  getPricingData,
};