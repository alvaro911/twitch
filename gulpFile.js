'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var styles = './styles/**/*.scss';
var src = './src/**/*.js';
var babel = require('gulp-babel');

gulp.task('sass', function(){
	return gulp.src(styles)
	.pipe(sass().on('error', sass.logError))
	.pipe(gulp.dest('./css'));
});

gulp.task('babel', function() {
	return gulp.src(src)
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest('dist'));
});

gulp.task('gulp-build', function(){
	gulp.watch(src, ['babel']);
	gulp.watch(styles, ['sass']);
});