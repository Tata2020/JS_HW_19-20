'use strict';

var gulp = require('gulp'),
    fileinclude = require('gulp-file-include'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    // concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs'),
    plumber = require('gulp-plumber'),
    sass = require('gulp-sass'),
 //   sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    cssmin = require('gulp-clean-css'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload;

var path = {
    build: {
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/'
    },
    src: {
        html: 'src/*.html',
        js: 'src/js/*.js',
        style: 'src/sass/*.scss',
        img: 'src/img/*.*',
        fonts: 'src/fonts/*.*'
    },
    watch: {
        html: 'src/**/*.html', 
        js: 'src/js/*.js',
        style: 'src/sass/*.scss',
        img: 'src/img/*.*',
        fonts: 'src/fonts/*.*'
    },
    clean: '/build'
};

var config = {
    server: {
        baseDir: "./build",
        directory: true
    }
};

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('clean', function () {
    return del(path.clean);
});

gulp.task('html:build', function () {
    gulp.src(path.src.html) 
        .pipe(plumber())
        .pipe(fileinclude({
           prefix: '@@',
           basepath: '@file'
         }))
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});

gulp.task('js:build', function () {
    gulp.src(path.src.js) 
        .pipe(plumber())
        .pipe(rigger()) 
        //.pipe(sourcemaps.init()) 
        .pipe(uglify('script.min.js')) 
        //.pipe(sourcemaps.write()) 
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});

gulp.task('style:build', function () {
    gulp.src(path.src.style) 
        .pipe(plumber())
        .pipe(prefixer())
       // .pipe(sourcemaps.init())
        .pipe(sass({
            sourceMap: false,
            errLogToConsole: true
        }))
        
        .pipe(cssmin())
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});

gulp.task('image:build', function () {
    gulp.src(path.src.img) 
        .pipe(plumber())
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({stream: true}));
});

gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(plumber())
        .pipe(gulp.dest(path.build.fonts))
});

gulp.task('build', [
    'html:build',
    'js:build',
    'style:build',
    'fonts:build',
    'image:build'
]);


gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
});


gulp.task('default', ['clean', 'build', 'webserver', 'watch']);