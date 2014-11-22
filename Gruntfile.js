
module.exports = function(grunt) {

    // Project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %> -' +
            ' <%= pkg.license %> License\n*/\n\n',

        // JSHint JavaScript files
        jshint: {
            files: ['Gruntfile.js',
                    'package.json',
                   ]
        },

        // Compile Sass to CSS -  destination : source
        sass: {
            dist: {
                files: {
                    'assets/css/screencd.sass.css': 'assets/sass/screen.scss'
                }
            },
        },

        less: {
            dist:{
                files: {
                    'assets/css/blogit.less.css': 'assets/less/blogit.less'
                }
            }
        },

        // Concatenate all JavaScript & CSS files
        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: true,
                separator: ';',
            },
            js: {
                src: ['bower_components/bootstrap/dist/js/bootstrap.js',
                      'assets/js/jquery.fitvids.js',
                      'assets/js/blogit.colorprompt.js',
                      'assets/js/blogit.toc.js',
                     ],

                dest: 'assets/js/blogit.js'
            },

            css: {
                src: ['assets/css/**.sass.css', 'assets/css/**.less.css'],

                dest: 'assets/css/blogit.css'
            },
        },

        autoprefixer: {
            options: ['last 1 version'],
            dist: {
                files: [{
                    expand: true,
                    cwd: 'assets/css/',
                    src: '{,.css',
                    dest: 'assets/css/'
                }]
            }
        },

        //Minify css
        cssmin: {
            src: 'assets/css/*.css',
            dist: {
                files: {
                    'assets/css/blogit.min.css': ['assets/css/blogit.css']
                }
            }
        },

        // Minify JavaScript with Uglify
        uglify: {
            options: {
                banner: '<%= banner %>',
                sourceMap: true,
                mangle: false
            },
            dist: {
                files: {
                    'assets/js/blogit.min.js': ['<%= concat.js.dest %>']
                }
            }
        },

        /**
         * Compresses Image files
         * Compresses all jpg, png images
         */
        imagemin: {
            build: {
                options: {
                    progressive: true
                },
                files: [{
                    expand: true,
                    cwd: 'image_sources/',
                    src: '**/*.{jpg,jpeg,png}',
                    dest: 'assets/images/'
                }]
            }
        },

        /**
         * Compresses SVG files
         */
        svgmin: {
            build: {
                files: [{
                    expand: true,
                    cwd: 'image_sources/',
                    src: '**/*.svg',
                    dest: 'assets/images/'
                }]
            }
        },

        // Simple config to run sass, jshint and uglify any time a js or sass file is added, modified or deleted
        watch: {
            less: {
                files: ['assets/less/{,*/}*.less'],
                tasks: ['less']
            },
            sass: {
                files: ['assets/sass/{,*/}*.scss'],
                tasks: ['sass']
            },
            jshint: {
                files: ['<%= jshint.files %>'],
                tasks: ['jshint']
            },
            concat: {
                files : ['<%= concat.js.src %>','<%= concat.css.src %>'],
                tasks: ['concat']
            },
            cssmin: {
                files : ['<%= cssmin.src %>'],
                tasks: ['cssmin']
            },
            uglify: {
                files: ['assets/js/blogit.js'],
                tasks: ['uglify']
            },
            imagemin: {
                files: ['image_sources/{,*/}*.jpg','image_sources/{,*/}*.png'],
                tasks: ['imagemin']
            },
            svgmin: {
                files: ['image_sources/{,*/}*.svg','image_sources/{,*/}*.svg'],
                tasks: ['svgmin']
            },
        },
    });

    // Load the plug-ins
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-svgmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');

    // Default tasks
    grunt.registerTask('default',
                       [ 'jshint',
                         'sass',
                         'less',
                         'concat',
                         'uglify',
                         'cssmin',
                         'imagemin',
                         'svgmin'
                       ]
                      );
};
