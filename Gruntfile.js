/*jshint node:true, strict:false */

module.exports = function(grunt) {
    grunt.config.init({
        mochacli: {
            options: {
                require: ['should'],
                reporter: 'nyan',
                bail: true
            },
            test: {
                src: ['tests/*.js'],
                options: {
                    reporter: 'nyan'
                }
            },
            bamboo: {
                src: ['tests/*.js'],
                options: {
                    reporter: 'xunit'
                }
            }
        },

        jshint: {
            test: {
                src: ['tests/**/*.js', '*.js']
            },

            options: {
                jshintrc: '.jshintrc'
            }
        },

        watch: {
            test: {
                files: ['Gruntfile.js', 'tests/**/*.js', '*.js', 'src/**/*.js'],
                tasks: ['test']
            }
        },
    });

    grunt.loadNpmTasks('grunt-mocha-cli');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('test', ['jshint', 'mochacli:test']);
    grunt.registerTask('bamboo', ['jshint', 'mochacli:bamboo']);
};