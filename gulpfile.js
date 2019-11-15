const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();


function styles() {
  return gulp.src('./src/css/**/*.sass')
             .pipe(sourcemaps.init())
             .pipe(sass())
             .pipe(concat('all.css'))
             .pipe(autoprefixer({
                  cascade: false
              }))
             .pipe(sourcemaps.write('./'))
             .pipe(gulp.dest('./build/css'))
             .pipe(browserSync.stream());
}

function scripts() {

}

function cleanBuild() {
  return del(['build/*'])
}

function watch() {
  browserSync.init({
       server: {
           baseDir: "./"
       }
   });
   // gulp.watch('./src/css/**/*.css', styles)
   gulp.watch('./src/css/**/*.sass', styles)
   gulp.watch("./*.html").on('change', browserSync.reload);
}


gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('del', cleanBuild);
gulp.task('watch', watch);
