const ScraperService = require("../service/ScraperService");

const scraperService = new ScraperService();

module.exports = {
  scrape: (req, res) => {
    console.log("scrape request", req.body);
    scraperService
      .scrape(req.body)
      .then((response) => {
        res.json(JSON.parse(response));
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
