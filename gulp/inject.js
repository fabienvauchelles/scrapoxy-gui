'use strict';

const gulp = require('gulp'),
    path = require('path');

const $ = require('gulp-load-plugins')();

const conf = require('./conf');


gulp.task('inject', ['scripts', 'styles'], () => {
    const injectScripts = gulp.src([
        path.join(conf.paths.tmp, '/serve/index.js'),
        path.join(`!${conf.paths.src}`, '/app/**/*.spec.js'),
        path.join(`!${conf.paths.src}`, '/app/**/*.mock.js'),
    ], {read: false});

    const injectOptions = {
        ignorePath: [conf.paths.src, path.join(conf.paths.tmp, '/serve')],
        addRootSlash: false,
    };

    return gulp.src(path.join(conf.paths.src, '/*.html'))
        .pipe($.inject(injectScripts, injectOptions))
        .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve')));
});
