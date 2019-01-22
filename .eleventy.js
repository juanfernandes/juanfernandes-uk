module.exports = function(eleventyConfig) {
  // Pass through
  eleventyConfig.addPassthroughCopy("src/assets/imgs");
  eleventyConfig.addPassthroughCopy("src/assets/js/libs");
  eleventyConfig.addPassthroughCopy("src/README.md");
  eleventyConfig.addPassthroughCopy("src/sw.js");
  eleventyConfig.addPassthroughCopy("src/sitemap.xml");
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  eleventyConfig.addPassthroughCopy("src/keybase.txt");
  eleventyConfig.addPassthroughCopy("src/humans.txt");
  eleventyConfig.addPassthroughCopy("src/site.webmanifest");
  eleventyConfig.addPassthroughCopy("src/browserconfig.xml");
  eleventyConfig.addPassthroughCopy("src/.htaccess");

  // module.exports = function(eleventyConfig) {
  //   eleventyConfig.setBrowserSyncConfig({
  //     notify: true
  //   });
  // };

  return {
    dir: {
      input: "src",
      output: "dist",
    },
    passthroughFileCopy: true,
    htmlTemplateEngine : "njk",
    markdownTemplateEngine : "njk",
    templateFormats : ["njk", "md", "html"],
  };
};