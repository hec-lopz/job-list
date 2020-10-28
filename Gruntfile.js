module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            cssmin: {
                files: ['src/css/*.css'],
                tasks: ['cssmin']
            },
            htmlmin: {
                files: ['src/**/*.html'],
                tasks: ['htmlmin']
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'src/css',
                    src: '**/*.css',
                    dest: 'dist/css',
                    ext: '.min.css',
                    extDot: 'first'
                }] 
            }
          },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'dist/index.html': 'src/index.html'
                }
            }
        },
        uglify: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'src/scripts',
                    src: '**/*.js',
                    dest: 'dist/scripts',
                    ext: '.min.js',
                    extDot: 'first'
                }] 
            }
          }
    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
};