const gulp = require('gulp')
const htmlmin = require('gulp-htmlmin')
const cssnano = require('gulp-cssnano')
const uglify = require('gulp-uglify')
const del = require('del')

gulp.task('clean', async function () {
	return del(['dist/**'])
})

gulp.task('html', function () {
	return gulp
		.src('index.html')
		.pipe(htmlmin({ collapseWhitespace: true }))
		.pipe(
			gulp.dest('dist', function (err) {
				if (err) {
					console.log('Error: ', err)
				}
			})
		)
})

gulp.task('css', function () {
	return gulp
		.src('assets/css/*.css')
		.pipe(cssnano())
		.pipe(gulp.dest('dist/assets/css'))
})

gulp.task('js-assets', function () {
	return gulp
		.src('assets/js/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('dist/assets/js'))
})


gulp.task('images', function () {
	return gulp.src('assets/images/**/*').pipe(gulp.dest('dist/assets/images'))
})

gulp.task('font', function () {
	return gulp.src('assets/font/**/*').pipe(gulp.dest('dist/assets/font'))
})

gulp.task(
	'build',
	gulp.series('clean', 'html', 'css', 'js-assets', 'images', 'font')
)

