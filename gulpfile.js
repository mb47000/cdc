"use strict";

const gulp = require("gulp");
const delete_ = require("del");
const set_prefixe = require("gulp-autoprefixer");
const merge_stream = require("merge-stream");
const plumber = require("gulp-plumber");
const sass = require("gulp-sass");
const header = require("gulp-header");
const clean_css = require("gulp-clean-css");
const rename = require("gulp-rename");
const pkg = require('./package.json'); // charge les info pour créer le header du document
const header_data = ['/*!\n', // header du doc
    ' * CDC - v<%= pkg.version %> (<%= pkg.email %>)\n',
    ' * Copyright ' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
    ' * Licensed under <%= pkg.license %> (https://github.com/mb47000/<%= pkg.name %>/blob/master/LICENSE)\n',
    ' */\n',
    '\n'
].join('');


function prepare_vendor() { // Supprime le contenue du dossier Vendor avant de mettre à jour les modules. Etape 1/2 de vendor_update
    return delete_(["./vendor/"]);
}

function modules_to_vendor() { //copie les dépandance vers le dossier vendor. Etape 2/2 de vendor update
    // Bootstrap JS
    var bootstrap_JS = gulp.src('./node_modules/bootstrap/dist/js/*')
        .pipe(gulp.dest('./vendor/bootstrap/js'));
    // Bootstrap SCSS
    var bootstrap_SCSS = gulp.src('./node_modules/bootstrap/scss/**/*')
        .pipe(gulp.dest('./vendor/bootstrap/scss'));
    // Font Awesome
    var font_awesome = gulp.src('./node_modules/@fortawesome/**/*')
        .pipe(gulp.dest('./vendor'));
    // jQuery
    var jquery = gulp.src([
            './node_modules/jquery/dist/*',
            '!./node_modules/jquery/dist/core.js'
        ])
        .pipe(gulp.dest('./vendor/jquery'));

    return merge_stream(bootstrap_JS, bootstrap_SCSS, font_awesome, jquery);
}

function scss_to_css() { // compile le scss et créer un .css et un .min.css
    return gulp
        .src("./public/scss/**/*.scss")
        .pipe(plumber())
        .pipe(sass({
            outputStyle: "expanded",
            includePaths: "./node_modules",
        }))
        .on("error", sass.logError)
        .pipe(set_prefixe({
            cascade: false
        }))
        .pipe(header(header_data, {
            pkg: pkg
        }))
        .pipe(gulp.dest("./public/css"))
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(clean_css())
        .pipe(gulp.dest("./public/css"));
}


// Constante contenant des combinaison de fonction qui s'éxecuteront les une après les autres dans un ordre séquentiel
const vendor_update = gulp.series(prepare_vendor, modules_to_vendor);
const build = gulp.series(modules_to_vendor, scss_to_css);


// Export des taches éxecultable via ligne de commande dans le dossier du projet. Exemple : ( gulp vendor_update )
exports.vendor_update = vendor_update;
exports.scss_to_css = scss_to_css;
exports.build = build;
exports.default = build;