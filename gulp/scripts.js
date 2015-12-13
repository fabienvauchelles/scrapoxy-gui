'use strict';

const browserSync = require('browser-sync'),
    gulp = require('gulp'),
    path = require('path'),
    webpack = require('webpack-stream');

const $ = require('gulp-load-plugins')();

const conf = require('./conf');


function webpackWrapper(watch, test, callback) {
    const webpackOptions = {
        watch,
        module: {
            preLoaders: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'eslint-loader',
                },
            ],
            loaders: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loaders: [
                        'ng-annotate',
                        'babel?presets[]=es2015',
                    ],
                },
            ],
        },
        output: {filename: 'index.js'},
    };

    if (watch) {
        webpackOptions.devtool = 'inline-source-map';
    }

    function webpackChangeHandler(err, stats) {
        if (err) {
            conf.errorHandler('Webpack')(err);
        }

        $.util.log(stats.toString({
            colors: $.util.colors.supportsColor,
            chunks: false,
            hash: false,
            version: false,
        }));

        browserSync.reload();
        if (watch) {
            watch = false;
            return callback();
        }
    }

    const sources = [path.join(conf.paths.src, '/index.js')];
    if (test) {
        sources.push(path.join(conf.paths.src, '/**/*.spec.js'));
    }

    return gulp.src(sources)
        .pipe(webpack(webpackOptions, null, webpackChangeHandler))
        .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve')));
}

gulp.task('scripts', () => webpackWrapper(false, false));
gulp.task('scripts:watch', ['scripts'], (callback) => webpackWrapper(true, false, callback));
gulp.task('scripts:test', () => webpackWrapper(false, true));
gulp.task('scripts:test-watch', ['scripts'], (callback) => webpackWrapper(true, true, callback));

gulp.task('lint',
    () => gulp.src([
        path.join(conf.paths.src, '/**/*.js'),
        path.join(conf.paths.e2e, '/**/*.js'),
        path.join(conf.paths.gulp, '/**/*.js'),
        'gulpfile.js',
        'karma.conf.js',
        'protractor.conf.js',
        '!node_modules/**',
    ])
        .pipe($.eslint())
        .pipe($.eslint.format())
);
