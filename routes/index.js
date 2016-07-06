var express = require('express');
var request = require('request');
var router = express.Router();
var models            = require('../models/Posts.js');


var feedUrl = 'http://www.netvibes.com/api/searches?format=json&actions=%7B%22searches%22%3A%5B%7B%22id%22%3A%22a63e2bfa-0670-11e6-936c-842b2b5a28ad%22%2C%22estimatedItemCount%22%3A7935%2C%22token%22%3A%2296849154%22%7D%5D%7D';

router.param('post', function(req, res, next, id) {
  var query = models.Post.findById(id);

  query.exec(function (err, post){
    if (err) { return next(err); }
    if (!post) { return next(new Error('can\'t find post')); }

    req.post = post;
    return next();
  });
});
// ['http://www.netvibes.com/api/searches?format=json&actions=%7B%22searches%22%3A%5B%7B%22id%22%3A%2281ec195e-3bba-11e6-a82b-782bcb10ee8c%22%2C%22estimatedItemCount%22%3A1%2C%22token%22%3A%2296849154%22%7D%5D%7D', 
// 'http://www.netvibes.com/api/searches?format=json&actions=%7B%22searches%22%3A%5B%7B%22id%22%3A%227ba83050-3bba-11e6-be02-782bcb102f71%22%2C%22estimatedItemCount%22%3A1%2C%22token%22%3A%2296849154%22%7D%5D%7D',
// 'http://www.netvibes.com/api/searches?format=json&actions=%7B%22searches%22%3A%5B%7B%22id%22%3A%2230e61230-3bba-11e6-8b89-842b2b5a33d6%22%2C%22estimatedItemCount%22%3A1%2C%22token%22%3A%2296849154%22%7D%5D%7D',
// 'http://www.netvibes.com/api/searches?format=json&actions=%7B%22searches%22%3A%5B%7B%22id%22%3A%222caf72f6-3bba-11e6-877f-782bcb11749d%22%2C%22estimatedItemCount%22%3A1%2C%22token%22%3A%2296849154%22%7D%5D%7D',
// 'http://www.netvibes.com/api/searches?format=json&actions=%7B%22searches%22%3A%5B%7B%22id%22%3A%22fe6b8fe2-3bb9-11e6-877f-782bcb11749d%22%2C%22estimatedItemCount%22%3A1%2C%22token%22%3A%2296849154%22%7D%5D%7D',
// 'http://www.netvibes.com/api/searches?format=json&actions=%7B%22searches%22%3A%5B%7B%22id%22%3A%22f97aa432-3bb9-11e6-be01-782bcb102f71%22%2C%22estimatedItemCount%22%3A1%2C%22token%22%3A%2296849154%22%7D%5D%7D',
// 'http://www.netvibes.com/api/searches?format=json&actions=%7B%22searches%22%3A%5B%7B%22id%22%3A%22ee43b16c-3bb9-11e6-a82b-782bcb10ee8c%22%2C%22estimatedItemCount%22%3A1%2C%22token%22%3A%2296849154%22%7D%5D%7D',
// 'http://www.netvibes.com/api/searches?format=json&actions=%7B%22searches%22%3A%5B%7B%22id%22%3A%22e32d826c-3bb9-11e6-9bdb-842b2b6f7849%22%2C%22estimatedItemCount%22%3A1%2C%22token%22%3A%2296849154%22%7D%5D%7D',
// 'http://www.netvibes.com/api/searches?format=json&actions=%7B%22searches%22%3A%5B%7B%22id%22%3A%22d17a9482-3bba-11e6-b88c-782bcb103767%22%2C%22estimatedItemCount%22%3A1%2C%22token%22%3A%2296849154%22%7D%5D%7D',
// 'http://www.netvibes.com/api/searches?format=json&actions=%7B%22searches%22%3A%5B%7B%22id%22%3A%229624e0cc-3bba-11e6-877f-782bcb11749d%22%2C%22estimatedItemCount%22%3A1%2C%22token%22%3A%2296849154%22%7D%5D%7D',
// 'http://www.netvibes.com/api/searches?format=json&actions=%7B%22searches%22%3A%5B%7B%22id%22%3A%224de58cda-3bba-11e6-bfc5-842b2b482ce2%22%2C%22estimatedItemCount%22%3A1%2C%22token%22%3A%2296849154%22%7D%5D%7D',
// 'http://www.netvibes.com/api/searches?format=json&actions=%7B%22searches%22%3A%5B%7B%22id%22%3A%22456af554-3bba-11e6-bb95-782bcb10f569%22%2C%22estimatedItemCount%22%3A1%2C%22token%22%3A%2296849154%22%7D%5D%7D',
// 'http://www.netvibes.com/api/searches?format=json&actions=%7B%22searches%22%3A%5B%7B%22id%22%3A%220fbe7e44-3bba-11e6-bb95-782bcb10f569%22%2C%22estimatedItemCount%22%3A1%2C%22token%22%3A%2296849154%22%7D%5D%7D',
// 'http://www.netvibes.com/api/searches?format=json&actions=%7B%22searches%22%3A%5B%7B%22id%22%3A%2209007af8-3bba-11e6-bd3c-842b2b5a30e0%22%2C%22estimatedItemCount%22%3A1%2C%22token%22%3A%2296849154%22%7D%5D%7D',
// 'http://www.netvibes.com/api/searches?format=json&actions=%7B%22searches%22%3A%5B%7B%22id%22%3A%22c3be12a2-3bb9-11e6-bb95-782bcb10f569%22%2C%22estimatedItemCount%22%3A1%2C%22token%22%3A%2296849154%22%7D%5D%7D',
// 'http://www.netvibes.com/api/searches?format=json&actions=%7B%22searches%22%3A%5B%7B%22id%22%3A%22613dd168-3b31-11e6-bb4d-782bcb10f569%22%2C%22estimatedItemCount%22%3A1%2C%22token%22%3A%2296849154%22%7D%5D%7D',
// 'http://www.netvibes.com/api/searches?format=json&actions=%7B%22searches%22%3A%5B%7B%22id%22%3A%2277fac5ca-3bbb-11e6-9bdc-842b2b6f7849%22%2C%22estimatedItemCount%22%3A1%2C%22token%22%3A%2296849154%22%7D%5D%7D',
// 'http://www.netvibes.com/api/searches?format=json&actions=%7B%22searches%22%3A%5B%7B%22id%22%3A%2271d5c898-3bbb-11e6-bfc5-842b2b482ce2%22%2C%22estimatedItemCount%22%3A1%2C%22token%22%3A%2296849154%22%7D%5D%7D',
// 'http://www.netvibes.com/api/searches?format=json&actions=%7B%22searches%22%3A%5B%7B%22id%22%3A%2264bd0758-3bba-11e6-bd3d-842b2b5a30e0%22%2C%22estimatedItemCount%22%3A1%2C%22token%22%3A%2296849154%22%7D%5D%7D',
// 'http://www.netvibes.com/api/searches?format=json&actions=%7B%22searches%22%3A%5B%7B%22id%22%3A%225f826cd8-3bba-11e6-877f-782bcb11749d%22%2C%22estimatedItemCount%22%3A1%2C%22token%22%3A%2296849154%22%7D%5D%7D',
// 'http://www.netvibes.com/api/searches?format=json&actions=%7B%22searches%22%3A%5B%7B%22id%22%3A%222434b7f8-3bba-11e6-877f-782bcb11749d%22%2C%22estimatedItemCount%22%3A1%2C%22token%22%3A%2296849154%22%7D%5D%7D',
// 'http://www.netvibes.com/api/searches?format=json&actions=%7B%22searches%22%3A%5B%7B%22id%22%3A%221e902a26-3bba-11e6-8b89-842b2b5a33d6%22%2C%22estimatedItemCount%22%3A1%2C%22token%22%3A%2296849154%22%7D%5D%7D',
// 'http://www.netvibes.com/api/searches?format=json&actions=%7B%22searches%22%3A%5B%7B%22id%22%3A%22d63b6d9e-3bb9-11e6-bfc3-842b2b482ce2%22%2C%22estimatedItemCount%22%3A1%2C%22token%22%3A%2296849154%22%7D%5D%7D',
// 'http://www.netvibes.com/api/searches?format=json&actions=%7B%22searches%22%3A%5B%7B%22id%22%3A%22cda03552-3bb9-11e6-bfc3-842b2b482ce2%22%2C%22estimatedItemCount%22%3A1%2C%22token%22%3A%2296849154%22%7D%5D%7D']

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



   
request.get(feedUrl, saveFunc);


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
