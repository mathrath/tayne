var express = require('express');
var app = express();
var mustacheExpress = require('mustache-express');
var fs = require('fs');

var videoFolder = __dirname + '/videos';
var viewFolder = __dirname + '/views';

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', viewFolder);

app.use('/videos', express.static(videoFolder));

app.get('/', function(req, res) {
	var files = fs.readdirSync(videoFolder);

	// Get rid of those pesky .DS_Stores and other hidden files
	files = files.filter(function(value){
		return !value.startsWith(".");
	});

	var videoFile = files[Math.floor(Math.random() * files.length)]

	res.render('index', {video:"/videos/" + videoFile});
});

app.listen(8080);
