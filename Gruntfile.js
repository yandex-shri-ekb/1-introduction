module.exports = function(grunt) {
	grunt.initConfig({
	    pkg: grunt.file.readJSON('package.json'),

	    recess: {
			options: {
				compile: true,
			},
			build: {
				src: ['less/build.less'],
				dest: 'css/build.css'
			},
			min: {
				options: {
					compress: true
				},
				src: ['less/build.less'],
				dest: 'css/build.min.css'
			}
	    },

	    watch: {
			dist: {
				files: 'less/*.less',
				tasks: ['recess']
			}
	    }
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
  	grunt.loadNpmTasks('grunt-recess');

  	grunt.registerTask('dev', ['watch']);
  	grunt.registerTask('default', ['recess']);
};