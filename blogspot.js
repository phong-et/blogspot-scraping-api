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

  // Methods
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
      this.inspectPost(posts.eq(0).html())
      for(let i = 0 ; i < posts.length; i++){
        blogPosts.push(this.inspectPost(posts.eq(i).html()))
      }
      blogPosts.forEach(p => {
        log(p.postTitle)
        log(p.postLink)
        log(p.postContent)
      })
      callback(blogPosts)
    })
  },
  getHomePage(url,limitedNumberPost){
    let me = this,
    cfg = me.cfg,
    url = url,
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
      this.inspectPost(posts.eq(0).html())
      if(posts.length < limitedNumberPost) {
        limitedNumberPost = posts.length
      }
      for(let i = 0 ; i < limitedNumberPost; i++){
        blogPosts.push(this.inspectPost(posts.eq(i).html()))
      }
      blogPosts.forEach(p => {
        log(p.postTitle)
        log(p.postLink)
        log(p.postContent)
      })
      callback(blogPosts)
    })
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
  inspectPost(post,callback){
    let postTitle, postContent, postLink, cheerio = this.cheerio, log = this.log
    let $ = cheerio.load(post);
    let htmlTitle = $('.post-title').html().trim()
    postContent = $('.post-body').html()   
    $ = cheerio.load(htmlTitle)
    postTitle = $('a').text()
    postLink = $('a').attr('href') 
    // log('title: %s',title)
    // log('content: %s',content)
    return ({postTitle, postLink, postContent})
  }
}