var gulp = require('gulp');;
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-csso');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');

// Reload Browser when save
var browserSync = require('browser-sync').create();

gulp.task('serve', ['sass', 'html', 'css'], function() {

  browserSync.init({
      server: "./build"
  });
 
  gulp.watch('client/templates/**/*.css', ['css']);
  gulp.watch("client/templates/**/*.scss", ['sass']);
  gulp.watch("client/templates/*.jade", ['html']);
  gulp.watch("build/*.html").on('change', browserSync.reload);
});

// End Reload Browser 

gulp.task('html', function(){
  var YOUR_LOCALS = {};

  return gulp.src('client/templates/**/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('build/'))
    .pipe(browserSync.stream());
});

gulp.task('sass', function(){
  return gulp.src('client/templates/**/*.scss')
    .pipe(sass())
    .on('error', function (error) {
      console.log(error.toString());
    })
    .pipe(minifyCSS())
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.stream());
});

gulp.task('css', function(){
  return gulp.src('client/templates/**/*.css')
    .on('error', function (error) {
      console.log(error.toString());
    })
    .pipe(minifyCSS())
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.stream());
});

gulp.task('img', function(){
  return gulp.src('client/templates/images/*')
    .pipe(gulp.dest('build/images'))
    .pipe(browserSync.stream());
});

gulp.task('jsLib', function(){
  return gulp.src('client/javascript/libs/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('libs.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/js'))
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
  gulp.watch('client/templates/images/*', ['img']);
  gulp.watch('client/templates/**/*.css', ['css']);
  gulp.watch('client/templates/**/*.scss', ['sass']);
  gulp.watch('client/templates/**/*.jade', ['html']);
  gulp.watch('client/javascript/*.js', ['js']);
  gulp.watch('client/javascript/libs/*.js', ['jsLib']);
});

gulp.task('default', ['serve', 'html', 'sass', 'js', 'jsLib', 'img', 'watch' ]);