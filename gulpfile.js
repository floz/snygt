var gulp = require( "gulp" );
var debug = require( "gulp-debug" );
var stylus = require( "gulp-stylus" );
var jade = require( "gulp-jade" );
var browserify = require( "gulp-browserify" );
var gutil = require( "gulp-util" );
var rename = require( "gulp-rename" );
var browserSync = require( "browser-sync" );
var nib = require( "nib" );

var src = {
  styles: "client/src/styles/*.styl",
  scripts: "client/src/scripts/app.coffee"
}

gulp.task( "browser-sync", function() {

  browserSync.init( [ "client/public/js/app.js", "client/public/css/*.css", "client/src/views/**/*.jade" ], {
    // proxy: "localhost:1337"
  } );

} );

gulp.task( "styles", function() {

  gulp.src( src.styles )
      .pipe( stylus( { use: [ nib() ], url: { paths: [ "app/img/" ] } } ) )
        .on( "error", gutil.log )
        .on( "error", gutil.beep )
      .pipe( gulp.dest( "client/public/css/" ) );
        
} );

gulp.task( "scripts", function() {

  gulp.src( src.scripts, { read: false } )
      .pipe( browserify( { transform: [ "coffeeify" ], extensions: [ ".coffee" ] } ) )
        .on( "error", gutil.log )
        .on( "error", gutil.beep )
      .pipe( rename( "app.js" ) )
      .pipe( gulp.dest( "client/public/js" ) );

} );

gulp.task( "watch", function() {

  gulp.watch( "client/src/styles/**/*.styl", [ "styles" ] );
  gulp.watch( "client/src/scripts/**/*.coffee", [ "scripts" ] );

} );

gulp.task( "default", [ "styles", "scripts", "watch", "browser-sync" ] );
