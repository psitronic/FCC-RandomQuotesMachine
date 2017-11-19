var encodeQuote = function (post){
    post.content = post.content.replace(/(<([^>]+)>)/ig, "");
    post.link = post.content.replace(/&#(\d+);/g, function(m, n) {
        return String.fromCharCode(n);
    });    
    post.link = encodeURIComponent(post.link + " -" + post.title);
    return post;
}

$.ajaxSetup({cache: false});
$(document).ready(function() {
    $('#getQuote').on('click', function() {
        $.getJSON("https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1", function(data) {
            var post = data.shift();
            post = encodeQuote(post);
            var author = post.title;
            var quote = post.content;
            
            $("#quote-content").html(quote);
            $("#quote-title").html(author);
            $("#twit-quote").attr("href", "https://twitter.com/intent/tweet?text=" + post.link);
        });
    });
});
