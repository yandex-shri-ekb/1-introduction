module.exports = function(grunt) {
    "use strict";

    // Application options
    var options = {
        'common' : {},
        'dev' : {
            // Name for compiled application single css and js files
            compiledAssetsName: 'app'
        }
    };

    grunt.initConfig({

        watch: {

            // Track the changes in jade templates
            jade: {
                files: ['pages/*.jade', 'modules/**/*.jade'],
                tasks: 'jade:dev'
            },

            // Track the changes in stylus
            stylus: {
                files: ['modules/**/*.styl'],
                tasks: ['clean:dev', 'stylus:dev']
            },

            // Track the changes in assets files
            sync: {
                files: ['modules/**/assets/**/*'],
                tasks: 'sync:dev'
            }
        },

        // Syncronize assets folders in modules with application assets folder
        sync: {
            dev: {
                files: [{
                    cwd: 'modules/',
                    src: ['**/assets/**/*'],
                    dest: 'assets/',

                    // Option to replace destination path (see grunt-sync patch: /node_pathces/grunt-sync/tasks/sync.js)
                    destPathReplacer: function (dest) {
                         return dest.replace(/\\assets/g, '');
                    }
                }]
            }
        },

        // Compile stylus to main application css
        stylus: {
            dev: {
                files: [{
                    src: ['modules/app/app.styl'],
                    dest: 'assets/' + options.dev.compiledAssetsName +'.css'
                }],
                options: {
                    compress: false
                }
            }
        },

        // Compile jade templates to html (each page template - into one html file)
        jade: {
            options: {
                // Output indented HTML
                pretty: true
            },

            dev: {
                files: [{
                    expand: true,
                    cwd: 'pages/',
                    src: ['*.jade'],
                    dest: '',
                    ext: '.html'
                }],

                options: {
                    data: {
                        // Send application options to templates
                        options: options.dev
                    }
                }
            }
        },

        // Clean old files
        clean: {
            dev: {
                options: {
                    force: true
                },
                src: ['assets/*.css', 'assets/*.js']
            }
        }
    });

    // Load plugin for watching the changes in files
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Load plugin for syncronizing directories
    grunt.loadNpmTasks("grunt-sync");

    // Load plugin for compiling jade templates to html
    grunt.loadNpmTasks('grunt-contrib-jade');

    // Load plugin for compiling stylus to css
    grunt.loadNpmTasks('grunt-contrib-stylus');

    // Load plugin for deleting files and folders
    grunt.loadNpmTasks('grunt-contrib-clean');

    // Make development version
    grunt.registerTask('default', ['jade:dev', 'clean:dev', 'stylus:dev', 'sync:dev']);
};