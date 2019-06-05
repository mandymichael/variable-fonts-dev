var project     = require('./_project.js');
var gulp        = require('gulp');

// Copy our fonts to the dist folder
gulp.task('copyFonts', gulp.parallel(function copyFontFiles(done) {
    gulp.src(project.buildSrc + '/fonts/*')
      .pipe(gulp.dest(project.buildDest+ '/fonts'))
      done();
  }));