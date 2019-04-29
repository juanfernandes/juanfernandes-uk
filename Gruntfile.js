module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    shell: {
      eleventy: {
        command: 'npx eleventy --serve'
      }
    },
    watch: {
      sass: {
        files: ['src/assets/css/*.scss','src/assets/css/partials/*.scss'],
        tasks: ['sass']
      }
    },
    sass: {
      dev: {
        options: {
          style: 'compressed'
        },
        files: {
          // destination                     // source file
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
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-shell');

  // Default task(s).
  grunt.registerTask('eleventy', ['shell:eleventy']);
  grunt.registerTask('css', ['sass']);
  grunt.registerTask('deploy', ['uglify', 'sass']);
  grunt.registerTask('default', ['shell:eleventy', 'uglify', 'sass']);
};
