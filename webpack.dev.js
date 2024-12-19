const merge = require('webpack-merge').merge;
const common = require('./webpack.common.js');

module.exports = merge(common, {
	mode: 'development',
	devtool: 'eval-cheap-module-source-map',
	watch: true,
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/i,
				use: [
					{
						loader: 'esbuild-loader',
					},
				],
			},
		],
	},
});
