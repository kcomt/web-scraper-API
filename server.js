require("dotenv").config();
const express = require("express");
const cors = require("cors");
const scrapeRoutes = require("./src/routes/scrapeRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/", scrapeRoutes);

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
