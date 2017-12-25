# blogspot-scraping-api
A RESTful web service for scraping Blogspot content

#  DEMO 
  * URL API : https://blogspotscraping.herokuapp.com 
  * [Client demo](https://blogspotscraping.herokuapp.com/index_plugin.html)
# FEATURES
* A RESTful web service from express generator module 
* Support Cross domain (Embed from another site) 
* Current only support get content post of home page
* jQuery plugin to embed blogspot posts to website easier 

# Install API
    git clone https://github.com/phong-et/blogspot-scraping-api.git
    npm install 
    node bin/www
Open Chrome goto http://localhost:3000/index_plugin.html to test API
# Documents API
  * Get posts at blogspot home page with a limited number post `/home/:domain/:limitedNumberPost` => /home/irinatyt.blogspot.com/5
  * Get all posts of blogspot home page `/home/:domain/` => /home/irinatyt.blogspot.com/
# USAGE Client (cross domain)

Create a html file and include, ref [source](https://blogspotscraping.herokuapp.com/index_plugin.html) :
* <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
* <script src="javascripts/jquery.blogspot.js"></script>
      $().ready(function() {   
          $('#divPosts').blogspot({
                blogDomain: 'irinatyt.blogspot.com',
                blogLitmitedPostNumber: 3
          })
      });
      
	
