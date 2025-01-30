const cheerio = require("cheerio");
const axios = require("axios");

class ScraperService {
  constructor() {
    this.scrapeList = this.scrapeList.bind(this);
    this.scrapeObject = this.scrapeObject.bind(this);
    this.scrapeText = this.scrapeText.bind(this);
    this.scrapeImage = this.scrapeImage.bind(this);
    this.scrapeNodeText = this.scrapeNodeText.bind(this);
  }

  scrapeList = ($, base, objSelector, bool) => {
    let selector = [];
    $(base).each((index, element) => {
      if (bool) {
        //console.log("index", index, base, objSelector, $(element).html());
        $(element).each((index2) => {
          //console.log("index2", $(element).text());
        });
      }

      let obj = {};
      let selectorInfo = objSelector;
      if (selectorInfo.type === "text") {
        //console.log("goes here 1", $(element));

        obj = this.scrapeText($, element);
      } else if (selectorInfo.type === "img") {
        obj = this.scrapeImage(
          $,
          element,
          selectorInfo.base,
          selectorInfo.srcType
        );
      } else if (selectorInfo.type === "object") {
        obj = this.scrapeObject(
          $,
          element,
          selectorInfo.base,
          selectorInfo.selectors
        );
      } else if (selectorInfo.type === "list") {
        console.log(
          "index: ",
          index,
          " selectorInfo.base: ",
          selectorInfo.base
        );
        obj = this.scrapeList(
          $,
          selectorInfo.base != ""
            ? $(element).find(selectorInfo.base)
            : element,
          selectorInfo.selectors
        );
      } else if (selectorInfo.type === "node-text") {
        obj = this.scrapeNodeText($, element, selectorInfo.base);
      }

      selector.push(obj);
    });
    return selector;
  };

  scrapeObject = ($, element, base, objectSelectors) => {
    if (element) {
      let obj = {};
      console.log("base", objectSelectors);
      for (let key in objectSelectors) {
        let selectorInfo = objectSelectors[key];
        if (selectorInfo.type === "text") {
          obj[key] = this.scrapeText(
            $,
            selectorInfo.base != ""
              ? $(element).find(selectorInfo.base)
              : element
          );
        } else if (selectorInfo.type === "img") {
          obj[key] = this.scrapeImage(
            $,
            selectorInfo.base,
            selectorInfo.srcType
          );
        } else if (selectorInfo.type === "object") {
          obj[key] = this.scrapeObject(
            $,
            element,
            base,
            selectorInfo.selectors
          );
        } else if (selectorInfo.type === "list") {
          obj[key] = this.scrapeList(
            $,
            selectorInfo.base != ""
              ? $(element).find(selectorInfo.base)
              : element,
            selectorInfo.selectors,
            true
          );
        } else if (selectorInfo.type === "node-text") {
          obj[key] = this.scrapeNodeText($, element, selectorInfo.base);
        }
      }
      return obj;
    } else {
      let obj = {};
      for (let key in objectSelectors) {
        let selectorInfo = objectSelectors[key];
        if (selectorInfo.type === "text") {
          obj[key] = this.scrapeText($, $(base).find(selectorInfo.base));
        } else if (selectorInfo.type === "img") {
          obj[key] = this.scrapeImage(
            $,
            selectorInfo.base,
            selectorInfo.srcType
          );
        } else if (selectorInfo.type === "object") {
          obj[key] = this.scrapeObject($, false, base, selectorInfo.selectors);
        } else if (selectorInfo.type === "list") {
          obj[key] = this.scrapeList(
            $,
            selectorInfo.base,
            selectorInfo.selectors
          );
        } else if (selectorInfo.type === "node-text") {
          obj[key] = this.scrapeNodeText($, $(base), selectorInfo.base);
        }
      }
      return obj;
    }
  };

  scrapeText = ($, element) => {
    return $(element).text().replace(/\n/g, "");
  };

  scrapeNodeText = ($, element, base) => {
    // Gets the source text from an element that has other element childre
    if (base) {
      return $(element).find(base).clone().children().remove().end().text();
    } else {
      return $(element).clone().children().remove().end().text();
    }
  };

  scrapeImage = ($, element, srcType, imageClass) => {
    if (imageClass != null) {
      return $(element).find(imageClass).attr(srcType) || "";
    } else {
      return $(element).attr(srcType) || "";
    }
  };

  async scrape(task) {
    console.log("task", task);
    const returnObject = {};

    const axiosResponse = await axios.request({
      method: "GET",
      url: task.config.url,
      headers: task.config.headers
        ? {
            Cookie: task.config.headers.cookie,
            "Content-Type": task.config.headers.content_type,
            "User-Agent": task.config.headers.user_agent,
          }
        : {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
          },
    });

    const $ = cheerio.load(axiosResponse.data);

    for (var attributename in task.data) {
      var selector = "";
      if (task.data[attributename]["type"] == "text") {
        selector = this.scrapeText($, task.data[attributename].base);
      } else if (task.data[attributename]["type"] == "node-text") {
        obj[key] = this.scrapeNodeText($, task.data[attributename]["base"]);
      } else if (task.data[attributename]["type"] == "list") {
        selector = this.scrapeList(
          $,
          task.data[attributename]["base"],
          task.data[attributename]["selectors"],
          true
        );
      } else if (task.data[attributename]["type"] == "object") {
        selector = this.scrapeObject(
          $,
          false,
          task.data[attributename]["base"],
          task.data[attributename]["selectors"]
        );
      } else if (task.data[attributename]["type"] == "img") {
        selector = this.scrapeImage(
          $,
          task.data[attributename]["base"],
          task.data[attributename]["srcType"]
        );
      } else {
        selector = "";
      }
      returnObject[attributename] = selector;
    }

    const scrapedDataJSON = JSON.stringify(returnObject);
    return scrapedDataJSON;
  }
}

module.exports = ScraperService;
