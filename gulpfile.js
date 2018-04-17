var gulp = require("gulp"),
  browserify = require("browserify"),
  source = require("vinyl-source-stream"),
  watchify = require("watchify"),
  tsify = require("tsify"),
  uglify = require("gulp-uglify"),
  sourcemaps = require("gulp-sourcemaps"),
  buffer = require("vinyl-buffer"),
  gutil = require("gulp-util"),
  connect = require('gulp-connect'),
  ts = require("gulp-typescript"),
  jade = require("gulp-jade"),
  sass = require("gulp-sass"),
  minifyHTML = require("gulp-minify-html-2"),
  tsProject = ts.createProject("tsconfig.json"),

  jadeTasks = ['jade'],
  sassTasks = ['sass'];

/* Paths
-------------------------------------------------------------------------------*/
var path = {
  jade: ['src/jade/**/*.jade'],
  html: 'public',

  sass: ['src/sass/**/*.{scss,sass}'],
  css: 'public/assets/css',

  minify: 'public'
}

/* Browserify
-------------------------------------------------------------------------------*/
var watchedBrowserify = watchify(browserify({
  basedir: '.',
  debug: true,
  entries: ['src/ts/functions.ts'],
  cache: {},
  packageCache: {}
}).plugin(tsify));


/* Configuración de compilacion 'JADE'
-------------------------------------------------------------------------------*/
gulp.task('jade', function() {
  return gulp.src(path.jade)
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest(path.html))
});

/* Configuración de minificacion 'HTML'
-------------------------------------------------------------------------------*/
gulp.task("html", function() {
  var opts = {comments:true, spare:true};
  return gulp.src('public/**/*.html')
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest(path.minify))
});

/* Configuración de compilacion 'SASS'
-------------------------------------------------------------------------------*/
gulp.task('sass', function () {
  return gulp.src(path.sass)
   .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
   .pipe(gulp.dest(path.css));
});

watchedBrowserify.on('update', bundle);
watchedBrowserify.on('log', gutil.log);

function bundle() {
  return watchedBrowserify
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest("public"));
}

/* Configuración de compilacion 'WATCH'
-------------------------------------------------------------------------------*/
gulp.task('watch', function () {
  gulp.watch(path.jade, jadeTasks);
  gulp.watch(path.sass, sassTasks);
})
