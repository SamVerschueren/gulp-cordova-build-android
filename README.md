# gulp-cordova-build-android

> Build the cordova project for the Android platform.

## Installation

```bash
npm install --save-dev gulp-cordova-build-android
```

## Usage

```JavaScript
var gulp = require('gulp'),
    create = require('gulp-cordova-create'),
    plugin = require('gulp-cordova-plugin'),
    android = require('gulp-cordova-build-android');

gulp.task('build', function() {
    return gulp.src('dist')
        .pipe(create())
        .pipe(plugin('org.apache.cordova.dialogs'))
        .pipe(plugin('org.apache.cordova.camera'))
        .pipe(android());
});
```

This plugin will build the cordova project for the Android platform.

### Re-adding the android platform

The ```android()``` method accepts one optional parameter. If the parameter passed in is ```true```, it will first
remove the entire android platform and add it again.

```JavaScript
var gulp = require('gulp'),
    android = require('gulp-cordova-build-android');

gulp.task('rebuild', function() {
    return gulp.src('.cordova')
        .pipe(android(true));
});
```

This task will simply remove the android platform, add it again and rebuild it.

```bash
$ cordova platform remove android
$ cordova platform add android
$ cordova build android
```

If no parameter is provided, it will only build the platform.

## Related

See [`gulp-cordova`](https://github.com/SamVerschueren/gulp-cordova) for the full list of available packages.

## Contributors

- Sam Verschueren [<sam.verschueren@gmail.com>]

## License

MIT © Sam Verschueren
