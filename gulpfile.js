const { src, dest, watch, series } = require("gulp");
const dartSass = require("sass");
const gulpSass = require("gulp-sass")(dartSass);
const sourcemaps = require("gulp-sourcemaps");
const autoprefixerMod = require("gulp-autoprefixer"); // <-- note name change
const cleanCSS = require("gulp-clean-css");
const rename = require("gulp-rename");

const autoprefixer = autoprefixerMod.default || autoprefixerMod; // <-- fix

const paths = { scss: "src/scss/main.scss", out: "dist/css" };

function styles() {
  return src(paths.scss)
    .pipe(sourcemaps.init())
    .pipe(
      gulpSass.sync({ outputStyle: "expanded" }).on("error", gulpSass.logError)
    )
    .pipe(autoprefixer({ cascade: false }))
    .pipe(dest(paths.out))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.write("."))
    .pipe(dest(paths.out));
}

function dev() {
  watch("src/scss/**/*.scss", styles);
}

exports.default = series(styles, dev);
exports.build = styles;
