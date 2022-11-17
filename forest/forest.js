
Module.register("forest", {

	getTemplate: function () {
		return "forest.njk";
	},

	getTemplateData: function () {
		return this.config;
	}
});
