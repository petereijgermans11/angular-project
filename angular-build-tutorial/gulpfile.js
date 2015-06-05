var gulp = require('gulp');
var jshint = require('gulp-jshint');
var angularProtractor = require('gulp-angular-protractor');
var del = require('del');
var replace = require('gulp-replace');
var flatten = require('gulp-flatten');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var htmlreplace = require('gulp-html-replace');
var karma = require('karma').server;


var DEST = 'build/';

gulp.task('default', ['build']);

gulp.task('build', [
    'clean',
    'lint',
    'minify-js', 
    'minify-css', 
    'flatten-bower-components', 
    'process-html',
]);

gulp.task('lint',['clean'], function() {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('minify-js',['clean'], function() {
   return gulp.src('src/*.js')
    .pipe(gulp.dest(DEST + 'dev/'))
    .pipe(uglify({mangle:false}))
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest(DEST + 'dev/'))
    .pipe(concat('all.min.js'))
    .pipe(gulp.dest(DEST))
});

gulp.task('minify-css',['clean'], function() {
  return gulp.src('src/css/*.css')
    .pipe(minifyCss())
    .pipe(gulp.dest(DEST  + 'dev/'))
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest(DEST))
});

gulp.task('process-html',['clean'], function() {
  return gulp.src('src/*.html')
    .pipe(htmlreplace({
        'css': 'style.min.css',
        'js': 'all.min.js'
    }))
    .pipe(replace(/\.\.\/bower_components\/.*?\/(.*\.js)/g, 'vendor/$1'))
    .pipe(gulp.dest(DEST));
});


gulp.task('flatten-bower-components',['clean'], function() {
    return gulp.src('bower_components/**/*.min.js')
      .pipe(flatten())
      .pipe(gulp.dest(DEST + 'vendor'));
});

gulp.task('clean', function (cb) {
    del(DEST + '*', cb);  
});

gulp.task('test', function (done) {
  karma.start({
    configFile: __dirname + '/test/karma.conf',
    singleRun: true
  }, done);
});

gulp.task('e2e-test',['build'], function() {
    gulp.src(["./test/e2e/*.js"])
    .pipe(angularProtractor({
        'configFile': 'test/protractor.conf.js',
        'args': ['--baseUrl', 'http://127.0.0.1:8000'],
        'autoStartStopServer': true,
        'debug': true
    }))
    .on('error', function(e) { throw e });    
});
