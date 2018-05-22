function encodeQuote(post){
    post.content = post.quoteText.replace(/(<([^>]+)>)/ig, "");
    post.link = post.quoteText.replace(/&#(\d+);/g, function(m, n) {
        return String.fromCharCode(n);
    });    
    
    post.link = encodeURIComponent(post.link  + " - " + post.quoteAuthor);
    
    return post;
}

function getQuote(){
    $.getJSON('https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?', function(data) {
        var post = encodeQuote(data);
        var author = post.quoteAuthor;
        var quote = post.quoteText;
        
        $("#quote-content").html(quote);
        if(author === ""){
            author = "Unknown";
        }
        $("#quote-author").html("-- " + author + " --");
        $("#shareQuote").attr("href", "https://twitter.com/intent/tweet?text=" + post.link);
    });
}

$.ajaxSetup({cache: false, dataType: 'jsonp'});
$(document).ready(function() {
    getQuote();
    $('#getQuote').on('click', getQuote);
});
