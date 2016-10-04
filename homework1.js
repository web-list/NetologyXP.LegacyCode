
// исполь
function beginLoadURL(url, container, test) {
 return test ? true : loadURL(url, container);
}

function checkURL(test) {

    //get the url by removing the hash
    var url = location.hash.replace(/^#/, '');

    container = $('#content');
    // Do this if url exists (for page refresh, etc...)
    if (url) {
        // remove all active class
        $('nav li.active').removeClass("active");
        // match the url and add the active class
        $('nav li:has(a[href="' + url + '"])').addClass("active");
        var title = ($('nav a[href="' + url + '"]').attr('title'))

        // change page title from global var
        document.title = (title || document.title);
        //console.log("page title: " + document.title);

        // parse url to jquery
        // здесь имеет место быть шов, так как loadURL() не определена в "понятном" нам коде
        // для разрыва зависимости используем функцию beginLoadUrl, которая в случае
        // если параметр test = true, всегда возвращает true
        beginLoadURL(url + location.search, container, test);
    } else {

        // grab the first URL from nav
        var $this = $('nav > ul > li:first-child > a[href!="#"]');

        //update hash
        window.location.hash = $this.attr('href');

    }

}

// тест
function assert() {
    checkURL(true);
}

// запуск теста
assert();