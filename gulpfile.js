var gulp = require("gulp"),
	htmlclean = require("gulp-htmlclean"),
	htmlmin = require("gulp-htmlmin"),
	rename = require("gulp-rename"),
	gutil = require("gulp-util"),
	cleanCSS = require("gulp-clean-css"),
	uglify = require("gulp-uglify");

var paths = {
	html : ["popup.html", "background.html"],
	js : "assets/js/*",
	css : "assets/css/*",
	libs : "assets/libs/**/*",
	distProdRoot : "dist",
	distProdJs : "dist/assets/js",
	distProdCss : "dist/assets/css",
	distProdLibs : "dist/assets/libs",
	manifest : "manifest.json"
}

/*MODIFYING CSS TASK*/
gulp.task("gen-css",function(){
	return gulp.src(paths.css)
		.pipe(cleanCSS())
		.pipe(gulp.dest(paths.distProdCss))
})
/*MODIFYING JS TASK*/
gulp.task("gen-js", function(){
	return gulp.src(paths.js)
		.pipe(uglify().on("error", function(errorLog){console.log(errorLog)}))
		.pipe(rename({suffix:".min"}))
		.pipe(gulp.dest(paths.distProdJs));
});
/*MODIFYING HTML TASK*/
gulp.task("gen-html", function(){
	return gulp.src(paths.html)
		.pipe(htmlclean())
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest(paths.distProdRoot))
})
/*COPY LIBS*/
gulp.task("gen-libs", function(){
	return gulp.src(paths.libs)
		.pipe(gulp.dest(paths.distProdLibs));
});
/*COPY MANIFEST.JSON*/
gulp.task("gen-manifest", function(){
	return gulp.src(paths.manifest)
		.pipe(gulp.dest(paths.distProdRoot))
})
/*Build proyect*/
gulp.task("build", ["gen-css", "gen-js", "gen-html", "gen-libs", "gen-manifest"]);
/*DEFAULT TASK*/
gulp.task("default", function(){
	gulp.start("build");
	gulp.watch(paths.html, ["gen-html"]);
	gulp.watch(paths.js, ["gen-js"]);
	gulp.watch(paths.css, ["gen-css"]);
	gulp.watch(paths.libs, ["gen-libs"]);
	gulp.watch(paths.manifest, ["gen-manifest"]);
})