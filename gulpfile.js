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
var nib = require( "nib" );

var src = {
  styles: "src/app/styles/*.styl",
  scripts: "src/app/scripts/app.coffee",
  templates: "src/app/*.jade"
}

gulp.task( "browser-sync", function() {

  browserSync.init( [ "app/js/*.js", "app/css/*.css", "app/*.html" ], {
    server: {
      baseDir: "./app"
    }
  } );

} );

gulp.task( "styles", function() {
  gulp.src( src.styles )
      // .pipe( cached( src.styles ) )
      // .pipe( changed( src.styles ) )
      .pipe( stylus( { use: [ nib() ] } ) )
        .on( "error", gutil.log )
        .on( "error", gutil.beep )
      .pipe( gulp.dest( "app/css/" ) );
        
} );

gulp.task( "scripts", function() {
  gulp.src( src.scripts, { read: false } )
      .pipe( cached( src.scripts ) )
      .pipe( changed( src.scripts ) )
      .pipe( browserify( { transform: [ "coffeeify" ], extensions: [ ".coffee" ] } ) )
        .on( "error", gutil.log )
        .on( "error", gutil.beep )
      .pipe( rename( "app.js" ) )
      .pipe( gulp.dest( "app/js" ) );

} );

gulp.task( "templates", function() {
  gulp.src( src.templates )
      // .pipe( cached( src.templates ) )
      // .pipe( changed( src.templates ) )
      .pipe( jade( { pretty: true, basedir: "src/" } ) )
        .on( "error", gutil.log )
        .on( "error", gutil.beep )
      .pipe( gulp.dest( "app/" ) );
} );

gulp.task( "watch", function() {

  gulp.watch( "src/**/*.styl", [ "styles" ] );
  gulp.watch( "src/**/*.jade", [ "templates" ] );
  gulp.watch( "src/**/*.coffee", [ "scripts" ] );

} );

gulp.task( "default", [ "browser-sync", "styles", "templates", "scripts", "watch" ] );
