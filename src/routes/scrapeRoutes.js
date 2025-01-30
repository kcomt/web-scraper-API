const express = require("express");
const router = express.Router();

const scraperController = require("../controllers/ScraperController");

router.post("/scrape", scraperController.scrape);

module.exports = router;
