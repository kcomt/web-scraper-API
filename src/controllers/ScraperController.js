const ScraperService = require("../service/ScraperService");

const scraperService = new ScraperService();

module.exports = {
  scrape: (req, res) => {
    scraperService
      .scrape(req.body)
      .then((response) => {
        res.json(JSON.parse(response));
      })
      .catch(() => {
        res.status(500).json({ error: "Failed to scrape the requested page." });
      });
  },
};
