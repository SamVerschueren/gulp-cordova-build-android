'use strict';

/**
 * Builds the cordova project for the Android platform.
 *
 * @author Sam Verschueren      <sam.verschueren@gmail.com>
 * @since  25 April 2015
 */

// module dependencies
var path = require('path'),
    through = require('through2'),
    gutil = require('gulp-util'),
    Q = require('q'),
    cordova = require('cordova-lib').cordova.raw;

// export the module
module.exports = function() {

    return through.obj(function(file, enc, cb) {
        // Change the working directory
        process.env.PWD = file.path;

        // Pipe the file to the next step
        this.push(file);

        cb();
    }, function(cb) {
        Q.fcall(function() {
            // Add the android platform
            return cordova.platforms('add', 'android');
        }).then(function() {
            // Build the platform
            return cordova.build();
        }).then(cb).catch(function(err) {
            // Return an error if something happened
            cb(new gutil.PluginError('gulp-cordova-build-android', err.message));
        });
    });
};
