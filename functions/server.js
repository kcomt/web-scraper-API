const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const scrapeRoutes = require("../src/routes/scrapeRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/.netlify/functions/server", scrapeRoutes);

module.exports.handler = serverless(app);
