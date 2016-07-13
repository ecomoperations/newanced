var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
  netvibes_id: String,
  title: String,
  link: String,
  photo: String,
  content: String,
  category: String
});

module.exports = {
	Post: mongoose.model('Post', postSchema)
}