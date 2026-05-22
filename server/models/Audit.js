const mongoose = require("mongoose");

const toolSchema = new mongoose.Schema(
  {
    toolName: {
      type: String,
      required: true,
    },

    currentPlan: {
      type: String,
      required: true,
    },

    monthlySpend: {
      type: Number,
      required: true,
    },

    seats: {
      type: Number,
      required: true,
      default: 1,
    },

    useCase: {
      type: String,
      enum: ["coding", "writing", "research", "data", "mixed"],
      required: true,
    },
  },
  { _id: false }
);

const recommendationSchema = new mongoose.Schema(
  {
    toolName: String,

    currentPlan: String,

    recommendedPlan: String,

    monthlySavings: Number,

    annualSavings: Number,

    reason: String,
  },
  { _id: false }
);

const auditSchema = new mongoose.Schema(
  {
    tools: [toolSchema],

    recommendations: [recommendationSchema],

    totalMonthlySpend: {
      type: Number,
      required: true,
    },

    totalMonthlySavings: {
      type: Number,
      required: true,
    },

    totalAnnualSavings: {
      type: Number,
      required: true,
    },

    aiSummary: {
      type: String,
      default: "",
    },

    isHighSavingsLead: {
      type: Boolean,
      default: false,
    },

    publicShareId: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Audit", auditSchema);