var gulp = require('gulp');
var stylus = require('gulp-stylus');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('stylus2css', function buildCSS(){
  return gulp.src('./src/style/*.styl')
  .pipe(sourcemaps.init())
  .pipe(stylus())
  .pipe(uglifycss())
  .pipe(rename(function(path){
	  	path.basename += ".min";
		path.extname = ".css";
  }))
  .pipe(sourcemaps.write('maps'))
  .pipe(gulp.dest('./public/css/'));
});


gulp.task('uglify', function buildCSS(){
  return gulp.src('./src/js/*.js')
  .pipe(sourcemaps.init())
  .pipe(uglify())
  .pipe(rename(function(path){
	  path.basename += ".min";
	  path.extname = ".js";
  }))
  .pipe(sourcemaps.write('maps'))
  .pipe(gulp.dest('./public/js/'));
});

gulp.task('default', ['stylus2css', 'uglify']);
