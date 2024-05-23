const twig = require('twig');

module.exports = function(eleventyConfig) {

  eleventyConfig.addTemplateFormats('twig');

  eleventyConfig.addExtension('twig', {
    compile: async (inputContent, inputPath) => {
      const template = twig.twig({
        data: inputContent,
        path: `./${inputPath}`
      });
      return async (data) => {
        return template.render(data);
      };
    },
  });

  return {
    markdownTemplateEngine: 'twig',
    htmlTemplateEngine: 'twig',
    templateFormats: ['twig', 'html', 'md']
  };
  
};