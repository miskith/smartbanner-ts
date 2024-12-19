const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ProgressPlugin = require('webpack').ProgressPlugin;

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
		chunkFilename: 'js/[name].[contenthash].min.js',
		path: path.resolve(__dirname, './dist/'),
		publicPath: '/',
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js'],
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
					'sass-loader',
				],
			},
		],
	},
	cache: {
		type: 'filesystem',
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'css/[name].min.css',
		}),
		new ProgressPlugin(),
	],
};
