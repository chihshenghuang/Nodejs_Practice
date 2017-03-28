var gulp = require('gulp');
var stylus = require('gulp-stylus');

gulp.task('stylus2css', function buildCSS(){
  return gulp.src('./src/style/*.styl')
  .pipe(stylus())
  .pipe(gulp.dest('./public/stylesheets/'));
});

gulp.task('default', ['stylus2css']);
