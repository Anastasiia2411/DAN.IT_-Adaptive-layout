const {src, dest, series, watch} = require("gulp")
const sass = require("gulp-sass")(require('node-sass'))
const csso = require("gulp-csso")
const concat = require("gulp-concat")
const autoprefixer = require("gulp-autoprefixer")
const clearFolder = require("gulp-clean")
const imagemin = require("gulp-imagemin")
const uglify = require('gulp-uglify')
const sync = require("browser-sync").create()
const purgecss = require('gulp-purgecss')
const rename = require("gulp-rename");


function scss() {
    return src("src/scss/imports.scss")
        .pipe(sass()).on("error",()=>{
            console.log("error!")
        })
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            cascade: false
        }))
        .pipe(csso())
        .pipe(rename("styles.min.css"))
        .pipe(
            purgecss({
                content: ['./index.html'],
                safelist: ['animation1', 'animation2', 'animation3',"animation1-reverse", "animation2-reverse", "animation3-reverse","animation-for-list","animation-for-list-reverse"]
            }))
        .pipe(dest("dist"))
}


function js() {
    return src("src/js/**.js")
        .pipe(concat("script.min.js"))
        .pipe(uglify())
        .pipe(dest('dist'))
}

function clear() {
    return src("./dist/*")
        .pipe(clearFolder())
}

function imageMin() {
    return src('src/img/*.*')
        .pipe(imagemin())
        .pipe(dest('dist/img'))
}

function serve() {
    sync.init({
        server: {
            file: "./index.html"
        },
    })

    watch("src/js/**.js", series(js)).on("change", sync.reload)
    watch("src/scss/**.scss", series(scss)).on("change", sync.reload)
    watch("src/img/*.png", series(imageMin)).on("change", sync.reload)
}

exports.clear = clear
exports.scss = scss
exports.build = series(clear, scss, js, imageMin)
exports.dev = series(serve)






