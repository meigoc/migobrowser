(function() {
    var links = $(".header-block__right .links > a");

    function linksRemoveActiveClass() {
        links.removeClass('active');
    }

    links.on("mouseover", function(e) {
        var link = $(this);
        linksRemoveActiveClass();
        if (!link.hasClass('active')) {
            link.addClass('active');
        }
    });

    links.on('mouseleave', function(e) {
        var link = $(this);
        linksRemoveActiveClass();
        $(links[0]).addClass('active');

    });

    $("a#top").on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({scrollTop: 0}, 500);
    });
})();

