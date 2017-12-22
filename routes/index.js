var express = require('express');
var router = express.Router();
var blogspot = require('../blogspot')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Welcome to Blogspot API scraping' });
});

router.get('/home', function(req, res, next) {  
  blogspot.getContentBlog(blogPosts => {
    res.send(blogPosts);
  })
});
router.get('/home/:domain/:limitedNumberPost', function(req, res, next) {  
  blogspot.getHomePage({
      url:'http://' + req.params.domain,
      limitedNumberPost: req.params.limitedNumberPost
    },blogPosts => {
      res.send(blogPosts);
  })
});

router.get('/home/:domain/', function(req, res, next) {  
  blogspot.getHomePage({
      url:'http://' + req.params.domain,
    },blogPosts => {
      res.send(blogPosts);
  })
});

module.exports = router;
