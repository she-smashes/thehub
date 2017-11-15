module.exports = function (grunt) {
    'use strict';
    grunt.initConfig({
        'swagger-js-codegen': {
            options: {
                apis: [
                    {
                        swagger: 'swagger-out.json',
                        fileName: 'user.js',
                        className: 'user',
                        type: 'react'
                    },
                    {
                        swagger: 'swagger-out.json',
                        fileName: 'userBadge.js',
                        className: 'userBadge',
                        type: 'react'
                    },
                    {
                        swagger: 'swagger-out.json',
                        fileName: 'initiative.js',
                        className: 'initiative',
                        type: 'react'
                    },
                    {
                        swagger: 'swagger-out.json',
                        fileName: 'event.js',
                        className: 'event',
                        type: 'react'
                    }
                ],
                dest: '../ui/src/lib'
            },
            dist: {

            }
        }
    });

    // Load local tasks.
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);


    // Default task.
    grunt.registerTask('swagger', ['swagger-js-codegen']);

};
