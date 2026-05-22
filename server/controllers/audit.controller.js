const crypto = require("crypto");

const Audit = require("../models/Audit");

const asyncHandler = require("../utils/asyncHandler");

const {
  generateAudit,
} = require("../services/auditEngine.service");

const createAudit = asyncHandler(async (req, res) => {
  const { tools } = req.body;

  const auditResult = generateAudit(tools);

  const publicShareId = crypto
    .randomBytes(8)
    .toString("hex");

  const audit = await Audit.create({
    tools,

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

module.exports = {
  createAudit,
  getPublicAudit,
};