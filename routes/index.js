var express = require('express');
var request = require('request');
var router = express.Router();
var models            = require('../models/Posts.js');
var feedUrls = require('../config/external_posts.js');


// Will need the following once I create a post page (see below for URL route)

router.param('post', function(req, res, next, id) {
  var query = models.Post.findById(id);
  query.exec(function (err, post){

    if (err) { return next(err); }
    if (!post) { return next(new Error('can\'t find post')); }

    req.post = post;
    return next();
  });
});


// Will need the following once I create a category page (see below for URL route)

router.param('category', function(req, res, next, category_id) {

  query = models.Post.find({category: category_id});
  query.exec(function(err, category) {

        if (err) { 
        	return next(err); 
        }
    if (!category) { 

    	return next(new Error('can\'t find category')); 
    }

    req.category = category;
    return next();
  });
    
  
});


// The following function is called every ten minutes to index the latest articles
// for each of the category endpoints

var saveFunc = function (req, res) {
	var body = JSON.parse(res.body);
	var items = body.results.items;
	var category_id = body.results.searches[0].id;
	
  console.log("called this 10 minutes")

	items.forEach(function(item) {
		
		// var stripped_content = item.content.replace("<[^>]*>/g", " ");
		

		models.Post.find({title: item.title}, function(err, dbPost) {
		  
		  if (err) throw err;
		  
		  if (dbPost.length != 0) {

		  } else {
		  	
		  	var post = new models.Post();

		  	post.netvibes_id = item.id
			post.title = item.title;
			post.link = item.link;
			if (item.enclosures.length > 0) {
				post.photo = item.enclosures[0].link;
			}
			post.content = item.content;
			post.category = category_id; 
			post.save(function(err, res) {
				
				
			});
		  }

		});
	});
	
}


// BELOW is where the magic happens, every ten minutes call the saveFunc
   
setInterval(() => {
  feedUrls.forEach(function(feedUrl) {
  console.log('update data endpoints');
    return request.get(feedUrl, saveFunc); 
  });
}, 1000*60*20);


router.get('/', function(req, res, next) {
  
  res.render('index', { title: 'Nooanse' });
});

// I'll implement this stuff if need be


router.get('/posts', function(req, res, next) {
	models.Post.find(function(err, posts) {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err)

        res.json(posts); 
    });
});


router.get('/category/:category', function(req, res) {
	  res.json(req.category)

	  // models.Post.find({category: category},function(err, posts) {
   //      // if there is an error retrieving, send the error. nothing after res.send(err) will execute
   //      if (err)
   //          res.send(err)

   //      res.json(posts); 
   //  });
  // res.render('categoryPage', { theCategory: req.category});
});


router.get('/posts/:post', function(req, res) {
  res.render('postPage', { thePost: req.post});
});



module.exports = router;
