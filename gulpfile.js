var gulp = require("gulp"),
	htmlclean = require("gulp-htmlclean"),
	htmlmin = require("gulp-htmlmin"),
	rename = require("gulp-rename"),
	gutil = require("gulp-util"),
	cleanCSS = require("gulp-clean-css"),
	uglify = require("gulp-uglify"),
	zip = require("gulp-zip"),
	plumber = require("gulp-plumber");

var paths = {
	html : ["popup.html", "background.html"],
	js : "assets/js/*",
	css : "assets/css/*",
	libs : "assets/libs/**/*",
	img: "assets/img/**/*",
	distProdRoot : "dist",
	distProdJs : "dist/assets/js",
	distProdCss : "dist/assets/css",
	distProdLibs : "dist/assets/libs",
	distProdImgs: "dist/assets/img",
	manifest : "manifest.json"
}

/*MODIFYING CSS TASK*/
gulp.task("gen-css",function(){
	return gulp.src(paths.css)
		.pipe(plumber())
		.pipe(cleanCSS())
		.pipe(gulp.dest(paths.distProdCss))
})
/*MODIFYING JS TASK*/
gulp.task("gen-js", function(){
	return gulp.src(paths.js)
		.pipe(plumber())
		.pipe(uglify().on("error", function(errorLog){console.log(errorLog)}))
		.pipe(rename({suffix:".min"}))
		.pipe(gulp.dest(paths.distProdJs));
});
/*MODIFYING HTML TASK*/
gulp.task("gen-html", function(){
	return gulp.src(paths.html)
		.pipe(plumber())
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
/*COPY IMGS*/
gulp.task("gen-imgs", function(){
	return gulp.src(paths.img)
	.pipe(gulp.dest(paths.distProdImgs))
});
/*Build proyect for first time*/
gulp.task("firstBuild", ["gen-css", "gen-js", "gen-html", "gen-libs", "gen-manifest", "gen-imgs"], function(){
	gulp.watch(paths.html, ["gen-html"]);
	gulp.watch(paths.js, ["gen-js"]);
	gulp.watch(paths.img, ["gen-imgs"]);
	gulp.watch(paths.css, ["gen-css"]);
	gulp.watch(paths.libs, ["gen-libs"]);
	gulp.watch(paths.manifest, ["gen-manifest"]);
});
/*Delete last zip build*/
//gulp.task("delete_zip", function(){
//	return del(["dist/tfm_notifications.zip"])
//})
/*Generate zip file*/
gulp.task("gen-zip", function(){
	return gulp.src(["dist/**", "!dist/tfm_notifications.zip"])
	.pipe(zip("tfm_notifications.zip"))
	.pipe(gulp.dest("dist"));
});
/*Create a new zip file*/
//gulp.task("gen-new-zip", gulpsync.sync([["delete_zip", ["gen-zip"]]]));
/*DEFAULT TASK*/
gulp.task("default", function(){
	gulp.start("firstBuild");
})