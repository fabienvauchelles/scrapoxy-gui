'use strict';

const path = require('path');


const conf = require('./gulp/conf');

const pathSrcHtml = [
    path.join(conf.paths.src, '/**/*.html'),
];

function listFiles() {
    return [
        'node_modules/lodash/index.js',
        'node_modules/moment/moment.js',
        'node_modules/jquery/dist/jquery.js',
        'node_modules/angular/angular.js',
        'node_modules/angular-animate/angular-animate.js',
        'node_modules/angular-messages/angular-messages.js',
        'node_modules/angular-ui-router/release/angular-ui-router.js',
        'node_modules/restangular/dist/restangular.js',
        'node_modules/angular-ui-bootstrap/ui-bootstrap-tpls.js',
        'node_modules/d3/d3.js',
        'node_modules/c3/c3.js',
        'node_modules/toastr/toastr.js',
    ]
        .concat([
            path.join(conf.paths.tmp, '/serve/index.js'),
        ])
        .concat(pathSrcHtml);
}

module.exports = (config) => {
    const configuration = {
        files: listFiles(),

        singleRun: true,

        autoWatch: false,

        ngHtml2JsPreprocessor: {
            stripPrefix: `${conf.paths.src}/`,
            moduleName: 'myApp',
        },

        logLevel: 'WARN',

        frameworks: ['jasmine'],

        browsers: ['PhantomJS'],

        plugins: [
            'karma-phantomjs-launcher',
            'karma-coverage',
            'karma-jasmine',
            'karma-ng-html2js-preprocessor',
        ],

        coverageReporter: {
            type: 'html',
            dir: 'coverage/',
        },

        reporters: ['progress'],
    };

    // This is the default preprocessors configuration for a usage with Karma cli
    // The coverage preprocessor is added in gulp/unit-test.js only for single tests
    // It was not possible to do it there because karma doesn't let us now if we are
    // running a single test or not
    configuration.preprocessors = {};
    pathSrcHtml.forEach((p) => configuration.preprocessors[p] = ['ng-html2js']);

    // This block is needed to execute Chrome on Travis
    // If you ever plan to use Chrome and Travis, you can keep it
    // If not, you can safely remove it
    // https://github.com/karma-runner/karma/issues/1144#issuecomment-53633076
    if (configuration.browsers[0] === 'Chrome' &&
        process.env.TRAVIS) {
        configuration.customLaunchers = {
            'chrome-travis-ci': {
                base: 'Chrome',
                flags: ['--no-sandbox'],
            },
        };

        configuration.browsers = ['chrome-travis-ci'];
    }

    config.set(configuration);
};
