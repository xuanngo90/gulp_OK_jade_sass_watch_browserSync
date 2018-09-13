var gulp = require('gulp');;
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-csso');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');

// Reload Browser when save
var browserSync = require('browser-sync').create();

gulp.task('serve', ['css', 'html'], function() {

  browserSync.init({
      server: "./build"
  });

  gulp.watch("client/templates/*.scss", ['css']);
  gulp.watch("client/templates/*.jade", ['html']);
  gulp.watch("build/*.html").on('change', browserSync.reload);
});

// 

gulp.task('html', function(){
  return gulp.src('client/templates/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('build/'))
    .pipe(browserSync.stream());
});

gulp.task('css', function(){
  return gulp.src('client/templates/*.scss')
    .pipe(sass())
    .on('error', function (error) {
      console.log(error.toString());
    })
    .pipe(minifyCSS())
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.stream());
});

gulp.task('js', function(){
  return gulp.src('client/javascript/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('app.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/js'))
    .pipe(browserSync.stream());
});


gulp.task('watch',  () => {
  gulp.watch('client/templates/*.scss', ['css']);
  gulp.watch('client/templates/*.jade', ['html']);
  gulp.watch('client/javascript/*.js', ['js']);
});

gulp.task('default', ['serve', 'html', 'css', 'js', 'watch' ]);