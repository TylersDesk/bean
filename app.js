
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var tyler = require('./routes/tyler');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('less-middleware')({ src: __dirname + '/public' }));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// ***********
// Route Stuff
// ***********

// Ok, this part was confusing, as I was trying to understand
// how routes.index pointed to the file index.js in the routes folder.
// 'routes' is defined above and by default it looks for the index.js in
// the routes folder, note that 'routes.index' is NOT pointing to the 
// index.js file, but the 'exports.index' function inside of 'index.js'.
// If you again notice how there is nothing after './routes' when the
// variable 'routes' is defined, that is where it points to index.js.

// To further understand I have created a 'tyler' variable that points
// to './routes/tyler' <- this actually looks for a tyler.js in 'routes'
// folder. Inside of that is an 'exports.tyler' function. That is how
// I have routed /tyler on the webserver.

// Inside the exports function is a res.render method call. This points to
// a jade file in the 'views' folder and redners out html. 

app.get('/', routes.index); 	// Default route for index <- Gets index.jade from routes/index.js. Remember this uses index.js because routes is defined with nothing after './routes'
app.get('/tyler', tyler.tyler); // Custom built route. <- Gets tyler.jade from routes/tyler.js. tyler is defined above as './routes/tyler' so it looks at foor that tyler.js file. In there exports.tyler is defined. so you can then call tyler.tyler.
app.get('/testroute', function(req, res, next) {
	res.send('This is a very simple response');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
  console.log('Thanks for trying the BEAN stack - tylermaynard');
});
