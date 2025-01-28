// Create web server
// npm install express body-parser
// npm install ejs
// npm install mongodb
// npm install mongoose

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();
var Comment = require('./models/comment');

mongoose.connect('mongodb://localhost:27017/commentdb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', function(req, res) {
    Comment.find({}, function(err, comments) {
        res.render('index', { comments: comments });
    });
});

app.post('/comment', function(req, res) {
    var comment = new Comment(req.body);
    comment.save(function(err) {
        if (err) throw err;
        res.redirect('/');
    });
});

app.listen(3000, function() {
    console.log('Server is running on port 3000');});