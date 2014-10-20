var http = require( "http" );
var express = require( "express" );
var morgan = require( "morgan" );
var bodyParser = require( "body-parser" );
var methodOverride = require( "method-override" );

var app = express();

var pathClient = __dirname + "/../client"
var pathViews = pathClient + "/src/views";

// app.use( express.logger( "dev" ) );
// app.use( express.json() );
app.use( morgan( "dev" ) );
app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( bodyParser.json() );
app.use( methodOverride() );

app.set( "views", pathViews );
app.set( "view engine", "jade" );
app.locals.basedir = app.get( "views" );
app.locals.pretty = true;

app.use( express.static( pathClient + "/public" ) );

app.get( "/", function( request, response ) {
  response.render( "home.jade" );
} );

app.get( "/details/:date/:id", function( request, response ) {
  // console.log( request.params.id );
  response.render( "details.jade" );
} );

app.get( "/infos", function( request, response ) {
  response.render( "infos.jade" );
} );

app.get( "*", function( request, response ) {
  response.end( "404!" );
} );

http.createServer( app ).listen( 1337, function() {
  console.log( "Start server: http://localhost:1337" );
} );
