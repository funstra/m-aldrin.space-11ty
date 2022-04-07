const Image = require("@11ty/eleventy-img");
module.exports = function (dir, name, alt, sizes) {
  const src = `${dir}${dir ? "/" : ""}${name}`.toLocaleLowerCase();
  const opt = {
    widths: [256, 512, 1024, 2048],
    filenameFormat: function (id, src, width, format, options) {
      return `${src.slice(
        src.lastIndexOf("/") + 1,
        src.lastIndexOf(".")
      )}-${width}.${format}`;
    },
    formats: ["webp", "jpeg"],
    urlPath: "/assets/img/" + dir,
    outputDir: "./_site/assets/img/" + dir,
  };

  Image(src, opt);

  let imageAttributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
  };
  let metadata = Image.statsSync(src, opt);
  // return Image.generateHTML(metadata, imageAttributes);

  let lowsrc = metadata.jpeg[0];
  let highsrc = metadata.jpeg[metadata.jpeg.length - 1];

  return `<picture>
    ${Object.values(metadata)
      .map(imageFormat => {
        return `  <source type="${
          imageFormat[0].sourceType
        }" srcset="${imageFormat
          .map(entry => entry.srcset)
          .join(", ")}" sizes="${sizes}">`;
      })
      .join("\n")}
      <img
        src="${lowsrc.url}"
        width="${highsrc.width}"
        height="${highsrc.height}"
        alt="${alt}"
        loading="lazy"
        decoding="async">
    </picture>`;
};
