var gulp = require('gulp'),
	concat = require('gulp-concat'),
	prefix = require('gulp-autoprefixer'),
	sass = require('gulp-sass'),
	browsersync = require('browser-sync').create(),
	rigger = require('gulp-rigger'),
	useref = require('gulp-useref'),
	uglify = require('gulp-uglify'),
	minifyCss = require('gulp-minify-css'),
	gulpif = require('gulp-if'),
	imagemin = require('gulp-imagemin'),
	newer = require('gulp-newer'),
	maps = require('gulp-sourcemaps'),
	del = require('del'),
	debug = require('gulp-debug'),
	flatten = require('gulp-flatten'),
	htmlmin = require('gulp-htmlmin');


gulp.task('fonts', ()=>{
	return gulp.src('bower_components/**/font*/*.*(otf|ttf|woff|eot|svg|woff2)')
	.pipe(flatten())
	.pipe(newer('public/fonts'))
	.pipe(debug())
	.pipe(gulp.dest('public/fonts'))
})

gulp.task('libs', ()=>{
	return gulp.src('bower_components/**/*')
	.pipe(newer('src/libs/'))
	.pipe(gulp.dest('src/libs/'))
	// .pipe(gulp.dest('public/libs/'))
})

gulp.task('images', ()=>{
	return gulp.src('src/img/**/*')
		.pipe(newer('public/img/'))
		.pipe(imagemin({
			optimizationLevel: 5,
			progressive: true
		}))
		.pipe(gulp.dest('public/img/'))
})

gulp.task('html', ()=>{
	return gulp.src('src/*.*(html|php)')
		// .pipe(newer('./'))
		// .pipe(gulpif('*.*(json|xml)', gulp.dest('public/')))
		.pipe(maps.init({loadMaps: true}))
		.pipe(rigger())
		.pipe(useref())
		.pipe(gulpif('*.js', uglify()))
		.pipe(gulpif('*.css', minifyCss()))
		// .pipe(htmlmin({collapseWhitespace: true}))
		.pipe(maps.write())
		.pipe(gulp.dest('./'))
		.pipe(gulp.dest('./public'))
})

gulp.task('sass', ()=>{
	return gulp.src('src/sass/main.sass')
		// .pipe(newer('public/css/main.css'))
		// .pipe(debug())
		.pipe(maps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(prefix({
			browsers: ['last 5 versions', '> 1%']
		}))
		.pipe(minifyCss())
		.pipe(maps.write())
		.pipe(gulp.dest('public/css/'))
		// .pipe(gulp.dest('src/css/'))
})

gulp.task('js', ()=>{
	return gulp.src('src/js/*.js')
	.pipe(newer('public/js/'))
	.pipe(maps.init())
	.pipe(uglify())
	.pipe(concat('script.js'))
	.pipe(maps.write())
	.pipe(gulp.dest('public/js'))
})

gulp.task('clean', ()=>{
	return del('public/*')
})


// ***** Tasks for Livereload *****

// gulp.task('html-reload', gulp.series('html'))
// gulp.task('css-reload', gulp.series('sass'))
// gulp.task('js-reload', gulp.series('js'))

// ********************************


gulp.task('watch', ()=>{
	gulp.watch('bower_components/**/*', gulp.series('libs'))
	gulp.watch('src/**/*.htm*', gulp.series('html'))
	gulp.watch('src/sass/*.sass', gulp.series('sass'))
	gulp.watch('src/**/*.js', gulp.series('js'))
})

gulp.task('serve', ()=>{
	browsersync.init({
		server: './',
		// proxy: 'prod.dev/specstroy/public/',
		tunnel: true
	})

	browsersync.watch('public/**/*').on('change', browsersync.reload)
})

gulp.task('default', gulp.series('libs', 'fonts', 'js', 'sass', 'images', 'html', gulp.parallel('watch', 'serve')))

gulp.task('compile', gulp.series('clean', 'images', 'libs', 'fonts', 'js', 'sass', 'html'))