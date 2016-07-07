var express = require('express');
var request = require('request');
var router = express.Router();
var models            = require('../models/Posts.js');
var feedUrl = require('../config/external_posts.js')


router.param('post', function(req, res, next, id) {
  var query = models.Post.findById(id);

  query.exec(function (err, post){
    if (err) { return next(err); }
    if (!post) { return next(new Error('can\'t find post')); }

    req.post = post;
    return next();
  });
});

var saveFunc = function (req, res) {
	var body = JSON.parse(res.body);
	var items = body.results.items;
	
	items.forEach(function(item) {
		
		models.Post.find({title: item.title}, function(err, dbPost) {
		  
		  if (err) throw err;
		  
		  if (dbPost.length != 0) {
		  	console.log("already exists")
		  } else {
		  	
		  	var post = new models.Post();

		  	post.netvibes_id = item.netvibes_id
			post.title = item.title;
			post.link = item.link;
			post.photo = item.enclosures.link;
			post.content = item.content;
			post.save(function(err, res) {
				
				console.log('saved');
			});
		  }

		});
	});
	
}


var postDatabase = function () {
	return request.get(feedUrl, saveFunc); 
};
   
setInterval(postDatabase, 10000);


router.get('/', function(req, res, next) {
  
  res.render('index', { title: 'Express' });
});

router.get('/posts', function(req, res, next) {
	models.Post.find(function(err, posts) {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err)

        res.json(posts); // return all todos in JSON format
    });
});

router.get('/posts/:post', function(req, res) {
  res.json(req.post);
});



module.exports = router;
