'use strict';

const browserSync = require('browser-sync'),
    gulp = require('gulp'),
    path = require('path');

const conf = require('./conf');


function isOnlyChange(event) {
    return event.type === 'changed';
}


gulp.task('watch', ['scripts:watch', 'inject'], () => {
    gulp.watch([path.join(conf.paths.src, '/*.html'), 'package.json'], ['inject']);

    gulp.watch([
        //path.join(conf.paths.src, '/app/**/*.css'),
        path.join(conf.paths.scss, '/**/*.scss'),
        path.join(conf.paths.src, '/app/**/*.scss'),
        path.join(conf.paths.src, '/components/**/*.scss'),
    ], (event) => {
        if (isOnlyChange(event)) {
            gulp.start('styles');
        }
        else {
            gulp.start('inject');
        }
    });

    gulp.watch([
        path.join(conf.paths.src, '/app/**/*.html'),
        path.join(conf.paths.src, '/components/**/*.html'),
    ], (event) => {
        browserSync.reload(event.path);
    });
});
