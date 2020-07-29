
const path = require("path");

module.exports = () => {
  return {
    entry: "./src/client/Index.js",
    output: {
      path: path.resolve(__dirname, "public"),
      publicPath: "/",
      filename: "bundle.js",
    },
    devServer: {
      contentBase: "./",
      publicPath: "/dist/",
      historyApiFallback: true,
      hot: true,
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: [".js", ".jsx", ".json", ".wasm", ".mjs", "*"],
    },
  };
};