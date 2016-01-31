var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var stylus = require('gulp-stylus');

gulp.task('watch', function () {
  gulp.watch('public/*.styl', ['styl']);
});

gulp.task('nodemon', function () {
  nodemon({
    script: 'app.js',
    ext: 'js html',
    env: { 'NODE_ENV': 'development' }
  });
});

gulp.task('styl', function () {
  gulp.src('./public/style.styl')
    .pipe(stylus())
    .pipe(gulp.dest('./public'));
});

gulp.task('default', ['styl']);