/** @param {import('@11ty/eleventy/src/UserConfig')} config */
module.exports = config => {
  config.addPlugin(require("@11ty/eleventy-plugin-vite"));

  config.setServerOptions({
    domdiff: false,
  });

  config.addPassthroughCopy("./src/css");
  config.addPassthroughCopy("./src/js");
  config.addPassthroughCopy("assets");

  return {
    dir: {
      input: "src",
    },
  };
};
