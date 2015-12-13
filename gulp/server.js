'use strict';

const browserSync = require('browser-sync'),
    browserSyncSpa = require('browser-sync-spa'),
    connect = require('gulp-connect'),
    gulp = require('gulp'),
    path = require('path'),
    proxyMiddleware = require('http-proxy-middleware'),
    util = require('util');

const conf = require('./conf');


function proxyMiddlewares() {
    return [
        proxyMiddleware('/api', {
            target: 'http://localhost:8889',
            changeOrigin: true,
        }),
        proxyMiddleware('/socket.io', {
            target: 'http://localhost:8889',
            changeOrigin: true,
            ws: true,
        }),
    ];
}

function browserSyncInit(baseDir, browser) {
    if (!browser) {
        browser = 'defaut';
    }

    let routes = null;
    if (baseDir === conf.paths.src || util.isArray(baseDir) && baseDir.indexOf(conf.paths.src) !== -1) {
        routes = {'/node_modules': 'node_modules'};
    }

    const server = {baseDir, routes};

    /*
     * You can add a proxy to your backend by uncommenting the line bellow.
     * You just have to configure a context which will we redirected and the target url.
     * Example: $http.get('/users') requests will be automatically proxified.
     *
     * For more details and option, https://github.com/chimurai/http-proxy-middleware/blob/v0.0.5/README.md
     */
    server.middleware = proxyMiddlewares();

    browserSync.instance = browserSync.init({
        startPath: '/',
        server,
        port: 3000,
        browser,
    });
}

browserSync.use(browserSyncSpa({
    selector: '[ng-app]', // Only needed for angular apps
}));


gulp.task('serve', ['watch'], () => {
    browserSyncInit([path.join(conf.paths.tmp, '/serve'), conf.paths.src]);
});


gulp.task('serve:dist', ['build'], () => {
    connect.server({
        root: [conf.paths.dist],
        host: '0.0.0.0',
        port: 3000,
        middleware: () => proxyMiddlewares(),
    });
});


gulp.task('serve:e2e', ['inject'], () => {
    browserSyncInit([`${conf.paths.tmp}/serve`, conf.paths.src], []);
});


gulp.task('serve:e2e-dist', ['build'], () => {
    browserSyncInit(conf.paths.dist, []);
});
