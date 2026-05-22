const Lead = require("../models/Lead");
const Audit = require("../models/Audit");

const createLead = async (req, res) => {
  try {
    const {
      email,
      companyName,
      role,
      teamSize,
      auditId,
    } = req.body;

    // Basic validation
    if (!email || !auditId) {
      return res.status(400).json({
        success: false,
        message: "Email and auditId are required",
      });
    }

    // Verify audit exists
    const auditExists = await Audit.findById(auditId);

    if (!auditExists) {
      return res.status(404).json({
        success: false,
        message: "Associated audit not found",
      });
    }

    // Prevent duplicate leads for same audit
    const existingLead = await Lead.findOne({
      email,
      auditId,
    });

    if (existingLead) {
      return res.status(409).json({
        success: false,
        message: "Lead already captured for this audit",
      });
    }

    // Create lead
    const lead = await Lead.create({
      email,
      companyName,
      role,
      teamSize,
      auditId,
    });

    res.status(201).json({
      success: true,
      message: "Lead captured successfully",
      data: lead,
    });
  } catch (error) {
    console.error("Create Lead Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to capture lead",
    });
  }
};

module.exports = {
  createLead,
};