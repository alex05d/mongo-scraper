

var scrape = require("../public/scripts/scrape");
var makeDate = require("../public/scripts/date");

var Headline = require("../models/headline");

module.exports = {
    fetch: function (cb) {
        // console.log(cb);
        scrape(function (data) {
            console.log("this is the data from the scrape", data);
            var articles = data;
            for (var i = 0; i < articles.lenght; i++) {
                articles[i].date = makeDate();
                articles[i].saved = false;
            }
            Headline.collection.insertMany(articles, { ordered: false }, function (err, docs) {
                cb(err, docs);
            });
        });
    },
    delete: function (query, cb) {
        Headline.remove(query, cb);
    },
    get: function (query, cb) {
        Headline.find(query)
            .sort({
                _id: -1
            })
            .exec(function (err, doc) {
                cb(doc);
            });
    },
    update: function (query, cb) {
        Headline.update({ _id: query._id }, {
            $set: query
        }, {}, cb);
    }
}