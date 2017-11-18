$.ajaxSetup({cache: false});
$(document).ready(function() {
    $('#getQuote').on('click', function(e) {
        $.getJSON("https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1", function(data) {
            var post = data.shift();
            $("#quote-content").html(post.content);
            $("#quote-title").text(post.title);
        });
    });
});