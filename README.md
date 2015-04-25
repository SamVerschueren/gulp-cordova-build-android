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
    return gulp.src('www')
        .pipe(create())
        .pipe(plugin('org.apache.cordova.dialogs'))
        .pipe(plugin('org.apache.cordova.camera'))
        .pipe(android());
});
```

This plugin will build the cordova project for the Android platform.

## Related

- [`gulp-cordova-create`](https://github.com/SamVerschueren/gulp-cordova-create) for creating a cordova project.
- [`gulp-cordova-plugin`](https://github.com/SamVerschueren/gulp-cordova-plugin) for adding a plugin to your cordova project.

## Contributors

- Sam Verschueren [<sam.verschueren@gmail.com>]

## License

MIT © Sam Verschueren
