module.exports = function(grunt) {

const sass = require('node-sass');

  grunt.initConfig({
    shell: {
      eleventy: {
        command: 'eleventy'
      }
    },
    watch: {
      sass: {
        files: ['src/assets/css/*.scss','src/assets/css/partials/*.scss'],
        tasks: ['sass']
      }
    },
    sass: {
      options: {
        implementation: sass,
        sourceMap: true,
        outputStyle: 'compressed'
      },
      dist: {
        files: {
          'dist/assets/css/global.min.css':'src/assets/css/global.scss'
        }
      }
    },
    uglify: {
      build: {
        src: ['src/assets/js/global.js','src/assets/js/plugins.js'],
        dest: 'dist/assets/js/global.min.js'
      }
    },
  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-shell');

  // Default task(s)
  grunt.registerTask('dev', ['shell:eleventy', 'sass', 'uglify', 'watch']);
  grunt.registerTask('default', ['shell:eleventy', 'sass', 'uglify']);
};
