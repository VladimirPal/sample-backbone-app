var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserify = require('browserify');
var del = require('del');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var _ = require('lodash');

var browserSync = require('browser-sync');
var reload = browserSync.reload;
var api = require('./api/api');

var handleErrors = function() {
  var args = Array.prototype.slice.call(arguments);
  delete args[0]['stream'];
  $.util.log(args);
  this.emit('end');
};

gulp.task('clean', function(cb) {
  del([
    'app/tmp'
  ], cb);
});

gulp.task('html', function() {
  return gulp.src('./src/index.html')
    .pipe($.plumber())
    .pipe(gulp.dest('./dist'));
});

gulp.task('styles', function() {
  return gulp.src('./src/styles/main.less')
    .pipe($.less())
    .pipe($.autoprefixer())
    .pipe($.rename('bundle.css'))
    .pipe(gulp.dest('./dist'))
    .pipe(reload({ stream: true }));
});

gulp.task('templates', function() {
  return gulp.src('src/templates/**/*.hbs')
    .pipe($.handlebars())
    .pipe($.wrap('Handlebars.template(<%= contents %>)'))
    .pipe($.declare({
      root: 'module.exports',
      noRedeclare: true,
      processName: function(filePath) {
        var newPath = filePath.replace(/src\/templates\/(.*)/, function(match) {

          return match.replace('src/templates/', '').replace(/-/g, '_');
        });
        return $.declare.processNameByPath(newPath);
      }
    }))
    .pipe($.concat('templates_build.js'))
    .pipe($.wrap('var Handlebars = require("handlebars");\n <%= contents %>'))
    .pipe(gulp.dest('src/templates'));

});

var bundler = _.memoize(function(watch) {
  var options = {
    debug: true,
    paths: ['./src'],
    extensions: ['.coffee']
  };

  if (watch) {
    _.extend(options, watchify.args);
  }

  var b = browserify('./src/app.coffee', options);

  if (watch) {
    b = watchify(b);
  }

  return b;
});

function bundle(cb, watch) {
  return bundler(watch).bundle()
    .on('error', handleErrors)
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe($.sourcemaps.init({ loadMaps: true }))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest('./dist'))
    .on('end', cb)
    .pipe(reload({ stream: true }));
}

gulp.task('scripts', function(cb) {
  process.env.BROWSERIFYSWAP_ENV = 'dist';
  bundle(cb, true);
});

gulp.task('fonts', function() {
  var fonts = [
    './node_modules/font-awesome/fonts/*'
  ];
  return gulp.src(fonts)
    .pipe(gulp.dest('./dist/fonts'));
});



var reporter = 'spec';

gulp.task('build', [
  'clean',
  'html',
  'fonts',
  'styles',
  'templates',
  'scripts'
]);

gulp.task('watch', ['build'], function(cb) {
  browserSync({
    server: {
      baseDir: 'dist',
      middleware: function(req, res, next) {
        api(req, res, next);
      }
    }
  });

  reporter = 'dot';
  bundler(true).on('update', function() {
    gulp.start('scripts');
  });
  gulp.watch(['./src/main.less', './src/**/*.less'], ['styles']);
});

gulp.task('default', ['watch']);
