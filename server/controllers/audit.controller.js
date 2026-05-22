const crypto = require("crypto");

const Audit = require("../models/Audit");

const {
  generateAudit,
} = require("../services/auditEngine.service");

const createAudit = async (req, res) => {
  try {
    const { tools } = req.body;

    if (!tools || !Array.isArray(tools) || tools.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Tools data is required",
      });
    }

    // Generate audit recommendations
    const auditResult = generateAudit(tools);

    // Create unique public share ID
    const publicShareId = crypto.randomBytes(8).toString("hex");

    // Save audit
    const audit = await Audit.create({
      tools,

      recommendations: auditResult.recommendations,

      totalMonthlySpend: auditResult.totalMonthlySpend,

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
  } catch (error) {
    console.error("Create Audit Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to generate audit",
    });
  }
};

const getPublicAudit = async (req, res) => {
  try {
    const { shareId } = req.params;

    const audit = await Audit.findOne({
      publicShareId: shareId,
    });

    if (!audit) {
      return res.status(404).json({
        success: false,
        message: "Audit not found",
      });
    }

    res.status(200).json({
      success: true,
      data: audit,
    });
  } catch (error) {
    console.error("Get Audit Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch audit",
    });
  }
};

module.exports = {
  createAudit,
  getPublicAudit,
};