const imgMin = require("./__11ty/image");

/** @param {import('@11ty/eleventy/src/UserConfig')} config */
module.exports = config => {
  config.addPlugin(require("@11ty/eleventy-plugin-vite"));

  config.setServerOptions({
    domdiff: false,
  });

  config.addPassthroughCopy("./src/css");
  config.addPassthroughCopy("./src/js");
  config.addPassthroughCopy("assets");

  config.addNunjucksShortcode("imgMin", imgMin);

  return {
    dir: {
      input: "src",
    },
  };
};
