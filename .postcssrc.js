module.exports = {
  plugins: {
    autoprefixer: {
      browsers: ["Android >= 4.0", "iOS >= 8"],
    },
    "postcss-pxtorem": {
      rootValue: (module) => (/vant/gi.test(module.file) ? 37.5 : 750),

      propList: ["*"],
    },
  },
};
