const merge = require('webpack-merge').merge;
const common = require('./webpack.common.js');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = merge(common, {
	mode: 'production',
	devtool: 'cheap-source-map',
	optimization: {
		usedExports: true,
		minimizer: [
			new TerserPlugin({
				extractComments: true,
				parallel: true,
			}),
			new CssMinimizerPlugin(),
		]
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
		],
	},
	plugins: [
	],
});
