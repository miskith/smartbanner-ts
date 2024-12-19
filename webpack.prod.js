const merge = require('webpack-merge').merge;
const common = require('./webpack.common.js');
const { SwcMinifyWebpackPlugin } = require('swc-minify-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = merge(common, {
	mode: 'production',
	optimization: {
		usedExports: true,
		minimizer: [
			new SwcMinifyWebpackPlugin(),
			new CssMinimizerPlugin(),
		],
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx|tsx|ts)$/,
				use: [
					{
						loader: 'esbuild-loader',
						options: {
							loader: 'tsx',
							target: 'es2015',
						},
					},
				],
			},
		],
	},
});
