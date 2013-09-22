'use strict';
var lrSnippet = require('connect-livereload')({port: 35729});
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({

        watch: {
            compass: {
                files: ['_source/styles/sass/{,*/}*.{scss,sass}'],
                tasks: ['compass:server','exec:jekyll'],
                options: {
                    livereload: true
                }
            },

            jekyll: {
                files: [
                    '_source/{,*/}*.*',
                ],
                tasks: ['exec:jekyll'],
                options: {
                    livereload: true
                }
            }
        },

        connect: {
            server: {
                options:{
                    port: 8080,
                    base: '_site',
                    livereload: true,

                }
            }
        },

        compass: {
            options: {
                sassDir: '_source/styles/sass',
                cssDir: '_source/styles',
                imagesDir: '_source/images',
                javascriptsDir: '_source/scripts',
                fontsDir: '_source/styles/fonts',
                relativeAssets: true
            },
            server: {}
        },

        open: {
            server: {
                path: 'http://localhost:<%= connect.server.options.port %>'
            }
        },

        exec: {
            jekyll: {
                command: 'rm -rf _site/*; jekyll build',
                stdout: true
            }
        }
    });

    grunt.registerTask('default', [
        'compass:server',
        'exec:jekyll',
        'connect:server',
        'open',
        'watch'
    ]);
};
