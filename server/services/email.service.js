const { Resend } = require("resend");

const resend = new Resend(
  process.env.RESEND_API_KEY
);

const sendAuditConfirmationEmail = async ({
  email,
  totalMonthlySavings,
  totalAnnualSavings,
  isHighSavingsLead,
}) => {
  try {
    const response = await resend.emails.send({
  from: "onboarding@resend.dev",

  to: email,

  subject: "Your AI Spend Audit Report",

  html: `
    <h2>AI Spend Audit Completed</h2>

    <p>
      Your audit identified estimated savings of
      <strong>$${totalMonthlySavings}/month</strong>
      and
      <strong>$${totalAnnualSavings}/year</strong>.
    </p>

    ${
      isHighSavingsLead
        ? `
      <p>
        Our team may reach out with additional
        optimization recommendations.
      </p>
    `
        : ""
    }

    <p>
      Thanks for using AI Spend Audit.
    </p>
  `,
});

console.log(response);



    console.log("Email sent successfully");
  } catch (error) {
    console.error(
      "Resend Email Error:",
      error.message
    );
  }
};

module.exports = {
  sendAuditConfirmationEmail,
};