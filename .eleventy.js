const twig = require('twig');
const yaml = require('js-yaml');

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

  twig.cache(false);

  twig.extendFunction('getYear', () => {
    let date = new Date();
    return date.getFullYear();
  });

  eleventyConfig.addDataExtension('yml', (contents) => {
    return yaml.load(contents);
  });

  return {
    markdownTemplateEngine: 'twig',
    htmlTemplateEngine: 'twig',
    templateFormats: ['twig', 'html', 'md']
  };
  
};