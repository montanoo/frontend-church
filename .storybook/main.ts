import type { StorybookConfig } from "@storybook/nextjs";
import postcss from "postcss";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)", "../src/**/*.mdx"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    {
      name: "@storybook/addon-postcss",
      options: {
        cssLoaderOptions: {
          importLoaders: 1, // Allow @import in CSS files
        },
        postcssLoaderOptions: {
          implementation: postcss, // Use PostCSS 8
        },
      },
    },
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
};
export default config;
