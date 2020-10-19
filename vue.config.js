var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	publicPath: process.env.NODE_ENV === 'production' ? '/pinksnakeorg/' : '/',
	devServer: {
		disableHostCheck: true
	},
	productionSourceMap: false,
	pages: {
		index: {
			entry: 'src/main.js',
			template: 'public/index.html',
			filename: 'index.html'
		}
	},
	configureWebpack: {
		plugins: [
			new CopyWebpackPlugin([
				{
					from: 'src/*.php',
					to: '[name].[ext]'
				},
				{
					from: 'src/*.ico',
					to: '[name].[ext]'
				}
			]),
		]
	},
	css: {
		loaderOptions: {
			scss: {
				prependData: `@import "@/assets/styles/helpers/variables.scss";`
			}
		}
	},
	chainWebpack: config => {
		config.module
		.rule('cursor')
			.test(/\.(cur)(\?.*)?$/)
			.use('file-loader')
				.loader('file-loader')
				.options({
					name: 'img/[name]-[hash].[ext]'
				})
		config.module
			.rule('images')
				.test(/\.(gif|png|jpe?g|ico)(\?.*)?$/)
				.use('image-webpack-loader')
					.loader('image-webpack-loader')
					.options({
						mozjpeg: {
							progressive: true,
							quality: 65
						},
						optipng: {
							optimizationLevel: 4
						},
						pngquant: {
							quality: '65-65'
						},
						gifsicle: {
							interlaced: false
						}
					})
	}
}
