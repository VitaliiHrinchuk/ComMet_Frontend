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
		overlay:true,
		contentBase: path.resolve(__dirname, 'dist'),
    publicPath: '/',
	},
	module:{
		rules:[
			{
				 test: /\.scss$/,
				 use: [
					 MiniCssExtractPlugin.loader,
	        {
	            loader: "css-loader",
	            options: {
	                minimize: {
	                    safe: true
	                }
	            }
	        },
					 // 'vue-style-loader',
					 // 'css-loader',
					 {
					 loader: "sass-loader",
					 options: {}
			 }
				 ]
			 },
			{
				test: /\.js$/,
				loader: 'babel-loader',
				// exclude: '/node_modules/'
			},
			{
		        test: /\.vue$/,
						loader: 'vue-loader',
						options: {
							loaders: {
								scss: 'vue-style-loader!css-loader!sass-loader',
								sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
							}
						}
		  },
		    {
		        test: /\.css$/,
		        use: [

				          MiniCssExtractPlugin.loader,
				          'css-loader'
				        ]
		    },
				{
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
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
 	],
	resolve: {
  alias: {
    vue: 'vue/dist/vue.js'
  }
}
}


module.exports = (env,options) => {
	let mode = options.mode === 'production';
	config.devtool = mode ? false  : 'eval-sourcemap';

	return config;
}
