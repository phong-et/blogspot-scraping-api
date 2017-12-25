(function ($) {
    $.fn.blogspot = function(options) {

        // This is the easiest way to have default options.
        var settings = $.extend({
            // These are the defaults.
            blogApiUrl:'https://blogspotscraping.herokuapp.com/home',
            blogDomain: 'irinatyt.blogspot.com',
            blogLitmitedPostNumber: '' // default all post home page setting of blogspot user 
        }, options );      
        
        var $posts = this

        function drawPost(bPost) {
            // post title
            var postTitile = $('<h3 class="post-title"><a target="_blank" href="' + bPost.postLink + '">' + bPost.postTitle + '</a></h3>')
            // post content
            var postContent = $('<div class="post-content">');
            postContent.append(bPost.postContent);
            // append post title and post content to .post
            var post = $('<div class="post">');
            post.append(postTitile);
            post.append(postContent);
            // append .post to #post
            $posts.append(post);
        }
        function getBlogspotContent(options) {
            if(options.blogDomain == undefined) {
                // alert('You have to input blogDomain params')
                console.log('%c ▲ You have to input blogDomain params ', 'background: transparent; color: #ff1212');
                return 0
            }
            let blogApiUrl =  options.blogApiUrl || settings.blogApiUrl
            let blogDomain = options.blogDomain || settings.blogDomain
            let blogLitmitedPostNumber = options.blogLitmitedPostNumber || settings.blogLitmitedPostNumber
            var url =  blogApiUrl + '/' + blogDomain  + '/' + blogLitmitedPostNumber

            $.ajax({
                url: url,
                success: function(blogPosts) {
                    // draw posts to html
                    blogPosts.forEach(function(bPost) {
                        drawPost(bPost)
                    })
                }
            });
        }

        return this.each(function(){        
            getBlogspotContent(options)
        })
  }
}(jQuery));