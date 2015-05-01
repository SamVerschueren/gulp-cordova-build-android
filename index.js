'use strict';

/**
 * Builds the cordova project for the Android platform.
 *
 * @author Sam Verschueren      <sam.verschueren@gmail.com>
 * @since  25 April 2015
 */

// module dependencies
var path = require('path'),
    fs = require('fs'),
    os = require('os'),
    through = require('through2'),
    gutil = require('gulp-util'),
    Q = require('q'),
    cordovaLib = require('cordova-lib').cordova,
    cordova = cordovaLib.raw;

// export the module
module.exports = function(options) {

    options = options || {};

    return through.obj(function(file, enc, cb) {
        // Change the working directory
        process.env.PWD = file.path;

        cb();
    }, function(cb) {
        var self = this,
            androidPath = path.join(cordovaLib.findProjectRoot(), 'platforms', 'android'),
            release = options.storeFile && options.keyAlias;

        Q.fcall(function() {
            return fs.existsSync(androidPath);
        }).then(function(exists) {
            if(!exists) {
                // Add the android platform if it does not exist
                return cordova.platforms('add', 'android');
            }
        }).then(function() {
            if(release) {
                var data = [];

                // Iterate over all the options and add them to the array that will be written to the properties file
                for(var key in options) {
                    data.push(key + '=' + options[key]);
                }

                // Write the release-signing.properties file
                fs.writeFileSync(path.join(androidPath, 'release-signing.properties'), data.join(os.EOL));
            }
        }).then(function() {
            var options = [];

            if(release) {
                // If the user wants to build for release, add the option
                options.push('--release');
            }

            // Build the platform
            return cordova.build({platforms: ['android'], options: options});
        }).then(function() {
            var base = path.join(androidPath, 'build/outputs/apk'),
                cwd = process.env.PWD,
                contents;

            if(release) {
                // Define the release variables
                path = path.join(base, 'android-release.apk');
                contents = fs.readFileSync(path);
            }
            else {
                // Define the debug variables
                path = path.join(base, 'android-debug.apk');
                contents = fs.readFileSync(path);
            }

            // Make sure the apk is passed to the next step
            self.push(new gutil.File({
                base: base,
                cwd: cwd,
                path: path,
                contents: contents
            }));

            cb();
        }).catch(function(err) {
            // Return an error if something happened
            cb(new gutil.PluginError('gulp-cordova-build-android', err.message));
        });
    });
};
