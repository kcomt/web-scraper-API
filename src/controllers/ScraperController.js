const ScraperService = require("../service/ScraperService");

const scraperService = new ScraperService();

module.exports = {
  elementScrape: (req, res) => {
    console.log("elementScrape request", req.body);
    scraperService
      .elementScrape(req.body)
      .then((response) => {
        res.json({ data: JSON.parse(response) });
      })
      .catch((error) => {
        console.log(error);
      });
  },

  generalScrape: (req, res) => {
    console.log("generalScrape request", req.body);
  },

  specificScrape: (req, res) => {
    console.log("specificScrape request", req.body);
    scraperService
      .specificScrape(req.body)
      .then((response) => {
        res.json({ data: JSON.parse(response) });
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
