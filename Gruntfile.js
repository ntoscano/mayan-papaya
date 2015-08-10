module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      src: ['server/**/*.js', 'client/**/*.js', '!client/lib/**/*.js']
    },
    mochaTest: {
      src: ['test/server/**/*.js']
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('test', ['jshint', 'mochaTest', 'karma']);
  grunt.registerTask('default', ['test']);
};
