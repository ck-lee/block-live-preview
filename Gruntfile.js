/* global module:false, require:function, process:object */

var webpack       = require( 'webpack' ),
	webpackConfig = require( './webpack.config' );

module.exports = function( grunt ) {

	grunt.initConfig({
		webpack: {
			options: webpackConfig,
			build: {
				plugins: webpackConfig.plugins.concat(
					new webpack.optimize.DedupePlugin(),
					new webpack.DefinePlugin( {
						'process.env.NODE_ENV': JSON.stringify( 'production' )
					} ),
					new webpack.optimize.UglifyJsPlugin( {
						compress: { warnings: false }
					} )
				),
				output: {
					path: 'dist/'
				}
			},
			'build-dev': {
				devtool: 'sourcemap',
				debug: true
			},
			watch: {
				devtool: 'sourcemap',
				debug: true,
				watch: true,
				keepalive: true
			}
		},
		sass_globbing: {
			itcss: {
				files: (function() {
					var files = {};
					var paths = [];
					paths.push( 'client/components/**/*.scss' );
					files[ 'client/styles/components/_components.scss' ] = paths;
					return files;
				}())
			},
			options: { signature: false }
		},
		postcss: {
			options: {
				map: 'build' !== process.argv[2],
				processors: [
					require( 'autoprefixer' )( {
						browsers: [
							'Android >= 2.1',
							'Chrome >= 21',
							'Edge >= 12',
							'Explorer >= 7',
							'Firefox >= 17',
							'Opera >= 12.1',
							'Safari >= 6.0'
						],
						cascade: false
					} ),
					require( 'pixrem' ),
					require('cssnano')({
						mergeRules: false
					})
				]
			},
			dist: {
				src: 'css/style.css'
			}
		},
		eslint: {
			files: [
				'client/**/*.js'
			]
		},
		sass: {
			options: {
				implementation: require( 'node-sass' ),
				sourceMap: true,
				// Don't add source map URL in built version.
				omitSourceMapUrl: 'build' === process.argv[2],
				outputStyle: 'expanded'
			},
			dist: {
				files: {
					'css/style.css': 'client/style.scss'
				}
			}
		},
		watch: {
			css: {
				files: ['**/*.scss', 'client/components/**/**.scss'],
				tasks: ['css']
			},
			scripts: {
				files: ['**/*.js'],
				tasks: ['webpack:build-dev'],
				options: {
				  atBegin: true,
				}
			},
			eslint: {
				files: ['<%= eslint.files %>'],
				tasks: ['eslint']
			}
		}
	});

	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-sass-globbing');
	grunt.loadNpmTasks('grunt-webpack');
	grunt.loadNpmTasks('grunt-eslint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-curl');

	grunt.registerTask('css', ['sass_globbing', 'sass', 'postcss']);
	grunt.registerTask('build', ['webpack:build', 'css']);
};
