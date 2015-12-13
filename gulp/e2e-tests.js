'use strict';

const browserSync = require('browser-sync'),
    gulp = require('gulp'),
    path = require('path');

const $ = require('gulp-load-plugins')();

const conf = require('./conf');


gulp.task('webdriver-update', $.protractor.webdriver_update);


gulp.task('webdriver-standalone', $.protractor.webdriver_standalone);


function runProtractor(done) {
    const params = process.argv,
        args = params.length > 3 ? [params[3], params[4]] : [];

    gulp.src(path.join(conf.paths.e2e, '/**/*.js'))
        .pipe($.protractor.protractor({
            configFile: 'protractor.conf.js',
            args,
        }))
        .on('error', (err) => {
            // Make sure failed tests cause gulp to exit non-zero
            throw err;
        })
        .on('end', () => {
            // Close browser sync server
            browserSync.exit();
            done();
        });
}


gulp.task('protractor', ['protractor:src']);
gulp.task('protractor:src', ['serve:e2e', 'webdriver-update'], runProtractor);
gulp.task('protractor:dist', ['serve:e2e-dist', 'webdriver-update'], runProtractor);
