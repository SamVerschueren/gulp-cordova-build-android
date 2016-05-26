'use strict';
var path = require('path');
var fs = require('fs');
var os = require('os');
var through = require('through2');
var gutil = require('gulp-util');
var Q = require('q');
var cordovaLib = require('cordova-lib').cordova;
var cordova = cordovaLib.raw;

// export the module
module.exports = function (options) {
	options = options || {};

	return through.obj(function (file, enc, cb) {
		// Change the working directory
		process.env.PWD = file.path;

		cb();
	}, function (cb) {
		var self = this;
		var androidPath = path.join(cordovaLib.findProjectRoot(), 'platforms', 'android');
		var sign = options.storeFile && options.keyAlias;
		var release = options.release || sign;
		var buildMethod = options.buildMethod || process.env.ANDROID_BUILD;

		Q.fcall(function () {
			return fs.existsSync(androidPath);
		}).then(function (exists) {
			if (!exists) {
				// Add the android platform if it does not exist
				return cordova.platforms('add', 'android' + (options.version ? ('@' + options.version) : ''));
			}
		}).then(function () {
			if (sign) {
				var data = [];

				// Add all the options related to key signing to the array to be added to 'release-signing.properties'
				data.push('storeFile=' + options.storeFile);
				data.push('keyAlias=' + options.keyAlias);
				if (options.storePassword) {
					data.push('storePassword=' + options.storePassword);
				}
				if (options.keyPassword) {
					data.push('keyPassword=' + options.keyPassword);
				}
				if (options.storeType) {
					data.push('storeType=' + options.storeType);
				}

				// Write the release-signing.properties file
				fs.writeFileSync(path.join(androidPath, 'release-signing.properties'), data.join(os.EOL));
			}
		}).then(function () {
			var options = [];

			if (release) {
				// If the user wants to build for release, add the option
				options.push('--release');
			}

			if (buildMethod === 'ant') {
				options.push('--ant');
			} else {
				options.push('--gradle');
			}

			// Build the platform
			return cordova.build({platforms: ['android'], options: options});
		}).then(function () {
			var apkOutputPath = buildMethod === 'ant' ? 'bin' : 'build/outputs/apk';
			var base = path.join(androidPath, apkOutputPath);
			var cwd = process.env.PWD;

			// Iterate over the output directory
			fs.readdirSync(base).forEach(function (file) {
				// Check if the file ends with .apk
				if (file.indexOf('.apk') !== -1) {
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
		}).catch(function (err) {
			console.log(err);
			// Return an error if something happened
			cb(new gutil.PluginError('gulp-cordova-build-android', err.message));
		});
	});
};
