const IS_PROD = process.env.NODE_ENV === "production";
const plugins = [
  [
    "@babel/plugin-transform-runtime",
    {
      regenerator: true,
    },
  ],
];
if (IS_PROD) {
  plugins.push(["transform-remove-console-enhance", { exclude: ["error"] }]);
}

module.exports = {
  presets: [
    "@vue/cli-plugin-babel/preset",
    [
      "@babel/preset-env",
      {
        modules: false,
        targets: {
          browsers: ["last 2 versions"],
        },
      },
    ],
  ],
  plugins,
};
