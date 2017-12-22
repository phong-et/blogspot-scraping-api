module.exports = {
  // Properties
  cheerio: require('cheerio'),
  fs: require('fs'),
  request: require('request'),
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.98 Safari/537.36',
    'Content-type': 'text/html'
  },
  log: console.log,
  cfg: require('./blogspot.cfg'),

  // Methods test defaut blog in blogspot.cfg
  getContentBlog(callback){
    let me = this,
    cfg = me.cfg,
    url = cfg.blogUrl,
    options = {
      url:url,
      headers:me.headers
    },
    request = me.request,
    cheerio = me.cheerio,
    log = me.log,
    blogPosts = []
    request(options,(err,res,body)=>{
      log(res.headers)
      let $ = cheerio.load(body)
      var posts = $('.date-posts')
      // log(posts.length)
      // this.inspectPost(posts.eq(0).html())
      for(let i = 0 ; i < posts.length; i++){
        blogPosts.push(this.inspectPost(posts.eq(i).html()))
      }
      // blogPosts.forEach(p => {
      //   log(p.postTitle)
      //   log(p.postLink)
      //   log(p.postContent)
      // })
      callback(blogPosts)
    })
  },
  getHomePage(params, callback){
    let me = this,
    options = {
      url:params.url,
      headers:me.headers
    },    
    request = me.request,
    cheerio = me.cheerio,
    log = me.log,
    blogPosts = []
    request(options,(err,res,body)=>{
      // log(res.headers)
      let $ = cheerio.load(body)
      var posts = $('.date-posts')
      log('posts.length: %s',posts.length)
      log('params.limitedNumberPost: %s', params.limitedNumberPost)
      let limitedNumberPost = params.limitedNumberPost || posts.length
      if(posts.length < limitedNumberPost) {
        limitedNumberPost = posts.length
      }
      log('limitedNumberPost: %s', limitedNumberPost)
      for(let i = 0 ; i < limitedNumberPost; i++){
        blogPosts.push(this.inspectPost(posts.eq(i).html()))
      }
      // blogPosts.forEach(p => {
      //   log(p.postTitle)
      //   log(p.postLink)
      //   log(p.postContent)
      // })
      callback(blogPosts)
    })
  },
  /**
   * 
   * @param {* post html dom} post 
   * @param {* return a json object include 3 prop : postTitle, postLink, postContent } callback 
   */
  inspectPost(post,callback){
    let postTitle, postContent, postLink, cheerio = this.cheerio, log = this.log
    let $ = cheerio.load(post);
    // get html dom of class .post-title
    let htmlTitle = $('.post-title').html().trim()
    // get html đom of class .post-body, get at here before $ load new dom
    postContent = $('.post-body').html()
    // inspect html dom of .post-title 
    $ = cheerio.load(htmlTitle)
    postTitle = $('a').text().trim()
    postLink = $('a').attr('href')

    // log('title: %s',postTitle)
    // log('link: %s',postLink)
    // log('content: %s',postContent)

    return ({postTitle, postLink, postContent})
  },
  saveFile: function (fileName, fileContent) {
    let me = this, log = me.log
    let folder = 'html/'
    if(!me.fs.existsSync(folder)) {
        me.fs.mkdirSync(folder);
    }
    me.fs.writeFile(folder + fileName, fileContent, function (err) {
        if (err) return log(err);
        log('Write file ' + fileName + ' > success');
    });
  },
}