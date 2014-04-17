var gulp = require( "gulp" );
var debug = require( "gulp-debug" );
var changed = require( "gulp-changed" );
var cached = require( "gulp-cached" );
var stylus = require( "gulp-stylus" );
var jade = require( "gulp-jade" );
var browserify = require( "gulp-browserify" );
var gutil = require( "gulp-util" );
var rename = require( "gulp-rename" );
var browserSync = require( "browser-sync" );

var src = {
  styles: "src/app/styles",
  scripts: "src/app/scripts"
}

gulp.task( "styles", function() {
  gulp.src( src.styles )
  .pipe( cached( src.styles ) )
  .pipe( changed( src.styles ) )
  .pipe( stylus( { use: [ "nib" ] } ) )
    .on( "error", gutil.log )
    .on( "error", gutil.beep )
  .pipe( gulp.dest( "app/css/" ) );
        
} );

gulp.task( "scripts", function() {

} );

gulp.task( "templates", function() {

} );

gulp.task( "watch", function() {

  gulp.watch( "src/**/*.styl", [ "styles" ] );
  gulp.watch( "src/**/*.jade", [ "templates" ] );
  gulp.watch( "src/**/*.coffee", [ "scripts" ] );

} );
