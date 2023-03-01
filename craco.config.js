const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@btn-border-radius-base": "4px",
              "@btn-default-border": "#F5F0E7",
              "@btn-font-size-lg": "12px",
              "@btn-primary-shadow": "0",
              "@btn-shadow": "0",
              "@checkbox-color": "#F36B28",
              "@error-color": "#F36B28",
              "@label-color": "#F36B28",
              "@link-color": "#B0A89C",
              "@primary-color": "#50BEE3",
              "@success-color": "#00D110",
              "@table-border-color": "#F5F0E7",
              "@table-header-bg": "white",
              "@table-header-cell-split-color": "white",
              "@table-header-color": "#F36B28",
              "@tag-default-bg": "#F5F0E7",
              "@tag-font-size": "12px",
              "@text-color": "#2E2B29",
              "@text-color-secondary": "#797568",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
