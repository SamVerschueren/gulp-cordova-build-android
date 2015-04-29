# gulp-cordova-build-android

> This step builds the cordova project for the Android platform

## Installation

```bash
npm install --save-dev gulp-crodva-build-android
```

**Not yet available**

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
    return gulp.src('dist')
        .pipe(android(true));
});
```

This task will copy the ```dist``` folder to the ```www``` folder of cordova project and then execute the following commands.

```bash
$ cordova platform remove android
$ cordova platform add android
$ cordova build android
```

If no parameter is provided, it will just copy ```dist``` directory to ```www``` and execute the build command.

## Related

See [`gulp-cordova`](https://github.com/SamVerschueren/gulp-cordova) for the full list of available packages.

## Contributors

- Sam Verschueren [<sam.verschueren@gmail.com>]

## License

MIT © Sam Verschueren
