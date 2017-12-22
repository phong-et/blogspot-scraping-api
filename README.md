# blogspot-scraping-api
A RESTful web service for scraping Blogspot content

#  DEMO 
I will deploy to heroku later

# FEATURES
* Use express generator module 
* Cross domain 
* Change url webservice ( goto public/javascripts/jquery.blogspot.js change url to your webservice)

# USAGE Service
    git clone https://github.com/phong-et/blogspot-scraping-api.git
    npm install 
    node bin/www
 Chrome goto http://localhost:3000/index_plugin.html            
# USAGE Client (cross domain)

Create a html file and include :
* <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
* <script src="javascripts/jquery.blogspot.js"></script>
      $().ready(function() {   
          $('#divPosts').blogspot({
                blogDomain: 'irinatyt.blogspot.com',
                blogLitmitedPostNumber: 3
          })
      });
      
	
