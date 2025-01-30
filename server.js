require("dotenv").config();
const express = require("express");
const cors = require("cors");
const scrapeRoutes = require("./src/routes/scrapeRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const corsOptions = {
  origin: "https://rapidapi.com", // Allow only RapidAPI
  methods: "GET,POST",
  allowedHeaders: ["x-rapidapi-key"],
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use("/", scrapeRoutes);

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
