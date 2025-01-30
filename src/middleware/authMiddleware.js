const dotenv = require("dotenv");
dotenv.config();

exports.validateApiKey = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey) {
    return res.status(401).json({ error: "API Key missing" });
  }

  // Verify API Key from RapidAPI
  if (apiKey !== process.env.API_KEY) {
    return res.status(403).json({ error: "Invalid API Key" });
  }

  next();
};
