const { readdirSync } = require("fs");
const { resolve } = require("path");
// const slug = require("slug");
const dir = resolve(__dirname, "../../", "assets", "img");
module.exports = function () {
  const files = readdirSync(dir);
  const alsterFiles = files
    .filter(f => !f.includes(".svg"))
    .map(f => `/assets/img/${f}`);
  return alsterFiles;
};
