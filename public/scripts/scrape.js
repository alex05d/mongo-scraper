// var request = require("request");
var axios = require("axios")
var cheerio = require("cheerio");

var scrape = function (cb) {

    return axios.get("http://www.nytimes.com").then(function (res) {


        var $ = cheerio.load(res.data);
        var articles = [];
        // console.log("this is the scrape", res.data);

        $(".assetWrapper").each(function (i, element) {
            var head = $(this)
                .find("h2")
                .text()
                .trim();

            // console.log("this is the head" + head);

            // Grab the URL of the article
            var url = $(this)
                .find("a")
                .attr("href");

            // Grab the summary of the article
            var sum = $(this)
                .find("p")
                .text()
                .trim();
            if (head && sum && url) {
                var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
                var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

                var dataToAdd = {
                    headline: headNeat,
                    summary: sumNeat,
                    url: "http://www.nytimes.com" + url
                };

                articles.push(dataToAdd);
                // console.log("this is the data to add", dataToAdd);
            }
        });
        return cb(articles);
    });
};

module.exports = scrape;