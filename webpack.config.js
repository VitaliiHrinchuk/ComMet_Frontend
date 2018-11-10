var path = require('path');
var VueLoaderPlugin = require('vue-loader/lib/plugin')
var MiniCssExtractPlugin = require('mini-css-extract-plugin')



let config = {
	entry: './src/main.js',
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'build.js',
		publicPath: 'dist/'
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
      	filename: 'assets/style.css'
	    })
 	]
}


module.exports = (env,options) => {
	let mode = options.mode === 'production';
	config.devtool = mode ? false  : 'eval-sourcemap';

	return config;
}
