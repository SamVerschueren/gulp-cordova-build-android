# gulp-cordova-build-android

> Build the cordova project for the Android platform.

## Installation

```bash
npm install --save-dev gulp-cordova-build-android
```

## Usage

```javascript
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

Because the plugin returns the apk files, you can pipe it to `gulp.dest`. This will store all the apk files
in the `apk` directory.

### Build a release apk

By setting release to true, the plugin will build a release version of the APK. This will create an unsigned apk file.

```javascript
var gulp = require('gulp'),
    create = require('gulp-cordova-create'),
    plugin = require('gulp-cordova-plugin'),
    android = require('gulp-cordova-build-android');

gulp.task('build', function() {
    return gulp.src('dist')
        .pipe(create())
        .pipe(plugin('org.apache.cordova.dialogs'))
        .pipe(plugin('org.apache.cordova.camera'))
        .pipe(android({release: true}))
        .pipe(gulp.dest('apk'));
});
```

### Sign the apk

To produce a signed apk you need to pass signing options to the plugin. If you pass signing options to the plugin you do not need to
specify that it is a release build as the plugin will do a release build automatically

```javascript
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

When running the `build` task, it will now ask for the key store password and for the key password.

## API

### android([options])

#### options

##### release

Type: `boolean`

Set the build to be a release build.

##### storeFile

*Required*  
Type: `string`

Absolute path to your key file.

##### storePassword

Type: `string`

The key store password.

##### keyAlias

*Required*  
Type: `string`

The alias of the key.

##### keyPassword

Type: `string`

The password of the key alias.

##### storeType

Type: `string`

The format of the key file. The default is to auto-detect based on the file extension.

## Related

See [`gulp-cordova`](https://github.com/SamVerschueren/gulp-cordova) for the full list of available packages.

## Contributors

- Sam Verschueren [<sam.verschueren@gmail.com>]

## License

MIT © Sam Verschueren
