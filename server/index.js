var http = require( "http" );
var express = require( "express" );

var app = express();

app.use( express.logger( "dev" ) );
app.use( express.json() );

app.set( "views", __dirname + "../client/src/views" );
app.set( "view engine", "jade" );

app.all( "*", function( request, response, next ) ) {
  response.writeHead( 200, { "Content-Type": "text/plain " } );
}

app.get( "/", function( request, response ) ) {
  response.end( "Welcome to the homepage!" );
}

app.get( "*", function( request, response ) ) {
  response.end( "404!" );
}

http.createServer( app ).listen( 1337 );
