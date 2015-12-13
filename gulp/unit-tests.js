'use strict';

const gulp = require('gulp'),
    karma = require('karma'),
    path = require('path');

const conf = require('./conf');


const pathSrcHtml = [
    path.join(conf.paths.src, '/**/*.html'),
];

const pathSrcJs = [
    path.join(conf.paths.tmp, '/serve/index.js'),
];


function runTests(singleRun, done) {
    const reporters = ['progress'];
    const preprocessors = {};

    pathSrcHtml.forEach((p) => preprocessors[p] = ['ng-html2js']);

    if (singleRun) {
        pathSrcJs.forEach((p) => preprocessors[p] = ['coverage']);

        reporters.push('coverage');
    }

    const localConfig = {
        configFile: path.join(__dirname, '/../karma.conf.js'),
        singleRun,
        autoWatch: !singleRun,
        reporters,
        preprocessors,
    };

    const server = new karma.Server(localConfig, (failCount) => {
        done(failCount ? new Error(`Failed ${failCount} tests.`) : null);
    });

    server.start();
}

gulp.task('test', ['scripts:test'], (done) => runTests(true, done));
gulp.task('test:auto', ['scripts:test-watch'], (done) => runTests(false, done));
