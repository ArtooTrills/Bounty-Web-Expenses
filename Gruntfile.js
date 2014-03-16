module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
	
		emberTemplates: {
			compile: {
				options: {
					templateBasePath: /js\/templates\//
				},
				files: {
					'js/templates.js': 'js/templates/*.hbs'
				}
			}
		},

		concat: {
			app: {
				src: 'js/**/*.js',
				dest: 'js/app.js'
			}
		},

		watch: {
			emberTemplates: {
				files: 'js/templates/*.hbs',
				tasks: ['emberTemplates']
			},
			concat: {
				files: ['js/**/*.js', '!js/app.js', 'js/templates.js'],
				tasks: ['concat']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-ember-templates');

	// Default task(s).
	grunt.registerTask('default', ['concat', 'emberTemplates']);
};
