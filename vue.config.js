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
	}
};
