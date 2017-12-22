(function ($) {
    $.fn.blogspot = function(options) {

        // This is the easiest way to have default options.
        var settings = $.extend({
            // These are the defaults.
            blogDomain: 'irinatyt.blogspot.com',
            blogLitmitedPostNumber: 3
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
            var url = 'http://localhost:3000/home/' + options.blogDomain + '/'
            if (options.blogLitmitedPostNumber) {
                url += options.blogLitmitedPostNumber
            }
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