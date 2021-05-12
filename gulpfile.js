const {src, dest, watch, parallel, start} = require("gulp");
const sass = require("gulp-sass");
const minify = require("gulp-clean-css");

function sassTask() {
    return src("assets/sass/theme.sass")
        .pipe(sass({outputStyle: "compressed"}))
        .pipe(dest("assets/css"));
}

function cssTask() {
    return src("node_modules/bootstrap-icons/font/bootstrap-icons.css")
        .pipe(minify())
        .pipe(dest("assets/css"))
}

function fontsTask() {
    return src("node_modules/bootstrap-icons/font/fonts/*")
        .pipe(dest("assets/css/fonts"))
}

function jsTask() {
    return src([
        "node_modules/jquery/dist/jquery.min.js",
        "node_modules/bootstrap/dist/js/bootstrap.js"
    ])
        .pipe(dest("assets/js"))
}

function watchTask() {
    watch([
        "assets/**/theme.sass",
        "assets/**/_variables.sass",
    ], {ignoreInitial: false}, sassTask);
}

exports.default = parallel(sassTask, cssTask, fontsTask, jsTask);
exports.watch = watchTask;