'use strict';
var gulp = require("gulp");
var browserSync = require("browser-sync");
var babel = require("gulp-babel");
var clean = require("gulp-clean");
var shell = require('gulp-shell');
var bower = require('gulp-bower');
var htmlreplace = require('gulp-html-replace');
var uglify = require("gulp-uglifyjs");

gulp.task('bower-install', function() {
    return bower()
        .pipe(gulp.dest('lib/'));
});

gulp.task("html-replace", function() {
    return gulp.src("./src/index.html")
        .pipe(htmlreplace({
            //'css': 'styles.min.css',
            'js': 'bundle.min.js'
        }))
        .pipe(gulp.dest('./build'));
});

gulp.task("browser-sync", function(){
    browserSync({
        server: {
            baseDir: './build'
        }
    })
});

gulp.task("watch-files", function(){
    gulp.watch("./src/index.html", ["copy-index"]);
    gulp.watch("./src/**/*.js", ["babel-it"]);
});

gulp.task("copy-html", function(){
    return gulp.src("./src/**/*.html")
        .pipe(gulp.dest('./build'))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task("babel-it", function(){
    return gulp.src("./src/**/*.js")
        .pipe(babel())
        .pipe(uglify('bundle.min.js', {
            outSourceMap: true
        }))
        .pipe(gulp.dest('./build'))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task("clean", function(){
    return gulp.src("./build", {read:false}).pipe(clean());
});

gulp.task("default", ['clean','bower-install', 'babel-it', 'html-replace', 'browser-sync', 'watch-files']);