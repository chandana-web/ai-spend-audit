const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");


const connectDB = require("./config/db");
const errorHandler = require("./middleware/error.middleware");
const auditRoutes = require("./routes/audit.routes");
const leadRoutes = require("./routes/lead.routes");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());



app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
  });
});
app.use("/api/audit", auditRoutes);
app.use("/api/leads", leadRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5055;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});