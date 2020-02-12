$(document).ready(function () {
    console.log("page loaded!!");

    var articleContainer = $(".article-container");
    $(document).on("click", ".btn.save", handleArticleSave);
    $(document).on("click", ".scrape-new", handleArticleScrape);

    initPage();

    function initPage() {

        articleContainer.empty();

        $.get("/api/headlines?saved:false")
            .then(function (data) {

                // console.log(data);
                if (data && data.length) {
                    renderArticles(data);
                }
                else {

                    renderEmpty();
                }
            });
    }

    function renderArticles(data) {

        var articlePanels = [];

        for (var i = 0; i < data.length; i++) {
            articlePanels.push(createPanel(data[i]));
        }
        articleContainer.append(articlePanels);
    }

    function createPanel(data) {
        console.log("create panel", data);
        var panel =
            $(["<div class='panel panel-default'>",
                "<div class='panel-heading'>",
                "<h3>",
                data.headline,
                "<a class='btn btn-success save'>",
                "Save Article",
                "</a>",
                "</h3>",
                "</div>",
                "<div class='panel-body'>",
                data.summary,
                "</div>",
                "</div>"
            ].join(""));

        panel.data("_id", data._id);

        return panel;
    }

    function renderEmpty() {

        var emptyAlert =
            $(["<div class='alert alert-warning text-center'>",
                "<h4>Uh oh, looks like we don't have any new articles.</h4>",
                "</div>",
                "<div class='panel panel-default'>",
                "<div class='panel-heading text-center'>",
                "<h3>What would you like to do?</h3>",
                "</div>",
                "<div class='panel-body text-center'>",
                "<h4><a class='scrape-new'>Try Scraping New Articles</a></h4>",
                "<h4><a href='/saved'>Go to Saved Articles</a></h4>",
                "</div>",
                "</div>"
            ].join(""));
        articleContainer.append(emptyAlert);
    }

    function handleArticleSave() {

        var articleToSave = $(this).parents(".panel").data();
        articleToSave.saved = true;

        console.log("this is the articel to save", articleToSave);

        $.ajax({
            method: "PATCH",
            url: "/api/headlines",
            data: articleToSave
        })
            .then(function (data) {
                if (data.ok) {
                    initPage();
                }
            });
    }

    function handleArticleScrape() {
        $.get("/api/fetch")
            .then(function (data) {
                initPage();
                alert("<h3 class='text-center m-top-80>" + data.message + "<h3>");
            });
    }



});