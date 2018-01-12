const webpack = require("webpack");
const path = require("path");
// const glob = require("glob");
// const PurifyCSSPlugin = require("purifycss-webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");

const VENDOR_LIBS = ["axios", "lodash", "moment"];

const isProd = process.env.NODE_ENV === "prod ";

const cssDev = ["style-loader", "css-loader"]; // 'sass-loader'
const cssProd = ExtractTextPlugin.extract({
  fallback: "style-loader",
  use: [{ loader: "css-loader", options: { minimize: true } }]
  // use: [{ loader: ["css-loader", "sass-loader"], options: { minimize: true } }]
});

const config = {
  context: __dirname,
  entry: {
    bundle: "./src/index.js",
    vendor: VENDOR_LIBS
  },
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "js/[name].js?[hash]"
    // publicPath: '/public/'
  },
  devtool: "cheap-eval-source-map",
  stats: {
    colors: true,
    reasons: true,
    chunks: true
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.jsx?$/,
        use: "eslint-loader",
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["es2015", "es2016", "es2017", "stage-0"]
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: isProd ? cssProd : cssDev
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
      
          {
            loader: "url-loader",
            options: {
              limit: 40000,
              name: "img/[name]_[hash].[ext]"
            }
          },
          
            "image-webpack-loader"
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "public"),
    compress: true, // GZip Compression
    // publicPath: 'public/',
    // port: 9000,
    stats: "errors-only",
    open: true,
    hot: true
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ["vendor", "manifest"]
    }),
    new ExtractTextPlugin({
      filename: "css/style.css?[chunkhash]",
      disable: !isProd,
      allChunks: true
    }),
   /* new PurifyCSSPlugin({
      paths: glob.sync(path.join(__dirname, "src/*.html"))
    }), */
    new HTMLWebpackPlugin({
      title: "Boilerplate Project",
      minify: {
        collapseWhitespace: true
      },
      // hash: true,
      template: "src/index.html"
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
};

module.exports = config;
