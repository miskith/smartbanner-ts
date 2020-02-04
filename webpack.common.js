const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
	entry: {
		'smartbanner': [
			// TS
			'./assets/ts/components/smartbanner.ts',
			// Scss
			'./assets/scss/smartbanner.scss',
		],
	},
	output: {
		filename: 'js/[name].min.js',
		chunkFilename: 'js/[name].min.js',
		path: path.resolve(__dirname, './dist/'),
		publicPath: '/',
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js']
	},
	module: {
		rules: [
			{
				test: /\.(scss|sass|css)$/i,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							url: false,
						},
					},
					'postcss-loader',
					'sass-loader'
				],
			},
			{
				test: /\.(ts|tsx)$/i,
				use: [
					'ts-loader',
				],
			},
		]
	},
	plugins: [
		//new BundleAnalyzerPlugin(),
		new MiniCssExtractPlugin({
			filename: 'css/[name].min.css',
		}),
		new webpack.LoaderOptionsPlugin({
			options: {
				postcss: [
					autoprefixer(),
				],
			},
		}),
		new CopyWebpackPlugin([]),
		new ImageminPlugin({
			test: /\.(jpe?g|png|gif|svg)$/i,
			optipng: null,
			pngquant: {
				optimizationLevel: 5,
			},
			jpegtran: {
				progressive: true,
			},
			svgo: {
				removeViewBox: false,
				cleanupIDs: false,
				removeDimensions: false,
			},
		}),
	],
};
