// Include Gulp
var gulp = require( 'gulp' );

// Include Plugins
var sass = require( 'gulp-ruby-sass' ),
	autoprefixer = require( 'gulp-autoprefixer' ),
	jshint = require( 'gulp-jshint' ),
	concat = require( 'gulp-concat' ),
	notify = require( 'gulp-notify' ),
	cache = require( 'gulp-cache' );

// File Paths
var paths = {
	scripts: 'src/scripts/**/*.js',
};

// Tasks
// Styles
gulp.task( 'styles', function() {
	return sass( 'src/styles/style.scss', { style: 'expanded' } )
		.pipe( autoprefixer( { browsers: 'last 2 versions', cascade: false } ) )
		.on('error', function (err) {
			console.error('Error!', err.message);
		})
		.pipe( gulp.dest( './' ) )
		.pipe( notify( { message: 'Styles task complete' } ) );
});

// Scripts
gulp.task('scripts', function() {
	return gulp.src( 'src/scripts/**/*.js' )
		.pipe( jshint.reporter( 'default' ) )
		.pipe( concat( 'script.js' ) )
		.pipe( gulp.dest( 'js' ) )
		.pipe( notify( { message: 'Scripts task complete' } ) );
});

// Watch files for changes
gulp.task( 'watch', function() {

	// Watch .scss files
	gulp.watch( 'src/styles/**/*.scss', ['styles'] );

	// Watch .js files
	gulp.watch( 'src/scripts/**/*.js', ['scripts'] );
});

// Default Task
gulp.task( 'default', ['styles', 'scripts', 'watch'] );
