const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ProgressPlugin = require('webpack').ProgressPlugin;

module.exports = {
	entry: {
		smartbanner: [
			'./assets/ts/components/smartbanner.ts',
			'./assets/scss/smartbanner.scss',
		],
	},
	output: {
		filename: '[name].min.js',
		chunkFilename: '[name].[contenthash].min.js',
		path: path.resolve(__dirname, './dist'),
		publicPath: '/',
		clean: true,
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
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: ['autoprefixer'],
							},
						},
					},
					{
						loader: 'sass-loader',
					},
				],
			},
		],
	},
	cache: {
		type: 'filesystem',
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].min.css',
			chunkFilename: '[name].[contenthash].min.css',
		}),
		new ProgressPlugin(),
	],
};
