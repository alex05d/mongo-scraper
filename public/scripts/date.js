
var makeDate = function () {
    var d = new Date();
    var fomattedDate = "";

    formattedDate += (d.getMonth() + 1) + "_";

    formattedDate += d.getDate() + "_";

    formattedDate += d.getFullYear();

    return formattedDate;
};

module.exports = makeDate;