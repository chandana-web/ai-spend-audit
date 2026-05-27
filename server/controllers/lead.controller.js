const Lead = require("../models/Lead");

const Audit = require("../models/Audit");

const asyncHandler = require("../utils/asyncHandler");

const {
  sendAuditConfirmationEmail,
} = require("../services/email.service");

const createLead = asyncHandler(
  async (req, res) => {
    const {
      email,
      companyName,
      role,
      teamSize,
      auditId,
    } = req.body;

    const auditExists =
      await Audit.findById(auditId);

    if (!auditExists) {
      const error = new Error(
        "Associated audit not found"
      );

      error.statusCode = 404;

      throw error;
    }

    const existingLead =
      await Lead.findOne({
        email,
        auditId,
      });

    if (existingLead) {
      const error = new Error(
        "Lead already captured for this audit"
      );

      error.statusCode = 409;

      throw error;
    }

    const lead = await Lead.create({
      email,
      companyName,
      role,
      teamSize,
      auditId,
    });

    // Send confirmation email
    await sendAuditConfirmationEmail({
      email,

      totalMonthlySavings:
        auditExists.totalMonthlySavings,

      totalAnnualSavings:
        auditExists.totalAnnualSavings,

      isHighSavingsLead:
        auditExists.isHighSavingsLead,
    });

    res.status(201).json({
      success: true,

      message: "Lead captured successfully",

      data: lead,
    });
  }
);

module.exports = {
  createLead,
};