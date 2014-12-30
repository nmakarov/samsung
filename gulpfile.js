var gulp = require('gulp');
var less = require('gulp-less');
var runSequence = require('run-sequence');
var shell = require('gulp-shell');

var cssPath = 'assets/css/';
var lessPath = 'assets/less/';

gulp.task('less', function () {
  gulp
    .src(lessPath + '*.less')
    .pipe(less())
    .pipe(gulp.dest(cssPath))
  ;
});

gulp.task('webserver', shell.task ([
  'http-server'
]));

gulp.task('default', function () {
  runSequence('less');
});

