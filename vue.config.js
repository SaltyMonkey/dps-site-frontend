/* eslint-disable no-unused-vars */
module.exports = {
	"crossorigin": "anonymous",
	"assetsDir": "./static",
	"productionSourceMap": false,
	"configureWebpack": { performance: { hints: false } },
	"chainWebpack": config => {
		config.module.rule("md")
			.test(/\.md/)
			.use("vue-loader")
			.loader("vue-loader")
			.end()
			.use("vue-md-loader")
			.loader("vue-md-loader")
			.options({
				live: false
			});
		config.plugin("html")
			.tap(args => {
				args[0].title = "TeraLogs - Tera Online damage statistic storage site";
				return args;
			});
		config.plugin("optimize-css")
			.tap(args => {
				if (process.env.NODE_ENV === "production") { 
					args[0].cssnanoOptions.preset[1].cssDeclarationSorter = true;
				}
				return args;
			});
		config.optimization.minimizer("terser")
			.tap((args) => {
				if (process.env.NODE_ENV === "production") {
					args[0].terserOptions.compress.drop_console = true;
					args[0].terserOptions.compress.drop_debugger = true;
				}
				args[0].terserOptions.mangle.safari10 = false;
				return args;
			});
	},
	"pluginOptions": {
		webpackBundleAnalyzer: {
			openAnalyzer: !(process.env.NODE_ENV === "production"),
			reportFilename: "bundle.html"
		}
	},
	"css": {
		extract: process.env.NODE_ENV === "production" ? {
			ignoreOrder: true,
		} : false,
	}
};
