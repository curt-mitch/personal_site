var gulp = require('gulp');
var stylus = require('gulp-stylus');

gulp.task('watch', function () {
  gulp.watch('public/*.styl', ['styl']);
});

gulp.task('styl', function () {
  gulp.src('./public/style.styl')
    .pipe(stylus())
    .pipe(gulp.dest('./public'));
});

gulp.task('default', ['styl']);