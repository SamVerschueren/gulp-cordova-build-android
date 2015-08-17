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
            sign = options.storeFile && options.keyAlias,
            release = options.release || sign;

        Q.fcall(function() {
            return fs.existsSync(androidPath);
        }).then(function(exists) {
            if(!exists) {
                // Add the android platform if it does not exist
                return cordova.platforms('add', 'android');
            }
        }).then(function() {
            if(sign) {
                var data = [];

                // Add all the options related to key signing to the array to be added to 'release-signing.properties'
                data.push('storeFile=' + options.storeFile);
                data.push('keyAlias=' + options.keyAlias);
                if(options.storePassword) {
                    data.push('storePassword=' + options.storePassword);
                }
                if(options.keyPassword) {
                    data.push('keyPassword=' + options.keyPassword);
                }
                if(options.storeType) {
                    data.push('storeType=' + options.storeType);
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
                cwd = process.env.PWD;
            
            // Iterate over the output directory
            fs.readdirSync(base).forEach(function(file) {
                // Check if the file ends with .apk
                if(~file.indexOf('.apk')) {
                    var filePath = path.join(base, file);
                    
                    // Push the file to the result set
                    self.push(new gutil.File({
                        base: base,
                        cwd: cwd,
                        path: filePath,
                        contents: fs.readFileSync(path.join(base, file))
                    }));
                }
            });

            cb();
        }).catch(function(err) {
            console.log(err);
            // Return an error if something happened
            cb(new gutil.PluginError('gulp-cordova-build-android', err.message));
        });
    });
};
