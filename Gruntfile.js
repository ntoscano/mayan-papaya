module.exports = function(grunt) {
  grunt.initConfig({
    mochaTest: {
      src: ['test/server/**/*.js']
    }
  });

  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.registerTask('test', ['mochaTest']);
  grunt.registerTask('default', ['test']);
};
