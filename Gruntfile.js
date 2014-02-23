// Generated on 2013-11-29 using generator-angular 0.0.0
'use strict';

var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.initConfig({
	distdir: 'client/dist',
	config: grunt.file.readJSON('config.json'),
	pkg: grunt.file.readJSON('package.json'),
	banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
	  '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
	  '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
	  '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;*/\n',
	watch: {
	  options: {
          nospawn: true,
          livereload: LIVERELOAD_PORT
	  },
	  livereload: {
		files: [
		  'client/src/index.html'
		],
		tasks: ['build']
	  },
	  css: {
		files: 'client/src/**/*.scss',
		tasks: ['compass']
	  },
	  templates: {
		files: 'client/src/**/*.tpl.html',
		tasks: ['build']
	  }
	},
	connect: {
	  options: {
		port: 9000,
		// change this to '0.0.0.0' to access the server from outside
		hostname: 'localhost'
	  },
	  livereload: {
		options: {
		  middleware: function (connect) {
			return [
			  lrSnippet,
			  mountFolder(connect, './client/dist')
			];
		  }
		}
	  }
	},
	open: {
        server: {
            path: 'http://localhost:<%= connect.options.port %>'
        }
	},
    src: {
        js: ['client/src/**/*.js', '<%= distdir %>/templates/**/*.js'],
        specs: ['test/**/*.spec.js'],
        scenarios: ['test/**/*.scenario.js'],
        html: ['client/src/index.html'],
        tpl: {
            app: ['client/src/app'],
            common: ['client/src/common']
        },
        scss: ['client/src/scss/main.css'], // recess:build doesn't accept ** in its file patterns
        scssWatch: ['client/src/scss/**/*.scss']
	},
	clean: {
        build: ['<%= distdir %>/*'],
	    templates: ['client/dist/minifiedTemplates']
	},
	copy: {
        assets: {
            files: [
                {
                    expand: true,
                    cwd: 'client/src/assets/',
                    src : '**',
                    dest: '<%= distdir %>'
                }
            ]
        },
        vendorJs: {
            files: [
                {
                    expand: true,
                    cwd: 'bower_components',
                    src: ['angular/angular.min.js',
                      'angular-animate/angular-animate.min.js',
                      'angular-route/angular-route.min.js',
                      'angular-sanitize/angular-sanitize.min.js',
                      'angular-strap/dist/angular-strap.min.js',
                      'angular-strap/dist/angular-strap.tpl.min.js',
                      'angular-touch/angular-touch.min.js'
                    ],
                    dest: '<%= distdir %>/js'
                }
            ]
        },
        vendorCSS: {
            files: [
				{
					expand: true,
					cwd: 'bower_components/font-awesome/css',
					src: '*.css',
					dest: '<%= distdir %>/css'
				}
			]
		},
        vendorFonts: {
            files: [
                {
                    expand: true,
                    cwd: 'bower_components/font-awesome/fonts',
                    src: '*',
                    dest: '<%= distdir %>/fonts'
                }
            ]
        }
	},
    concat:{
        dist:{
            options: {
                banner: "<%= banner %>"
            },
            src:['client/src/app/app.js','client/src/**/*.js','client/dist/minifiedTemplates/**/*.js'],
            dest:'<%= distdir %>/angular-app.js'
        },
        index: {
            src: ['client/src/index.html'],
            dest: '<%= distdir %>/index.html',
            options: {
                process: true
            }
        },
      btns:{
        src: 'client/src/buttons.html',
        dest:'<%= distdir %>/buttons.html',
        options: {
          process:true
        }
      },
      calendar: {
        src: 'client/src/datepicker.html',
        dest:'<%= distdir %>/datepicker.html',
        options: {
          process:true
        }
      },
      foodLog: {
        src: 'client/src/foodLog.html',
        dest:'<%= distdir %>/foodLog.html',
        options: {
          process:true
        }
      }
    },
    uglify: {
        dist:{
            options: {
                banner: "<%= banner %>"
            },
            src:['<%= src.js %>'],
            dest:'<%= distdir %>/generator-angular.js'
        }
    },
  compass: {
    dist: {
      options: {
        require: "susy",
        sassDir: "client/src/scss",
        cssDir: "<%= distdir %>/css"
      }
    }
  },
	html2js: {
	  app: {
		options: {
		  base: 'client/dist/minifiedTemplates/app',
		  module: 'templates.app'
		},
		src: ['client/dist/minifiedTemplates/app/**/*.tpl.html'],
		dest: '<%= distdir %>/minifiedTemplates/app.js'
	  },
	  common: {
		options: {
		  base: 'client/dist/minifiedTemplates/common',
		  module: 'templates.common'
		},
		src: ['client/dist/minifiedTemplates/common/**/*.tpl.html'],
		dest: '<%= distdir %>/minifiedTemplates/common.js'
	  }
	},
	htmlmin: {
	  templates: {
		options: {
		  removeComments: true,
		  removeCommentsFromCDATA: true,
		  removeRedundantAttributes: true,
		  useShortDoctype: true,
		  collapseWhitespace: true
		},
		expand: true,
		cwd: 'client/src',
		src:['**/*.tpl.html'],
		dest: 'client/dist/minifiedTemplates'
	  },
	  app: {
		options: {
		  removeComments: true,
		  removeCommentsFromCDATA: true,
		  removeRedundantAttributes: true,
		  useShortDoctype: true,
		  collapseWhitespace: true
		},
		expand: true,
		cwd: 'client/dist',
		src:['index.html'],
		dest: 'client/dist/'
	  }
	},
	jshint: {
	  files: [
		'GruntFile.js',
		'<%= src.js %>',
		'<%= src.specs %>',
		'<%= src.scenarios %>'
	  ],
	  options: {
		jshintrc: '.jshintrc'
	  }
	},
	csslint: {
	  options: {
		csslintrc: '.csslintrc'
	  },
	  src: ['client/dist/css/main.css']
	}
  });
  grunt.registerTask('build',['clean', 'jshint', 'htmlmin:templates', 'html2js', 'concat', 'clean:templates', 'compass', 'copy:assets', 'copy:vendorJs', 'copy:vendorCSS', 'copy:vendorFonts']);
  grunt.registerTask('minify',['build','uglify','htmlmin:app']);
  grunt.registerTask('server',['connect:livereload','open','watch']);
};