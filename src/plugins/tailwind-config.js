module.exports = function (context, options) {
  return {
    name: 'tailwind-config',
    configurePostCss(postcssOptions) {
      // Append Tailwind CSS at the end
      postcssOptions.plugins.push(require('tailwindcss'));
      postcssOptions.plugins.push(require('autoprefixer'));
      return postcssOptions;
    },
  };
}; 