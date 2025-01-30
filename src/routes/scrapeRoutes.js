const express = require("express");
const router = express.Router();
const { validateApiKey } = require("../middleware/authMiddleware");
const { apiLimiter } = require("../middleware/rateLimiter");

const scraperController = require("../controllers/ScraperController");

router.post("/scrape", validateApiKey, apiLimiter, scraperController.scrape);

module.exports = router;
