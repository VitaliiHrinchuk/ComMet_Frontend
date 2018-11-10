var path = require('path');
var VueLoaderPlugin = require('vue-loader/lib/plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');



let config = {
	entry: './src/main.js',
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'assets/js/build.js',
		publicPath: './'
	},

	devServer: {
		overlay:true
	},
	module:{
		rules:[
			{
				test: /\.js$/,
				loader: 'babel-loader',
				// exclude: '/node_modules/'
			},
			{
		        test: /\.vue$/,
				loader: 'vue-loader'
		    },
		    {
		        test: /\.css$/,
		        use: [

				          MiniCssExtractPlugin.loader,
				          'css-loader'
				        ]
		    }
		],
	},
	plugins: [
	    new VueLoaderPlugin(),
			new MiniCssExtractPlugin({
      	filename: 'assets/css/style.css'
	    }),
			new HtmlWebpackPlugin({
				filename: 'index.html',
				template: 'src/index.html'
			})
 	]
}


module.exports = (env,options) => {
	let mode = options.mode === 'production';
	config.devtool = mode ? false  : 'eval-sourcemap';

	return config;
}
