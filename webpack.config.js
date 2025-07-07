const path = require( 'path' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const CopyPlugin = require( 'copy-webpack-plugin' );

// Paths
const buildDir = 'assets';
const srcDir = 'src';

module.exports = {
	entry: {
		main: `./${srcDir}/js/main.js`,
	},
	output: {
		path: path.resolve( __dirname, buildDir ),
		filename: 'js/[name].js',
		clean: true,
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [ require( 'autoprefixer' ) ],
							},
						},
					},
					{
						loader: 'sass-loader',
						options: {
							implementation: require( 'sass' ),
							sassOptions: {
								silenceDeprecations: [ 'legacy-js-api', 'import' ],
								sourceMap: true,
							}
						}
					}
				],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'images/[name][ext]',
				}
			},
			{
				test: /\.(woff|woff2)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'fonts/[name][ext]',
				},
			},
			{
				test: /\.(mp4|webm)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'videos/[name][ext]',
				},
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin( {
			filename: 'css/style.css',
		} ),
		new CopyPlugin( {
			patterns: [
				{
					from: path.resolve( __dirname, `${srcDir}/images` ),
					to: path.resolve( __dirname, `${buildDir}/images` )
				},
				{
					from: path.resolve( __dirname, `${srcDir}/videos` ),
					to: path.resolve( __dirname, `${buildDir}/videos` )
				}
			],
		} ),
	],
};
