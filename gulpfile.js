'use strict'

const gulp = require('gulp')
const jsmin = require('gulp-uglify-es').default
const rename = require('gulp-rename')

// JavaScript
function js () {
  return gulp.src('./kauli.js')
    .pipe(jsmin())
    .pipe(rename('./kauli.min.js'))
    .pipe(gulp.dest('./'))
}

gulp.task('default', js)
