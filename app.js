
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , location = require('./routes/location')
  , http = require('http')
  , path = require('path');

var io = require('socket.io');
var Twitter = require('twitter');
var client = new Twitter({
	'consumer_key' : '8AJduOsiEHeFqMWdHnQR4iXOO',
	'consumer_secret' : '6UavHZahNGpOnPz794Dc2bsAAa81mR2gcr9OM5HWsRO0psjr1J',
	'access_token_key' :'4031921180-veXcG2sQBeiv4IFqT8ilZalqMrC0aiaF0b8jPNj',
	'access_token_secret' :'LLQ3zUVYJtv2uL8yIJ1vIOBxpiaxonZfzXulcrT5xcaoW'
});


var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/translate', routes.indexChinese);
app.get('/register', routes.register);
app.get('/login', routes.login);
app.get('/statistics', routes.statistics);
app.get('/twomap', routes.twomap);
app.get('/threemap', routes.threemap);
app.get('/globe', routes.globe);
app.get('/heatmap',function(req,res){
	res.render('heatmap');
});
app.get('/location',function(req,res){
	res.render('location');
});
app.post('/location',location.acceptLocation);
app.get('/getlocation',location.getLocation);

app.get('/getTweets', function(req, res){
	res.render('tweets');	
});//end get tweets

app.get('/mapUsa',function(req,res){
	res.render('mapUsa');
});

var server = http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});

var listener = io.listen(server);

listener.sockets.on('connection', function(socket){ 
	setInterval(function() {
		client.get('search/tweets', {q: 'was'}, function(error, tweets, response) {
			if (error){
		        console.log('Error: ' + (error.code ? error.code + ' ' + error.message : error.message));
		        socket.emit('tweets', tweets.statuses);
		    }
			else{
				console.log(tweets.statuses);
				socket.emit('tweets', tweets.statuses);				
			}   
		});//end client
	}, 10000);//end set interval
});
