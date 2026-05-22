const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    companyName: {
      type: String,
      trim: true,
    },

    role: {
      type: String,
      trim: true,
    },

    teamSize: {
      type: Number,
      default: 1,
    },

    auditId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Audit",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Lead", leadSchema);