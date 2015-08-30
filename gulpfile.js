'use strict';

var gulp = require('gulp'),
      source = require('vinyl-source-stream'),
      browserify = require('browserify'),
      babelify = require('babelify'),
      watchify = require('watchify'),
      concat = require('gulp-concat'),
      sass = require('gulp-sass'),
      plumber = require('gulp-plumber');

var browserSync = require('browser-sync');
// BrowserSync & Server
gulp.task('bs', function() {
  browserSync.init({
    proxy: '0.0.0.0:3000',
    port: 9080
  });
});

/**
 * Build
 */
function compile(watch) {
  var bundler = watchify(browserify('./app/assets/javascripts/app.jsx', { debug: true }).transform(babelify));

  function rebundle() {
    bundler
      .bundle()
      .on("error", function (err) {
        console.log("Error : " + err.message);
        browserSync.notify("Browserify Error!");
      })
      .pipe(source('bundle.js'))
      //ファイルの出力先　現在存在しない出力先だと作ってくれる
      .pipe(gulp.dest('./app/assets/javascripts/'))
      .pipe(browserSync.reload({stream: true}));
  }

  if (watch) {
    bundler.on('update', function() {
      console.log('-> bundling...');
      rebundle();
      console.log('-> bundle finished!');
    });
  }

  rebundle();
}

gulp.task('watch', function() { return watch(); });

gulp.task('reload', function() {

});

/**
 * Watch
 */
gulp.task('watch:css', function() {
  //第一引数に指定された対象ファイルについて第二引数で指定したタスクを実行する
  gulp.watch(
    './app/assets/stylesheets/**/*.scss',
    ['bundle:css']).on('change', browserSync.reload);
});



gulp.task('bundle:css', function() {
  gulp.src('./app/assets/stylesheets/**/*.scss')
         .pipe(plumber())
         .pipe(sass())
         .pipe(concat('bundle.css'))
         .pipe(gulp.dest('./app/assets/stylesheets'))
});

function watch() {
  return compile(true);
};

gulp.task('watch', function() { return watch(); });

gulp.task('default', ['bundle:css', 'watch', 'watch:css','bs']);
