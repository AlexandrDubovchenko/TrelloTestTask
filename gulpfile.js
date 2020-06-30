const gulp = require('gulp');
const browserSync = require('browser-sync').create();

const cssFiles = [
    './styles/*.css'
];
const jsFiles = [
    './src/*.js'
];

function scripts() {
  return gulp.src(jsFiles)
  .pipe(browserSync.stream());
}

function styles() {
    return gulp.src(cssFiles)
        .pipe(browserSync.stream());
}

function watch() {
    browserSync.init({
        server: {
            baseDir: './',
            index: 'index.html',
        }
    });
    gulp.watch('./styles/*.css', styles);
    gulp.watch('./src/*.js', scripts);
    gulp.watch('./src/*.html').on('change', browserSync.reload);
}

gulp.task('watch', watch);
