const express = require("express");
const router = express.Router();
const { apiLimiter } = require("../middleware/rateLimiter");

const scraperController = require("../controllers/ScraperController");

router.post("/scrape", apiLimiter, scraperController.scrape);

module.exports = router;
