const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const TerserPlugin = require('terser-webpack-plugin');
const WebpackDeepScopeAnalysisPlugin = require('webpack-deep-scope-plugin').default;
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = merge(common, {
	mode: 'production',
	devtool: 'source-map',
	optimization: {
		usedExports: true,
		minimizer: [
			new TerserPlugin({
				extractComments: true,
				parallel: true,
				sourceMap: true,
				terserOptions: {
					//ecma: 8,
					wrap_iife: false,
				},
			}),
			new OptimizeCSSAssetsPlugin({
				cssProcessor: require('cssnano'),
				cssProcessorOptions: {
					map: {
						inline: false,
						annotation: true,
					},
				},
			}),
		]
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
				},
			},
		],
	},
	plugins: [
		new WebpackDeepScopeAnalysisPlugin(),
	],
});
