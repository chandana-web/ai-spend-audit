const express = require("express");

const router = express.Router();

const {
  createLead,
} = require("../controllers/lead.controller");

const validate = require("../middleware/validate.middleware");

const {
  leadSchema,
} = require("../validators/lead.validator");

router.post(
  "/",
  validate(leadSchema),
  createLead
);

module.exports = router;