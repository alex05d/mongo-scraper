var express = require("express");
var expressHandlebars = require("express-handlebars");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var PORT = process.env.PORT || 5000;

var app = express();

var router = express.Router();

require("./config/routes")(router);

app.use(express.static(__dirname + "/public"));

// var exphbs = require("express-handlebars");


// app.use(logger("dev"));


// app.use(express.json());


app.engine("handlebars", expressHandlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(bodyParser.urlencoded({ extended: false }));

// var routes = require("./controllers/mongo-scraper");

app.use(router);

var db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(db, function (error) {

    if (error) {
        console.log(error);
    }
    else {
        console.log("mongoose connection is successful");
    }
});
// mongoose.connect("mongodb://localhost/mongoScraper", { useNewUrlParser: true });

// app.get("/", function (req, res) {
//     res.redirect("/articles");
// });


// app.get("/scrape", function (req, res) {

//     axios.get("https://www.cnet.com/news/").then(function (response) {
//         console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');

//         var $ = cheerio.load(response.data);

//         $(".assetText h3").each(function (i, element) {

//             var result = {};

//             console.log("this is the scrape ", result);

//             result.title = $(this)
//                 .children("a")
//                 .text()
//                 .trim();
//             result.link = $(this)
//                 .children("a")
//                 .attr("href");
//             if (i === 0) console.log(result);

//             db.Article.create(result)
//                 .then(function (dbArticle) {
//                     console.log('its worked');
//                 })
//                 .catch(function (err) {
//                 });
//         });
//         res.send("Scrape Complete");
//     });
// });

// app.get("/articles", function (req, res) {

//     db.Article.find({})
//         .then(function (dbArticle) {
//             // res.json(dbArticle);
//             console.log(dbArticle)
//             res.render("index", { articles: dbArticle })
//         })
//         .catch(function (err) {
//             res.json(err);
//         });
// });

// app.get("/articles/:id", function (req, res) {
//     db.Article.findOne({ _id: req.params.id })
//         .populate("note")
//         .then(function (dbArticle) {
//             // res.json(dbArticle);
//             console.log("!!!!!!!!!!!!!!!!!", dbArticle);
//             res.render("articles", { articles: dbArticle })
//         })
//         .catch(function (err) {
//             res.json(err);
//         });
// });

// app.post("/articles/:id", function (req, res) {
//     console.log(req.body)
//     db.Note.create(req.body)
//         .then(function (dbNote) {
//             return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
//         })
//         .then(function (dbArticle) {
//             // res.render("articles", { articles: dbArticle })
//             res.json(dbArticle);
//         })
//         .catch(function (err) {
//             res.json(err);
//         });
// });


app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});