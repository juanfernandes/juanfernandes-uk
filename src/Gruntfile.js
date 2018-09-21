module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        // Watch task config
        watch: {
          sass: {
            files: ['assets/css/src/*.scss','assets/css/src/partials/*.scss'],
            tasks: ['sass']
          }
        },
        // SASS task config
        sass: {
          dev: {
            options: {
              style: 'compressed',
              sourcemap: 'none'
            },
            files: {
              // destination              // source file
              'assets/css/global.min.css':'assets/css/src/global.scss'
            }
          }
        },

        uglify: {
          build: {
            src: ['assets/js/src/global.js','assets/js/src/plugins.js'], // input
            dest: 'assets/js/global.min.js' // output
          }
        },
    });

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');

  // Default task(s).
  grunt.registerTask('default', ['uglify', 'sass', 'watch']);
};
