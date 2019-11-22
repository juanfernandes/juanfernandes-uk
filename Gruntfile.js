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
        files: ['src/assets/css/*.scss', 'src/assets/css/partials/*.scss'],
        tasks: ['sass']
      },
      js: {
        files: ['src/assets/js/*.js'],
        tasks: ['js']
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
          'dist/assets/css/global.min.css': 'src/assets/css/global.scss'
        }
      }
    },
    uglify: {
      build: {
        src: ['src/assets/js/global.js', 'src/assets/js/plugins.js'],
        dest: 'dist/assets/js/global.min.js'
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
  grunt.registerTask('dev', ['clean', 'sass', 'uglify', 'watch:sass', 'watch:js'])
  grunt.registerTask('default', ['shell:eleventy', 'sass', 'uglify'])
}
