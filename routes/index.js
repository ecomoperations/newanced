var express = require('express');
var request = require('request');
var router = express.Router();
var models            = require('../models/Posts.js');
var feedUrl = require('../config/external_posts.js');


router.param('post', function(req, res, next, id) {
  var query = models.Post.findById(id);
   // console.log(query)
  query.exec(function (err, post){

    if (err) { return next(err); }
    if (!post) { return next(new Error('can\'t find post')); }

    req.post = post;
    return next();
  });
});


router.param('category', function(req, res, next, category_id) {
	// console.log(category_id)
  query = models.Post.find({category: category_id});
  	// console.log(query)
  query.exec(function(err, category) {
  		// console.log(category)
        if (err) { 
        	// console.log("there is an error")
        	return next(err); 
        }
    if (!category) { 
    	// console.log("didnt work yo")
    	return next(new Error('can\'t find category')); 
    }
    	// console.log(category)
    req.category = category;
    return next();
  });
    
  
});




var saveFunc = function (req, res) {
	var body = JSON.parse(res.body);
	var items = body.results.items;
	var category_id = body.results.searches[0].id;
	
	items.forEach(function(item) {
		
		models.Post.find({title: item.title}, function(err, dbPost) {
		  
		  if (err) throw err;
		  
		  if (dbPost.length != 0) {
		  	console.log("already exists")
		  } else {
		  	
		  	var post = new models.Post();

		  	post.netvibes_id = item.id
			post.title = item.title;
			post.link = item.link;
			post.photo = item.enclosures[0].link;
			post.content = item.content;
			post.category = category_id; 
			post.save(function(err, res) {
				
				console.log('saved');
			});
		  }

		});
	});
	
}

request.get(feedUrl, saveFunc); 
// var postDatabase = function () {
// 	return request.get(feedUrl, saveFunc); 
// };
   
// setInterval(postDatabase, 10000);


router.get('/', function(req, res, next) {
  
  res.render('index', { title: 'Nooanse' });
});

router.get('/posts', function(req, res, next) {
	models.Post.find(function(err, posts) {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err)

        res.json(posts); 
    });
});

// router.get('/posts/:category_id', function(req, res) {
//   models.Post.find({category:category_id},function(err, posts) {
//         // if there is an error retrieving, send the error. nothing after res.send(err) will execute
//         if (err)
//             res.send(err)

//         res.json(posts); 
//     });

// });

router.get('/category/:category', function(req, res) {
	
  res.render('categoryPage', { theCategory: req.category});
});


router.get('/posts/:post', function(req, res) {
  // console.log(req.post)
  res.render('postPage', { thePost: req.post});
});



module.exports = router;
