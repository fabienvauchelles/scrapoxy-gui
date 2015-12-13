'use strict';

const gulp = require('gulp'),
    path = require('path');

const $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'uglify-save-license', 'del'],
});

const conf = require('./conf');


gulp.task('partials',
    () => gulp.src([
        path.join(conf.paths.src, '/{app,components}/**/*.html'),
        path.join(conf.paths.tmp, '/serve/{app,components}/**/*.html'),
    ])
        .pipe($.minifyHtml({
            empty: true,
            spare: true,
            quotes: true,
        }))
        .pipe($.angularTemplatecache('templateCacheHtml.js', {
            module: 'myApp',
            root: '',
        }))
        .pipe(gulp.dest(`${conf.paths.tmp}/partials/`))
);


gulp.task('html', ['inject', 'partials'], () => {
    const partialsInjectFile = gulp.src(path.join(conf.paths.tmp, '/partials/templateCacheHtml.js'), {read: false});
    const partialsInjectOptions = {
        starttag: '<!-- inject:partials -->',
        ignorePath: path.join(conf.paths.tmp, '/partials'),
        addRootSlash: false,
    };

    const htmlFilter = $.filter('*.html', {restore: true}),
        jsFilter = $.filter('**/*.js', {restore: true}),
        cssFilter = $.filter('**/*.css', {restore: true});

    let assets;

    return gulp.src(path.join(conf.paths.tmp, '/serve/*.html'))
        .pipe($.inject(partialsInjectFile, partialsInjectOptions))
        .pipe(assets = $.useref.assets())
        .pipe($.rev())
        .pipe(jsFilter)
        .pipe($.sourcemaps.init())
        .pipe($.uglify({preserveComments: $.uglifySaveLicense})).on('error', conf.errorHandler('Uglify'))
        .pipe($.sourcemaps.write('maps'))
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        .pipe($.replace('../node_modules/bootstrap-sass/assets/fonts/bootstrap/', '../assets/fonts/'))
        .pipe($.replace('../node_modules/font-awesome/fonts/', '../assets/fonts/'))
        .pipe($.minifyCss({processImport: false}))
        .pipe($.sourcemaps.write('maps'))
        .pipe(cssFilter.restore)
        .pipe(assets.restore())
        .pipe($.useref())
        .pipe($.revReplace())
        .pipe(htmlFilter)
        .pipe($.minifyHtml({
            empty: true,
            spare: true,
            quotes: true,
            conditionals: true,
        }))
        .pipe(htmlFilter.restore)
        .pipe(gulp.dest(path.join(conf.paths.dist, '/')))
        .pipe($.size({title: path.join(conf.paths.dist, '/'), showFiles: true}));
});


gulp.task('other', () => {
    const fileFilter = $.filter((file) => file.stat.isFile());

    return gulp.src([
        path.join(conf.paths.src, '/**/*'),
        path.join(`!${conf.paths.src}`, '/**/*.{html,css,js,scss}'),
    ])
        .pipe(fileFilter)
        .pipe(gulp.dest(path.join(conf.paths.dist, '/')));
});


gulp.task('clean',
    () => $.del([path.join(conf.paths.dist, '/'), path.join(conf.paths.tmp, '/')])
);


gulp.task('build', ['html', 'other']);
