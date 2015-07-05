'use strict';
var gulp = require("gulp");
var browserSync = require("browser-sync");
var babel = require("gulp-babel");
var clean = require("gulp-clean");
var shell = require('gulp-shell');
var bower = require('gulp-bower');

gulp.task('bower-install', function() {
    return bower()
        .pipe(gulp.dest('lib/'));
});

gulp.task("browser-sync", function(){
    browserSync({
        server: {
            baseDir: './build'
        }
    })
});

gulp.task("watch-files", function(){
    gulp.watch("src/index.html", ["copy-index"]);
    gulp.watch("src/**/*.js", ["babel-it"]);
});

gulp.task("copy-index", function(){
    gulp.src("src/**/*.html")
        .pipe(gulp.dest('./build'))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task("babel-it", function(){
    return gulp.src("src/**/*.js")
        .pipe(babel())
        .pipe(gulp.dest('./build'))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task("clean", function(){
    return gulp.src("./build", {read:false}).pipe(clean());
});

gulp.task("default", ['clean','bower-install', 'copy-index', 'babel-it', 'browser-sync', 'watch-files']);