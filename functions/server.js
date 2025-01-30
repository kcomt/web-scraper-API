const scrapeRoutes = require("../src/routes/scrapeRoutes");
const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");

const app = express();

// Middleware
const corsOptions = {
  origin: "https://rapidapi.com",
  methods: "GET,POST",
  allowedHeaders: ["x-api-key"],
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use("/", scrapeRoutes);

module.exports.handler = serverless(app);
