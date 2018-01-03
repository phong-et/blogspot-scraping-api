var blogspot = require('./blogspot'), log = console.log
blogspot.getHomePage({
    // url:'http://tuanvannguyen.blogspot.com',
    url:'http://irinatyt.blogspot.com',
    limitedNumberPost:3
  },(blogPosts) => {
    blogPosts.forEach(p => {
      log(p.postTitle)
      log(p.postLink)
      log(p.postContent)
    });
})