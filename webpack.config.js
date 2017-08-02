const webpack           = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BabiliPlugin      = require("babili-webpack-plugin")
const { join }          = require('path')

let config = {
	entry: join(__dirname, 'src', 'bootstrap'),

	output: {
		path: join(__dirname, 'dist'),
		filename: 'bundle.js'
	},

	resolve: {
		extensions: [ '.jsx', '.js', '.json', '.templ' ]
	},

	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.templ/,
				loader: 'raw-loader'
			}
		]
	},

	externals: {
		'node-pty': 'commonjs node-pty'
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: join(__dirname, 'src', 'index.html'),
			inject: false,
			minify: {
				collapseWhitespace: true,
				removeComments: true
			},
			title: 'Yet Another Terminal',
		})
	],

	target: 'electron'
}

if(process.env.NODE_ENV == 'production') {
	config.plugins.push(new BabiliPlugin())

	// Add source-map in production for easier
	// error fixing in the future
	config.devtool = 'source-map'
} else {
	config.devtool = 'inline-source-map'
}

module.exports = config
