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
        .pipe(android())
        .pipe(gulp.dest('apk'));
});
```

This plugin will build the cordova project for the Android platform.

Because the plugin returns the apk file, you can pipe it to ```gulp.dest```. This will store the ```android-debug.apk``` file
in the ```apk``` directory.

### Sign the apk

By not passing any options to the plugin, you will receive a debug version of your apk. It's possible to let the plugin
do the heavy lifting and let it create a signed release version.

```JavaScript
var gulp = require('gulp'),
    create = require('gulp-cordova-create'),
    plugin = require('gulp-cordova-plugin'),
    android = require('gulp-cordova-build-android');

gulp.task('build', function() {
    return gulp.src('dist')
        .pipe(create())
        .pipe(android({storeFile: '/Path/to/key.keystore', keyAlias: 'my_alias'}))
        .pipe(gulp.dest('apk'));
});
```

When running the `build` task, it will now ask for the key store password and for the key password. When the apk is signed, it will
store the `android-release.apk` file in the `apk` directory.

## API

### android([options])

#### options

##### storeFile

*required*
Type: `string`

Absolute path to your key file.

##### storePassword

Type: `string`

The key store password.

##### keyAlias

*required*
Type: `string`

The alias of the key.

##### keyPassword

Type: `string`

The password of the key alias.

## Related

See [`gulp-cordova`](https://github.com/SamVerschueren/gulp-cordova) for the full list of available packages.

## Contributors

- Sam Verschueren [<sam.verschueren@gmail.com>]

## License

MIT © Sam Verschueren
