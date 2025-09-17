module.exports = function tailwindPostCssLoader() {
  return {
    name: 'postcss-tailwindcss-loader',
    configurePostCss(postcssOptions) {
      // Add Tailwind + Autoprefixer
      postcssOptions.plugins.push(require('tailwindcss'));
      postcssOptions.plugins.push(require('autoprefixer'));
      return postcssOptions;
    },
  };
};
