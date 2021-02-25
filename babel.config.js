module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['stage-2', 'babel-preset-expo', '@babel/preset-env', '@babel/preset-react', 'babel-preset-jest', '@babel/react-native'],
    plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-proposal-object-rest-spread', 'babel-plugin-transform-export-extensions'],
    only: [
      "./**/*.js",
      "node_modules/jest-runtime"
    ]
  };
};
