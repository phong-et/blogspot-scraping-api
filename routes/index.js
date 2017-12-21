var express = require('express');
var router = express.Router();
var blogspot = require('../blogspot')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Welcome to Blogspot API scraping' });
});

router.get('/home', function(req, res, next) {  
  // blogspot.getContentBlog(blogPosts => {
  //   res.send(blogPosts);
  // })
  blogspot.getContentBlog(function(blogPosts){
    res.send(blogPosts);
  })
});

module.exports = router;
