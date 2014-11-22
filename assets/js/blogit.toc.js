var add_toc = false;
var ToC =
        "<nav role='navigation' class='table-of-contents'>" +
        "<h2>Table of Contents</h2>" +
        "<ul>";

var newLine, el, title, link;

$("article h2").each(function() {

    el = $(this);
    title = el.text();
    link = "#" + el.attr("id");

    newLine =
        "<li>" +
        "<a href='" + link + "'>" +
        title +
        "</a>" +
        "</li>";

    ToC += newLine;

    add_toc = true;
});

ToC += "</ul>" + "</nav>";
//var ToC_Full = "";
//if (ToC) {
//    ToC_Full = TOC_Header + Toc +"</ul></nav>";
//}

if (add_toc == false) {
    ToC = "";
}

$(".table-of-contents").prepend(ToC);
