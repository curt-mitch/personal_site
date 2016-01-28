var gulp = require('gulp');
var stylus = require('gulp-stylus');

gulp.task('one', function () {
  gulp.src('./public/style.styl')
    .pipe(stylus())
    .pipe(gulp.dest('./public'));
});

gulp.task('default', ['one']);