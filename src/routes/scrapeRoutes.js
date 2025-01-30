const express = require("express");
const router = express.Router();

const scraperController = require("../controllers/ScraperController");

router.get("/general-scrape", scraperController.generalScrape);
router.post("/specific-scrape", scraperController.specificScrape);
router.post("/element-scrape", scraperController.elementScrape);

module.exports = router;
