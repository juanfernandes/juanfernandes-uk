module.exports = function (grunt) {
  'use strict'

  // Initial project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    banner: '/*! juanfernandes.uk - v<%= pkg.version %> - */'
  })

  const sass = require('node-sass')

  grunt.initConfig({
    clean: {
      folder: ['dist/']
    },
    shell: {
      eleventy: {
        command: 'eleventy'
      }
    },
    watch: {
      sass: {
        files: ['src/assets/css/*.scss', 'src/assets/css/components/*.scss', 'src/assets/css/partials/*.scss'],
        tasks: ['sass']
      },
      html: {
        files: ['src/*.njk', 'src/*.md', 'src/*.json'],
        tasks: ['eleventy']
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
          'dist/assets/css/global.min.css': 'src/assets/css/global.scss',
          'dist/assets/css/error.css': 'src/assets/css/error.scss'
        }
      }
    }
  })

  // Load the plugins
  grunt.loadNpmTasks('grunt-sass')
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-browser-sync')
  grunt.loadNpmTasks('grunt-shell')
  grunt.loadNpmTasks('grunt-contrib-clean')

  // Default task(s)
  grunt.registerTask('dev', ['clean', 'sass', 'watch:sass'])
  grunt.registerTask('default', ['shell:eleventy', 'sass'])
}
