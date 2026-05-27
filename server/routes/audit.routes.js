const express = require("express");

const router = express.Router();

const {
  createAudit,
  getPublicAudit,
  getPricingData,
} = require("../controllers/audit.controller");

const validate = require("../middleware/validate.middleware");

const {
  auditSchema,
} = require("../validators/audit.validator");

router.post(
  "/",
  validate(auditSchema),
  createAudit
);

router.get("/pricing/data", getPricingData);

router.get("/:shareId", getPublicAudit);

module.exports = router;