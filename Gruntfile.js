module.exports = function(grunt) {
  grunt.initConfig({
    mochaTest: {
      src: ['test/server/**/*.js']
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('test', ['mochaTest', 'karma']);
  grunt.registerTask('default', ['test']);
};
