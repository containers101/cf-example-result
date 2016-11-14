

const gulp    = require('gulp');

const plugins = require('gulp-load-plugins')();

function unitTests() {
    return gulp.src(['tests/**/*.unit.js'])
        .pipe(
            plugins.mocha(
                {
                    reporter: 'spec',
                    //compilers: { js: babel },
                }
            )
        );
}


gulp.task(
    'test:unit', () => {
        return unitTests();
    }
);

gulp.task('test', plugins.sequence('test:unit'));

gulp.task('default', plugins.sequence('test'));