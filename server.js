var express = require("express");
var expressHandlebars = require("express-handlebars");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var PORT = process.env.PORT || 5000;

var app = express();

var router = express.Router();

require("./config/routes")(router);

app.use(express.static(__dirname + "/public"));

// mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);


app.engine("handlebars", expressHandlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(bodyParser.urlencoded({ extended: false }));


app.use(router);

// var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// mongoose.connect(MONGODB_URI);


mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines", { useNewUrlParser: true })
    .then(connect => console.log('connected to mongodb..'))
    .catch(e => console.log('could not connect to mongodb', e))

// mongoose.connect(db, function (error) {

//     if (error) {
//         console.log(error);
//     }
//     else {
//         console.log("mongoose connection is successful");
//     }
// });


app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});